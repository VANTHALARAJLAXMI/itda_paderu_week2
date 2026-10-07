/* Health Department explorer — hash routing. */

const HEALTH_MODULES = [
  { id: "about", name: "About" },
  { id: "administration", name: "Administration" },
  { id: "hospitals", name: "Hospitals" },
  { id: "programmes", name: "Health Programmes" },
  { id: "mch", name: "Maternal & Child Health" },
  { id: "blood", name: "Blood Services" },
  { id: "disability", name: "Disability Services" },
  { id: "digital", name: "Digital Health" },
  { id: "facilities", name: "Health Facilities" },
  { id: "emergency", name: "Emergency" },
  { id: "notices", name: "Notices" },
  { id: "documents", name: "Documents" },
  { id: "photos", name: "Photos & Videos" },
  { id: "faq", name: "FAQ" }
];

const hState = { module: null, item: null, section: null };

function hEscape(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hNote(text) {
  return "<p class=\"ex-note\">" + hEscape(text) + "</p>";
}

function hDl(rows) {
  return "<dl class=\"ex-dl\">" + rows.map(function (r) {
    return "<dt>" + hEscape(r[0]) + "</dt><dd>" + hEscape(r[1] || HEALTH_NA) + "</dd>";
  }).join("") + "</dl>";
}

function hPhotoSrc(src) {
  if (!src) return "";
  if (/^(https?:|data:|\/)/i.test(src)) return src;
  const path = (typeof location !== "undefined" ? location.pathname : "/health/").replace(/\\/g, "/");
  let dir = path.replace(/index\.html$/i, "");
  if (/\/health$/i.test(dir)) dir += "/";
  if (dir.indexOf("/health/") === -1 && !/\/health\/$/i.test(dir)) {
    dir = dir.replace(/\/?$/, "/") + "health/";
  }
  return dir.replace(/\/?$/, "/") + src.replace(/^\.\//, "");
}

function hGallery(photos, noteText) {
  if (!photos || !photos.length) return "";
  return "<div class=\"ex-gallery\">" + photos.map(function (p) {
    return "<figure class=\"ex-media-card\"><img class=\"ex-media-img\" src=\"" + hEscape(hPhotoSrc(p.src)) +
      "\" alt=\"" + hEscape(p.caption) + "\">" +
      "<figcaption><strong>" + hEscape(p.slot) + "</strong><br>" +
      hEscape(p.caption) +
      "<br>Date: " + HEALTH_NA +
      "<br>Source: " + hEscape(p.source) +
      "</figcaption></figure>";
  }).join("") + "</div><p class=\"ex-meta\">" + hEscape(noteText || "Supplied photographs only. Generated pictures are not used.") + "</p>";
}

function hCard(href, title, text, meta, thumbSrc) {
  const img = thumbSrc
    ? "<img class=\"ex-card-thumb\" src=\"" + hEscape(hPhotoSrc(thumbSrc)) + "\" alt=\"" + hEscape(title) + "\">"
    : "";
  return "<a class=\"ex-card\" href=\"" + href + "\">" + img +
    "<h3>" + hEscape(title) + "</h3>" +
    (text ? "<p>" + hEscape(text) + "</p>" : "") +
    (meta ? "<p class=\"ex-meta\">" + hEscape(meta) + "</p>" : "") + "</a>";
}

function hPath(steps) {
  if (!steps || !steps.length) return "";
  return "<div class=\"edu-path\" aria-label=\"Pathway\">" + steps.map(function (s, i, arr) {
    return "<span class=\"edu-path-step\">" + hEscape(s) + "</span>" +
      (i < arr.length - 1 ? "<span class=\"edu-path-arrow\" aria-hidden=\"true\">↓</span>" : "");
  }).join("") + "</div>";
}

function hList(items) {
  return "<ul class=\"ex-list\">" + items.map(function (x) { return "<li>" + hEscape(x) + "</li>"; }).join("") + "</ul>";
}

function parseHealthHash() {
  const raw = (location.hash || "#hub").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  hState.module = null;
  hState.item = null;
  hState.section = null;
  if (!parts.length || parts[0] === "hub") return;
  hState.module = parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i];
    const val = decodeURIComponent(parts[i + 1] || "");
    if (key === "item") hState.item = val;
    if (key === "section") hState.section = val;
    if (key === "officer") hState.item = val;
    if (key === "facility") hState.item = val;
  }
}

function healthHospital(id) {
  return healthData.hospitals.find(function (h) { return h.id === id; });
}

function healthProgramme(id) {
  return healthData.programmes.find(function (p) { return p.id === id; });
}

function renderHealthBar() {
  const bar = document.getElementById("healthModuleBar");
  if (!bar) return;
  const on = hState.module;
  bar.innerHTML = "<a href=\"#hub\" class=\"" + (!on ? "is-on" : "") + "\">Health Home</a>" +
    HEALTH_MODULES.map(function (m) {
      return "<a href=\"#" + m.id + "\" class=\"" + (on === m.id ? "is-on" : "") + "\">" + hEscape(m.name) + "</a>";
    }).join("");
}

function renderHealthCrumb() {
  const el = document.getElementById("healthBreadcrumb");
  if (!el) return;
  const bits = ["<a href=\"#hub\">Health Department</a>"];
  const mod = HEALTH_MODULES.find(function (m) { return m.id === hState.module; });
  if (mod) bits.push("<a href=\"#" + mod.id + "\">" + hEscape(mod.name) + "</a>");
  if (hState.item) {
    const h = healthHospital(hState.item);
    const p = healthProgramme(hState.item);
    const o = healthData.officers.find(function (x) { return x.id === hState.item; });
    const mch = (healthData.mch.sections || []).find(function (s) { return s.id === hState.item; });
    const label = (h && h.name) || (p && p.name) || (o && o.name) || (mch && mch.name) || hState.item;
    bits.push("<span>" + hEscape(label) + "</span>");
  }
  el.innerHTML = bits.join(" <span class=\"separator\">/</span> ");
}

function renderHealthHome() {
  const stats = healthData.facilitiesTable.slice(0, 4);
  return "<header class=\"ex-hero\"><p class=\"ex-kicker\">HEALTH DEPARTMENT · ITDA Paderu / Alluri Sitharama Raju District</p>" +
    "<h1>Health Department</h1><p>" + hEscape(healthData.homeIntro) + "</p></header>" +
    hNote(HEALTH_NOT_OFFICIAL) +
    "<p class=\"ex-meta\">Source: " + hEscape(HEALTH_SOURCE) + " · Last verified: " + hEscape(HEALTH_LAST_VERIFIED) + "</p>" +
    "<h2>Published capacities</h2><div class=\"ex-grid\">" +
    stats.map(function (r) {
      return "<article class=\"ex-stat\"><strong>" + hEscape(r.capacity) + "</strong><span>" + hEscape(r.facility) + "</span><small>" + hEscape(r.location) + "</small></article>";
    }).join("") + "</div>" +
    "<h2>Administration card</h2>" + hDl(healthData.administrationCard.rows) +
    "<h2>Explore</h2><div class=\"ex-grid\">" +
    hCard("#about", "About Health Department", healthData.about.intro, "Overview") +
    hCard("#administration", "Health Administration", "DM&HO, DCHS, GGH Superintendent — designations only", "Officers & contacts") +
    hCard("#hospitals", "Hospitals", "DH Paderu, AH Araku, CHC Chintapalli, CHC Munchingiput", "4 facilities", "images/ggh-paderu-entrance.png") +
    hCard("#programmes", "Health Programmes", "JSY, JSSK, PMSMA, Thalli Bidda Express, e-EYE, SADAREM, E-Aushadi, De-Addiction", "District health page") +
    hCard("#mch", "Maternal & Child Health", "Pregnancy, institutional delivery, newborn and infant care", "JSY · JSSK · PMSMA") +
    hCard("#blood", "Blood Services", "Blood Bank at DH Paderu; storage at AH Araku and CHC Chintapalli", "Transfusion support") +
    hCard("#disability", "Disability Services", "SADAREM at DH Paderu and AH Araku", "Certification") +
    hCard("#digital", "Digital Health", "E-Aushadi and biometric attendance", "Systems") +
    hCard("#facilities", "Health Facilities summary", "Beds, blood and SNCU as published", "Table") +
    hCard("#emergency", "Emergency Information", "Nearest listed hospital and published helplines", "108 / 104 / 112 on this portal") +
    hCard("#faq", "FAQ", "Capacities, programmes and where to verify officer names", "Questions") +
    hCard("#photos", "Photos & Videos", "GGH Paderu, MCH block, Area Hospital Araku and unlabelled clinical photos", "Photographs") +
    "</div>" +
    "<h2>Tribal & remote-area healthcare</h2><p>" + hEscape(healthData.tribal.overview) + "</p>" +
    hList(healthData.tribal.priorities) +
    "<h2>Health information for students</h2><p>" + hEscape(healthData.students.overview) + "</p>" +
    hPath(healthData.students.pathway);
}

function renderHealthAbout() {
  return "<header class=\"ex-hero\"><p class=\"ex-kicker\">Medical & Health Department</p><h1>About the Health Department</h1>" +
    "<p>" + hEscape(healthData.about.intro) + "</p></header>" +
    "<p>" + hEscape(healthData.about.system) + "</p>" +
    "<h2>Currently listed on the official district health page</h2>" + hList(healthData.about.listed) +
    hNote(HEALTH_NOT_OFFICIAL);
}

function renderHealthAdmin() {
  if (hState.item) {
    const o = healthData.officers.find(function (x) { return x.id === hState.item; });
    if (!o) return "<p>Officer record not found.</p>";
    return "<h1>" + hEscape(o.name) + "</h1>" +
      hDl([
        ["Department", o.department],
        ["Office", o.office],
        ["Designation", o.designation],
        ["Personal name / phone", "Not published on this page. Confirm on the official district Who's Who / hospital notice."]
      ]) +
      "<p>" + hEscape(o.note) + "</p>" +
      "<p><a class=\"ex-btn\" href=\"#administration\">All designations</a></p>";
  }
  return "<h1>Health Administration</h1>" +
    hNote("Officer names and extra contact numbers stay in a separate verification step (Who's Who / hospital board). This page keeps designations so the content does not go stale when postings change.") +
    hDl(healthData.administrationCard.rows) +
    "<h2>District-level health administration</h2>" +
    "<h3>Medical & Health Department</h3>" +
    hDl([
      ["Office", "ITDA Office, Paderu"],
      ["Designation", "District Medical & Health Officer (DM&HO)"]
    ]) +
    "<p>The current official district Who's Who page lists the DM&HO under the Medical & Health Department at ITDA Office, Paderu.</p>" +
    "<h3>Hospital Services</h3>" +
    hDl([
      ["Designation", "District Coordinator of Hospital Services (DCHS)"],
      ["Office", "ITDA Office, Paderu"]
    ]) +
    "<p>The DCHS coordinates hospital services under the district health system.</p>" +
    "<h2>Important officers (designations)</h2><div class=\"ex-grid\">" +
    healthData.officers.map(function (o) {
      return hCard("#administration/officer/" + o.id, o.name, o.office, o.designation);
    }).join("") + "</div>";
}

function renderHealthHospitalDetail(h) {
  let html = "<h1>" + hEscape(h.name) + "</h1><p>" + hEscape(h.overview) + "</p>";
  if (h.photos && h.photos.length) {
    html += "<h2>Hospital photographs</h2>" +
      hGallery(h.photos, "These photographs belong on this hospital page because the board names the facility. They are not used for CHCs unless a CHC board is visible.");
  }
  html += hDl([
      ["Also listed as", h.alsoKnownAs],
      ["Location", h.location],
      ["Capacity", h.capacity],
      ["Level", h.level],
      ["Source", HEALTH_SOURCE]
    ]);
  if (h.contacts) {
    html += "<h2>Published hospital contacts</h2>" +
      hDl([
        ["Phone", h.contacts.phones.join(" / ")],
        ["Email", h.contacts.email],
        ["Source", h.contacts.source]
      ]);
  }
  html += "<h2>Services / facilities published for this hospital</h2>" + hList(h.services) +
    hNote("A service is shown only where the supplied district health brief names this facility. Village-wise outreach is not invented.") +
    "<p><a class=\"ex-btn\" href=\"#hospitals\">All hospitals</a></p>";
  return html;
}

function renderHealthHospitals() {
  if (hState.item) {
    const h = healthHospital(hState.item);
    if (!h) return "<p>Hospital not found.</p>";
    return renderHealthHospitalDetail(h);
  }
  return "<h1>Hospitals</h1>" +
    hNote("Only the four facilities named on the official district health page are listed.") +
    "<div class=\"ex-grid\">" + healthData.hospitals.map(function (h) {
      const thumb = h.photos && h.photos[0] ? h.photos[0].src : "";
      return hCard("#hospitals/facility/" + h.id, h.name, h.location, h.capacity + (thumb ? " · Photograph" : ""), thumb);
    }).join("") + "</div>";
}

function renderHealthProgrammeDetail(p) {
  let html = "<h1>" + hEscape(p.name) + "</h1>" +
    (p.short ? "<p class=\"ex-kicker\">" + hEscape(p.short) + "</p>" : "") +
    "<p>" + hEscape(p.overview) + "</p>" +
    hDl([
      ["Purpose", p.purpose],
      ["Target group", p.target],
      ["Service", p.service],
      ["Department", p.department],
      ["Source", HEALTH_SOURCE]
    ]);
  if (p.locations && p.locations.length) {
    html += "<h2>Locations</h2>" + hList(p.locations);
  }
  if (p.focus && p.focus.length) html += "<h2>Focus</h2>" + hList(p.focus);
  if (p.pathway && p.pathway.length) html += "<h2>Simple process</h2>" + hPath(p.pathway);
  if (p.caution) html += hNote(p.caution);
  html += "<p><a class=\"ex-btn\" href=\"#programmes\">All programmes</a></p>";
  return html;
}

function renderHealthProgrammes() {
  if (hState.item) {
    const p = healthProgramme(hState.item);
    if (!p) return "<p>Programme not found.</p>";
    return renderHealthProgrammeDetail(p);
  }
  return "<h1>Major Health Programmes &amp; Services</h1>" +
    "<div class=\"ex-grid\">" + healthData.programmes.map(function (p) {
      return hCard("#programmes/item/" + p.id, p.name, p.purpose, p.short || "Programme");
    }).join("") + "</div>";
}

function renderHealthMch() {
  if (hState.item) {
    const s = healthData.mch.sections.find(function (x) { return x.id === hState.item; });
    if (!s) return "<p>Section not found.</p>";
    let html = "<h1>" + hEscape(s.name) + "</h1><p>" + hEscape(s.text) + "</p>";
    if ((s.id === "pregnancy" || s.id === "delivery" || s.id === "newborn" || s.id === "infant") && healthData.mch.photos) {
      html += hGallery(healthData.mch.photos, "Maternal and child photographs for this topic. Only the MCH block board names GGH Paderu.");
    }
    html += "<p><a class=\"ex-btn\" href=\"#mch\">Maternal &amp; Child Health</a></p>";
    return html;
  }
  return "<h1>Maternal &amp; Child Health</h1><p>" + hEscape(healthData.mch.overview) + "</p>" +
    (healthData.mch.photos && healthData.mch.photos.length
      ? "<h2>Photographs</h2>" + hGallery(healthData.mch.photos, "The MCH block photograph is labelled GGH Paderu. Other maternal photographs do not print a hospital name.")
      : "") +
    "<h2>Maternal health</h2>" + hList(healthData.mch.maternal) +
    "<h2>Child health</h2>" + hList(healthData.mch.child) +
    "<h2>Sections</h2><div class=\"ex-grid\">" +
    healthData.mch.sections.map(function (s) {
      return hCard("#mch/item/" + s.id, s.name, s.text, "MCH");
    }).join("") + "</div>" +
    "<p><a class=\"ex-btn\" href=\"#programmes/item/jsy\">JSY</a> " +
    "<a class=\"ex-btn\" href=\"#programmes/item/jssk\">JSSK</a> " +
    "<a class=\"ex-btn\" href=\"#programmes/item/pmsma\">PMSMA</a></p>";
}

function renderHealthBlood() {
  return "<h1>Blood Bank &amp; Blood Storage</h1><p>" + hEscape(healthData.blood.overview) + "</p>" +
    "<h2>Blood Bank</h2>" +
    hDl([["Facility", healthData.blood.bank.name], ["Location", healthData.blood.bank.location], ["Status", healthData.blood.bank.status]]) +
    "<h2>Blood Storage Centres</h2><div class=\"ex-grid\">" +
    healthData.blood.storage.map(function (s) {
      return "<article class=\"ex-stat\"><strong>" + hEscape(s.status) + "</strong><span>" + hEscape(s.name) + "</span><small>" + hEscape(s.location) + "</small></article>";
    }).join("") + "</div>";
}

function renderHealthDisability() {
  const p = healthProgramme("sadarem");
  return renderHealthProgrammeDetail(p);
}

function renderHealthDigital() {
  return "<h1>Digital Health</h1><p>" + hEscape(healthData.digital.overview) + "</p><div class=\"ex-grid\">" +
    healthData.digital.items.map(function (it) {
      const href = it.id === "e-aushadi" ? "#programmes/item/e-aushadi" : "#digital";
      return hCard(href, it.name, it.text, "Digital Health");
    }).join("") + "</div>";
}

function renderHealthFacilities() {
  return "<h1>Health Facilities Summary</h1>" +
    "<div class=\"sk-table\"><table class=\"sk-table\"><thead><tr><th>Facility</th><th>Location</th><th>Capacity</th></tr></thead><tbody>" +
    healthData.facilitiesTable.map(function (r) {
      return "<tr><td>" + hEscape(r.facility) + "</td><td>" + hEscape(r.location) + "</td><td>" + hEscape(r.capacity) + "</td></tr>";
    }).join("") + "</tbody></table></div>" +
    "<p class=\"ex-meta\">Source: " + hEscape(HEALTH_SOURCE) + "</p>";
}

function renderHealthEmergency() {
  return "<h1>Emergency Information</h1><p>" + hEscape(healthData.emergency.overview) + "</p>" +
    "<h2>Helplines already published on this portal</h2><ul class=\"ex-list\">" +
    healthData.emergency.siteHelplines.map(function (h) {
      return "<li>" + hEscape(h.name) + " — <a href=\"tel:" + hEscape(h.number) + "\">" + hEscape(h.number) + "</a></li>";
    }).join("") + "</ul>" +
    "<p>" + hEscape(healthData.emergency.ggh) + "</p>" +
    hNote(healthData.emergency.caution) +
    "<p><a class=\"ex-btn\" href=\"#hospitals/facility/dh-paderu\">District Hospital, Paderu</a></p>";
}

function renderHealthFaq() {
  return "<h1>FAQ</h1>" + healthData.faq.map(function (f, i) {
    return "<details class=\"ex-faq\"><summary class=\"ex-faq-q\">" + hEscape(f.q) + "</summary>" +
      "<div class=\"ex-faq-a\"><p>" + hEscape(f.a) + "</p></div></details>";
  }).join("");
}

function renderHealthEmpty(title, text) {
  return "<h1>" + hEscape(title) + "</h1>" + hNote(text);
}

function renderHealthPhotos() {
  return "<h1>Photos &amp; Videos</h1>" +
    hNote(healthData.photos.note) +
    hGallery(healthData.photos.items, "Unique supplied photographs only. Repeated Araku and MCH files were not added twice.") +
    "<h2>Videos</h2>" + hNote(healthData.photos.videos);
}

function renderHealthApp() {
  parseHealthHash();
  renderHealthBar();
  renderHealthCrumb();
  const app = document.getElementById("healthApp");
  if (!app) return;
  let html = "";
  switch (hState.module) {
    case "about": html = renderHealthAbout(); break;
    case "administration": html = renderHealthAdmin(); break;
    case "hospitals": html = renderHealthHospitals(); break;
    case "programmes": html = renderHealthProgrammes(); break;
    case "mch": html = renderHealthMch(); break;
    case "blood": html = renderHealthBlood(); break;
    case "disability": html = renderHealthDisability(); break;
    case "digital": html = renderHealthDigital(); break;
    case "facilities": html = renderHealthFacilities(); break;
    case "emergency": html = renderHealthEmergency(); break;
    case "notices": html = renderHealthEmpty("Notices & Updates", healthData.notices); break;
    case "documents": html = renderHealthEmpty("Documents", healthData.documents); break;
    case "photos": html = renderHealthPhotos(); break;
    case "faq": html = renderHealthFaq(); break;
    default: html = renderHealthHome();
  }
  app.innerHTML = html;
}

function localHealthAnswer(query) {
  const q = (query || "").toLowerCase();
  if (/dmho|dm&ho|dchs|superintendent/.test(q)) {
    return "Designations only: DM&HO and DCHS at ITDA Office, Paderu; GGH Superintendent and Deputy Superintendent at Government General Hospital, Paderu (Sundruputtu). Confirm current names and phones on the official Who's Who / hospital notice.";
  }
  if (/blood/.test(q)) {
    return "Blood Bank at District Hospital, Paderu. Blood Storage Centres at Area Hospital, Araku Valley and CHC Chintapalli.";
  }
  if (/jsy|janani suraksha/.test(q)) {
    return healthProgramme("jsy").overview + " Benefit amounts are not published on this site.";
  }
  if (/jssk|shishu/.test(q)) return healthProgramme("jssk").overview;
  if (/pmsma|9th/.test(q)) return healthProgramme("pmsma").overview;
  if (/thalli|bidda/.test(q)) return healthProgramme("thalli-bidda").overview;
  if (/eye/.test(q)) return healthProgramme("e-eye").overview;
  if (/sadarem|disabilit/.test(q)) return healthProgramme("sadarem").overview;
  if (/dialysis/.test(q)) return healthProgramme("dialysis").overview + " " + healthProgramme("dialysis").caution;
  if (/de-?addict|deaddict/.test(q)) return healthProgramme("deaddiction").overview;
  if (/aushadi|medicine/.test(q)) return healthProgramme("e-aushadi").overview;
  if (/newborn|sncu|nbsu/.test(q)) return healthData.mch.sections.find(function (s) { return s.id === "newborn"; }).text;
  if (/chintapalli/.test(q)) return healthHospital("chc-chintapalli").overview;
  if (/munchingiput/.test(q)) return healthHospital("chc-munchingiput").overview;
  if (/araku/.test(q)) return healthHospital("ah-araku").overview;
  if (/paderu|ggh|district hospital|200/.test(q)) return healthHospital("dh-paderu").overview + " Published contacts: 9246482356 / 9441083160.";
  if (/health|hospital|maternal/.test(q)) return healthData.homeIntro;
  return null;
}

window.addEventListener("hashchange", renderHealthApp);
window.addEventListener("DOMContentLoaded", renderHealthApp);
window.localHealthAnswer = localHealthAnswer;
