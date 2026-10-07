/* Search existing website objects and the open page. No vector DB. */

const SITE_STOP = {
  the: 1, a: 1, an: 1, is: 1, are: 1, was: 1, were: 1, be: 1, to: 1, of: 1, in: 1, for: 1, on: 1, at: 1, and: 1, or: 1,
  what: 1, which: 1, who: 1, how: 1, where: 1, when: 1, tell: 1, me: 1, about: 1, please: 1, give: 1, list: 1,
  with: 1, from: 1, this: 1, that: 1, they: 1, them: 1, their: 1, lo: 1, enti: 1, em: 1, unnayi: 1, undi: 1,
  gurinchi: 1, cheppandi: 1, ante: 1, ela: 1, available: 1, information: 1
};

const SITE_SCOPE = /itda|paderu|asr|alluri|tribal|girijan|giri[jJ]ana|agency|mandal|ashram|emrs|school|hostel|scholarship|super\s*50|aarohan|datapro|health|hospital|ggh|chc|araku|blood|jsy|jssk|pmsma|pvtg|khond|gadaba|poorja|porja|dhimsa|festival|jatara|pongal|dance|coffee|minimuluru|horticult|agricult|tourism|skill|employment|mela|livelihood|scheme|officer|ias|verma|varma|contact|helpline|grievance|spandana|utility|bank|apepdcl|dialysis|sadarem|sncu|welfare|gallery|photo|attire|cultural|ఇటిడిఏ|పాడేరు|గిరిజన|ఆశ్రమ|ఆసుపత్రి|కాఫీ|ధిమ్సా|పండుగ|గ్యాలరీ/i;

const QUERY_EXPAND = [
  ["hospital", "health ggh beds araku chintapalli munchingiput sundruputtu district"],
  ["beds", "hospital capacity araku paderu chintapalli"],
  ["ashram", "residential education hostel classes 3-10 tribal welfare school"],
  ["hostel", "residential ashram post-matric student"],
  ["super50", "super 50 coaching ssc students centres paderu chintapalli"],
  ["super 50", "super50 coaching ssc students"],
  ["pvtg", "particularly vulnerable tribal groups khonds gadaba poorja porja"],
  ["dhimsa", "folk dance tribal culture heritage"],
  ["festival", "itika pongal ganga jatara harvest seed dance culture"],
  ["panduga", "festival itika pongal jatara"],
  ["coffee", "minimuluru arabica board experience centre plantation"],
  ["aarohan", "ai fellowship datapro kakarapadu koyyuru webpulse"],
  ["employment", "job mela career guidance district employment exchange"],
  ["skill", "aarohan super 50 sisal coffee training fellowship"],
  ["tourism", "araku eco park paderu valleys forest"],
  ["mandal", "scheduled area ananthagiri araku dumbriguda hukumpeta"],
  ["officer", "project officer aditya verma ias dmho dchs"],
  ["contact", "office paderu 531024 phone email itda complex"],
  ["blood", "blood bank storage paderu araku chintapalli"],
  ["scholarship", "education hostel post-matric tribal students"],
  ["livelihood", "coffee forest handicraft agriculture shg bamboo"],
  ["department", "education health tribal welfare agriculture horticulture skill"],
  ["సూపర్", "super 50 coaching ssc"],
  ["ధిమ్సా", "dhimsa folk dance"],
  ["మండల", "mandal scheduled area"],
  ["ఆసుపత్రి", "hospital beds araku paderu"],
  ["పాఠశాల", "ashram school education"],
  ["పీవీటీజీ", "pvtg khonds gadaba poorja"],
  ["కాఫీ", "coffee minimuluru"],
  ["ఆరోహన", "aarohan fellowship datapro"]
];

const FOLLOWUP = /^(how many|where|when|who|what are they|what is it|tell me more|more|beds|students|location|contact|phone|number|first one|second|details|ela|ekkada|enni|evaru|\?+)$/i;

let lastSearchTopics = [];

function tokenizeQuery(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter(function (w) { return w.length > 1 && !SITE_STOP[w]; });
}

function expandSearchQuery(question, history) {
  let q = String(question || "");
  const lastUser = (history || []).filter(function (m) { return m.role === "user"; }).slice(-2);
  const lastBot = (history || []).filter(function (m) { return m.role === "bot"; }).slice(-1);
  const short = q.trim().split(/\s+/).length <= 6 || FOLLOWUP.test(q.trim());
  if (short && lastUser.length) {
    q = lastUser.map(function (m) { return m.text; }).join(" ") + " " + (lastBot[0] ? lastBot[0].text.slice(0, 280) : "") + " " + q;
    if (lastSearchTopics.length) q += " " + lastSearchTopics.join(" ");
  }
  const low = q.toLowerCase();
  QUERY_EXPAND.forEach(function (pair) {
    if (low.indexOf(pair[0]) !== -1) q += " " + pair[1];
  });
  return { text: q, followUp: !!(short && lastUser.length) };
}

function pushChunk(list, topic, title, text, weight) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (t.length < 24) return;
  list.push({
    topic: topic || "general",
    title: title || topic,
    text: t.slice(0, 1400),
    weight: weight || 1
  });
}

function walkValue(list, topic, title, value, depth) {
  if (value == null || depth > 6) return;
  if (typeof value === "string" || typeof value === "number") {
    pushChunk(list, topic, title, String(value), 1);
    return;
  }
  if (Array.isArray(value)) {
    if (!value.length) return;
    if (typeof value[0] === "string" || typeof value[0] === "number") {
      pushChunk(list, topic, title, value.join("; "), 1);
      return;
    }
    value.slice(0, 40).forEach(function (item, i) {
      walkValue(list, topic, title + " " + (item && item.name ? item.name : i), item, depth + 1);
    });
    return;
  }
  if (typeof value === "object") {
    const skip = { photos: 1, src: 1, href: 1, thumb: 1, videos: 1 };
    Object.keys(value).forEach(function (key) {
      if (skip[key]) return;
      walkValue(list, topic, title + " " + key, value[key], depth + 1);
    });
  }
}

function collectWebsiteChunks(replyLang) {
  const list = [];
  const lang = replyLang || (typeof getLang === "function" && getLang()) || "en";
  if (typeof itdaKnowledge === "object") {
    Object.keys(itdaKnowledge).forEach(function (key) {
      const k = itdaKnowledge[key];
      const preferred = k[lang] || k.en;
      pushChunk(list, key, k.title || key, preferred, 3);
      if (lang === "te" && k.en && k.en !== preferred) {
        pushChunk(list, key, k.title || key, k.en, 2);
      }
    });
  }
  if (typeof DEPARTMENT_PAGES !== "undefined") {
    pushChunk(list, "departments", "Department pages", DEPARTMENT_PAGES.map(function (d) { return d.en; }).join(", "), 2);
  }
  if (typeof twData === "object") {
    pushChunk(list, "tribal-welfare", "Tribal Welfare overview", twData.homeIntro, 4);
    pushChunk(list, "pvtg", "PVTG", twData.pvtgIntro, 4);
    if (twData.about) {
      pushChunk(list, "mandals", "Mandals", (twData.about.mandals || []).join(", ") + " " + (twData.about.mandalsNote || ""), 4);
      walkValue(list, "tribal-welfare", "Objectives", twData.about.objectives, 0);
    }
    if (twData.administration) walkValue(list, "officers", "Administration", twData.administration, 0);
    (twData.pvtg || []).forEach(function (c) {
      pushChunk(list, "pvtg", c.name, c.name + " population " + c.population + ". " + c.livelihood, 4);
    });
    (twData.festivals || []).forEach(function (f) {
      pushChunk(list, "culture", f.name, f.name + ". " + (f.overview || "") + " " + (f.verification || ""), 3);
    });
    (twData.dances || []).forEach(function (d) {
      pushChunk(list, "culture", d.name, d.name + ". " + (d.overview || ""), 3);
    });
    (twData.faq || []).forEach(function (f) {
      pushChunk(list, "faq", f.q, f.a, 2);
    });
    if (twData.livelihood) pushChunk(list, "livelihood", "Livelihood", twData.livelihood.overview, 3);
    if (twData.schemeGroups) walkValue(list, "schemes", "Welfare schemes", twData.schemeGroups, 0);
  }
  if (typeof healthData === "object") {
    pushChunk(list, "health", "Health overview", healthData.homeIntro, 4);
    if (healthData.about) walkValue(list, "health", "Health about", healthData.about, 0);
    (healthData.hospitals || []).forEach(function (h) {
      const phones = h.contacts && h.contacts.phones ? h.contacts.phones.join(", ") : "";
      pushChunk(list, "health", h.name, [h.name, h.alsoKnownAs, h.location, h.capacity, h.overview, phones, (h.services || []).join(", ")].filter(Boolean).join(". "), 5);
    });
    walkValue(list, "health", "Health programmes", healthData.programmes, 0);
    (healthData.faq || []).forEach(function (f) {
      pushChunk(list, "faq", f.q, f.a, 2);
    });
  }
  if (typeof educationData === "object") {
    const sp = educationData.studentProgrammes;
    if (sp && sp.programmes) {
      sp.programmes.forEach(function (p) {
        pushChunk(list, "education", p.name, (p.overview || "") + " " + (p.source || ""), 4);
      });
    }
    if (sp && sp.stats && Array.isArray(sp.stats.cards)) {
      const lines = sp.stats.cards.map(function (s) {
        return (s.year || "") + " " + (s.label || "") + ": " + (s.value || "") + ". " + (s.detail || "");
      }).join(" ");
      if (lines) pushChunk(list, "education", "Super 50 statistics", lines, 5);
    }
    if (educationData.statistics && educationData.statistics.indicators) {
      educationData.statistics.indicators.slice(0, 20).forEach(function (s) {
        pushChunk(list, "education", s.indicator, s.indicator + " " + s.value + " " + (s.year || "") + " " + (s.verificationStatus || ""), 3);
      });
    }
    const skill = educationData.skillDevelopment;
    if (skill) {
      pushChunk(list, "skill", "Skill overview", skill.overview, 4);
      (skill.programmes || []).forEach(function (p) {
        pushChunk(list, "skill", p.name, [p.name, p.overview, p.conductedBy, (p.locations || []).join("; "), p.caution].filter(Boolean).join(". "), 4);
      });
      walkValue(list, "skill", "Implementing distinction", skill.implementingDistinction, 0);
    }
  }
  if (typeof atlData === "object" && atlData.what) {
    pushChunk(list, "education", "Atal Tinkering Lab", atlData.what, 2);
  }
  const pageRoot = document.querySelector("#eduApp, #healthApp, #twApp");
  if (pageRoot && pageRoot.innerText) {
    pushChunk(list, "current-page", "Current explorer page", pageRoot.innerText.replace(/\s+/g, " ").slice(0, 2500), 2);
  }
  return list;
}

const QUERY_GENERIC = { itda: 1, paderu: 1, asr: 1, district: 1, website: 1, page: 1, government: 1, official: 1, records: 1, verify: 1 };

function scoreChunk(chunk, tokens, origTokens, followUp) {
  const title = String(chunk.title || "").toLowerCase();
  const hay = (chunk.topic + " " + title + " " + chunk.text).toLowerCase();
  let hits = 0;
  const seen = {};
  origTokens.forEach(function (tok) {
    if (seen[tok] || QUERY_GENERIC[tok]) return;
    if (hay.indexOf(tok) === -1) return;
    seen[tok] = 1;
    hits += tok.length > 4 ? 5 : 3;
    if (title.indexOf(tok) !== -1) hits += 8;
  });
  tokens.forEach(function (tok) {
    if (seen[tok] || QUERY_GENERIC[tok]) return;
    if (hay.indexOf(tok) === -1) return;
    seen[tok] = 1;
    hits += 1;
  });
  if (chunk.topic === "faq") hits = Math.floor(hits / 2);
  if (followUp && lastSearchTopics.indexOf(chunk.topic) !== -1) hits += 3;
  return hits * (chunk.weight || 1);
}

function chunkMatchesQuestion(chunk, origTokens) {
  const distinctive = origTokens.filter(function (t) {
    return t.length > 2 && !QUERY_GENERIC[t] && t !== "come" && t !== "under" && t !== "does";
  });
  if (!distinctive.length) return true;
  const hay = (chunk.topic + " " + chunk.title + " " + chunk.text).toLowerCase();
  return distinctive.some(function (tok) { return hay.indexOf(tok) !== -1; });
}

function searchWebsiteContent(question, history, replyLang) {
  const expanded = expandSearchQuery(question, history);
  const origTokens = tokenizeQuery(question);
  const tokens = tokenizeQuery(expanded.text);
  const chunks = collectWebsiteChunks(replyLang);
  const ranked = chunks.map(function (c) {
    return { chunk: c, score: scoreChunk(c, tokens, origTokens, expanded.followUp) };
  }).filter(function (r) { return r.score > 0 && chunkMatchesQuestion(r.chunk, origTokens); })
    .sort(function (a, b) { return b.score - a.score; });

  const offTopic = !SITE_SCOPE.test(question) && ranked.length === 0;

  const picked = [];
  const used = {};
  ranked.forEach(function (r) {
    const key = r.chunk.title + r.chunk.text.slice(0, 80);
    if (used[key]) return;
    used[key] = 1;
    picked.push({ chunk: r.chunk, score: r.score });
  });
  const best = picked[0] ? picked[0].score : 0;
  const top = picked.filter(function (p, i) {
    return i === 0 || p.score >= best * 0.55;
  }).slice(0, 2);
  lastSearchTopics = top.map(function (p) { return p.chunk.topic; });
  return { offTopic: offTopic, chunks: top.map(function (p) { return p.chunk; }), best: best };
}

function buildOllamaContext(found) {
  if (!found || !found.chunks.length) return "";
  return found.chunks.map(function (c) {
    return "[" + c.title + "]\n" + c.text;
  }).join("\n\n");
}

function extractiveWebsiteAnswer(found) {
  if (!found || !found.chunks.length) return "";
  return found.chunks.map(function (c) { return c.text; }).join("\n\n").slice(0, 900);
}
