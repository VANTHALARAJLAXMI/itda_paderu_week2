/* Official-style Public Utilities directory for Alluri Sitharama Raju District.
   Records match the supplied district Public Utilities listing. Do not invent extra contacts. */

const PU_NA = "Not Available";

const PU_BANKS = [
  { si: 1, mandal: "Araku Valley", village: "Araku Valley", bank: "APGVB", phone: "9490157108" },
  { si: 2, mandal: "Chinthapalli", village: "Chinthapalli", bank: "APGVB", phone: "9490157138" },
  { si: 3, mandal: "G.Madugula", village: "G.Madugula", bank: "APGVB", phone: "9494480441" },
  { si: 4, mandal: "Koyyuru", village: "Koyyuru", bank: "APGVB", phone: "7093606030" },
  { si: 5, mandal: "Munchingputtu", village: "Munchingputtu", bank: "APGVB", phone: "9553814680" },
  { si: 6, mandal: "Paderu", village: "Paderu", bank: "APGVB", phone: "8125557892" },
  { si: 7, mandal: "Pedabayalu", village: "Pedabayalu", bank: "APGVB", phone: "8886795268" },
  { si: 8, mandal: "Hukumpeta", village: "Hukumpeta", bank: "Bank of Baroda", phone: "8008714603" },
  { si: 9, mandal: "Araku Valley", village: "Yendapallivalasa", bank: "Canara Bank", phone: "8331015605" },
  { si: 10, mandal: "Paderu", village: "Paderu", bank: "DCCB", phone: "9441517758" },
  { si: 11, mandal: "Koyyuru", village: "Sarabhanapalam", bank: "Indian Bank", phone: "8712689324" },
  { si: 12, mandal: "Ananthagiri", village: "Kasipatnam", bank: "State Bank of India", phone: "9000444917" },
  { si: 13, mandal: "Araku Valley", village: "Araku Valley", bank: "State Bank of India", phone: "9666201963" },
  { si: 14, mandal: "Dumbriguda", village: "Kinchumanda", bank: "State Bank of India", phone: "6300498059" },
  { si: 15, mandal: "Munchingputtu", village: "Munchingputtu", bank: "State Bank of India", phone: "8074534703" },
  { si: 16, mandal: "Paderu", village: "Paderu", bank: "State Bank of India", phone: "9010000348" },
  { si: 17, mandal: "Pedabayalu", village: "Rudakota", bank: "State Bank of India", phone: "9849834621" },
  { si: 18, mandal: "Hukumpeta", village: "Hukumpeta", bank: "State Bank of India", phone: "6302279994" },
  { si: 19, mandal: "Koyyuru", village: "Koyyuru", bank: "State Bank of India", phone: "9014174239" },
  { si: 20, mandal: "G K Veedhi", village: "G K Veedhi", bank: "UCO Bank", phone: "9885548389" },
  { si: 21, mandal: "Ananthagiri", village: "Ananthagiri", bank: "Union Bank of India", phone: "8328016950" },
  { si: 22, mandal: "Chinthapalli", village: "Chinthapalli", bank: "Union Bank of India", phone: "9493638519" },
  { si: 23, mandal: "Dumbriguda", village: "Dumbriguda", bank: "Union Bank of India", phone: "7978648287" },
  { si: 24, mandal: "G K Veedhi", village: "Upper Sileru", bank: "Union Bank of India", phone: "6370404872" },
  { si: 25, mandal: "G.Madugula", village: "G.Madugula", bank: "Union Bank of India", phone: "9866893820" },
  { si: 26, mandal: "Paderu", village: "Paderu", bank: "Union Bank of India", phone: "9494180029" },
  { si: 27, mandal: "Paderu", village: "Paderu", bank: "Union Bank of India", phone: "9491798764" },
  { si: 28, mandal: "Paderu", village: "Paderu", bank: "HDFC", phone: "9849760921" },
  { si: 29, mandal: "Paderu", village: "Paderu", bank: "Punjab National Bank", phone: "8639551501" }
];

const PU_COLLEGES = [
  { si: 1, name: "Govt. Degree College Paderu", location: "Paderu", phones: ["8520840561"] },
  { si: 2, name: "Govt. Degree College, Araku Valley", location: "Araku Valley", phones: ["6300384004", "9440335502"] },
  { si: 3, name: "Govt. Degree College (Women), Araku Valley", location: "Araku Valley", phones: ["8500096808"] },
  { si: 4, name: "Govt. Degree College, Chinthapalli", location: "Chinthapalli", phones: ["9666739207"] },
  { si: 5, name: "Govt. Degree College (Women), Marripallem Koyyuru", location: "Marripallem, Koyyuru", phones: ["9100443611"] }
];

const PU_ELECTRICITY = {
  id: "apePDCL",
  name: "APEPDCL – Circle Office",
  address: "Kotha Paderu Village, Paderu Mandal, Alluri Sitharama Raju District",
  email: "se-opn-asr@apeasternpower.com",
  phones: ["9490610027"],
  pin: "531024"
};

const PU_HOSPITAL = {
  id: "gghPaderu",
  name: "Government General Hospital, Paderu",
  address: "Sundruputtu Village, Paderu",
  phones: ["9246482356", "9441083160"],
  email: "supttgghpaderu@gmail.com"
};

const PU_POST = {
  id: "paderuPO",
  name: "Paderu Sub Post Office",
  address: "Post Office Building, Old Bus Stand opposite Ambedkar Statue, Paderu, Alluri Sitharama Raju District",
  pin: "531024",
  phones: ["75693172"],
  email: "paderooso@indiapost.gov.in",
  website: "https://www.indiapost.gov.in",
  websiteLabel: "India Post"
};

const PU_POLICE = {
  id: "asrPolice",
  name: "ASR DISTRICT POLICE",
  office: "O/o District Police Office",
  address: "AV Ramana Function Hall, Sunduputtu, Paderu, Alluri Sitharama Raju District",
  email: "sp_asr@appolice.gov.in",
  phones: ["08935-250273"],
  pin: "531024"
};

const PU_NGOS = [
  { si: 1, name: "Tribal Health and Welfare Voluntary Organization, K. D. Peta, Anakapalli Dist.", phones: ["9490546585", "8639257797"], whatsapp: ["9490546585"], emails: ["thawvo@gmail.com"] },
  { si: 2, name: "Vanavasi Yuvajana Samkshema Sangam, D. No. 7-77A, Mainroad, Maredumilli, Polavaram Dist. 533295", phones: ["94900884491", "9492705675"], whatsapp: ["94900884491"], emails: [] },
  { si: 3, name: "Tribal Educational Rural Development Society(TERDS), Aruku(v) & Dumbriguda(M), ASR Dist., 531151", phones: ["6303191604", "9490546405"], whatsapp: ["6303191604"], emails: ["terdsngo@gmail.com"] },
  { si: 4, name: "Adivasimitra Welfare Society,Paderu", phones: ["9441824532"], whatsapp: ["9441824532"], emails: ["adivasimitra@gmail.com"] },
  { si: 5, name: "Girijana Yuva Pragathi Welfare Society, Paderu, Girijana Bhavan Building", phones: ["7382768251"], whatsapp: ["7382768251"], emails: ["girijanayuvaprogathi@gmail.com"] },
  { si: 6, name: "Visakha Jilla Nava Nirmana Samithi", phones: ["08932-225285"], whatsapp: ["9490759864"], emails: ["sira@vjnns.org", "karthik@vjnns.org"] },
  { si: 7, name: "Brathuku Brathikinchu Welfare Society, D.No. 1-61, Battapanukulu, Battipanukulu, Koyyuru, ASR Dist – 531084", phones: ["8688003064"], whatsapp: ["8688003064"], emails: [] },
  { si: 8, name: "Tribal Disable Welfare Society, Vanthalaguda(V), Araku Valley(M), ASR Dist – 531149", phones: ["7382090992"], whatsapp: ["6281951179"], emails: ["tdwsphc269@gmail.com"] },
  { si: 9, name: "Green & Health Tribals Development Society, Valasi, Ananthagiri (M), ASR Dist – 535145", phones: ["8500959837"], whatsapp: ["8500959837"], emails: ["narasingarao.ghtds@gmail.com"] },
  { si: 10, name: "Indo Human Rights Care, Visakhapatnam,(HO) Arakuvalley (BO), ASR Dist.", phones: ["9490675317"], whatsapp: ["9490675317"], emails: ["ihrcindia1@gmail.com"] },
  { si: 11, name: "Hukumpeta Viniyogadarula Sankshema Seva Sangham, D.No. 38-40/ Addumanda Road, Hukumpeta, ASR Dist.", phones: ["9441075671"], whatsapp: ["9441075671"], emails: [] },
  { si: 12, name: "NICE Foundation, 10-2-247 & 248, Shanthi Nagar, Masab Tank, Hyd. 500057", phones: ["91 4023454545"], whatsapp: [], emails: [], website: "http://www.nicefoundation.in" },
  { si: 13, name: "Girijana Vikas Swatchanda Seva Samstha, G.K. Veedhi, ASR Dist", phones: ["9494671156"], whatsapp: ["9494671156"], emails: ["girijanavikas@gmail.com"] },
  { si: 14, name: "District Consumer Societies Federation, Paderu, ASR Dist.", phones: ["9492233415"], whatsapp: ["9492233415"], emails: ["dcsfasr2023@gmail.com"] },
  { si: 15, name: "Science for Better Society, 1-20. Kummarapalli, Rambetli, Anakapalli Dist", phones: ["9392655855"], whatsapp: ["9392655855"], emails: ["scienceforbettersociety@gmail.com"] },
  { si: 16, name: "Women Association for Gender Equality, D. No., 2-212, Thimmapuram, Kakinada Rural", phones: ["9494710564"], whatsapp: ["9494710564"], emails: ["wageindia12@gmail.com"] },
  { si: 17, name: "Health Evolution for All Rural Tribes Society, Kusumaguda, Dumbriguda, ASR Dist – 531151", phones: ["9491061487"], whatsapp: ["9491061487"], emails: ["devadasubjgm17@gmail.com"] },
  { si: 18, name: "Integrated Tribal Development Society, D.No. 6-129/6, Veddera Colony, Tadepalli, Guntur Dist.", phones: ["8639758457"], whatsapp: ["8639758457"], emails: ["itdsaraku@gmail.com"] },
  { si: 19, name: "Peddabayalu Mandala Viniyogadarula Sangam, 60-69, Seethagunta, Peddabayalu, ASR Dist.", phones: ["8500904876"], whatsapp: ["8500904876"], emails: [] },
  { si: 20, name: "Tribal Area Consumers Welfare Society, Seekari, Peddabayalu, ASR Dist", phones: ["9493940593"], whatsapp: ["9493940593"], emails: [] },
  { si: 21, name: "Addateegala Viniyogadarula Sangham, 4-32, Panukuratipalam, Addateegala, Polavaram Dist-533428", phones: ["8885447571"], whatsapp: ["8885447571"], emails: [] },
  { si: 22, name: "Y. Ramavaram Viniyogadarula Sangam, AS.No. 38, Chavitidibbalu, Y. Ramavaram, Polavaram Dist, 533483", phones: ["7901073097"], whatsapp: ["7901073097"], emails: [] },
  { si: 23, name: "Devipatnam Viniyogadarula Sangam, 6-19, Damanapalle, Devipatnam, Polavaram Dist – 533339", phones: ["6281814699"], whatsapp: ["6281814699"], emails: [] },
  { si: 24, name: "Rampachodavaram Viniyogadarula Sangam, As. No., 257/ Rampachodavaram, Polavaram Dist – 533288", phones: ["8332900721"], whatsapp: ["8332900721"], emails: [] },
  { si: 25, name: "Maredumilli Viniyogadarula Sangam, 2-75, Boduluru, Maredumilli,Polavaram Dist – 533295", phones: ["6281216979"], whatsapp: ["6281216979"], emails: [] },
  { si: 26, name: "Star Sapphire Social Welfare Foundation, Plot no. 24, opp. Y- School, Gitam College Road, Yendada, VSP- 530045", phones: ["9391525248"], whatsapp: ["9391525248"], emails: ["starsapphirengo@gmail.com"] },
  { si: 27, name: "Srigiri Foundation,#210, East Block, Sri Krishna Residency, Sirigudi Nagar, Yendada, VSP", phones: ["9063278111"], whatsapp: ["9063278111"], emails: ["srigirifoundation.in@gmail.com"] },
  { si: 28, name: "Sudhan Educational Society,10-296, T-2, Kanishka Apart., Chalapathi Nagar, Old Diary Farm, Vsp – 530040", phones: ["7075766699"], whatsapp: ["7075766699"], emails: ["sudhanngo99@gmail.com"] },
  { si: 29, name: "Sahasra Educational Society, Bapuji Nagar, Kancharapalam, VSP – 530008", phones: ["7207525115"], whatsapp: ["7207525115"], emails: ["sahasrango.in@gmail.com"] },
  { si: 30, name: "Manam Foundation,4-292/1/ Sundar Nagar, Visakhapatnam", phones: ["7207367257"], whatsapp: ["7207367257"], emails: ["manamfoundation.in@gmail.com"] },
  { si: 31, name: "Girizim Interior Renatssaece Ministries(GIRM), Raju Camp, Y. Ramavaram, Polavaram Dist – 531110", phones: ["7815981308"], whatsapp: ["7815981308"], emails: ["giriziminteriorreatssaecemini@gmail.com"] },
  { si: 32, name: "Heart of Jesus Christ Ministries and Welfare Societies, Kothaballuguda, Araku Valley, ASR Dist – 531149", phones: ["8639407656"], whatsapp: ["8639407656"], emails: ["hjcms2019@gmail.com"] },
  { si: 33, name: "Sustainable Rural Development Organization (BOW & ARROW),SathhiNagar, 9-1-1217/1, Bhadrachalam- 507111,B.R.Gudem Dist", phones: ["8977734550"], whatsapp: ["8977734550"], emails: ["bowandarrowteam@gmail.com"] },
  { si: 34, name: "Girijana Samskruthika Sampradayalu and Paryavarana Vidya Susthira Abhivruddhi “Laya Samstha”, Paderu", phones: ["6303192881"], whatsapp: ["6303192881"], emails: [] },
  { si: 35, name: "Dallapalli Hills & Culture Society, Paderu Mandal , ASR Dist", phones: ["9493530940"], whatsapp: ["9493530940"], emails: [] },
  { si: 36, name: "Manyam Viniyogadarula Sangam, Ananthagiri, ASR Dist", phones: ["8330919005"], whatsapp: ["8330919005"], emails: [] },
  { si: 37, name: "Srujana Welfare Association, Chodavaram – 531036", phones: ["9985369779"], whatsapp: ["9985369779"], emails: [] },
  { si: 38, name: "Agriculture and Social Development Society, Chintoor, Polavaram Dist, AP", phones: ["9502875819"], whatsapp: ["9502875819"], emails: [] },
  { si: 39, name: "Centre for People’s Forestry, Secunderabad, Telangana – 500017", phones: ["8074390268"], whatsapp: ["8074390268"], emails: [] },
  { si: 40, name: "Watershed Support Services and Activities Network(Wassan), Hyd, Telangana- 500033", phones: ["9989977835"], whatsapp: ["9989977835"], emails: [] },
  { si: 41, name: "Vinuthana (Forest Alliance) Foundation, Paderu, ASR Dist – 531024", phones: ["9903177355"], whatsapp: ["9903177355"], emails: [] },
  { si: 42, name: "Navajeevan Organization, Venkatagiri, Nellore Dist – 524002", phones: ["9440430178"], whatsapp: ["9440430178"], emails: ["navajeevannlr@gmail.com"] },
  { si: 43, name: "Heifer International , C/o Passing gifts pvt ltd", phones: ["9246477308"], whatsapp: ["9246477308"], emails: [] },
  { si: 44, name: "Adharshila for Sustainable Socio-economic Transformation", phones: ["9100149356"], whatsapp: ["9100149356"], emails: [] },
  { si: 45, name: "Sarada Valley Development Samiti, Thummapala, Anakapalli – 531032", phones: ["7382596778"], whatsapp: ["7382596778"], emails: [] },
  { si: 46, name: "Janakalyan Welfare Society,Rajamundry, AP", phones: ["9491451143"], whatsapp: ["9491451143"], emails: [] },
  { si: 47, name: "Chaitanya Sravanthi, Paderu, ASR Dist.", phones: ["8985526193"], whatsapp: ["8985526193"], emails: [] },
  { si: 48, name: "Swanthana Seva Samiti, Prasam District, A", phones: ["9494928391", "9849152747"], whatsapp: [], emails: [] },
  { si: 49, name: "Vasavya Mahila Mandali, Visakhapatnam – 530003", phones: ["9063549923"], whatsapp: [], emails: ["vasavyamm@vasavya.org", "vmm.mahilamitra@gmail.com"] },
  { si: 50, name: "Rajavommangi Viniyogadarula Sangham, Rajavommangi, Polavaram District – 533436", phones: ["8332889087"], whatsapp: [], emails: [] },
  { si: 51, name: "Organization for rural re-construction (ORRC), Yellamanchali, Anakapalli Dist. – 531036", phones: ["9949540444"], whatsapp: [], emails: [] },
  { si: 52, name: "NATURE, Peda Waltair, Visakhapatnam Dist. 530017", phones: ["9490977182"], whatsapp: [], emails: [], website: "https://naturengoindia.org" },
  { si: 53, name: "Centre for Humanitarian Assistance (CEFHA) Trust, Visakhapatnam – 530013", phones: ["8919706468", "8912726281"], whatsapp: [], emails: ["sasiwap@gmail.com"] },
  { si: 54, name: "Grama Swarajya Samithi, Visakhapatnam, AP – 531126", phones: ["9603005531"], whatsapp: [], emails: [] },
  { si: 55, name: "The Ability People, Visakhapatnam, AP – 531126", phones: ["9177363600"], whatsapp: [], emails: [] },
  { si: 56, name: "Dandakaranya Education Society, Araku Valley, ASR Dist.", phones: ["9491909501"], whatsapp: [], emails: [] },
  { si: 57, name: "Darvi Education & Innovation Society, Sabbavaram, Anakapalli Dist. , AP 531002", phones: ["9505849501"], whatsapp: [], emails: [] },
  { si: 58, name: "Life Foundation, Hyderabad, Telangana – 500074", phones: ["9704801800"], whatsapp: [], emails: [] },
  { si: 59, name: "Sureddi Appalanaidu – SAN charity, Narsipatnam, Anakapalli Dist.", phones: ["9492384798"], whatsapp: [], emails: ["appalanaidusureddi07@gmail.com"] },
  { si: 60, name: "SAN Educational Society (Sri Vinayaka San HM Educational Society, Narsipatnam, Anakapalli Dist.", phones: ["9492384798"], whatsapp: [], emails: ["appalanaidusureddi07@gmail.com"] }
];
