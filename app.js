(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const STORAGE_KEY = "playnova_progress_v1";

  const worlds = [
    {id:"communication",name:"Communication",icon:"🗣️",color:"#30284f",tag:"Speak with confidence",desc:"Build English, conversation, listening and interview skills.",games:3},
    {id:"business",name:"Business",icon:"💼",color:"#263c4c",tag:"Think like a decision-maker",desc:"Make smart choices in business, customers and strategy.",games:2},
    {id:"analytics",name:"Analytics",icon:"📊",color:"#253b50",tag:"Turn data into insight",desc:"Practise data thinking, metrics and analytical reasoning.",games:2},
    {id:"operations",name:"Operations",icon:"⚙️",color:"#45352a",tag:"Make systems work better",desc:"Solve inventory, process and supply chain challenges.",games:2},
    {id:"finance",name:"Finance",icon:"💰",color:"#284437",tag:"Make money make sense",desc:"Learn budgeting, profit, percentages and financial basics.",games:2},
    {id:"technology",name:"Technology",icon:"💻",color:"#29334e",tag:"Understand the digital world",desc:"Explore logic, coding concepts and technology fundamentals.",games:2},
    {id:"general",name:"General Knowledge",icon:"🧠",color:"#47334a",tag:"Stay curious",desc:"Challenge your memory across science, geography and more.",games:2}
  ];

  const games = {
    communication: [
      {id:"english-arena",name:"English Arena",type:"Vocabulary & grammar",desc:"Choose the clearest and most natural way to communicate.",questions:[
        q("Choose the grammatically correct sentence.",["She don't like coffee.","She doesn't like coffee.","She doesn't likes coffee."],1,"Use “doesn't” with the base verb for he, she or it."),
        q("Which word is closest in meaning to “concise”? ",["Brief and clear","Loud and confident","Detailed and lengthy"],0,"Concise communication expresses an idea clearly in few words."),
        q("Choose the best professional email opening.",["Hey dude,","Dear Hiring Manager,","Yo there,"],1,"A polite, relevant greeting is a safe professional opening."),
        q("Complete the sentence: “I look forward ___ hearing from you.”",["for","to","at"],1,"The phrase is “look forward to” followed by a noun or -ing form."),
        q("Which sentence sounds most natural?",["Could you please clarify the deadline?","You tell deadline now.","What deadline you want?"],0,"Polite, specific questions help avoid misunderstandings.")
      ]},
      {id:"conversation-quest",name:"Conversation Quest",type:"Real-life conversations",desc:"Pick a thoughtful response in everyday situations.",questions:[
        q("A new colleague joins your team. What is a good way to start?",["Why are you here?","Hi, welcome! I'm glad to meet you. How's your first day going?","You look confused."],1,"A warm greeting and open question make it easier to connect."),
        q("Someone is explaining a problem. What should you do first?",["Interrupt with your solution.","Listen carefully and ask a clarifying question.","Change the topic."],1,"Active listening helps you understand before responding."),
        q("You didn't understand an instruction. What is the best response?",["Pretend you understood.","Could you explain that last step once more, please?","That's not clear."],1,"A respectful clarification prevents mistakes."),
        q("You disagree with a teammate. How should you respond?",["That's a stupid idea.","I see your point. Could we also consider another approach?","I don't care."],1,"Acknowledge their view, then explain your alternative respectfully."),
        q("You need to end a conversation politely.",["Anyway, bye.","It was great speaking with you. Thanks for your time.","I'm leaving."],1,"A warm close leaves a positive impression.")
      ]},
      {id:"interview-simulator",name:"Interview Simulator",type:"Career communication",desc:"Practise choosing strong, honest interview responses.",questions:[
        q("Interviewer: “Tell me about yourself.” Which approach works best?",["Share your life story from childhood.","Give a brief professional introduction, relevant skills and career direction.","Only say your name and stop."],1,"Keep it structured: present, relevant experience or education, strengths and direction."),
        q("You don't know the answer to a question. What should you do?",["Invent an answer confidently.","Admit it honestly and explain how you would find or learn the answer.","Blame the interviewer."],1,"Honesty and a learning mindset are stronger than bluffing."),
        q("“What is your weakness?” A good response should…",["Name a real development area and explain what you're doing to improve.","Say you have no weaknesses.","List many unrelated personal problems."],0,"Choose a genuine, manageable weakness and show concrete improvement."),
        q("You want to ask the interviewer a question. Which is strongest?",["How soon can I get promoted?","What would success look like in this role during the first few months?","Is the work easy?"],1,"This shows interest in expectations and performance."),
        q("You are asked about a project you worked on. What should you explain?",["Only the final grade.","The goal, your contribution, actions and outcome.","What your teammates did only."],1,"A clear example makes your contribution visible.")
      ]}
    ],
    business: [
      {id:"business-decisions",name:"Business Decisions",type:"Decision game",desc:"Make practical choices that keep a business healthy.",questions:[
        q("A product has revenue of ₹10,000 and total cost of ₹7,000. What is its profit?",["₹3,000","₹7,000","₹17,000"],0,"Profit = Revenue − Total Cost = ₹3,000."),
        q("Customer complaints are rising. What should a manager do first?",["Ignore them until sales fall.","Review complaint patterns and identify the root cause.","Immediately increase prices."],1,"Use evidence to find the cause before choosing a solution."),
        q("A business has limited funds. Which expense should it prioritise?",["An expense unrelated to its goals.","A necessary investment with a clear expected return.","Every expense equally."],1,"Prioritise spending based on impact, necessity and expected return."),
        q("What does customer retention mean?",["Getting existing customers to continue buying.","Reducing product quality.","Only finding new customers."],0,"Retention is about keeping customers over time."),
        q("Sales increased but profit decreased. What should you investigate?",["Costs, discounts and product mix.","Only the logo.","The office wall colour."],0,"Higher sales do not guarantee higher profit; investigate margins and costs.")
      ]},
      {id:"marketing-mind",name:"Marketing Mind",type:"Business basics",desc:"Understand customers, positioning and value.",questions:[
        q("What is a target market?",["Everyone in the world.","A specific group a business aims to serve.","Only the company's employees."],1,"A target market is the customer group a product is designed for."),
        q("What does a unique selling proposition explain?",["What makes an offer distinct and valuable.","The company's office location.","The employee attendance policy."],0,"A USP communicates a meaningful point of difference."),
        q("A customer compares two similar products. What can build preference?",["Clear value and relevant benefits.","More confusing information.","Hidden charges."],0,"Customers respond to relevant benefits and transparent value."),
        q("What is market research used for?",["Understanding customers and market conditions.","Choosing random prices.","Avoiding customer feedback."],0,"Research reduces uncertainty and supports better decisions."),
        q("A campaign gets many views but few purchases. What should you check?",["Conversion journey and audience fit.","Only the number of colours.","The office seating plan."],0,"Views are attention; conversion analysis helps explain purchase behaviour.")
      ]}
    ],
    analytics: [
      {id:"data-detective",name:"Data Detective",type:"Data reasoning",desc:"Read simple business data and find the story.",questions:[
        q("A store sold 20, 25 and 30 units over three days. What is the average?",["25","30","75"],0,"Average = (20 + 25 + 30) ÷ 3 = 25."),
        q("Which chart is usually best for comparing sales across categories?",["Bar chart","Pie chart with 30 slices","Scatter plot without labels"],0,"Bar charts make category comparisons easy."),
        q("A dataset contains duplicate customer IDs. What should you do?",["Check and handle duplicates before analysis.","Add more duplicates.","Ignore data quality."],0,"Duplicates can distort counts and totals."),
        q("What does KPI stand for?",["Key Performance Indicator","Known Product Inventory","Key Process Input"],0,"A KPI measures progress toward an important objective."),
        q("Website visits rise but orders stay flat. Which metric is useful?",["Conversion rate","Office rent","Employee birthdays"],0,"Conversion rate connects visits to completed actions.")
      ]},
      {id:"sql-starter",name:"SQL Starter",type:"Database logic",desc:"Build confidence with database fundamentals.",questions:[
        q("Which SQL command retrieves data from a table?",["SELECT","DELETE","DROP"],0,"SELECT is used to retrieve rows and columns."),
        q("Which clause filters rows?",["WHERE","ORDER BY","FROM"],0,"WHERE applies conditions to filter records."),
        q("What does COUNT(*) return?",["Number of rows","Sum of all prices","Alphabetical order"],0,"COUNT(*) counts rows in the result."),
        q("Which keyword sorts results?",["ORDER BY","GROUP INTO","FILTER"],0,"ORDER BY sorts results by one or more columns."),
        q("Which join returns matching rows from both tables?",["INNER JOIN","CROSS DELETE","ONLY JOIN"],0,"INNER JOIN keeps rows with matching join keys.")
      ]}
    ],
    operations: [
      {id:"inventory-hero",name:"Inventory Hero",type:"Operations challenge",desc:"Make sensible stock decisions.",questions:[
        q("Demand is 100 units per week and lead time is 2 weeks. Ignoring safety stock, reorder point is…",["200 units","50 units","100 units"],0,"Reorder point = demand during lead time = 100 × 2."),
        q("What is the main purpose of safety stock?",["Buffer against demand or supply uncertainty.","Increase paperwork.","Replace forecasting."],0,"Safety stock helps protect against uncertainty and delays."),
        q("A fast-moving item is frequently out of stock. What should you review?",["Reorder point, lead time and demand pattern.","The colour of the shelf.","Only the supplier logo."],0,"Stock parameters should reflect demand and replenishment realities."),
        q("What does FIFO mean?",["First In, First Out","Fast Inventory For Orders","Final Input, Final Output"],0,"FIFO assumes the oldest inventory is issued first."),
        q("Which metric measures how often inventory is sold and replaced?",["Inventory turnover","Employee turnover","Net promoter score"],0,"Inventory turnover relates cost of goods sold to average inventory.")
      ]},
      {id:"process-fixer",name:"Process Fixer",type:"Process improvement",desc:"Spot waste and improve a workflow.",questions:[
        q("A process has repeated unnecessary movement. What type of waste is this?",["Motion","Overproduction","Defects"],0,"Unnecessary movement by people or equipment is motion waste."),
        q("What is a bottleneck?",["The step limiting overall process throughput.","The fastest process step.","A finished product."],0,"A bottleneck constrains the capacity of the whole process."),
        q("Why map a process before improving it?",["To understand steps, handoffs and delays.","To make the process look complicated.","To avoid collecting facts."],0,"A process map makes the current workflow visible."),
        q("What does 5S help improve?",["Workplace organisation","Product advertising","Financial auditing"],0,"5S supports an organised, clean and standardised workplace."),
        q("A team wants to reduce errors. What is a sensible first step?",["Measure and identify where errors occur.","Guess who is responsible.","Stop recording errors."],0,"Baseline data helps locate and understand the problem.")
      ]}
    ],
    finance: [
      {id:"money-basics",name:"Money Basics",type:"Financial literacy",desc:"Practise everyday money maths.",questions:[
        q("What is 10% of ₹2,500?",["₹250","₹25","₹500"],0,"10% is one-tenth: ₹2,500 ÷ 10 = ₹250."),
        q("You earn ₹20,000 and save ₹4,000. What percentage do you save?",["20%","40%","10%"],0,"Savings rate = 4,000 ÷ 20,000 × 100 = 20%."),
        q("What is a budget?",["A plan for income and spending.","A type of bank card.","A guaranteed investment return."],0,"A budget helps plan and track money."),
        q("If cost is ₹80 and selling price is ₹100, gross profit is…",["₹20","₹80","₹180"],0,"Gross profit = selling price − cost = ₹20."),
        q("Why is an emergency fund useful?",["It helps cover unexpected expenses.","It guarantees high returns.","It removes every financial risk."],0,"An emergency fund provides a financial buffer.")
      ]},
      {id:"profit-puzzle",name:"Profit Puzzle",type:"Business maths",desc:"Solve quick revenue, cost and margin problems.",questions:[
        q("Revenue is ₹50,000 and cost is ₹35,000. Profit margin on revenue is…",["30%","15%","70%"],0,"Profit = ₹15,000. Margin = 15,000 ÷ 50,000 × 100 = 30%."),
        q("A ₹1,000 item gets a 10% discount. New price?",["₹900","₹990","₹910"],0,"10% of ₹1,000 is ₹100, so the new price is ₹900."),
        q("If fixed cost rises while sales stay the same, profit usually…",["Decreases","Increases","Stays guaranteed"],0,"Higher costs reduce profit when revenue is unchanged."),
        q("What is compound interest?",["Interest earned on principal and accumulated interest.","A flat fee only.","A discount on purchases."],0,"Compound interest means interest can earn further interest."),
        q("Which is generally a safer habit?",["Track spending and plan savings.","Spend first and hope.","Ignore loan terms."],0,"Awareness and planning support better money decisions.")
      ]}
    ],
    technology: [
      {id:"tech-logic",name:"Tech Logic",type:"Digital fundamentals",desc:"Understand the logic behind everyday technology.",questions:[
        q("What does a web browser do?",["Accesses and displays web pages.","Repairs computer hardware.","Creates electricity."],0,"Browsers request and display web content."),
        q("What is a variable in programming?",["A named place to store a value.","A computer screen.","A type of keyboard."],0,"Variables hold values that a program can use."),
        q("What does HTML mainly define?",["Structure of a web page","Internet speed","Computer battery health"],0,"HTML provides the structure and content of web pages."),
        q("Which is a strong password practice?",["Use long, unique passwords.","Reuse one short password everywhere.","Share passwords in public."],0,"Long, unique passwords reduce the impact of account compromise."),
        q("What is debugging?",["Finding and fixing errors in code.","Deleting all files.","Increasing screen brightness."],0,"Debugging is the process of locating and resolving defects.")
      ]},
      {id:"web-builder",name:"Web Builder",type:"Web basics",desc:"Learn the building blocks of websites.",questions:[
        q("Which technology styles a web page?",["CSS","HTML only","SQL"],0,"CSS controls presentation, layout and visual styling."),
        q("Which language adds interactivity in a browser?",["JavaScript","PNG","CSV"],0,"JavaScript can respond to user actions and update a page."),
        q("What does responsive design mean?",["A layout adapts to different screen sizes.","A page always uses a fixed width.","A page only works on phones."],0,"Responsive layouts adapt to mobile, tablet and desktop screens."),
        q("What is a Git commit?",["A recorded set of changes.","A website domain.","A design colour."],0,"A commit records a snapshot of repository changes."),
        q("What is an API commonly used for?",["Allowing software systems to communicate.","Making a monitor brighter.","Compressing every image."],0,"APIs define ways for systems to exchange data or functionality.")
      ]}
    ],
    general: [
      {id:"curiosity-circuit",name:"Curiosity Circuit",type:"Mixed knowledge",desc:"A quick round of useful facts.",questions:[
        q("Which planet is known as the Red Planet?",["Mars","Venus","Jupiter"],0,"Iron-rich dust gives Mars its reddish appearance."),
        q("What is the largest ocean on Earth?",["Pacific Ocean","Indian Ocean","Arctic Ocean"],0,"The Pacific is the largest and deepest ocean."),
        q("Which gas do plants absorb during photosynthesis?",["Carbon dioxide","Oxygen","Helium"],0,"Plants use carbon dioxide, water and light to make sugars."),
        q("How many sides does a hexagon have?",["6","5","8"],0,"A hexagon has six sides."),
        q("What is the capital of Japan?",["Tokyo","Kyoto","Osaka"],0,"Tokyo is Japan's capital.")
      ]},
      {id:"memory-mix",name:"Memory Mix",type:"Quick recall",desc:"Strengthen recall with general knowledge.",questions:[
        q("Which instrument measures temperature?",["Thermometer","Barometer","Compass"],0,"A thermometer measures temperature."),
        q("Which is a mammal?",["Dolphin","Shark","Octopus"],0,"Dolphins are warm-blooded mammals that breathe air."),
        q("What is the chemical symbol for water?",["H₂O","CO₂","O₂"],0,"A water molecule contains two hydrogen atoms and one oxygen atom."),
        q("Which continent is the Sahara Desert in?",["Africa","Asia","South America"],0,"The Sahara is in northern Africa."),
        q("How many minutes are in two hours?",["120","100","90"],0,"Two hours × 60 minutes = 120 minutes.")
      ]}
    ]
  };

  function q(prompt, options, answer, explain){ return {prompt,options,answer,explain}; }
  let state = loadState();
  let activeGame = null, questionIndex = 0, score = 0, answered = false, selectedWorld = null;
  function loadState(){
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {xp:Number(saved.xp)||0,games:Number(saved.games)||0,streak:Number(saved.streak)||0,lastDay:saved.lastDay||"",activity:Array.isArray(saved.activity)?saved.activity:[]};
    } catch(e){ return {xp:0,games:0,streak:0,lastDay:"",activity:[]}; }
  }
  function save(){ try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){showToast("Could not save progress in this browser.");} }
  function today(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;}
  function updateStreak(){
    const now=today();
    if(state.lastDay===now)return;
    if(state.lastDay){
      const prev=new Date(state.lastDay.replace(/(\d+)-(\d+)-(\d+)/,"$1-$2-$3"));
      const cur=new Date(); const diff=Math.floor((new Date(cur.getFullYear(),cur.getMonth(),cur.getDate())-new Date(prev.getFullYear(),prev.getMonth(),prev.getDate()))/86400000);
      state.streak=diff===1?state.streak+1:1;
    }else state.streak=1;
    state.lastDay=now;
  }
  function level(){return Math.floor(state.xp/100)+1;}
  function renderStats(){
    const xp=state.xp, lvl=level();
    ["#top-xp","#side-xp","#metric-xp","#progress-xp"].forEach(s=>{const el=$(s);if(el)el.textContent=s==="#metric-xp"?xp:xp+" XP";});
    $("#streak").textContent=state.streak+" day"+(state.streak===1?"":"s")+" streak";
    $("#metric-games").textContent=state.games;$("#metric-level").textContent=lvl;$("#big-level").textContent=lvl;
    $("#level-caption").textContent=lvl===1?"Getting started":lvl>=5?"Learning legend":"Keep building momentum";
    $("#progress-games").textContent=state.games;$("#progress-streak").textContent=state.streak+" days";
    const progress=xp%100;$("#level-fill").style.width=progress+"%";
    $("#next-level-text").textContent=(100-progress)+" XP to level "+(lvl+1);
    renderActivity();
  }
  function renderActivity(){
    const el=$("#activity-list");
    if(!state.activity.length){el.innerHTML='<div class="empty-state">No games completed yet. Your first win is waiting.</div>';return;}
    el.innerHTML=state.activity.slice(0,8).map(a=>`<div class="activity-item"><div><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.world)} · ${escapeHtml(a.date)}</small></div><span class="activity-xp">+${a.xp} XP</span></div>`).join("");
  }
  function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function worldCard(w){
    return `<article class="world-card"><div class="world-icon" style="background:${w.color}">${w.icon}</div><h3>${w.name}</h3><p>${w.desc}</p><div class="world-foot"><span>${games[w.id].length} games · ${w.tag}</span><button data-open-world="${w.id}">Explore →</button></div></article>`;
  }
  function renderWorlds(){
    $("#featured-worlds").innerHTML=worlds.slice(0,3).map(worldCard).join("");
    $("#all-worlds").innerHTML=worlds.map(worldCard).join("");
  }
  function showView(name){
    $$(".view").forEach(v=>v.classList.toggle("active",v.id===name+"-view"));
    $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
    $("#breadcrumb").innerHTML=`YOUR LEARNING HUB <span>/</span> ${name.toUpperCase()}`;
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function openWorld(id){
    selectedWorld=worlds.find(w=>w.id===id);if(!selectedWorld)return;
    showView("worlds");
    $("#all-worlds").innerHTML=`<div class="world-card" style="grid-column:1/-1;min-height:auto"><div class="eyebrow">SELECTED WORLD</div><h2 style="font:600 23px 'Space Grotesk';margin:12px 0">${selectedWorld.icon} ${selectedWorld.name}</h2><p>${selectedWorld.desc}</p></div>`+
      games[id].map(g=>`<article class="world-card"><div class="eyebrow">${g.type.toUpperCase()}</div><h3 style="margin-top:15px">${g.name}</h3><p>${g.desc}</p><div class="world-foot"><span>5 questions · Earn up to 50 XP</span><button data-start-game="${id}|${g.id}">Play now →</button></div></article>`).join("");
    $("#breadcrumb").innerHTML=`YOUR LEARNING HUB <span>/</span> ${selectedWorld.name.toUpperCase()}`;
  }
  function startGame(worldId,gameId){
    const game=(games[worldId]||[]).find(g=>g.id===gameId);if(!game)return;
    activeGame={...game,worldId};questionIndex=0;score=0;answered=false;
    $("#game-world-label").textContent=selectedWorld?.name.toUpperCase()||worlds.find(w=>w.id===worldId).name.toUpperCase();
    showView("game");renderQuestion();
  }
  function renderQuestion(){
    const g=activeGame, item=g.questions[questionIndex], total=g.questions.length;
    $("#game-counter").textContent=`QUESTION ${questionIndex+1} / ${total}`;
    $("#game-progress-fill").style.width=(questionIndex/total*100)+"%";
    $("#game-content").innerHTML=`<div class="eyebrow">${g.type.toUpperCase()}</div><h2 class="game-title">${g.name}</h2><p class="game-instruction">${g.desc}</p><div class="question-text">${questionIndex+1}. ${item.prompt}</div><div class="answer-list">${item.options.map((o,i)=>`<button class="answer-option" data-answer="${i}"><strong>${String.fromCharCode(65+i)}.</strong> &nbsp;${o}</button>`).join("")}</div><div id="feedback-slot"></div><div class="game-controls"><span class="muted">⚡ +10 XP for each correct answer</span><button class="primary-btn" id="next-question" disabled>${questionIndex===total-1?"Finish game":"Next question"} →</button></div>`;
    $$("#game-content [data-answer]").forEach(b=>b.addEventListener("click",()=>answer(Number(b.dataset.answer))));
    $("#next-question").addEventListener("click",()=>{if(!answered)return;if(questionIndex<g.questions.length-1){questionIndex++;answered=false;renderQuestion();}else finishGame();});
  }
  function answer(choice){
    if(answered)return;answered=true;
    const item=activeGame.questions[questionIndex], correct=choice===item.answer;
    if(correct)score++;
    $$("#game-content [data-answer]").forEach((b,i)=>{b.disabled=true;if(i===item.answer)b.classList.add("correct");else if(i===choice&&!correct)b.classList.add("wrong");});
    $("#feedback-slot").innerHTML=`<div class="feedback ${correct?"good":"bad"}"><strong>${correct?"Correct! Nice work.":"Not quite — keep learning."}</strong><br>${item.explain}</div>`;
    $("#next-question").disabled=false;
  }
  function finishGame(){
    const earned=score*10;state.xp+=earned;state.games+=1;updateStreak();
    const world=worlds.find(w=>w.id===activeGame.worldId);
    state.activity.unshift({name:activeGame.name,world:world.name,xp:earned,date:new Date().toLocaleDateString()});
    state.activity=state.activity.slice(0,20);save();renderStats();
    $("#game-progress-fill").style.width="100%";$("#game-counter").textContent="CHALLENGE COMPLETE";
    $("#game-content").innerHTML=`<div class="game-result"><div class="result-icon">${score>=4?"🏆":"🌱"}</div><div class="eyebrow">CHALLENGE COMPLETE</div><h2>${score>=4?"Brilliant effort!":"Good effort. Keep going!"}</h2><div class="result-score">${score}/${activeGame.questions.length}</div><p>You answered ${score} correctly and earned <strong style="color:#8ce4bd">${earned} XP</strong>.<br>${score===5?"Perfect round. You've mastered this set!":"Review the explanations and try again to improve your score."}</p><div class="result-actions"><button class="outline-btn" id="replay-game">Play again</button><button class="primary-btn" id="result-world">Back to games →</button></div></div>`;
    $("#replay-game").addEventListener("click",()=>startGame(activeGame.worldId,activeGame.id));
    $("#result-world").addEventListener("click",()=>openWorld(activeGame.worldId));
    showToast("+"+earned+" XP added to your progress!");
  }
  let toastTimer;
  function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2300);}
  document.addEventListener("click",e=>{
    const viewBtn=e.target.closest("[data-view]");if(viewBtn){showView(viewBtn.dataset.view);return;}
    const worldBtn=e.target.closest("[data-world]");if(worldBtn){openWorld(worldBtn.dataset.world);return;}
    const openBtn=e.target.closest("[data-open-world]");if(openBtn){openWorld(openBtn.dataset.openWorld);return;}
    const startBtn=e.target.closest("[data-start-game]");if(startBtn){const [w,g]=startBtn.dataset.startGame.split("|");startGame(w,g);return;}
  });
  $("#explore-btn").addEventListener("click",()=>showView("worlds"));
  $("#daily-btn").addEventListener("click",()=>{const w=worlds[Math.floor(Math.random()*worlds.length)];openWorld(w.id);showToast("Your surprise challenge is ready!");});
  $("#back-world").addEventListener("click",()=>openWorld(activeGame?.worldId||"communication"));
  renderWorlds();renderStats();
})();