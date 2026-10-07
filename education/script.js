/* ITDA Paderu Education Information Explorer — client-side routing only. */

const MODULES = [
  { id: "schools", name: "Schools" },
  { id: "residentialEducation", name: "Residential Education" },
  { id: "higherEducation", name: "Higher Education" },
  { id: "scholarships", name: "Scholarships" },
  { id: "skillDevelopment", name: "Skill Development" },
  { id: "careerGuidance", name: "Career Guidance" },
  { id: "studentProgrammes", name: "Student Programmes" },
  { id: "statistics", name: "Statistics" },
  { id: "faq", name: "FAQ" }
];

const state = {
  module: null,
  section: null,
  mandalId: null,
  categoryId: null,
  institutionId: null,
  programmeId: null,
  itemId: null,
  location: null,
  schemeId: null,
  careerId: null,
  progCat: null,
  type: null,
  atlView: null,
  learnId: null,
  calYear: null,
  year: null
};

function showModule(id) {
  if (id === "hub" || !id) {
    location.hash = "#hub";
    return;
  }
  location.hash = "#" + id;
}

function parseHash() {
  const raw = (location.hash || "#hub").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  Object.keys(state).forEach(function (k) { state[k] = null; });
  if (!parts.length || parts[0] === "hub") {
    state.module = null;
    return;
  }
  state.module = parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i];
    const val = decodeURIComponent(parts[i + 1] || "");
    if (key === "section") state.section = val;
    if (key === "mandal") state.mandalId = val;
    if (key === "cat") state.categoryId = val;
    if (key === "inst") state.institutionId = val;
    if (key === "prog") state.programmeId = val;
    if (key === "item") state.itemId = val;
    if (key === "loc") state.location = val;
    if (key === "scheme") state.schemeId = val;
    if (key === "career") state.careerId = val;
    if (key === "progcat") state.progCat = val;
    if (key === "type") state.type = val;
    if (key === "year") state.year = val;
    if (key === "atlview") { state.atlView = val; state.section = "atl"; }
    if (key === "atlitem") { state.itemId = val; state.section = "atl"; }
    if (key === "atllearn") { state.learnId = val; state.section = "atl"; }
    if (key === "atlcal") { state.calYear = val; state.section = "atl"; }
  }
}

function go() {
  const args = Array.prototype.slice.call(arguments);
  location.hash = "#" + args.join("/");
}

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cardLink(href, title, text, meta) {
  return "<a class=\"ex-card\" href=\"" + href + "\"><h3>" + escapeHtml(title) + "</h3>" +
    (text ? "<p>" + escapeHtml(text) + "</p>" : "") +
    (meta ? "<p class=\"ex-meta\">" + escapeHtml(meta) + "</p>" : "") + "</a>";
}

function note(text) {
  return "<p class=\"ex-note\">" + escapeHtml(text) + "</p>";
}

function placeholderImages(kind) {
  return "<figure class=\"ex-img-ph\"><p>" + escapeHtml(kind) + " images are not available in the supplied source. Unrelated photographs are not shown.</p></figure>";
}

function dl(rows) {
  return "<dl class=\"ex-dl\">" + rows.map(function (r) {
    return "<dt>" + escapeHtml(r[0]) + "</dt><dd>" + escapeHtml(r[1] || NA) + "</dd>";
  }).join("") + "</dl>";
}

function emptyProgrammeDetail() {
  return programmeDetailView({
    name: NA,
    category: NA,
    overview: NA,
    purpose: NA,
    whyConducted: NA,
    conductedBy: NA,
    implementedBy: NA,
    implementingDepartment: NA,
    implementingInstitution: NA,
    organizingTeam: NA,
    responsibleOfficer: NA,
    targetStudents: NA,
    academicYear: NA,
    date: NA,
    location: NA,
    activities: NA,
    participants: NA,
    facilities: NA,
    outcome: NA,
    photos: NA,
    documents: NA,
    source: NA,
    verificationStatus: "Verify latest official records.",
    lastUpdated: NA
  });
}

function programmeDetailView(p) {
  const rows = [
    ["Programme Name", p.name],
    ["Category", p.category],
    ["Overview", p.overview],
    ["Purpose", p.purpose],
    ["Why It Is Conducted / Why It Was Conducted", p.whyConducted],
    ["Conducted By", p.conductedBy],
    ["Implemented By", p.implementedBy],
    ["Implementing Department", p.implementingDepartment],
    ["Implementing Institution", p.implementingInstitution],
    ["Organizing Team", p.organizingTeam],
    ["Responsible Officer", p.responsibleOfficer],
    ["Target Students / Beneficiaries", p.targetStudents],
    ["Academic Year", p.academicYear],
    ["Date", p.date],
    ["Location", p.location],
    ["Activities", p.activities],
    ["Participants", p.participants],
    ["Facilities / Support", p.facilities],
    ["Outcome / Result", p.outcome],
    ["Photos", p.photos],
    ["Documents", p.documents],
    ["Source", p.source],
    ["Verification Status", p.verificationStatus],
    ["Last Updated", p.lastUpdated]
  ];
  let html = "<article class=\"ex-detail\"><h2>Programme Detail</h2>" + dl(rows);
  if (p.yearWise && p.yearWise.length) {
    html += "<h3>Year-wise data</h3><div class=\"ex-grid\">";
    p.yearWise.forEach(function (y) {
      html += "<article class=\"ex-stat\"><h4>" + escapeHtml(y.year) + "</h4><p class=\"ex-meta\">Year: " + escapeHtml(y.year) + "</p><ul>" +
        y.items.map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") + "</ul></article>";
    });
    html += "</div>";
  }
  if (p.selection) html += "<h3>Selection</h3><p>" + escapeHtml(p.selection) + "</p>";
  if (p.coaching) html += "<h3>Coaching</h3><p>" + escapeHtml(p.coaching) + "</p>";
  if (p.mentoring) html += "<h3>Mentoring</h3><p>" + escapeHtml(p.mentoring) + "</p>";
  html += placeholderImages("Programme") + "</article>";
  return html;
}

function getMandal(id) {
  return educationData.schools.mandals.find(function (m) { return m.id === id; });
}

const SCHOOL_ID_ALIASES = {
  "ashram-rajendrapalem-koyyuru": "ashram-rajomprapalem",
  "ashram-rajendrapalem": "ashram-rajomprapalem",
  "ashram-kommika": "ashram-kommika-girls",
  "ashram-kommika-koyyuru": "ashram-kommika-girls"
};

function resolveSchoolId(id) {
  return SCHOOL_ID_ALIASES[id] || id;
}

function getSchool(id) {
  const resolved = resolveSchoolId(id);
  return educationData.schools.institutions.find(function (s) { return s.id === resolved || s.id === id; });
}

function getResidentialInst(id) {
  const resolved = resolveSchoolId(id);
  return educationData.residentialEducation.institutions.find(function (i) { return i.id === resolved || i.id === id; });
}

function renderBreadcrumb() {
  const nav = document.getElementById("eduBreadcrumb");
  const bits = ["<a href=\"#hub\">Education</a>"];
  const mod = MODULES.find(function (m) { return m.id === state.module; });
  if (mod) bits.push("<a href=\"#" + mod.id + "\">" + mod.name + "</a>");
  if (state.section) bits.push("<span>" + escapeHtml(state.section) + "</span>");
  if (state.mandalId) {
    const m = getMandal(state.mandalId);
    bits.push("<a href=\"#schools/mandal/" + state.mandalId + "\">" + escapeHtml(m ? m.name : state.mandalId) + "</a>");
  }
  if (state.categoryId && state.module === "residentialEducation") {
    const c = educationData.residentialEducation.categories.find(function (x) { return x.id === state.categoryId; });
    bits.push("<a href=\"#residentialEducation/cat/" + state.categoryId + "\">" + escapeHtml(c ? c.name : state.categoryId) + "</a>");
  }
  if (state.categoryId && state.module === "skillDevelopment") {
    const c = educationData.skillDevelopment.categories.find(function (x) { return x.id === state.categoryId; });
    bits.push("<a href=\"#skillDevelopment/cat/" + state.categoryId + "\">" + escapeHtml(c ? c.name : state.categoryId) + "</a>");
  }
  if (state.module === "skillDevelopment" && state.year) {
    bits.push("<a href=\"#skillDevelopment/section/timeline\">Timeline</a>");
    bits.push("<span>" + escapeHtml(state.year) + "</span>");
  }
  if (state.module === "skillDevelopment" && state.programmeId) {
    const sp = typeof getSkillProgramme === "function" ? getSkillProgramme(state.programmeId) : null;
    bits.push("<span>" + escapeHtml(sp ? sp.name : state.programmeId) + "</span>");
  }
  if (state.categoryId && state.module === "careerGuidance") {
    const c = educationData.careerGuidance.categories.find(function (x) { return x.id === state.categoryId; });
    bits.push("<a href=\"#careerGuidance/cat/" + state.categoryId + "\">" + escapeHtml(c ? c.name : state.categoryId) + "</a>");
  }
  if (state.categoryId && state.module === "studentProgrammes") {
    const c = educationData.studentProgrammes.categories.find(function (x) { return x.id === state.categoryId; });
    bits.push("<a href=\"#studentProgrammes/cat/" + state.categoryId + "\">" + escapeHtml(c ? c.name : state.categoryId) + "</a>");
  }
  if (state.location) bits.push("<a href=\"#higherEducation/loc/" + encodeURIComponent(state.location) + "\">" + escapeHtml(state.location) + "</a>");
  if (state.section === "atl" || state.atlView) bits.push("<a href=\"#schools/section/atl\">ATL Lab</a>");
  if (state.atlView && state.atlView !== "overview") bits.push("<span>" + escapeHtml(state.atlView) + "</span>");
  if (state.learnId) bits.push("<span>Learning</span>");
  if (state.calYear) bits.push("<span>" + escapeHtml(state.calYear) + "</span>");
  if (state.institutionId) {
    const inst = getSchool(state.institutionId) ||
      educationData.residentialEducation.institutions.find(function (i) { return i.id === state.institutionId; }) ||
      educationData.higherEducation.institutions.find(function (i) { return i.id === state.institutionId; });
    if (inst) bits.push("<span>" + escapeHtml(inst.name) + "</span>");
  }
  if (state.schemeId) {
    const s = educationData.scholarships.schemes.find(function (x) { return x.id === state.schemeId; });
    bits.push("<span>" + escapeHtml(s ? s.name : "Scheme Details") + "</span>");
  }
  if (state.careerId) {
    const c = educationData.careerGuidance.careers.find(function (x) { return x.id === state.careerId; });
    bits.push("<span>" + escapeHtml(c ? c.name : "Career Details") + "</span>");
  }
  if (state.progCat) bits.push("<span>" + escapeHtml(state.progCat) + "</span>");
  if (state.programmeId && state.module !== "skillDevelopment") bits.push("<span>Programme Details</span>");
  if (state.itemId) bits.push("<span>Details</span>");
  nav.innerHTML = bits.join(" <span class=\"separator\">/</span> ");
}

function renderModuleBar() {
  const bar = document.getElementById("eduModuleBar");
  bar.innerHTML = "<a href=\"#hub\" class=\"" + (!state.module ? "is-on" : "") + "\">Education Home</a>" +
    MODULES.map(function (m) {
      return "<a href=\"#" + m.id + "\" class=\"" + (state.module === m.id ? "is-on" : "") + "\">" + m.name + "</a>";
    }).join("");
}

function renderHub() {
  return "<header class=\"ex-hero\"><p class=\"ex-kicker\">ITDA Paderu · Alluri Sitharama Raju District</p>" +
    "<h1>Education Information Explorer</h1>" +
    "<p>Open one module at a time. Each module shows only its own information. Named schools, officers, amounts, dates and photographs are shown only when present in the supplied source.</p></header>" +
    "<div class=\"ex-grid\">" +
    MODULES.map(function (m) {
      return cardLink("#" + m.id, m.name, "Open this module only.", "");
    }).join("") + "</div>";
}

function renderSchools() {
  if (typeof renderSchoolsExplorer === "function") return renderSchoolsExplorer();
  if (state.institutionId) return renderSchoolProfile();
  if (state.mandalId) return renderSelectSchool();
  if (state.section) return renderSchoolSection();

  return "<h1>Schools</h1><p>" + escapeHtml(educationData.schools.overview) + "</p>" +
    "<h2>School sections</h2><div class=\"ex-grid\">" +
    educationData.schools.sections.map(function (s) {
      return cardLink("#schools/section/" + s.id, s.name, "Schools module only.", "");
    }).join("") + "</div>" +
    "<h2>Select Mandal</h2><div class=\"ex-grid\">" +
    educationData.schools.mandals.map(function (m) {
      return cardLink("#schools/mandal/" + m.id, m.name, m.network, "Then select a school");
    }).join("") + "</div>";
}

function renderSchoolSection() {
  const s = educationData.schools.sections.find(function (x) { return x.id === state.section; });
  const title = s ? s.name : state.section;
  const texts = {
    overview: educationData.schools.overview,
    government: "Government schools are part of the 11-mandal education network. Named government school lists are not published on this page.",
    "tribal-welfare": "Tribal Welfare is a major part of education in the Paderu agency area, including Ashram Schools and Government Primary Schools under Tribal Welfare (non-residential). The 667 primary-school figure is the Tribal Welfare Department network, not all district schools.",
    primary: "667 Government Primary Schools under Tribal Welfare supervision (network total). Individual names and mandal-wise splits of the 667 are not published here.",
    "upper-primary": "Government Upper Primary Schools are part of the pathway from primary toward SSC. Named lists are not published here.",
    high: "Government High Schools support secondary schooling toward SSC. Named lists are not published here.",
    complexes: "77 School Complex Headmasters are documented in the Tribal Welfare network. Complex-wise named lists are not published here.",
    infrastructure: NA,
    monitoring: "Academic supervision includes school-complex monitoring (77 School Complex Headmasters in the documented network).",
    statistics: "See the Statistics module for indicator cards. This Schools module does not repeat other modules’ scholarship or higher-education figures as school counts.",
    programmes: "Named school-wise programme calendars are not in the supplied source. Super 50 is documented under Student Programmes, not as a named-school event.",
    activities: "School activity calendars, sports meets and cultural event lists are not in the supplied source."
  };
  return "<h1>" + escapeHtml(title) + "</h1>" + note(texts[state.section] || NA) +
    (state.section === "statistics" ? "" : "<p><a class=\"ex-btn\" href=\"#schools\">Select Mandal</a></p>") +
    placeholderImages("School");
}

function renderSelectSchool() {
  const m = getMandal(state.mandalId);
  if (!m) return "<p>Mandal not found.</p>";
  const list = educationData.schools.institutions.filter(function (i) { return i.mandalId === state.mandalId; });
  return "<h1>Select School · " + escapeHtml(m.name) + "</h1>" +
    note("Named institutions here are EMRS locations from the planning dataset. Other rows are network records. Verify UDISE+ and department lists.") +
    "<div class=\"ex-grid\">" + list.map(function (i) {
      const meta = i.named ? "Named institution" : "Network record — names not published";
      return cardLink("#schools/mandal/" + state.mandalId + "/inst/" + i.id, i.name, i.schoolType, meta);
    }).join("") + "</div>";
}

function renderSchoolProfile() {
  const inst = getSchool(state.institutionId);
  if (!inst) return "<p>Institution not found.</p>";
  return "<h1>School Profile</h1>" +
    dl([
      ["School Name", inst.name],
      ["Mandal", inst.mandal],
      ["School Type", inst.schoolType],
      ["Management", inst.management],
      ["Classes", inst.classes],
      ["Residential / Non-Residential", inst.residential],
      ["Facilities", inst.facilities],
      ["Academic Information", inst.academicInformation],
      ["Student Information", inst.studentInformation],
      ["School Images", NA],
      ["School Documents", NA]
    ]) +
    (typeof schoolPhotoGallery === "function"
      ? "<h2>School-specific images</h2>" + schoolPhotoGallery(inst)
      : placeholderImages("School")) +
    "<h2>School Programmes</h2>" +
    note("No named school-level programmes are attached to this institution in the supplied source.") +
    "<div class=\"ex-grid\">" +
    educationData.schools.programmeCategories.map(function (c) {
      const slug = encodeURIComponent(c);
      return cardLink("#schools/mandal/" + inst.mandalId + "/inst/" + inst.id + "/progcat/" + slug, c, "Open category", "");
    }).join("") + "</div>";
}

function renderSchoolProgrammes() {
  const inst = getSchool(state.institutionId);
  const cat = state.progCat ? decodeURIComponent(state.progCat) : "Programme";
  if (state.programmeId) {
    return emptyProgrammeDetail();
  }
  return "<h1>Select Programme · " + escapeHtml(cat) + "</h1>" +
    note("No named programmes in this category are published for " + (inst ? inst.name : "this school") + ".") +
    "<p><a class=\"ex-btn\" href=\"#schools/mandal/" + (inst ? inst.mandalId : "") + "/inst/" + (inst ? inst.id : "") + "/progcat/" + encodeURIComponent(cat) + "/prog/none\">Open empty programme detail template</a></p>";
}

function renderResidential() {
  if (state.programmeId) return emptyProgrammeDetail();
  if (state.institutionId) return renderResProfile();
  if (state.categoryId) return renderResCategory();
  return "<h1>Residential Education</h1><p>" + escapeHtml(educationData.residentialEducation.overview) + "</p>" +
    "<h2>Select Category</h2><div class=\"ex-grid\">" +
    educationData.residentialEducation.categories.map(function (c) {
      return cardLink("#residentialEducation/cat/" + c.id, c.name, "Residential module only.", "");
    }).join("") + "</div>";
}

function renderResCategory() {
  const c = educationData.residentialEducation.categories.find(function (x) { return x.id === state.categoryId; });
  if (!c) return "<p>Category not found.</p>";
  if (c.kind === "stats") {
    const items = educationData.statistics.indicators.filter(function (i) { return i.group === "Residential Statistics"; });
    return "<h1>" + escapeHtml(c.name) + "</h1><div class=\"ex-grid\">" + items.map(statCard).join("") + "</div>";
  }
  if (c.kind === "text") {
    return "<h1>" + escapeHtml(c.name) + "</h1>" + note(educationData.residentialEducation.texts[c.id] || NA) +
      placeholderImages("Residential") +
      "<p><a class=\"ex-btn\" href=\"#residentialEducation/cat/" + c.id + "/prog/none\">Programme detail template</a></p>";
  }
  const list = educationData.residentialEducation.institutions.filter(function (i) { return i.categoryId === c.id; });
  let extra = "";
  if (c.id === "ashram" && typeof topicPhotoGallery === "function" && educationData.topicPhotos) {
    extra = "<h2>Ashram campus photograph</h2>" +
      topicPhotoGallery(educationData.topicPhotos.ashramCampus, "Campus photograph for Ashram Schools. School name is not printed on the image.");
  }
  return "<h1>Select Institution · " + escapeHtml(c.name) + "</h1>" +
    note(c.id === "emrs" ? "Named EMRS places from the planning dataset." : "Named Ashram schools from entrance boards, plus mandal network counts. Names are not invented.") +
    extra +
    "<div class=\"ex-grid\">" + list.map(function (i) {
      return cardLink("#residentialEducation/cat/" + c.id + "/inst/" + i.id, i.name, i.mandal, i.named ? "Named" : "Network");
    }).join("") + "</div>";
}

function renderResProfile() {
  const inst = getResidentialInst(state.institutionId);
  if (!inst) return "<p>Institution not found.</p>";
  return "<h1>Institution Profile</h1>" +
    dl([
      ["Name", inst.name],
      ["Mandal", inst.mandal],
      ["Village", inst.village || NA],
      ["Type", inst.schoolType],
      ["Management", inst.management],
      ["Classes", inst.classes],
      ["Residential", inst.residential],
      ["Facilities", inst.facilities],
      ["Academic Information", inst.academicInformation],
      ["Student Information", inst.studentInformation]
    ]) +
    (typeof schoolPhotoGallery === "function"
      ? "<h2>School-specific images</h2>" + schoolPhotoGallery(inst)
      : placeholderImages("Residential")) +
    "<h2>Residential Programme</h2>" +
    note("No named institution-level residential programmes are in the supplied source. Super 50 is under Student Programmes.") +
    "<p><a class=\"ex-btn\" href=\"#residentialEducation/cat/" + inst.categoryId + "/inst/" + inst.id + "/prog/none\">Programme Details</a></p>";
}

function renderHigher() {
  if (state.programmeId) return emptyProgrammeDetail();
  if (state.institutionId) return renderCollegeProfile();
  const insts = educationData.higherEducation.institutions.filter(function (i) {
    if (!state.location) return true;
    return i.location === decodeURIComponent(state.location);
  });
  const locations = [];
  educationData.higherEducation.institutions.forEach(function (i) {
    if (locations.indexOf(i.location) === -1) locations.push(i.location);
  });
  return "<h1>Higher Education</h1><p>" + escapeHtml(educationData.higherEducation.overview) + "</p>" +
    "<h2>Sections</h2><ul class=\"ex-list\">" + educationData.higherEducation.sections.map(function (s) {
      return "<li>" + escapeHtml(s) + " — course lists and unnamed junior/technical colleges are not invented on this page.</li>";
    }).join("") + "</ul>" +
    "<h2>Location</h2><div class=\"ex-grid\">" + locations.map(function (loc) {
      return cardLink("#higherEducation/loc/" + encodeURIComponent(loc), loc, "Filter institutions", "");
    }).join("") + "</div>" +
    "<h2>Institution</h2><div class=\"ex-grid\">" + insts.map(function (i) {
      return cardLink("#higherEducation/inst/" + i.id, i.name, i.location + " · " + i.type, "No course list");
    }).join("") + "</div>";
}

function renderCollegeProfile() {
  const i = educationData.higherEducation.institutions.find(function (x) { return x.id === state.institutionId; });
  if (!i) return "<p>Institution not found.</p>";
  return "<h1>Institution Profile</h1>" +
    dl([
      ["Institution", i.name],
      ["Location", i.location],
      ["Type", i.type],
      ["Gender focus", i.gender],
      ["Courses", "Course lists are not published on this page."],
      ["Student Facilities", NA],
      ["Programmes", "Named college-wise programmes are not in the supplied source."]
    ]) +
    placeholderImages("Higher education") +
    "<p><a class=\"ex-btn\" href=\"#higherEducation/inst/" + i.id + "/prog/none\">Programme Details</a></p>";
}

function renderScholarships() {
  if (state.schemeId) {
    const s = educationData.scholarships.schemes.find(function (x) { return x.id === state.schemeId; });
    if (!s) return "<p>Scheme not found.</p>";
    return "<h1>Scheme Details</h1>" +
      dl([
        ["Scheme Name", s.name],
        ["Purpose", s.purpose],
        ["Eligibility", s.eligibility],
        ["Education Level", s.educationLevel],
        ["Application Process", s.applicationProcess],
        ["Documents", s.documents],
        ["Benefits", s.benefits],
        ["Implementing Authority", s.implementingAuthority],
        ["Application Portal", s.applicationPortal],
        ["Important Dates", s.importantDates],
        ["Source", s.source],
        ["Last Updated", s.lastUpdated]
      ]) +
      note("Never treat placeholder text as a notified amount or deadline.");
  }
  return "<h1>Scholarships</h1><p>" + escapeHtml(educationData.scholarships.overview) + "</p>" +
    "<h2>Select Scheme</h2><div class=\"ex-grid\">" +
    educationData.scholarships.schemes.map(function (s) {
      return cardLink("#scholarships/scheme/" + s.id, s.name, "Scheme details — verify official notification", "");
    }).join("") + "</div>";
}

function renderSkills() {
  if (typeof renderSkillExplorer === "function") return renderSkillExplorer();
  return "<h1>Skill Development</h1><p>" + escapeHtml(educationData.skillDevelopment.overview) + "</p>";
}

function renderCareers() {
  if (state.careerId) {
    const c = educationData.careerGuidance.careers.find(function (x) { return x.id === state.careerId; });
    if (!c) return "<p>Career not found.</p>";
    return "<h1>Career Details</h1>" +
      dl([
        ["Career", c.name],
        ["Qualification", c.qualification],
        ["Skills", c.skills],
        ["Preparation", c.preparation],
        ["Possible Employment Areas", c.employment],
        ["Higher Education Pathway", c.higherPathway],
        ["Relevant Government Examination", c.exam],
        ["Source", c.source]
      ]) +
      note("Do not treat this page as a current vacancy list.");
  }
  if (state.categoryId) {
    const cat = educationData.careerGuidance.categories.find(function (c) { return c.id === state.categoryId; });
    const list = educationData.careerGuidance.careers.filter(function (c) { return c.categoryId === state.categoryId; });
    return "<h1>" + escapeHtml(cat ? cat.name : "Career") + "</h1><div class=\"ex-grid\">" +
      list.map(function (c) {
        return cardLink("#careerGuidance/cat/" + c.categoryId + "/career/" + c.id, c.name, "Career details", "");
      }).join("") + "</div>";
  }
  return "<h1>Career Guidance</h1><p>" + escapeHtml(educationData.careerGuidance.overview) + "</p>" +
    "<div class=\"ex-grid\">" + educationData.careerGuidance.categories.map(function (c) {
      return cardLink("#careerGuidance/cat/" + c.id, c.name, "Career category", "");
    }).join("") + "</div>";
}

function studentNav() {
  const items = [
    ["home", "Overview", "#studentProgrammes"],
    ["stats", "Statistics", "#studentProgrammes/section/statistics"],
    ["super50", "Super 50", "#studentProgrammes/cat/super50"],
    ["cultural", "Cultural Activities", "#studentProgrammes/cat/cultural"]
  ];
  return "<nav class=\"sch-nav\" aria-label=\"Student Programmes sections\">" + items.map(function (it) {
    const on =
      (it[0] === "home" && !state.section && !state.categoryId && !state.programmeId) ||
      (it[0] === "stats" && state.section === "statistics") ||
      (it[0] === "super50" && (state.categoryId === "super50" || state.programmeId === "super50")) ||
      (it[0] === "cultural" && state.categoryId === "cultural")
        ? " is-on" : "";
    return "<a class=\"" + on + "\" href=\"" + it[2] + "\">" + it[1] + "</a>";
  }).join("") + "</nav>";
}

function studentStatCards(limit) {
  const s = educationData.studentProgrammes.stats;
  const cards = limit ? s.cards.slice(0, limit) : s.cards;
  return "<div class=\"ex-grid\">" + cards.map(function (c) {
    return "<article class=\"ex-stat\"><strong>" + escapeHtml(c.value) + "</strong><span>" + escapeHtml(c.label) + "</span>" +
      "<small>Year: " + escapeHtml(c.year) + "</small>" +
      "<small>" + escapeHtml(c.detail) + "</small>" +
      "<small>Source: " + escapeHtml(s.source) + "</small></article>";
  }).join("") + "</div>";
}

function renderStudentProgrammes() {
  if (state.programmeId) {
    const p = educationData.studentProgrammes.programmes.find(function (x) { return x.id === state.programmeId; });
    if (!p) return studentNav() + emptyProgrammeDetail();
    return studentNav() + programmeDetailView(p);
  }
  if (state.section === "statistics") {
    const s = educationData.studentProgrammes.stats;
    return studentNav() + "<h1>" + escapeHtml(s.title) + "</h1><p>" + escapeHtml(s.intro) + "</p>" +
      studentStatCards() +
      note(s.verification) +
      "<p><a class=\"ex-btn\" href=\"#studentProgrammes/cat/super50/prog/super50\">Open Super 50 programme details</a></p>";
  }
  if (state.categoryId) {
    const cat = educationData.studentProgrammes.categories.find(function (c) { return c.id === state.categoryId; });
    const progs = educationData.studentProgrammes.programmes.filter(function (p) { return p.categoryId === state.categoryId; });
    if (!progs.length) {
      let extra = "";
      if (state.categoryId === "cultural" && typeof topicPhotoGallery === "function" && educationData.topicPhotos) {
        extra = "<h2>Cultural activity photographs</h2>" +
          topicPhotoGallery(educationData.topicPhotos.cultural, "Photographs for Cultural Activities. Event name and date are not printed on the images.");
      }
      return studentNav() + "<h1>" + escapeHtml(cat ? cat.name : "Programme") + "</h1>" +
        note("No officially documented named programme or statistics in this category are in the supplied source.") +
        extra +
        "<p><a class=\"ex-btn\" href=\"#studentProgrammes/cat/" + state.categoryId + "/prog/none\">Programme detail template</a></p>";
    }
    return studentNav() + "<h1>" + escapeHtml(cat.name) + "</h1>" +
      (state.categoryId === "super50" ? "<p>" + escapeHtml(educationData.studentProgrammes.stats.intro) + "</p>" + studentStatCards(6) + "<p><a class=\"ex-btn\" href=\"#studentProgrammes/section/statistics\">All Super 50 statistics</a></p>" : "") +
      "<div class=\"ex-grid\">" +
      progs.map(function (p) {
        return cardLink("#studentProgrammes/cat/" + p.categoryId + "/prog/" + p.id, p.name, p.overview, "Officially documented programme figures");
      }).join("") + "</div>";
  }
  const s = educationData.studentProgrammes.stats;
  return studentNav() +
    "<header class=\"ex-hero\"><p class=\"ex-kicker\">Tribal Welfare · Student programmes</p>" +
    "<h1>Student Programmes</h1><p>" + escapeHtml(educationData.studentProgrammes.overview) + "</p></header>" +
    "<h2>" + escapeHtml(s.title) + "</h2><p>" + escapeHtml(s.intro) + "</p>" +
    studentStatCards(6) +
    "<p><a class=\"ex-btn\" href=\"#studentProgrammes/section/statistics\">View all Super 50 statistics</a> " +
    "<a class=\"ex-btn\" href=\"#studentProgrammes/cat/super50/prog/super50\">Super 50 details</a></p>" +
    "<h2>Programme categories</h2><div class=\"ex-grid\">" +
    educationData.studentProgrammes.categories.map(function (c) {
      return cardLink("#studentProgrammes/cat/" + c.id, c.name, c.id === "super50" ? "Documented year-wise figures and statistics" : "No official counts in the supplied source", c.id === "super50" ? "Statistics available" : "Category");
    }).join("") + "</div>";
}

function statCard(i) {
  return "<article class=\"ex-stat\"><strong>" + escapeHtml(i.value) + "</strong><span>" + escapeHtml(i.indicator) + "</span>" +
    "<small>Year: " + escapeHtml(i.year) + "</small>" +
    "<small>Source: " + escapeHtml(i.source) + "</small>" +
    "<small>Verification: " + escapeHtml(i.verificationStatus) + "</small></article>";
}

function renderStatistics() {
  const groups = ["Mandal Statistics", "School Statistics", "Residential Statistics", "Higher Education Statistics", "Student Programme Statistics"];
  let html = "<h1>Statistics</h1><p>" + escapeHtml(educationData.statistics.overview) + "</p>";
  groups.forEach(function (g) {
    const items = educationData.statistics.indicators.filter(function (i) { return i.group === g; });
    html += "<h2>" + escapeHtml(g) + "</h2>";
    if (!items.length) {
      html += note("No additional indicators for this group are in the supplied source. Super 50 figures are in Student Programmes with years labelled on each card. Degree college counts are not summarised as a statistic beyond the named institution list.");
    } else {
      html += "<div class=\"ex-grid\">" + items.map(statCard).join("") + "</div>";
    }
  });
  return html;
}

function renderFaq() {
  return "<h1>FAQ</h1><p>Education FAQs only. Answers use the supplied source.</p>" +
    educationData.faq.map(function (item, idx) {
      return "<div class=\"ex-faq\"><button type=\"button\" class=\"ex-faq-q\" aria-expanded=\"false\" data-faq=\"" + idx + "\">" +
        escapeHtml(item.q) + "</button><div class=\"ex-faq-a\" hidden><p>" + escapeHtml(item.a) + "</p></div></div>";
    }).join("");
}

function renderApp() {
  parseHash();
  renderModuleBar();
  renderBreadcrumb();
  const root = document.getElementById("eduApp");
  let html = "";
  switch (state.module) {
    case "schools": html = renderSchools(); break;
    case "residentialEducation": html = renderResidential(); break;
    case "higherEducation": html = renderHigher(); break;
    case "scholarships": html = renderScholarships(); break;
    case "skillDevelopment": html = renderSkills(); break;
    case "careerGuidance": html = renderCareers(); break;
    case "studentProgrammes": html = renderStudentProgrammes(); break;
    case "statistics": html = renderStatistics(); break;
    case "faq": html = renderFaq(); break;
    default: html = renderHub();
  }
  root.innerHTML = html;
  root.querySelectorAll(".ex-faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const open = btn.getAttribute("aria-expanded") === "true";
      root.querySelectorAll(".ex-faq-q").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        if (b.nextElementSibling) b.nextElementSibling.hidden = true;
      });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (btn.nextElementSibling) btn.nextElementSibling.hidden = open;
    });
  });
  window.scrollTo(0, 0);
}

function getActiveModuleContext() {
  const ctx = {
    activeModule: state.module || "hub",
    selectedMandal: null,
    selectedSchool: null,
    selectedInstitution: null,
    selectedProgramme: null,
    selectedScheme: null,
    selectedCareer: null,
    relevantData: null
  };
  if (state.mandalId) {
    const m = getMandal(state.mandalId);
    ctx.selectedMandal = m ? m.name : state.mandalId;
  }
  if (state.institutionId) {
    const inst = getSchool(state.institutionId) ||
      educationData.residentialEducation.institutions.find(function (i) { return i.id === state.institutionId; }) ||
      educationData.higherEducation.institutions.find(function (i) { return i.id === state.institutionId; });
    ctx.selectedSchool = inst ? inst.name : state.institutionId;
    ctx.selectedInstitution = inst || null;
  }
  if (state.programmeId && state.programmeId !== "none") {
    ctx.selectedProgramme = educationData.studentProgrammes.programmes.find(function (p) { return p.id === state.programmeId; }) || { id: state.programmeId };
  }
  if (state.schemeId) {
    ctx.selectedScheme = educationData.scholarships.schemes.find(function (s) { return s.id === state.schemeId; });
  }
  if (state.careerId) {
    ctx.selectedCareer = educationData.careerGuidance.careers.find(function (c) { return c.id === state.careerId; });
  }
  if (state.module === "schools") {
    ctx.relevantData = {
      mandals: educationData.schools.mandals,
      institutions: educationData.schools.institutions.filter(function (i) {
        return !state.mandalId || i.mandalId === state.mandalId;
      }),
      programmes: [],
      atl: state.section === "atl" ? atlData : null,
      selectedAtlProgramme: (typeof atlData !== "undefined" && state.itemId) ? atlData.programmes.find(function (p) { return p.id === state.itemId; }) : null
    };
  } else if (state.module === "residentialEducation") {
    ctx.relevantData = {
      categories: educationData.residentialEducation.categories,
      institutions: educationData.residentialEducation.institutions,
      overview: educationData.residentialEducation.overview
    };
  } else if (state.module === "higherEducation") {
    ctx.relevantData = educationData.higherEducation;
  } else if (state.module === "scholarships") {
    ctx.relevantData = educationData.scholarships;
  } else if (state.module === "skillDevelopment") {
    const sp = typeof getSkillProgramme === "function" ? getSkillProgramme(state.programmeId) : null;
    ctx.selectedProgramme = sp || null;
    ctx.relevantData = {
      overview: educationData.skillDevelopment.overview,
      namingNote: educationData.skillDevelopment.namingNote,
      implementingDistinction: educationData.skillDevelopment.implementingDistinction,
      administration: educationData.skillDevelopment.administration,
      selectedProgramme: sp || null,
      selectedYear: state.year || null,
      programmes: educationData.skillDevelopment.programmes.map(function (p) {
        return { id: p.id, name: p.name, conductedBy: p.conductedBy, administrativeAuthority: p.administrativeAuthority, documented: p.documented, year: p.year, caution: p.caution };
      }),
      timeline: educationData.skillDevelopment.timeline
    };
  } else if (state.module === "careerGuidance") {
    ctx.relevantData = educationData.careerGuidance;
  } else if (state.module === "studentProgrammes") {
    ctx.relevantData = educationData.studentProgrammes;
  } else if (state.module === "statistics") {
    ctx.relevantData = educationData.statistics;
  } else if (state.module === "faq") {
    ctx.relevantData = educationData.faq;
  } else {
    ctx.relevantData = { modules: MODULES };
  }
  return ctx;
}

function localModuleAnswer(question) {
  const q = question.toLowerCase();
  const ctx = getActiveModuleContext();
  const mod = ctx.activeModule;
  if (mod === "schools") {
    if (/programme/.test(q)) return "No named school-level programmes are attached to the selected school in the supplied source. Super 50 is documented by Tribal Welfare (open Schools → Super 50). ATL programmes are national AIM activity types unless a school ATL is verified.";
    if (/atl/.test(q)) return atlData.overview.notItda + " " + atlData.overview.what;
    if (ctx.selectedSchool) return "Selected school: " + ctx.selectedSchool + (ctx.selectedMandal ? " (Mandal: " + ctx.selectedMandal + ")." : "");
    if (ctx.selectedMandal) return "Mandal " + ctx.selectedMandal + " is selected. Choose a school. Named EMRS places are listed; other schools are network records.";
    return educationData.schools.overview;
  }
  if (mod === "residentialEducation") return educationData.residentialEducation.overview;
  if (mod === "higherEducation") return educationData.higherEducation.overview;
  if (mod === "scholarships") return educationData.scholarships.overview;
  if (mod === "skillDevelopment") {
    const sd = educationData.skillDevelopment;
    const sp = ctx.selectedProgramme;
    if (sp) {
      return sp.name + " — Conducted by: " + (sp.conductedBy || NA) + ". Administrative authority: " + (sp.administrativeAuthority || NA) + ". " + (sp.overview || "") + " " + (sp.caution || "");
    }
    if (/aarohan|datapro|webpulse|koyyuru|fynity|mern/.test(q)) {
      const p = sd.programmes.find(function (x) { return x.id === "aarohan"; });
      return p.overview + " Conducted by " + p.conductedBy + " in association with ITDA Paderu. " + p.caution;
    }
    if (/job\s*mela|employment exchange/.test(q)) {
      const p = sd.programmes.find(function (x) { return x.id === "employment"; });
      return p.overview;
    }
    if (/sisal|lantana/.test(q)) {
      const p = sd.programmes.find(function (x) { return x.id === "sisal"; });
      return p.overview;
    }
    if (/coffee/.test(q)) {
      const p = sd.programmes.find(function (x) { return x.id === "coffee"; });
      return p.overview;
    }
    if (/super\s*50/.test(q)) {
      const p = sd.programmes.find(function (x) { return x.id === "super50-pathway"; });
      return p.overview + " " + p.yearWise[0].items.join("; ");
    }
    return sd.overview + " " + sd.namingNote;
  }
  if (mod === "careerGuidance") return educationData.careerGuidance.overview;
  if (mod === "studentProgrammes") {
    const p = educationData.studentProgrammes.programmes[0];
    if (/super\s*50/.test(q) || ctx.activeModule === "studentProgrammes") {
      if (/super\s*50/.test(q) || (ctx.selectedProgramme && ctx.selectedProgramme.id === "super50")) {
        return p.overview + " " + p.yearWise.map(function (y) { return y.year + ": " + y.items.join("; "); }).join(" | ");
      }
    }
    return educationData.studentProgrammes.overview;
  }
  if (mod === "statistics") return educationData.statistics.overview;
  if (mod === "faq") return educationData.faq.map(function (f) { return f.q; }).join(" / ");
  return "Ask about the open Education module. Switch modules from the bar to change chatbot context.";
}

async function askEducationAssistant(question) {
  const q = String(question || "").trim();
  if (!q) return "Type a question about the open Education module.";
  const ctx = getActiveModuleContext();
  const local = localModuleAnswer(q);
  const rag = "Active Module: " + ctx.activeModule + "\nSelected Mandal: " + (ctx.selectedMandal || "none") +
    "\nSelected School/Institution: " + (ctx.selectedSchool || "none") +
    "\nContext JSON:\n" + JSON.stringify(ctx.relevantData) +
    "\nRules: Answer only from this module context. Do not invent officers, dates, amounts or photos. If missing, say Information not available in the supplied source.";
  if (typeof askOllamaAPI === "function") {
    const L = typeof getLang === "function" ? getLang() : "en";
    try {
      const res = await askOllamaAPI(q, rag, L);
      if (res && res.success && res.text) return res.text;
    } catch (e) { /* local fallback */ }
  }
  return local;
}

function wrapEducationChat() {
  if (window._eduExplorerChat) return;
  window._eduExplorerChat = true;
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
    addBotMessage(answer, "Ask ITDA Education · " + (state.module || "hub"));
  };
}

window.addEventListener("hashchange", renderApp);
document.addEventListener("DOMContentLoaded", function () {
  renderApp();
  setTimeout(function () {
    if (typeof injectChatbotDOM === "function") injectChatbotDOM();
    const title = document.querySelector(".chat-header-title h4");
    const sub = document.querySelector(".chat-header-title .subtitle");
    if (title) title.textContent = "Ask ITDA Education";
    if (sub) sub.textContent = "Answers follow the open module";
    wrapEducationChat();
  }, 400);
});
