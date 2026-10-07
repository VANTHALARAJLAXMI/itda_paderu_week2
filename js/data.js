/* ==========================================================================
   ITDA PADERU - DATA & KNOWLEDGE BASE (js/data.js)
   Bilingual translations (English & Telugu) + Knowledge Base for RAG Chatbot
   ========================================================================== */

// Navigation items dictionary with routes relative to project root
const NAV_ITEMS = [
  { id: "home", path: "index.html", en: "Home", te: "హోమ్" },
  { id: "about", path: "templates/about.html", en: "About", te: "గురించి" },
  { id: "schemes", path: "templates/schemes.html", en: "Schemes", te: "పథకాలు" },
  { id: "services", path: "templates/services.html", en: "Services", te: "సేవలు" },
  { id: "grievance", path: "templates/grievance.html", en: "Grievance", te: "ఫిర్యాదులు" },
  { id: "contact", path: "templates/contact.html", en: "Contact", te: "సంప్రదించండి" }
];

const DEPARTMENT_PAGES = [
  { id: "education", path: "templates/education.html", en: "Education", te: "విద్య" },
  { id: "health", path: "health/index.html", en: "Health", te: "ఆరోగ్యం" },
  { id: "tribal-welfare", path: "tribal-welfare/index.html", en: "Tribal Welfare", te: "గిరిజన సంక్షేమం" },
  { id: "agriculture", path: "templates/agriculture.html", en: "Agriculture", te: "వ్యవసాయం" },
  { id: "horticulture", path: "templates/horticulture.html", en: "Horticulture", te: "ఉద్యానవనం" }
];

// All pages dictionary for Search and System Knowledge
const ALL_PAGES = [
  ...NAV_ITEMS,
  { id: "departments", path: "templates/departments.html", en: "Departments", te: "విభాగాలు" },
  ...DEPARTMENT_PAGES,
  { id: "administration", path: "templates/administration.html", en: "Administrative Setup", te: "పరిపాలనా వ్యవస్థ" },
  { id: "women-child-welfare", path: "templates/women-child-welfare.html", en: "Women & Child Welfare", te: "మహిళా మరియు శిశు సంక్షేమం" },
  { id: "rural-development", path: "templates/rural-development.html", en: "Rural Development", te: "గ్రామీణాభివృద్ధి" },
  { id: "infrastructure", path: "templates/infrastructure.html", en: "Infrastructure", te: "మౌలిక సదుపాయాలు" },
  { id: "land-records", path: "templates/land-records.html", en: "Land Records", te: "భూ రికార్డులు" },
  { id: "forest-environment", path: "templates/forest-environment.html", en: "Forest & Environment", te: "అడవి మరియు పర్యావరణం" },
  { id: "skill-development", path: "templates/skill-development.html", en: "Skill Development", te: "నైపుణ్యాభివృద్ధి" },
  { id: "scholarships", path: "templates/scholarships.html", en: "Scholarships", te: "స్కాలర్‌షిప్‌లు" },
  { id: "officers", path: "templates/officers.html", en: "Officers Directory", te: "అధికారుల జాబితా" },
  { id: "history", path: "templates/history.html", en: "History", te: "చరిత్ర" },
  { id: "whos-who", path: "templates/whos-who.html", en: "Who's Who", te: "అధికారులు" },
  { id: "district-map", path: "templates/district-map.html", en: "District Map", te: "జిల్లా మ్యాప్" },
  { id: "collectorate", path: "templates/collectorate.html", en: "Collectorate", te: "కలెక్టరేట్" },
  { id: "revenue-division", path: "templates/revenue-division.html", en: "Revenue Division", te: "రెవెన్యూ డివిజన్" },
  { id: "mandals", path: "templates/mandals.html", en: "Mandals", te: "మండలాలు" },
  { id: "villages-panchayats", path: "templates/villages-panchayats.html", en: "Village & Panchayats", te: "గ్రామాలు మరియు పంచాయతీలు" },
  { id: "disaster-management", path: "templates/disaster-management.html", en: "Disaster Management", te: "విపత్తు నిర్వహణ" },
  { id: "collectors-history", path: "templates/collectors-history.html", en: "History of Collectors", te: "కలెక్టర్ల చరిత్ర" },
  { id: "helpline", path: "templates/helpline.html", en: "Helpline", te: "హెల్ప్‌లైన్" },
  { id: "public-utilities", path: "templates/public-utilities.html", en: "Public Utilities", te: "ప్రజా సౌకర్యాలు" },
  { id: "faq", path: "templates/faq.html", en: "FAQ", te: "ప్రశ్నోత్తరాలు" },
  { id: "gallery", path: "templates/gallery.html", en: "Photo Gallery", te: "ఫోటో గ్యాలరీ" }
];

// UI Text Dictionary for Language Switching
const UI_STRINGS = {
  en: {
    siteTitle: "ITDA Paderu",
    siteSubtitle: "Integrated Tribal Development Agency, Paderu",
    govLabel: "Government of Andhra Pradesh · Alluri Sitharama Raju (ASR) District",
    searchPlaceholder: "Search ITDA website...",
    searchBtn: "Search",
    chatLauncherTitle: "ITDA Assistant",
    chatHeaderTitle: "ITDA Paderu AI Assistant",
    chatHeaderSub: "Direct Ollama AI + Grounded Knowledge Base",
    chatWelcomeMsg: "Hello! I am the ITDA Paderu Information Assistant. How can I help you today?",
    chatPlaceholder: "Ask about education, schemes, health...",
    send: "Send",
    clear: "Clear",
    suggestedTitle: "Suggested Questions:",
    officialDisclaimerNote: "Note: For official government verification, please consult the concerned department office at Paderu.",
    copyrightText: "© ITDA Paderu Information Portal · Reference Static Web Application"
  },
  te: {
    siteTitle: "ITDA పాడేరు",
    siteSubtitle: "సమీకృత గిరిజన అభివృద్ధి సంస్థ, పాడేరు",
    govLabel: "ఆంధ్రప్రదేశ్ ప్రభుత్వం · అల్లూరి సీతారామరాజు (ASR) జిల్లా",
    searchPlaceholder: "ITDA వెబ్‌సైట్‌లో వెతకండి...",
    searchBtn: "వెతుకు",
    chatLauncherTitle: "ITDA సహాయకుడు",
    chatHeaderTitle: "ITDA పాడేరు AI సహాయకుడు",
    chatHeaderSub: "ధృవీకరించిన నాలెడ్జ్ బేస్ ఆధారంగా",
    chatWelcomeMsg: "నమస్కారం! నేను ITDA పాడేరు సమాచార సహాయకుడిని. విద్య, ఆరోగ్య, సంక్షేమ వివరాలపై అడగండి.",
    chatPlaceholder: "విద్య, పథకాలు, ఆరోగ్యం గురించి అడగండి...",
    send: "పంపు",
    clear: "తుడిచివేయి",
    suggestedTitle: "సూచించిన ప్రశ్నలు:",
    officialDisclaimerNote: "గమనిక: ప్రభుత్వం సంబంధిత అధికారిక వివరాలకు పాడేరులోని సంబంధిత విభాగాన్ని సంప్రదించండి.",
    copyrightText: "© ITDA పాడేరు సమాచార పోర్టల్ · రిఫరెన్స్ స్టాటిక్ వెబ్ అప్లికేషన్"
  }
};

// Structured Knowledge Base Object for Website Search & AI Chatbot Prompt Grounding
const itdaKnowledge = {
  about: {
    title: "About ITDA Paderu",
    en: "ITDA stands for Integrated Tribal Development Agency. Located at Paderu in Alluri Sitharama Raju (ASR) District, Andhra Pradesh. ITDA coordinates tribal welfare, education, health, agriculture, horticulture, coffee plantation, infrastructure, and socio-economic empowerment across the Scheduled Area mandals of Paderu Agency region.",
    te: "ITDA అంటే సమీకృత గిరిజన అభివృద్ధి సంస్థ. ఇది ఆంధ్రప్రదేశ్‌లోని అల్లూరి సీతారామరాజు (ASR) జిల్లాలోని పాడేరులో ఉంది. పాడేరు ఏజెన్సీ ప్రాంతంలోని గిరిజన సంక్షేమం, విద్య, ఆరోగ్యం, వ్యవసాయం, కాఫీ తోటలు మరియు మౌలిక సదుపాయాల అభివృద్ధిని ఈ సంస్థ సమన్వయం చేస్తుంది."
  },
  administration: {
    title: "Administration",
    en: "ITDA Paderu operates under a multi-sector administrative structure headed by the Project Officer (PO), supported by Sub-Collector / RDO, Deputy Directors for Tribal Welfare, Coffee Extension, Forest Officers, and Tribal Welfare Engineering Wing.",
    te: "ITDA పాడేరు ప్రాజెక్ట్ అధికారి (PO) నేతృత్వంలో అడ్మినిస్ట్రేషన్, గిరిజన సంక్షేమం, కాఫీ బోర్డు, అటవీ శాఖ మరియు ఇంజనీరింగ్ విభాగాల సమన్వయంతో పనిచేస్తుంది."
  },
  education: {
    title: "Education facilities",
    en: "ITDA Paderu supports education across 11 Scheduled Area mandals. Documented planning figures include 107 Ashram Schools (residential, typically Classes 3–10), 11 EMRS, 118 residential schools in that dataset, 667 Government Primary Schools under Tribal Welfare supervision (network figure, not all schools in ASR District), 77 School Complex Headmasters, hostels and scholarship support. Super 50 is a separate coaching programme. Verify latest official records.",
    te: "ITDA పాడేరు 11 మండలాల్లో విద్యను సమర్థిస్తుంది. ఆశ్రమ పాఠశాలలు 107, EMRS 11, రెసిడెన్షియల్ పాఠశాలలు 118, Tribal Welfare పర్యవేక్షణలో 667 ప్రభుత్వ ప్రాథమిక పాఠశాలలు (ASR జిల్లా మొత్తం పాఠశాలలు కాదు). Super 50 వేరు కోచింగ్ కార్యక్రమం. తాజా అధికారిక రికార్డులను ధృవీకరించండి."
  },
  super50: {
    title: "Super 50",
    en: "Super 50 is a Tribal Welfare special coaching programme for high-performing tribal SSC (Class 10) students. Reported figures: 2023–24 First Division 51 (21 boys, 30 girls), highest SSC 585/600; 2024–25 selected students all First Division 51, highest 577/600; 2025–26 merit selected 104 (51 boys, 53 girls) after screening on 1 September 2025, with 2 coaching centres at Paderu and Chintapalli from 7 October 2025. Verify latest official records.",
    te: "సూపర్ 50 అనేది ఉన్నత పనితీరు గల గిరిజన SSC విద్యార్థులకు Tribal Welfare ప్రత్యేక కోచింగ్. 2025–26లో 104 మంది మెరిట్ ఎంపిక (51 బాలురు, 53 బాలికలు); కోచింగ్ కేంద్రాలు పాడేరు, చింతపల్లి (7 అక్టోబర్ 2025 నుంచి). తాజా అధికారిక రికార్డులను ధృవీకరించండి."
  },
  health: {
    title: "Health Department",
    en: "The Medical & Health Department serves ASR District, including tribal and agency areas. Official district health listings: District Hospital Paderu (200 beds, GGH Sundruputtu), Area Hospital Araku (150 beds), CHC Chintapalli (50 beds), CHC Munchingiput (30 beds). Blood Bank at DH Paderu; blood storage at AH Araku Valley and CHC Chintapalli. SNCU at DH Paderu and CHC Chintapalli. Programmes named on the district health page include JSY, JSSK, PMSMA (9th of every month), Thalli Bidda Express, Mukhyamantri e-EYE Centre (DH Paderu and AH Araku), SADAREM (DH Paderu and AH Araku), E-Aushadi, dialysis at DH Paderu, and a 24-hour Drug De-Addiction Centre at DH Paderu. DM&HO and DCHS sit at ITDA Office, Paderu — confirm current officer names on Who's Who. This site is not the official government health website.",
    te: "వైద్య మరియు ఆరోగ్య శాఖ ASR జిల్లా, గిరిజన/ఏజెన్సీ ప్రాంతాలకు సేవలు అందిస్తుంది. జిల్లా ఆసుపత్రి పాడేరు 200 పడకలు, ఏరియా ఆసుపత్రి అరకు 150, CHC చింతపల్లి 50, CHC ముంచింగిపుట్ 30. బ్లడ్ బ్యాంక్ DH పాడేరు. JSY, JSSK, PMSMA, తల్లి బిడ్డ ఎక్స్‌ప్రెస్, e-EYE, SADAREM. అధికారి పేర్లు Who's Whoలో ధృవీకరించండి."
  },
  agriculture: {
    title: "Agriculture & Coffee",
    en: "Paderu Agency is nationally associated with organic shade-grown Arabica coffee, especially around Minimuluru, with plantations also named for Ananthagiri, Araku Valley and Chintapalli. Nodal office listed: Deputy Director (Extension), Coffee Board, Paderu. Shade trees include silver oak; pepper is inter-cropped. Market linkage named: AP Girijan Cooperative Corporation (GCC) and tribal coffee marketing collectives. The Coffee Experience Centre is named as an ITDA Paderu project; a visitor-centre street address is not in the supplied source.",
    te: "పాడేరు ఏజెన్సీ మినిములూరు పరిసరాల్లో గిరిజన కాఫీ సాగుకు ప్రసిద్ధి. రైతులకు విత్తనాలు, ఉద్యానవన పంటల ప్రోత్సాహం మరియు కాఫీ బోర్డు కార్యాలయం ద్వారా సహాయం అందుతుంది."
  },
  schemes: {
    title: "Government Schemes",
    en: "Includes Tribal Welfare Schemes, educational scholarship support, post-matric hostel admissions, central & state government welfare benefits. Specific eligibility details should be verified at the official ITDA Paderu office.",
    te: "గిరిజన సంక్షేమ పథకాలు, విద్యా స్కాలర్‌షిప్‌లు, హాస్టల్ ప్రవేశాలు మరియు కేంద్ర/రాష్ట్ర ప్రభుత్వ పథకాలు అందుబాటులో ఉన్నాయి."
  },
  pvtg: {
    title: "PVTG Communities",
    en: "Particularly Vulnerable Tribal Groups (PVTGs) in the Paderu Agency, as named on this portal, are Khonds (Kondhs) 98,907, Gadaba 26,457 and Poorja (Porja) 56,218 (total 1,81,582 — verify latest official records).",
    te: "పాడేరు ఏజెన్సీలో ఈ పోర్టల్ పేర్కొన్న PVTG సమాజాలు: ఖొండ్ (98,907), గదబ (26,457), పూర్జ (56,218) — మొత్తం 1,81,582 (అధికారిక తాజా గణాంకాలు నిర్ధారించండి). పేరున్న పండుగలు/నృత్యాలు ప్రతి గిరిజన సమాజానికీ ఆపాదించబడవు.",
  },
  publicUtilities: {
    title: "Public Utilities",
    en: "Alluri Sitharama Raju District public utilities directory lists 29 bank branches (including APGVB, SBI, Union Bank of India, HDFC and others), 5 Government Degree Colleges, APEPDCL Circle Office at Kotha Paderu Village (9490610027, se-opn-asr@apeasternpower.com), Government General Hospital Paderu at Sundruputtu (9246482356 / 9441083160), Paderu Sub Post Office (75693172, paderooso@indiapost.gov.in), 60 NGOs, and ASR District Police at Sunduputtu, Paderu (08935-250273, sp_asr@appolice.gov.in).",
    te: "అల్లూరి సీతారామరాజు జిల్లా పబ్లిక్ యుటిలిటీస్ డైరెక్టరీలో బ్యాంకులు, డిగ్రీ కళాశాలలు, APEPDCL సర్కిల్ ఆఫీస్, ప్రభుత్వ జనరల్ హాస్పిటల్ పాడేరు, పాడేరు సబ్ పోస్ట్ ఆఫీస్, 60 NGOs మరియు ASR జిల్లా పోలీసు కార్యాలయం ఉన్నాయి."
  },
  departments: {
    title: "Departments",
    en: "Departments coordinated with ITDA Paderu on this portal include Education, Health / Medical & Health, Tribal Welfare & PVTG, Agriculture, Horticulture / coffee, Skill Development, Forest & Environment, Infrastructure, Women & Child Welfare, Rural Development, and public services such as scholarships and grievance. Open the Departments page for each explorer.",
    te: "ఈ పోర్టల్‌లో ITDA పాడేరుతో సమన్వయం చేసే విభాగాలు: విద్య, ఆరోగ్యం, గిరిజన సంక్షేమం & PVTG, వ్యవసాయం, ఉద్యానవనం/కాఫీ, నైపుణ్యాభివృద్ధి, అటవీ శాఖ, మౌలిక సదుపాయాలు, మహిళా శిశు సంక్షేమం, స్కాలర్‌షిప్‌లు."
  },
  mandals: {
    title: "Mandals covered by ITDA Paderu",
    en: "ITDA Paderu covers 11 Scheduled Area mandals already listed on this portal: Ananthagiri, Araku Valley, Dumbriguda, Hukumpeta, Pedabayalu, Munchingiputtu, Paderu, G. Madugula, Chinthapalli, G.K. Veedhi, Koyyuru. This is not every mandal of ASR District.",
    te: "ITDA పాడేరు 11 షెడ్యూల్డ్ ఏరియా మండలాలు: అనంతగిరి, అరకు వ్యాలీ, డుంబ్రిగూడ, హుకుంపేట, పెదబయలు, ముంచింగిపుట్టు, పాడేరు, జి.మాడుగుల, చింతపల్లి, జి.కె.వీధి, కోయ్యూరు."
  },
  officers: {
    title: "Project Officer and officers",
    en: "Sri Aditya Verma, IAS, is listed as Project Officer, ITDA Paderu (2026 All India Services listing used on this portal). DM&HO and DCHS sit at ITDA Office, Paderu — confirm current personal names and phones on Who's Who. Other officer names are not invented here.",
    te: "శ్రీ ఆదిత్య వర్మ, IAS, ప్రాజెక్ట్ అధికారి, ITDA పాడేరు (2026 జాబితా). ఇతర అధికారి పేర్లు Who's Whoలో నిర్ధారించండి."
  },
  contact: {
    title: "ITDA Paderu office location",
    en: "ITDA Office Complex, Paderu, Alluri Sitharama Raju (ASR) District, Andhra Pradesh – 531024. Office hours listed on the Contact page: 10:00 AM to 5:00 PM, Monday to Saturday (government holidays excluded). Official ITDA phone and email on the Contact page are marked as to be verified, not published as confirmed numbers. GGH Paderu published contacts appear under Public Utilities / Health: 9246482356 / 9441083160.",
    te: "ITDA కార్యాలయం పాడేరు, ASR జిల్లా, ఆంధ్రప్రదేశ్ 531024. సంప్రదింపు పేజీలో ITDA ఫోన్/ఇమెయిల్ నిర్ధారణ కావాలి అని ఉంది."
  },
  gallery: {
    title: "Photo Gallery",
    en: "The Photo Gallery shows supplied photographs of cultural programmes: students in traditional Agency attire and accompanying staff at an outdoor event. Event name, village and mandal are not printed on the pictures. Open Gallery in the menu: Photo Gallery, Cultural programmes, Traditional attire, Staff & escorts.",
    te: "ఫోటో గ్యాలరీలో సాంస్కృతిక కార్యక్రమాల ఫోటోలు ఉన్నాయి — సాంప్రదాయ వస్త్రధారణలో విద్యార్థులు. కార్యక్రమం/గ్రామం పేరు ఫోటోలపై ముద్రించబడలేదు."
  },
  dhimsa: {
    title: "Dhimsa",
    en: "This portal presents Traditional Dhimsa Folk Dance as Agency heritage on the public cultural panel. That is a heritage presentation for the Agency, not a statement that every tribal community of ASR District performs Dhimsa in the same way.",
    te: "ధిమ్సా ఈ పోర్టల్ సాంస్కృతిక ప్యానెల్‌లో ఏజెన్సీ జానపద నృత్యంగా ఉంది. ప్రతి గిరిజన సమాజానికీ ఒకే విధంగా ఆపాదించబడదు."
  },
  festivals: {
    title: "Tribal festivals",
    en: "The Tribal Welfare explorer lists festival templates such as Itika Pongal, Ganga Jatara, seed/harvest festivals and village Jatara. They are not assigned to every community until a verified village, mandal and source exist.",
    te: "ఇటిక పొంగల్, గంగా జాతర వంటి పండుగలు ధృవీకరించిన గ్రామం/మండలం లేకుండా అన్ని తెగలకు ఆపాదించబడవు."
  },
  sammaka: {
    title: "Sammakka–Saralamma",
    en: "This site does not present Sammakka–Saralamma as an ITDA Paderu or ASR District festival. It is listed only as a regional cultural-event heading unless an official Paderu record confirms a local observance.",
    te: "సమ్మక్క–సారలమ్మను ఈ సైట్ ITDA పాడేరు పండుగగా చూపదు."
  },
  skill: {
    title: "Skill development, AAROHAN, employment",
    en: "Documented skill-related activities include Super 50 (Tribal Welfare / ITDA Paderu), AAROHAN AI Fellowship 2026 (ITDA Paderu in association with Datapro Computers Pvt. Ltd.; Kakarapadu / Koyyuru Post Metric Hostel Girls venue as printed on 2026 posters; WebPulse 2026 on 26 September 2026), Job Melas and career guidance presented as District Employment Exchange activities, coffee training (Coffee Board, Paderu), Sisal & Lantana fibre Action Research (Ministry of Tribal Affairs, Paderu ITDA Agency Area), and the Coffee Experience Centre named as an ITDA Paderu project (building details, visitor programmes and a street address are not in the supplied source). This site does not call every skill topic an ITDA batch.",
    te: "సూపర్ 50, AAROHAN AI Fellowship 2026 (డేటాప్రో, కాకరపాడు/కోయ్యూరు), జాబ్ మేళాలు (District Employment Exchange), కాఫీ శిక్షణ (కాఫీ బోర్డు), Coffee Experience Centre (ITDA ప్రాజెక్ట్ — చిరునామా సోర్స్‌లో లేదు)."
  },
  tourism: {
    title: "Tourism",
    en: "The homepage cultural panel refers to Araku and Paderu eco parks / Agency eco-tourism. Forest & Environment material on this portal mentions promoting eco-tourism in Araku and Paderu valleys. A dedicated tourism facilities inventory, ticket rates and a Coffee Experience Centre street address are not published as a complete list on this site.",
    te: "హోమ్ పేజీలో అరకు & పాడేరు ఎకో పార్కులు / ఏజెన్సీ ఎకో-టూరిజం పేర్కొనబడింది. పూర్తి టూరిజం సౌకర్యాల జాబితా ఈ సైట్‌లో లేదు."
  },
  livelihood: {
    title: "Tribal livelihoods",
    en: "Livelihood pathways already described on this portal include tribal agriculture, horticulture, organic coffee (Minimuluru and related Agency plantations), forest produce, bamboo and handicrafts, SHGs, skill training, market linkages and Tribal Welfare scheme categories. Named grant amounts are not listed unless an official record is supplied.",
    te: "జీవనోపాధి: గిరిజన వ్యవసాయం, కాఫీ, అటవీ ఉత్పత్తులు, చేతిపనులు, SHGలు, నైపుణ్య శిక్షణ. గ్రాంట్ మొత్తాలు ఇక్కడ లేవు."
  },
  grievance: {
    title: "Grievances",
    en: "Citizens can register grievances regarding public services, school amenities, health facilities, or scheme guidance. Demo forms on the website provide process awareness.",
    te: "ప్రజా సేవలు, పాఠశాల వసతులు, ఆరోగ్య సదుపాయాలు లేదా సంక్షేమ పథకాలపై ప్రజలు ఫిర్యాదు చేయవచ్చు."
  }
};
