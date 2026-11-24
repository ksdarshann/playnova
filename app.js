(()=>{
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const WORLDS=[
{id:"operations",name:"Operations & Supply Chain",short:"Operations",icon:"🏭",tag:"THE FLOW FACTORY",color:"#72d5df",tint:"#1d3b49",glow:"#64d5e6",desc:"Run a warehouse, fix delivery delays and keep the supply chain moving.",games:["Warehouse Rush","Last-Mile Dispatch"]},
{id:"business",name:"Business Management",short:"Business",icon:"🏙️",tag:"FOUNDER'S DISTRICT",color:"#b39bff",tint:"#30294e",glow:"#a18aff",desc:"Build a small company, balance resources and grow without running out of cash.",games:["Startup Sprint","Market Strategy"]},
{id:"analytics",name:"Data & Analytics",short:"Analytics",icon:"📊",tag:"THE DATA VAULT",color:"#72dce2",tint:"#1d3b45",glow:"#6adce4",desc:"Investigate messy data, uncover patterns and use formulas to answer business questions.",games:["Data Detective","Formula Forge"]},
{id:"communication",name:"Communication & Career",short:"Communication",icon:"🎙️",tag:"THE CONVERSATION STUDIO",color:"#f0b6a0",tint:"#49302e",glow:"#f0a58b",desc:"Navigate interviews, customer conversations and workplace situations.",games:["Client Quest","Interview RPG"]},
{id:"finance",name:"Personal & Business Finance",short:"Finance",icon:"💰",tag:"THE MONEY MISSION",color:"#f0c77e",tint:"#463b29",glow:"#edc36e",desc:"Allocate a budget, protect cash flow and make trade-offs under pressure.",games:["Budget Builder","Cashflow Crisis"]}
];
const storeKey="playnova40_profile";
let profile=loadProfile(),activeWorld=null,activeGame=null,gameState={},toastTimer;
function loadProfile(){try{return Object.assign({xp:0,completed:{},history:[],lastPlayed:""},JSON.parse(localStorage.getItem(storeKey)||"{}"));}catch(e){return {xp:0,completed:{},history:[],lastPlayed:""};}}
function save(){localStorage.setItem(storeKey,JSON.stringify(profile));updateStats();}
function level(){return Math.floor(profile.xp/100)+1}
function updateStats(){
 const xp=profile.xp||0,l=level(),next=profile.xp%100;
 ["#side-xp","#top-xp"].forEach(s=>{if($(s))$(s).textContent=xp+" XP"});
 ["#top-level","#home-level"].forEach(s=>{if($(s))$(s).textContent=l});
 if($("#home-xp"))$("#home-xp").textContent=xp;
 if($("#home-games"))$("#home-games").textContent=Object.keys(profile.completed).length;
 if($("#home-next"))$("#home-next").textContent=(100-next)+" XP to next level";
 if($("#progress-xp"))$("#progress-xp").textContent=xp+" XP";
 if($("#progress-level"))$("#progress-level").textContent=`Level ${l} · ${levelName(l)}`;
 if($("#level-fill"))$("#level-fill").style.width=next+"%";
 if($("#progress-next"))$("#progress-next").textContent=`${next} / 100 XP to next level`;
 renderProgress();
}
function levelName(l){return l<3?"Rookie explorer":l<5?"Skill adventurer":l<8?"World builder":"PLAYNOVA legend"}
function completedCount(id){return Object.keys(profile.completed).filter(k=>k.startsWith(id+":")).length}
function renderWorldCard(w){return `<article class="world-card" data-world="${w.id}" style="--glow:${w.glow};--tint:${w.tint}"><div class="world-emoji">${w.icon}</div><h3>${w.name}</h3><p>${w.desc}</p><div class="world-meta"><span>${w.games.length} playable missions</span><b>${completedCount(w.id)} cleared ↗</b></div></article>`}
function renderWorlds(){
 $("#featured-worlds").innerHTML=WORLDS.slice(0,3).map(w=>renderWorldCard(w)).join("");
 $("#all-worlds").innerHTML=WORLDS.map(w=>renderWorldCard(w)).join("");
 $("#quick-worlds").innerHTML=WORLDS.map(w=>`<button class="nav" data-world="${w.id}"><span>${w.icon}</span>${w.short}</button>`).join("");
}
function showScreen(name){
 $$(".screen").forEach(x=>x.classList.toggle("active",x.id===name+"-screen"));
 $$(".nav[data-nav]").forEach(x=>x.classList.toggle("active",x.dataset.nav===name));
 $("#crumb").innerHTML=`YOUR LEARNING ARCADE <span>/</span> ${name.toUpperCase()}`;
 window.scrollTo({top:0,behavior:"smooth"});
}
function openWorld(id){
 activeWorld=WORLDS.find(w=>w.id===id);if(!activeWorld)return;
 $("#game-world-label").textContent=activeWorld.tag;
 $("#game-mount").innerHTML=`
 <div class="game-shell">
  <div class="game-heading"><div><div class="eyebrow">${activeWorld.tag}</div><h1>${activeWorld.name}</h1><p>${activeWorld.desc} Pick a mission and jump straight into the action.</p></div><span class="mission-tag">${completedCount(id)} / ${activeWorld.games.length} CLEARED</span></div>
  <div class="world-grid" id="mission-grid">${missionCards(id)}</div>
 </div>`;
 showScreen("game");$("#crumb").innerHTML=`YOUR LEARNING ARCADE <span>/</span> ${activeWorld.short.toUpperCase()}`;
}
function missionCards(id){
 const map={
 operations:[["warehouse","📦","Warehouse Rush","Stock shelves accurately before the dispatch deadline.","HANDS-ON LOGISTICS"],["dispatch","🚚","Last-Mile Dispatch","Plan a delivery route that meets time windows without wasting fuel.","ROUTE PLANNING"]],
 business:[["startup","🏙️","Startup Sprint","Make four founder decisions and grow a stable delivery business.","BUSINESS SIMULATION"],["market","🛍️","Market Strategy","Set a price, choose a customer segment and react to a competitor.","STRATEGY GAME"]],
 analytics:[["detective","🕵️","Data Detective","Inspect order records, find the delay pattern and identify the best action.","DATA INVESTIGATION"],["formula","🧮","Formula Forge","Build the right spreadsheet formula to answer a manager's question.","SPREADSHEET LAB"]],
 communication:[["client","🤝","Client Quest","Handle a frustrated client through a branching workplace conversation.","DIALOGUE RPG"],["interview","🎤","Interview RPG","Prepare and deliver answers in a timed interview practice arena.","CAREER ROLEPLAY"]],
 finance:[["budget","💳","Budget Builder","Allocate a monthly budget and keep essentials, savings and fun in balance.","BUDGET SIMULATION"],["cashflow","📈","Cashflow Crisis","Keep a small business alive through a surprise expense and late payment.","FINANCE SIMULATION"]]
 };
 return map[id].map(([game,icon,title,desc,tag])=>`<article class="world-card" data-game="${game}" style="--glow:${activeWorld.glow};--tint:${activeWorld.tint}"><div class="world-emoji">${icon}</div><div class="eyebrow">${tag}</div><h3>${title}</h3><p>${desc}</p><div class="world-meta"><span>${profile.completed[id+":"+game]?"✓ Completed":"Play mission"}</span><b>Launch ↗</b></div></article>`).join("");
}
function launch(game){
 activeGame=game;gameState={step:0,score:0,answers:[],metrics:{cash:100000,demand:50,quality:60,trust:60},chosen:[],stock:{A:0,B:0,C:0},alloc:{needs:25000,savings:10000,learning:5000,fun:5000}};
 const world=activeWorld;
 const renderers={warehouse:renderWarehouse,dispatch:renderDispatch,startup:renderStartup,market:renderMarket,detective:renderDetective,formula:renderFormula,client:renderClient,interview:renderInterview,budget:renderBudget,cashflow:renderCashflow};
 (renderers[game]||renderWorlds)();
}
function gameFrame(title,sub,body,stepLabel="MISSION"){
 $("#game-mount").innerHTML=`<div class="game-shell">
 <div class="game-heading"><div><div class="eyebrow">${activeWorld.tag} / ${stepLabel}</div><h1>${title}</h1><p>${sub}</p></div><span class="mission-tag">🎮 PLAY MODE</span></div>
 <div class="game-panel">${body}</div></div>`;
}
function feedback(msg,type="good"){let el=$("#game-feedback");if(el){el.className="game-feedback"+(type==="warn"?" warn":"");el.textContent=msg;}}
function finish(game,score=1,message="Mission cleared!"){
 const key=activeWorld.id+":"+game,first=!profile.completed[key],earned=first?Math.max(20,Math.min(60,20+score*5)):10;
 profile.xp+=earned;profile.completed[key]=(profile.completed[key]||0)+1;
 profile.history.unshift({world:activeWorld.short,game:game,date:new Date().toLocaleDateString(),xp:earned});
 profile.history=profile.history.slice(0,30);save();
 $("#game-mount").innerHTML=`<div class="game-shell"><div class="game-panel result-panel"><div class="result-icon">🏆</div><div class="eyebrow">MISSION COMPLETE</div><h2>${message}</h2><p>You completed ${activeGame.replace(/([A-Z])/g," $1").toLowerCase()} in ${activeWorld.short}. Keep playing to build your skills.</p><div class="result-xp">+${earned} XP</div><p>${first?"First clear bonus unlocked.":"Replay bonus earned."} Total experience: ${profile.xp} XP.</p><div class="game-actions"><button class="btn secondary" id="result-world">Back to missions</button><button class="btn primary" id="result-home">Return to arcade →</button></div></div></div>`;
 $("#result-world").onclick=()=>openWorld(activeWorld.id);$("#result-home").onclick=()=>showScreen("home");
}
function gameControls(nextLabel="Continue →",disabled=false){return `<div class="game-actions"><span class="muted">Make a decision. See what changes.</span><button class="btn primary" id="game-next" ${disabled?"disabled":""}>${nextLabel}</button></div>`}
function renderWarehouse(){
 const tasks=[{name:"Safety helmets",sku:"A",need:4,desc:"High-priority item"},{name:"Packing cartons",sku:"B",need:6,desc:"Dispatch essential"},{name:"Barcode labels",sku:"C",need:3,desc:"Small but critical"}];
 const task=tasks[gameState.step];
 if(!task){const perfect=gameState.score;finish("warehouse",perfect,perfect===3?"Perfect warehouse shift!":"Warehouse shift completed");return;}
 gameFrame("Warehouse Rush","You are the shift supervisor. Move incoming stock into the correct shelf before dispatch cutoff. This is a stock allocation task, not a quiz.",`
 <div class="panel-top"><b>SHIFT ${gameState.step+1} / 3 · ${task.name}</b><small>Pick the matching stock unit</small></div>
 <div class="mission-story"><strong>Dispatch request:</strong> The picking team needs ${task.need} units of ${task.name.toLowerCase()}. Each unit placed in the right shelf fills the request. Avoid putting stock in the wrong bin.</div>
 <div class="warehouse"><div class="shelf"><h4>WAREHOUSE SHELVES</h4>${tasks.map(t=>`<div class="shelf-slot"><span>${t.name}</span><b>${gameState.stock[t.sku]||0} / ${t.need}</b></div>`).join("")}</div>
 <div class="incoming"><h4>INCOMING PALLET</h4><p class="muted" style="font-size:10px">Choose a label to move one unit into the active pick bin.</p><div class="stock-controls">${tasks.map(t=>`<button class="stock-item" data-stock="${t.sku}">${t.name}</button>`).join("")}</div><p class="formula-hint">Correct bin: ${task.name}. Wrong placements waste handling time.</p></div></div>
 <div id="game-feedback"></div>${gameControls("Confirm pick →",true)}`);
 $$("[data-stock]").forEach(b=>b.onclick=()=>{if(b.dataset.stock===task.sku){gameState.stock[task.sku]++;gameState.score++;feedback(`Correct placement. ${gameState.stock[task.sku]} of ${task.need} units picked for ${task.name}.`);}else{gameState.score=Math.max(0,gameState.score-1);feedback("Wrong shelf. The item would need re-handling. Check the SKU label and try again.","warn");}});
 $("#game-next").disabled=false;$("#game-next").onclick=()=>{if(gameState.stock[task.sku]>=task.need){gameState.step++;renderWarehouse();}else feedback(`You still need ${task.need-gameState.stock[task.sku]} more units for this pick list.`,"warn");};
}
function renderDispatch(){
 const routes=[{id:"A",name:"Direct highway",mins:28,fuel:18,reliable:65},{id:"B",name:"Ring road",mins:34,fuel:12,reliable:92},{id:"C",name:"Inner streets",mins:39,fuel:8,reliable:75}];
 gameFrame("Last-Mile Dispatch","A customer expects delivery within 35 minutes. Compare travel time, fuel cost and reliability, then dispatch.",`
 <div class="mission-story"><strong>Dispatch control:</strong> You have one urgent parcel. A route is considered on-time if its estimated travel time is 35 minutes or less. Choose the best route balancing the deadline and reliability.</div>
 <div class="choice-grid">${routes.map(r=>`<button class="choice-card" data-route="${r.id}"><b>${r.name}</b><small>ETA: ${r.mins} min · Fuel index: ${r.fuel} · Reliability: ${r.reliable}%</small></button>`).join("")}</div><div id="game-feedback"></div>${gameControls("Dispatch vehicle →",false)}`);
 let selected=null;$$("[data-route]").forEach(b=>b.onclick=()=>{selected=routes.find(r=>r.id===b.dataset.route);$$("[data-route]").forEach(x=>x.classList.toggle("selected",x===b));});
 $("#game-next").onclick=()=>{if(!selected){feedback("Select a route before dispatching.","warn");return;}const good=selected.id==="B";feedback(good?"Dispatch successful. The ring road meets the time window and offers the strongest reliability.":"Dispatch completed, but there was a trade-off. Review the ETA and reliability before choosing next time.",good?"good":"warn");$("#game-next").textContent="Complete dispatch →";$("#game-next").onclick=()=>finish("dispatch",good?5:2,good?"On-time delivery!":"Delivery dispatched");};
}
function renderStartup(){
 const rounds=[
 {title:"Launch plan",story:"You have ₹1,00,000. Prove demand without burning through your runway.",options:[["Pilot one neighbourhood","Spend ₹15,000 · Learn before scaling",[-15000,8,7,8]],["Launch citywide","Spend ₹45,000 · Reach fast, risk overload",[-45000,18,-8,-6]],["Spend heavily on branding","Spend ₹30,000 · Awareness first",[-30000,6,0,1]]]},
 {title:"Supplier disruption",story:"Your main supplier is delayed by two days. Fast-moving items are running low.",options:[["Use a qualified backup supplier","Spend ₹12,000 · Protect critical stock",[-12000,0,7,8]],["Wait without telling customers","Save cash · Risk trust", [0,-8,-5,-14]],["Emergency-buy everything","Spend ₹30,000 · Protect availability",[-30000,1,2,3]]]},
 {title:"Weekend demand spike",story:"Orders rise sharply. Packing and dispatch are becoming bottlenecks.",options:[["Add a temporary shift at the bottleneck","Spend ₹14,000 · Increase throughput",[-14000,8,9,8]],["Accept every order as-is","No spend · Risk late deliveries",[0,14,-14,-12]],["Pause marketing and cap orders","Protect current capacity",[0,-8,4,1]]]},
 {title:"Customer feedback",story:"Customers like the speed, but they want clearer updates when deliveries are delayed.",options:[["Introduce proactive updates","Spend ₹7,000 · Improve service recovery",[-7000,3,5,14]],["Offer discounts to everyone","Spend ₹18,000 · Short-term demand",[-18000,7,0,4]],["Ignore feedback this quarter","Save cash · Risk churn",[0,-5,-3,-12]]]}
 ];
 const r=rounds[gameState.step],m=gameState.metrics;
 gameFrame("Startup Sprint","You are the founder of a local quick-commerce startup. Your decisions shape the business. Track the metrics after every round.",`
 <div class="meter-grid"><div class="meter"><small>AVAILABLE CASH</small><strong>₹${m.cash.toLocaleString("en-IN")}</strong><div class="meter-track"><span style="width:${Math.max(0,Math.min(100,m.cash/1000))}%"></span></div></div><div class="meter"><small>DEMAND INDEX</small><strong>${m.demand}</strong><div class="meter-track"><span style="width:${Math.max(0,Math.min(100,m.demand))}%"></span></div></div><div class="meter"><small>SERVICE QUALITY</small><strong>${m.quality}/100</strong><div class="meter-track"><span style="width:${Math.max(0,Math.min(100,m.quality))}%"></span></div></div></div>
 <div class="panel-top" style="margin-top:18px"><b>FOUNDER DECISION ${gameState.step+1} / 4 · ${r.title}</b><small>Choose one strategy</small></div><div class="mission-story">${r.story}</div>
 <div class="choice-grid">${r.options.map((o,i)=>`<button class="choice-card" data-start="${i}"><b>${o[0]}</b><small>${o[1]}</small></button>`).join("")}</div><div id="game-feedback"></div>${gameControls("Lock decision →",false)}`);
 let pick=null;$$("[data-start]").forEach(b=>b.onclick=()=>{pick=r.options[Number(b.dataset.start)];$$("[data-start]").forEach(x=>x.classList.toggle("selected",x===b));});
 $("#game-next").onclick=()=>{if(!pick){feedback("Choose a business move first.","warn");return;}const e=pick[2];m.cash=Math.max(0,m.cash+e[0]);m.demand=Math.max(0,Math.min(100,m.demand+e[1]));m.quality=Math.max(0,Math.min(100,m.quality+e[2]));m.trust=Math.max(0,Math.min(100,m.trust+e[3]));gameState.score+=e[2]+e[3]>=13?2:1;feedback(`Decision applied: ${pick[0]}. Cash, demand and service metrics have changed.`, "good");$("#game-next").textContent=gameState.step===3?"Close the quarter →":"Next decision →";$("#game-next").onclick=()=>{gameState.step++;if(gameState.step<4)renderStartup();else finish("startup",gameState.score,`Quarter closed · ${m.cash>40000&&m.quality>=65?"A resilient business":"Your startup survived the quarter"}`);};};
}
function renderMarket(){
 gameFrame("Market Strategy","A competitor has entered your neighbourhood. Choose your target market and set a price. Watch how the market responds.",`
 <div class="mission-story"><strong>Market brief:</strong> You sell a healthy lunch box. Your unit cost is ₹80. Competitor price is ₹140. Choose a customer segment and set your selling price to balance margin and demand.</div>
 <label class="field-label">Choose your target customer</label><div class="choice-grid"><button class="choice-card" data-segment="students"><b>Students</b><small>Price-sensitive · High volume</small></button><button class="choice-card" data-segment="professionals"><b>Office professionals</b><small>Convenience-focused · Medium volume</small></button></div>
 <label class="field-label" for="market-price">Your selling price: <output id="price-output">₹130</output></label><input id="market-price" type="range" min="90" max="190" step="5" value="130" style="width:100%;accent-color:#a99aff">
 <div class="meter-grid" style="margin-top:16px"><div class="meter"><small>UNIT COST</small><strong>₹80</strong></div><div class="meter"><small>UNIT MARGIN</small><strong id="margin">₹50</strong></div><div class="meter"><small>DEMAND FORECAST</small><strong id="forecast">Medium</strong></div></div><div id="game-feedback"></div>${gameControls("Launch offer →",false)}`);
 let segment="";const price=$("#market-price");
 $$("[data-segment]").forEach(b=>b.onclick=()=>{segment=b.dataset.segment;$$("[data-segment]").forEach(x=>x.classList.toggle("selected",x===b));});
 const update=()=>{let p=Number(price.value);$("#price-output").textContent="₹"+p;$("#margin").textContent="₹"+(p-80);$("#forecast").textContent=p<120?"High":p<=150?"Medium":"Low";};price.oninput=update;
 $("#game-next").onclick=()=>{if(!segment){feedback("Choose a customer segment before launch.","warn");return;}let p=Number(price.value),score=(p>=115&&p<=145?4:2)+(segment==="professionals"&&p>=125?1:0);finish("market",score,`Offer launched at ₹${p} for ${segment}`);};
}
const records=[["Order","Region","Promised (min)","Actual (min)","Status"],["#4101","North",25,31,"Late"],["#4102","South",35,32,"On time"],["#4103","North",25,42,"Late"],["#4104","East",40,38,"On time"],["#4105","North",30,39,"Late"],["#4106","South",30,28,"On time"],["#4107","East",35,37,"Late"],["#4108","North",20,29,"Late"]];
function renderDetective(){
 gameFrame("Data Detective","You are the operations analyst. Inspect the order data, find the pattern and recommend an action. No multiple-choice questions: investigate the evidence.",`
 <div class="mission-story"><strong>Case file:</strong> Delivery performance is falling. Study the dataset and calculate which region has the most late orders. Then choose an operational intervention.</div>
 <div class="table-wrap"><table class="data-table"><thead><tr>${records[0].map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${records.slice(1).map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
 <div class="meter-grid" style="margin-top:14px"><div class="meter"><small>TOTAL ORDERS</small><strong>8</strong></div><div class="meter"><small>LATE ORDERS</small><strong>5</strong></div><div class="meter"><small>CASE OBJECTIVE</small><strong>Find cause</strong></div></div>
 <label class="field-label" for="region-answer">Which region has the most late orders?</label><select class="task-select" id="region-answer"><option value="">Select region…</option><option>North</option><option>South</option><option>East</option></select>
 <label class="field-label">Choose your first intervention</label><div class="choice-grid"><button class="choice-card" data-intervention="capacity"><b>Review North-region picking capacity</b><small>Check workload and staffing at the likely bottleneck.</small></button><button class="choice-card" data-intervention="discount"><b>Offer discounts to all customers</b><small>Try to offset poor delivery experience with promotions.</small></button><button class="choice-card" data-intervention="route"><b>Audit route planning in North</b><small>Compare planned and actual travel times.</small></button><button class="choice-card" data-intervention="ignore"><b>Wait for another month's data</b><small>Take no immediate action.</small></button></div><div id="game-feedback"></div>${gameControls("Submit investigation →",false)}`);
 let intervention="";$$("[data-intervention]").forEach(b=>b.onclick=()=>{intervention=b.dataset.intervention;$$("[data-intervention]").forEach(x=>x.classList.toggle("selected",x===b));});
 $("#game-next").onclick=()=>{const region=$("#region-answer").value;if(!region||!intervention){feedback("Select the region and an intervention to submit your case.","warn");return;}let correct=region==="North",good=intervention==="capacity"||intervention==="route";finish("detective",(correct?3:0)+(good?3:0),correct&&good?"Pattern found · Evidence-led action":"Investigation submitted");};
}
function renderFormula(){
 gameFrame("Formula Forge","The sales manager wants revenue from the North region. Build a formula to calculate it. Use the dataset and run your formula in the mini spreadsheet engine.",`
 <div class="table-wrap"><table class="data-table"><thead><tr>${["Region","Product","Units","Revenue"].map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${[["North","Laptop",4,2400],["South","Phone",8,3200],["North","Phone",5,2000],["East","Laptop",3,1800],["South","Laptop",2,1200],["North","Tablet",2,1000]].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
 <div class="mission-story"><strong>Manager's request:</strong> "Calculate total revenue from North." Region values are in A2:A7 and revenue values are in D2:D7. Write a SUMIF formula.</div>
 <label class="field-label" for="formula-input">Formula editor</label><input id="formula-input" class="task-input" value='=SUMIF(A2:A7,"North",D2:D7)' spellcheck="false">
 <div class="formula-hint">Supported in this lab: SUM, AVERAGE, MIN, MAX, COUNT and SUMIF. Try changing the criteria to South or East.</div>
 <div id="game-feedback"></div>${gameControls("Run formula →",false)}`);
 $("#game-next").onclick=()=>{const f=$("#formula-input").value.replace(/\s/g,"");let result=null;const data=[["North",2400],["South",3200],["North",2000],["East",1800],["South",1200],["North",1000]];
 let m=f.match(/^=SUMIF\(A2:A7,"([^"]+)",D2:D7\)$/i);if(m)result=data.filter(r=>r[0].toLowerCase()===m[1].toLowerCase()).reduce((s,r)=>s+r[1],0);
 if(result===null){let m2=f.match(/^=SUM\(D2:D7\)$/i);if(m2)result=data.reduce((s,r)=>s+r[1],0);}
 if(result===null){feedback("Formula not recognised. Check the range, quotation marks and function name.","warn");return;}
 const correct=result===5400;feedback(`Formula result: ₹${result.toLocaleString("en-IN")}. ${correct?"Correct — North revenue is ₹5,400.":"Formula ran, but the North-region total is ₹5,400. Check the criteria."}`,correct?"good":"warn");$("#game-next").textContent="Finish formula lab →";$("#game-next").onclick=()=>finish("formula",correct?6:2,correct?"Formula built successfully":"Formula executed");};
}
const clientSteps=[
{speaker:"Client",line:"We've been waiting for the updated delivery report. This delay is affecting our planning. What's happening?",options:[["I understand the delay is affecting your planning. I'll check the latest status and send a clear update by 3 PM.",true,"You acknowledged the impact, took ownership and gave a specific next step."],["It's not our fault. The warehouse team is responsible.",false,"Blaming another team avoids ownership and does not help the client plan."],["Please calm down. We are working on it.",false,"This can sound dismissive and gives no useful timeline."]]},
{speaker:"Client",line:"I need something concrete. Can you tell me what you will do if the shipment misses today's window?",options:[["I'll confirm the recovery option with dispatch, share the revised ETA and let you know before the current window closes.",true,"Clear contingency, a revised ETA and proactive communication build confidence."],["Let's wait and see what happens.",false,"This leaves the client without a plan."],["You should arrange another supplier.",false,"It shifts the burden without exploring a service recovery option."]]},
{speaker:"Client",line:"Okay. Please send the update and make sure this doesn't happen again.",options:[["I'll send the update shortly. I'll also review the handoff that caused the delay and share one preventive action after the review.",true,"You close the loop and commit to investigating the process, not making an unrealistic guarantee."],["Sure, it will never happen again.",false,"An absolute promise is difficult to guarantee and may damage trust if repeated."],["Fine, I'll tell the team.",false,"It is vague and does not confirm what the client can expect."]]}
];
function renderClient(){
 const s=clientSteps[gameState.step];gameFrame("Client Quest","A branching dialogue RPG. Read the client message, choose your response and see how the relationship changes.",`
 <div class="panel-top"><b>CLIENT RELATIONSHIP</b><small>Conversation ${gameState.step+1} / 3</small></div><div class="meter-grid"><div class="meter"><small>TRUST</small><strong>${gameState.trust||50}/100</strong><div class="meter-track"><span style="width:${gameState.trust||50}%"></span></div></div><div class="meter"><small>ISSUE STATUS</small><strong>${gameState.step===2?"Closing":"Open"}</strong></div></div>
 <div class="conversation"><div class="npc">👤</div><div class="bubble"><b>${s.speaker}</b><br>${s.line}</div></div><div class="response-list">${s.options.map((o,i)=>`<button class="response-btn" data-response="${i}">${o[0]}</button>`).join("")}</div><div id="game-feedback"></div>`);
 $$("[data-response]").forEach(b=>b.onclick=()=>{const o=s.options[Number(b.dataset.response)];gameState.trust=(gameState.trust||50)+(o[1]?17:-12);gameState.score+=o[1]?2:0;$$("[data-response]").forEach(x=>x.disabled=true);feedback(o[2],o[1]?"good":"warn");const next=document.createElement("div");next.className="game-actions";next.innerHTML=`<span class="muted">Trust score: ${gameState.trust}/100</span><button class="btn primary">${gameState.step===2?"Close conversation →":"Continue conversation →"}</button>`;$("#game-mount .game-panel").appendChild(next);next.querySelector("button").onclick=()=>{gameState.step++;if(gameState.step<3)renderClient();else finish("client",gameState.score,gameState.trust>=90?"Client relationship strengthened":"Conversation completed");};});
}
const interviewPrompts=[
["Tell me about yourself.","Build a 45–60 second introduction: current background, relevant skills, one project and the role you want."],
["Tell me about a time you solved a problem.","Use a clear example. Explain the situation, your responsibility, the action you personally took and the result."],
["Why are you interested in an operations or analyst role?","Connect your strengths to the work: process thinking, data, communication and continuous improvement."]
];
function renderInterview(){
 const p=interviewPrompts[gameState.step];gameFrame("Interview RPG","Enter the interview room. Prepare your answer, type it or speak it aloud, then review it against a practical communication checklist.",`
 <div class="conversation"><div class="npc">🧑‍💼</div><div class="bubble"><b>Interviewer</b><br>${p[0]}<br><small>${p[1]}</small></div></div>
 <label class="field-label" for="interview-answer">Your answer</label><textarea class="task-area" id="interview-answer" rows="6" placeholder="Write your answer here. Be specific and use a real example."></textarea>
 <div class="game-actions"><button class="btn secondary" id="read-question">🔊 Read question</button><button class="btn primary" id="review-answer">Review my answer →</button></div><div id="game-feedback"></div>`);
 $("#read-question").onclick=()=>{if("speechSynthesis"in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(p[0]));}else feedback("Speech playback is not available in this browser.","warn");};
 $("#review-answer").onclick=()=>{const text=$("#interview-answer").value.trim(),words=text.split(/\s+/).filter(Boolean);if(words.length<15){feedback("Add more detail. Aim for at least 15 words and include an example where possible.","warn");return;}let checks=[words.length>=30,/\b(i|my|we)\b/i.test(text),/\b(example|project|because|result|improved|created|managed|analysed|analyzed|handled)\b/i.test(text),/\b(learn|outcome|therefore|so|impact|achieved)\b/i.test(text)];gameState.score+=checks.filter(Boolean).length;feedback(`Practice review: ${checks.filter(Boolean).length}/4 checks met — ${checks.map((x,i)=>["Useful detail","Personal ownership","Supporting example","Outcome or learning"][i]+": "+(x?"met":"work on this")).join(" · ")}. This is a local checklist, not an AI assessment of your speaking or accent.`);const next=document.createElement("div");next.className="game-actions";next.innerHTML=`<span class="muted">${words.length} words · Keep it natural</span><button class="btn primary">${gameState.step===2?"Finish interview →":"Next question →"}</button>`;$("#game-mount .game-panel").appendChild(next);next.querySelector("button").onclick=()=>{gameState.step++;if(gameState.step<3)renderInterview();else finish("interview",gameState.score,"Interview practice complete");};};
}
function renderBudget(){
 gameFrame("Budget Builder","Your monthly take-home income is ₹45,000. Allocate it across needs, savings, learning and fun. Keep your plan within income.",`
 <div class="meter-grid"><div class="meter"><small>MONTHLY INCOME</small><strong>₹45,000</strong></div><div class="meter"><small>ALLOCATED</small><strong id="allocated">₹45,000</strong></div><div class="meter"><small>LEFT TO PLAN</small><strong id="remaining">₹0</strong></div></div>
 <div id="budget-controls">${[["needs","Essentials (rent, food, travel)"],["savings","Savings & emergency fund"],["learning","Learning & career"],["fun","Lifestyle & entertainment"]].map(([k,l])=>`<div class="budget-row"><label>${l}</label><output id="out-${k}">₹${gameState.alloc[k].toLocaleString("en-IN")}</output><input type="range" min="0" max="45000" step="500" value="${gameState.alloc[k]}" data-budget="${k}"></div>`).join("")}</div>
 <div id="game-feedback"></div>${gameControls("Review my budget →",false)}`);
 const update=()=>{let sum=Object.values(gameState.alloc).reduce((a,b)=>a+b,0);$("#allocated").textContent="₹"+sum.toLocaleString("en-IN");$("#remaining").textContent="₹"+(45000-sum).toLocaleString("en-IN");$$("[data-budget]").forEach(b=>$("#out-"+b.dataset.budget).textContent="₹"+gameState.alloc[b.dataset.budget].toLocaleString("en-IN"));};
 $$("[data-budget]").forEach(b=>b.oninput=()=>{let key=b.dataset.budget,old=gameState.alloc[key],v=Number(b.value),other=Object.keys(gameState.alloc).filter(k=>k!==key).reduce((s,k)=>s+gameState.alloc[k],0);if(v+other>45000){b.value=45000-other;v=Number(b.value);}gameState.alloc[key]=v;update();});
 $("#game-next").onclick=()=>{let a=gameState.alloc,sum=Object.values(a).reduce((x,y)=>x+y,0),ok=sum===45000,balanced=a.needs>=18000&&a.savings>=5000&&a.learning>=2000;feedback(ok?(balanced?"Balanced plan. You covered essentials and protected savings and learning.":"Your plan adds up, but consider whether savings and learning have enough allocation."):"Your allocation must equal ₹45,000. Adjust the sliders to use the full budget.",ok?"good":"warn");if(ok){$("#game-next").textContent="Complete budget →";$("#game-next").onclick=()=>finish("budget",(balanced?6:3),"Monthly budget balanced");}};
}
function renderCashflow(){
 gameFrame("Cashflow Crisis","A small distribution business has a tight cash position. Make decisions to keep the business running through a surprise cost and a late customer payment.",`
 <div class="meter-grid"><div class="meter"><small>OPENING CASH</small><strong>₹60,000</strong></div><div class="meter"><small>SUPPLIER DUE</small><strong>₹35,000</strong></div><div class="meter"><small>CUSTOMER PAYMENT</small><strong>₹50,000</strong></div></div>
 <div class="mission-story"><strong>Situation:</strong> Your largest customer has delayed a ₹50,000 payment by 15 days. A supplier invoice of ₹35,000 is due tomorrow. You also need ₹10,000 to keep daily operations running.</div>
 <div class="choice-grid"><button class="choice-card" data-cash="negotiate"><b>Negotiate a part-payment with supplier</b><small>Pay ₹20,000 now and agree a date for the balance.</small></button><button class="choice-card" data-cash="loan"><b>Take a short-term loan</b><small>Keep the supplier whole, but add financing cost.</small></button><button class="choice-card" data-cash="delay"><b>Ignore supplier until customer pays</b><small>Protect cash today, risk supply interruption.</small></button></div><div id="game-feedback"></div>${gameControls("Choose cashflow plan →",false)}`);
 let choice="";$$("[data-cash]").forEach(b=>b.onclick=()=>{choice=b.dataset.cash;$$("[data-cash]").forEach(x=>x.classList.toggle("selected",x===b));});
 $("#game-next").onclick=()=>{if(!choice){feedback("Choose a cashflow plan first.","warn");return;}const good=choice==="negotiate";feedback(good?"A negotiated part-payment protects supplier trust while preserving enough cash for daily operations.":"This option may solve one immediate issue but creates a cost or relationship risk.","good");$("#game-next").textContent="Close cashflow case →";$("#game-next").onclick=()=>finish("cashflow",good?6:2,good?"Cashflow stabilised":"Cashflow decision recorded");};
}
function renderProgress(){
 if(!$("#progress-list"))return;let rows=WORLDS.map(w=>`<div class="progress-row"><b>${w.icon} ${w.short}</b><span>${completedCount(w.id)} / ${w.games.length} missions cleared</span></div>`).join("");$("#progress-list").innerHTML=rows+`<div class="section-title"><div><div class="eyebrow">RECENT ACTIVITY</div><h2>Latest missions</h2></div></div>`+(profile.history.length?profile.history.slice(0,8).map(h=>`<div class="progress-row"><b>${h.world} · ${h.game}</b><span>${h.date} · +${h.xp} XP</span></div>`).join(""):'<div class="empty-note">No missions completed yet. Choose a world and start playing.</div>');
}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-nav]");if(nav){showScreen(nav.dataset.nav);return;}
 const world=e.target.closest("[data-world]");if(world){openWorld(world.dataset.world);return;}
 const card=e.target.closest("[data-game]");if(card){launch(card.dataset.game);return;}
});
$("#back-worlds").onclick=()=>openWorld(activeWorld.id);
$("#daily-quest").onclick=()=>{const w=WORLDS[Math.floor(Math.random()*WORLDS.length)];openWorld(w.id);showToast("Daily side quest: "+w.short);};
$("#reset-progress").onclick=()=>{if(confirm("Reset all PLAYNOVA XP and completed missions on this device?")){profile={xp:0,completed:{},history:[]};save();renderWorlds();showToast("Progress reset.");}};
renderWorlds();updateStats();showScreen("home");
})();