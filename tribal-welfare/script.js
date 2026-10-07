/* Tribal Welfare & PVTG explorer */

const TW_MODULES = [
  { id: "about", name: "Overview" },
  { id: "administration", name: "Administration" },
  { id: "communities", name: "Communities" },
  { id: "pvtg", name: "PVTG" },
  { id: "schemes", name: "Welfare schemes" },
  { id: "livelihood", name: "Livelihood" },
  { id: "education", name: "Education" },
  { id: "culture", name: "Culture & heritage" },
  { id: "festivals", name: "Festivals" },
  { id: "dances", name: "Tribal dances" },
  { id: "infrastructure", name: "Infrastructure" },
  { id: "programmes", name: "ITDA programmes" },
  { id: "statistics", name: "Statistics" },
  { id: "gallery", name: "Gallery" },
  { id: "faq", name: "FAQ" }
];

const twState = { module: null, item: null };

function twEsc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function twNote(t) { return "<p class=\"ex-note\">" + twEsc(t) + "</p>"; }
function twList(items) {
  return "<ul class=\"ex-list\">" + items.map(function (x) { return "<li>" + twEsc(x) + "</li>"; }).join("") + "</ul>";
}
function twDl(rows) {
  return "<dl class=\"ex-dl\">" + rows.map(function (r) {
    return "<dt>" + twEsc(r[0]) + "</dt><dd>" + twEsc(r[1] || TW_NA) + "</dd>";
  }).join("") + "</dl>";
}
function twPhotoSrc(src) {
  if (!src) return "";
  if (/^(https?:|data:|\/)/i.test(src)) return src;
  const path = (typeof location !== "undefined" ? location.pathname : "/tribal-welfare/").replace(/\\/g, "/");
  let dir = path.replace(/index\.html$/i, "");
  if (/\/tribal-welfare$/i.test(dir)) dir += "/";
  if (dir.indexOf("/tribal-welfare/") === -1 && !/\/tribal-welfare\/$/i.test(dir)) {
    dir = dir.replace(/\/?$/, "/") + "tribal-welfare/";
  }
  return dir.replace(/\/?$/, "/") + src.replace(/^\.\//, "");
}
function twGallery(photos, noteText) {
  if (!photos || !photos.length) return "";
  return "<div class=\"ex-gallery\">" + photos.map(function (p) {
    return "<figure class=\"ex-media-card\"><img class=\"ex-media-img\" src=\"" + twEsc(twPhotoSrc(p.src)) +
      "\" alt=\"" + twEsc(p.caption) + "\"><figcaption><strong>" + twEsc(p.slot) + "</strong><br>" +
      twEsc(p.caption) + "<br>Date: " + TW_NA + "<br>Source: " + twEsc(p.source) + "</figcaption></figure>";
  }).join("") + "</div><p class=\"ex-meta\">" + twEsc(noteText || "Supplied photographs only.") + "</p>";
}
function twCard(href, title, text, meta, thumb) {
  const img = thumb ? "<img class=\"ex-card-thumb\" src=\"" + twEsc(twPhotoSrc(thumb)) + "\" alt=\"" + twEsc(title) + "\">" : "";
  return "<a class=\"ex-card\" href=\"" + href + "\">" + img + "<h3>" + twEsc(title) + "</h3>" +
    (text ? "<p>" + twEsc(text) + "</p>" : "") + (meta ? "<p class=\"ex-meta\">" + twEsc(meta) + "</p>" : "") + "</a>";
}

function parseTwHash() {
  const parts = (location.hash || "#hub").replace(/^#/, "").split("/").filter(Boolean);
  twState.module = null;
  twState.item = null;
  if (!parts.length || parts[0] === "hub") return;
  twState.module = parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    if (parts[i] === "item" || parts[i] === "community") twState.item = decodeURIComponent(parts[i + 1] || "");
  }
}

function twFestItem(id) { return twData.festivals.find(function (f) { return f.id === id; }); }
function twDanceItem(id) { return twData.dances.find(function (d) { return d.id === id; }); }

function renderTwBar() {
  const bar = document.getElementById("twModuleBar");
  if (!bar) return;
  const on = twState.module;
  bar.innerHTML = "<a href=\"#hub\" class=\"" + (!on ? "is-on" : "") + "\">Tribal Welfare Home</a>" +
    TW_MODULES.map(function (m) {
      return "<a href=\"#" + m.id + "\" class=\"" + (on === m.id ? "is-on" : "") + "\">" + twEsc(m.name) + "</a>";
    }).join("");
}

function renderTwCrumb() {
  const el = document.getElementById("twBreadcrumb");
  if (!el) return;
  const bits = ["<a href=\"#hub\">Tribal Welfare &amp; PVTG</a>"];
  const mod = TW_MODULES.find(function (m) { return m.id === twState.module; });
  if (mod) bits.push("<a href=\"#" + mod.id + "\">" + twEsc(mod.name) + "</a>");
  if (twState.item) {
    const f = twFestItem(twState.item);
    const d = twDanceItem(twState.item);
    const p = twData.pvtg.find(function (x) { return x.id === twState.item; });
    bits.push("<span>" + twEsc((f && f.name) || (d && d.name) || (p && p.name) || twState.item) + "</span>");
  }
  el.innerHTML = bits.join(" <span class=\"separator\">/</span> ");
}

function renderTwHome() {
  return "<header class=\"ex-hero\"><p class=\"ex-kicker\">TRIBAL WELFARE &amp; PVTG · ITDA Paderu</p>" +
    "<h1>Tribal Welfare &amp; PVTG Communities</h1><p>" + twEsc(twData.homeIntro) + "</p></header>" +
    twNote(TW_NOT_OFFICIAL) +
    "<p class=\"ex-meta\">Source: " + twEsc(TW_SOURCE) + " · Last verified: " + twEsc(TW_LAST) + "</p>" +
    twGallery(twData.gallery.slice(0, 3), "Photographs supplied for this department. Village and officer names are not guessed from the pictures.") +
    "<h2>Published figures</h2><div class=\"ex-grid\">" + twData.stats.slice(0, 4).map(function (s) {
      return "<article class=\"ex-stat\"><strong>" + twEsc(s.value) + "</strong><span>" + twEsc(s.label) + "</span><small>" + twEsc(s.detail) + "</small></article>";
    }).join("") + "</div>" +
    "<h2>Explore</h2><div class=\"ex-grid\">" +
    twCard("#about", "Tribal Welfare overview", twData.about.intro, "11 mandals") +
    twCard("#pvtg", "PVTG focus", twData.pvtgIntro, twData.pvtgTotal + " (portal figure)", "images/agency-habitation.png") +
    twCard("#schemes", "Welfare schemes", "Education, housing, health, livelihood, social security as categories", "Amounts not listed") +
    twCard("#livelihood", "Livelihood", twData.livelihood.overview, "Coffee · forest produce · crafts", "images/bamboo-basket-craft.jpg") +
    twCard("#festivals", "Tribal festivals", "Templates for named festivals. Not assigned to every community.", "Culture note", "images/festival-drum-procession.jpg") +
    twCard("#dances", "Tribal dances", "Dhimsa on this portal as Agency heritage; other dances unverified locally", "Dhimsa · Mayur · Kolattam", "images/group-dance-line.png") +
    twCard("#administration", "Administration", "ITDA Paderu · Project Officer", "Officers") +
    twCard("#gallery", "Gallery", "Counter, habitation, bamboo craft", "Photographs", "images/public-service-counter.png") +
    "</div>";
}

function renderTwAbout() {
  return "<h1>Tribal Welfare overview</h1><p>" + twEsc(twData.about.intro) + "</p>" +
    "<h2>Objectives</h2>" + twList(twData.about.objectives) +
    "<h2>Mandals covered (ITDA Paderu)</h2>" + twList(twData.about.mandals) +
    twNote(twData.about.mandalsNote);
}

function renderTwAdmin() {
  const a = twData.administration;
  return "<h1>Administrative structure</h1>" +
    twDl([
      ["Administrative authority", a.authority],
      ["Office", a.office],
      ["Project Officer", a.projectOfficer + " · " + a.projectOfficerDesignation],
      ["Year", a.projectOfficerYear],
      ["Source", a.projectOfficerSource]
    ]) + twNote(a.note) +
    "<h2>Documented sections / coordination</h2>" + twList(a.sections) +
    twGallery([twData.gallery[0]], "Public counter photograph. Not labelled as a named officer's chamber.");
}

function renderTwPvtg() {
  if (twState.item) {
    const c = twData.pvtg.find(function (x) { return x.id === twState.item; });
    if (!c) return "<p>Community not found.</p>";
    return "<h1>" + twEsc(c.name) + "</h1>" +
      twDl([["Documented population (portal figure)", c.population], ["Traditional livelihoods (portal description)", c.livelihood]]) +
      twNote(c.note) +
      twNote("Habitation lists, language names and festival attributions for this community are not invented here.") +
      "<p><a class=\"ex-btn\" href=\"#pvtg\">All PVTGs</a></p>";
  }
  return "<h1>PVTG communities</h1><p>" + twEsc(twData.pvtgIntro) + "</p>" +
    "<div class=\"ex-grid\">" + twData.pvtg.map(function (c) {
      return twCard("#pvtg/community/" + c.id, c.name, "Portal population figure: " + c.population, "PVTG");
    }).join("") + "</div>" +
    "<article class=\"ex-stat\"><strong>" + twEsc(twData.pvtgTotal) + "</strong><span>Total PVTG population (portal figure)</span><small>Verify latest official records</small></article>" +
    twGallery([twData.gallery[1], twData.gallery[8]], "Habitation photographs. Not attached to a named PVTG village.");
}

function renderTwCommunities() {
  return "<h1>Tribal communities of ASR District / Paderu Agency</h1>" +
    "<p>This portal names three PVTGs. A complete list of every ST community in ASR District is not published here.</p>" +
    twNote("Community profiles beyond the PVTG cards do not invent population, dialect or village names.") +
    "<div class=\"ex-grid\">" + twData.pvtg.map(function (c) {
      return twCard("#pvtg/community/" + c.id, c.name, c.livelihood, "PVTG · " + c.population);
    }).join("") + "</div>";
}

function renderTwSchemes() {
  return "<h1>Tribal Welfare schemes</h1>" +
    twNote("Scheme names below are categories. Eligibility, portals, dates and amounts: verify the latest official notification. This page does not publish grant figures.") +
    twData.schemeGroups.map(function (g) {
      return "<h2>" + twEsc(g.name) + "</h2>" + twList(g.items);
    }).join("") +
    twGallery([twData.gallery[0]], "Citizen interface photograph for scheme / office visits. Not a beneficiary list.");
}

function renderTwLivelihood() {
  return "<h1>Livelihood &amp; economic development</h1><p>" + twEsc(twData.livelihood.overview) + "</p>" +
    twList(twData.livelihood.items) +
    "<h2>Handicrafts</h2><p>" + twEsc(twData.handicrafts.overview) + "</p>" + twList(twData.handicrafts.items) +
    twGallery(twData.handicrafts.photos, "Handicraft and traditional-art photographs. Community and village not printed.");
}

function renderTwEducation() {
  return "<h1>Education &amp; student welfare</h1><p>" + twEsc(twData.education.overview) + "</p>" +
    "<p><a class=\"ex-btn\" href=\"" + twData.education.href + "\">Open Education explorer</a></p>";
}

function renderTwCulture() {
  return "<h1>Culture &amp; heritage</h1>" + twNote(TW_CULTURE_NOTE) +
    "<div class=\"ex-grid\">" +
    twCard("#festivals", "Tribal festivals", "Overview, named templates, agricultural and village Jatara categories", "Not every community", "images/festival-drum-procession.jpg") +
    twCard("#dances", "Tribal dances", "Dhimsa, Mayur, stick/group, festival and agricultural dances", "Verified attribution required", "images/group-dance-line.png") +
    twCard("#culture", "Traditional music", twData.music.overview, "Instruments", "images/festival-drum-procession.jpg") +
    twCard("#culture", "Traditional dress", twData.dress.overview, "Community-specific", "images/traditional-jewellery.png") +
    twCard("#livelihood", "Tribal handicrafts", "Bamboo, cane, pottery, jewellery, traditional art", "Livelihood", "images/painted-house.jpg") +
    "</div>" +
    "<h2>Music</h2>" + twList(twData.music.items) +
    twGallery(twData.music.photos, "Traditional music photograph. Instrument and village names are not guessed.") +
    "<h2>Dress</h2>" + twList(twData.dress.items) +
    twGallery(twData.dress.photos, "Dress and jewellery photographs. Not labelled as the dress of every Paderu community.") +
    "<h2>Preservation</h2>" + twList(twData.preservation);
}

function renderTwFestivalDetail(f) {
  if (f.skipDetail) return "<h1>" + twEsc(f.name) + "</h1><p>" + twEsc(f.overview) + "</p>";
  return "<h1>" + twEsc(f.name) + "</h1><p>" + twEsc(f.overview) + "</p>" +
    twNote(f.verification) +
    "<h2>Festival details</h2>" +
    twDl([
      ["Festival name", f.name],
      ["Local name", f.localName],
      ["Community", f.community],
      ["Mandal", f.mandal],
      ["Village / habitation", f.village],
      ["Usually celebrated during", f.period],
      ["Duration", f.duration]
    ]) +
    "<h2>Cultural information</h2>" +
    twDl([
      ["Purpose", f.purpose],
      ["Cultural significance", f.significance],
      ["Traditional beliefs", f.beliefs],
      ["Rituals & customs", f.rituals],
      ["Traditional dress", f.dress],
      ["Traditional food", f.food]
    ]) +
    "<h2>Activities (template)</h2>" + twList(f.activities) +
    "<h2>Community participation (template)</h2>" + twList(f.participation) +
    "<h2>Government / ITDA information</h2>" +
    twDl([
      ["ITDA Paderu role", f.itdaRole],
      ["Venue", f.venue],
      ["Year", f.year],
      ["Programme officer", f.officer],
      ["Implementing organisation", f.implementedBy],
      ["Documents / reports", f.documents],
      ["Source", f.source]
    ]) +
    "<h2>Photos &amp; videos</h2>" +
    (f.photos && f.photos.length ? twGallery(f.photos) : twNote("No verified festival photograph is attached to this named event. Unrelated pictures are not used.")) +
    "<p class=\"ex-meta\">Videos: " + twEsc(f.videos) + "</p>" +
    "<p><a class=\"ex-btn\" href=\"#festivals\">All festivals</a></p>";
}

function renderTwFestivals() {
  if (twState.item) {
    const f = twFestItem(twState.item);
    if (!f) return "<p>Festival not found.</p>";
    return renderTwFestivalDetail(f);
  }
  return "<h1>Tribal festivals</h1>" + twNote(TW_CULTURE_NOTE) +
    "<p>Use the same detail template for every festival: name, community, mandal, village, period, rituals, food, dress, ITDA role, source.</p>" +
    "<div class=\"ex-grid\">" + twData.festivals.filter(function (f) { return f.id !== "overview"; }).map(function (f) {
      return twCard("#festivals/item/" + f.id, f.name, f.overview, "Template · location not assumed");
    }).join("") + "</div>";
}

function renderTwDanceDetail(d) {
  if (d.skipDetail) {
    return "<h1>" + twEsc(d.name) + "</h1><p>" + twEsc(d.overview) + "</p>" + twNote(d.verification) +
      (d.photos && d.photos.length ? "<h2>Photographs</h2>" + twGallery(d.photos, "Group and festival dance photographs. Named dance, community and village are not assumed.") : "");
  }
  return "<h1>" + twEsc(d.name) + "</h1><p>" + twEsc(d.overview) + "</p>" +
    twNote(d.verification) +
    twDl([
      ["Community / tribe", d.community],
      ["Location", d.location],
      ["Occasions", d.occasions],
      ["Group formation", d.formation],
      ["Movements", d.movements],
      ["Traditional dress", d.dress],
      ["Musical instruments", d.instruments],
      ["Songs & rhythms", d.songs],
      ["Source", d.source]
    ]) +
    (d.photos && d.photos.length ? "<h2>Photographs</h2>" + twGallery(d.photos, "Only photographs already on this portal or labelled for this dance.") : twNote("No verified dance photograph for this named form.")) +
    "<p class=\"ex-meta\">Videos: " + twEsc(d.videos) + "</p>" +
    "<p><a class=\"ex-btn\" href=\"#dances\">All dances</a></p>";
}

function renderTwDances() {
  if (twState.item) {
    const d = twDanceItem(twState.item);
    if (!d) return "<p>Dance not found.</p>";
    return renderTwDanceDetail(d);
  }
  return "<h1>Tribal dances</h1>" + twNote(TW_CULTURE_NOTE) +
    twGallery(twDanceItem("overview").photos, "Dance photographs by topic. They are not labelled as a named dance of every community.") +
    "<div class=\"ex-grid\">" + twData.dances.filter(function (d) { return d.id !== "overview"; }).map(function (d) {
      const thumb = d.photos && d.photos[0] ? d.photos[0].src : "";
      return twCard("#dances/item/" + d.id, d.name, d.overview, "Verified community required", thumb);
    }).join("") + "</div>";
}

function renderTwInfra() {
  return "<h1>Infrastructure &amp; development</h1><p>" + twEsc(twData.infrastructure.overview) + "</p>" + twList(twData.infrastructure.items) +
    twGallery(twData.infrastructure.photos, "Habitation photographs. Village names are not guessed from the pictures.");
}

function renderTwProgrammes() {
  return "<h1>ITDA Paderu programmes</h1><p>" + twEsc(twData.programmes.overview) + "</p>" +
    "<div class=\"ex-grid\">" + twData.programmes.documented.map(function (p) {
      return twCard(p.href, p.name, "Already documented on this portal", "Open linked explorer");
    }).join("") + "</div>";
}

function renderTwStats() {
  return "<h1>Statistics &amp; reports</h1>" +
    twNote("Mandal-wise community tables, scheme beneficiary counts and annual reports are not invented. Figures below already appear on this portal.") +
    "<div class=\"ex-grid\">" + twData.stats.map(function (s) {
      return "<article class=\"ex-stat\"><strong>" + twEsc(s.value) + "</strong><span>" + twEsc(s.label) + "</span><small>" + twEsc(s.detail) + "</small></article>";
    }).join("") + "</div>";
}

function renderTwGallery() {
  return "<h1>Gallery</h1>" +
    twGallery(twData.gallery, "Supplied photographs only. Dance, jewellery and habitation pictures are not used as proof of a named community, festival or village.");
    twNote(twData.documents);
}

function renderTwFaq() {
  return "<h1>FAQ</h1>" + twData.faq.map(function (f) {
    return "<details class=\"ex-faq\"><summary class=\"ex-faq-q\">" + twEsc(f.q) + "</summary><div class=\"ex-faq-a\"><p>" + twEsc(f.a) + "</p></div></details>";
  }).join("");
}

function renderTwApp() {
  parseTwHash();
  renderTwBar();
  renderTwCrumb();
  const app = document.getElementById("twApp");
  if (!app) return;
  const map = {
    about: renderTwAbout,
    administration: renderTwAdmin,
    communities: renderTwCommunities,
    pvtg: renderTwPvtg,
    schemes: renderTwSchemes,
    livelihood: renderTwLivelihood,
    education: renderTwEducation,
    culture: renderTwCulture,
    festivals: renderTwFestivals,
    dances: renderTwDances,
    infrastructure: renderTwInfra,
    programmes: renderTwProgrammes,
    statistics: renderTwStats,
    gallery: renderTwGallery,
    faq: renderTwFaq
  };
  app.innerHTML = (map[twState.module] || renderTwHome)();
}

function localTwAnswer(query) {
  const q = (query || "").toLowerCase();
  if (/pvtg|khond|kondh|gadaba|poorja|porja/.test(q)) return twData.pvtgIntro + " Figures: Khonds 98,907; Gadaba 26,457; Poorja 56,218; total 1,81,582 (portal figures — verify).";
  if (/dhimsa/.test(q)) return twDanceItem("dhimsa").overview;
  if (/itika|pongal/.test(q)) return twFestItem("itika-pongal").overview + " " + twFestItem("itika-pongal").verification;
  if (/ganga jatara|jatara/.test(q)) return twFestItem("ganga-jatara").overview;
  if (/sammakka|saralamma/.test(q)) return twFestItem("sammakka").overview;
  if (/mayur|kolattam|stick dance/.test(q)) return TW_CULTURE_NOTE;
  if (/mandal/.test(q)) return "ITDA Paderu covers 11 Scheduled Area mandals: " + twData.about.mandals.join(", ") + ".";
  if (/tribal welfare|pvtg|festival|dance/.test(q)) return twData.homeIntro + " " + TW_CULTURE_NOTE;
  return null;
}

window.addEventListener("hashchange", renderTwApp);
window.addEventListener("DOMContentLoaded", renderTwApp);
window.localTwAnswer = localTwAnswer;
