const NAV=[["index.html","Home","హోమ్"],["about.html","About","గురించి"],["area.html","Area","ప్రాంతం"],
["pvtg.html","Communities","సమాజాలు"],["education.html","Education","విద్య"],["super50.html","Super 50","సూపర్ 50"],
["health.html","Health","ఆరోగ్యం"],["agriculture.html","Agriculture","వ్యవసాయం"],["coffee.html","Coffee","కాఫీ"],
["forest.html","Forest","అడవి"],["livelihoods.html","Livelihoods","జీవనోపాధి"],["infrastructure.html","Infrastructure","మౌలికసదుపాయాలు"],
["departments.html","Departments","విభాగాలు"],["schemes.html","Schemes","పథకాలు"],["officers.html","Officers","అధికారులు"],
["offices.html","Offices","కార్యాలయాలు"],["assistant.html","AI Assistant","AI సహాయకుడు"],["contact.html","Contact","సంప్రదించండి"]];

const ICONS={
 about:'<circle cx="32" cy="32" r="28" fill="none" stroke="#fff" stroke-width="3"/><path d="M20 40c4-10 20-10 24 0" stroke="#fff" stroke-width="3" fill="none"/><circle cx="32" cy="24" r="6" fill="#fff"/>',
 area:'<path d="M6 46 20 24 30 38 40 20 58 46Z" fill="#fff"/>',
 pvtg:'<circle cx="20" cy="26" r="8" fill="#fff"/><circle cx="44" cy="26" r="8" fill="#fff"/><path d="M6 50c2-12 12-16 14-16s12 4 14 16" stroke="#fff" stroke-width="3" fill="none"/><path d="M30 50c2-12 12-16 14-16s12 4 14 16" stroke="#fff" stroke-width="3" fill="none"/>',
 education:'<path d="M6 24 32 12l26 12-26 12Z" fill="#fff"/><path d="M18 30v14c0 4 28 4 28 0V30" stroke="#fff" stroke-width="3" fill="none"/>',
 super50:'<circle cx="32" cy="26" r="14" fill="none" stroke="#fff" stroke-width="3"/><path d="M32 16v20M22 26h20" stroke="#fff" stroke-width="3"/><path d="M20 52l4-12h16l4 12" stroke="#fff" stroke-width="3" fill="none"/>',
 health:'<rect x="26" y="10" width="12" height="44" fill="#fff"/><rect x="10" y="26" width="44" height="12" fill="#fff"/>',
 agriculture:'<path d="M32 54V22" stroke="#fff" stroke-width="3"/><path d="M32 30c-10 0-16-8-16-16 10 0 16 6 16 16Z" fill="#fff"/><path d="M32 26c10 0 16-8 16-16-10 0-16 6-16 16Z" fill="#fff"/>',
 coffee:'<path d="M12 26h30v14a15 15 0 0 1-30 0Z" fill="#fff"/><path d="M42 28h6a7 7 0 0 1 0 14h-6" stroke="#fff" stroke-width="3" fill="none"/><path d="M18 10c-4 4 4 6 0 10M28 10c-4 4 4 6 0 10" stroke="#fff" stroke-width="3" fill="none"/>',
 forest:'<path d="M32 8 20 28h6L14 46h36L38 28h6Z" fill="#fff"/><rect x="28" y="46" width="8" height="10" fill="#fff"/>',
 livelihoods:'<circle cx="20" cy="20" r="9" fill="#fff"/><circle cx="44" cy="20" r="9" fill="#fff"/><path d="M8 54c2-14 10-18 12-18s10 4 12 18M32 54c2-14 10-18 12-18s10 4 12 18" stroke="#fff" stroke-width="3" fill="none"/>',
 infrastructure:'<path d="M10 54V26l22-16 22 16v28" stroke="#fff" stroke-width="3" fill="none"/><rect x="26" y="34" width="12" height="20" fill="#fff"/>',
 departments:'<rect x="10" y="16" width="44" height="34" rx="3" fill="none" stroke="#fff" stroke-width="3"/><path d="M10 26h44M22 26v24M42 26v24" stroke="#fff" stroke-width="3"/>',
 schemes:'<path d="M14 10h28l8 8v36H14Z" fill="none" stroke="#fff" stroke-width="3"/><path d="M22 26h20M22 34h20M22 42h14" stroke="#fff" stroke-width="3"/>',
 officers:'<circle cx="32" cy="20" r="10" fill="#fff"/><path d="M14 54c2-16 12-20 18-20s16 4 18 20" stroke="#fff" stroke-width="3" fill="none"/>',
 offices:'<rect x="14" y="22" width="36" height="32" fill="#fff"/><path d="M8 22 32 8l24 14" stroke="#fff" stroke-width="3" fill="none"/><rect x="26" y="36" width="12" height="18" fill="#123425"/>',
 assistant:'<rect x="12" y="14" width="40" height="28" rx="6" fill="#fff"/><circle cx="24" cy="28" r="3" fill="#123425"/><circle cx="40" cy="28" r="3" fill="#123425"/><path d="M28 48v6M36 48v6" stroke="#fff" stroke-width="3"/>',
 contact:'<rect x="10" y="14" width="44" height="34" rx="4" fill="none" stroke="#fff" stroke-width="3"/><path d="M10 16l22 18 22-18" stroke="#fff" stroke-width="3" fill="none"/>'
};
function icon(id){return `<svg class="icon" viewBox="0 0 64 64">${ICONS[id]||ICONS.about}</svg>`;}
function tile(id){return `<div class="tile">${icon(id)}</div>`;}

const KB={
about:{en:{title:"About ITDA Paderu",body:"ITDA stands for Integrated Tribal Development Agency. ITDA Paderu is the government administrative and development agency responsible for coordinating and implementing tribal welfare and development programmes in the Paderu Agency area of Andhra Pradesh. It is located at Paderu in the present Alluri Sitharama Raju (ASR) District. Its work covers education, health, agriculture, horticulture, infrastructure, livelihoods and tribal welfare.",
  admin:"Historically documented ITDA Paderu staffing includes a Project Officer supported by officers/sections for Administration, Accounts, Monitoring, Agriculture, Horticulture, Coffee, Tribal Welfare Engineering, Education, and Medical & Health — reflecting ITDA's integrated, multi-sector coordination model."},
 te:{title:"ITDA పాడేరు గురించి",body:"ITDA అంటే Integrated Tribal Development Agency. ఇది ఆంధ్రప్రదేశ్‌లోని పాడేరు ఏజెన్సీ ప్రాంతంలో గిరిజన సంక్షేమ కార్యక్రమాలను సమన్వయం చేసే ప్రభుత్వ సంస్థ. ఇది ప్రస్తుత అల్లూరి సీతారామరాజు (ASR) జిల్లాలోని పాడేరులో ఉంది.",
  admin:"ప్రాజెక్ట్ అధికారి నేతృత్వంలో అడ్మినిస్ట్రేషన్, అకౌంట్స్, మానిటరింగ్, వ్యవసాయం, ఉద్యానవనం, కాఫీ, గిరిజన సంక్షేమ ఇంజనీరింగ్, విద్య, వైద్యం విభాగాలు పనిచేస్తాయి."}},
area:{indicators:[["Scheduled Area Mandals","11"],["Scheduled Tribe population","Approx. 6.26 lakh"],["ST population share","94.13%"],["Literacy rate","32.53%"],["Male literacy","40.56%"],["Female literacy","24.77%"]],
  mandals:"Paderu, Pedabayalu, Munchingiputtu, Ananthagiri, Araku, Hukumpeta, Chintapalli, Koyyuru, Dumbriguda, and others (historically documented list)."},
pvtg:{rows:[["Khonds","98,907"],["Gadaba","26,457"],["Poorja","56,218"],["Total","1,81,582"]]},
education:{en:["Tribal welfare schools","Ashram schools (residential, Classes 3–10)","Tribal Welfare Post-Matric College Hostels (Intermediate to graduation & higher education)","667 Government Primary Schools (TW) supervised via school-complex arrangements","Scholarships / financial support","Competitive examination preparation","Student development programmes","Digital / modern education initiatives"],
 te:["గిరిజన సంక్షేమ పాఠశాలలు","ఆశ్రమ పాఠశాలలు (3–10 తరగతులు)","పోస్ట్-మెట్రిక్ కళాశాల హాస్టళ్లు","667 ప్రభుత్వ ప్రాథమిక పాఠశాలలు (TW)","స్కాలర్‌షిప్‌లు","పోటీ పరీక్షల శిక్షణ","విద్యార్థి అభివృద్ధి కార్యక్రమాలు","డిజిటల్ విద్యా కార్యక్రమాలు"]},
super50:[["2023–24","51 students passed in First Division; 21 boys, 30 girls; 2 joined IIIT Nuzividu; 35 joined Colleges of Excellence."],
 ["2024–25","All 51 students passed in First Division; 3 entered IIIT Nuzividu; 41 joined Colleges of Excellence; 6 joined other institutions."],
 ["2025–26","Screening conducted 1 Sept 2025; 104 merit students selected (51 boys, 53 girls)."]],
health:{en:["District Hospital Paderu — 200 beds","Area Hospital Araku — 150 beds","CHC Chintapalli — 50 beds","CHC Munchingiput — 30 beds","Maternal programmes JSY, JSSK, PMSMA","Blood Bank and blood storage as listed"],
 note:"Capacities and programmes follow the official ASR District Health page as supplied. Officer names are not stored here. Verify latest official records. This is not the official government health website."},
agri:{agriculture:["Tribal farmer support","Agricultural development","Irrigation-related support","Agricultural extension","Improved cultivation practices"],
 horticulture:["Horticultural crops","Plantation development","Farmer support","Marketing-related activities"],
 pathway:"Agriculture → Horticulture → Coffee → Forest produce → Livestock → Skill development → Tribal entrepreneurship"},
coffee:{body:"Paderu Agency is particularly associated with tribal coffee cultivation. Government documents identify coffee plantations in the Minimuluru area as an important feature of the region. The Coffee Board maintains an office in Paderu.",
 office:"Deputy Director (Extension), Coffee Board, Paderu"},
forest:["Forest conservation","Forest produce","Community livelihoods","Plantation","Biodiversity","Sustainable resource use"],
livelihood:["Agriculture","Horticulture","Coffee","Forest-based livelihoods","Skill development","Self-employment","Tribal entrepreneurship"],
infra:["Roads","Bridges","School buildings","Hostels","Government buildings","Drinking-water infrastructure","Community infrastructure","Staff quarters","Youth Training Centres"],
departments:["Tribal Welfare","Medical & Health","Survey & Land Records","Registration & Stamps","Animal Husbandry","Women Development & Child Welfare","Panchayati Raj Engineering","Roads & Buildings","Tribal Welfare Engineering","Forest","Housing","DRDA","Treasury & Accounts","Horticulture","Agriculture","Skill Development","Sports","Sericulture","School Education","Civil Supplies","Fisheries","Planning","Industries","Coffee Board","AP Markfed","Electricity","Social Welfare"],
schemes:{note:"Scheme names, eligibility and current benefit amounts change frequently. This portal lists only the scheme categories confirmed in the source material; for live details always confirm with the ITDA office or ASR District Tribal Welfare Department.",
 categories:["Tribal Welfare Schemes","Education Schemes (scholarships, hostel support)","Agriculture & Horticulture Schemes","Central Government Schemes","State Government Schemes"]},
officers:[["Project Officer","ITDA Paderu — heads the integrated administrative structure"],
 ["Deputy Director, Tribal Welfare","ITDA Office, Paderu"],
 ["Deputy Director (Extension), Coffee Board","Paderu"],
 ["Divisional Forest Officer","Paderu"]],
offices:[["Sub Collector Office & RDO Office, Paderu","Government administrative office"],
 ["Tribal Welfare Department","State government office"],
 ["Forest Office","Government office"],
 ["MPDO Office, Paderu","State government office"],
 ["APEPDCL, Division Office, Paderu","Government office"]],
contact:{body:"For current officer names, phone numbers and office addresses, the ASR District Tribal Welfare Department page and the official district 'Who's Who' directory are the authoritative sources. This portal does not display invented contact numbers."}
};

const STR={
 en:{siteTitle:"ITDA Paderu",siteSub:"Integrated Tribal Development Agency",lang:"తెలుగు",
  mediaNote:"No verified photos or video footage of ITDA Paderu were available to include here, so this page uses simple illustrative icons instead of stock or invented photos. Add your own department photos or video files to the gallery/tile elements in this page's HTML when you have them."},
 te:{siteTitle:"ITDA పాడేరు",siteSub:"సమీకృత గిరిజన అభివృద్ధి సంస్థ",lang:"English",
  mediaNote:"ITDA పాడేరుకు సంబంధించిన ధృవీకరించిన ఫోటోలు లేదా వీడియోలు అందుబాటులో లేనందున, ఇక్కడ సాధారణ చిత్రాలు వాడాము. మీ వద్ద ఫోటోలు/వీడియోలు ఉంటే వాటిని ఇక్కడ చేర్చవచ్చు."}
};

function getLang(){return localStorage.getItem('itda_lang')||'en';}
function tbl(rows,heads){let h="<table>"+(heads?`<tr>${heads.map(x=>`<th>${x}</th>`).join("")}</tr>`:"");
 rows.forEach(r=>h+=`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`);return `<div class="table-scroll">${h}</table></div>`;}
function list(arr){return "<ul>"+arr.map(x=>`<li>${x}</li>`).join("")+"</ul>";}
function mediaNote(L){return `<div class="media-note">📷 ${STR[L].mediaNote}</div>`;}

function renderChrome(pageFile){
 const L=getLang();
 document.title=STR[L].siteTitle;
 document.getElementById('header').innerHTML=`
  <div class="gov-bar"><div class="container">${L==='en'?'Government of Andhra Pradesh · Tribal Welfare · Alluri Sitharama Raju District':'ఆంధ్రప్రదేశ్ ప్రభుత్వం · గిరిజన సంక్షేమం · అల్లూరి సీతారామరాజు జిల్లా'}</div></div>
  <div class="headrow">
    <a class="brand" href="index.html"><span class="emblem" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M6 34 16 18l6 8 6-12 14 20Z" fill="#e8c56b"/><path d="M24 30c-6 0-8-6-4-10 1 5 4 7 4 10Z" fill="#8fc48f"/><rect x="22" y="30" width="4" height="8" fill="#e8c56b"/></svg></span><div><h1>${STR[L].siteTitle}</h1><span>${STR[L].siteSub}</span></div></a>
    <div class="head-actions">
      <div class="lang-switch" role="group" aria-label="${L==='en'?'Language':'భాష'}">
        <button type="button" class="${L==='en'?'active':''}" aria-pressed="${L==='en'}" onclick="setLang('en')">English</button>
        <button type="button" class="${L==='te'?'active':''}" aria-pressed="${L==='te'}" onclick="setLang('te')">తెలుగు</button>
      </div>
      <button class="nav-toggle" type="button" aria-label="${L==='en'?'Open menu':'మెనూ తెరవండి'}" aria-expanded="false" aria-controls="siteNav" onclick="toggleNav(this)"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="gold-rule"></div>
  <div class="container nav-wrap"><nav id="siteNav">${NAV.map(n=>`<a href="${n[0]}" class="${n[0]===pageFile?'active':''}">${L==='en'?n[1]:n[2]}</a>`).join("")}</nav></div>`;
 document.getElementById('footer').innerHTML=`<div class="container">
   <div>© ITDA Paderu Information Portal · Reference build, not an official government website.</div>
   <div>Data: ASR District Tribal Welfare Dept. &amp; Ministry of Tribal Affairs publications</div></div>`;
}
function setLang(lang){if(getLang()===lang)return;localStorage.setItem('itda_lang',lang);location.reload();}
function switchLang(){setLang(getLang()==='en'?'te':'en');}
function toggleNav(btn){
 const nav=document.getElementById('siteNav');
 const open=nav.classList.toggle('open');
 btn.classList.toggle('is-open',open);
 btn.setAttribute('aria-expanded',open?'true':'false');
 btn.setAttribute('aria-label',open?(getLang()==='en'?'Close menu':'మెనూ మూసివేయండి'):(getLang()==='en'?'Open menu':'మెనూ తెరవండి'));
}
function pageHero(id,title,text){return `<section class="page-hero"><div class="container">${icon(id)}<div><h2>${title}</h2><p>${text||''}</p></div></div></section>`;}
