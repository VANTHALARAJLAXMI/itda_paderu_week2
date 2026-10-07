const ASTR={
 en:{welcome:"Hello! I'm the ITDA Paderu information assistant. Ask me about education, health, agriculture, coffee, schemes, officers or offices.",
  askPlaceholder:"Ask about ITDA Paderu…",clear:"Clear Chat",listen:"🔊 Listen",send:"Send",
  suggestions:["What is ITDA Paderu?","How many mandals are under Paderu ITDA?","What is Super 50?","What are the PVTGs in Paderu?","Which departments are at ITDA Paderu?","Where is the ITDA office?"],
  notFound:"This information is not currently available in the verified ITDA Paderu knowledge base."},
 te:{welcome:"నమస్కారం! నేను ITDA పాడేరు సమాచార సహాయకుడిని. విద్య, ఆరోగ్యం, వ్యవసాయం, కాఫీ, పథకాలు, అధికారుల గురించి అడగండి.",
  askPlaceholder:"ITDA పాడేరు గురించి అడగండి…",clear:"చాట్ క్లియర్ చేయండి",listen:"🔊 వినండి",send:"పంపు",
  suggestions:["ITDA పాడేరు అంటే ఏమిటి?","పాడేరు ITDA పరిధిలో ఎన్ని మండలాలు ఉన్నాయి?","సూపర్ 50 అంటే ఏమిటి?","పాడేరులో PVTGలు ఏమిటి?","ITDA పాడేరులో ఏ విభాగాలు ఉన్నాయి?","ITDA కార్యాలయం ఎక్కడ ఉంది?"],
  notFound:"ఈ సమాచారం ప్రస్తుతం ధృవీకరించబడిన ITDA Paderu knowledge baseలో అందుబాటులో లేదు."}
};
let chatHistory=[];
const KB_TEXT_EN=`ITDA meaning: Integrated Tribal Development Agency. ${KB.about.en.body} ${KB.about.en.admin}
Area: 11 Scheduled Area mandals; ST population ~6.26 lakh (94.13%); literacy 32.53% (male 40.56%, female 24.77%). Mandals include ${KB.area.mandals}
PVTGs: Khonds 98,907; Gadaba 26,457; Poorja 56,218; total 1,81,582.
Education: ${KB.education.en.join('; ')}.
Super 50: ${KB.super50.map(r=>r[0]+': '+r[1]).join(' ')}
Health: ${KB.health.en.join('; ')}. ${KB.health.note}
Agriculture: ${KB.agri.agriculture.join('; ')}. Horticulture: ${KB.agri.horticulture.join('; ')}. Pathway: ${KB.agri.pathway}
Coffee: ${KB.coffee.body} Office: ${KB.coffee.office}
Forest: ${KB.forest.join('; ')}. Livelihoods: ${KB.livelihood.join('; ')}. Infrastructure: ${KB.infra.join('; ')}.
Departments: ${KB.departments.join(', ')}.
Schemes: ${KB.schemes.categories.join('; ')}. ${KB.schemes.note}
Officers: ${KB.officers.map(o=>o[0]+' — '+o[1]).join('; ')}. Offices: ${KB.offices.map(o=>o[0]+' — '+o[1]).join('; ')}.
Contact: ${KB.contact.body}`;
const TOPIC_MATCH=[
 [/mandal/i,()=>`Paderu ITDA has 11 Scheduled Area mandals. Historically these have included ${KB.area.mandals}`],
 [/pvtg|khond|gadaba|poorja/i,()=>`The three PVTGs in the Paderu Agency are Khonds (98,907), Gadaba (26,457) and Poorja (56,218) — total 1,81,582.`],
 [/super\s*50/i,()=>`Super 50 is a coaching programme for tribal SSC students. ${KB.super50.map(r=>r[0]+': '+r[1]).join(' ')}`],
 [/what is itda|about itda/i,()=>KB.about.en.body],
 [/department/i,()=>`Departments associated with ITDA Paderu include: ${KB.departments.join(', ')}.`],
 [/office\b|where is/i,()=>`Key offices: ${KB.offices.map(o=>o[0]).join('; ')}.`],
 [/coffee/i,()=>KB.coffee.body+' '+KB.coffee.office],
 [/health|nutrition/i,()=>KB.health.en.join('; ')+' '+KB.health.note],
 [/agricult|horticult/i,()=>`Agriculture: ${KB.agri.agriculture.join('; ')}. Horticulture: ${KB.agri.horticulture.join('; ')}.`],
 [/education|school|hostel|ashram/i,()=>KB.education.en.join('; ')],
 [/scheme/i,()=>`${KB.schemes.categories.join('; ')}. ${KB.schemes.note}`],
 [/officer|deputy director|project officer/i,()=>KB.officers.map(o=>o[0]+' — '+o[1]).join('; ')],
 [/forest/i,()=>KB.forest.join('; ')],
 [/infrastructure|road|bridge/i,()=>KB.infra.join('; ')],
 [/literacy|population/i,()=>KB.area.indicators.map(r=>r[0]+': '+r[1]).join('; ')]
];
function localAnswer(q){for(const[re,fn]of TOPIC_MATCH){if(re.test(q))return fn();}return null;}
function clearChat(){chatHistory=[];document.getElementById('chatWindow').innerHTML='';addBotMsg(ASTR[getLang()].welcome);}
function appendMsgDOM(role,text,src){
 const w=document.getElementById('chatWindow');if(!w)return;
 const d=document.createElement('div');d.className='msg '+role;
 d.innerHTML=text.replace(/\n/g,'<br>')+(src?`<div class="src">${src}</div>`:'');
 if(role==='bot'){const btn=document.createElement('button');btn.textContent=ASTR[getLang()].listen;
  btn.style.cssText='margin-top:6px;font-size:.72rem;background:none;border:1px solid #ccc;border-radius:12px;padding:3px 9px';
  btn.onclick=()=>speak(text);d.appendChild(btn);}
 w.appendChild(d);w.scrollTop=w.scrollHeight;
}
function addUserMsg(t){chatHistory.push({role:'user',text:t});appendMsgDOM('user',t);}
function addBotMsg(t,src){chatHistory.push({role:'bot',text:t,src});appendMsgDOM('bot',t,src);}
async function askText(q){
 const inp=document.getElementById('chatInput');if(inp)inp.value='';
 addUserMsg(q);
 const w=document.getElementById('chatWindow');
 const L=getLang();
 const typing=document.createElement('div');typing.className='typing';typing.textContent=L==='en'?'Assistant is typing…':'సహాయకుడు టైప్ చేస్తున్నారు…';
 w.appendChild(typing);w.scrollTop=w.scrollHeight;
 const useOllama=document.getElementById('useOllama')&&document.getElementById('useOllama').checked;
 let answer=null,src=L==='en'?'Source: ITDA Paderu knowledge base':'మూలం: knowledge base';
 if(useOllama){
  try{
   const base=document.getElementById('ollamaUrl').value.trim();
   const model=document.getElementById('ollamaModel').value.trim();
   const sysPrompt=`You are the ITDA Paderu information assistant. Answer ONLY using the knowledge base below. Never invent officer names, phone numbers, statistics or schemes. If the answer is not in the knowledge base, reply exactly: "${ASTR[L].notFound}"\n\nKNOWLEDGE BASE:\n${KB_TEXT_EN}`;
   const res=await fetch(base+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({model,messages:[{role:'system',content:sysPrompt},{role:'user',content:q}],stream:false})});
   const data=await res.json();answer=(data.message&&data.message.content)||null;
   src=L==='en'?'Source: Ollama ('+model+') grounded on ITDA knowledge base':'మూలం: Ollama';
  }catch(e){answer=null;src=L==='en'?'Ollama unreachable (check it is running with CORS enabled).':'Ollama అందుబాటులో లేదు.';}
 }
 if(!answer){answer=localAnswer(q)||ASTR[L].notFound;if(answer===ASTR[L].notFound)src=null;}
 typing.remove();addBotMsg(answer,src);
}
function sendChat(){const v=document.getElementById('chatInput').value.trim();if(v)askText(v);}
let recognition=null,recording=false;
function toggleMic(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){alert('Speech recognition not supported in this browser.');return;}
 const micBtn=document.getElementById('micBtn');
 if(recording){recognition&&recognition.stop();return;}
 recognition=new SR();recognition.lang=getLang()==='en'?'en-IN':'te-IN';
 recognition.onstart=()=>{recording=true;micBtn.classList.add('recording');};
 recognition.onend=()=>{recording=false;micBtn.classList.remove('recording');};
 recognition.onerror=()=>{recording=false;micBtn.classList.remove('recording');};
 recognition.onresult=(e)=>{document.getElementById('chatInput').value=e.results[0][0].transcript;};
 recognition.start();
}
function speak(text){
 if(!('speechSynthesis'in window)){alert('Text-to-speech not supported.');return;}
 window.speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);u.lang=getLang()==='en'?'en-IN':'te-IN';
 const voices=window.speechSynthesis.getVoices();
 const match=voices.find(v=>v.lang===u.lang)||voices.find(v=>v.lang.startsWith(getLang()));
 if(match)u.voice=match;window.speechSynthesis.speak(u);
}
function initAssistant(){
 const L=getLang();
 document.getElementById('assistantRoot').innerHTML=`
  <div class="grid-cards" style="grid-template-columns:1fr">
   <div class="card" style="border-left-color:var(--gold);padding:0;overflow:hidden">
    <div style="background:var(--forest-dark);color:#fff;padding:14px 20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
     <h3 style="color:#fff;margin:0">🤖 ${L==='en'?'ITDA Paderu AI Assistant':'ITDA పాడేరు AI సహాయకుడు'}</h3>
     <button onclick="clearChat()" style="background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:6px;padding:6px 10px;font-size:.8rem">${ASTR[L].clear}</button>
    </div>
    <div id="chatWindow" class="chat-window"></div>
    <div class="suggest-row">${ASTR[L].suggestions.map(q=>`<button type="button" onclick="askText('${q.replace(/'/g,"\\'")}')">${q}</button>`).join("")}</div>
    <div class="chat-bar">
     <input id="chatInput" placeholder="${ASTR[L].askPlaceholder}" onkeydown="if(event.key==='Enter')sendChat()">
     <button id="micBtn" type="button" onclick="toggleMic()" aria-label="Microphone">🎙️</button>
     <button type="button" onclick="sendChat()">${ASTR[L].send}</button>
    </div>
    <div class="ollama-row">
     Ollama: <input id="ollamaUrl" value="http://localhost:11434"> model
     <input id="ollamaModel" value="gpt-oss:120b">
     <label><input type="checkbox" id="useOllama"> ${L==='en'?'Use Ollama (needs local server + CORS)':'Ollama వాడండి'}</label>
    </div>
   </div>
  </div>`;
 setTimeout(()=>{
  addBotMsg(ASTR[L].welcome);
  const q=new URLSearchParams(location.search).get('q');
  if(q)askText(q);
 },200);
}
