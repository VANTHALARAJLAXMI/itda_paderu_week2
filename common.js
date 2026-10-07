/* Legacy common.js fallback */
const NAV=[["index.html","Home","హోమ్"],["about.html","About","గురించి"],["education.html","Education","విద్య"],["health.html","Health","ఆరోగ్యం"],["agriculture.html","Agriculture","వ్యవసాయం"],["departments.html","Departments","విభాగాలు"],["schemes.html","Schemes","పథకాలు"],["contact.html","Contact","సంప్రదించండి"]];

function getLang(){return localStorage.getItem('itda_lang')||'en';}
function setLang(lang){
  if(getLang()===lang)return;
  localStorage.setItem('itda_lang',lang);
}
