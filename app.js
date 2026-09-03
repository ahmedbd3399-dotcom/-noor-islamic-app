const A="https://api.aladhan.com/v1", Q="https://api.alquran.cloud/v1";
const surahs=[["الفاتحة",7],["البقرة",286],["آل عمران",200],["النساء",176],["المائدة",120],["الأنعام",165],["الأعراف",206],["الأنفال",75],["التوبة",129],["يونس",109],["هود",123],["يوسف",111],["الرعد",43],["إبراهيم",52],["الحجر",99],["النحل",128],["الإسراء",111],["الكهف",110],["مريم",98],["طه",135],["الأنبياء",112],["الحج",78],["المؤمنون",118],["النور",64],["الفرقان",77],["الشعراء",227],["النمل",93],["القصص",88],["العنكبوت",69],["الروم",60],["لقمان",34],["السجدة",30],["الأحزاب",73],["سبأ",54],["فاطر",45],["يس",83],["الصافات",182],["ص",88],["الزمر",75],["غافر",85],["فصلت",54],["الشورى",53],["الزخرف",89],["الدخان",59],["الجاثية",37],["الأحقاف",35],["محمد",38],["الفتح",29],["الحجرات",18],["ق",45],["الذاريات",60],["الطور",49],["النجم",62],["القمر",55],["الرحمن",78],["الواقعة",96],["الحديد",29],["المجادلة",22],["الحشر",24],["الممتحنة",13],["الصف",14],["الجمعة",11],["المنافقون",11],["التغابن",18],["الطلاق",12],["التحريم",12],["الملك",30],["القلم",52],["الحاقة",52],["المعارج",44],["نوح",28],["الجن",28],["المزمل",20],["المدثر",56],["القيامة",40],["الإنسان",31],["المرسلات",50],["النبأ",40],["النازعات",46],["عبس",42],["التكوير",29],["الانفطار",19],["المطففين",36],["الانشقاق",25],["البروج",22],["الطارق",17],["الأعلى",19],["الغاشية",26],["الفجر",30],["البلد",20],["الشمس",15],["الليل",21],["الضحى",11],["الشرح",8],["التين",8],["العلق",19],["القدر",5],["البينة",8],["الزلزلة",8],["العاديات",11],["القارعة",11],["التكاثر",8],["العصر",3],["الهمزة",9],["الفيل",5],["قريش",4],["الماعون",7],["الكوثر",3],["الكافرون",6],["النصر",3],["المسد",5],["الإخلاص",4],["الفلق",5],["الناس",6]];
const azkar=[
["أذكار الصباح","أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير."],
["أذكار المساء","أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير."],
["سيد الاستغفار","اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي وأبوء بذنبي فاغفر لي، فإنه لا يغفر الذنوب إلا أنت."],
["التسبيح","سبحان الله والحمد لله ولا إله إلا الله والله أكبر."],
["الصلاة على النبي ﷺ","اللهم صل وسلم وبارك على نبينا محمد ﷺ."]
];
let view=document.getElementById("view"), current="home", prayers=null;
function page(){return `<section class="page">${render(current)}</section>`}
function render(p){
 if(p==="home")return home();
 if(p==="quran")return quran();
 if(p==="azkar")return azkarPage();
 if(p==="prayer")return prayerPage();
 return more();
}
async function home(){
 return `<div class="hero"><h1>السلام عليكم ورحمة الله وبركاته 🌿</h1><p>مرحبًا بك في نُور — رفيقك اليومي للعبادة.</p><div class="next">الصلاة القادمة: <strong id="nextName">جاري الحساب...</strong><br><span id="nextTime"></span></div></div>
 <h2 class="sectionTitle">مواقيت اليوم</h2><div id="homePrayers" class="prayers"><div class="muted">جاري تحميل المواقيت...</div></div>
 <h2 class="sectionTitle">الوصول السريع</h2><div class="grid">
 <div class="card" onclick="go('quran')"><div class="emoji">📖</div><b>القرآن الكريم</b><span class="muted">قراءة واستماع</span></div>
 <div class="card" onclick="go('azkar')"><div class="emoji">🤲</div><b>الأذكار</b><span class="muted">وردك اليومي</span></div>
 <div class="card" onclick="go('prayer')"><div class="emoji">🕌</div><b>الصلاة</b><span class="muted">المواقيت والقبلة</span></div>
 <div class="card" onclick="tasbeeh()"><div class="emoji">📿</div><b>السبحة</b><span class="muted">عداد التسبيح</span></div></div>
 <h2 class="sectionTitle">آية عشوائية</h2><div id="ayahDay" class="card">جاري التحميل...</div>`;
}
function quran(){return `<h1>القرآن الكريم 📖</h1><input class="search" placeholder="ابحث عن سورة..." oninput="filterSurahs(this.value)"><div id="surahList" class="list" style="margin-top:12px">${surahHTML(surahs)}</div>`}
function surahHTML(arr){return arr.map((s,i)=>`<div class="surah" onclick="openSurah(${i+1})"><div class="num">${i+1}</div><div class="surahName"><b>سورة ${s[0]}</b><span class="muted">${s[1]} آية</span></div><span>›</span></div>`).join("")}
function azkarPage(){return `<h1>الأذكار والدعاء 🤲</h1><p class="muted">اختر وردًا وابدأ الذكر.</p><div class="list">${azkar.map((z,i)=>`<div class="dhikr"><b>${z[0]}</b><p>${z[1]}</p><button class="bigBtn" onclick="openDhikr(${i})">ابدأ الذكر</button></div>`).join("")}</div>`}
function prayerPage(){return `<h1>الصلاة 🕌</h1><div class="card"><b>الموقع</b><p class="muted">سيستخدم التطبيق موقعك لحساب المواقيت بدقة.</p><button class="bigBtn" onclick="locate()">تحديد موقعي الآن</button></div><h2 class="sectionTitle">مواقيت اليوم</h2><div id="prayerList" class="list"><div class="muted">جاري التحميل...</div></div><h2 class="sectionTitle">القبلة 🧭</h2><div class="card" style="text-align:center"><div style="font-size:70px">🕋</div><p id="qiblaText">اضغط لتحديد اتجاه القبلة</p><button class="bigBtn" onclick="qibla()">تحديد القبلة</button></div>`}
function more(){return `<h1>المزيد ☷</h1><div class="grid">
<div class="card" onclick="toast('سيتم تفعيل التقويم الهجري بالكامل في النسخة التالية')"><div class="emoji">🌙</div><b>التقويم الهجري</b></div>
<div class="card" onclick="toast('قسم رمضان جاهز للإضافة')"><div class="emoji">🌙</div><b>رمضان</b></div>
<div class="card" onclick="toast('مناسك الحج والعمرة')"><div class="emoji">🕋</div><b>الحج والعمرة</b></div>
<div class="card" onclick="names()"><div class="emoji">✨</div><b>أسماء الله الحسنى</b></div>
<div class="card" onclick="toast('سيتم إضافة مكتبة الحديث مع مصادر موثوقة')"><div class="emoji">📚</div><b>الحديث</b></div>
<div class="card" onclick="toast('الخطط والأهداف اليومية')"><div class="emoji">🎯</div><b>وردك اليومي</b></div></div>
<h2 class="sectionTitle">عن نُور</h2><div class="card"><b>نُور — رفيق العبادة</b><p class="muted">تطبيق إسلامي عربي يجمع القرآن والصلاة والأذكار والقبلة في مكان واحد.</p></div>`}
async function init(){
 document.querySelectorAll(".nav button").forEach(b=>b.onclick=()=>go(b.dataset.page));
 document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.dark=document.body.classList.contains("dark")};
 if(localStorage.dark==="true")document.body.classList.add("dark");
 await refresh();
}
async function refresh(){view.innerHTML=page(); if(current==="home"){loadPrayer("homePrayers");randomAyah()} if(current==="prayer")loadPrayer("prayerList");}
function go(p){current=p;document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===p));refresh()}
async function loadPrayer(target){
 let lat=30.0444,lon=31.2357; // fallback: Cairo
 if(navigator.geolocation){try{const pos=await new Promise((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{timeout:5000}));lat=pos.coords.latitude;lon=pos.coords.longitude}catch(e){}}
 try{let d=new Date(),date=String(d.getDate()).padStart(2,"0")+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+d.getFullYear();let r=await fetch(`${A}/timings/${date}?latitude=${lat}&longitude=${lon}&method=5`);let j=await r.json();prayers=j.data.timings;document.getElementById("hijri").textContent=`${j.data.date.hijri.day} ${j.data.date.hijri.month.ar} ${j.data.date.hijri.year} هـ`;
 const names=[["الفجر","Fajr"],["الظهر","Dhuhr"],["العصر","Asr"],["المغرب","Maghrib"],["العشاء","Isha"]];let el=document.getElementById(target);if(el)el.innerHTML=names.map(x=>`<div class="${target==='homePrayers'?'pray':'card'}"><b>${x[0]}</b><span>${prayers[x[1]]}</span></div>`).join(""); if(target==="homePrayers")nextPrayer(names); }catch(e){toast("تعذر تحميل المواقيت — تحقق من الاتصال")}}
function nextPrayer(ns){let now=new Date(),mins=now.getHours()*60+now.getMinutes();let found=ns.map(x=>[x[0],prayers[x[1]]]).find(x=>{let [h,m]=x[1].split(":").map(Number);return h*60+m>mins})||[ns[0][0],prayers.Fajr];document.getElementById("nextName").textContent=found[0];document.getElementById("nextTime").textContent=found[1]}
async function randomAyah(){try{let r=await fetch(`${Q}/ayah/random/quran-uthmani-quran-academy`),j=await r.json();let e=document.getElementById("ayahDay");if(e)e.innerHTML=`<div style="font-family:Amiri;font-size:24px;line-height:2">${j.data.text}</div><div class="muted">سورة ${j.data.surah.name} — الآية ${j.data.numberInSurah}</div>`}catch(e){}}
function filterSurahs(v){document.getElementById("surahList").innerHTML=surahHTML(surahs.filter(s=>s[0].includes(v.trim())))}
async function openSurah(n){view.innerHTML=`<section class="page"><button class="action" onclick="go('quran')">← القرآن</button><h1>سورة ${surahs[n-1][0]}</h1><div id="surahContent" class="muted">جاري تحميل السورة...</div></section>`;try{let r=await fetch(`${Q}/surah/${n}/quran-uthmani-quran-academy`),j=await r.json();let html=j.data.ayahs.map(a=>`<article class="ayah">${a.text} <small>﴿${a.numberInSurah}﴾</small><br><button class="action" onclick="playAyah(${a.number})">▶ استماع</button><button class="action" onclick="bookmark(${a.number})">☆ حفظ</button></article>`).join("");document.getElementById("surahContent").innerHTML=html}catch(e){toast("تعذر تحميل السورة")}}
function playAyah(n){new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${n}.mp3`).play().catch(()=>toast("اضغط السماح بتشغيل الصوت"))}
function bookmark(n){localStorage.setItem("bookmark",n);toast("تم حفظ الآية")}
function openDhikr(i){let count=0;view.innerHTML=`<section class="page"><button class="action" onclick="go('azkar')">← الأذكار</button><h1>${azkar[i][0]}</h1><div class="dhikr"><p style="font-size:24px;line-height:2">${azkar[i][1]}</p><div class="counter" id="count">0</div><button class="bigBtn" onclick="count++;document.getElementById('count').textContent=count">اضغط للذكر</button><br><br><button class="action" onclick="count=0;document.getElementById('count').textContent=0">تصفير</button></div></section>`}
function tasbeeh(){openDhikr(3)}
async function locate(){toast("سيتم تحديث المواقيت حسب موقعك عند السماح بالموقع");if(navigator.geolocation)navigator.geolocation.getCurrentPosition(()=>{current="prayer";refresh()})}
async function qibla(){if(!navigator.geolocation){return toast("الموقع غير مدعوم")}navigator.geolocation.getCurrentPosition(async p=>{let r=await fetch(`${A}/qibla/${p.coords.latitude}/${p.coords.longitude}`);let j=await r.json();document.getElementById("qiblaText").textContent=`اتجاه القبلة: ${Math.round(j.data.direction)}° من الشمال`},()=>toast("اسمح للتطبيق باستخدام الموقع"))}
function names(){view.innerHTML=`<section class="page"><h1>أسماء الله الحسنى ✨</h1><div class="grid">${["الرَّحْمَن","الرَّحِيم","الْمَلِك","الْقُدُّوس","السَّلَام","الْمُؤْمِن","الْمُهَيْمِن","الْعَزِيز","الْجَبَّار","الْمُتَكَبِّر","الْخَالِق","الْبَارِئ","الْمُصَوِّر","الْغَفَّار","الْقَهَّار","الْوَهَّاب","الرَّزَّاق","الْفَتَّاح","الْعَلِيم","السَّمِيع"].map(x=>`<div class="card" style="text-align:center"><b>${x}</b></div>`).join("")}</div></section>`}
function toast(t){let e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});\ninit();
