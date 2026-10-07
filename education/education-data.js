/* Hierarchical education dataset. Do not invent officers, dates, amounts, photos or school names. */

const NA = "Information not available in the supplied source.";
const VERIFY = "Verify latest official notification.";
const PLAN_VERIFY = "Planning dataset. Verify latest official records.";
const NOT_ITDA_PROGRAMME = "General skill/career information. Not presented as a specific ITDA programme unless an official source confirms it.";

const educationData = {
  schools: {
    overview: "The ITDA Paderu region of Alluri Sitharama Raju (ASR) District covers 11 mandals. School education is provided through Government schools, Tribal Welfare schools, Ashram Schools, EMRS and KGBVs. Individual named lists of every school are not published on this site.",
    sections: [
      { id: "overview", name: "School Overview" },
      { id: "government", name: "Government Schools" },
      { id: "tribal-welfare", name: "Tribal Welfare Schools" },
      { id: "primary", name: "Primary Schools" },
      { id: "upper-primary", name: "Upper Primary Schools" },
      { id: "high", name: "High Schools" },
      { id: "complexes", name: "School Complexes" },
      { id: "infrastructure", name: "School Infrastructure" },
      { id: "monitoring", name: "Academic Monitoring" },
      { id: "statistics", name: "School Statistics" },
      { id: "programmes", name: "School-wise Programmes" },
      { id: "activities", name: "School Activities" }
    ],
    programmeCategories: [
      "Academic Programmes",
      "Exam Preparation",
      "Remedial Learning",
      "Sports Programmes",
      "Cultural Programmes",
      "Student Development",
      "Digital Learning",
      "Career Awareness",
      "Skill Awareness",
      "Government / Department Programmes"
    ],
    mandals: [
      { id: "ananthagiri", name: "Ananthagiri", network: "Government schools, Tribal Welfare schools, residential education, EMRS network", opportunities: "School education, residential education, SSC preparation" },
      { id: "araku-valley", name: "Araku Valley", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College, Government Degree College for Women", opportunities: "School, Intermediate, degree and women's higher education" },
      { id: "dumbriguda", name: "Dumbriguda", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "Primary to secondary and residential tribal education" },
      { id: "hukumpeta", name: "Hukumpeta", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and competitive preparation" },
      { id: "pedabayalu", name: "Pedabayalu", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and higher-study pathways" },
      { id: "munchingiputtu", name: "Munchingiputtu", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education and residential tribal education" },
      { id: "paderu", name: "Paderu", network: "Government schools, Tribal Welfare institutions, EMRS, Government Degree College, Government Medical College", opportunities: "Degree, professional education, competitive exams and employment preparation" },
      { id: "g-madugula", name: "G. Madugula", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "Primary, secondary and residential education" },
      { id: "chinthapalli", name: "Chinthapalli", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College", opportunities: "School, Intermediate and degree education" },
      { id: "gk-veedhi", name: "G.K. Veedhi", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and higher studies" },
      { id: "koyyuru", name: "Koyyuru", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College (Women), Marripallem", opportunities: "School and higher education, especially opportunities for women" }
    ],
    residentialCounts: [
      { mandalId: "ananthagiri", ashram: 12, emrs: 1, total: 13 },
      { mandalId: "araku-valley", ashram: 7, emrs: 1, total: 8 },
      { mandalId: "dumbriguda", ashram: 7, emrs: 1, total: 8 },
      { mandalId: "hukumpeta", ashram: 11, emrs: 1, total: 12 },
      { mandalId: "munchingiputtu", ashram: 12, emrs: 1, total: 13 },
      { mandalId: "pedabayalu", ashram: 9, emrs: 1, total: 10 },
      { mandalId: "paderu", ashram: 9, emrs: 1, total: 10 },
      { mandalId: "g-madugula", ashram: 10, emrs: 1, total: 11 },
      { mandalId: "chinthapalli", ashram: 10, emrs: 1, total: 11 },
      { mandalId: "gk-veedhi", ashram: 8, emrs: 1, total: 9 },
      { mandalId: "koyyuru", ashram: 12, emrs: 1, total: 13 }
    ],
    emrsPlaces: [
      { mandalId: "ananthagiri", place: "Pathokota" },
      { mandalId: "araku-valley", place: "Majjivalasa" },
      { mandalId: "dumbriguda", place: "Dumbriguda" },
      { mandalId: "hukumpeta", place: "Chintalaveedi" },
      { mandalId: "pedabayalu", place: "Lakyaputtu" },
      { mandalId: "munchingiputtu", place: "Munchingiputtu" },
      { mandalId: "paderu", place: "Dokuluru" },
      { mandalId: "g-madugula", place: "P.G. Madugula" },
      { mandalId: "chinthapalli", place: "Chintapally" },
      { mandalId: "gk-veedhi", place: "G.K. Veedhi" },
      { mandalId: "koyyuru", place: "Balaram" }
    ],
    institutions: [],
    programmes: []
  },

  residentialEducation: {
    overview: "Residential education in the Paderu agency area includes Tribal Welfare Ashram Schools (residential, Classes 3 to 10), EMRS, KGBVs, boarding, and Post-Matric College Hostels. Planning dataset totals: 107 Ashram Schools, 11 EMRS, 118 residential schools.",
    categories: [
      { id: "ashram", name: "Ashram Schools", kind: "institution-group" },
      { id: "emrs", name: "EMRS", kind: "institution-group" },
      { id: "kgbv", name: "KGBV", kind: "text" },
      { id: "rjc", name: "Residential Junior Colleges", kind: "text" },
      { id: "hostels", name: "Post-Matric College Hostels", kind: "text" },
      { id: "boarding", name: "Boarding", kind: "text" },
      { id: "meals", name: "Meals", kind: "text" },
      { id: "accommodation", name: "Accommodation", kind: "text" },
      { id: "facilities", name: "Student Facilities", kind: "text" },
      { id: "academic", name: "Residential Academic Support", kind: "text" },
      { id: "programmes", name: "Residential Programmes", kind: "text" },
      { id: "statistics", name: "Residential Statistics", kind: "stats" }
    ],
    texts: {
      kgbv: "KGBVs provide residential educational opportunities for eligible girls, particularly those from disadvantaged and remote communities. Institution counts and named KGBV lists are not published on this page.",
      rjc: "Junior Colleges are part of the documented education pathway. Named residential junior college lists are not published on this page.",
      hostels: "Post-Matric College Hostels are documented as student support. Paderu is described as an important higher-education location with Post-Matric College Hostels. Named hostel lists, capacities and officer details are not published on this page.",
      boarding: "Boarding is part of the Tribal Welfare residential school system. School-wise boarding inventories are not published here.",
      meals: "Meals are associated with residential boarding. Menus, contractors and quantities are not published here.",
      accommodation: "Residential accommodation supports students from remote settlements in Ashram Schools, EMRS, KGBV and hostels. Building-wise inventories are not published here.",
      facilities: "Student facilities in residential settings are not listed item-by-item in the supplied source.",
      academic: "Academic supervision includes school-complex monitoring. 77 School Complex Headmasters are documented in the Tribal Welfare network. Super 50 is documented separately under Student Programmes.",
      programmes: "Named residential school-wise programme calendars are not published in the supplied source. Super 50 is a Tribal Welfare programme documented under Student Programmes, not as a named-school event list."
    },
    institutions: [],
    programmes: []
  },

  higherEducation: {
    overview: "Paderu serves as an important higher-education location with Government Degree College, Government Medical College, Tribal Welfare educational institutions and Post-Matric College Hostels. Course lists are not published on this page.",
    sections: [
      "Junior Colleges",
      "Degree Colleges",
      "Women's Degree Colleges",
      "Medical Education",
      "Professional Education",
      "Technical Education",
      "College Information",
      "Student Facilities",
      "Higher Education Programmes",
      "Career Pathways"
    ],
    institutions: [
      { id: "gdc-paderu", name: "Government Degree College", location: "Paderu", type: "Degree College", gender: "Not specified in the supplied source" },
      { id: "gdc-araku", name: "Government Degree College", location: "Araku Valley", type: "Degree College", gender: "Not specified in the supplied source" },
      { id: "gdcw-araku", name: "Government Degree College (Women)", location: "Araku Valley", type: "Women's Degree College", gender: "Women" },
      { id: "gdc-chinthapalli", name: "Government Degree College", location: "Chinthapalli", type: "Degree College", gender: "Not specified in the supplied source" },
      { id: "gdcw-koyyuru", name: "Government Degree College (Women)", location: "Marripallem, Koyyuru", type: "Women's Degree College", gender: "Women" },
      { id: "gmc-paderu", name: "Government Medical College", location: "Paderu", type: "Medical Education", gender: "Not specified in the supplied source" }
    ],
    programmes: []
  },

  scholarships: {
    overview: "Scholarship pathways listed for exploration. Eligibility, amounts, portals and dates must be taken from the latest official notification. Amounts are not published here.",
    schemes: [
      { id: "pre-matric", name: "Pre-Matric Scholarship", purpose: NA, eligibility: VERIFY, educationLevel: "Pre-Matric", applicationProcess: VERIFY, documents: VERIFY, benefits: VERIFY, implementingAuthority: NA, applicationPortal: NA, importantDates: VERIFY, source: "District education programme and notification information", lastUpdated: NA },
      { id: "post-matric", name: "Post-Matric Scholarship", purpose: NA, eligibility: VERIFY, educationLevel: "Post-Matric", applicationProcess: VERIFY, documents: VERIFY, benefits: VERIFY, implementingAuthority: NA, applicationPortal: NA, importantDates: VERIFY, source: "District education programme and notification information", lastUpdated: NA },
      { id: "national-scholarship", name: "National Scholarship", purpose: NA, eligibility: VERIFY, educationLevel: NA, applicationProcess: VERIFY, documents: VERIFY, benefits: VERIFY, implementingAuthority: NA, applicationPortal: NA, importantDates: VERIFY, source: "District education programme and notification information", lastUpdated: NA },
      { id: "national-fellowship", name: "National Fellowship", purpose: NA, eligibility: VERIFY, educationLevel: NA, applicationProcess: VERIFY, documents: VERIFY, benefits: VERIFY, implementingAuthority: NA, applicationPortal: NA, importantDates: VERIFY, source: "District education programme and notification information", lastUpdated: NA },
      { id: "national-overseas", name: "National Overseas Scholarship", purpose: NA, eligibility: VERIFY, educationLevel: NA, applicationProcess: VERIFY, documents: VERIFY, benefits: VERIFY, implementingAuthority: NA, applicationPortal: NA, importantDates: VERIFY, source: "District education programme and notification information", lastUpdated: NA }
    ]
  },

  skillDevelopment: {
    overview: "Skill and career areas. These are not presented as official ITDA programmes unless an official source confirms them.",
    categories: [
      { id: "digital", name: "Digital Skills", items: ["Computer fundamentals", "Digital literacy", "Internet usage", "Data entry", "Digital services", "AI awareness"] },
      { id: "it", name: "IT Skills", items: ["Web development", "Programming", "Digital services"] },
      { id: "vocational", name: "Vocational Skills", items: ["Electrical", "Plumbing", "Welding", "Automobile", "Construction", "Tailoring", "Beauty & wellness"] },
      { id: "agriculture", name: "Agriculture", items: ["Agriculture-based enterprise", "Modern agriculture", "Organic farming"] },
      { id: "horticulture", name: "Horticulture", items: ["Horticulture", "Nursery management"] },
      { id: "coffee", name: "Coffee", items: ["Coffee-related activities"] },
      { id: "food", name: "Food Processing", items: ["Food processing", "Packaging"] },
      { id: "handicrafts", name: "Handicrafts", items: ["Handicrafts", "Tribal art"] },
      { id: "bamboo", name: "Bamboo", items: ["Bamboo products"] },
      { id: "tourism", name: "Tourism", items: ["Tourism management", "Tour guiding", "Eco-tourism", "Digital tourism promotion"] },
      { id: "hospitality", name: "Hospitality", items: ["Hospitality", "Hotel operations", "Food preparation"] },
      { id: "entrepreneurship", name: "Entrepreneurship", items: ["Agriculture", "Horticulture", "Coffee", "Food processing", "Tourism", "Handicrafts", "Digital services"] }
    ],
    programmes: []
  },

  careerGuidance: {
    overview: "Career areas after education. Students should check official recruitment notifications for current eligibility, syllabus, age limits and application dates. Current vacancies are not listed.",
    categories: [
      { id: "gov", name: "Government Jobs" },
      { id: "education", name: "Education" },
      { id: "healthcare", name: "Healthcare" },
      { id: "agriculture", name: "Agriculture" },
      { id: "tourism", name: "Tourism" },
      { id: "hospitality", name: "Hospitality" },
      { id: "it", name: "IT" },
      { id: "digital", name: "Digital Services" },
      { id: "livelihoods", name: "Tribal Livelihoods" },
      { id: "entrepreneurship", name: "Entrepreneurship" }
    ],
    careers: [
      { id: "c-gov", categoryId: "gov", name: "Government Jobs", qualification: "As per the relevant official recruitment notification.", skills: NA, preparation: "Check the relevant official recruitment notification for current eligibility, syllabus, age limits and application dates.", employment: "Government employment as notified.", higherPathway: "School → Intermediate → Degree / Diploma / Professional Course as applicable.", exam: "APPSC, SSC, UPSC, Banking, Police, Railways, Defence and other recruitment examinations as notified.", source: "General career information from the education portal brief. Not a vacancy list." },
      { id: "c-edu", categoryId: "education", name: "Education careers", qualification: NA, skills: NA, preparation: "SSC to Intermediate to Degree / Diploma / Professional Course.", employment: NA, higherPathway: "School, Intermediate, degree and professional education pathways in the 11 mandals.", exam: NA, source: "General educational pathway information." },
      { id: "c-health", categoryId: "healthcare", name: "Healthcare", qualification: NA, skills: NA, preparation: "School to Intermediate to professional education as per official notifications.", employment: NA, higherPathway: "Paderu includes Government Medical College as a documented higher/professional education location.", exam: NA, source: "Documented presence of Government Medical College at Paderu. No course or vacancy list." },
      { id: "c-agri", categoryId: "agriculture", name: "Agriculture", qualification: NA, skills: NOT_ITDA_PROGRAMME, preparation: "Education combined with skill training and enterprise awareness.", employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-tour", categoryId: "tourism", name: "Tourism", qualification: NA, skills: "Tourism management, tour guiding, eco-tourism, communication, local culture interpretation (career areas, not a named ITDA programme list).", preparation: NA, employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-hosp", categoryId: "hospitality", name: "Hospitality", qualification: NA, skills: "Hospitality, hotel operations, food preparation (career areas).", preparation: NA, employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-it", categoryId: "it", name: "IT", qualification: NA, skills: "Computer fundamentals, programming, web development, digital services (career areas).", preparation: "Digital literacy and further IT skill areas.", employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-digital", categoryId: "digital", name: "Digital Services", qualification: NA, skills: "Digital literacy, data entry, digital services, AI awareness (career areas).", preparation: NA, employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-liv", categoryId: "livelihoods", name: "Tribal Livelihoods", qualification: NA, skills: "Bamboo products, handicrafts, tribal art, forest-product processing (career areas).", preparation: "Skill training and enterprise pathways.", employment: NA, higherPathway: NA, exam: NA, source: "General skill/career information." },
      { id: "c-ent", categoryId: "entrepreneurship", name: "Entrepreneurship", qualification: NA, skills: NOT_ITDA_PROGRAMME, preparation: "Idea → Training → Business Plan → Finance / Scheme Awareness → Enterprise → Market → Growth.", employment: "Enterprise / self-employment pathways (general).", higherPathway: NA, exam: NA, source: "General enterprise pathway information. Scheme finance details are not listed." }
    ]
  },

  studentProgrammes: {
    overview: "Student-development programmes. Super 50 is the only programme with year-specific reported figures in the supplied source.",
    categories: [
      { id: "super50", name: "Super 50" },
      { id: "coaching", name: "Academic Coaching" },
      { id: "mentoring", name: "Mentoring" },
      { id: "personality", name: "Personality Development" },
      { id: "communication", name: "Communication Skills" },
      { id: "leadership", name: "Leadership" },
      { id: "sports", name: "Sports" },
      { id: "cultural", name: "Cultural Activities" },
      { id: "digital", name: "Digital Literacy" },
      { id: "career", name: "Career Awareness" },
      { id: "exams", name: "Competitive Examination Preparation" }
    ],
    programmes: [
      {
        id: "super50",
        categoryId: "super50",
        official: true,
        name: "Super 50 – Special Coaching",
        category: "Super 50",
        overview: "The Tribal Welfare Department documents a Super 50 programme for high-performing tribal SSC students.",
        purpose: "Special coaching for high-performing tribal SSC students (as documented).",
        whyConducted: NA,
        conductedBy: NA,
        implementedBy: "Tribal Welfare Department (as documented)",
        implementingDepartment: "Tribal Welfare Department",
        implementingInstitution: NA,
        organizingTeam: NA,
        responsibleOfficer: NA,
        targetStudents: "High-performing tribal SSC students.",
        selection: "2025–26: screening on 1 September 2025; 104 merit students selected (51 boys, 53 girls). Other years’ selection method details are not published here.",
        coaching: "Special coaching. A fuller coaching syllabus is not published on this page. 2025–26: coaching centres opened at Paderu and Chintapalli; coaching started from 7 October 2025.",
        mentoring: NA,
        academicYear: "2023–24; 2024–25; 2025–26 (programme-specific reported figures).",
        date: NA,
        location: "Coaching centres opened at Paderu and Chintapalli (2025–26). This is not documented as a named-school event list.",
        activities: "Special coaching. Further activity lists are not published here.",
        participants: "See year-wise data.",
        facilities: NA,
        outcome: "See year-wise data.",
        photos: NA,
        documents: NA,
        source: "Tribal Welfare Super 50 programme figures as supplied for website planning.",
        verificationStatus: "Programme-specific reported figures. Verify latest official records.",
        lastUpdated: NA,
        yearWise: [
          {
            year: "2023–24",
            items: [
              "51 students passed in First Division",
              "21 boys",
              "30 girls",
              "2 students entered IIIT Nuzividu",
              "35 joined Colleges of Excellence",
              "8 joined APTWRJC",
              "Highest score: 585/600"
            ]
          },
          {
            year: "2024–25",
            items: [
              "All 51 selected students passed in First Division",
              "3 entered IIIT Nuzividu",
              "41 joined Colleges of Excellence",
              "6 joined APTWRJC",
              "Highest score: 577/600"
            ]
          },
          {
            year: "2025–26",
            items: [
              "Screening conducted on 1 September 2025",
              "104 merit students selected through screening",
              "51 boys",
              "53 girls",
              "Coaching centres opened at Paderu and Chintapalli",
              "Coaching started from 7 October 2025"
            ]
          }
        ]
      }
    ],
    stats: {
      title: "Super 50 — reported statistics",
      intro: "These figures are programme-specific reports from the Tribal Welfare Super 50 programme. Years are labelled on every card. Other Student Programmes categories do not have official counts in the supplied source.",
      source: "Tribal Welfare Super 50 programme figures as supplied for website planning.",
      verification: "Programme-specific reported figures. Verify latest official records.",
      cards: [
        { value: "104", label: "Merit students selected", year: "2025–26", detail: "51 boys · 53 girls. Screening: 1 September 2025." },
        { value: "2", label: "Coaching centres opened", year: "2025–26", detail: "Paderu and Chintapalli. Coaching from 7 October 2025." },
        { value: "51", label: "First Division (reported)", year: "2023–24", detail: "21 boys · 30 girls" },
        { value: "51", label: "Selected students, all First Division", year: "2024–25", detail: "As reported by Tribal Welfare" },
        { value: "585/600", label: "Highest SSC score", year: "2023–24", detail: "As reported" },
        { value: "577/600", label: "Highest SSC score", year: "2024–25", detail: "As reported" },
        { value: "2", label: "Entered IIIT Nuzividu", year: "2023–24", detail: "As reported" },
        { value: "3", label: "Entered IIIT Nuzividu", year: "2024–25", detail: "As reported" },
        { value: "35", label: "Joined Colleges of Excellence", year: "2023–24", detail: "As reported" },
        { value: "41", label: "Joined Colleges of Excellence", year: "2024–25", detail: "As reported" },
        { value: "8", label: "Joined APTWRJC", year: "2023–24", detail: "As reported" },
        { value: "6", label: "Joined APTWRJC", year: "2024–25", detail: "As reported" }
      ]
    }
  },

  statistics: {
    overview: "Figures should be interpreted according to the stated department/source. The 667 figure is the Tribal Welfare Department network, not the total of all schools in ASR District.",
    indicators: [
      { id: "mandals", value: "11", indicator: "Mandal Education Network", year: NA, source: PLAN_VERIFY, verificationStatus: "Verify latest official records.", group: "Mandal Statistics" },
      { id: "ashram", value: "107", indicator: "Ashram Schools", year: NA, source: PLAN_VERIFY, verificationStatus: "Verify latest official records.", group: "Residential Statistics" },
      { id: "emrs", value: "11", indicator: "EMRS Schools", year: NA, source: PLAN_VERIFY, verificationStatus: "Verify latest official records.", group: "Residential Statistics" },
      { id: "residential", value: "118", indicator: "Total Residential Schools in supplied dataset (Ashram + EMRS)", year: NA, source: PLAN_VERIFY, verificationStatus: "Verify latest official records.", group: "Residential Statistics" },
      { id: "tw-primary", value: "667", indicator: "Government Primary Schools under Tribal Welfare supervision (Tribal Welfare Department network — not total district schools of every management)", year: NA, source: "Tribal Welfare Department network figure in the planning dataset.", verificationStatus: "Verify latest official records before publication.", group: "School Statistics" },
      { id: "complex-hm", value: "77", indicator: "School Complex Headmasters", year: NA, source: PLAN_VERIFY, verificationStatus: "Verify latest official records.", group: "School Statistics" },
      { id: "s50-2025-sel", value: "104", indicator: "Super 50 merit students selected", year: "2025–26", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "51 boys, 53 girls. Verify latest official records.", group: "Student Programme Statistics" },
      { id: "s50-2025-centres", value: "2", indicator: "Super 50 coaching centres", year: "2025–26", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "Paderu and Chintapalli. Coaching from 7 October 2025.", group: "Student Programme Statistics" },
      { id: "s50-2023-fd", value: "51", indicator: "Super 50 First Division (reported)", year: "2023–24", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "21 boys, 30 girls. Verify latest official records.", group: "Student Programme Statistics" },
      { id: "s50-2024-fd", value: "51", indicator: "Super 50 selected students, all First Division", year: "2024–25", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "Verify latest official records.", group: "Student Programme Statistics" },
      { id: "s50-2023-high", value: "585/600", indicator: "Super 50 highest SSC score", year: "2023–24", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "Verify latest official records.", group: "Student Programme Statistics" },
      { id: "s50-2024-high", value: "577/600", indicator: "Super 50 highest SSC score", year: "2024–25", source: "Tribal Welfare Super 50 (as supplied).", verificationStatus: "Verify latest official records.", group: "Student Programme Statistics" }
    ]
  },

  faq: [
    { q: "What schools are available?", a: "Education is provided through Government schools, Tribal Welfare schools, Ashram Schools, EMRS, KGBVs, Junior Colleges, Degree Colleges, professional education, hostels and skill-development pathways across 11 mandals. A complete named list of every school is not published on this site. Verify UDISE+, School Education Department and Tribal Welfare records." },
    { q: "What is an Ashram School?", a: "Tribal Welfare Ashram Schools operate in a residential pattern from Classes 3 to 10. The planning dataset lists 107 Ashram Schools. Verify latest official records." },
    { q: "What is EMRS?", a: "Ekalavya Model Residential Schools follow a residential schooling model intended to improve access to quality education for tribal students, particularly those from remote settlements. The planning dataset lists 11 EMRS with named places: Pathokota, Majjivalasa, Dumbriguda, Chintalaveedi, Lakyaputtu, Munchingiputtu, Dokuluru, P.G. Madugula, Chintapally, G.K. Veedhi and Balaram." },
    { q: "What is KGBV?", a: "Kasturba Gandhi Balika Vidyalayas provide residential educational opportunities for eligible girls, particularly those from disadvantaged and remote communities. Institution counts are not listed on this page." },
    { q: "What residential facilities are available?", a: "Documented residential education includes Ashram Schools, EMRS, KGBV, boarding and Post-Matric College Hostels. Totals in the planning dataset: 107 Ashram Schools, 11 EMRS, 118 residential schools. Building-wise inventories are not published here." },
    { q: "What scholarships are available?", a: "This explorer lists Pre-Matric Scholarship, Post-Matric Scholarship, National Scholarship, National Fellowship and National Overseas Scholarship as scheme categories. Eligibility, amounts, portals and dates: verify the latest official notification. Amounts are not published here." },
    { q: "What is Super 50?", a: "The Tribal Welfare Department documents a Super 50 programme for high-performing tribal SSC students, with year-specific reported figures for 2023–24, 2024–25 and 2025–26. Open Student Programmes → Super 50 for those figures. Verify latest official records." },
    { q: "What skill programmes are available?", a: "Documented activities include Super 50 (Tribal Welfare / ITDA Paderu), AAROHAN AI Fellowship 2026 (ITDA Paderu in association with Datapro Computers Pvt. Ltd., Kakarapadu / Koyyuru venue as printed on the 2026 posters, including WebPulse 2026), Job Melas and career guidance (District Employment Exchange), coffee training (Coffee Board, Paderu), Sisal & Lantana fibre Action Research (Ministry of Tribal Affairs, Paderu ITDA Agency Area) and the Coffee Experience Centre (ITDA Paderu project). General digital, agriculture, tourism and entrepreneurship topics are skill areas, not named ITDA batches. This site does not call every activity an ITDA Skill Development Programme." },
    { q: "What higher education opportunities exist?", a: "Government Degree College at Paderu, Araku Valley and Chinthapalli; Government Degree College (Women) at Araku Valley and Marripallem, Koyyuru; Government Medical College at Paderu; plus Tribal Welfare educational institutions and Post-Matric College Hostels at Paderu. Course lists are not published here." }
  ]
};

(function buildInstitutions() {
  const mandals = educationData.schools.mandals;
  const counts = {};
  educationData.schools.residentialCounts.forEach(function (r) { counts[r.mandalId] = r; });
  const emrs = {};
  educationData.schools.emrsPlaces.forEach(function (e) { emrs[e.mandalId] = e; });

  const schoolInst = [];
  const resInst = [];

  mandals.forEach(function (m) {
    const c = counts[m.id] || {};
    const e = emrs[m.id];
    if (e) {
      const inst = {
        id: "emrs-" + m.id,
        module: "schools",
        named: true,
        mandalId: m.id,
        mandal: m.name,
        name: "EMRS – " + e.place,
        schoolType: "EMRS",
        management: NA,
        classes: NA,
        residential: "Residential",
        facilities: NA,
        academicInformation: "EMRS follows a residential schooling model intended to improve access to quality education for tribal students, particularly those from remote settlements.",
        studentInformation: NA,
        images: [],
        documents: [],
        programmes: [],
        place: e.place
      };
      schoolInst.push(inst);
      resInst.push(Object.assign({}, inst, { module: "residentialEducation", categoryId: "emrs" }));
    }
    schoolInst.push({
      id: "ashram-net-" + m.id,
      module: "schools",
      named: false,
      mandalId: m.id,
      mandal: m.name,
      name: "Tribal Welfare Ashram Schools network (" + (c.ashram || "—") + " schools)",
      schoolType: "Tribal Welfare Ashram Schools",
      management: "Tribal Welfare (as documented for this school type)",
      classes: "Classes 3 to 10 (residential pattern, as documented for Ashram Schools)",
      residential: "Residential",
      facilities: NA,
      academicInformation: "Tribal Welfare Ashram Schools operate in a residential pattern from Classes 3 to 10. Individual school names are not listed here.",
      studentInformation: NA,
      images: [],
      documents: [],
      programmes: [],
      count: c.ashram
    });
    resInst.push({
      id: "ashram-res-" + m.id,
      module: "residentialEducation",
      categoryId: "ashram",
      named: false,
      mandalId: m.id,
      mandal: m.name,
      name: "Ashram Schools – " + m.name + " (" + (c.ashram || "—") + ")",
      schoolType: "Tribal Welfare Ashram Schools",
      management: "Tribal Welfare (as documented for this school type)",
      classes: "Classes 3 to 10",
      residential: "Residential",
      facilities: NA,
      academicInformation: "Network record for this mandal. Individual Ashram School names are not published here.",
      studentInformation: NA,
      images: [],
      documents: [],
      programmes: [],
      count: c.ashram
    });
    schoolInst.push({
      id: "tw-primary-" + m.id,
      module: "schools",
      named: false,
      mandalId: m.id,
      mandal: m.name,
      name: "Government Primary Schools under Tribal Welfare (network)",
      schoolType: "Government Primary Schools (Tribal Welfare)",
      management: "Tribal Welfare supervision (network figure is district-level 667, not a mandal split)",
      classes: "Primary (non-residential pattern, as documented)",
      residential: "Non-Residential",
      facilities: NA,
      academicInformation: "Government Primary Schools under Tribal Welfare operate in a non-residential pattern. The 667 figure is the Tribal Welfare Department network total, not a mandal-wise published list.",
      studentInformation: NA,
      images: [],
      documents: [],
      programmes: []
    });
    schoolInst.push({
      id: "gov-net-" + m.id,
      module: "schools",
      named: false,
      mandalId: m.id,
      mandal: m.name,
      name: "Other Government / Tribal Welfare schools (names not published)",
      schoolType: "Government / Tribal Welfare schools",
      management: NA,
      classes: NA,
      residential: NA,
      facilities: NA,
      academicInformation: m.network + " Key opportunities: " + m.opportunities,
      studentInformation: NA,
      images: [],
      documents: [],
      programmes: []
    });
  });

  educationData.schools.institutions = schoolInst;
  educationData.residentialEducation.institutions = resInst;
})();

(function addNamedAshramFromBoards() {
  const PHOTO = "Photograph supplied for this school page. Not used on other schools, ATL, or EMRS.";
  const kommika = {
    id: "ashram-kommika-girls",
    module: "schools",
    named: true,
    mandalId: "koyyuru",
    mandal: "Koyyuru",
    village: "Kommika",
    pin: "531084",
    place: "Kommika",
    name: "Govt. T.W. Ashram School (Girls), Kommika",
    schoolType: "Tribal Welfare Ashram School (Girls)",
    management: "Tribal Welfare (as shown on the school entrance board)",
    classes: "Classes 3 to 10 (residential pattern, as documented for Ashram Schools)",
    residential: "Residential",
    facilities: NA,
    academicInformation: "Named from the entrance board: GOVT. T.W. ASHRAM. SCHOOL. GIRLS, KOMMIKA, PIN 531084. Listed under Koyyuru mandal for this explorer. Confirm the UDISE+ mandal/village code before treating this as a complete official directory entry.",
    studentInformation: NA,
    documents: [],
    programmes: [],
    images: [
      { slot: "School Building", src: "images/ashram/kommika-entrance-gate.jpg", caption: "Entrance gate: Govt. T.W. Ashram School (Girls), Kommika, PIN 531084.", source: PHOTO },
      { slot: "School Building", src: "images/ashram/kommika-campus-reading-block.jpg", caption: "Campus block with the “WE LOVE READING” mural, Kommika Girls Ashram School.", source: PHOTO },
      { slot: "School Building", src: "images/ashram/kommika-campus-main-block.jpg", caption: "Main academic block, Kommika Girls Ashram School campus.", source: PHOTO },
      { slot: "Students", src: "images/ashram/kommika-students-assembly.jpg", caption: "Students of the Girls Ashram School on the campus ground.", source: PHOTO },
      { slot: "Laboratory", src: "images/ashram/kommika-science-lab-1.jpg", caption: "Science practical with microscope, Kommika Girls Ashram School.", source: PHOTO },
      { slot: "Laboratory", src: "images/ashram/kommika-science-lab-2.jpg", caption: "Science practical session, Kommika Girls Ashram School.", source: PHOTO },
      { slot: "Classroom", src: "images/ashram/kommika-outdoor-class.jpg", caption: "Outdoor writing class on the school campus.", source: PHOTO },
      { slot: "Programme Activities", src: "images/ashram/kommika-science-exhibition.jpg", caption: "Corridor science / project display at the school.", source: PHOTO },
      { slot: "Programme Activities", src: "images/ashram/kommika-teachers-day.jpg", caption: "Teachers’ Day at the Tribal Welfare Girls Ashram School (కళావేదిక).", source: PHOTO }
    ]
  };
  const rajom = {
    id: "ashram-rajomprapalem",
    module: "schools",
    named: true,
    mandalId: "koyyuru",
    mandal: "Koyyuru",
    village: "Rajomprapalem (Rajakul)",
    place: "Rajomprapalem",
    name: "Govt. Tribal Welfare Ashram School, Rajomprapalem",
    schoolType: "Tribal Welfare Ashram School",
    management: "Tribal Welfare (as shown on the Telugu school board)",
    classes: "Classes 3 to 10 (residential pattern, as documented for Ashram Schools)",
    residential: "Residential",
    facilities: NA,
    academicInformation: "Named from the Telugu board: ప్రభుత్వ గిరిజన సంక్షేమ ఆశ్రమ పాఠశాల, కోయ్యూరు మండలం, రాజోంప్రపాలెం (రాజాకుల), అల్లూరి సీతారామరాజు జిల్లా.",
    studentInformation: NA,
    documents: [],
    programmes: [],
    images: [
      { slot: "School Building", src: "images/ashram/rajomprapalem-entrance.jpg", caption: "School entrance, Govt. Tribal Welfare Ashram School, Rajomprapalem, Koyyuru mandal.", source: PHOTO },
      { slot: "Programme Activities", src: "images/ashram/rajomprapalem-assembly.jpg", caption: "Assembly on the Rajomprapalem Ashram School campus.", source: PHOTO }
    ]
  };

  educationData.schools.institutions.unshift(kommika, rajom);
  educationData.residentialEducation.institutions.unshift(
    Object.assign({}, kommika, { module: "residentialEducation", categoryId: "ashram" }),
    Object.assign({}, rajom, { module: "residentialEducation", categoryId: "ashram" })
  );
})();

educationData.topicPhotos = {
  cultural: [
    {
      slot: "Cultural activity",
      src: "images/cultural/traditional-dress-group-1.jpg",
      caption: "Students in traditional dress at a cultural gathering. Event name, venue and date are not printed on the photograph.",
      source: "Photograph supplied for Sports & Cultural / Cultural Activities pages only."
    },
    {
      slot: "Cultural activity",
      src: "images/cultural/traditional-dress-group-2.jpg",
      caption: "The same cultural gathering, students in traditional dress with event badges. Event name is not printed on the photograph.",
      source: "Photograph supplied for Sports & Cultural / Cultural Activities pages only."
    }
  ],
  ashramCampus: [
    {
      slot: "School campus",
      src: "images/ashram/ashram-campus-walkway.jpg",
      caption: "Tree-lined walkway and residential campus buildings of a Tribal Welfare Ashram school. The school name is not printed on this photograph.",
      source: "Photograph supplied for the Ashram Schools campus topic. Not used as ATL, EMRS or cultural-event photos."
    }
  ],
  skill: {
    coffee: [
      {
        slot: "Field training",
        src: "images/skill/coffee-field-training.jpg",
        caption: "Coffee field demonstration among coffee plants. Shown under Coffee Board / coffee livelihood skills. Trainer organisation is not printed on the photograph.",
        source: "Photograph supplied for Coffee Skill & Livelihood Development."
      },
      {
        slot: "Harvesting",
        src: "images/skill/coffee-harvest.jpg",
        caption: "Coffee cherry harvesting with baskets. Shown under coffee livelihood skills. Farm name and date are not printed on the photograph.",
        source: "Photograph supplied for Coffee Skill & Livelihood Development."
      }
    ],
    aarohan: [
      {
        slot: "Programme poster",
        src: "images/skill/aarohan-fellowship-poster-2026.jpg",
        caption: "AAROHAN AI Fellowship Programme 2026 poster: ITDA Paderu in association with Datapro Computers Pvt. Ltd. Venue printed: Government Tribal Welfare Post Metric Hostel (Girls), Kakarapadu (V), Koyyuru Mandal — 531 087.",
        source: "Programme poster supplied for AAROHAN."
      },
      {
        slot: "WebPulse 2026 poster",
        src: "images/skill/aarohan-webpulse-poster-2026.jpg",
        caption: "AAROHAN WebPulse 2026 poster — Real-Time Web Integration Challenge, 26 September 2026, 10 teams of 5, HTML5 / CSS3 / JavaScript / third-party APIs / Ollama API. Same Koyyuru hostel venue and Datapro association as printed.",
        source: "Programme poster supplied for AAROHAN."
      },
      {
        slot: "Computer training",
        src: "images/skill/aarohan-computer-lab.jpg",
        caption: "Students at a computer training centre during coding practice. The wall board reads Computer Training Center. This photograph is shown on the AAROHAN programme page as supplied with the 2026 materials.",
        source: "Photograph supplied for AAROHAN."
      },
      {
        slot: "Inauguration",
        src: "images/skill/aarohan-inauguration.jpg",
        caption: "Ribbon-cutting photograph supplied with the AAROHAN 2026 materials. Names of officers and guests are not printed on the image and are not published here.",
        source: "Photograph supplied for AAROHAN."
      }
    ],
    digital: [
      {
        slot: "Computer skills",
        src: "images/skill/digital-computer-lab.png",
        caption: "Computer-lab training photograph supplied for Digital Skills. This image is not labelled as a named Paderu school ATL or AAROHAN centre.",
        source: "Photograph supplied for Digital & Technology Skill Development."
      },
      {
        slot: "Electronics / youth training",
        src: "images/skill/digital-electronics-youth.png",
        caption: "Youth electronics / soldering practice. A banner in the photo refers to a 2023 youth training / National Youth Day activity. This is not AAROHAN 2026 and is not labelled as an ITDA Paderu centre unless official records confirm it.",
        source: "Photograph supplied for Digital & Technology Skill Development."
      }
    ],
    vocational: [
      {
        slot: "Tailoring / sewing",
        src: "images/skill/vocational-sewing.jpg",
        caption: "Sewing practice. The banner in the photograph reads a sewing school (Usha). This is vocational tailoring, not an ITDA-branded course unless official records confirm it.",
        source: "Photograph supplied for Vocational Skills."
      },
      {
        slot: "Electrical / workshop",
        src: "images/skill/vocational-electrical.jpg",
        caption: "Electrical / workshop practice with motors and wiring. Centre name is not printed on the photograph. Not labelled as an ITDA Paderu batch.",
        source: "Photograph supplied for Vocational Skills."
      }
    ],
    handicrafts: [
      {
        slot: "Fibre / craft practice",
        src: "images/skill/handicraft-fibre-craft.png",
        caption: "Youth practising fibre / knotting craft. Shown under Tribal Handicraft & Traditional Skills, not as a completed named ITDA handicraft batch.",
        source: "Photograph supplied for Tribal Handicraft & Traditional Skills."
      }
    ],
    entrepreneurship: [
      {
        slot: "Food / livelihood skill",
        src: "images/skill/food-community-cooking.jpg",
        caption: "Community cooking / food-preparation activity. Shown under entrepreneurship and food-processing skill areas. Programme name is not printed on the photograph.",
        source: "Photograph supplied for Entrepreneurship & Self-Employment (food processing)."
      }
    ]
  }
};
