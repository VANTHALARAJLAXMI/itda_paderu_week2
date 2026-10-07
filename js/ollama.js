/* Direct browser Ollama: local server first, then Ollama Cloud if configured. */

const OLLAMA_CONFIG = {
  baseUrl: "http://localhost:11434",
  cloudUrl: "https://ollama.com",
  model: "llama3.2",
  cloudModel: "llama3.2",
  timeoutMs: 40000,
  apiKey: "14964e627c284557a81c1f8b13d592b4.NDuF9hKdXz3k6YShifbCYJ1Z"
};

const OFFTOPIC_EN = "I can help with information related to ITDA Paderu, ASR District, tribal welfare, education, health, tourism, livelihoods, government programmes and other information available on this website.";
const OFFTOPIC_TE = "నేను ITDA పాడేరు, ASR జిల్లా, గిరిజన సంక్షేమం, విద్య, ఆరోగ్యం, టూరిజం, జీవనోపాధి, ప్రభుత్వ కార్యక్రమాలు మరియు ఈ వెబ్‌సైట్‌లోని సమాచారంపై సహాయం చేయగలను.";

function hasTeluguScript(text) {
  return /[\u0C00-\u0C7F]/.test(String(text || ""));
}

function detectChatReplyLang(question) {
  if (hasTeluguScript(question)) return "te";
  if (typeof getLang === "function" && getLang() === "te") return "te";
  return "en";
}

function ollamaSystemPrompt(ragContextText, lang) {
  const telugu = lang === "te";
  const langBlock = telugu
    ? `LANGUAGE (mandatory): The user wrote in Telugu. You MUST write the entire answer in Telugu script (తెలుగు). Do not answer in English sentences. Official names such as ITDA, EMRS, Super 50, SSC, PVTG may stay in English inside Telugu sentences.`
    : `LANGUAGE (mandatory): Answer in English unless the user wrote Telugu.`;
  const offTopicLine = telugu ? OFFTOPIC_TE : OFFTOPIC_EN;
  return `You are the ITDA Paderu website assistant (reference information portal, not the official government website).
Answer using ONLY the website context below, plus conversation history for follow-up words like "how many", "where", "the first one".

WEBSITE CONTEXT:
${ragContextText || "(no matching passages)"}

${langBlock}

RULES:
1. Do not invent schemes, officer names, phone numbers, emails, addresses, bed counts, grant amounts, village names, festival-to-tribe assignments, or statistics that are not in the context.
2. If the user asks for a phone/email/number that is not in the context, say you could not find that contact in the available ITDA Paderu website information${telugu ? " — in Telugu" : ""}.
3. If the question has no connection to ITDA Paderu, ASR District, tribal welfare, education, health, coffee, tourism, livelihoods or this website, reply exactly:
${offTopicLine}
4. If the topic is related but the site only has a heading, you may add one short general line, then say Paderu-specific facts must come from this website. Never present general knowledge as an official Paderu figure.
5. Default: 2–5 sentences. For lists, use short bullets. Do not write long essays.
6. Answer only what was asked. If the user asked about Super 50, do not add festivals, PVTG lists, Sammakka–Saralamma, or other departments. Do not paste FAQ questions the user did not ask.
`;
}

function setOllamaStatusLabel(mode) {
  const dot = document.getElementById("ollamaStatusDot");
  const text = document.getElementById("ollamaStatusText");
  if (!dot || !text) return;
  if (mode === "cloud") {
    dot.className = "status-dot online";
    text.textContent = "Ollama Cloud API";
  } else if (mode === "local") {
    dot.className = "status-dot online";
    text.textContent = "Ollama local";
  } else {
    dot.className = "status-dot local";
    text.textContent = "Ollama offline (website search)";
  }
}

async function checkOllamaServerStatus() {
  if (OLLAMA_CONFIG.apiKey) return "cloud";
  try {
    const response = await fetch(OLLAMA_CONFIG.baseUrl + "/api/tags", {
      method: "GET",
      signal: AbortSignal.timeout(3000)
    });
    if (response.ok) return "local";
  } catch (err) { /* local offline */ }
  return "";
}

async function callOllamaCloud(messages) {
  return postOllamaChat(
    OLLAMA_CONFIG.cloudUrl + "/api/chat",
    { model: OLLAMA_CONFIG.cloudModel, messages: messages, stream: false },
    {
      "Content-Type": "application/json",
      Authorization: "Bearer " + OLLAMA_CONFIG.apiKey
    }
  );
}

async function callOllamaLocal(messages) {
  return postOllamaChat(
    OLLAMA_CONFIG.baseUrl + "/api/chat",
    { model: OLLAMA_CONFIG.model, messages: messages, stream: false },
    { "Content-Type": "application/json" }
  );
}

async function postOllamaChat(url, payload, headers) {
  const controller = new AbortController();
  const timeoutId = setTimeout(function () { controller.abort(); }, OLLAMA_CONFIG.timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    if (data && data.message && data.message.content) return data.message.content;
    throw new Error("Invalid Ollama response");
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function askOllamaAPI(userQuestion, ragContextText, lang, history) {
  lang = lang || "en";
  const messages = [{ role: "system", content: ollamaSystemPrompt(ragContextText, lang) }];
  (history || []).slice(-6).forEach(function (m) {
    if (!m || !m.text) return;
    messages.push({ role: m.role === "bot" ? "assistant" : "user", content: String(m.text).slice(0, 600) });
  });
  const userContent = lang === "te"
    ? userQuestion + "\n\nసూచన: పూర్తి సమాధానం తెలుగు లిపిలోనే రాయండి. పైన ఇచ్చిన వెబ్‌సైట్ సందర్భం ఆధారంగా మాత్రమే చెప్పండి."
    : userQuestion;
  messages.push({ role: "user", content: userContent });

  const preferCloud = lang === "te" && !!OLLAMA_CONFIG.apiKey;

  async function tryCloud() {
    const cloudText = await callOllamaCloud(messages);
    setOllamaStatusLabel("cloud");
    return {
      success: true,
      text: cloudText,
      source: "Source: Ollama Cloud API using website content"
    };
  }

  async function tryLocal() {
    const localText = await callOllamaLocal(messages);
    setOllamaStatusLabel("local");
    return {
      success: true,
      text: localText,
      source: "Source: Ollama (" + OLLAMA_CONFIG.model + ") using website content"
    };
  }

  if (preferCloud) {
    try {
      return await tryCloud();
    } catch (cloudErr) {
      try {
        return await tryLocal();
      } catch (localErr) {
        console.warn("Ollama Cloud and local failed:", cloudErr.message, localErr.message);
        return { success: false, error: cloudErr.message };
      }
    }
  }

  try {
    return await tryLocal();
  } catch (localErr) {
    if (!OLLAMA_CONFIG.apiKey) {
      return { success: false, error: localErr.message };
    }
    try {
      return await tryCloud();
    } catch (cloudErr) {
      console.warn("Ollama local and cloud calls failed:", localErr.message, cloudErr.message);
      return { success: false, error: cloudErr.message };
    }
  }
}
