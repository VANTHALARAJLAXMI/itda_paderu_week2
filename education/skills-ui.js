/* Skill Development explorer. Loaded after education-data.js, skill-data.js, script.js. */

function skillNav() {
  const items = [
    ["home", "Overview", "#skillDevelopment"],
    ["about", "About", "#skillDevelopment/section/about"],
    ["admin", "Administration", "#skillDevelopment/section/admin"],
    ["programmes", "Documented programmes", "#skillDevelopment/section/programmes"],
    ["timeline", "Year timeline", "#skillDevelopment/section/timeline"],
    ["areas", "Skill areas", "#skillDevelopment/section/areas"]
  ];
  return "<nav class=\"sch-nav\" aria-label=\"Skill Development sections\">" + items.map(function (it) {
    const on =
      (it[0] === "home" && !state.section && !state.programmeId && !state.year) ||
      (it[0] === "programmes" && (state.section === "programmes" || state.programmeId)) ||
      (it[0] === "timeline" && (state.section === "timeline" || state.year)) ||
      (it[0] !== "home" && it[0] !== "programmes" && it[0] !== "timeline" && state.section === it[0])
        ? " is-on" : "";
    return "<a class=\"" + on + "\" href=\"" + it[2] + "\">" + it[1] + "</a>";
  }).join("") + "</nav>";
}

function getSkillProgramme(id) {
  return educationData.skillDevelopment.programmes.find(function (p) { return p.id === id; });
}

function skillPath(steps) {
  if (!steps || !steps.length) return "";
  return "<div class=\"edu-path\" aria-label=\"Pathway\">" + steps.map(function (s, i, arr) {
    return "<span class=\"edu-path-step\">" + escapeHtml(s) + "</span>" +
      (i < arr.length - 1 ? "<span class=\"edu-path-arrow\" aria-hidden=\"true\">↓</span>" : "");
  }).join("") + "</div>";
}

function skillAuthorityCard(p) {
  return "<article class=\"sk-sheet\">" +
    "<h2>" + escapeHtml(p.name) + "</h2>" +
    "<dl class=\"ex-dl\">" +
    "<dt>Year</dt><dd>" + escapeHtml(p.year || NA) + "</dd>" +
    "<dt>Duration</dt><dd>" + escapeHtml(p.duration || NA) + "</dd>" +
    "<dt>Category</dt><dd>" + escapeHtml(p.category || NA) + "</dd>" +
    "<dt>Administrative Authority</dt><dd>" + escapeHtml(p.administrativeAuthority || NA) + "</dd>" +
    "<dt>Project Officer</dt><dd>" + escapeHtml(p.projectOfficer ? (p.projectOfficer + (p.projectOfficerDesignation ? " · " + p.projectOfficerDesignation : "")) : NA) + "</dd>" +
    "<dt>Conducted By</dt><dd>" + escapeHtml(p.conductedBy || NA) + "</dd>" +
    "<dt>Training / Programme Partner</dt><dd>" + escapeHtml(p.partner || NA) + "</dd>" +
    "<dt>Focus</dt><dd>" + escapeHtml(p.focus || NA) + "</dd>" +
    "<dt>Target Group</dt><dd>" + escapeHtml(p.target || NA) + "</dd>" +
    "<dt>Programme Type</dt><dd>" + escapeHtml(p.type || NA) + "</dd>" +
    "<dt>Status</dt><dd>" + escapeHtml(p.status || NA) + "</dd>" +
    "<dt>Source</dt><dd>" + escapeHtml(p.source || NA) + "</dd>" +
    "</dl></article>";
}

function skillPhotos(id) {
  return (educationData.topicPhotos && educationData.topicPhotos.skill && educationData.topicPhotos.skill[id]) || [];
}

function skillProgrammeCard(p) {
  const photos = skillPhotos(p.id);
  const badge = p.documented ? "Documented" : "Skill area (not a named ITDA batch)";
  const who = (p.conductedBy && p.conductedBy !== NA)
    ? p.conductedBy
    : ((p.administrativeAuthority && p.administrativeAuthority !== NA) ? p.administrativeAuthority : (p.focus || p.category || "Skill area"));
  const thumb = photos[0] && typeof eduPhotoSrc === "function"
    ? "<img class=\"ex-card-thumb\" src=\"" + escapeHtml(eduPhotoSrc(photos[0].src)) + "\" alt=\"" + escapeHtml(p.name) + "\">"
    : "";
  return "<a class=\"ex-card\" href=\"#skillDevelopment/prog/" + p.id + "\">" + thumb +
    "<h3>" + escapeHtml(p.name) + "</h3>" +
    "<p>" + escapeHtml(who) + "</p>" +
    "<p class=\"ex-meta\">" + escapeHtml(badge) + (photos.length ? " · Photographs" : "") + "</p></a>";
}

function renderSkillExplorer() {
  if (state.programmeId) return skillNav() + renderSkillProgramme();
  if (state.year) return skillNav() + renderSkillYear();
  if (state.section === "about") return skillNav() + renderSkillAbout();
  if (state.section === "admin") return skillNav() + renderSkillAdmin();
  if (state.section === "timeline") return skillNav() + renderSkillTimeline();
  if (state.section === "areas") return skillNav() + renderSkillAreas();
  if (state.section === "programmes") return skillNav() + renderSkillProgrammesList();
  return skillNav() + renderSkillHome();
}

function renderSkillHome() {
  const documented = educationData.skillDevelopment.programmes.filter(function (p) { return p.documented; });
  return "<header class=\"ex-hero\"><p class=\"ex-kicker\">Skill Development · ITDA Paderu / ASR District</p>" +
    "<h1>Skill Development</h1>" +
    "<p>" + escapeHtml(educationData.skillDevelopment.overview) + "</p></header>" +
    note(educationData.skillDevelopment.namingNote) +
    "<h2>Who implements what</h2>" +
    "<table class=\"sk-table\"><thead><tr><th>Activity</th><th>Correct presentation</th></tr></thead><tbody>" +
    educationData.skillDevelopment.implementingDistinction.map(function (r) {
      return "<tr><td>" + escapeHtml(r.activity) + "</td><td>" + escapeHtml(r.presentation) + "</td></tr>";
    }).join("") + "</tbody></table>" +
    "<h2>Documented programmes and projects</h2><div class=\"ex-grid\">" +
    documented.map(skillProgrammeCard).join("") + "</div>" +
    "<h2>Skill areas with photographs</h2><div class=\"ex-grid\">" +
    educationData.skillDevelopment.programmes.filter(function (p) {
      return !p.documented && skillPhotos(p.id).length;
    }).map(skillProgrammeCard).join("") + "</div>" +
    "<p><a class=\"ex-btn\" href=\"#skillDevelopment/section/timeline\">Year timeline</a> " +
    "<a class=\"ex-btn\" href=\"#skillDevelopment/section/areas\">General skill areas</a> " +
    "<a class=\"ex-btn\" href=\"#skillDevelopment/section/admin\">Administration</a></p>";
}

function renderSkillAbout() {
  const a = educationData.skillDevelopment.about;
  return "<h1>About Skill Development</h1>" +
    "<p>" + escapeHtml(a.intro) + "</p>" +
    "<p>" + escapeHtml(a.whoMayBeInvolved) + "</p>" +
    "<h2>Major focus areas</h2><ul class=\"ex-list\">" +
    a.focusAreas.map(function (x) { return "<li>" + escapeHtml(x) + "</li>"; }).join("") +
    "</ul>" + note("Focus areas are not automatically ITDA-run courses. Open each documented programme for the implementing organisation.");
}

function renderSkillAdmin() {
  const a = educationData.skillDevelopment.administration;
  return "<h1>Programme Administration</h1>" +
    "<h2>Administrative Authority</h2>" +
    dl([
      ["Administrative Authority", a.administrativeAuthority],
      ["Project Officer", a.projectOfficer],
      ["Designation", a.projectOfficerDesignation],
      ["Year", a.projectOfficerYear],
      ["Source", a.projectOfficerSource]
    ]) +
    note("The Project Officer is the administrative authority for ITDA Paderu. This does not mean the officer personally conducted every training listed in this module.") +
    "<h2>Skill Development Department</h2>" +
    dl([
      ["Office", a.skillOffice],
      ["Designation", a.skillOfficerDesignation],
      ["Officer name", a.skillOfficerName],
      ["Source", a.skillOfficerSource]
    ]);
}

function renderSkillProgrammesList() {
  const documented = educationData.skillDevelopment.programmes.filter(function (p) { return p.documented; });
  return "<h1>Documented programmes</h1>" +
    note("Only activities with a supporting record are listed as programmes. General skill areas are separate.") +
    "<div class=\"ex-grid\">" + documented.map(skillProgrammeCard).join("") + "</div>";
}

function renderSkillAreas() {
  const areas = educationData.skillDevelopment.programmes.filter(function (p) { return !p.documented; });
  return "<h1>General skill areas</h1>" +
    note(NOT_ITDA_PROGRAMME) +
    "<div class=\"ex-grid\">" + areas.map(skillProgrammeCard).join("") + "</div>";
}

function renderSkillTimeline() {
  return "<h1>Last five years — timeline</h1>" +
    note("This timeline does not invent a named ITDA programme for every year. Open a year only for records that exist.") +
    "<div class=\"ex-grid\">" + educationData.skillDevelopment.timeline.map(function (y) {
      return cardLink("#skillDevelopment/year/" + y.id, y.year, y.title, y.programmes.length ? "Documented records" : "Focus areas only");
    }).join("") + "</div>";
}

function renderSkillYear() {
  const y = educationData.skillDevelopment.timeline.find(function (t) { return t.id === state.year; });
  if (!y) return "<p>Year not found.</p>";
  const progs = (y.programmes || []).map(getSkillProgramme).filter(Boolean);
  return "<h1>" + escapeHtml(y.year) + "</h1><h2>" + escapeHtml(y.title) + "</h2>" +
    "<p>" + escapeHtml(y.text) + "</p>" +
    (y.focus && y.focus.length
      ? "<h3>Focus areas</h3><ul class=\"ex-list\">" + y.focus.map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; }).join("") + "</ul>" +
        note("Historical programme-wise information should be added from ITDA / APSSDC / departmental reports where available.")
      : "") +
    (progs.length ? "<h3>Related records</h3><div class=\"ex-grid\">" + progs.map(skillProgrammeCard).join("") + "</div>" : "");
}

function renderSkillProgramme() {
  const p = getSkillProgramme(state.programmeId);
  if (!p) return "<p>Programme not found.</p>";
  const photos = skillPhotos(p.id);
  const gNote = p.id === "aarohan"
    ? "These four images belong on the AAROHAN programme page only. They are not used as ATL, EMRS, Ashram or Job Mela photographs."
    : "Photographs belong to this skill topic only. They are not used as ATL, EMRS, Ashram campus or AAROHAN batch photos unless that is what the image itself shows.";
  let html = "<h1>" + escapeHtml(p.name) + "</h1>" +
    (p.documented ? "" : note(p.caution || NOT_ITDA_PROGRAMME)) +
    "<p>" + escapeHtml(p.overview) + "</p>";
  if (photos.length && typeof topicPhotoGallery === "function") {
    html += "<h2>Programme photographs</h2>" + topicPhotoGallery(photos, gNote);
  }
  html += skillAuthorityCard(p);
  if (p.objective && p.objective !== NA) html += "<h2>Programme objective</h2><p>" + escapeHtml(p.objective) + "</p>";
  if (p.locations && p.locations.length) {
    html += "<h2>Locations</h2><ul class=\"ex-list\">" + p.locations.map(function (l) { return "<li>" + escapeHtml(l) + "</li>"; }).join("") + "</ul>";
  }
  if (p.location) html += "<p><strong>Location:</strong> " + escapeHtml(p.location) + "</p>";
  if (p.activities && p.activities.length) {
    html += "<h2>Activities</h2><ul class=\"ex-list\">" + p.activities.map(function (x) { return "<li>" + escapeHtml(x) + "</li>"; }).join("") + "</ul>";
  }
  if (p.learn && p.learn.length) {
    html += "<h2>What students learn</h2><ul class=\"ex-list\">" + p.learn.map(function (x) { return "<li>" + escapeHtml(x) + "</li>"; }).join("") + "</ul>";
  }
  if (p.journey && p.journey.length) {
    html += "<h2>Student / skill pathway</h2>" + skillPath(p.journey);
  }
  if (p.yearWise && p.yearWise.length) {
    html += "<h2>Year-wise data</h2><div class=\"ex-grid\">";
    p.yearWise.forEach(function (y) {
      html += "<article class=\"ex-stat\"><strong>" + escapeHtml(y.year) + "</strong><ul>" +
        y.items.map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") + "</ul></article>";
    });
    html += "</div>";
  }
  if (p.events && p.events.length) {
    html += "<h2>Documented events</h2>";
    p.events.forEach(function (ev) {
      html += "<article class=\"sk-sheet\"><h3>" + escapeHtml(ev.name) + "</h3><dl class=\"ex-dl\">" +
        (ev.date ? "<dt>Date</dt><dd>" + escapeHtml(ev.date) + "</dd>" : "") +
        (ev.time ? "<dt>Time</dt><dd>" + escapeHtml(ev.time) + "</dd>" : "") +
        "</dl><ul class=\"ex-list\">" +
        (ev.items || []).map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") +
        "</ul></article>";
    });
  }
  if (p.relatedHref) html += "<p><a class=\"ex-btn\" href=\"" + p.relatedHref + "\">Open Super 50 in Student Programmes</a></p>";
  if (p.caution) html += note(p.caution);
  if (!photos.length) {
    html += "<p class=\"ex-meta\">Photos: " + escapeHtml(p.photos || NA) + " · Documents: " + escapeHtml(p.documents || NA) + "</p>";
  }
  return html;
}

window.renderSkillExplorer = renderSkillExplorer;
window.getSkillProgramme = getSkillProgramme;
