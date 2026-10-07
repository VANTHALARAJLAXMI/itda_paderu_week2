/* ITDA Paderu website assistant: search site content, then Ollama. */

let chatHistory = [];
let voiceInputUsed = false;

function injectChatbotDOM() {
  if (document.getElementById("chatbotWidget")) return;

  const L = getLang();
  const strings = UI_STRINGS[L] || UI_STRINGS.en;

  const chatbotHtml = `
    <button type="button" class="chatbot-launcher-btn" id="chatbotLauncher" onclick="toggleChatbotWidget()" aria-label="Open website assistant">
      <span class="chatbot-launcher-icon chatbot-launcher-icon--chat" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.5 12.2a8.2 8.2 0 0 1-8.4 8.1H8.2L4.5 22.5v-3.6A8.2 8.2 0 1 1 20.5 12.2z"/>
          <circle cx="8.5" cy="12" r="1.05" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none"/>
          <circle cx="15.5" cy="12" r="1.05" fill="currentColor" stroke="none"/>
        </svg>
      </span>
      <span class="chatbot-launcher-icon chatbot-launcher-icon--close" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </span>
    </button>
    <div class="chatbot-widget-container" id="chatbotWidget">
      <div class="chat-header">
        <div class="chat-header-title">
          <div class="chat-bot-avatar" aria-hidden="true">
            <img src="${(typeof getBasePath === "function" ? getBasePath() : "./")}images/itda-paderu-logo.png" alt="">
          </div>
          <div>
            <h4>${strings.chatHeaderTitle}</h4>
            <span class="subtitle">${strings.chatHeaderSub}</span>
          </div>
        </div>
        <div class="chat-header-actions">
          <button type="button" class="chat-header-btn" title="${strings.clear}" onclick="clearChatHistory()">🗑️</button>
          <button type="button" class="chat-header-btn" title="Close" onclick="toggleChatbotWidget()">✕</button>
        </div>
      </div>
      <div class="ollama-config-bar">
        <span><span class="status-dot" id="ollamaStatusDot"></span> <span id="ollamaStatusText">Checking Ollama...</span></span>
        <span>Model: <strong>${typeof OLLAMA_CONFIG !== "undefined" ? OLLAMA_CONFIG.model : "llama3.2"}</strong></span>
      </div>
      <div class="chat-window-body" id="chatWindowBody"></div>
      <div class="chat-chips-row" id="chatChipsRow"></div>
      <div class="chat-input-bar">
        <button type="button" class="chat-mic-btn" id="chatMicBtn" onclick="toggleChatMic()" aria-label="Voice input">🎙️</button>
        <input type="text" id="chatInput" placeholder="${strings.chatPlaceholder}" onkeydown="if(event.key==='Enter') sendUserChatMessage()">
        <button type="button" class="chat-send-btn" onclick="sendUserChatMessage()" aria-label="${strings.send}">➢</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatbotHtml);
  renderSuggestedChips();
  addBotMessage(strings.chatWelcomeMsg, null);
  updateOllamaServerStatusIndicator();
}

function toggleChatbotWidget() {
  injectChatbotDOM();
  const widget = document.getElementById("chatbotWidget");
  const launcher = document.getElementById("chatbotLauncher");
  if (widget) widget.classList.toggle("active");
  if (launcher) {
    const open = widget && widget.classList.contains("active");
    launcher.classList.toggle("is-open", open);
    launcher.setAttribute("aria-label", open ? "Close website assistant" : "Open website assistant");
  }
}

async function updateOllamaServerStatusIndicator() {
  const dot = document.getElementById("ollamaStatusDot");
  const text = document.getElementById("ollamaStatusText");
  if (!dot || !text) return;
  const mode = await checkOllamaServerStatus();
  if (typeof setOllamaStatusLabel === "function") {
    setOllamaStatusLabel(mode);
    return;
  }
  if (mode === "local") {
    dot.className = "status-dot online";
    text.textContent = "Ollama local";
  } else if (mode === "cloud") {
    dot.className = "status-dot online";
    text.textContent = "Ollama Cloud API";
  } else {
    dot.className = "status-dot local";
    text.textContent = "Ollama offline (website search)";
  }
}

function renderSuggestedChips() {
  const container = document.getElementById("chatChipsRow");
  if (!container) return;
  const L = getLang();
  const suggestions = L === "en" ? [
    "Which mandals come under ITDA Paderu?",
    "What is Super 50?",
    "How many beds does Araku Area Hospital have?",
    "What is Dhimsa?",
    "What is AAROHAN?"
  ] : [
    "ITDA పాడేరు మండలాలు ఏవి?",
    "సూపర్ 50 అంటే ఏమిటి?",
    "ధిమ్సా అంటే ఏమిటి?",
    "AAROHAN అంటే ఏమిటి?",
    "PVTGలు ఏమిటి?"
  ];
  container.innerHTML = suggestions.map(function (q) {
    return '<button type="button" class="chip-btn" onclick="askSuggestedQuestion(' + JSON.stringify(q) + ')">' + q.replace(/</g, "") + "</button>";
  }).join("");
}

function askSuggestedQuestion(qText) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = qText;
    sendUserChatMessage();
  }
}

function addUserMessage(text) {
  chatHistory.push({ role: "user", text: text });
  appendMessageDOM("user", text);
}

function addBotMessage(text, sourceTag) {
  chatHistory.push({ role: "bot", text: text, source: sourceTag });
  appendMessageDOM("bot", text, sourceTag);
  if (voiceInputUsed) {
    voiceInputUsed = false;
    speakChatText(text);
  }
}

function appendMessageDOM(role, text, sourceTag) {
  const windowBody = document.getElementById("chatWindowBody");
  if (!windowBody) return;
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-msg " + role;
  const safe = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>");
  msgDiv.innerHTML = safe + (sourceTag ? '<span class="src-tag">' + String(sourceTag).replace(/</g, "") + "</span>" : "");
  if (role === "bot") {
    const listen = document.createElement("button");
    listen.type = "button";
    listen.className = "chat-listen-btn";
    listen.textContent = "🔊";
    listen.setAttribute("aria-label", "Listen");
    listen.onclick = function () { speakChatText(text); };
    msgDiv.appendChild(listen);
  }
  windowBody.appendChild(msgDiv);
  windowBody.scrollTop = windowBody.scrollHeight;
}

function showTypingIndicator() {
  const windowBody = document.getElementById("chatWindowBody");
  if (!windowBody) return null;
  const typingDiv = document.createElement("div");
  typingDiv.id = "chatTypingIndicator";
  typingDiv.className = "typing-indicator";
  typingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  windowBody.appendChild(typingDiv);
  windowBody.scrollTop = windowBody.scrollHeight;
  return typingDiv;
}

function removeTypingIndicator() {
  const elem = document.getElementById("chatTypingIndicator");
  if (elem) elem.remove();
}

function speakChatText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]+>/g, " "));
  u.lang = (typeof hasTeluguScript === "function" && hasTeluguScript(text)) || (typeof getLang === "function" && getLang() === "te") ? "te-IN" : "en-IN";
  window.speechSynthesis.speak(u);
}

function toggleChatMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const btn = document.getElementById("chatMicBtn");
  if (!SR) {
    alert("Voice input is not supported in this browser.");
    return;
  }
  const rec = new SR();
  rec.lang = (typeof getLang === "function" && getLang() === "te") ? "te-IN" : "en-IN";
  rec.onstart = function () { if (btn) btn.classList.add("is-on"); };
  rec.onend = function () { if (btn) btn.classList.remove("is-on"); };
  rec.onerror = function () { if (btn) btn.classList.remove("is-on"); };
  rec.onresult = function (e) {
    const input = document.getElementById("chatInput");
    if (!input) return;
    input.value = e.results[0][0].transcript;
    voiceInputUsed = true;
    sendUserChatMessage();
  };
  rec.start();
}

function offTopicReply(lang) {
  if (lang === "te") {
    return "నేను ITDA పాడేరు, ASR జిల్లా, గిరిజన సంక్షేమం, విద్య, ఆరోగ్యం, టూరిజం, జీవనోపాధి, ప్రభుత్వ కార్యక్రమాలు మరియు ఈ వెబ్‌సైట్‌లోని సమాచారంపై సహాయం చేయగలను.";
  }
  return "I can help with information related to ITDA Paderu, ASR District, tribal welfare, education, health, tourism, livelihoods, government programmes and other information available on this website.";
}

function notFoundReply(lang) {
  if (lang === "te") {
    return "అందుబాటులో ఉన్న ITDA పాడేరు వెబ్‌సైట్ సమాచారంలో ఆ వివరం కనిపించలేదు. దయచేసి పాడేరులోని సంబంధిత శాఖలో నిర్ధారించుకోండి.";
  }
  return "I couldn't find that in the available ITDA Paderu website information. Please verify it from the concerned department at Paderu.";
}

function matchLocalKnowledge(query, lang) {
  lang = lang || "en";
  if (typeof searchWebsiteContent !== "function") return null;
  const found = searchWebsiteContent(query, chatHistory);
  if (found.offTopic) return offTopicReply(lang);
  const text = extractiveWebsiteAnswer(found);
  return text || null;
}

async function sendUserChatMessage() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const question = input.value.trim();
  if (!question) return;
  input.value = "";
  addUserMessage(question);
  showTypingIndicator();
  const L = typeof detectChatReplyLang === "function" ? detectChatReplyLang(question) : getLang();
  const found = typeof searchWebsiteContent === "function"
    ? searchWebsiteContent(question, chatHistory, L)
    : { offTopic: false, chunks: [] };

  if (found.offTopic) {
    removeTypingIndicator();
    addBotMessage(offTopicReply(L), null);
    return;
  }

  const contextText = typeof buildOllamaContext === "function" ? buildOllamaContext(found) : "";
  const result = await askOllamaAPI(question, contextText, L, chatHistory);
  removeTypingIndicator();

  if (result.success && result.text) {
    addBotMessage(result.text, result.source);
    return;
  }

  const localText = extractiveWebsiteAnswer(found);
  if (localText) {
    addBotMessage(localText, L === "te" ? "మూలం: వెబ్‌సైట్ సమాచారం" : "Source: ITDA Paderu website content (Ollama offline)");
    return;
  }
  addBotMessage(notFoundReply(L), null);
}

function clearChatHistory() {
  chatHistory = [];
  lastSearchTopics = [];
  const body = document.getElementById("chatWindowBody");
  if (body) {
    body.innerHTML = "";
    const L = getLang();
    const strings = UI_STRINGS[L] || UI_STRINGS.en;
    addBotMessage(strings.chatWelcomeMsg, null);
  }
}
