/* Health Department — ASR District / ITDA Paderu. Capacities and programmes from the supplied official district health brief. Officer names and unpublished phones are not listed. */

const HEALTH_NA = "Information not available in the supplied source.";
const HEALTH_VERIFY = "Verify latest official records.";
const HEALTH_SOURCE = "Official ASR District Health Department page (as supplied for website planning).";
const HEALTH_LAST_VERIFIED = "26 September 2026 (against the supplied district health brief). Postings and contact numbers can change.";
const HEALTH_NOT_OFFICIAL = "This is a reference information page, not the official government health website. Confirm current services, eligibility and orders with the Medical & Health Department at ITDA Office, Paderu.";

const healthData = {
  homeIntro: "The Health Department provides government healthcare services across Alluri Sitharama Raju District through District Hospitals, Area Hospitals and Community Health Centres. The department focuses on accessible healthcare, maternal and child health, newborn care, blood services, eye care, disability certification, medicines and other public-health programmes.",
  about: {
    intro: "The Medical & Health Department provides healthcare services to the people of Alluri Sitharama Raju District, including communities living in the tribal and agency areas.",
    system: "The district health system includes District Hospital, Area Hospital and Community Health Centres, supported by medical, nursing, diagnostic, emergency and public-health services.",
    listed: [
      "District Hospital, Paderu — 200 beds",
      "Area Hospital, Araku — 150 beds",
      "Community Health Centre, Chintapalli — 50 beds",
      "Community Health Centre, Munchingiput — 30 beds",
      "Blood Bank at District Hospital, Paderu",
      "Blood Storage Centres at Area Hospital, Araku Valley and CHC Chintapalli"
    ]
  },
  administrationCard: {
    title: "HEALTH DEPARTMENT — ITDA PADERU",
    rows: [
      ["Administrative Department", "Medical & Health Department"],
      ["District Medical & Health Officer", "DM&HO"],
      ["Office", "ITDA Office, Paderu"],
      ["Hospital Services Authority", "District Coordinator of Hospital Services"],
      ["Major Government Hospital", "Government General Hospital, Paderu"],
      ["District Hospital", "200 beds"],
      ["Area Hospital", "Araku Valley — 150 beds"],
      ["Community Health Centres", "Chintapalli — 50 beds; Munchingiput — 30 beds"],
      ["Source", HEALTH_SOURCE]
    ]
  },
  officers: [
    {
      id: "dmho",
      name: "District Medical & Health Officer (DM&HO)",
      department: "Medical & Health Department",
      office: "ITDA Office, Paderu",
      designation: "District Medical & Health Officer (DM&HO)",
      note: "The current official district Who's Who page lists the DM&HO under the Medical & Health Department at ITDA Office, Paderu, and provides official contact information there. The personal name and phone are not copied onto this page because postings change."
    },
    {
      id: "dchs",
      name: "District Coordinator of Hospital Services (DCHS)",
      department: "Directorate of Secondary Health / Hospital Services",
      office: "ITDA Office, Paderu",
      designation: "District Coordinator of Hospital Services",
      note: "The DCHS coordinates hospital services under the district health system."
    },
    {
      id: "ggh-supt",
      name: "GGH Superintendent, Paderu",
      department: "Government General Hospital, Paderu",
      office: "Sundruputtu Village, Paderu",
      designation: "GGH Superintendent, Paderu",
      note: "Personal name is not published here."
    },
    {
      id: "ggh-deputy",
      name: "GGH Deputy Superintendent",
      department: "Government General Hospital, Paderu",
      office: "Sundruputtu Village, Paderu",
      designation: "GGH Deputy Superintendent",
      note: "Personal name is not published here."
    }
  ],
  hospitals: [
    {
      id: "dh-paderu",
      name: "District Hospital — Paderu",
      alsoKnownAs: "Government General Hospital, Paderu",
      location: "Sundruputtu Village, Paderu",
      capacity: "200 beds",
      level: "District Hospital",
      overview: "The District Hospital at Paderu is the major government hospital listed for the district. Capacity: 200 beds.",
      contacts: {
        phones: ["9246482356", "9441083160"],
        email: "supttgghpaderu@gmail.com",
        source: "Published on the district public-utilities page for Government General Hospital, Paderu."
      },
      services: [
        "General hospital services",
        "Blood Bank",
        "Newborn care",
        "Special Newborn Care Unit",
        "Dialysis-related services",
        "Drug de-addiction services",
        "Eye-care services (Mukhyamantri e-EYE Centre)",
        "Maternal and child health services",
        "Diagnostic services",
        "Emergency and inpatient care",
        "SADAREM disability assessment and certification"
      ],
      photos: [
        {
          slot: "Hospital entrance",
          src: "images/ggh-paderu-entrance.png",
          caption: "Government General Hospital, Paderu, ASR District — main block and ambulance bay. The board reads Government General Hospital, Paderu, ASR Dist.",
          source: "Photograph supplied for District Hospital / GGH Paderu."
        },
        {
          slot: "Maternity & Child Health Care Block",
          src: "images/ggh-paderu-mch-block.png",
          caption: "Maternity & Child Health Care Block, Government General Hospital, Paderu, ASR District, as printed on the gate board.",
          source: "Photograph supplied for District Hospital / GGH Paderu and Maternal & Child Health."
        }
      ]
    },
    {
      id: "ah-araku",
      name: "Area Hospital — Araku Valley",
      alsoKnownAs: "Area Hospital, Araku",
      location: "Araku Valley",
      capacity: "150 beds",
      level: "Area Hospital",
      overview: "The Area Hospital at Araku Valley provides secondary-level government healthcare services for the surrounding population. Capacity: 150 beds.",
      contacts: null,
      services: [
        "Blood storage",
        "Eye-care services (Mukhyamantri e-EYE Centre)",
        "Maternal healthcare",
        "SADAREM disability assessment and certification",
        "Other hospital services"
      ],
      photos: [
        {
          slot: "Hospital entrance",
          src: "images/ah-araku-entrance.png",
          caption: "Area Hospital, Araku Valley. The board also reads A.P. Vaidya Vidhana Parishad and Visakhapatnam. Duplicate copies of the same photograph are not shown again.",
          source: "Photograph supplied for Area Hospital, Araku Valley."
        }
      ]
    },
    {
      id: "chc-chintapalli",
      name: "Community Health Centre — Chintapalli",
      alsoKnownAs: "CHC Chintapalli",
      location: "Chintapalli",
      capacity: "50 beds",
      level: "Community Health Centre",
      overview: "The Community Health Centre provides healthcare services to people in and around Chintapalli and the surrounding agency area. Capacity: 50 beds.",
      contacts: null,
      services: [
        "Blood Storage Centre",
        "Special Newborn Care Unit",
        "General CHC services"
      ]
    },
    {
      id: "chc-munchingiput",
      name: "Community Health Centre — Munchingiput",
      alsoKnownAs: "CHC Munchingiput",
      location: "Munchingiput",
      capacity: "30 beds",
      level: "Community Health Centre",
      overview: "The CHC provides government healthcare services to the surrounding population. Capacity: 30 beds.",
      contacts: null,
      services: ["General CHC services"]
    }
  ],
  programmes: [
    {
      id: "jsy",
      name: "Janani Suraksha Yojana",
      short: "JSY",
      purpose: "Maternal and infant health",
      target: "Pregnant women",
      service: "Institutional delivery support",
      department: "Medical & Health",
      overview: "Janani Suraksha Yojana is intended to encourage institutional deliveries and support reduction of maternal and infant mortality. The district health page provides the applicable benefit details for deliveries in government hospitals.",
      focus: [],
      caution: "Benefit amounts, eligibility dates and claim forms are not published here. Use the current official notification."
    },
    {
      id: "jssk",
      name: "Janani Shishu Suraksha Karyakram",
      short: "JSSK",
      purpose: "Pregnant women and newborn / infant care in government health facilities",
      target: "Pregnant women and infants",
      service: "Cashless delivery services, free diagnostic services and infant treatment services (as stated on the district website)",
      department: "Medical & Health",
      overview: "This programme provides support for pregnant women and newborn/infant care in government health facilities. The district website states that the programme provides cashless delivery services and free diagnostic services, along with infant treatment services.",
      focus: ["Pregnant women", "Institutional delivery", "Newborn care", "Diagnostics", "Infant treatment"],
      caution: HEALTH_VERIFY
    },
    {
      id: "pmsma",
      name: "Pradhan Mantri Surakshit Matritva Abhiyan",
      short: "PMSMA",
      purpose: "Antenatal examination for pregnant women",
      target: "Antenatal women",
      service: "Examination by medical officers and specialists on the 9th of every month",
      department: "Medical & Health",
      overview: "PMSMA provides antenatal examination for pregnant women. The district health page states that antenatal women are examined by medical officers and specialists on the 9th of every month under this programme.",
      focus: ["Antenatal care", "Maternal health", "Risk identification", "Specialist examination", "Safe pregnancy"],
      caution: HEALTH_VERIFY
    },
    {
      id: "thalli-bidda",
      name: "Thalli Bidda Express",
      short: "Transport after delivery",
      purpose: "Safe return home after delivery in a public health facility",
      target: "Women who deliver in public health facilities",
      service: "Transportation to return home safely",
      department: "Medical & Health",
      overview: "The Thalli Bidda Express service supports women who deliver in public health facilities by providing transportation to return home safely.",
      pathway: ["Pregnancy", "Government Hospital", "Institutional Delivery", "Mother & Baby Care", "Safe Transportation Home"],
      focus: [],
      caution: HEALTH_VERIFY
    },
    {
      id: "e-eye",
      name: "Mukhyamantri e-EYE Centre",
      short: "Chief Minister e-EYE Centre",
      purpose: "Eye check-ups, eye surgery and spectacles",
      target: "Eligible patients at listed hospitals",
      service: "Eye examination, eye surgery, spectacles",
      department: "Medical & Health",
      overview: "The district health page states that the Mukhyamantri e-EYE Centre programme provides eye check-ups, eye surgery and spectacles at District Hospital Paderu and Area Hospital Araku.",
      locations: ["District Hospital, Paderu", "Area Hospital, Araku"],
      focus: ["Eye examination", "Eye surgery", "Spectacles"],
      caution: HEALTH_VERIFY
    },
    {
      id: "sadarem",
      name: "SADAREM Disability Certificates",
      short: "SADAREM",
      purpose: "Disability assessment and certification for eligible persons according to applicable government procedures",
      target: "Eligible persons seeking disability certification",
      service: "Computer-aided assessment and certificates issued to beneficiaries",
      department: "Medical & Health",
      overview: "The district health page states that SADAREM disability assessment and certification services are provided through computer-aided software, with certificates issued to beneficiaries at District Hospital, Paderu and Area Hospital, Araku.",
      locations: ["District Hospital, Paderu", "Area Hospital, Araku"],
      focus: [],
      caution: HEALTH_VERIFY
    },
    {
      id: "e-aushadi",
      name: "E-Aushadi",
      short: "Drug supply system",
      purpose: "Management and supply of medicines to health facilities",
      target: "Health facilities and patients",
      service: "Medicine requirement → drug supply system → health facility → medicine availability → patient",
      department: "Medical & Health",
      overview: "E-Aushadi is used for management and supply of medicines to health facilities. The district health page identifies E-Aushadi as part of the district's drug-supply system.",
      pathway: ["Medicine Requirement", "Drug Supply System", "Health Facility", "Medicine Availability", "Patient"],
      focus: [],
      caution: HEALTH_VERIFY
    },
    {
      id: "deaddiction",
      name: "Drug De-Addiction Centre",
      short: "District Hospital, Paderu",
      purpose: "Addiction-related healthcare",
      target: "Persons requiring de-addiction treatment",
      service: "Medical support, counselling/support and treatment services; around-the-clock service as stated on the district health page",
      department: "Medical & Health",
      overview: "A Drug De-Addiction Centre has been sanctioned at District Hospital, Paderu and the district health page states that services are provided around the clock.",
      locations: ["District Hospital, Paderu"],
      focus: ["Addiction-related healthcare", "Medical support", "Counselling/support", "Treatment services"],
      caution: HEALTH_VERIFY
    },
    {
      id: "dialysis",
      name: "Dialysis Services",
      short: "District Hospital, Paderu",
      purpose: "Dialysis-related treatment at District Hospital, Paderu",
      target: "Patients requiring dialysis",
      service: "Dialysis treatment is available at District Hospital, Paderu. Scheme benefits should be displayed according to current government eligibility and orders.",
      department: "Medical & Health",
      overview: "The District Hospital, Paderu provides dialysis-related services. The district health page also records YSR Bharosa pension scheme information for eligible dialysis patients receiving treatment at dialysis centres at District Hospital Paderu. Amounts and current eligibility are not published here.",
      locations: ["District Hospital, Paderu"],
      focus: [],
      caution: "Scheme benefits for dialysis patients must be confirmed from current government eligibility and orders. This page does not publish pension amounts."
    },
    {
      id: "sanitation",
      name: "Hospital Sanitation",
      short: "Hospital Sanitation Policy",
      purpose: "Clean hospital environment and infection-control support",
      target: "Hospital patients and staff",
      service: "Hospital sanitation measures identified on the district health page",
      department: "Medical & Health",
      overview: "The district health department also implements hospital sanitation measures. The district health page identifies the Hospital Sanitation Policy as part of the health-system initiatives.",
      focus: ["Clean hospital environment", "Hygiene", "Sanitation", "Infection-control support", "Better patient environment"],
      caution: HEALTH_VERIFY
    }
  ],
  mch: {
    overview: "The district's published health programmes include JSY, JSSK, PMSMA and newborn-care facilities.",
    maternal: ["Antenatal care", "Institutional delivery", "Specialist examination", "Maternal monitoring", "Post-delivery care"],
    child: ["Newborn care", "Infant treatment", "Diagnostic services", "Special newborn care", "Referral services"],
    photos: [
      {
        slot: "Maternity & Child Health Care Block",
        src: "images/ggh-paderu-mch-block.png",
        caption: "Maternity & Child Health Care Block at Government General Hospital, Paderu, ASR District.",
        source: "Photograph supplied for Maternal & Child Health / GGH Paderu."
      },
      {
        slot: "Antenatal / maternal checkup",
        src: "images/maternal-bp-check.jpg",
        caption: "Blood-pressure checkup with maternal health records. Facility name, date and staff names are not printed on the photograph, so it is not attached to a named CHC.",
        source: "Photograph supplied for Maternal & Child Health."
      },
      {
        slot: "Mother and newborn",
        src: "images/mother-newborn-ward.jpg",
        caption: "Mother with a newborn in a postnatal ward. Hospital name is not printed on the photograph.",
        source: "Photograph supplied for Maternal & Child Health."
      }
    ],
    sections: [
      {
        id: "pregnancy",
        name: "Pregnancy Care",
        text: "Antenatal care includes PMSMA specialist examination on the 9th of every month, as stated on the district health page, along with maternal monitoring in government facilities."
      },
      {
        id: "delivery",
        name: "Institutional Delivery",
        text: "JSY is intended to encourage institutional deliveries. JSSK is stated to provide cashless delivery services and free diagnostic services in government health facilities. Benefit amounts are not listed here."
      },
      {
        id: "newborn",
        name: "Newborn Care",
        text: "Special Newborn Care Units are listed at District Hospital, Paderu and CHC Chintapalli, to provide specialized care to newborn babies requiring additional medical attention. Newborn Stabilization Units (NBSU) provide initial stabilization and care before further management or referral. The district health page lists NBSU-related services within the district health system; named NBSU locations beyond that statement are not published here."
      },
      {
        id: "infant",
        name: "Infant Care",
        text: "JSSK includes infant treatment services as stated on the district website, with diagnostic and referral support through the government health facilities listed on this explorer."
      }
    ]
  },
  blood: {
    overview: "These facilities support blood availability for patients requiring transfusion services.",
    bank: { name: "Blood Bank", location: "District Hospital, Paderu", status: "Available" },
    storage: [
      { name: "Blood Storage Centre", location: "Area Hospital, Araku Valley", status: "Available" },
      { name: "Blood Storage Centre", location: "CHC Chintapalli", status: "Available" }
    ]
  },
  digital: {
    overview: "Digital systems listed on the district health page.",
    items: [
      {
        id: "e-aushadi",
        name: "E-Aushadi",
        text: "Used for management and supply of medicines to health facilities."
      },
      {
        id: "biometric",
        name: "Biometric Attendance",
        text: "The district health page reports implementation of Iris and Aadhaar-enabled biometric attendance in the Health Department, for staff attendance monitoring, accountability, digital attendance management and administrative monitoring."
      }
    ]
  },
  facilitiesTable: [
    { facility: "District Hospital", location: "Paderu", capacity: "200 beds" },
    { facility: "Area Hospital", location: "Araku Valley", capacity: "150 beds" },
    { facility: "CHC", location: "Chintapalli", capacity: "50 beds" },
    { facility: "CHC", location: "Munchingiput", capacity: "30 beds" },
    { facility: "Blood Bank", location: "DH Paderu", capacity: "Available" },
    { facility: "Blood Storage", location: "AH Araku", capacity: "Available" },
    { facility: "Blood Storage", location: "CHC Chintapalli", capacity: "Available" },
    { facility: "Special Newborn Care", location: "DH Paderu", capacity: "Available" },
    { facility: "Special Newborn Care", location: "CHC Chintapalli", capacity: "Available" }
  ],
  tribal: {
    overview: "The agency area includes remote and tribal communities. Healthcare information on this site is organised around the published district facilities and programmes. This page does not state that a particular remote village receives a specific service unless the official health record confirms it.",
    priorities: [
      "Accessible government hospitals",
      "Maternal healthcare",
      "Child healthcare",
      "Newborn care",
      "Emergency services",
      "Blood availability",
      "Diagnostic services",
      "Eye care",
      "Disability certification",
      "Medicine availability",
      "Referral services",
      "Public health awareness"
    ]
  },
  students: {
    overview: "Students should understand the basic healthcare pathway. For emergencies or serious conditions, patients should follow the advice of qualified healthcare professionals and the appropriate government health facility.",
    pathway: ["Health Problem", "Nearest Health Facility", "Medical Examination", "Diagnosis", "Treatment", "Medicine / Procedure", "Follow-up"]
  },
  emergency: {
    overview: "Use the nearest listed government hospital for emergency and inpatient care. Staff names of on-call doctors are not published here.",
    siteHelplines: [
      { name: "National emergency number (as shown in the site footer)", number: "112" },
      { name: "Emergency ambulance (as shown in the site footer)", number: "108" },
      { name: "Health helpline (as shown in the site footer)", number: "104" }
    ],
    ggh: "Government General Hospital, Paderu (Sundruputtu Village) published contacts: 9246482356 / 9441083160 · supttgghpaderu@gmail.com",
    caution: "These numbers are those already published on this portal (footer / public utilities). Confirm the current ambulance and hospital numbers with the district administration if you need official verification."
  },
  notices: "Health notices, merit lists and tenders that appear on the district site are not copied here as files. Open the concerned Medical & Health office at Paderu for current notifications.",
  documents: "Downloadable health circulars, SOPs and scheme orders are not in the supplied source for this page.",
  photos: {
    note: "Only supplied photographs are shown. Duplicate files of the same board are not repeated. Unlabelled pictures are not assigned to CHC Chintapalli or CHC Munchingiput.",
    videos: "No embeddable health-facility video URL is in the supplied source.",
    items: [
      {
        slot: "GGH Paderu entrance",
        src: "images/ggh-paderu-entrance.png",
        caption: "Government General Hospital, Paderu, ASR District.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "MCH block, GGH Paderu",
        src: "images/ggh-paderu-mch-block.png",
        caption: "Maternity & Child Health Care Block, Government General Hospital, Paderu.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "Area Hospital, Araku Valley",
        src: "images/ah-araku-entrance.png",
        caption: "Area Hospital, Araku Valley (A.P. Vaidya Vidhana Parishad board).",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "Inpatient ward",
        src: "images/inpatient-ward-beds.png",
        caption: "Hospital ward with beds. The facility name is not printed on the photograph.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "OPD consultation",
        src: "images/opd-consultation.png",
        caption: "Outpatient consultation. Facility name and staff names are not published from this photograph.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "Maternal checkup",
        src: "images/maternal-bp-check.jpg",
        caption: "Maternal health checkup. Facility name is not printed on the photograph.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "Mother and newborn",
        src: "images/mother-newborn-ward.jpg",
        caption: "Postnatal ward. Hospital name is not printed on the photograph.",
        source: "Photograph supplied for the Health Department."
      },
      {
        slot: "Hospital campus",
        src: "images/hospital-campus-unlabelled.png",
        caption: "Hospital campus / block. The board text is not clear enough to name this as GGH Paderu, Araku or a CHC, so it is shown only in Photos.",
        source: "Photograph supplied for the Health Department."
      }
    ]
  },
  faq: [
    { q: "Which government hospitals are listed for ASR District?", a: "The official district health page currently lists District Hospital, Paderu (200 beds); Area Hospital, Araku (150 beds); CHC Chintapalli (50 beds); and CHC Munchingiput (30 beds)." },
    { q: "Where is the Blood Bank?", a: "Blood Bank at District Hospital, Paderu. Blood Storage Centres at Area Hospital, Araku Valley and CHC Chintapalli." },
    { q: "Where are Special Newborn Care Units listed?", a: "District Hospital, Paderu and CHC Chintapalli." },
    { q: "What is PMSMA in this district?", a: "Antenatal women are examined by medical officers and specialists on the 9th of every month, as stated on the district health page." },
    { q: "What is Thalli Bidda Express?", a: "Transport support for women who deliver in public health facilities to return home safely." },
    { q: "Where is dialysis available?", a: "Dialysis-related services at District Hospital, Paderu. Scheme benefits follow current government eligibility and orders and are not listed as amounts on this page." },
    { q: "Where is the Drug De-Addiction Centre?", a: "Sanctioned at District Hospital, Paderu. The district health page states that services are provided around the clock." },
    { q: "Where can SADAREM certificates be issued?", a: "District Hospital, Paderu and Area Hospital, Araku, through computer-aided software, as stated on the district health page." },
    { q: "Who is the DM&HO?", a: "The designation is District Medical & Health Officer, Medical & Health Department, ITDA Office, Paderu. Confirm the current officer name and phone on the official district Who's Who page." },
    { q: "Does this page list PHCs in every village?", a: "No. This explorer lists the hospitals and CHCs named on the supplied district health brief. It does not claim a service for a remote village unless an official health record confirms it." }
  ]
};
