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


  // Interactive activities: these use simulations, writing and decision-making rather than MCQ quizzes.
  const activities = {
    communication: [
      {id:"client-roleplay",name:"Client Conversation",type:"Branching role-play",desc:"Handle a realistic client conversation. Your choices shape the outcome.",mode:"roleplay",
       scenes:[
        {speaker:"Client",line:"“The delivery is late, and this has disrupted our schedule. What is happening?”",choices:[
          {label:"“That's not our problem. Contact the courier.”",score:0,reply:"The client feels dismissed and trust drops."},
          {label:"“I’m sorry for the disruption. Let me check the latest status and give you a clear update.”",score:2,reply:"The client appreciates the ownership and clear next step."},
          {label:"“It will arrive soon, don't worry.”",score:1,reply:"The reassurance is vague because you have not checked the facts."}]},
        {speaker:"Client",line:"“Can you guarantee it will arrive in the next hour?”",choices:[
          {label:"“Yes, definitely.”",score:0,reply:"You made a promise without confirming it."},
          {label:"“I don't want to guess. I'll confirm with the delivery team and update you by 3 PM.”",score:2,reply:"You set a realistic expectation and a specific update time."},
          {label:"“Maybe. I can't say.”",score:1,reply:"Honest, but it needs a concrete follow-up."}]},
        {speaker:"Client",line:"“Fine. What will you do if it cannot arrive today?”",choices:[
          {label:"“I'll check the available alternatives and explain the options before you decide.”",score:2,reply:"You offer options and keep the client involved."},
          {label:"“You'll have to wait.”",score:0,reply:"The response offers no support or path forward."},
          {label:"“I'll ask my manager.”",score:1,reply:"Escalation may help, but explain what you will do next."}]}
       ]},
      {id:"email-workshop",name:"Professional Email Workshop",type:"Writing challenge",desc:"Write a short, clear email and get practical feedback.",mode:"writing",
       prompt:"Your project teammate has not shared the weekly report. Write a polite email asking them to send it by 4 PM today. Include a subject, a courteous opening and a clear request."},
      {id:"meeting-mission",name:"Meeting Room Mission",type:"Conversation practice",desc:"Practise contributing clearly in a team meeting.",mode:"roleplay",
       scenes:[
        {speaker:"Team lead",line:"“We have five minutes left. Does anyone have an update on the delivery-delay analysis?”",choices:[
          {label:"“I reviewed the data. Delays are concentrated in two routes; I'll share the breakdown and proposed next steps.”",score:2,reply:"Clear, concise and action-oriented."},
          {label:"“Everything is complicated, actually.”",score:0,reply:"The team still does not know what you found."},
          {label:"“I don't have anything.”",score:1,reply:"If you have work in progress, share what is known and what remains."}]},
        {speaker:"Team lead",line:"“What do you recommend we do first?”",choices:[
          {label:"“Let's validate the route-level pattern, then test one targeted improvement for a week.”",score:2,reply:"A measurable next step makes the recommendation actionable."},
          {label:"“We should fix everything immediately.”",score:0,reply:"The suggestion is too broad to execute."},
          {label:"“Maybe we can try something.”",score:1,reply:"Add a specific action and a way to measure it."}]}
       ]}
    ],
    operations: [
      {id:"stock-control",name:"Stock Control Simulator",type:"Operations simulation",desc:"Choose a reorder quantity while balancing stockout and holding risk.",mode:"inventory",
       demand:80,stock:35,lead:2,safety:20,choices:[40,100,160,220]},
      {id:"process-flow",name:"Process Flow Challenge",type:"Process simulation",desc:"Choose the best improvement for a small fulfilment workflow.",mode:"process",
       steps:[
        {title:"Orders are waiting at packing",detail:"Picking takes 4 minutes per order. Packing takes 9 minutes. Dispatch takes 3 minutes.",choices:[
          {label:"Add more dispatch staff",score:0,why:"Dispatch is not the slowest step; extra capacity there will not remove the main constraint."},
          {label:"Investigate and improve packing capacity",score:2,why:"Packing is the bottleneck at 9 minutes per order, so improving it can increase flow."},
          {label:"Increase the number of order forms",score:0,why:"More paperwork does not increase the constrained process capacity."}]},
        {title:"Packing errors are increasing",detail:"Most errors happen when similar-looking products are stored together.",choices:[
          {label:"Use clearer shelf labels and separate look-alike items",score:2,why:"Visual controls and better organisation reduce selection mistakes."},
          {label:"Tell staff to work faster",score:0,why:"Speed pressure does not address the confusing storage layout."},
          {label:"Stop recording errors",score:0,why:"Removing measurement hides the issue rather than fixing it."}]}
       ]}
    ],
    analytics: [
      {id:"data-investigator",name:"Data Investigator",type:"Data interpretation",desc:"Inspect a small dataset and make a business recommendation.",mode:"data",
       rows:[{route:"North",orders:120,late:18},{route:"South",orders:100,late:8},{route:"East",orders:80,late:20},{route:"West",orders:150,late:15}]},
      {id:"formula-builder",name:"Formula Builder",type:"Hands-on spreadsheet logic",desc:"Build the formula that answers a practical spreadsheet question.",mode:"formula",
       prompt:"In Excel, cell B2 contains the region name and columns C contain sales. Which formula adds sales for the region named in B2, using region names in A2:A20 and sales in C2:C20?",
       answer:"=SUMIF(A2:A20,B2,C2:C20)",accepted:["=sumif(a2:a20,b2,c2:c20)","=sumifs(c2:c20,a2:a20,b2)"]}
    ],
    finance: [
      {id:"monthly-budget",name:"Monthly Budget Planner",type:"Budget simulation",desc:"Allocate a monthly income across needs, wants and savings.",mode:"budget",income:30000,
       categories:[{name:"Essentials",min:15000},{name:"Savings",min:5000},{name:"Learning",min:1000},{name:"Lifestyle",min:0}]}
    ],
    technology: [
      {id:"debugger",name:"Bug Hunter",type:"Debugging challenge",desc:"Find the issue in a small code snippet and choose a fix.",mode:"debug",
       code:"let total = 0;\\nfor (let i = 1; i <= 5; i++) {\\n  total = i;\\n}\\nconsole.log(total);",
       question:"The code should calculate the sum from 1 to 5. What needs to change?",
       choices:[{label:"Change total = i to total += i",score:2,why:"The += operator accumulates each loop value."},{label:"Change i <= 5 to i < 5",score:0,why:"That would skip 5 and still overwrite total."},{label:"Change let to const",score:0,why:"The loop needs to update total, so const is not appropriate."}]}
    ],
    business: [
      {id:"pricing-lab",name:"Pricing Lab",type:"Business simulation",desc:"Set a price and see how your decision affects revenue and profit.",mode:"pricing",
       unitCost:120,demandBase:100,prices:[150,180,210,240]}
    ],
    general: [
      {id:"route-planner",name:"Route Planner",type:"Decision puzzle",desc:"Choose a sensible route based on time and distance trade-offs.",mode:"route",
       choices:[{label:"A: 8 km, usually 30 minutes",score:2,why:"This is the shortest reliable option."},{label:"B: 5 km, usually 45 minutes due to traffic",score:1,why:"Shorter distance does not mean faster travel."},{label:"C: 12 km, usually 25 minutes on a clear road",score:1,why:"It may be fastest in ideal conditions, but the travel time is less predictable."}]}
    ]
  };


  // PLAYNOVA 3.0: deeper practice tools and simulations.
  activities.communication.push(
    {id:"voice-coach",name:"SpeakUp Voice Coach",type:"Voice practice studio",desc:"Practise speaking aloud, listen back and get structured feedback. Speech recognition depends on browser support.",mode:"voice",
      prompts:[
        "Introduce yourself in 45–60 seconds. Mention what you are studying or working on, one strength and what you want to learn next.",
        "Explain a time you solved a problem. Describe the situation, what you did and the result.",
        "A customer is upset about a delay. Explain how you would respond professionally."
      ]},
    {id:"mock-interview",name:"Mock Interview Arena",type:"Interview simulation",desc:"Answer realistic interview questions in your own words. Use typing or your microphone.",mode:"interview",
      prompts:[
        {q:"Tell me about yourself.",hint:"Try a clear structure: present background → relevant skills or project → career direction.",keywords:["mba","operations","analytics","project","skill","career"]},
        {q:"Describe a challenge you faced in a project and how you handled it.",hint:"Use STAR: situation, task, action and result. Be specific about your contribution.",keywords:["situation","task","action","result","team","analysis"]},
        {q:"Why should we select you for an entry-level operations or analyst role?",hint:"Connect your skills to the role. Support claims with a real example and show willingness to learn.",keywords:["excel","data","process","operations","learn","analysis"]}
      ]}
  );
  activities.analytics.push(
    {id:"excel-playground",name:"Excel Formula Playground",type:"Hands-on spreadsheet lab",desc:"Work with a small sales sheet, write formulas and see the result instantly.",mode:"excel"},
    {id:"sql-playground",name:"SQL Query Lab",type:"Interactive SQL sandbox",desc:"Write SELECT queries against a sample orders table and inspect the returned rows.",mode:"sql"}
  );
  activities.business.push(
    {id:"startup-tycoon",name:"Startup Tycoon",type:"Business management simulation",desc:"Run a small delivery startup across four rounds. Manage cash, demand, service quality and customer satisfaction.",mode:"startup"}
  );

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
    const quizCards=games[id].map(g=>`<article class="world-card"><div class="eyebrow">KNOWLEDGE GAME · QUIZ</div><h3 style="margin-top:15px">${g.name}</h3><p>${g.desc}</p><div class="world-foot"><span>5 questions · Earn up to 50 XP</span><button data-start-game="${id}|${g.id}">Play quiz →</button></div></article>`).join("");
    const activityCards=(activities[id]||[]).map(a=>`<article class="world-card activity-card"><div class="eyebrow">${a.type.toUpperCase()} · INTERACTIVE</div><h3 style="margin-top:15px">${a.name}</h3><p>${a.desc}</p><div class="world-foot"><span>Hands-on practice · Earn XP</span><button data-start-activity="${id}|${a.id}">Play activity →</button></div></article>`).join("");
    $("#all-worlds").innerHTML=`<div class="world-card" style="grid-column:1/-1;min-height:auto"><div class="eyebrow">SELECTED WORLD</div><h2 style="font:600 23px 'Space Grotesk';margin:12px 0">${selectedWorld.icon} ${selectedWorld.name}</h2><p>${selectedWorld.desc}</p><p class="world-section-note">Quizzes check recall. Interactive labs, simulations and speaking missions help you practise real skills.</p></div>`+activityCards+quizCards;
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

  let activeActivity=null, activityStep=0, activityScore=0, activityAnswers=[];
  function startActivity(worldId,activityId){
    const item=(activities[worldId]||[]).find(a=>a.id===activityId);if(!item)return;
    activeActivity={...item,worldId};activityStep=0;activityScore=0;activityAnswers=[];
    $("#game-world-label").textContent=worlds.find(w=>w.id===worldId).name.toUpperCase()+" · ACTIVITY";
    showView("game");renderActivityStep();
  }
  function activityShell(title,subtitle,body){
    $("#game-counter").textContent="INTERACTIVE ACTIVITY";
    $("#game-progress-fill").style.width="100%";
    $("#game-content").innerHTML=`<div class="eyebrow">${activeActivity.type.toUpperCase()}</div><h2 class="game-title">${title}</h2><p class="game-instruction">${subtitle}</p>${body}`;
  }
  function renderActivityStep(){
    const a=activeActivity;
    if(a.mode==="roleplay"){
      const scene=a.scenes[activityStep];
      activityShell(a.name,`Scenario ${activityStep+1} of ${a.scenes.length} · Read the situation and choose how you would respond.`,
       `<div class="scenario-box"><div class="scenario-speaker">${scene.speaker}</div><div class="scenario-line">${scene.line}</div></div><div class="answer-list">${scene.choices.map((c,i)=>`<button class="answer-option activity-choice" data-activity-choice="${i}">${c.label}</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Your choices shape the conversation.</span><button class="primary-btn" id="activity-next" disabled>${activityStep===a.scenes.length-1?"See outcome":"Continue"} →</button></div>`);
      $$("#game-content [data-activity-choice]").forEach(b=>b.addEventListener("click",()=>chooseActivity(Number(b.dataset.activityChoice))));
      $("#activity-next").addEventListener("click",()=>{if(activityStep<a.scenes.length-1){activityStep++;renderActivityStep();}else finishActivity();});
    } else if(a.mode==="writing"){
      activityShell(a.name,a.desc,`<div class="scenario-box"><div class="scenario-speaker">YOUR TASK</div><div class="scenario-line">${a.prompt}</div></div><label class="field-label" for="writing-subject">Subject</label><input id="writing-subject" class="activity-input" placeholder="Weekly report — request for update"><label class="field-label" for="writing-body">Email message</label><textarea id="writing-body" class="activity-textarea" rows="7" placeholder="Dear ..."></textarea><div class="game-controls"><span class="muted">Aim for a polite, specific and concise message.</span><button class="primary-btn" id="submit-writing">Review my email →</button></div><div id="activity-feedback"></div>`);
      $("#submit-writing").addEventListener("click",reviewWriting);
    } else if(a.mode==="inventory"){
      const reorder=a.demand*a.lead+a.safety-a.stock;
      activityShell(a.name,a.desc,`<div class="sim-stats"><div><small>Weekly demand</small><strong>${a.demand} units</strong></div><div><small>Lead time</small><strong>${a.lead} weeks</strong></div><div><small>Current stock</small><strong>${a.stock} units</strong></div><div><small>Safety stock</small><strong>${a.safety} units</strong></div></div><div class="scenario-box"><div class="scenario-speaker">YOUR DECISION</div><div class="scenario-line">Choose a reorder quantity. The simple planning target is demand during lead time + safety stock − current stock = <strong>${reorder} units</strong>.</div></div><div class="answer-list">${a.choices.map(v=>`<button class="answer-option activity-choice" data-inventory="${v}">Order ${v} units</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Balance shortage risk against excess stock.</span><button class="primary-btn" id="activity-next" disabled>Review decision →</button></div>`);
      $$("#game-content [data-inventory]").forEach(b=>b.addEventListener("click",()=>{activityScore=Number(b.dataset.inventory)===reorder?2:(Math.abs(Number(b.dataset.inventory)-reorder)<=60?1:0);$$("#game-content [data-inventory]").forEach(x=>x.disabled=true);b.classList.add(activityScore===2?"correct":activityScore===1?"":"wrong");$("#activity-feedback").innerHTML=`<div class="feedback ${activityScore===2?"good":"bad"}">${activityScore===2?"Good planning.":"Review the calculation."} Required reorder quantity: ${reorder} units. Too little risks a stockout; too much increases holding cost.</div>`;$("#activity-next").disabled=false;}));
      $("#activity-next").addEventListener("click",finishActivity);
    } else if(a.mode==="process"){
      const s=a.steps[activityStep];
      activityShell(a.name,`Decision ${activityStep+1} of ${a.steps.length}`,`<div class="scenario-box"><div class="scenario-speaker">${s.title}</div><div class="scenario-line">${s.detail}</div></div><div class="answer-list">${s.choices.map((c,i)=>`<button class="answer-option activity-choice" data-activity-choice="${i}">${c.label}</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Find the root cause before acting.</span><button class="primary-btn" id="activity-next" disabled>Continue →</button></div>`);
      $$("#game-content [data-activity-choice]").forEach(b=>b.addEventListener("click",()=>chooseActivity(Number(b.dataset.activityChoice))));
      $("#activity-next").addEventListener("click",()=>{if(activityStep<a.steps.length-1){activityStep++;renderActivityStep();}else finishActivity();});
    } else if(a.mode==="data"){
      const rates=a.rows.map(r=>({...r,rate:r.late/r.orders*100}));const highest=[...rates].sort((x,y)=>y.rate-x.rate)[0];
      activityShell(a.name,a.desc,`<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Route</th><th>Orders</th><th>Late orders</th><th>Late rate</th></tr></thead><tbody>${rates.map(r=>`<tr><td>${r.route}</td><td>${r.orders}</td><td>${r.late}</td><td>${r.rate.toFixed(1)}%</td></tr>`).join("")}</tbody></table></div><div class="scenario-box"><div class="scenario-speaker">YOUR INVESTIGATION</div><div class="scenario-line">Which route has the highest late-delivery rate? Compare late orders as a percentage of total orders, not just the raw late count.</div></div><div class="answer-list">${rates.map(r=>`<button class="answer-option activity-choice" data-route="${r.route}">${r.route} route</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Calculate: late orders ÷ total orders × 100.</span><button class="primary-btn" id="activity-next" disabled>Finish analysis →</button></div>`);
      $$("#game-content [data-route]").forEach(b=>b.addEventListener("click",()=>{const correct=b.dataset.route===highest.route;activityScore=correct?2:0;$$("#game-content [data-route]").forEach(x=>{x.disabled=true;if(x.dataset.route===highest.route)x.classList.add("correct");else if(x===b)x.classList.add("wrong");});$("#activity-feedback").innerHTML=`<div class="feedback ${correct?"good":"bad"}">${correct?"Correct analysis.":"Not quite."} ${highest.route} has the highest late rate at ${highest.rate.toFixed(1)}% (${highest.late} ÷ ${highest.orders} × 100).</div>`;$("#activity-next").disabled=false;}));
      $("#activity-next").addEventListener("click",finishActivity);
    } else if(a.mode==="formula"){
      activityShell(a.name,a.desc,`<div class="scenario-box"><div class="scenario-speaker">SPREADSHEET TASK</div><div class="scenario-line">${a.prompt}</div></div><label class="field-label" for="formula-answer">Your Excel formula</label><input id="formula-answer" class="activity-input mono" placeholder="Type your formula here"><div class="game-controls"><span class="muted">Use a function and the correct argument order.</span><button class="primary-btn" id="submit-formula">Check formula →</button></div><div id="activity-feedback"></div>`);
      $("#submit-formula").addEventListener("click",()=>{const val=$("#formula-answer").value.replace(/\s/g,"").toLowerCase();const correct=a.accepted.includes(val);activityScore=correct?2:0;$("#activity-feedback").innerHTML=`<div class="feedback ${correct?"good":"bad"}">${correct?"Formula accepted.":"Not quite. Review the function arguments."} A valid answer is <code>${a.answer}</code>. SUMIF uses the criteria range, criterion and sum range.</div><div class="game-controls"><span></span><button class="primary-btn" id="finish-activity">Finish →</button></div>`;$("#finish-activity").addEventListener("click",finishActivity);});
    } else if(a.mode==="budget"){
      const total=a.income;
      activityShell(a.name,a.desc,`<div class="scenario-box"><div class="scenario-speaker">MONTHLY INCOME</div><div class="scenario-line">You have ₹${total.toLocaleString("en-IN")} to allocate. Plan a balanced budget. Minimum guidance: essentials ₹15,000, savings ₹5,000 and learning ₹1,000.</div></div><div class="budget-fields">${a.categories.map(c=>`<label class="budget-row"><span>${c.name}<small>Minimum ₹${c.min.toLocaleString("en-IN")}</small></span><input type="number" min="0" step="500" value="${c.min}" data-budget="${c.name}"></label>`).join("")}</div><div id="budget-total" class="budget-total">Allocated: ₹21,000 · Remaining: ₹9,000</div><div class="game-controls"><span class="muted">Every rupee should have a job.</span><button class="primary-btn" id="submit-budget">Check my budget →</button></div><div id="activity-feedback"></div>`);
      const update=()=>{const vals=$$("[data-budget]").map(x=>Math.max(0,Number(x.value)||0));const sum=vals.reduce((x,y)=>x+y,0);$("#budget-total").textContent=`Allocated: ₹${sum.toLocaleString("en-IN")} · ${sum<=total?"Remaining: ₹"+(total-sum).toLocaleString("en-IN"):"Over budget: ₹"+(sum-total).toLocaleString("en-IN")}`;};
      $$("[data-budget]").forEach(x=>x.addEventListener("input",update));$("#submit-budget").addEventListener("click",()=>{const vals=$$("[data-budget]").map(x=>Math.max(0,Number(x.value)||0));const sum=vals.reduce((x,y)=>x+y,0);const essentials=vals[0],savings=vals[1],learning=vals[2];const valid=sum===total&&essentials>=15000&&savings>=5000&&learning>=1000;activityScore=valid?2:0;$("#activity-feedback").innerHTML=`<div class="feedback ${valid?"good":"bad"}">${valid?"Balanced budget! You allocated the full income and met the planning minimums.":"Adjust your plan: total must equal ₹30,000, with essentials ≥ ₹15,000, savings ≥ ₹5,000 and learning ≥ ₹1,000."}</div>${valid?'<div class="game-controls"><span></span><button class="primary-btn" id="finish-activity">Finish →</button></div>':""}`;if(valid)$("#finish-activity").addEventListener("click",finishActivity);});
    } else if(a.mode==="debug"){
      activityShell(a.name,a.desc,`<div class="scenario-box"><div class="scenario-speaker">CODE TO INSPECT</div><pre class="code-sample">${escapeHtml(a.code)}</pre></div><div class="scenario-line">${a.question}</div><div class="answer-list">${a.choices.map((c,i)=>`<button class="answer-option activity-choice" data-activity-choice="${i}">${c.label}</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Trace what happens on each loop.</span><button class="primary-btn" id="activity-next" disabled>Finish debugging →</button></div>`);
      $$("#game-content [data-activity-choice]").forEach(b=>b.addEventListener("click",()=>chooseActivity(Number(b.dataset.activityChoice))));
      $("#activity-next").addEventListener("click",finishActivity);
    } else if(a.mode==="pricing"){
      activityShell(a.name,a.desc,`<div class="sim-stats"><div><small>Unit cost</small><strong>₹${a.unitCost}</strong></div><div><small>Base demand</small><strong>${a.demandBase} units</strong></div></div><div class="scenario-box"><div class="scenario-speaker">SET YOUR PRICE</div><div class="scenario-line">Choose a selling price. For this simple simulation, demand falls as price rises: ₹150 → 100 units, ₹180 → 85, ₹210 → 65, ₹240 → 40.</div></div><div class="answer-list">${a.prices.map((p,i)=>`<button class="answer-option activity-choice" data-price="${p}">Sell at ₹${p}</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Compare total contribution, not price alone.</span><button class="primary-btn" id="activity-next" disabled>Review results →</button></div>`);
      const demand={150:100,180:85,210:65,240:40};
      $$("#game-content [data-price]").forEach(b=>b.addEventListener("click",()=>{const p=Number(b.dataset.price);const revenue=p*demand[p],profit=(p-a.unitCost)*demand[p];activityScore=profit===Math.max(...a.prices.map(x=>(x-a.unitCost)*demand[x]))?2:profit>=4000?1:0; $$("#game-content [data-price]").forEach(x=>x.disabled=true);b.classList.add(activityScore===2?"correct":"");$("#activity-feedback").innerHTML=`<div class="feedback ${activityScore===2?"good":"bad"}">At ₹${p}, estimated revenue is ₹${revenue.toLocaleString("en-IN")} and contribution is ₹${profit.toLocaleString("en-IN")}. The highest contribution in this scenario is ₹${Math.max(...a.prices.map(x=>(x-a.unitCost)*demand[x])).toLocaleString("en-IN")}.</div>`;$("#activity-next").disabled=false;}));
      $("#activity-next").addEventListener("click",finishActivity);
    } else if(a.mode==="route"){
      activityShell(a.name,a.desc,`<div class="scenario-box"><div class="scenario-speaker">DELIVERY DISPATCH</div><div class="scenario-line">A parcel must arrive within 35 minutes. Choose the route that best balances travel time and reliability.</div></div><div class="answer-list">${a.choices.map((c,i)=>`<button class="answer-option activity-choice" data-activity-choice="${i}">${c.label}</button>`).join("")}</div><div id="activity-feedback"></div><div class="game-controls"><span class="muted">Distance is not the same as travel time.</span><button class="primary-btn" id="activity-next" disabled>Finish →</button></div>`);
      $$("#game-content [data-activity-choice]").forEach(b=>b.addEventListener("click",()=>chooseActivity(Number(b.dataset.activityChoice))));
      $("#activity-next").addEventListener("click",finishActivity);
    } else if(a.mode==="voice" || a.mode==="interview"){
      renderSpeakingPractice(a);
    } else if(a.mode==="excel"){
      renderExcelLab(a);
    } else if(a.mode==="sql"){
      renderSqlLab(a);
    } else if(a.mode==="startup"){
      renderStartupRound(a);
    }
  }

  let speechRecognition=null;
  function renderSpeakingPractice(a){
    const isInterview=a.mode==="interview";
    const prompt=isInterview?a.prompts[activityStep].q:a.prompts[activityStep];
    const hint=isInterview?a.prompts[activityStep].hint:"Speak naturally. Aim for a clear opening, two useful details and a confident close.";
    activityShell(a.name,`${isInterview?"Interview question":"Speaking mission"} ${activityStep+1} of ${a.prompts.length}. You can type or use voice input if your browser supports it.`,
      `<div class="scenario-box"><div class="scenario-speaker">${isInterview?"INTERVIEWER":"TODAY'S SPEAKING MISSION"}</div><div class="scenario-line">${escapeHtml(prompt)}</div><p class="speaking-hint">${escapeHtml(hint)}</p></div>
       <div class="speech-tools"><button class="outline-btn" id="speak-prompt">🔊 Hear prompt</button><button class="outline-btn" id="start-mic">🎙 Start microphone</button><span class="muted" id="mic-status">Microphone not started</span></div>
       <label class="field-label" for="speaking-answer">Your response</label><textarea id="speaking-answer" class="activity-textarea" rows="6" placeholder="Speak using the microphone or type your answer here..."></textarea>
       <div class="game-controls"><span class="muted">Your response stays in this browser.</span><button class="primary-btn" id="review-speaking">Review response →</button></div><div id="activity-feedback"></div>`);
    $("#speak-prompt").addEventListener("click",()=>{
      if(!("speechSynthesis" in window)){showToast("Speech playback is not supported in this browser.");return;}
      window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(prompt);utterance.lang="en-IN";window.speechSynthesis.speak(utterance);
    });
    $("#start-mic").addEventListener("click",()=>{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!SR){$("#mic-status").textContent="Voice input is not supported here. Please type your answer.";return;}
      try{
        speechRecognition=new SR();speechRecognition.lang="en-IN";speechRecognition.interimResults=true;speechRecognition.continuous=true;
        $("#mic-status").textContent="Listening… speak now";
        speechRecognition.onresult=(event)=>{let text="";for(let i=0;i<event.results.length;i++)text+=event.results[i][0].transcript+" ";$("#speaking-answer").value=text.trim();};
        speechRecognition.onerror=()=>{$("#mic-status").textContent="Microphone unavailable. You can type instead.";};
        speechRecognition.onend=()=>{if($("#mic-status"))$("#mic-status").textContent="Voice capture ended. You can edit your transcript.";};
        speechRecognition.start();
      }catch(err){$("#mic-status").textContent="Could not start microphone. Check browser permission."; }
    });
    $("#review-speaking").addEventListener("click",()=>reviewSpeaking(a));
  }
  function reviewSpeaking(a){
    const text=$("#speaking-answer").value.trim(), words=text.split(/\s+/).filter(Boolean), lower=text.toLowerCase();
    if(words.length<8){$("#activity-feedback").innerHTML='<div class="feedback bad">Add a little more detail before reviewing. Aim for at least 8 words so there is enough material to assess.</div>';return;}
    const checks=[
      {label:"Clear opening or direct response",ok:/\b(i am|i'm|my name|i would|i think|first|currently|in my)\b/i.test(text)},
      {label:"Useful supporting detail",ok:words.length>=25},
      {label:"Specific action or example",ok:/\b(i did|i worked|i created|i analysed|i analyzed|i handled|i improved|i managed|because|for example|such as)\b/i.test(text)},
      {label:"Outcome or forward-looking close",ok:/\b(result|outcome|learned|improved|therefore|so that|next|would)\b/i.test(text)},
      {label:"Professional language",ok:!/\b(whatever|dunno|ain't|gonna)\b/i.test(text)}
    ];
    if(a.mode==="interview"){
      const kws=a.prompts[activityStep].keywords;
      checks.push({label:"Uses role-relevant language",ok:kws.some(k=>lower.includes(k))});
    }
    const passed=checks.filter(c=>c.ok).length;
    activityScore+=passed>=5?2:passed>=3?1:0;
    const feedback=checks.map(c=>`${c.ok?"✓":"○"} ${c.label}`).join("<br>");
    const tip=words.length<35?"Try adding one concrete example and a result.":words.length>130?"Your response is detailed. Try trimming repetition and keeping the main point near the beginning.":"Good response length. Practise delivering it smoothly without rushing.";
    $("#activity-feedback").innerHTML=`<div class="feedback ${passed>=5?"good":"bad"}"><strong>Practice review: ${passed}/${checks.length} communication checks</strong><br>${feedback}<br><br>${tip}<br><br><em>Note: this is a local practice checklist, not an AI judgement of your accent or fluency.</em></div><div class="game-controls"><span class="muted">${words.length} words</span><button class="primary-btn" id="speaking-next">${activityStep===a.prompts.length-1?"Finish practice":"Next prompt"} →</button></div>`;
    $("#speaking-next").addEventListener("click",()=>{
      if(speechRecognition){try{speechRecognition.stop();}catch(e){}speechRecognition=null;}
      if(activityStep<a.prompts.length-1){activityStep++;renderSpeakingPractice(a);}else finishActivity();
    });
  }

  const excelRows=[
    ["Region","Product","Units","Revenue"],
    ["North","Laptop",4,2400],["South","Phone",8,3200],["North","Phone",5,2000],
    ["East","Laptop",3,1800],["South","Laptop",2,1200],["East","Phone",6,2400]
  ];
  function renderExcelLab(a){
    activityShell(a.name,a.desc,`<div class="lab-toolbar"><span class="lab-chip">SAMPLE SALES DATA</span><span class="muted">Cells A1:D7</span></div>
      <div class="data-table-wrap"><table class="data-table spreadsheet"><thead>${excelRows.slice(0,1).map(r=>`<tr><th></th>${r.map((v,i)=>`<th>${String.fromCharCode(65+i)}</th>`).join("")}</tr>`).join("")}</thead><tbody>${excelRows.slice(1).map((r,ri)=>`<tr><th>${ri+2}</th>${r.map(v=>`<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="scenario-box"><div class="scenario-speaker">YOUR TASK</div><div class="scenario-line">Calculate total revenue for the North region. Use SUMIF with region names in A2:A7 and revenue in D2:D7.</div></div>
      <label class="field-label" for="excel-formula">Enter your Excel formula</label><input id="excel-formula" class="activity-input mono" placeholder='=SUMIF(A2:A7,"North",D2:D7)'>
      <div class="formula-examples"><button class="formula-chip" data-fill-formula='=SUM(D2:D7)'>SUM example</button><button class="formula-chip" data-fill-formula='=AVERAGE(D2:D7)'>AVERAGE example</button><button class="formula-chip" data-fill-formula='=SUMIF(A2:A7,"North",D2:D7)'>SUMIF example</button></div>
      <div class="game-controls"><span class="muted">Supported: SUM, AVERAGE, MIN, MAX, COUNT, SUMIF</span><button class="primary-btn" id="run-excel">Run formula ▶</button></div><div id="excel-output"></div>`);
    $$("#game-content [data-fill-formula]").forEach(b=>b.addEventListener("click",()=>{$("#excel-formula").value=b.dataset.fillFormula;}));
    $("#run-excel").addEventListener("click",()=>{
      const formula=$("#excel-formula").value.trim();let result;
      try{result=evaluateExcelFormula(formula);}catch(err){$("#excel-output").innerHTML=`<div class="feedback bad">${escapeHtml(err.message)}</div>`;return;}
      const correct=Math.abs(result-4400)<0.0001;activityScore=correct?2:0;
      $("#excel-output").innerHTML=`<div class="formula-result"><span>Formula result</span><strong>${Number(result.toFixed(2)).toLocaleString("en-IN")}</strong></div><div class="feedback ${correct?"good":"bad"}">${correct?"Correct — North revenue totals ₹4,400.":"Formula executed. The North-region total should be ₹4,400. Check your ranges and criteria."}</div><div class="game-controls"><span></span><button class="primary-btn" id="finish-excel">Finish lab →</button></div>`;
      $("#finish-excel").addEventListener("click",finishActivity);
    });
  }
  function excelRange(ref){
    const m=ref.toUpperCase().match(/^([A-D])(\d+):([A-D])(\d+)$/);if(!m)throw new Error("Use a valid range such as D2:D7.");
    const col=m[1].charCodeAt(0)-65,start=Number(m[2]),end=Number(m[4]);
    if(m[1]!==m[3]||start<2||end>7||start>end)throw new Error("This lab supports single-column ranges from rows 2 to 7.");
    return excelRows.slice(start-1,end).map(r=>r[col]);
  }
  function evaluateExcelFormula(raw){
    const s=raw.replace(/\s+/g,"");
    let m=s.match(/^=(SUM|AVERAGE|MIN|MAX|COUNT)\(([A-D]\d+:[A-D]\d+)\)$/i);
    if(m){const vals=excelRange(m[2]).map(Number);if(m[1].toUpperCase()==="SUM")return vals.reduce((x,y)=>x+y,0);if(m[1].toUpperCase()==="AVERAGE")return vals.reduce((x,y)=>x+y,0)/vals.length;if(m[1].toUpperCase()==="MIN")return Math.min(...vals);if(m[1].toUpperCase()==="MAX")return Math.max(...vals);return vals.length;}
    m=s.match(/^=SUMIF\(([A-D]\d+:[A-D]\d+),"([^"]+)",([A-D]\d+:[A-D]\d+)\)$/i);
    if(m){const criteria=excelRange(m[1]),values=excelRange(m[3]);if(criteria.length!==values.length)throw new Error("Criteria and sum ranges must be the same size.");return criteria.reduce((sum,v,i)=>sum+(String(v).toLowerCase()===m[2].toLowerCase()?Number(values[i])||0:0),0);}
    throw new Error("Formula not supported. Try =SUM(D2:D7) or =SUMIF(A2:A7,\"North\",D2:D7).");
  }

  const sqlRows=[
    {order_id:101,region:"North",product:"Laptop",units:4,revenue:2400},
    {order_id:102,region:"South",product:"Phone",units:8,revenue:3200},
    {order_id:103,region:"North",product:"Phone",units:5,revenue:2000},
    {order_id:104,region:"East",product:"Laptop",units:3,revenue:1800},
    {order_id:105,region:"South",product:"Laptop",units:2,revenue:1200},
    {order_id:106,region:"East",product:"Phone",units:6,revenue:2400},
    {order_id:107,region:"West",product:"Tablet",units:3,revenue:1500}
  ];
  function renderSqlLab(a){
    activityShell(a.name,a.desc,`<div class="lab-toolbar"><span class="lab-chip">DATABASE: PLAYNOVA</span><span class="muted">Table: orders · 7 rows</span></div>
      <div class="data-table-wrap"><table class="data-table"><thead><tr>${Object.keys(sqlRows[0]).map(k=>`<th>${k}</th>`).join("")}</tr></thead><tbody>${sqlRows.slice(0,4).map(r=>`<tr>${Object.values(r).map(v=>`<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <div class="scenario-box"><div class="scenario-speaker">QUERY CHALLENGE</div><div class="scenario-line">Write a SQL query to show all columns for orders from the South region, sorted by revenue from highest to lowest.</div></div>
      <label class="field-label" for="sql-query">SQL editor</label><textarea id="sql-query" class="activity-textarea mono" rows="4">SELECT * FROM orders WHERE region = 'South' ORDER BY revenue DESC;</textarea>
      <div class="formula-examples"><button class="formula-chip" data-sql-example="SELECT * FROM orders;">SELECT all</button><button class="formula-chip" data-sql-example="SELECT region, SUM(revenue) FROM orders GROUP BY region;">GROUP BY</button><button class="formula-chip" data-sql-example="SELECT * FROM orders WHERE region = 'South' ORDER BY revenue DESC;">Filter + sort</button></div>
      <div class="game-controls"><span class="muted">Supports SELECT, WHERE, ORDER BY, LIMIT, GROUP BY + SUM/COUNT/AVG</span><button class="primary-btn" id="run-sql">Run query ▶</button></div><div id="sql-output"></div>`);
    $$("#game-content [data-sql-example]").forEach(b=>b.addEventListener("click",()=>$("#sql-query").value=b.dataset.sqlExample));
    $("#run-sql").addEventListener("click",()=>{
      try{
        const result=executeSql($("#sql-query").value);
        const html=result.rows.length?`<div class="data-table-wrap"><table class="data-table"><thead><tr>${result.columns.map(c=>`<th>${escapeHtml(c)}</th>`).join("")}</tr></thead><tbody>${result.rows.map(r=>`<tr>${result.columns.map(c=>`<td>${escapeHtml(r[c]??"")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`:'<div class="empty-state">Query returned zero rows.</div>';
        const target=result.rows.length===2&&result.rows.every(r=>r.region==="South")&&result.rows[0].revenue>=result.rows[1].revenue;
        activityScore=target?2:1;
        $("#sql-output").innerHTML=`<div class="feedback ${target?"good":"bad"}">Query executed successfully · ${result.rows.length} row(s) returned. ${target?"Challenge complete: South orders are sorted by revenue descending.":"Your query ran. Compare the output with the challenge requirements."}</div>${html}<div class="game-controls"><span></span><button class="primary-btn" id="finish-sql">Finish lab →</button></div>`;
        $("#finish-sql").addEventListener("click",finishActivity);
      }catch(err){$("#sql-output").innerHTML=`<div class="feedback bad">${escapeHtml(err.message)}</div>`;}
    });
  }
  function executeSql(query){
    let s=query.trim().replace(/;$/,"");
    if(!/^select\s+/i.test(s)||!/from\s+orders\b/i.test(s))throw new Error("This sandbox supports SELECT queries from the orders table.");
    const limitMatch=s.match(/\blimit\s+(\d+)/i),limit=limitMatch?Math.min(7,Number(limitMatch[1])):7;
    const whereMatch=s.match(/\bwhere\s+(\w+)\s*=\s*'([^']*)'/i);
    let rows=sqlRows.filter(r=>!whereMatch||String(r[whereMatch[1]]).toLowerCase()===whereMatch[2].toLowerCase());
    if(whereMatch&&!Object.prototype.hasOwnProperty.call(sqlRows[0],whereMatch[1]))throw new Error("Unknown column in WHERE clause.");
    const groupMatch=s.match(/\bgroup\s+by\s+(\w+)/i);
    const selectMatch=s.match(/^select\s+(.+?)\s+from\s+orders\b/i);
    if(!selectMatch)throw new Error("Could not read the SELECT clause.");
    const select=selectMatch[1].trim();
    if(groupMatch){
      const agg=select.match(/^(?:([\w]+)\s*,\s*)?(sum|avg|count)\s*\(\s*(\w+|\*)\s*\)$/i);
      if(!agg)throw new Error("For GROUP BY, try SELECT region, SUM(revenue) FROM orders GROUP BY region.");
      const groupCol=groupMatch[1],fn=agg[2].toLowerCase(),field=agg[3],groups={};
      rows.forEach(r=>(groups[r[groupCol]]??=[]).push(r));
      let out=Object.entries(groups).map(([key,list])=>{const vals=field==="*"?list.map(()=>1):list.map(r=>Number(r[field])||0);let value=fn==="sum"?vals.reduce((x,y)=>x+y,0):fn==="avg"?vals.reduce((x,y)=>x+y,0)/vals.length:vals.length;return {[groupCol]:key,[`${fn}_${field}`]:Number(value.toFixed(2))};});
      const order=s.match(/\border\s+by\s+(\w+)\s*(asc|desc)?/i);if(order){const col=order[1],dir=(order[2]||"asc").toLowerCase();out.sort((a,b)=>(a[col]??a[`${fn}_${field}`])>(b[col]??b[`${fn}_${field}`])?(dir==="desc"?-1:1):(dir==="desc"?1:-1));}
      return {columns:Object.keys(out[0]||{[groupCol]:"",[`${fn}_${field}`]:0}),rows:out.slice(0,limit)};
    }
    const order=s.match(/\border\s+by\s+(\w+)\s*(asc|desc)?/i);
    if(order){const col=order[1],dir=(order[2]||"asc").toLowerCase();if(!Object.prototype.hasOwnProperty.call(sqlRows[0],col))throw new Error("Unknown column in ORDER BY.");rows.sort((a,b)=>a[col]>b[col]?(dir==="desc"?-1:1):(a[col]<b[col]?(dir==="desc"?1:-1):0));}
    const columns=select==="*"?Object.keys(sqlRows[0]):select.split(",").map(x=>x.trim());
    if(columns.some(c=>!Object.prototype.hasOwnProperty.call(sqlRows[0],c)))throw new Error("Unknown column in SELECT list.");
    return {columns,rows:rows.slice(0,limit).map(r=>Object.fromEntries(columns.map(c=>[c,r[c]])))};
  }

  const startupRounds=[
    {title:"Choose your launch strategy",story:"Your delivery startup has ₹1,00,000 in starting capital. You need a clear first move.",choices:[
      {label:"Launch in one neighbourhood and validate demand",effect:{cash:-15000,demand:12,quality:8,satisfaction:8},why:"A focused pilot limits risk and helps you learn from real customers."},
      {label:"Launch across the entire city immediately",effect:{cash:-45000,demand:25,quality:-8,satisfaction:-5},why:"Reach may rise, but the large launch stretches your limited operations capacity."},
      {label:"Spend most of the budget on branding",effect:{cash:-30000,demand:8,quality:0,satisfaction:0},why:"Branding can help awareness, but the operation still needs a reliable service."}]},
    {title:"A supplier misses a replenishment",story:"A key supplier says a shipment will be delayed by two days. Some fast-moving items are running low.",choices:[
      {label:"Use a qualified backup supplier for critical items",effect:{cash:-12000,demand:0,quality:5,satisfaction:8},why:"A backup source costs more now but protects service for priority products."},
      {label:"Wait without informing customers",effect:{cash:0,demand:-8,quality:-5,satisfaction:-15},why:"Silence can damage trust when customers discover the shortage themselves."},
      {label:"Buy every item from an expensive emergency source",effect:{cash:-30000,demand:0,quality:2,satisfaction:3},why:"It protects availability but can consume too much working capital."}]},
    {title:"Demand spikes over the weekend",story:"Orders rise sharply. Your team is struggling to pack and dispatch on time.",choices:[
      {label:"Add a temporary shift at the bottleneck",effect:{cash:-14000,demand:8,quality:8,satisfaction:8},why:"Targeting the constrained step improves throughput and protects service."},
      {label:"Accept every order without changing capacity",effect:{cash:0,demand:15,quality:-15,satisfaction:-12},why:"More orders are not useful if late deliveries and errors increase."},
      {label:"Pause all marketing and stop accepting new customers",effect:{cash:0,demand:-10,quality:5,satisfaction:0},why:"This reduces pressure, but also sacrifices demand instead of fixing the constraint."}]},
    {title:"Review your customer feedback",story:"Customers like the speed, but some say updates are unclear when orders are delayed.",choices:[
      {label:"Introduce proactive order updates and a simple service-recovery process",effect:{cash:-7000,demand:3,quality:5,satisfaction:15},why:"Clear updates and ownership can restore confidence during service issues."},
      {label:"Offer discounts to everyone",effect:{cash:-18000,demand:8,quality:0,satisfaction:4},why:"Discounts may encourage orders, but do not solve the communication gap."},
      {label:"Ignore feedback until the next quarter",effect:{cash:0,demand:-5,quality:-3,satisfaction:-12},why:"Unresolved issues can compound and increase customer churn."}]}
    ];
  function renderStartupRound(a){
    const cash=100000+(a.cashDelta||0),demand=50+(a.demandScore||0),quality=60+(a.qualityScore||0),sat=60+(a.satScore||0);
    const round=startupRounds[activityStep];
    activityShell(a.name,`Management round ${activityStep+1} of ${startupRounds.length} · Your decisions change the business metrics.`,`
      <div class="startup-dashboard"><div class="startup-kpi"><small>Cash balance</small><strong>₹${cash.toLocaleString("en-IN")}</strong></div><div class="startup-kpi"><small>Demand index</small><strong>${demand}</strong></div><div class="startup-kpi"><small>Service quality</small><strong>${quality}/100</strong></div><div class="startup-kpi"><small>Customer trust</small><strong>${sat}/100</strong></div></div>
      <div class="scenario-box"><div class="scenario-speaker">${round.title.toUpperCase()}</div><div class="scenario-line">${round.story}</div></div>
      <div class="answer-list">${round.choices.map((c,i)=>`<button class="answer-option activity-choice" data-startup-choice="${i}">${c.label}</button>`).join("")}</div><div id="activity-feedback"></div>
      <div class="game-controls"><span class="muted">Think about cash, capacity and customer experience.</span><button class="primary-btn" id="startup-next" disabled>${activityStep===startupRounds.length-1?"Close the quarter":"Next round"} →</button></div>`);
    $$("#game-content [data-startup-choice]").forEach(b=>b.addEventListener("click",()=>{
      const c=round.choices[Number(b.dataset.startupChoice)];a.cashDelta=(a.cashDelta||0)+c.effect.cash;a.demandScore=(a.demandScore||0)+c.effect.demand;a.qualityScore=(a.qualityScore||0)+c.effect.quality;a.satScore=(a.satScore||0)+c.effect.satisfaction;
      activityScore+=c.effect.cash>=-15000&&c.effect.quality+c.effect.satisfaction>=12?2:c.effect.cash>=-30000?1:0;
      $$("#game-content [data-startup-choice]").forEach(x=>x.disabled=true);b.classList.add("correct");
      $("#activity-feedback").innerHTML=`<div class="feedback good">${c.why}</div>`;
      $("#startup-next").disabled=false;
    }));
    $("#startup-next").addEventListener("click",()=>{
      if(activityStep<startupRounds.length-1){activityStep++;renderStartupRound(a);}
      else {const finalCash=100000+(a.cashDelta||0);activityScore+=finalCash>50000?1:0;finishActivity();}
    });
  }

  function chooseActivity(index){
    const a=activeActivity;let item,choice;
    if(a.mode==="roleplay"){item=a.scenes[activityStep];choice=item.choices[index];}
    else if(a.mode==="process"){item=a.steps[activityStep];choice=item.choices[index];}
    else {choice=a.choices[index];}
    activityScore+=choice.score;
    $$("#game-content [data-activity-choice]").forEach((b,i)=>{b.disabled=true;if(i===index)b.classList.add(choice.score===2?"correct":choice.score===0?"wrong":"");});
    $("#activity-feedback").innerHTML=`<div class="feedback ${choice.score===2?"good":"bad"}">${choice.reply||choice.why}</div>`;
    $("#activity-next").disabled=false;
  }
  function reviewWriting(){
    const subject=$("#writing-subject").value.trim(),body=$("#writing-body").value.trim();
    const words=body.split(/\s+/).filter(Boolean);const checks=[
      {label:"Has a courteous greeting",ok:/\b(dear|hello|hi)\b/i.test(body)},
      {label:"Clearly asks for the report",ok:/\b(report|share|send|weekly)\b/i.test(body)},
      {label:"Includes the 4 PM deadline",ok:/\b(4\s?(pm|p\.m\.)|16:00)\b/i.test(body)},
      {label:"Uses a polite phrase",ok:/\b(please|could you|would you|kindly|thank you)\b/i.test(body)},
      {label:"Includes a subject line",ok:subject.length>=5}
    ];
    const passed=checks.filter(c=>c.ok).length;activityScore=passed>=4?2:passed>=3?1:0;
    $("#activity-feedback").innerHTML=`<div class="feedback ${passed>=4?"good":"bad"}"><strong>Writing review: ${passed}/5 checks</strong><br>${checks.map(c=>(c.ok?"✓ ":"○ ")+c.label).join("<br>")}<br><br>${words.length<25?"Try adding a little more context while staying concise.":words.length>100?"Consider shortening the message.":"Good length. Read it once for clarity and tone."}</div><div class="game-controls"><span class="muted">${words.length} words</span><button class="primary-btn" id="finish-activity">Save result →</button></div>`;
    $("#finish-activity").addEventListener("click",finishActivity);
  }
  function finishActivity(){
    const a=activeActivity;if(speechRecognition){try{speechRecognition.stop();}catch(e){}speechRecognition=null;}const earned=Math.max(5,Math.min(80,activityScore*10+10));
    state.xp+=earned;state.games+=1;updateStreak();
    state.activity.unshift({name:a.name,world:worlds.find(w=>w.id===a.worldId).name,xp:earned,date:new Date().toLocaleDateString()});
    state.activity=state.activity.slice(0,20);save();renderStats();
    $("#game-counter").textContent="ACTIVITY COMPLETE";
    $("#game-content").innerHTML=`<div class="game-result"><div class="result-icon">🎮</div><div class="eyebrow">PRACTICE COMPLETE</div><h2>Experience gained!</h2><div class="result-score">+${earned} XP</div><p>You completed <strong>${escapeHtml(a.name)}</strong>.<br>Try another activity or replay this one to sharpen your skills.</p><div class="result-actions"><button class="outline-btn" id="replay-activity">Try again</button><button class="primary-btn" id="activity-world">Back to world →</button></div></div>`;
    $("#replay-activity").addEventListener("click",()=>startActivity(a.worldId,a.id));
    $("#activity-world").addEventListener("click",()=>openWorld(a.worldId));
    showToast("+"+earned+" XP added to your progress!");
  }

  let toastTimer;
  function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2300);}
  document.addEventListener("click",e=>{
    const viewBtn=e.target.closest("[data-view]");if(viewBtn){showView(viewBtn.dataset.view);return;}
    const worldBtn=e.target.closest("[data-world]");if(worldBtn){openWorld(worldBtn.dataset.world);return;}
    const openBtn=e.target.closest("[data-open-world]");if(openBtn){openWorld(openBtn.dataset.openWorld);return;}
    const startBtn=e.target.closest("[data-start-game]");if(startBtn){const [w,g]=startBtn.dataset.startGame.split("|");startGame(w,g);return;}
    const activityBtn=e.target.closest("[data-start-activity]");if(activityBtn){const [w,a]=activityBtn.dataset.startActivity.split("|");startActivity(w,a);return;}
  });
  $("#explore-btn").addEventListener("click",()=>showView("worlds"));
  $("#daily-btn").addEventListener("click",()=>{const w=worlds[Math.floor(Math.random()*worlds.length)];openWorld(w.id);showToast("Your surprise challenge is ready!");});
  $("#back-world").addEventListener("click",()=>openWorld(activeGame?.worldId||"communication"));
  renderWorlds();renderStats();
})();