const screens = {
  intro: document.getElementById('intro'),
  quiz: document.getElementById('quiz'),
  results: document.getElementById('results'),
  review: document.getElementById('review')
};
let current = 0;
let answers = Array.from({length: QUIZ_DATA.length}, () => []);

function showScreen(name){
  Object.values(screens).forEach(el => el.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderQuestion(){
  const q = QUIZ_DATA[current];
  document.getElementById('progressLabel').textContent = `${current+1} iš ${QUIZ_DATA.length}`;
  document.getElementById('progressBar').style.width = `${((current+1)/QUIZ_DATA.length)*100}%`;
  document.getElementById('questionNumber').textContent = `Situacija ${q.id}`;
  document.getElementById('questionTitle').textContent = q.title;
  document.getElementById('questionSituation').textContent = q.situation;
  document.getElementById('questionError').textContent = '';
  document.getElementById('backBtn').style.visibility = current === 0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').textContent = current === QUIZ_DATA.length-1 ? 'Pamatyti rezultatą →' : 'Tęsti →';
  const options = document.getElementById('options');
  options.innerHTML = '';
  Object.entries(q.options).forEach(([key,text]) => {
    const label = document.createElement('label');
    label.className = 'option' + (answers[current].includes(key) ? ' selected' : '');
    const input = document.createElement('input');
    input.type = 'checkbox'; input.value = key; input.checked = answers[current].includes(key);
    const letter = document.createElement('span'); letter.className='option-letter'; letter.textContent=key;
    const span = document.createElement('span'); span.className='option-text'; span.textContent=text;
    input.addEventListener('change',()=>{
      if(input.checked){ if(!answers[current].includes(key)) answers[current].push(key); label.classList.add('selected'); }
      else{ answers[current]=answers[current].filter(v=>v!==key); label.classList.remove('selected'); }
      document.getElementById('questionError').textContent='';
    });
    label.append(input,letter,span); options.appendChild(label);
  });
}

function scoreQuestion(q, selected){
  const picked = new Set(selected);
  const correct = new Set(q.correct);
  let correctSelected = 0, wrongSelected = 0;
  picked.forEach(v => correct.has(v) ? correctSelected++ : wrongSelected++);
  const earned = (4 * correctSelected / correct.size) - (2 * wrongSelected);
  return Math.max(0, Math.min(4, Math.round(earned)));
}

function calculate(){
  const categoryScores = Object.fromEntries(CATEGORY_ORDER.map(c=>[c,0]));
  let total=0;
  QUIZ_DATA.forEach((q,i)=>{const s=scoreQuestion(q,answers[i]);total+=s;categoryScores[q.category]+=s;});
  return {total,categoryScores};
}

function bandForCategory(score){ if(score<=4)return'low'; if(score<=8)return'mid'; return'high'; }

function overallCopy(score){
  if(score<=20)return{title:'Daug vietos smalsiai refleksijai',text:'Šio testo situacijose tavo pasirinkimuose dažniau matyti greitas problemos sprendimas, sprendimų perėmimas arba orientacija į rezultatą, mažiau dėmesio skiriant įtraukimui ir susitarimui. Tai nėra tavo asmenybės įvertinimas – tai tik kvietimas pasižiūrėti, kokius veikimo būdus rinkaisi čia.'};
  if(score<=35)return{title:'Dalį principų atpažįsti, dalį verta dar pasitikrinti',text:'Dalyje situacijų rinkaisi bendradarbiavimą ir aiškius susitarimus, tačiau sudėtingesnėse aplinkybėse pasitaikė daugiau kontrolės, skubėjimo ar sprendimo už kitą žmogų. Daugiausia vertės duos žemiausiai įvertintos srities peržiūra.'};
  if(score<=48)return{title:'Dauguma pasirinkimų atitinka bendradarbiavimo principus',text:'Daugelyje situacijų atpažinai pagarbą, įtraukimą, aiškius susitarimus ir atsakomybės ribas. Dabar verta pasižiūrėti, kurioje iš penkių sričių tavo rezultatas žemiausias ir kas ten buvo sunkiausia.'};
  return{title:'Šiuos principus atpažįsti labai dažnai',text:'Šio testo situacijose tavo pasirinkimai labai dažnai atitiko aiškios atsakomybės, pagarbos, įtraukimo ir savarankiškumo principus. Aukštas balas nėra etiketė ar įrodymas, kaip visada elgiesi realybėje – tik ženklas, kad šias kryptis gerai atpažįsti.'};
}

function reflectionFor(categoryScores){
  const min = Math.min(...Object.values(categoryScores));
  const lowest = CATEGORY_ORDER.filter(c=>categoryScores[c]===min);
  const prompts={
    'Skaidrumas ir sprendimų aiškumas':'Ar žmonėms paprastai aišku ne tik kas nuspręsta, bet ir kas, kaip bei kodėl priėmė sprendimą?',
    'Psichologinis saugumas ir įtraukimas':'Ar žmogus šalia tavęs gali pasakyti „aš nesutinku“ nebijodamas būti sumenkintas ar atstumtas?',
    'Koordinavimas ir vaidmenų derinimas':'Ar pirmiausia paklausi žmogaus, o tik tada tariiesi dėl jo vaidmens?',
    'Atsakomybė ir proceso kontrolė':'Kai susitarimas neįvykdomas, ar tikrini procesą ir ribas, ar pradedi kontroliuoti žmogų?',
    'Refleksija, konfliktų sprendimas ir mokymasis':'Ar po patirties sustoji suprasti, kas įvyko ir ką kitą kartą sąmoningai darysi kitaip?'
  };
  if(lowest.length===1) return prompts[lowest[0]];
  return `Vienodai žemiausi balai keliose srityse: ${lowest.join(', ')}. Pasirink vieną iš jų ir paklausk savęs: „Ką vieną šioje srityje norėčiau kitą kartą daryti sąmoningiau?“`;
}

function renderResults(){
  const {total,categoryScores}=calculate();
  document.getElementById('totalScore').textContent=total;
  const deg=(total/60)*360;
  document.querySelector('.score-circle').style.background=`conic-gradient(var(--green2) ${deg}deg,#e8eee9 ${deg}deg)`;
  const overall=overallCopy(total);
  document.getElementById('overallTitle').textContent=overall.title;
  document.getElementById('overallText').textContent=overall.text;
  document.getElementById('reflectionPrompt').textContent=reflectionFor(categoryScores);
  const wrap=document.getElementById('categoryResults');wrap.innerHTML='';
  CATEGORY_ORDER.forEach(category=>{
    const score=categoryScores[category],band=bandForCategory(score);
    const card=document.createElement('article');card.className='category-card';
    card.innerHTML=`<div class="category-top"><h3>${category}</h3><span class="category-score">${score}/12</span></div><div class="meter"><div style="width:${(score/12)*100}%"></div></div><p>${CATEGORY_DESCRIPTIONS[category][band]}</p>`;
    wrap.appendChild(card);
  });
}

function renderReview(){
  const list=document.getElementById('reviewList');list.innerHTML='';
  QUIZ_DATA.forEach((q,i)=>{
    const selected=answers[i],score=scoreQuestion(q,selected),correct=new Set(q.correct),picked=new Set(selected);
    let statusClass='low',statusText=`${score}/4 – verta apsvarstyti kitą perspektyvą`;
    if(score===4){statusClass='full';statusText='4/4 – pasirinkimai visiškai sutapo';}
    else if(score>=2){statusClass='partial';statusText=`${score}/4 – dalinis sutapimas`;}
    const choices=Object.entries(q.options).map(([key,text])=>{
      const isCorrect=correct.has(key),isPicked=picked.has(key);
      let cls='neutral',prefix='○';
      if(isCorrect&&isPicked){cls='good';prefix='✓';}
      else if(isCorrect&&!isPicked){cls='missed';prefix='↳';}
      else if(!isCorrect&&isPicked){cls='bad';prefix='×';}
      const pickedText=isPicked?' Tavo pasirinkimas.':'';
      const principleText=isCorrect?' Šios priemonės principais labiau atitinkantis variantas.':'';
      return `<div class="choice-line ${cls}"><strong>${prefix} ${key}.</strong> ${text}<span>${pickedText}${principleText}</span></div>`;
    }).join('');
    const item=document.createElement('article');item.className='review-item';
    item.innerHTML=`<h3>${q.id}. ${q.title}</h3><p class="small-situation">${q.situation}</p><span class="review-status ${statusClass}">${statusText}</span><div class="choice-list">${choices}</div><div class="explanation"><strong>Kodėl?</strong> ${q.explanation}</div>`;
    list.appendChild(item);
  });
}

document.getElementById('startBtn').addEventListener('click',()=>{current=0;renderQuestion();showScreen('quiz');});
document.getElementById('nextBtn').addEventListener('click',()=>{
  if(answers[current].length===0){document.getElementById('questionError').textContent='Pasirink bent vieną variantą.';return;}
  if(current<QUIZ_DATA.length-1){current++;renderQuestion();window.scrollTo({top:0,behavior:'smooth'});}
  else{renderResults();showScreen('results');}
});
document.getElementById('backBtn').addEventListener('click',()=>{if(current>0){current--;renderQuestion();}});
document.getElementById('reviewBtn').addEventListener('click',()=>{renderReview();showScreen('review');});
document.getElementById('resultsBackBtn').addEventListener('click',()=>showScreen('results'));
document.getElementById('restartBtn').addEventListener('click',()=>{
  if(!confirm('Pradėti iš naujo? Dabartiniai pasirinkimai bus išvalyti.'))return;
  answers=Array.from({length:QUIZ_DATA.length},()=>[]);current=0;renderQuestion();showScreen('quiz');
});
