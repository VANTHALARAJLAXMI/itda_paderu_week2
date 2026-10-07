/* Education portal: tables, filters, FAQ, search, Ask ITDA Education. */

const EDU_VERIFY = "Verify latest official records";
const EDU_DATASET_NOTE = "Dataset provided for website planning. Verify against the latest official district/department records before final publication.";
const EDU_STATS_NOTE = "Figures should be interpreted according to the stated department/source and year. Verify the latest official records before publication.";

const educationUI = {
  en: {
    chatTitle: "Ask ITDA Education",
    chatSub: "Education information — Ollama-ready",
    searchPh: "Search: Paderu, EMRS, Super 50, KGBV, hostel, scholarship, skill, degree college, career",
    noResults: "No matching sections. Try another keyword.",
    verify: "Details to be verified from the latest official notification."
  },
  te: {
    chatTitle: "Ask ITDA Education",
    chatSub: "విద్యా సమాచారం — Ollama-ready",
    searchPh: "వెతకండి: Paderu, EMRS, Super 50, KGBV, hostel, scholarship…",
    noResults: "సరిపోలిన విభాగాలు లేవు.",
    verify: "వివరాలు తాజా అధికారిక నోటిఫికేషన్ నుండి ధృవీకరించాలి."
  }
};

function eduLang() {
  return (typeof getLang === "function" ? getLang() : "en") || "en";
}

function eduStr(key) {
  const L = eduLang();
  return (educationUI[L] && educationUI[L][key]) || educationUI.en[key];
}

function educationContextText() {
  return "Ask ITDA Education context (do not invent facts):\n" + JSON.stringify(educationData);
}

function askEducationAssistant(question) {
  const q = String(question || "").trim();
  if (!q) {
    return Promise.resolve("Please type a question about education in ITDA Paderu / ASR District.");
  }

  const local = matchEducationAnswer(q);
  const L = eduLang();

  if (typeof askOllamaAPI === "function") {
    return askOllamaAPI(q, educationContextText(), L).then(function (res) {
      if (res && res.success && res.text) return res.text;
      return local;
    }).catch(function () {
      return local;
    });
  }
  return Promise.resolve(local);
}

function matchEducationAnswer(question) {
  const q = question.toLowerCase();
  const d = educationData;

  if (/emrs|ekalavya/.test(q)) {
    const list = d.emrs.map(function (e) { return e.mandal + " – " + e.place; }).join("; ");
    return d.emrsNote + " Locations: " + list + ". Total EMRS in the planning dataset: 11.";
  }
  if (/ashram/.test(q)) {
    return "Tribal Welfare Ashram Schools operate in a residential pattern from Classes 3 to 10. Documented total: 107 Ashram Schools. " + EDU_DATASET_NOTE;
  }
  if (/super\s*50/.test(q)) {
    return d.super50.map(function (y) {
      return y.year + ": " + y.items.join("; ");
    }).join(" | ") + " " + d.super50Note;
  }
  if (/kgbv|kasturba/.test(q)) {
    return d.kgbv.text + " Institution counts are not listed here.";
  }
  if (/degree college|higher education|gdc/.test(q)) {
    const list = d.colleges.map(function (c) { return c.institution + " — " + c.location; }).join("; ");
    return d.higherEducationNote + " Institutions: " + list + ". Course lists are not published on this page.";
  }
  if (/hostel|residential|boarding/.test(q)) {
    return "Residential education includes Ashram Schools (107), EMRS (11), total residential schools (118), KGBV, boarding and Post-Matric College Hostels. " + EDU_VERIFY + ".";
  }
  if (/scholar/.test(q)) {
    return "Scholarship pathways listed: " + d.scholarships.join(", ") + ". " + d.scholarshipVerify;
  }
  if (/skill/.test(q)) {
    return "Skill/career areas (not claimed as specific ITDA programmes unless officially confirmed): Digital & IT; Vocational; Tribal & local livelihood. " + d.skills.note;
  }
  if (/mtb|mother tongue|mle/.test(q)) {
    return d.mtbMle.text;
  }
  if (/paderu/.test(q) && /facilit|education|college/.test(q)) {
    return d.overview.hero + " " + d.higherEducationNote;
  }
  if (/mandal/.test(q) && /cover|which|what|list/.test(q)) {
    return d.overview.text;
  }
  if (/career|job|employment/.test(q)) {
    return "Career areas: " + d.careers.map(function (c) { return c.area; }).join(", ") + ". " + d.examNote;
  }
  if (/verif|latest|source/.test(q)) {
    return d.dataNote;
  }
  if (/stat|667|network/.test(q)) {
    return "Documented planning figures: 11 mandals; 107 Ashram Schools; 11 EMRS; 118 total residential schools; 667 Government Primary Schools under Tribal Welfare supervision (not all schools in ASR District); 77 School Complex Headmasters. " + EDU_STATS_NOTE;
  }
  return "Ask about mandals, Ashram Schools, EMRS, KGBV, Super 50, hostels, scholarships, skills or higher education. Use only official notifications for eligibility, dates and amounts. " + EDU_VERIFY + ".";
}

function renderMandalTable() {
  const tbody = document.getElementById("eduMandalBody");
  const cards = document.getElementById("eduMandalCards");
  if (!tbody) return;
  const q = (document.getElementById("eduMandalSearch") || {}).value || "";
  const query = q.trim().toLowerCase();
  const rows = educationData.mandals.filter(function (m) {
    if (!query) return true;
    return (m.name + " " + m.network + " " + m.opportunities).toLowerCase().indexOf(query) !== -1;
  });
  tbody.innerHTML = rows.map(function (m) {
    return "<tr><td>" + m.no + "</td><td>" + m.name + "</td><td>" + m.network + "</td><td>" + m.opportunities + "</td></tr>";
  }).join("") || "<tr><td colspan='4'>No matching mandal.</td></tr>";
  if (cards) {
    cards.innerHTML = rows.map(function (m) {
      return "<article class='edu-mobile-card'><h3>" + m.no + ". " + m.name + "</h3><p><strong>Network:</strong> " + m.network + "</p><p><strong>Opportunities:</strong> " + m.opportunities + "</p></article>";
    }).join("");
  }
}

function renderAshramTable() {
  const tbody = document.getElementById("eduAshramBody");
  const cards = document.getElementById("eduAshramCards");
  if (!tbody) return;
  tbody.innerHTML = educationData.residentialSchools.map(function (r) {
    return "<tr><td>" + r.mandal + "</td><td>" + r.ashram + "</td><td>" + r.emrs + "</td><td>" + r.total + "</td></tr>";
  }).join("") +
    "<tr class='edu-total-row'><td>Total</td><td>" + educationData.residentialTotals.ashram +
    "</td><td>" + educationData.residentialTotals.emrs +
    "</td><td>" + educationData.residentialTotals.total + "</td></tr>";
  if (cards) {
    cards.innerHTML = educationData.residentialSchools.map(function (r) {
      return "<article class='edu-mobile-card'><h3>" + r.mandal + "</h3><p>Ashram Schools: " + r.ashram + "</p><p>EMRS Schools: " + r.emrs + "</p><p>Total Residential Schools: " + r.total + "</p></article>";
    }).join("") +
      "<article class='edu-mobile-card'><h3>Total</h3><p>Ashram 107 · EMRS 11 · Residential 118</p></article>";
  }
}

function renderEmrsCards() {
  const el = document.getElementById("eduEmrsGrid");
  if (!el) return;
  el.innerHTML = educationData.emrs.map(function (e) {
    return "<article class='card edu-card' data-edu-item data-keys='emrs " + e.mandal + " " + e.place + "' data-mandal='" + e.mandal + "' data-level='school' data-programme='emrs' data-type='residential'><h3>" + e.mandal + "</h3><p>" + e.place + "</p></article>";
  }).join("");
}

function renderColleges() {
  const tbody = document.getElementById("eduCollegeBody");
  if (!tbody) return;
  tbody.innerHTML = educationData.colleges.map(function (c) {
    return "<tr><td>" + c.institution + "</td><td>" + c.location + "</td></tr>";
  }).join("");
  const cards = document.getElementById("eduCollegeCards");
  if (cards) {
    cards.innerHTML = educationData.colleges.map(function (c) {
      return "<article class='edu-mobile-card'><h3>" + c.institution + "</h3><p>" + c.location + "</p></article>";
    }).join("");
  }
}

function renderSupportCards() {
  const el = document.getElementById("eduSupportGrid");
  if (!el) return;
  el.innerHTML = educationData.studentSupport.map(function (s) {
    return "<article class='card edu-card' data-edu-item data-keys='" + s.name + " hostel scholarship emrs kgbv super 50' data-programme='" + s.name + "' data-type='support'><h3>" + s.name + "</h3><p><strong>What it is:</strong> " + s.what + "</p><p><strong>Why it matters:</strong> " + s.why + "</p><p><strong>Who it supports:</strong> " + s.who + "</p></article>";
  }).join("");
}

function renderSuper50() {
  const el = document.getElementById("eduSuper50Grid");
  if (!el) return;
  el.innerHTML = educationData.super50.map(function (y) {
    return "<article class='card edu-card gold-border' data-edu-item data-keys='super 50 coaching " + y.year + "' data-programme='super50'><h3>" + y.year + "</h3><p class='edu-meta'>Source / Year: Tribal Welfare Super 50 programme · " + y.year + "</p><ul>" +
      y.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></article>";
  }).join("");
}

function renderScholarships() {
  const el = document.getElementById("eduScholarshipGrid");
  if (!el) return;
  const verify = eduStr("verify");
  el.innerHTML = educationData.scholarships.map(function (name) {
    return "<article class='card edu-card' data-edu-item data-keys='scholarship " + name + "' data-programme='scholarship' data-type='support'><h3>" + name + "</h3>" +
      educationData.scholarshipFields.map(function (f) {
        return "<p><strong>" + f + ":</strong> " + verify + "</p>";
      }).join("") + "</article>";
  }).join("");
}

function applyEduSearch() {
  const q = ((document.getElementById("eduGlobalSearch") || {}).value || "").trim().toLowerCase();
  const mandal = ((document.getElementById("eduFilterMandal") || {}).value || "").toLowerCase();
  const level = ((document.getElementById("eduFilterLevel") || {}).value || "").toLowerCase();
  const programme = ((document.getElementById("eduFilterProgramme") || {}).value || "").toLowerCase();
  const itype = ((document.getElementById("eduFilterType") || {}).value || "").toLowerCase();
  const support = ((document.getElementById("eduFilterSupport") || {}).value || "").toLowerCase();
  const items = document.querySelectorAll("[data-edu-item]");
  const sections = document.querySelectorAll("[data-edu-section]");
  let hits = 0;

  items.forEach(function (el) {
    const hay = ((el.getAttribute("data-keys") || "") + " " + el.textContent).toLowerCase();
    const okQ = !q || hay.indexOf(q) !== -1;
    const okM = !mandal || (el.getAttribute("data-mandal") || "").toLowerCase() === mandal || hay.indexOf(mandal) !== -1;
    const okL = !level || (el.getAttribute("data-level") || "") === level;
    const okP = !programme || (el.getAttribute("data-programme") || "").toLowerCase().indexOf(programme) !== -1 || hay.indexOf(programme) !== -1;
    const okT = !itype || (el.getAttribute("data-type") || "") === itype;
    const okS = !support || (el.getAttribute("data-type") || "") === "support" || hay.indexOf(support) !== -1;
    const show = okQ && okM && okL && okP && okT && okS;
    el.hidden = !show;
    if (show) hits += 1;
  });

  sections.forEach(function (sec) {
    if (!q && !mandal && !level && !programme && !itype && !support) {
      sec.classList.remove("edu-dim");
      return;
    }
    const hay = ((sec.getAttribute("data-keys") || "") + " " + sec.textContent).toLowerCase();
    const match = (!q || hay.indexOf(q) !== -1);
    sec.classList.toggle("edu-dim", !match);
    if (match && q) hits += 1;
  });

  const status = document.getElementById("eduSearchStatus");
  if (status) {
    if (!q && !mandal && !level && !programme && !itype && !support) {
      status.textContent = "";
    } else if (hits === 0) {
      status.textContent = eduStr("noResults");
    } else {
      status.textContent = hits + " matching areas";
    }
  }
}

function initEduFaq() {
  document.querySelectorAll(".edu-faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".edu-faq-q").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

function customiseEducationChatbot() {
  const title = document.querySelector(".chat-header-title h4");
  const sub = document.querySelector(".chat-header-title .subtitle");
  if (title) title.textContent = eduStr("chatTitle");
  if (sub) sub.textContent = eduStr("chatSub");
  const chips = document.getElementById("chatChipsRow");
  const header = document.querySelector(".chat-header");
  if (header && !document.getElementById("eduChatLang")) {
    const bar = document.createElement("div");
    bar.id = "eduChatLang";
    bar.className = "edu-chat-lang";
    bar.innerHTML = "<span>Language:</span> <button type='button' class='lang-btn' data-set-lang='en'>English</button> <button type='button' class='lang-btn' data-set-lang='te'>తెలుగు</button>";
    header.after(bar);
    bar.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof setLang === "function") setLang(btn.getAttribute("data-set-lang"));
      });
    });
  }
  if (chips) {
    const qs = [
      "Tell me about education facilities in Paderu",
      "EMRS schools in which mandals?",
      "What is Super 50?",
      "What residential education facilities are available?",
      "What higher education opportunities are available?",
      "What skill-development areas are available?"
    ];
    chips.innerHTML = qs.map(function (t) {
      return "<button type='button' class='chip-btn'>" + t + "</button>";
    }).join("");
    chips.querySelectorAll(".chip-btn").forEach(function (chip) {
      chip.addEventListener("click", function () {
        const input = document.getElementById("chatInput");
        if (input) {
          input.value = chip.textContent;
          if (typeof sendUserChatMessage === "function") sendUserChatMessage();
        }
      });
    });
  }
}

function wrapEducationChat() {
  if (window._eduChatWrapped) return;
  window._eduChatWrapped = true;
  window.sendUserChatMessage = async function () {
    const input = document.getElementById("chatInput");
    if (!input) return;
    const question = input.value.trim();
    if (!question) return;
    input.value = "";
    addUserMessage(question);
    showTypingIndicator();
    const answer = await askEducationAssistant(question);
    removeTypingIndicator();
    addBotMessage(answer, "Ask ITDA Education");
  };
}

function initEduBackTop() {
  const btn = document.getElementById("eduBackTop");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.hidden = window.scrollY < 360;
  }, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initEduMobileNav() {
  const toggle = document.getElementById("eduSubnavToggle");
  const menu = document.getElementById("eduSubnav");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      const parent = a.parentElement;
      if (parent && parent.classList.contains("edu-sub-has") && a.getAttribute("href") === "#edu-schools") {
        e.preventDefault();
        parent.classList.toggle("is-open");
        a.setAttribute("aria-expanded", parent.classList.contains("is-open") ? "true" : "false");
        return;
      }
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const VERIFY_EMPTY = "Details to be verified from the latest official notification.";
const NO_NAMED_EVENTS = "No named school-level programmes in this category are published on this page. Verify latest official records.";

const eduExplorer = {
  mandal: "",
  schoolId: "",
  category: "academic",
  programmeId: ""
};

function normalizeMandalName(name) {
  if (name === "Chintapalle") return "Chinthapalli";
  if (name === "Chinthapalli") return "Chinthapalli";
  return name;
}

function residentialRowForMandal(mandal) {
  const want = normalizeMandalName(mandal);
  return educationData.residentialSchools.find(function (r) {
    return normalizeMandalName(r.mandal) === want;
  }) || null;
}

function emrsForMandal(mandal) {
  const want = normalizeMandalName(mandal);
  return educationData.emrs.find(function (e) {
    return normalizeMandalName(e.mandal) === want;
  }) || null;
}

function mandalRecord(mandal) {
  return educationData.mandals.find(function (m) {
    return m.name === mandal;
  }) || null;
}

function schoolsForMandal(mandal) {
  if (!mandal) return [];
  const list = [];
  const emrs = emrsForMandal(mandal);
  const row = residentialRowForMandal(mandal);
  const rec = mandalRecord(mandal);
  if (emrs) {
    list.push({
      id: "emrs-" + emrs.mandal.replace(/\s+/g, "-").toLowerCase(),
      kind: "named",
      type: "EMRS",
      name: "EMRS – " + emrs.place,
      place: emrs.place,
      mandal: mandal,
      summary: educationData.emrsNote
    });
  }
  if (row) {
    list.push({
      id: "ashram-network-" + mandal.replace(/\s+/g, "-").toLowerCase(),
      kind: "network",
      type: "Tribal Welfare Ashram Schools",
      name: "Ashram Schools network (" + row.ashram + " schools)",
      place: mandal,
      mandal: mandal,
      count: row.ashram,
      summary: "Tribal Welfare Ashram Schools operate in a residential pattern from Classes 3 to 10. Individual school names are not listed here."
    });
  }
  list.push({
    id: "gov-tw-primary-" + mandal.replace(/\s+/g, "-").toLowerCase(),
    kind: "network",
    type: "Government Primary Schools (Tribal Welfare)",
    name: "Government Primary Schools under Tribal Welfare (network)",
    place: mandal,
    mandal: mandal,
    summary: "Government Primary Schools under Tribal Welfare operate in a non-residential pattern. The documented figure of 667 relates to the Tribal Welfare Department network as a whole, not a mandal-wise published list. Individual school names are not listed here."
  });
  if (rec) {
    list.push({
      id: "network-" + mandal.replace(/\s+/g, "-").toLowerCase(),
      kind: "network",
      type: "Mandal education network",
      name: "Other government / Tribal Welfare schools (names not published)",
      place: mandal,
      mandal: mandal,
      summary: rec.network + ". Key opportunities: " + rec.opportunities
    });
  }
  return list;
}

function schoolById(mandal, schoolId) {
  return schoolsForMandal(mandal).find(function (s) { return s.id === schoolId; }) || null;
}

function programmesForCategory(category) {
  return (educationData.programmes || []).filter(function (p) {
    return p.category === category;
  });
}

function renderExplorerCrumbs() {
  const el = document.getElementById("eduExplorerCrumb");
  if (!el) return;
  const parts = ["<a href=\"../index.html\">Home</a>", "<a href=\"#edu-home\">Education</a>", "<a href=\"#edu-schools\">Schools</a>"];
  if (eduExplorer.mandal) parts.push("<a href=\"#edu-select-mandal\">" + eduExplorer.mandal + "</a>");
  const school = schoolById(eduExplorer.mandal, eduExplorer.schoolId);
  if (school) parts.push("<a href=\"#edu-select-school\">" + school.name + "</a>");
  if (eduExplorer.category) {
    const cat = (educationData.programmeCategories || []).find(function (c) { return c.id === eduExplorer.category; });
    if (cat) parts.push("<a href=\"#edu-programmes-conducted\">" + cat.name + "</a>");
  }
  const prog = (educationData.programmes || []).find(function (p) { return p.id === eduExplorer.programmeId; });
  if (prog) parts.push("<span>" + prog.name + "</span>");
  el.innerHTML = parts.join(" <span class=\"separator\">/</span> ");
}

function renderExplorerMandals() {
  const grid = document.getElementById("eduExplorerMandalGrid");
  if (!grid) return;
  grid.innerHTML = educationData.mandals.map(function (m) {
    const sel = m.name === eduExplorer.mandal ? " is-selected" : "";
    return "<button type=\"button\" class=\"edu-mandal-btn" + sel + "\" data-mandal=\"" + m.name + "\">" + m.no + ". " + m.name + "</button>";
  }).join("");
  grid.querySelectorAll("[data-mandal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      eduExplorer.mandal = btn.getAttribute("data-mandal");
      eduExplorer.schoolId = "";
      eduExplorer.programmeId = "";
      renderEducationExplorer();
      document.getElementById("edu-select-school").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderExplorerSchools() {
  const el = document.getElementById("eduExplorerSchoolList");
  if (!el) return;
  if (!eduExplorer.mandal) {
    el.innerHTML = "<p class=\"edu-empty\">Select a mandal first.</p>";
    return;
  }
  const schools = schoolsForMandal(eduExplorer.mandal);
  el.innerHTML = "<p><strong>Mandal:</strong> " + eduExplorer.mandal + "</p>" +
    schools.map(function (s) {
      const sel = s.id === eduExplorer.schoolId ? " is-selected" : "";
      const badge = s.kind === "named" ? "Named institution (planning dataset)" : "Network record — names not published";
      return "<button type=\"button\" class=\"edu-school-btn" + sel + "\" data-school=\"" + s.id + "\"><span>" + s.name + "</span><br><small>" + s.type + " · " + badge + "</small></button>";
    }).join("");
  el.querySelectorAll("[data-school]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      eduExplorer.schoolId = btn.getAttribute("data-school");
      renderEducationExplorer();
      document.getElementById("edu-school-profile").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderExplorerProfile() {
  const el = document.getElementById("eduExplorerProfile");
  if (!el) return;
  const school = schoolById(eduExplorer.mandal, eduExplorer.schoolId);
  if (!school) {
    el.innerHTML = "<p class=\"edu-empty\">Select a mandal and a school (or network record) to view a profile.</p>";
    return;
  }
  const row = residentialRowForMandal(school.mandal);
  const rec = mandalRecord(school.mandal);
  el.innerHTML =
    "<article class=\"card edu-card\">" +
    "<h4>" + school.name + "</h4>" +
    "<p class=\"edu-meta\">" + (school.kind === "named" ? "Documented named institution" : "Network record") + " · Source / Year: planning dataset — Verify latest official records</p>" +
    "<dl class=\"edu-dl\">" +
    "<dt>Mandal</dt><dd>" + school.mandal + "</dd>" +
    "<dt>Location / place</dt><dd>" + school.place + "</dd>" +
    "<dt>Institution type</dt><dd>" + school.type + "</dd>" +
    "<dt>Profile</dt><dd>" + school.summary + "</dd>" +
    (row ? "<dt>Residential counts (mandal)</dt><dd>Ashram Schools: " + row.ashram + "; EMRS: " + row.emrs + "; Total residential: " + row.total + " (planning dataset)</dd>" : "") +
    (rec ? "<dt>Major education network</dt><dd>" + rec.network + "</dd><dt>Key opportunities</dt><dd>" + rec.opportunities + "</dd>" : "") +
    "<dt>Individual school list</dt><dd>Not published as a complete named list on this page. Verify latest UDISE+ and department records.</dd>" +
    "</dl></article>";
}

function renderExplorerProgrammes() {
  const el = document.getElementById("eduExplorerProgList");
  if (!el) return;
  document.querySelectorAll(".edu-prog-cat").forEach(function (a) {
    a.classList.toggle("is-active", a.getAttribute("data-cat") === eduExplorer.category);
  });
  const cat = (educationData.programmeCategories || []).find(function (c) { return c.id === eduExplorer.category; });
  const items = programmesForCategory(eduExplorer.category);
  if (!items.length) {
    el.innerHTML = "<p class=\"edu-empty\"><strong>" + (cat ? cat.name : "This category") + ":</strong> " + NO_NAMED_EVENTS + "</p>";
    return;
  }
  el.innerHTML = items.map(function (p) {
    return "<article class=\"card edu-card\"><h4>" + p.name + "</h4><p>" + p.purpose + "</p>" +
      (p.relatedMandals && p.relatedMandals.length ? "<p class=\"edu-meta\">Documented location link: " + p.relatedMandals.join(", ") + "</p>" : "") +
      "<p><a class=\"edu-cta edu-cta-primary\" href=\"#edu-programme-details\" data-open-prog=\"" + p.id + "\">Open programme details</a></p></article>";
  }).join("");
  el.querySelectorAll("[data-open-prog]").forEach(function (a) {
    a.addEventListener("click", function () {
      eduExplorer.programmeId = a.getAttribute("data-open-prog");
      renderEducationExplorer();
    });
  });
}

function renderExplorerDetails() {
  const el = document.getElementById("eduExplorerProgDetail");
  if (!el) return;
  const prog = (educationData.programmes || []).find(function (p) { return p.id === eduExplorer.programmeId; });
  if (!prog) {
    el.innerHTML = "<p class=\"edu-empty\">Select a documented programme from Programmes Conducted. Empty fields are not filled with invented events.</p>" +
      "<dl class=\"edu-dl\">" +
      educationData.programmeDetailFields.map(function (f) {
        return "<dt>" + f + "</dt><dd>" + VERIFY_EMPTY + "</dd>";
      }).join("") + "</dl>";
    return;
  }
  const map = {
    "Programme Name": prog.name,
    "Purpose": prog.purpose,
    "Conducted By": prog.conductedBy,
    "Implementing Department": prog.implementingDepartment,
    "Target Students": prog.targetStudents,
    "Date / Year": prog.dateYear,
    "Location": prog.location,
    "Activities": prog.activities,
    "Participants": prog.participants,
    "Outcomes": prog.outcomes,
    "Photos / Documents": prog.photos
  };
  el.innerHTML = "<p class=\"edu-note\">" + (prog.verification || "") + "</p><dl class=\"edu-dl\">" +
    educationData.programmeDetailFields.map(function (f) {
      return "<dt>" + f + "</dt><dd>" + (map[f] || VERIFY_EMPTY) + "</dd>";
    }).join("") + "</dl>";
}

function highlightExplorerStep() {
  const hash = (location.hash || "").replace("#", "");
  const map = {
    "edu-select-mandal": "mandal",
    "edu-select-school": "school",
    "edu-school-profile": "profile",
    "edu-programmes-conducted": "programmes",
    "edu-programme-details": "details"
  };
  let step = map[hash];
  if (hash.indexOf("edu-prog-") === 0) step = "programmes";
  document.querySelectorAll(".edu-steps a").forEach(function (a) {
    a.classList.toggle("is-active", !!step && a.getAttribute("data-step") === step);
  });
}

function renderEducationExplorer() {
  renderExplorerCrumbs();
  renderExplorerMandals();
  renderExplorerSchools();
  renderExplorerProfile();
  renderExplorerProgrammes();
  renderExplorerDetails();
  highlightExplorerStep();
}

function initEducationExplorer() {
  renderEducationExplorer();
  document.querySelectorAll(".edu-prog-cat").forEach(function (a) {
    a.addEventListener("click", function () {
      eduExplorer.category = a.getAttribute("data-cat");
      eduExplorer.programmeId = "";
      renderEducationExplorer();
    });
  });
  window.addEventListener("hashchange", function () {
    const hash = location.hash.replace("#", "");
    const catMap = {
      "edu-prog-academic": "academic",
      "edu-prog-skill": "skill",
      "edu-prog-sports": "sports",
      "edu-prog-cultural": "cultural",
      "edu-prog-career": "career",
      "edu-prog-special": "special"
    };
    if (catMap[hash]) {
      eduExplorer.category = catMap[hash];
      renderEducationExplorer();
    }
    highlightExplorerStep();
  });
}

function applyEducationLang() {
  const L = eduLang();
  document.documentElement.lang = L === "te" ? "te" : "en";
  document.querySelectorAll("[data-en]").forEach(function (el) {
    const text = L === "te" ? (el.getAttribute("data-te") || el.getAttribute("data-en")) : el.getAttribute("data-en");
    if (text) el.textContent = text;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyEducationLang();
  renderMandalTable();
  renderAshramTable();
  renderEmrsCards();
  renderColleges();
  renderSupportCards();
  renderSuper50();
  renderScholarships();
  initEduFaq();
  initEduBackTop();
  initEduMobileNav();
  initEducationExplorer();

  ["eduMandalSearch"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderMandalTable);
  });
  ["eduGlobalSearch", "eduFilterMandal", "eduFilterLevel", "eduFilterProgramme", "eduFilterType", "eduFilterSupport"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", applyEduSearch);
    if (el) el.addEventListener("change", applyEduSearch);
  });

  const searchPh = document.getElementById("eduGlobalSearch");
  if (searchPh) searchPh.placeholder = eduStr("searchPh");

  setTimeout(function () {
    if (typeof injectChatbotDOM === "function") injectChatbotDOM();
    customiseEducationChatbot();
    wrapEducationChat();
  }, 400);
});
