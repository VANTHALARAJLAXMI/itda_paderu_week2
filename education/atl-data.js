/* National ATL (AIM, NITI Aayog). Not an ITDA-started programme.
   Do not treat national 2016 launch as a Paderu school ATL start date. */

const atlData = {
  overview: {
    name: "Atal Tinkering Lab",
    shortName: "ATL",
    initiative: "Atal Innovation Mission",
    organization: "NITI Aayog, Government of India",
    launchedYear: 2016,
    targetGrades: "Grades 6–12 (AIM description)",
    purpose: "To encourage students to develop curiosity, creativity, innovation, design thinking, computational thinking and problem-solving skills through hands-on experimentation.",
    what: "Atal Tinkering Lab (ATL) is a school-based innovation and hands-on learning space established under the Atal Innovation Mission (AIM), NITI Aayog, Government of India. ATL facilities can include electronics, robotics, sensors, open-source microcontrollers, 3D printers, computers and other do-it-yourself learning equipment.",
    teluguNote: "ATL Lab అంటే Atal Tinkering Lab. AIM, NITI Aayog ఆధ్వర్యంలోని పాఠశాల స్థాయి innovation lab. చదవడం మాత్రమే కాదు — prototype / project తయారు చేయడం ప్రధాన ఉద్దేశ్యం.",
    notItda: "ATL is a national programme of AIM, NITI Aayog. It is not an ITDA-specific programme. Do not write that ITDA Paderu started ATL. Do not assume every ITDA school has an ATL Lab.",
    national: "National Programme: Atal Innovation Mission, NITI Aayog. School-level implementation: selected schools only. Local support: relevant state/district/school authorities where applicable."
  },
  timeline: [
    { year: "2016", text: "Atal Innovation Mission established (NITI Aayog) to promote innovation and entrepreneurship in India." },
    { year: "May 2016", text: "NITI Aayog announced establishment of 500 Atal Tinkering Laboratories in schools (first public launch phase)." },
    { year: "July 2016", text: "NITI Aayog and Intel India signed a Statement of Intent supporting ATL implementation." },
    { year: "Thereafter", text: "Expansion across India; competitions, curriculum, mentoring and community activities (AIM ecosystem)." },
    { year: "Current", text: "Current ATL ecosystem as published by AIM. Verify latest official AIM pages for live figures." }
  ],
  management: ["Government of India", "NITI Aayog", "Atal Innovation Mission (AIM)", "Atal Tinkering Labs", "Selected Schools", "ATL In-Charge / Teachers", "Mentors", "Students"],
  objectives: [
    { n: "01", title: "Creativity", text: "Encourage students to think creatively and explore new ideas." },
    { n: "02", title: "Innovation", text: "Help students transform ideas into prototypes and solutions." },
    { n: "03", title: "Design Thinking", text: "Understand problems, generate ideas, design solutions and test them." },
    { n: "04", title: "Computational Thinking", text: "Develop logical and structured problem-solving skills." },
    { n: "05", title: "Hands-on Learning", text: "Learn by making, testing and improving." },
    { n: "06", title: "Technology Exposure", text: "Introduce IoT, robotics, 3D printing and AI." },
    { n: "07", title: "Local Problem Solving", text: "Develop solutions for real community problems." }
  ],
  stemAreas: ["Science", "Technology", "Engineering", "Mathematics", "Electronics", "Robotics", "IoT", "Coding", "Computational Thinking", "3D Design & Printing", "Artificial Intelligence", "App Development", "Gaming", "Drone Technology", "Innovation & Entrepreneurship"],
  facilities: {
    Electronics: ["LEDs", "Resistors", "Switches", "Breadboards", "Electronic components", "Sensors", "Motors"],
    Robotics: ["Robotics kits", "Motors", "Controllers", "Sensors", "Robot-building components"],
    Microcontrollers: ["Arduino-type boards", "Open-source microcontroller boards", "Sensor interfaces"],
    IoT: ["Sensors", "Microcontrollers", "Connectivity modules", "Data collection", "Prototype IoT devices"],
    "3D Design & Printing": ["3D design", "Digital modelling", "Prototyping", "3D printing"],
    Computing: ["Computers", "Coding tools", "Programming activities", "Digital design"]
  },
  learningAreas: [
    { id: "ideation", name: "Ideation", text: "Students identify a problem and generate possible solutions." },
    { id: "design-thinking", name: "Design Thinking", text: "Understand users/problems, generate ideas, prototype and test." },
    { id: "computational-thinking", name: "Computational Thinking", text: "Logical thinking, decomposition, patterns, algorithms." },
    { id: "physical-computing", name: "Physical Computing", text: "Electronics, sensors and microcontrollers with physical devices." },
    { id: "iot", name: "IoT", text: "Connecting sensors/devices to collect or exchange data." },
    { id: "3d", name: "3D Design & Printing", text: "Digital design and physical prototypes." },
    { id: "ai", name: "Artificial Intelligence", text: "Introduction to AI concepts and AI-based activities." },
    { id: "python", name: "Python", text: "Programming fundamentals and practical projects." },
    { id: "app", name: "App Development", text: "Designing and developing basic mobile applications." },
    { id: "gaming", name: "Gaming", text: "Programming and design through game development." },
    { id: "drone", name: "Drone Technology", text: "Introduction to drone-related concepts and activities." },
    { id: "space", name: "Space Technology", text: "Space-related learning and innovation activities." }
  ],
  curriculum: [
    { id: "l1", name: "Level 1 – Foundation", sessions: "Five modules / 14 sessions (AIM guidebook framework)", topics: ["Basic electronics", "Mechanics", "3D design", "Data visualization", "Design thinking"] },
    { id: "l2", name: "Level 2 – Intermediate", sessions: "Four modules / 13 sessions (AIM guidebook framework)", topics: ["Electronics", "Mechanics", "3D printing", "Design", "Entrepreneurship"] },
    { id: "l3", name: "Level 3 – Advanced", sessions: "Five modules / 17 sessions (AIM guidebook framework)", topics: ["IoT", "Advanced 3D printing", "Woodworking", "Prototyping", "Real-world solutions"] }
  ],
  programmes: [
    { id: "ideation-workshop", name: "Ideation Workshop", category: "Workshops", summary: "Problem identification and idea generation (AIM ATL learning area)." },
    { id: "robotics-workshop", name: "Robotics Workshop", category: "Workshops", summary: "Hands-on robotics in the AIM ATL equipment/learning ecosystem." },
    { id: "iot-activity", name: "IoT Activity", category: "Workshops", summary: "Sensors and IoT activities described in AIM ATL resources." },
    { id: "electronics-activity", name: "Electronics Activity", category: "Workshops", summary: "Basic electronics and physical computing (AIM ATL resources)." },
    { id: "3d-activity", name: "3D Design & Printing Activity", category: "Workshops", summary: "Digital modelling and 3D printing as described by AIM." },
    { id: "coding-python", name: "Coding / Python Activity", category: "Workshops", summary: "Programming fundamentals and practical projects (AIM modules)." },
    { id: "ai-activity", name: "AI Activity", category: "Workshops", summary: "Introduction to AI concepts (AIM ATL resource ecosystem)." },
    { id: "school-innovation-marathon", name: "School Innovation Marathon", category: "Competitions", summary: "Student teams work on solutions to real-world problems (AIM ecosystem format)." },
    { id: "atl-marathon", name: "ATL Marathon", category: "Competitions", summary: "Innovation/project challenge associated with ATL students." },
    { id: "mega-tinkering-day", name: "Mega Tinkering Day", category: "Events", summary: "Large-scale tinkering activities involving students." },
    { id: "community-day", name: "ATL Community Day", category: "Events", summary: "Connects ATL learning with the wider community." },
    { id: "tinkerpreneur", name: "ATL Tinkerpreneur", category: "Entrepreneurship", summary: "Innovation, entrepreneurship and business thinking." },
    { id: "school-of-month", name: "ATL School of the Month", category: "Recognition", summary: "Recognition of selected ATL schools. AIM maintains monthly listings." },
    { id: "mentors-of-change", name: "Mentors of Change", category: "Mentoring", summary: "Mentoring ecosystem supporting students and ATL innovation." },
    { id: "tinkering-festival", name: "ATL Tinkering Festival", category: "Events", summary: "Innovation/tinkering-focused activities and engagement." }
  ],
  calendarYears: ["2026–27", "2025–26", "2024–25", "2023–24"],
  months: ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"],
  galleryCats: ["ATL Laboratory", "Robotics", "Electronics", "IoT", "3D Printing", "Coding", "AI Activities", "Student Projects", "Workshops", "Competitions", "Exhibitions", "Mentoring", "Community Activities"],
  videoCats: [
    { id: "what", title: "What is ATL?", desc: "AIM resources include videos explaining what tinkering is and why ATLs are needed." },
    { id: "intro", title: "ATL Lab Introduction", desc: "AIM resources include ATL lab design and management videos." },
    { id: "robotics", title: "Robotics Demonstration", desc: "National AIM resource topic. No Paderu school video in the supplied source." },
    { id: "iot", title: "IoT Projects", desc: "National AIM resource topic. No Paderu school video in the supplied source." },
    { id: "3d", title: "3D Printing", desc: "National AIM resource topic. No Paderu school video in the supplied source." },
    { id: "ai", title: "AI Activities", desc: "National AIM resource topic. No Paderu school video in the supplied source." },
    { id: "projects", title: "Student Projects", desc: "No verified ITDA Paderu project video in the supplied source." },
    { id: "workshops", title: "Workshops", desc: "National AIM resource topic." },
    { id: "competitions", title: "Competitions", desc: "National AIM resource topic." },
    { id: "stories", title: "Innovation Stories", desc: "National AIM resource topic. Curriculum integration videos are maintained by AIM." }
  ],
  exampleProject: {
    name: "Smart Water Monitoring System",
    problem: "Water wastage in school",
    solution: "Sensor-based monitoring system",
    technology: "IoT + Sensors + Microcontroller",
    disclaimer: "Illustrative AIM-style example only. Not a verified ITDA Paderu student project. Do not display as a local achievement until official school records exist."
  },
  statistics: [
    { value: "10,000", label: "ATLs" },
    { value: "35", label: "States/UTs" },
    { value: "722", label: "Districts covered" },
    { value: "6,200+", label: "Mentors of Change" },
    { value: "1.1 crore+", label: "Students actively engaged" },
    { value: "16 lakh+", label: "Innovation projects" },
    { value: "More than 60%", label: "ATLs in Government / Government-aided schools" }
  ],
  statisticsSource: "Atal Innovation Mission ATL page figures as supplied for this website. Figures change over time.",
  statisticsVerified: "Last verified: not specified in this website dataset. Verify on official AIM pages before publication.",
  resources: ["Establishment Guidelines", "Operational Guidelines", "Equipment Guidelines", "Procurement Guidelines", "Grant Utilization Guidelines", "ATL Handbook", "ATL Curriculum", "Teacher Resources"],
  sources: [
    "AIM — ATL Overview (official AIM / NITI Aayog pages; portal label: aim.gov.in — deep URLs not invented)",
    "AIM — ATL Guidelines & Resources",
    "AIM — ATL Curriculum Resources",
    "AIM — ATL Annual Calendar",
    "AIM — ATL School of the Month"
  ],
  faq: [
    { q: "What is an ATL Lab?", a: "A school-based innovation lab under Atal Innovation Mission, NITI Aayog, for hands-on STEM, robotics, IoT, coding and tinkering, especially Grades 6–12." },
    { q: "Did ITDA Paderu start ATL?", a: "No. ATL is a national AIM / NITI Aayog programme (2016). ITDA did not start ATL." },
    { q: "When did ATL start nationally?", a: "AIM was set up in 2016. NITI Aayog announced 500 ATLs in May 2016. A school’s own ATL start date is a separate fact and is not published here for ITDA Paderu schools." },
    { q: "Does every ITDA school have an ATL?", a: "No. Show ATL facilities only when official school-specific records confirm it." },
    { q: "Are gallery photos from Paderu?", a: "No Paderu ATL photographs or videos are in the supplied source. Unrelated district images are not labelled as Paderu." }
  ]
};

function atlProgRecord(prog, schoolCtx) {
  const schoolName = schoolCtx && schoolCtx.name ? schoolCtx.name : "Not a verified ITDA Paderu school event in the supplied source.";
  const mandal = schoolCtx && schoolCtx.mandal ? schoolCtx.mandal : NA;
  return {
    name: prog.name,
    category: prog.category,
    overview: prog.summary + " This is a national AIM activity type, not a verified dated event at a named ITDA Paderu school unless school records are added later.",
    purpose: "Hands-on innovation learning under the ATL / AIM ecosystem, as described by AIM.",
    whyConducted: NA,
    conductedBy: "Atal Innovation Mission (national). Not ITDA Paderu as originator.",
    implementedBy: "Selected schools under AIM ATL, where an ATL exists.",
    implementingDepartment: "NITI Aayog / Atal Innovation Mission (national).",
    implementingInstitution: schoolName,
    organizingTeam: NA,
    responsibleOfficer: NA,
    targetStudents: "School students, particularly Grades 6–12 as described by AIM.",
    academicYear: NA,
    date: NA,
    startDate: "Not available in the published source",
    endDate: NA,
    duration: NA,
    location: NA,
    activities: NA,
    participants: NA,
    facilities: NA,
    outcome: NA,
    photos: "No Paderu ATL photographs in the supplied source.",
    videos: "No Paderu ATL videos in the supplied source. AIM maintains a national ATL video/resource section.",
    documents: NA,
    source: "Atal Innovation Mission / NITI Aayog ATL programme description as supplied for this website.",
    verificationStatus: "National activity type. Pending verification for any ITDA Paderu school occurrence.",
    lastUpdated: NA,
    school: schoolName,
    mandal: mandal,
    status: "National programme activity — school occurrence not verified"
  };
}
