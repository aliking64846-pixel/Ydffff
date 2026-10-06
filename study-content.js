/* Future100 Content Engine — مصدره نص الكتاب المنشور داخل المستودع */
(function(){
  const CONTENT_VERSION='3.0.0';
  let cache={};
  const files=['front','geography','history','national'];

  function norm(s){
    return String(s||'').replace(/[ًٌٍَُِّْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[^\u0600-\u06FF0-9A-Za-z\s]/g,' ').replace(/\s+/g,' ').trim().toLowerCase();
  }
  function pages(raw){
    const ms=[...raw.matchAll(/<PARSED TEXT FOR PAGE: (\d+) \/ 160>/g)];
    return ms.map((m,i)=>({page:+m[1],text:raw.slice(m.index+m[0].length,i+1<ms.length?ms[i+1].index:raw.length).trim()}));
  }
  async function load(k){
    if(cache[k]) return cache[k];
    const r=await fetch('book-'+k+'.txt',{cache:'force-cache'});
    if(!r.ok) throw new Error(k+' '+r.status);
    cache[k]=pages(await r.text());
    return cache[k];
  }
  function sourceFor(l){
    if(l.subject==='الجغرافية') return 'geography';
    if(l.subject==='التاريخ') return 'history';
    if(l.subject==='التربية الوطنية والاجتماعية') return 'national';
    return 'front';
  }
  function scoreTitle(title,text){
    const words=norm(title).split(' ').filter(x=>x.length>2);
    const n=norm(text);
    return words.reduce((s,w)=>s+(n.includes(w)?1:0),0);
  }
  function pickPages(l,ps){
    const scored=ps.map(p=>({p,s:scoreTitle(l.title,p.text)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s);
    if(!scored.length) return [];
    const best=scored[0].s;
    const anchors=scored.filter(x=>x.s>=Math.max(1,best-1)).map(x=>x.p.page).sort((a,b)=>a-b);
    const lo=Math.max(1,(anchors[0]||1)-1), hi=Math.min(160,(anchors[anchors.length-1]||anchors[0]||1)+2);
    return ps.filter(p=>p.page>=lo&&p.page<=hi);
  }
  function clean(s){return s.replace(/\s+/g,' ').trim()}
  function sentences(text){return text.split(/(?<=[.!؟:؛])\s+/).map(clean).filter(x=>x.length>=25&&x.length<=360)}
  function makeContent(l,ps){
    const picked=pickPages(l,ps);
    const raw=clean(picked.map(x=>x.text).join(' '));
    const ss=sentences(raw);
    const info=[];
    const defs=[],reasons=[],enumers=[],blanks=[],tf=[];
    info.push(l.summary);
    ss.filter(x=>/\b(هو|هي|يعرف|تعرف|يقصد|المقصود|عبارة عن|تتكون|يتكون)\b/.test(x)).slice(0,5).forEach(x=>defs.push({question:'ما المقصود بـ '+l.title+'؟',answer:x,source:'الكتاب'}));
    ss.filter(x=>/(بسبب|لان|لأن|نظرا|نتيجة|يعود ذلك|يؤدي الى|تؤدي الى)/.test(x)).slice(0,6).forEach(x=>reasons.push({question:'علل/فسر: '+x.slice(0,Math.min(100,x.length))+'…',answer:x,source:'الكتاب'}));
    const numbered=raw.split(/\n+/).map(clean).filter(x=>/^\d+\s+/.test(x)&&x.length<320);
    if(numbered.length) enumers.push({question:'اذكر ما ورد في هذا الجزء من الدرس.',answer:numbered.slice(0,8),source:'الكتاب'});
    ss.slice(0,5).forEach(x=>{const words=x.split(' ');if(words.length>=8) blanks.push({question:x.replace(words[Math.floor(words.length/2)],'________'),answer:words[Math.floor(words.length/2)],source:'مستخرج من نص الكتاب'});});
    ss.filter(x=>!/(نشاط|خريطة|شكل|صفحة)/.test(x)).slice(0,6).forEach(x=>tf.push({question:x,answer:true,correction:x,source:'الكتاب'}));
    const q=(typeof quizBank!=='undefined'?quizBank:[]).filter(x=>{
      const t=norm((x.q||'')+' '+(x.a||'')+' '+l.title);
      return norm(l.title).split(' ').filter(w=>w.length>3).some(w=>t.includes(w));
    }).slice(0,12);
    return {version:CONTENT_VERSION,lessonId:l.id,sourceFile:'book-'+sourceFor(l)+'.txt',pages:picked.map(x=>x.page),info,definitions:defs,reasons,enumerate:enumers,blanks,trueFalse:tf,chapterQuestions:q.map(x=>({question:x.q,answer:x.a,type:x.type||'تدريب من الكتاب'})),raw:raw.slice(0,7000)};
  }
  function typeLabel(k){return ({definitions:'📌 تعريفات',reasons:'❓ علل وفسر',enumerate:'🔢 عدد/اذكر',blanks:'✏️ فراغات',trueFalse:'✅❌ صح وخطأ',chapterQuestions:'📝 أسئلة الدرس'})[k]||k}
  function esc(s){return String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
  async function get(l){
    const key=l.subject;
    const ps=await load(sourceFor(l));
    return makeContent(l,ps);
  }
  async function openRich(id){
    const l=lessons.find(x=>x.id===id); if(!l)return;
    setView('lessonView');
    const box=$('#lessonContent');
    box.innerHTML='<div class="lessonCard"><div class="fact">⏳ جاري بناء المحتوى من نص الكتاب…</div></div>';
    try{
      const c=await get(l);
      window.lessonContentCache=window.lessonContentCache||{}; window.lessonContentCache[id]=c;
      const sections=['definitions','reasons','enumerate','blanks','trueFalse','chapterQuestions'];
      box.innerHTML='<div class="lessonHead"><span class="tag">'+esc(l.subject)+' • '+esc(l.chapter)+'</span><h2>'+esc(l.title)+'</h2><p>'+esc(l.summary)+'</p><div class="sourceNote">📚 المحتوى مستخرج من الكتاب المنشور داخل المشروع • الصفحات: '+c.pages.join('، ')+'</div></div>'+
      '<div class="lessonBody"><h3>🧠 معلومات قصيرة</h3><div class="fact">'+c.info.map(esc).join('<br><br>')+'</div>'+
      sections.map(k=>'<section class="contentSection"><h3>'+typeLabel(k)+'</h3>'+(c[k]&&c[k].length?c[k].map((x,i)=>'<article class="studyItem"><b>'+(i+1)+'. '+esc(x.question||'')+'</b><div class="studyAnswer">'+esc(Array.isArray(x.answer)?x.answer.join(' • '):x.answer||'')+'</div></article>').join(''):'<div class="empty">سيتم إدخال هذا النوع بعد تدقيقه.</div>')+'</section>').join('')+
      '<div class="actions"><button class="primary" onclick="startRichQuiz('+id+')">ابدأ اختبار الدرس ←</button><button class="ghost" onclick="completeLesson('+id+')">تمت المراجعة ✓</button></div></div>';
    }catch(e){box.innerHTML='<div class="lessonCard"><div class="dangerNote">تعذر تحميل محتوى الكتاب. افتح الكتاب كامل وتأكد من نشر ملفات book-*.txt.</div></div>';console.error(e)}
  }
  window.openLesson=openRich;
  window.startRichQuiz=function(id){
    const l=lessons.find(x=>x.id===id), c=window.lessonContentCache?.[id];
    if(!l||!c){openRich(id);return}
    const qs=[...(c.chapterQuestions||[]),...(c.definitions||[]),...(c.reasons||[]),...(c.enumerate||[]),...(c.blanks||[]),...(c.trueFalse||[])].slice(0,12);
    if(!qs.length){toast('لا توجد أسئلة كافية لهذا الدرس بعد');return}
    setView('quiz'); renderQuiz(qs.map(x=>({q:x.question,a:Array.isArray(x.answer)?x.answer.join('، '):x.answer,type:x.type||'تدريب من الكتاب'})));
  };
  window.Future100Content={version:CONTENT_VERSION,get};
})();