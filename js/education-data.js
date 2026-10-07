/* Documented education information for ITDA Paderu / ASR District.
   Do not invent extra schemes, counts, phones, officers or URLs. */

const educationData = {
  overview: {
    heading: "Education Overview",
    text: "The ITDA Paderu region of Alluri Sitharama Raju (ASR) District, Andhra Pradesh, serves a predominantly tribal and geographically dispersed population. The education system covers 11 mandals: Ananthagiri, Araku Valley, Dumbriguda, Hukumpeta, Pedabayalu, Munchingiputtu, Paderu, G. Madugula, Chinthapalli, G.K. Veedhi and Koyyuru.",
    providedThrough: [
      "Government schools",
      "Tribal Welfare schools",
      "Ashram Schools",
      "Ekalavya Model Residential Schools (EMRS)",
      "Kasturba Gandhi Balika Vidyalayas (KGBVs)",
      "Junior Colleges",
      "Degree Colleges",
      "Professional education",
      "Hostels",
      "Skill development pathways"
    ],
    hero: "ITDA Paderu supports a multi-level education ecosystem serving students across the tribal and geographically dispersed areas of Alluri Sitharama Raju District.",
    highlight: "Education • Residential Learning • Skills • Careers • Student Development"
  },
  mandals: [
    { no: 1, name: "Ananthagiri", network: "Government schools, Tribal Welfare schools, residential education, EMRS network", opportunities: "School education, residential education, SSC preparation" },
    { no: 2, name: "Araku Valley", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College, Government Degree College for Women", opportunities: "School, Intermediate, degree and women's higher education" },
    { no: 3, name: "Dumbriguda", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "Primary to secondary and residential tribal education" },
    { no: 4, name: "Hukumpeta", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and competitive preparation" },
    { no: 5, name: "Pedabayalu", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and higher-study pathways" },
    { no: 6, name: "Munchingiputtu", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education and residential tribal education" },
    { no: 7, name: "Paderu", network: "Government schools, Tribal Welfare institutions, EMRS, Government Degree College, Government Medical College", opportunities: "Degree, professional education, competitive exams and employment preparation" },
    { no: 8, name: "G. Madugula", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "Primary, secondary and residential education" },
    { no: 9, name: "Chinthapalli", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College", opportunities: "School, Intermediate and degree education" },
    { no: 10, name: "G.K. Veedhi", network: "Government schools, Tribal Welfare schools, EMRS", opportunities: "School education, residential education and higher studies" },
    { no: 11, name: "Koyyuru", network: "Government schools, Tribal Welfare schools, EMRS, Government Degree College (Women), Marripallem", opportunities: "School and higher education, especially opportunities for women" }
  ],
  stats: [
    { value: "11", label: "Mandal Education Network", note: "Documented mandal coverage" },
    { value: "107", label: "Ashram Schools", note: "Residential Tribal Welfare ashram network" },
    { value: "11", label: "EMRS Schools", note: "One EMRS listed per mandal in the planning dataset" },
    { value: "118", label: "Total Residential Schools", note: "Ashram Schools + EMRS in the planning dataset" },
    { value: "667", label: "Government Primary Schools under Tribal Welfare supervision", note: "Tribal Welfare Department network — not the total of all schools in ASR District" },
    { value: "77", label: "School Complex Headmasters", note: "Tribal Welfare school-complex monitoring" }
  ],
  schools: [
    { name: "Government Primary Schools", text: "Government Primary Schools under Tribal Welfare operate in a non-residential pattern." },
    { name: "Government Upper Primary Schools", text: "Part of the school education pathway from primary toward SSC." },
    { name: "Government High Schools", text: "Secondary schooling toward SSC in the 11-mandal education network." },
    { name: "Tribal Welfare Schools", text: "Tribal Welfare is a major part of education in the Paderu agency area." },
    { name: "Tribal Welfare Ashram Schools", text: "Tribal Welfare Ashram Schools operate in a residential pattern from Classes 3 to 10." },
    { name: "School Complexes", text: "Academic supervision includes school-complex monitoring. 77 School Complex Headmasters are documented in the Tribal Welfare network." }
  ],
  residentialSchools: [
    { mandal: "Ananthagiri", ashram: 12, emrs: 1, total: 13 },
    { mandal: "Araku Valley", ashram: 7, emrs: 1, total: 8 },
    { mandal: "Dumbriguda", ashram: 7, emrs: 1, total: 8 },
    { mandal: "Hukumpeta", ashram: 11, emrs: 1, total: 12 },
    { mandal: "Munchingiputtu", ashram: 12, emrs: 1, total: 13 },
    { mandal: "Pedabayalu", ashram: 9, emrs: 1, total: 10 },
    { mandal: "Paderu", ashram: 9, emrs: 1, total: 10 },
    { mandal: "G. Madugula", ashram: 10, emrs: 1, total: 11 },
    { mandal: "Chintapalle", ashram: 10, emrs: 1, total: 11 },
    { mandal: "G.K. Veedhi", ashram: 8, emrs: 1, total: 9 },
    { mandal: "Koyyuru", ashram: 12, emrs: 1, total: 13 }
  ],
  residentialTotals: { ashram: 107, emrs: 11, total: 118 },
  emrs: [
    { mandal: "Ananthagiri", place: "Pathokota" },
    { mandal: "Araku Valley", place: "Majjivalasa" },
    { mandal: "Dumbriguda", place: "Dumbriguda" },
    { mandal: "Hukumpeta", place: "Chintalaveedi" },
    { mandal: "Pedabayalu", place: "Lakyaputtu" },
    { mandal: "Munchingiputtu", place: "Munchingiputtu" },
    { mandal: "Paderu", place: "Dokuluru" },
    { mandal: "G. Madugula", place: "P.G. Madugula" },
    { mandal: "Chinthapalli", place: "Chintapally" },
    { mandal: "G.K. Veedhi", place: "G.K. Veedhi" },
    { mandal: "Koyyuru", place: "Balaram" }
  ],
  emrsNote: "EMRS follows a residential schooling model intended to improve access to quality education for tribal students, particularly those from remote settlements.",
  kgbv: {
    heading: "Kasturba Gandhi Balika Vidyalayas",
    text: "KGBVs provide residential educational opportunities for eligible girls, particularly those from disadvantaged and remote communities.",
    sections: ["Girls' education", "Residential support", "Academic development", "Career guidance", "Higher education", "Skill development"]
  },
  colleges: [
    { institution: "Government Degree College", location: "Paderu" },
    { institution: "Government Degree College", location: "Araku Valley" },
    { institution: "Government Degree College (Women)", location: "Araku Valley" },
    { institution: "Government Degree College", location: "Chinthapalli" },
    { institution: "Government Degree College (Women)", location: "Marripallem, Koyyuru" }
  ],
  higherEducationNote: "Paderu serves as an important higher-education location with Government Degree College, Government Medical College, Tribal Welfare educational institutions and Post-Matric College Hostels.",
  studentSupport: [
    { name: "Residential Accommodation", what: "Boarding arrangements in residential schools and hostels.", why: "Supports students from remote settlements.", who: "Students in Ashram Schools, EMRS, KGBV and hostels." },
    { name: "Boarding / Meals", what: "Residential boarding as part of the Tribal Welfare school system.", why: "Helps students stay in education away from home.", who: "Residential school and hostel students." },
    { name: "Post-Matric College Hostels", what: "Hostel support linked to higher education.", why: "Enables continued study after SSC.", who: "Students in Intermediate, degree and professional courses." },
    { name: "Scholarships", what: "Educational financial support pathways.", why: "Reduces barriers to continuing education.", who: "Eligible students as per latest official notification." },
    { name: "EMRS", what: "Ekalavya Model Residential Schools in the 11 mandals.", why: "Residential quality education for tribal students.", who: "Tribal students, particularly from remote settlements." },
    { name: "KGBV", what: "Kasturba Gandhi Balika Vidyalayas.", why: "Residential education for eligible girls.", who: "Eligible girls from disadvantaged and remote communities." },
    { name: "Academic Coaching", what: "Academic support including Super 50 for high-performing SSC students.", why: "Strengthens examination and higher-study pathways.", who: "Students in the documented programmes." },
    { name: "Super 50", what: "Special coaching documented by the Tribal Welfare Department for high-performing tribal SSC students.", why: "Supports first-division outcomes and higher-study entry.", who: "Selected high-performing tribal SSC students." },
    { name: "MTB-MLE", what: "Mother Tongue-Based Multilingual Education.", why: "Supports early learning through familiar language contexts.", who: "Early-grade learners progressing toward Telugu, English and other academic languages." },
    { name: "School Infrastructure", what: "School and residential education infrastructure in the 11-mandal network.", why: "Enables teaching, boarding and monitoring.", who: "Students and school complexes in the Tribal Welfare / government network." },
    { name: "Teacher & Academic Monitoring", what: "School-complex monitoring, including 77 School Complex Headmasters in the documented network.", why: "Supports academic supervision.", who: "Schools under the Tribal Welfare network." },
    { name: "Sports & Extracurricular Activities", what: "Physical and creative student development areas.", why: "Supports holistic education.", who: "School and residential students." }
  ],
  super50: [
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
        "104 merit students selected through screening",
        "51 boys",
        "53 girls",
        "Coaching centres opened at Paderu and Chinthapalli"
      ]
    }
  ],
  super50Note: "Programme-specific reported figures. Source / Year as labelled. Verify latest official records.",
  scholarships: [
    "Pre-Matric Support",
    "Post-Matric Support",
    "Educational Assistance",
    "Hostel Support",
    "Merit-Based Support",
    "Girl-Student Support"
  ],
  scholarshipFields: ["Eligibility", "Documents", "Application Process", "Benefits", "Official Source"],
  scholarshipVerify: "Details to be verified from the latest official notification.",
  skills: {
    digital: ["Computer fundamentals", "Digital literacy", "Internet usage", "Web development", "Programming", "Data entry", "Digital services", "AI awareness"],
    vocational: ["Electrical", "Plumbing", "Welding", "Automobile", "Construction", "Tailoring", "Beauty & wellness", "Food processing", "Hospitality"],
    livelihood: ["Bamboo products", "Handicrafts", "Tribal art", "Forest-product processing", "Agriculture-based enterprise", "Horticulture", "Coffee-related activities", "Food processing"],
    note: "These are skill and career areas unless an official source confirms they are specific ITDA programmes."
  },
  careers: [
    { area: "Government Jobs", examples: "Recruitment examinations such as APPSC, SSC, UPSC, Banking, Police, Railways and Defence as notified.", preparation: "Check the relevant official recruitment notification for current eligibility, syllabus, age limits and application dates." },
    { area: "Education", examples: "School, Intermediate, degree and professional education pathways in the 11 mandals.", preparation: "SSC to Intermediate to Degree / Diploma / Professional Course." },
    { area: "Healthcare", examples: "Higher and professional education at Paderu including Government Medical College.", preparation: "School to Intermediate to professional education as per official notifications." },
    { area: "Agriculture", examples: "Agriculture, horticulture, coffee and related livelihood skills.", preparation: "Education combined with skill training and enterprise awareness." },
    { area: "Tourism & Hospitality", examples: "Tourism management, hospitality, hotel operations, tour guiding, eco-tourism.", preparation: "Skill training, communication and local culture interpretation." },
    { area: "IT & Digital", examples: "Computer fundamentals, digital literacy, data entry, digital services, AI awareness.", preparation: "Digital literacy and further IT skill areas." },
    { area: "Tribal Livelihoods", examples: "Bamboo products, handicrafts, tribal art, forest-product processing.", preparation: "Skill training and enterprise pathways." },
    { area: "Entrepreneurship", examples: "Agriculture, horticulture, coffee, food processing, tourism, handicrafts, digital services.", preparation: "Idea → Training → Business Plan → Finance / Scheme Awareness → Enterprise → Market → Growth." }
  ],
  exams: ["APPSC", "SSC", "UPSC", "Banking", "Police", "Railways", "Defence", "Other recruitment examinations"],
  examNote: "Students should check the relevant official recruitment notification for current eligibility, syllabus, age limits and application dates.",
  sports: ["Athletics", "Volleyball", "Football", "Cricket", "Kabaddi", "Kho-Kho", "Traditional tribal sports", "Fitness activities", "Competitions", "Extracurricular development"],
  girlsEducation: ["KGBV", "Secondary Education", "Intermediate", "Women's Higher Education", "Professional Education", "Skill Development", "Employment / Entrepreneurship"],
  mtbMle: {
    heading: "Mother Tongue-Based Multilingual Education",
    text: "MTB-MLE supports early learning through familiar language contexts while helping students progress toward Telugu, English and other formal academic languages.",
    path: ["Mother Tongue", "Telugu", "English / Other Academic Languages"]
  },
  entrepreneurship: ["Agriculture", "Horticulture", "Coffee", "Food Processing", "Tourism", "Eco-Tourism", "Handicrafts", "Bamboo Products", "Retail", "Transport", "Digital Services"],
  dataNote: "The district administration does not publish one consolidated current webpage containing every individual school in all 11 mandals. The documented figure of 667 Government Primary Schools relates to the Tribal Welfare Department's network and should not be interpreted as the total number of all schools of every management. Institution-level lists should be verified against the latest UDISE+, School Education Department, Tribal Welfare Department and district records before publication.",
  programmeCategories: [
    { id: "academic", name: "Academic Programmes" },
    { id: "skill", name: "Skill Programmes" },
    { id: "sports", name: "Sports Programmes" },
    { id: "cultural", name: "Cultural Programmes" },
    { id: "career", name: "Career Programmes" },
    { id: "special", name: "Special Programmes" }
  ],
  programmeDetailFields: [
    "Programme Name",
    "Purpose",
    "Conducted By",
    "Implementing Department",
    "Target Students",
    "Date / Year",
    "Location",
    "Activities",
    "Participants",
    "Outcomes",
    "Photos / Documents"
  ],
  programmes: [
    {
      id: "super50",
      category: "special",
      name: "Super 50 – Special Coaching",
      purpose: "The Tribal Welfare Department documents a Super 50 programme for high-performing tribal SSC students.",
      conductedBy: "Tribal Welfare Department (as documented)",
      implementingDepartment: "Tribal Welfare Department",
      targetStudents: "High-performing tribal SSC students selected through the documented Super 50 process.",
      dateYear: "2023–24; 2024–25; 2025–26 (programme-specific reported figures).",
      location: "Coaching centres opened at Paderu and Chinthapalli (2025–26). This is not documented as a named-school event list.",
      activities: "Special coaching. A fuller activity list is not published on this page.",
      participants: "2023–24: 51 students (21 boys, 30 girls). 2024–25: 51 selected students. 2025–26: 104 merit students selected through screening (51 boys, 53 girls).",
      outcomes: "2023–24: 51 passed in First Division; 2 entered IIIT Nuzividu; 35 joined Colleges of Excellence; 8 joined APTWRJC; highest score 585/600. 2024–25: all 51 selected students passed in First Division; 3 entered IIIT Nuzividu; 41 joined Colleges of Excellence; 6 joined APTWRJC; highest score 577/600. 2025–26: screening and centre opening as documented. Verify latest official records.",
      photos: "Photos / documents are not published on this page. Verify latest official records.",
      verification: "Programme-specific reported figures. Source / Year as labelled. Verify latest official records.",
      relatedMandals: ["Paderu", "Chinthapalli"]
    },
    {
      id: "mtbmle",
      category: "academic",
      name: "Mother Tongue-Based Multilingual Education (MTB-MLE)",
      purpose: "MTB-MLE supports early learning through familiar language contexts while helping students progress toward Telugu, English and other formal academic languages.",
      conductedBy: "Details to be verified from the latest official notification.",
      implementingDepartment: "Details to be verified from the latest official notification.",
      targetStudents: "Early-grade learners progressing toward Telugu, English and other academic languages.",
      dateYear: "Not specified on this page. Verify latest official records.",
      location: "Education network of ITDA Paderu / ASR District (11 mandals). School-level venues are not listed here.",
      activities: "Mother Tongue → Telugu → English / Other Academic Languages. Further activity lists are not published here.",
      participants: "Participant counts are not published on this page.",
      outcomes: "Outcomes are not published as statistics on this page.",
      photos: "Photos / documents are not published on this page. Verify latest official records.",
      verification: "Documented as an education approach, not as a named school-wise event calendar.",
      relatedMandals: []
    }
  ],
  sources: [
    "ASR District Administration – Department of School Education",
    "ASR District Administration – Tribal Welfare Department",
    "ASR District Administration – Public Utilities / Government Degree Colleges",
    "Government-related EMRS information",
    "District education programme and notification information"
  ]
};
