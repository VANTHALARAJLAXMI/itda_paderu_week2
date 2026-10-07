/* Tribal Welfare & PVTG explorer. Festivals and dances use a template; community/village is filled only where this portal already has a source. */

const TW_NA = "Information not available in the supplied source.";
const TW_VERIFY = "Verify latest official records.";
const TW_SOURCE = "ITDA Paderu / Paderu Agency information already published on this portal, plus the Tribal Welfare website plan (as supplied).";
const TW_LAST = "26 September 2026 (against the supplied Tribal Welfare brief and existing portal figures).";
const TW_NOT_OFFICIAL = "This is a reference information page, not the official Tribal Welfare Department website. Confirm current schemes, lists and officer names at ITDA Office, Paderu.";
const TW_CULTURE_NOTE = "Named festivals and dances are not automatically assigned to every tribal community in Paderu / ASR District. Community, village/mandal and source must be verified before treating an item as a local festival or dance of a specific group.";

function twFest(id, name, extra) {
  extra = extra || {};
  return Object.assign({
    id: id,
    name: name,
    localName: TW_NA,
    community: TW_NA,
    mandal: TW_NA,
    village: TW_NA,
    period: TW_NA,
    duration: TW_NA,
    purpose: TW_NA,
    significance: TW_NA,
    beliefs: TW_NA,
    rituals: TW_NA,
    dress: TW_NA,
    food: TW_NA,
    activities: ["Folk dance", "Folk songs", "Traditional music", "Community gatherings", "Traditional games", "Cultural performances", "Handicraft exhibitions", "Local markets"],
    participation: ["Men", "Women", "Children", "Elders", "Community leaders"],
    itdaRole: TW_NA,
    venue: TW_NA,
    year: TW_NA,
    officer: TW_NA,
    implementedBy: TW_NA,
    documents: TW_NA,
    photos: [],
    videos: TW_NA,
    source: extra.source || TW_SOURCE,
    verification: extra.verification || TW_CULTURE_NOTE
  }, extra);
}

function twDance(id, name, extra) {
  extra = extra || {};
  return Object.assign({
    id: id,
    name: name,
    community: TW_NA,
    location: TW_NA,
    occasions: TW_NA,
    formation: TW_NA,
    movements: TW_NA,
    dress: TW_NA,
    instruments: TW_NA,
    songs: TW_NA,
    photos: [],
    videos: TW_NA,
    source: extra.source || TW_SOURCE,
    verification: extra.verification || TW_CULTURE_NOTE
  }, extra);
}

const twData = {
  homeIntro: "Tribal Welfare at ITDA Paderu covers administration in the Scheduled Area, PVTG communities, welfare scheme categories, livelihoods, education, housing, healthcare coordination, culture and heritage, and development programmes. This explorer uses documented Paderu Agency facts and leaves unverified festival or dance attributions blank.",
  about: {
    intro: "The Integrated Tribal Development Agency (ITDA), Paderu, coordinates tribal welfare and development in the Paderu Agency Scheduled Area of Alluri Sitharama Raju (ASR) District.",
    objectives: [
      "Socio-economic development of Scheduled Tribe communities in the Agency area",
      "Support for Particularly Vulnerable Tribal Groups (PVTGs)",
      "Education, health, livelihood, housing and infrastructure coordination",
      "Respect for culture, language and community institutions",
      "Implementation and facilitation of central and state welfare measures as notified"
    ],
    mandals: [
      "Ananthagiri", "Araku Valley", "Dumbriguda", "Hukumpeta", "Pedabayalu",
      "Munchingiputtu", "Paderu", "G. Madugula", "Chinthapalli", "G.K. Veedhi", "Koyyuru"
    ],
    mandalsNote: "These 11 mandals are the Scheduled Area mandals already listed on this portal for ITDA Paderu. Do not treat the list as every mandal of ASR District."
  },
  administration: {
    authority: "Integrated Tribal Development Agency (ITDA), Paderu",
    office: "ITDA Office, Paderu",
    projectOfficer: "Sri Aditya Verma, IAS",
    projectOfficerDesignation: "Project Officer, ITDA, Paderu",
    projectOfficerYear: "2026",
    projectOfficerSource: "ASR District All India Services listing as already used on this portal.",
    sections: [
      "Administration",
      "Accounts",
      "Monitoring",
      "Tribal Welfare",
      "Education",
      "Medical & Health (coordination)",
      "Agriculture / Horticulture / Coffee (line departments)",
      "Tribal Welfare Engineering",
      "Forest-related livelihood coordination"
    ],
    note: "The Project Officer is the administrative head of ITDA Paderu. Personal names of other Tribal Welfare officers are not published here."
  },
  pvtg: [
    {
      id: "khonds",
      name: "Khonds (Kondhs)",
      population: "98,907",
      livelihood: "Traditional agriculture, hill-slope and forest-related livelihoods (as described on this portal).",
      note: "Population figure is the documented count already published on this portal. Year of count: verify latest official records."
    },
    {
      id: "gadaba",
      name: "Gadaba",
      population: "26,457",
      livelihood: "Agency habitations; cultural tradition noted on this portal. Village-wise lists are not published here.",
      note: "Population figure is the documented count already published on this portal. Verify latest official records."
    },
    {
      id: "poorja",
      name: "Poorja (Porja)",
      population: "56,218",
      livelihood: "Forested Agency valleys; horticulture-related livelihoods as described on this portal.",
      note: "Population figure is the documented count already published on this portal. Verify latest official records."
    }
  ],
  pvtgTotal: "1,81,582",
  pvtgIntro: "Particularly Vulnerable Tribal Groups in the Paderu Agency, as already named on this portal, are Khonds, Gadaba and Poorja (Porja). Habitation-wise maps, language lists and scheme beneficiary counts are not invented here.",
  schemeGroups: [
    { id: "education", name: "Education support", items: ["Ashram Schools", "Tribal Welfare schools", "Hostels", "Scholarships", "Competitive examination support", "Student development programmes (including Super 50 as documented)"] },
    { id: "housing", name: "Housing support", items: ["Housing support as a scheme category. Named batch lists, amounts and PM-JANMAN village lists are not published on this page unless an official record is supplied."] },
    { id: "health", name: "Health & nutrition", items: ["Coordination with the district Medical & Health system", "Maternal and child health programmes listed on the Health explorer", "Nutrition-related support as a category — amounts not listed here"] },
    { id: "livelihood", name: "Livelihood support", items: ["Tribal agriculture", "Coffee (Coffee Board / Minimuluru association already documented)", "Minor forest produce", "Handicrafts", "SHGs", "Skill training", "Market linkages"] },
    { id: "women", name: "Women & child welfare", items: ["Women and child welfare as a scheme category. Eligibility and current circulars: verify official notification."] },
    { id: "social", name: "Social security", items: ["Social security as a scheme category. Pension amounts are not published here."] }
  ],
  livelihood: {
    overview: "Livelihood pathways already described on this portal include tribal agriculture, horticulture, coffee, forest produce, handicrafts, skill development and entrepreneurship. Named grant amounts are not listed.",
    items: ["Tribal agriculture", "Tribal coffee (Minimuluru area associated in government documents on this portal)", "Bamboo and forest products", "Minor forest produce", "Tribal handicrafts", "Self-help groups", "Skill training", "Market linkages", "Tribal entrepreneurship"]
  },
  education: {
    overview: "Education under Tribal Welfare in the Paderu Agency is documented on the Education explorer: 107 Ashram Schools, 11 EMRS, 118 residential schools in the planning dataset, 667 Government Primary Schools under Tribal Welfare supervision (network figure, not all district schools), Super 50, scholarships and hostels.",
    href: "../education/index.html"
  },
  infrastructure: {
    overview: "Infrastructure is listed as a development category (roads, drinking water, electricity, housing, digital connectivity, community buildings, schools, health facilities). Village-wise inventories are not invented.",
    items: ["Roads", "Drinking water", "Electricity", "Housing", "Digital connectivity", "Community buildings", "Schools", "Health facilities"],
    photos: [
      { slot: "Habitation street", src: "images/habitation-street.png", caption: "Habitation street with tiled roofs and hills. Village and mandal names are not printed.", source: "Photograph supplied for habitation / housing." },
      { slot: "Agency habitation landscape", src: "images/agency-habitation.png", caption: "Hill habitation with tiled roofs in a forested valley. Village and mandal names are not printed on the photograph.", source: "Photograph supplied for Tribal Welfare habitation / landscape." }
    ]
  },
  festivals: [
    twFest("overview", "Festival overview", {
      overview: "Tribal festivals connect community life, agriculture, ritual and seasonal work. This section holds a common template. Individual named festivals below are not claimed as festivals of every Paderu / ASR community.",
      skipDetail: true
    }),
    twFest("itika-pongal", "Itika Pongal", {
      overview: "Itika Pongal is included as a named festival in the website plan (food, dress, dance, gatherings). A verified community, village/mandal and official source locating it in the Paderu Agency are not in the supplied dataset.",
      verification: "Do not treat Itika Pongal as a festival of every tribal community in ASR District until official cultural or ITDA records name the community and place."
    }),
    twFest("ganga-jatara", "Ganga Jatara", {
      overview: "Ganga Jatara is included as a named village / religious festival type (processions, music, dance). A verified Paderu Agency village, mandal and organising community are not in the supplied dataset.",
      verification: "Village Jatara pages should name the village, deity and source. Those fields are blank here until records are supplied."
    }),
    twFest("seed-agri", "Seed / agricultural festivals", {
      overview: "Seed preservation, sowing traditions and related community rituals are listed as an agricultural festival category. A named seed festival, village and community for Paderu Agency are not in the supplied source."
    }),
    twFest("harvest", "Harvest festivals", {
      overview: "Harvest celebrations, sharing of produce, folk song and dance are listed as a category. A named harvest festival with place and community for the Agency is not in the supplied source."
    }),
    twFest("village-jatara", "Tribal Jatara / village festivals", {
      overview: "Village Jataras typically include a local deity, period, markets and handicrafts. This page is a blank template. Festival name, village and period must come from an official or community-verified record."
    }),
    twFest("sammakka", "Sammakka–Saralamma / regional tribal cultural events", {
      overview: "Sammakka–Saralamma is widely associated in public sources with Medaram (Telangana). It is listed here only as a regional cultural-event heading. This site does not present it as an ITDA Paderu or ASR District festival.",
      verification: "Do not describe Sammakka–Saralamma as a Paderu Agency festival unless an official Paderu record confirms a local observance."
    })
  ],
  dances: [
    twDance("overview", "Tribal dance overview", {
      overview: "Dance is part of festival life, agricultural seasons and community gatherings. Named dances below are not assigned to every tribe in ASR District.",
      skipDetail: true,
      photos: [
        { slot: "Women's group dance (line)", src: "images/group-dance-line.png", caption: "Women dancing in a linked line. Dance name, community and village are not printed on the photograph.", source: "Photograph supplied for Tribal dances." },
        { slot: "Women's group dance (circle)", src: "images/group-dance-circle.jpg", caption: "Women in a circular group dance on open ground. Community and village are not printed.", source: "Photograph supplied for Tribal dances." },
        { slot: "Drum and dance procession", src: "images/festival-drum-procession.jpg", caption: "Drums, festive dress and dance in a built-up venue. Festival name, community and village are not printed.", source: "Photograph supplied for festival dance / traditional music." }
      ]
    }),
    twDance("dhimsa", "Dhimsa", {
      overview: "This portal already presents Dhimsa as a traditional folk dance on the public cultural panel (Traditional Dhimsa Folk Dance). That is a heritage presentation for the Agency, not a statement that every tribal community of ASR District performs Dhimsa in the same way.",
      community: "Not assigned community-by-community on this page.",
      photos: [{ slot: "Cultural panel photograph", src: "../images/dhimsa-dance.jpg", caption: "Dhimsa folk dance photograph already used on this portal. Village and performing group are not printed as a verified mandal record on this explorer.", source: "Existing ITDA Paderu portal cultural photograph." }]
    }),
    twDance("mayur", "Mayur dance", {
      overview: "Mayur dance is listed as a named dance in the website plan. A verified community, location and official source for the Paderu Agency are not in the supplied dataset."
    }),
    twDance("kolattam", "Kolattam / tribal stick dance", {
      overview: "Kolattam / stick dance is listed as a dance type (formation, rhythm, sticks). A verified Agency community and village performance record are not in the supplied dataset."
    }),
    twDance("group", "Tribal group dance", {
      overview: "Circular / group dance is listed as a general performance type. It is not a named programme of ITDA unless a specific event record exists.",
      photos: [
        { slot: "Linked-line group dance", src: "images/group-dance-line.png", caption: "Women dancing in a linked line. This is a group-dance photograph, not labelled as a named dance of a named community.", source: "Photograph supplied for Tribal group dance." },
        { slot: "Circular group dance", src: "images/group-dance-circle.jpg", caption: "Circular formation on open ground. Community, village and dance name are not printed.", source: "Photograph supplied for Tribal group dance." }
      ]
    }),
    twDance("festival-dances", "Festival dances", {
      overview: "Festival-linked dances should name festival, dance, community and village. Those fields remain blank until a verified event is supplied.",
      photos: [
        { slot: "Drum and dance procession", src: "images/festival-drum-procession.jpg", caption: "Processional drums and dance. Festival name, community, village and date are not printed on the photograph.", source: "Photograph supplied for festival dances / traditional music." }
      ]
    }),
    twDance("agri-dances", "Agricultural dances", {
      overview: "Sowing, harvest and rain-related cultural practices are listed as categories, not as named ITDA events.",
      photos: [
        { slot: "Open-ground group dance", src: "images/group-dance-circle.jpg", caption: "Group dance on open ground in a hilly landscape. Not labelled as a named harvest or sowing festival.", source: "Photograph supplied for agricultural / outdoor dance category." }
      ]
    })
  ],
  music: {
    overview: "Folk songs, drum, flute, percussion, bells and string instruments are listed as heritage topics. Instrument-making villages and artist names are not invented.",
    items: ["Folk songs", "Drum-based instruments", "Flute", "Percussion", "Bells", "String instruments", "Festival use"],
    photos: [
      { slot: "Drum procession", src: "images/festival-drum-procession.jpg", caption: "Barrel drums in a procession. Maker, village and instrument names are not printed.", source: "Photograph supplied for traditional music." }
    ]
  },
  dress: {
    overview: "Traditional clothing, jewellery, headgear and festival costumes differ by community. This page does not publish a single dress as the dress of all Paderu tribes.",
    items: ["Clothing", "Jewellery", "Headgear", "Festival costumes", "Dance performance dress"],
    photos: [
      { slot: "Jewellery and headgear", src: "images/traditional-jewellery.png", caption: "Bead jewellery and wrapped headgear. Community and village are not printed on the photograph.", source: "Photograph supplied for traditional dress / jewellery." },
      { slot: "Festival performance dress", src: "images/festival-drum-procession.jpg", caption: "Festival dress, headgear and dance costume in a procession. Community not printed.", source: "Photograph supplied for festival costumes." }
    ]
  },
  handicrafts: {
    overview: "Bamboo, cane, pottery, jewellery and traditional art are livelihood and heritage topics. The district tourism material on this portal mentions a proposed Art Village around pottery, bamboo/cane, metal craft and tribal jewellery — labelled as proposed, not as a completed ITDA batch.",
    items: ["Bamboo craft", "Cane craft", "Pottery", "Jewellery", "Traditional art"],
    photos: [
      { slot: "Jewellery", src: "images/traditional-jewellery.png", caption: "Bead jewellery display. Artisan name and community are not printed.", source: "Photograph supplied for tribal jewellery." },
      { slot: "Traditional wall painting", src: "images/painted-house.jpg", caption: "Painted house facade with floral and bird motifs. Village and artist names are not printed.", source: "Photograph supplied for traditional art." },
      { slot: "Bamboo basket craft", src: "images/bamboo-basket-craft.jpg", caption: "Bamboo / cane basket weaving. Artisan name, village and community are not printed on the photograph.", source: "Photograph supplied for Tribal handicrafts." }
    ]
  },
  preservation: [
    "Cultural documentation",
    "Youth participation",
    "School cultural programmes",
    "Tribal cultural festivals (when officially recorded)",
    "Local artists",
    "Digital photo and video archives on this reference site"
  ],
  programmes: {
    overview: "Named ITDA programmes should use: Programme name, year, administrative authority, Project Officer, conducted by, implemented by, coordinating officer, target community, location, activities, outcomes, photos, documents. Only programmes already documented elsewhere on this portal are linked. Empty fields are not filled with guesses.",
    documented: [
      { name: "Super 50", href: "../education/index.html#studentProgrammes" },
      { name: "AAROHAN AI Fellowship 2026", href: "../education/index.html#skillDevelopment/prog/aarohan" },
      { name: "Sisal & Lantana fibre Action Research (MoTA)", href: "../education/index.html#skillDevelopment/prog/sisal" }
    ]
  },
  stats: [
    { value: "11", label: "Scheduled Area mandals (ITDA Paderu)", detail: "Not all mandals of ASR District" },
    { value: "3", label: "PVTG communities named on this portal", detail: "Khonds, Gadaba, Poorja" },
    { value: "1,81,582", label: "Total PVTG population (portal figure)", detail: "Verify latest official records" },
    { value: "107", label: "Ashram Schools (planning dataset)", detail: "Education explorer" },
    { value: "11", label: "EMRS (planning dataset)", detail: "Education explorer" },
    { value: "667", label: "TW primary schools (network figure)", detail: "Not all district schools" }
  ],
  gallery: [
    {
      slot: "Public service counter",
      src: "images/public-service-counter.png",
      caption: "Citizens at a public service / office counter. Office name, date and officer names are not printed on the photograph, so it is not labelled as a named ITDA section.",
      source: "Photograph supplied for Tribal Welfare administration / citizen interface."
    },
    {
      slot: "Agency habitation landscape",
      src: "images/agency-habitation.png",
      caption: "Hill habitation with tiled roofs in a forested valley. Village and mandal names are not printed on the photograph.",
      source: "Photograph supplied for Tribal Welfare habitation / landscape."
    },
    {
      slot: "Bamboo basket craft",
      src: "images/bamboo-basket-craft.jpg",
      caption: "Bamboo / cane basket weaving. Artisan name, village and community are not printed on the photograph.",
      source: "Photograph supplied for Tribal handicrafts."
    },
    {
      slot: "Women's group dance (line)",
      src: "images/group-dance-line.png",
      caption: "Women dancing in a linked line. Dance name, community and village are not printed.",
      source: "Photograph supplied for Tribal dances."
    },
    {
      slot: "Women's group dance (circle)",
      src: "images/group-dance-circle.jpg",
      caption: "Circular group dance on open ground. Community and village are not printed.",
      source: "Photograph supplied for Tribal dances."
    },
    {
      slot: "Drum and dance procession",
      src: "images/festival-drum-procession.jpg",
      caption: "Drums and festive dance in a built-up venue. Festival name and community are not printed.",
      source: "Photograph supplied for festival dance / traditional music."
    },
    {
      slot: "Jewellery and headgear",
      src: "images/traditional-jewellery.png",
      caption: "Bead jewellery and wrapped headgear. Community and village are not printed.",
      source: "Photograph supplied for traditional dress / jewellery."
    },
    {
      slot: "Painted house facade",
      src: "images/painted-house.jpg",
      caption: "Elders seated on a painted house. Village and artist names are not printed.",
      source: "Photograph supplied for traditional art / habitation."
    },
    {
      slot: "Habitation street",
      src: "images/habitation-street.png",
      caption: "Tiled-roof street with hills behind. Village and mandal names are not printed.",
      source: "Photograph supplied for habitation / infrastructure."
    }
  ],
  documents: "Downloadable Tribal Welfare annual reports, CCDP files and scheme orders are not in the supplied source for this page.",
  faq: [
    { q: "Which PVTGs are named for the Paderu Agency?", a: "Khonds (Kondhs), Gadaba and Poorja (Porja), with portal population figures 98,907; 26,457; 56,218 (total 1,81,582). Verify latest official records." },
    { q: "How many mandals does ITDA Paderu cover?", a: "11 Scheduled Area mandals already listed on this portal (Ananthagiri, Araku Valley, Dumbriguda, Hukumpeta, Pedabayalu, Munchingiputtu, Paderu, G. Madugula, Chinthapalli, G.K. Veedhi, Koyyuru)." },
    { q: "Is Itika Pongal a festival of every tribe in ASR District?", a: "No. This site does not assign Itika Pongal (or Ganga Jatara) to every community. Community, village and official source are required first." },
    { q: "Is Sammakka–Saralamma an ITDA Paderu festival?", a: "This page does not present Sammakka–Saralamma as an ASR / Paderu Agency festival. It is a regional heading only." },
    { q: "What is Dhimsa on this website?", a: "Dhimsa appears on the portal cultural panel as a traditional folk dance of the Agency heritage. It is not described here as the dance of every tribal community in the district." },
    { q: "Who is the Project Officer?", a: "Sri Aditya Verma, IAS, Project Officer, ITDA Paderu (2026 listing already used on this portal). Other officer names: confirm Who's Who." }
  ]
};
