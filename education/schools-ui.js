/* Schools Overview + ATL explorer. Loaded after education-data.js, atl-data.js, script.js helpers. */

function schoolNav() {
  const items = [
    ["overview", "School Overview"],
    ["primary", "Government Primary Schools"],
    ["tw-schools", "Tribal Welfare Schools"],
    ["ashram", "Ashram Schools"],
    ["emrs", "EMRS"],
    ["complexes", "School Complexes"],
    ["mandals", "Mandal-wise Schools"],
    ["programmes", "School Programmes"],
    ["academic", "Academic Support"],
    ["super50", "Super 50"],
    ["welfare", "Student Welfare"],
    ["sports", "Sports & Cultural"],
    ["statistics", "School Statistics"],
    ["atl", "ATL Lab"],
    ["admin", "Administration"]
  ];
  return "<nav class=\"sch-nav\" aria-label=\"Schools sections\">" + items.map(function (it) {
    const href = it[0] === "mandals" ? "#schools" : (it[0] === "atl" ? "#schools/section/atl" : "#schools/section/" + it[0]);
    const on = (it[0] === "atl" && (state.section === "atl" || state.atlView || state.learnId || state.calYear || (state.itemId && typeof atlData !== "undefined" && atlData.programmes.some(function (p) { return p.id === state.itemId; })))) ||
      (it[0] !== "atl" && it[0] !== "mandals" && state.section === it[0]) ||
      (it[0] === "mandals" && state.mandalId && !state.section) ? " is-on" : "";
    return "<a class=\"" + on + "\" href=\"" + href + "\">" + it[1] + "</a>";
  }).join("") + "</nav>";
}

function mediaSlots(kind, labels) {
  return "<div class=\"ex-gallery\">" + labels.map(function (lab) {
    return "<figure class=\"ex-media-card\"><div class=\"ex-media-ph\" aria-hidden=\"true\"></div>" +
      "<figcaption><strong>" + escapeHtml(lab) + "</strong><br>School: " + NA +
      "<br>Mandal: " + NA + "<br>Date: " + NA +
      "<br>Source: Not in the supplied source. Unrelated photos are not labelled as Paderu.</figcaption></figure>";
  }).join("") + "</div><p class=\"ex-meta\">" + escapeHtml(kind) + " media slots are empty until official school-specific files are added.</p>";
}

function emptyMediaFigure(lab) {
  return "<figure class=\"ex-media-card\"><div class=\"ex-media-ph\" aria-hidden=\"true\"></div>" +
    "<figcaption><strong>" + escapeHtml(lab) + "</strong><br>School: " + NA +
    "<br>Mandal: " + NA + "<br>Date: " + NA +
    "<br>Source: No photograph supplied for this slot.</figcaption></figure>";
}

function eduPhotoSrc(src) {
  if (!src) return "";
  if (/^(https?:|data:|\/)/i.test(src)) return src;
  const path = (typeof location !== "undefined" ? location.pathname : "/education/").replace(/\\/g, "/");
  let dir = path.replace(/index\.html$/i, "");
  if (/\/education$/i.test(dir)) dir += "/";
  if (dir.indexOf("/education/") === -1 && !/\/education\/$/i.test(dir)) {
    dir = dir.replace(/\/?$/, "/") + "education/";
  }
  return dir.replace(/\/?$/, "/") + src.replace(/^\.\//, "");
}

function schoolImageFigure(inst, photo) {
  return "<figure class=\"ex-media-card\"><img class=\"ex-media-img\" src=\"" + escapeHtml(eduPhotoSrc(photo.src)) +
    "\" alt=\"" + escapeHtml(photo.caption || inst.name) + "\">" +
    "<figcaption><strong>" + escapeHtml(photo.slot) + "</strong><br>" +
    escapeHtml(photo.caption) +
    "<br>School: " + escapeHtml(inst.name) +
    "<br>Mandal: " + escapeHtml(inst.mandal) +
    (inst.village ? "<br>Village: " + escapeHtml(inst.village) : "") +
    "<br>Date: " + NA +
    "<br>Source: " + escapeHtml(photo.source || "Photograph supplied for this school page.") +
    "</figcaption></figure>";
}

function schoolPhotoGallery(inst) {
  const photos = inst.images || [];
  if (!photos.length) {
    return "<p class=\"ex-meta\">No school photograph is published for this profile. Empty or generated pictures are not shown.</p>";
  }
  return "<div class=\"ex-gallery\">" + photos.map(function (p) {
    return schoolImageFigure(inst, p);
  }).join("") + "</div><p class=\"ex-meta\">These are the supplied school photographs only. Generated or unrelated pictures are not used.</p>";
}

function topicPhotoGallery(photos, noteText) {
  if (!photos || !photos.length) return "";
  return "<div class=\"ex-gallery\">" + photos.map(function (p) {
    return "<figure class=\"ex-media-card\"><img class=\"ex-media-img\" src=\"" + escapeHtml(eduPhotoSrc(p.src)) +
      "\" alt=\"" + escapeHtml(p.caption) + "\">" +
      "<figcaption><strong>" + escapeHtml(p.slot) + "</strong><br>" +
      escapeHtml(p.caption) +
      "<br>Date: " + NA +
      "<br>Source: " + escapeHtml(p.source) +
      "</figcaption></figure>";
  }).join("") + "</div><p class=\"ex-meta\">" + escapeHtml(noteText || "Supplied photographs for this topic only. Generated pictures are not used.") + "</p>";
}

function schoolPhotoCard(inst) {
  const photo = inst.images && inst.images[0];
  const thumb = photo
    ? "<img class=\"ex-card-thumb\" src=\"" + escapeHtml(eduPhotoSrc(photo.src)) + "\" alt=\"" + escapeHtml(inst.name) + "\">"
    : "";
  return "<a class=\"ex-card\" href=\"#schools/mandal/" + inst.mandalId + "/inst/" + inst.id + "\">" +
    thumb +
    "<h3>" + escapeHtml(inst.name) + "</h3>" +
    "<p>" + escapeHtml((inst.village || "") + (inst.village ? " · " : "") + inst.mandal) + "</p>" +
    "<p class=\"ex-meta\">" + (photo ? "School photograph" : "Network record") + "</p></a>";
}

function renderSchoolsExplorer() {
  if (state.section === "atl" || state.atlView || state.learnId || state.calYear || (state.itemId && atlData.programmes.some(function (p) { return p.id === state.itemId; }))) {
    return schoolNav() + renderATL();
  }
  if (state.programmeId || state.progCat) return schoolNav() + renderSchoolProgrammes();
  if (state.institutionId) return schoolNav() + renderSchoolProfileFull();
  if (state.mandalId) return schoolNav() + renderSelectSchoolFiltered();
  if (state.type) return schoolNav() + renderSchoolTypeHub();
  if (state.section) return schoolNav() + renderSchoolSectionFull();
  return schoolNav() + renderSchoolsHome();
}

function renderSchoolsHome() {
  return "<h1>Schools</h1>" +
    "<p>School education administered or supported through the Tribal Welfare system and related school-education administration in ITDA Paderu. Higher education and scholarship scheme lists are not mixed into this module.</p>" +
    "<div class=\"ex-grid\">" +
    cardLink("#schools/section/overview", "School Overview", "Tribal Welfare school-education system in 11 Scheduled Area mandals.", "") +
    cardLink("#schools/section/primary", "Government Primary Schools", "TW primary network — 667 (not all-district total).", "Non-residential") +
    cardLink("#schools/section/tw-schools", "Tribal Welfare Schools", "TW education system profiles.", "") +
    cardLink("#schools/section/ashram", "Ashram Schools", "Residential, Classes 3 to 10. Open mandal → network record → profile.", "107 in planning dataset") +
    cardLink("#schools/section/emrs", "EMRS", "Named EMRS places from the planning dataset.", "11") +
    cardLink("#schools/section/complexes", "School Complexes", "77 School Complex Headmasters supervise 667 TW primary schools.", "") +
    cardLink("#schools/section/programmes", "School Programmes", "Mandal → school → programme → details.", "") +
    cardLink("#schools/section/academic", "Academic Support", "Classroom teaching, SSC preparation, teacher training.", "") +
    cardLink("#schools/section/super50", "Super 50", "School-level academic coaching for tribal SSC students.", "Tribal Welfare Department") +
    cardLink("#schools/section/welfare", "Student Welfare", "Boarding, meals, mentoring. Broader SED initiatives named as listed.", "") +
    cardLink("#schools/section/sports", "Sports & Cultural Activities", "Development areas — no invented tournaments.", "") +
    cardLink("#schools/section/statistics", "School Statistics", "TW network indicators with source notes.", "") +
    cardLink("#schools/section/atl", "ATL Lab", "National AIM / NITI Aayog programme. Not started by ITDA.", "Grades 6–12") +
    cardLink("#schools/section/admin", "Administration & Monitoring", "District → MEO → complex → HM → teachers → students.", "") +
    "</div>" +
    "<h2>Mandal-wise Schools</h2><div class=\"ex-grid\">" +
    educationData.schools.mandals.map(function (m) {
      return cardLink("#schools/mandal/" + m.id, m.name, "Select school in this mandal", "Then programme details");
    }).join("") + "</div>";
}

function twNetworkCards() {
  return "<div class=\"ex-grid\">" +
    "<article class=\"ex-stat\"><strong>11</strong><span>ITDA Scheduled Area Mandals</span><small>Source: Tribal Welfare Department (as supplied). Year: " + NA + "</small></article>" +
    "<article class=\"ex-stat\"><strong>667</strong><span>Tribal Welfare Primary Schools</span><small>Tribal Welfare Department network — not total district schools of every management. Year: " + NA + "</small></article>" +
    "<article class=\"ex-stat\"><strong>77</strong><span>School Complex Headmasters</span><small>Supervise the 667 Government Primary Schools (TW). Year: " + NA + "</small></article>" +
    "<article class=\"ex-stat\"><strong>—</strong><span>School Pattern</span><small>Non-Residential (TW Government Primary Schools)</small></article>" +
    "<article class=\"ex-stat\"><strong>—</strong><span>Education Support</span><small>Academic &amp; Student Support</small></article>" +
    "</div>";
}

function renderSchoolSectionFull() {
  const id = state.section;
  if (id === "atl") return renderATL();
  if (id === "overview") {
    return "<h1>School Education Overview</h1>" +
      "<p>The Integrated Tribal Development Agency (ITDA), Paderu operates within the tribal-dominated Alluri Sitharama Raju District and plays an important role in supporting education among tribal communities. The Tribal Welfare Department states that Paderu ITDA covers 11 Scheduled Area mandals.</p>" +
      "<p>The school-education network includes Tribal Welfare schools, Tribal Welfare Ashram Schools, Government Primary Schools under Tribal Welfare, residential educational institutions and other school-education institutions. The broader District School Education Department also coordinates school education across Government, MPP/ZP, Tribal Welfare, Gurukulam, KGBV and other managements.</p>" +
      "<p>The main objective is to improve access to schooling, enrolment, retention, academic support and quality education for children living in remote and tribal areas.</p>" +
      "<h2>Tribal Welfare School Network</h2>" +
      "<p>According to official Tribal Welfare Department information supplied for this website: 667 Government Primary Schools (Tribal Welfare) function under the TW network in a non-residential pattern. The department states that the schools generally serve children at the primary level and that many operate with a single teacher. 77 School Complex Headmasters supervise the 667 Government Primary Schools (TW).</p>" +
      twNetworkCards() +
      note("Present 667 as the Tribal Welfare primary-school network figure, not as the total number of all schools in the district.") +
      "<p><a class=\"ex-btn\" href=\"#schools\">Mandal-wise Schools</a></p>";
  }
  if (id === "primary") {
    return "<h1>Government Primary Schools</h1>" +
      "<p>For students at the primary level, under Tribal Welfare. Non-residential pattern. Network total 667. Many operate with a single teacher (Tribal Welfare Department, as supplied).</p>" +
      twNetworkCards() +
      "<h2>Profile fields (when a named school is published)</h2>" +
      "<ul class=\"ex-list\"><li>School location</li><li>Classes</li><li>Student facilities</li><li>Teachers</li><li>School infrastructure</li><li>Academic activities</li><li>Student welfare programmes</li></ul>" +
      note("Individual named primary schools and mandal-wise splits of 667 are not published here. Open a mandal to see the network record.") +
      "<p><a class=\"ex-btn\" href=\"#schools/type/primary\">Open by mandal</a></p>";
  }
  if (id === "tw-schools") {
    return "<h1>Tribal Welfare Schools</h1>" +
      "<p>Schools functioning under the Tribal Welfare education system, including Government Primary Schools (TW) and Ashram Schools.</p>" +
      "<ul class=\"ex-list\"><li>School profile</li><li>Mandal</li><li>Village</li><li>Classes</li><li>Student facilities</li><li>Academic programmes</li><li>Government/ITDA initiatives</li><li>School activities</li></ul>" +
      note("Named village-level TW school lists are not in the supplied source. Verify UDISE+ and Tribal Welfare records.") +
      "<p><a class=\"ex-btn\" href=\"#schools\">Select mandal</a></p>";
  }
  if (id === "ashram") {
    return "<h1>Tribal Welfare Ashram Schools</h1>" +
      "<p>Residential education model. The official Tribal Welfare Department describes these schools as functioning in a residential pattern from Class 3 to Class 10.</p>" +
      "<h2>Main features</h2><ul class=\"ex-list\"><li>Residential schooling</li><li>Academic education</li><li>Boarding/accommodation</li><li>Student welfare support</li><li>Academic supervision</li><li>Examination preparation</li><li>Sports and extracurricular activities</li><li>Support for students from remote tribal communities</li></ul>" +
      "<p>Planning dataset total: <strong>107</strong> Ashram Schools (verify latest official records). Most mandals show a network count only. Named schools below are taken from entrance boards in the supplied photographs.</p>" +
      "<h2>Named Ashram Schools (from school boards)</h2><div class=\"ex-grid\">" +
      educationData.schools.institutions.filter(function (i) { return i.named && i.id.indexOf("ashram-") === 0; }).map(schoolPhotoCard).join("") + "</div>" +
      "<h2>Ashram campus photograph</h2>" +
      topicPhotoGallery(educationData.topicPhotos.ashramCampus, "Campus photograph for Ashram Schools. The school name is not on the image, so it is not attached to Kommika or Rajomprapalem by guesswork.") +
      "<h2>Ashram Schools → Mandal</h2><div class=\"ex-grid\">" +
      educationData.schools.mandals.map(function (m) {
        const c = educationData.schools.residentialCounts.find(function (r) { return r.mandalId === m.id; });
        return cardLink("#schools/type/ashram/mandal/" + m.id, m.name, (c ? c.ashram : "—") + " Ashram Schools (planning dataset)", "Then network profile");
      }).join("") + "</div>";
  }
  if (id === "emrs") {
    return "<h1>Ekalavya Model Residential Schools (EMRS)</h1>" +
      "<p>Residential institutions intended to provide quality education to ST students in remote areas. Named places are from the planning dataset (11 EMRS).</p>" +
      "<div class=\"ex-grid\">" + educationData.schools.emrsPlaces.map(function (e) {
        const m = educationData.schools.mandals.find(function (x) { return x.id === e.mandalId; });
        return cardLink("#schools/mandal/" + e.mandalId + "/inst/emrs-" + e.mandalId, "EMRS – " + e.place, m ? m.name : "", "Named institution");
      }).join("") + "</div>";
  }
  if (id === "complexes") {
    return "<h1>School Complexes</h1>" +
      "<p>For the Tribal Welfare network, the district portal states that 77 School Complex Headmasters supervise 667 Tribal Welfare Government Primary Schools.</p>" +
      twNetworkCards() +
      note("Named complex lists and officer names are not published on this page.");
  }
  if (id === "admin") {
    return "<h1>School Administration &amp; Monitoring</h1>" +
      "<div class=\"edu-path\" aria-label=\"Administration pathway\">" +
      ["District Education Administration", "District Educational Officer", "Mandal Education Administration", "School Complex / Supervisory Structure", "Headmaster", "Teachers", "Students"].map(function (s, i, arr) {
        return "<span class=\"edu-path-step\">" + s + "</span>" + (i < arr.length - 1 ? "<span class=\"edu-path-arrow\" aria-hidden=\"true\">↓</span>" : "");
      }).join("") + "</div>" +
      "<p>The District School Education Department lists the District Educational Officer, Deputy Educational Officer, MEOs, Headmasters, teachers and other education personnel within its administrative structure.</p>" +
      "<p>For the Tribal Welfare network specifically, 77 School Complex Headmasters supervise 667 Tribal Welfare Government Primary Schools.</p>" +
      note("Officer names and phone numbers are not invented here.");
  }
  if (id === "academic") {
    return "<h1>Academic Support</h1><ul class=\"ex-list\">" +
      ["Classroom teaching", "Remedial learning", "Examination preparation", "SSC preparation", "Academic monitoring", "Teacher training", "Student assessments", "Mentoring", "Doubt clarification", "Competitive examination orientation"].map(function (x) { return "<li>" + x + "</li>"; }).join("") +
      "</ul><p>The District School Education Department states that it conducts examinations according to the academic calendar and provides in-service teacher training for teachers in applicable management schools.</p>" +
      "<p><a class=\"ex-btn\" href=\"#schools/section/super50\">Super 50 (documented TW programme)</a></p>";
  }
  if (id === "super50") {
    const p = educationData.studentProgrammes.programmes[0];
    return "<h1>Super 50 – School-Level Academic Programme</h1>" +
      "<p>This is a separate programme, not mixed into the general school description. The official Tribal Welfare Department reports that the Super 50 initiative under ITDA Paderu provides focused coaching and mentoring to tribal SSC students.</p>" +
      "<p><strong>Purpose:</strong> Provide focused academic coaching and mentoring to selected SSC students.</p>" +
      "<p class=\"ex-meta\">These figures are reported by the official district Tribal Welfare Department. Verify latest official records.</p>" +
      programmeDetailView(p);
  }
  if (id === "welfare") {
    return "<h1>Student Welfare &amp; Support</h1><ul class=\"ex-list\">" +
      ["Residential education where applicable", "Boarding", "Accommodation", "Meals", "Academic support", "Examination preparation", "Scholarships/support schemes (details in Scholarships module — not amounts here)", "Sports", "Cultural activities", "Digital learning", "Career awareness", "Student mentoring"].map(function (x) { return "<li>" + x + "</li>"; }).join("") +
      "</ul><p>The broader School Education Department also lists student-support initiatives such as Dokka Seethamma Mid-Day Meal, Talliki Vandanam and Dr. Sarvepalli Radhakrishnan Vidyarthi Mithra.</p>" +
      note("Scheme amounts, eligibility and current circulars: verify the latest official notification. This Schools module does not invent scholarship quantum.");
  }
  if (id === "sports") {
    return "<h1>Sports &amp; Cultural Activities</h1>" +
      "<p>Development areas for school students. Specific tournaments, medals or school-wise event calendars are not in the supplied source.</p>" +
      "<h2>Cultural activity photographs</h2>" +
      topicPhotoGallery(educationData.topicPhotos.cultural, "These photographs belong on Sports and Cultural and Cultural Activities pages only. They are not used as ATL, EMRS, Job Mela or skill-training images.");
  }
  if (id === "programmes") {
    return "<h1>School Programmes</h1>" +
      "<p>Use: Schools → Mandal → School → Programmes → Select Programme → Programme Details.</p>" +
      "<p>Named school-wise event calendars are not in the supplied source except Super 50 (Tribal Welfare, not attached to a named school). Super 50 is also listed under Student Programmes.</p>" +
      "<p><a class=\"ex-btn\" href=\"#schools\">Select mandal</a> <a class=\"ex-btn\" href=\"#schools/section/super50\">Super 50</a></p>";
  }
  if (id === "statistics") {
    return "<h1>School Statistics</h1>" + twNetworkCards() +
      "<article class=\"ex-stat\"><strong>107</strong><span>Ashram Schools (planning dataset)</span><small>Source: planning dataset. Year: " + NA + ". Verify latest official records.</small></article>" +
      "<article class=\"ex-stat\"><strong>11</strong><span>EMRS (planning dataset)</span><small>Source: planning dataset. Year: " + NA + "</small></article>" +
      note("667 is the Tribal Welfare primary-school network, not all schools in ASR District.");
  }
  return "<h1>Schools</h1>" + note(NA);
}

function renderSchoolTypeHub() {
  if (state.type === "ashram" && !state.mandalId) {
    state.section = "ashram";
    return renderSchoolSectionFull();
  }
  if (state.type === "primary") {
    return "<h1>Government Primary Schools by mandal</h1>" + note("667 is a district TW network total, not split by mandal in the supplied source.") +
      "<div class=\"ex-grid\">" + educationData.schools.mandals.map(function (m) {
        return cardLink("#schools/type/primary/mandal/" + m.id, m.name, "TW primary network record", "");
      }).join("") + "</div>";
  }
  return renderSelectSchoolFiltered();
}

function renderSelectSchoolFiltered() {
  const m = getMandal(state.mandalId);
  if (!m) return "<p>Mandal not found.</p>";
  let list = educationData.schools.institutions.filter(function (i) { return i.mandalId === state.mandalId; });
  if (state.type === "ashram") list = list.filter(function (i) { return i.id.indexOf("ashram") === 0; });
  if (state.type === "emrs") list = list.filter(function (i) { return i.id.indexOf("emrs") === 0; });
  if (state.type === "primary") list = list.filter(function (i) { return i.id.indexOf("tw-primary") === 0; });
  return "<h1>Select School · " + escapeHtml(m.name) + "</h1>" +
    note("Named institutions: EMRS places, plus Ashram schools whose names appear on supplied entrance boards. Other Ashram and primary rows remain network records — names are not invented.") +
    "<div class=\"ex-grid\">" + list.map(function (i) {
      if (i.images && i.images.length) return schoolPhotoCard(i);
      return cardLink("#schools/mandal/" + state.mandalId + "/inst/" + i.id, i.name, i.schoolType, i.named ? "Named institution" : "Network record");
    }).join("") + "</div>";
}

function renderSchoolProfileFull() {
  const inst = getSchool(state.institutionId);
  if (!inst) return "<p>Institution not found.</p>";
  const fac = ["Classrooms", "Library", "Computer Lab", "Science Lab", "ATL Lab", "Playground", "Digital Learning", "Hostel Facilities"];
  const photoBlock = "<h2>School-specific images</h2>" + schoolPhotoGallery(inst);
  return "<h1>School Profile</h1>" +
    dl([
      ["School Name", inst.name],
      ["Mandal", inst.mandal],
      ["Village", inst.village || NA],
      ["School Type", inst.schoolType],
      ["Classes", inst.classes],
      ["Residential / Non-Residential", inst.residential],
      ["Student Strength", NA],
      ["Hostel Facilities", inst.residential === "Residential" ? "Residential boarding as documented for this school type. Building inventory: " + NA : NA],
      ["Academic Facilities", NA],
      ["Sports Facilities", NA],
      ["School Programmes", "Open programmes below. Named event lists: " + NA],
      ["School Activities", NA],
      ["Photos", inst.images && inst.images.length ? "School-specific photographs below" : NA],
      ["Documents", NA],
      ["Source", "Planning dataset / Tribal Welfare descriptions as supplied."],
      ["Last Updated", NA],
      ["Management", inst.management],
      ["Academic Information", inst.academicInformation]
    ]) +
    photoBlock +
    "<h2>Facilities</h2><div class=\"ex-grid\">" + fac.map(function (f) {
      if (f === "ATL Lab") {
        return cardLink("#schools/mandal/" + inst.mandalId + "/inst/" + inst.id + "/atlview/overview", "ATL Lab", "Do not assume this school has an ATL. No school-specific ATL record in the supplied source. Open national ATL information.", "AIM / NITI Aayog — not started by ITDA");
      }
      return "<article class=\"ex-card\"><h3>" + escapeHtml(f) + "</h3><p>" + NA + "</p></article>";
    }).join("") + "</div>" +
    "<h2>School Programmes</h2>" +
    note("No named programmes are attached to this institution in the supplied source. Super 50 is a Tribal Welfare programme, not documented as a named-school event.") +
    "<div class=\"ex-grid\">" +
    educationData.schools.programmeCategories.map(function (c) {
      return cardLink("#schools/mandal/" + inst.mandalId + "/inst/" + inst.id + "/progcat/" + encodeURIComponent(c), c, "Select programme", "");
    }).join("") +
    cardLink("#schools/section/super50", "Super 50", "Documented TW SSC coaching — not tied to this school name in the source.", "Open programme") +
    "</div>";
}

function atlSubnav() {
  const links = [
    ["overview", "Overview"],
    ["history", "History"],
    ["objectives", "Objectives"],
    ["facilities", "Facilities"],
    ["learning", "Learning"],
    ["curriculum", "Curriculum"],
    ["programmes", "Programmes"],
    ["calendar", "Calendar"],
    ["projects", "Projects"],
    ["team", "Teachers & Mentors"],
    ["gallery", "Photos"],
    ["videos", "Videos"],
    ["resources", "Resources"],
    ["statistics", "Statistics"],
    ["faq", "FAQ"]
  ];
  const v = state.atlView || "overview";
  return "<header class=\"atl-hero\"><p class=\"ex-kicker\">Atal Innovation Mission · NITI Aayog</p><h1>ATL Lab</h1>" +
    "<p>National school innovation labs. Not started by ITDA Paderu. Not assumed present in every school.</p></header>" +
    "<nav class=\"atl-tabs\">" + links.map(function (l) {
      return "<a class=\"" + (v === l[0] ? "is-on" : "") + "\" href=\"#schools/atlview/" + l[0] + "\">" + l[1] + "</a>";
    }).join("") + "</nav>";
}

function renderATL() {
  const view = state.atlView || "overview";
  if (state.itemId && state.itemId !== "none" && atlData.programmes.some(function (p) { return p.id === state.itemId; })) {
    const prog = atlData.programmes.find(function (p) { return p.id === state.itemId; });
    const inst = state.institutionId ? getSchool(state.institutionId) : null;
    return atlSubnav() + renderATLProgramme(prog, inst);
  }
  if (state.learnId) {
    const a = atlData.learningAreas.find(function (x) { return x.id === state.learnId; });
    return atlSubnav() + "<h2>" + escapeHtml(a ? a.name : "Learning area") + "</h2><p>" + escapeHtml(a ? a.text : NA) + "</p>" +
      note("AIM ATL resource ecosystem module. School-wise session dates: " + NA);
  }
  const body = {
    overview: renderATLOverview,
    history: renderATLHistory,
    objectives: renderATLObjectives,
    facilities: renderATLFacilities,
    learning: renderATLLearning,
    curriculum: renderATLCurriculum,
    programmes: renderATLProgrammes,
    calendar: renderATLCalendar,
    projects: renderATLProjects,
    team: renderATLTeam,
    gallery: renderATLGallery,
    videos: renderATLVideos,
    resources: renderATLResources,
    statistics: renderATLStats,
    faq: renderATLFaq
  };
  const fn = body[view] || renderATLOverview;
  return atlSubnav() + fn();
}

function renderATLOverview() {
  const o = atlData.overview;
  return "<h2>What is an ATL Lab?</h2><p>" + escapeHtml(o.what) + "</p>" +
    "<p>" + escapeHtml(o.teluguNote) + "</p>" +
    "<p><strong>Target students:</strong> " + escapeHtml(o.targetGrades) + "</p>" +
    "<p><strong>Purpose:</strong> " + escapeHtml(o.purpose) + "</p>" +
    note(o.notItda) +
    "<p>" + escapeHtml(o.national) + "</p>" +
    "<h2>Main areas</h2><div class=\"ex-grid\">" + atlData.stemAreas.map(function (a) {
      return "<article class=\"ex-card\"><h3>" + escapeHtml(a) + "</h3></article>";
    }).join("") + "</div>" +
    "<p><a class=\"ex-btn\" href=\"#schools/atlview/programmes\">Programmes &amp; activities</a></p>";
}

function renderATLHistory() {
  return "<h2>Who started ATL? When?</h2>" +
    "<p>Atal Innovation Mission (AIM) is an initiative of NITI Aayog, established in 2016. The ATL programme was introduced under AIM for school students.</p>" +
    "<div class=\"edu-path\">" + atlData.timeline.map(function (t, i, arr) {
      return "<span class=\"edu-path-step\">" + escapeHtml(t.year) + "</span>" + (i < arr.length - 1 ? "<span class=\"edu-path-arrow\">↓</span>" : "");
    }).join("") + "</div>" +
    "<ul class=\"ex-list\">" + atlData.timeline.map(function (t) {
      return "<li><strong>" + escapeHtml(t.year) + ":</strong> " + escapeHtml(t.text) + "</li>";
    }).join("") + "</ul>" +
    "<h2>Who manages ATL?</h2><div class=\"edu-path\">" + atlData.management.map(function (x, i, a) {
      return "<span class=\"edu-path-step\">" + escapeHtml(x) + "</span>" + (i < a.length - 1 ? "<span class=\"edu-path-arrow\">↓</span>" : "");
    }).join("") + "</div>" +
    note("The national 2016 launch is not the establishment date of any individual ITDA Paderu school ATL.");
}

function renderATLObjectives() {
  return "<h2>Key objectives</h2><div class=\"ex-grid\">" + atlData.objectives.map(function (o) {
    return "<article class=\"ex-card\"><h3>" + o.n + " — " + escapeHtml(o.title) + "</h3><p>" + escapeHtml(o.text) + "</p></article>";
  }).join("") + "</div>";
}

function renderATLFacilities() {
  let html = "<h2>ATL equipment &amp; facilities</h2><p>AIM identifies science, electronics, robotics, open-source microcontrollers, sensors, 3D printers and computers among ATL resources. School-wise kit inventories for ITDA Paderu: " + NA + "</p>";
  Object.keys(atlData.facilities).forEach(function (k) {
    html += "<h3>" + escapeHtml(k) + "</h3><ul class=\"ex-list\">" + atlData.facilities[k].map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; }).join("") + "</ul>";
  });
  return html;
}

function renderATLLearning() {
  return "<h2>ATL learning areas</h2><p>Click an area. These correspond to the AIM ATL resource ecosystem.</p><div class=\"ex-grid\">" +
    atlData.learningAreas.map(function (a) {
      return cardLink("#schools/atllearn/" + a.id, a.name, a.text, "");
    }).join("") + "</div>";
}

function renderATLCurriculum() {
  return "<h2>ATL curriculum</h2><p>The AIM guidebook describes a structured curriculum with increasing complexity (electronics, mechanics, 3D design, data visualisation, design thinking, IoT, enhanced 3D printing).</p>" +
    "<div class=\"ex-grid\">" + atlData.curriculum.map(function (l) {
      return "<article class=\"ex-card\"><h3>" + escapeHtml(l.name) + "</h3><p class=\"ex-meta\">" + escapeHtml(l.sessions) + "</p><ul>" +
        l.topics.map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("") + "</ul></article>";
    }).join("") + "</div>";
}

function renderATLProgrammes() {
  const cats = ["Workshops", "Competitions", "Events", "Entrepreneurship", "Recognition", "Mentoring"];
  let html = "<h2>ATL programmes &amp; activities</h2>" + note("Click a card for the full detail template. Start dates of local Paderu events are not assumed. National 2016 is not a school start date.");
  cats.forEach(function (c) {
    const list = atlData.programmes.filter(function (p) { return p.category === c; });
    if (!list.length) return;
    html += "<h3>" + escapeHtml(c) + "</h3><div class=\"ex-grid\">" + list.map(function (p) {
      return cardLink("#schools/atlitem/" + p.id, p.name, p.summary, "View details");
    }).join("") + "</div>";
  });
  return html;
}

function renderATLProgramme(prog, inst) {
  if (!prog) return "<p>Programme not found.</p>" + emptyProgrammeDetail();
  const rec = atlProgRecord(prog, inst);
  return "<h2>Programme details · " + escapeHtml(prog.name) + "</h2>" +
    dl([
      ["Programme Name", rec.name],
      ["Programme Category", rec.category],
      ["ATL / School Name", rec.school],
      ["Mandal", rec.mandal],
      ["Academic Year", rec.academicYear],
      ["Programme Status", rec.status],
      ["About", rec.overview],
      ["Purpose", rec.purpose],
      ["Why was this programme conducted?", rec.whyConducted],
      ["Conducted By", rec.conductedBy],
      ["Implementing Authority", rec.implementingDepartment],
      ["Implementing Organisation", rec.implementedBy],
      ["Organising Team", rec.organizingTeam],
      ["ATL In-Charge", rec.responsibleOfficer],
      ["Mentor", NA],
      ["Target Students", rec.targetStudents],
      ["Number of Students", rec.participants],
      ["Classes / Grades", "6–12 (national AIM description). School-wise: " + NA],
      ["Boys", NA],
      ["Girls", NA],
      ["Start Date", rec.startDate],
      ["End Date", rec.endDate],
      ["Duration", rec.duration],
      ["Location / ATL Lab", rec.location],
      ["District", "ASR District school-level occurrence not verified in the supplied source."],
      ["Activities Conducted", rec.activities],
      ["Technology Used", "As applicable: Arduino, sensors, robotics, 3D printer, Python, IoT, AI. Event-specific list: " + NA],
      ["Learning / Outcome", rec.outcome],
      ["Photos", rec.photos],
      ["Videos", rec.videos],
      ["Certificates / Reports / Press / Documents", rec.documents],
      ["Source Type", "Official AIM (national programme description)"],
      ["Official URL", "AIM portal label: aim.gov.in — deep URLs not invented"],
      ["Verified By", NA],
      ["Verification Status", rec.verificationStatus],
      ["Last Updated", rec.lastUpdated]
    ]) +
    mediaSlots("Programme", ["Programme Banner", "Programme Activity Photos", "Student Participation", "Officials/Teachers", "Certificates", "Documents"]) +
    "<h3>Videos</h3>" + note("No embeddable Paderu ATL video URL is in the supplied source. AIM maintains a national ATL video/resource section.");
}

function renderATLCalendar() {
  const y = state.calYear;
  if (y) {
    return "<h2>ATL calendar · " + escapeHtml(y) + "</h2>" +
      note("AIM publishes annual ATL calendars. Month-wise activities for this year are not copied here as a permanent list. School-level dates: " + NA) +
      "<div class=\"ex-grid\">" + atlData.months.map(function (m) {
        return "<article class=\"ex-card\"><h3>" + escapeHtml(m) + "</h3><p>Activity: " + NA + "</p></article>";
      }).join("") + "</div>";
  }
  return "<h2>ATL annual calendar</h2><p>Select a year. Do not hard-code one year as permanent.</p><div class=\"ex-grid\">" +
    atlData.calendarYears.map(function (yr) {
      return cardLink("#schools/atlcal/" + encodeURIComponent(yr), yr, "Then month → activity → details", "AIM calendar");
    }).join("") + "</div>";
}

function renderATLProjects() {
  const ex = atlData.exampleProject;
  return "<h2>ATL student projects</h2>" + note(ex.disclaimer) +
    "<article class=\"ex-card\"><h3>Example template (not a Paderu record)</h3>" +
    dl([
      ["Project Name", ex.name],
      ["Problem", ex.problem],
      ["Proposed Solution", ex.solution],
      ["Students", NA],
      ["School", NA],
      ["Mandal", NA],
      ["Academic Year", NA],
      ["Technology", ex.technology],
      ["Components", NA],
      ["Prototype", NA],
      ["Project Photos", NA],
      ["Demo Video", NA],
      ["Outcome", "Prototype developed and demonstrated (example wording only)"],
      ["Mentor", NA],
      ["Programme/Competition", NA],
      ["Awards/Recognition", NA],
      ["Source", "Illustrative example from the website brief — not verified local data"]
    ]) + "</article>" +
    "<h3>Classroom lights example (learning illustration)</h3>" +
    "<p>Problem: classroom lights stay ON unnecessarily. ATL-style prototype: motion sensor + Arduino so lights operate only when someone is present. This is a teaching example, not a documented ITDA Paderu project.</p>";
}

function renderATLTeam() {
  return "<h2>ATL teachers &amp; mentors</h2>" +
    "<h3>ATL In-Charge</h3>" + dl([["Name", NA], ["Designation", NA], ["School", NA], ["ATL Role", NA], ["Training", NA], ["Contact", "Only if officially published. Not listed here."]]) +
    "<h3>Mentors of Change</h3>" + dl([["Mentor Name", NA], ["Organisation", NA], ["Area of Expertise", NA], ["Mentoring Activity", NA], ["Year", NA]]) +
    note("Never invent names or phone numbers. Mentors of Change is an AIM ecosystem described nationally.");
}

function renderATLGallery() {
  return "<h2>ATL gallery</h2>" + note("No Paderu ATL photographs in the supplied source. Category slots keep school, mandal, date and source empty.") +
    atlData.galleryCats.map(function (c) {
      return "<h3>" + escapeHtml(c) + "</h3>" + mediaSlots(c, [c + " (slot)"]);
    }).join("");
}

function renderATLVideos() {
  return "<h2>ATL videos</h2><p>AIM maintains an ATL video/resource section (what tinkering is, why ATLs are needed, lab design and management, curriculum integration). No Paderu school video URLs are supplied.</p>" +
    "<div class=\"ex-grid\">" + atlData.videoCats.map(function (v) {
      return "<article class=\"ex-card\"><h3>" + escapeHtml(v.title) + "</h3><p>" + escapeHtml(v.desc) + "</p>" +
        dl([["School", NA], ["Mandal", NA], ["Programme", NA], ["Date", NA], ["Duration", NA], ["Video Source", "AIM national resource section (no embed URL in this dataset)"], ["Official/External", "Official AIM (national)"]]) +
        "<div class=\"ex-video-ph\">Video not available in the published source</div></article>";
    }).join("") + "</div>";
}

function renderATLResources() {
  return "<h2>ATL funding &amp; resources</h2>" +
    "<p>AIM provides guidelines for establishment and operation of ATLs, including operational guidelines, grant-in-aid utilisation, procurement and equipment lists.</p>" +
    note("Historical grant amounts are not displayed as current funding.") +
    "<ul class=\"ex-list\">" + atlData.resources.map(function (r) { return "<li>" + escapeHtml(r) + "</li>"; }).join("") + "</ul>" +
    "<h3>Official reference labels</h3><ul class=\"ex-list\">" + atlData.sources.map(function (s) { return "<li>" + escapeHtml(s) + "</li>"; }).join("") + "</ul>";
}

function renderATLStats() {
  return "<h2>ATL statistics (national AIM figures)</h2>" +
    "<div class=\"ex-grid\">" + atlData.statistics.map(function (s) {
      return "<article class=\"ex-stat\"><strong>" + escapeHtml(s.value) + "</strong><span>" + escapeHtml(s.label) + "</span>" +
        "<small>Source: Atal Innovation Mission</small><small>" + escapeHtml(atlData.statisticsVerified) + "</small></article>";
    }).join("") + "</div>" + note(atlData.statisticsSource);
}

function renderATLFaq() {
  return "<h2>ATL FAQ</h2>" + atlData.faq.map(function (f) {
    return "<div class=\"ex-faq\"><button type=\"button\" class=\"ex-faq-q\" aria-expanded=\"false\">" + escapeHtml(f.q) +
      "</button><div class=\"ex-faq-a\" hidden><p>" + escapeHtml(f.a) + "</p></div></div>";
  }).join("");
}

window.renderSchoolsExplorer = renderSchoolsExplorer;
window.renderATL = renderATL;
window.atlProgRecord = atlProgRecord;
window.schoolPhotoGallery = schoolPhotoGallery;
window.topicPhotoGallery = topicPhotoGallery;
window.eduPhotoSrc = eduPhotoSrc;
