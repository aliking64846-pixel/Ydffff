/* Future100 Content Engine — مصدره نص الكتاب المنشور داخل المستودع */
(function(){
  const CONTENT_VERSION='3.1.0';
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
  const stopWords=new Set(['العراق','العراقي','العراقيه','العربية','العربي','درس','الوحدة','الفصل','من','في','الى','على','عن','مع','و','او','هو','هي','هذا','هذه','التي','الذي','بعض','اهم','اهمية','يتعرف','يفهم','يدرس','يراجع','يحدد','يميز','بين','ضمن','حول','كما','وقد','كان','تكون','يكون','بعد','الى','الى']);
  function stripPrefix(w){return w.length>5&&/^[وفبكل]/.test(w)?w.slice(1):w}
  function tokens(s){
    return [...new Set(norm(s).split(' ').map(stripPrefix).filter(x=>x.length>3&&!stopWords.has(x)))];
  }
  function editDistanceOne(a,b){
    if(a===b)return true;
    if(Math.abs(a.length-b.length)>1)return false;
    let i=0,j=0,edits=0;
    while(i<a.length&&j<b.length){
      if(a[i]===b[j]){i++;j++;continue;}
      if(++edits>1)return false;
      if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++;}
    }
    if(i<a.length||j<b.length)edits++;
    return edits<=1;
  }
  function scoreTitle(title,summary,text){
    const n=norm(text), titleNorm=norm(title);
    const titleWords=tokens(title), pageWords=tokens(text);
    let titleScore=0;
    for(const w of titleWords){
      if(pageWords.includes(w)||n.includes(w))titleScore+=5;
      else if(w.length>=6&&pageWords.some(p=>editDistanceOne(w,p)))titleScore+=3;
    }
    if(titleNorm.length>5&&n.includes(titleNorm))titleScore+=14;
    const objective=/الأهداف السلوكية|األهداف السلوكية|الأهداف التعليمية|األهداف التعليمية/.test(text);
    const questionPage=/الأسئلة|األسئل|اسئلة|أسئلة/.test(text);
    if(objective)titleScore-=12;
    if(questionPage)titleScore-=8;
    const first=norm(text.slice(0,360));
    if(titleNorm.length>5&&first.includes(titleNorm))titleScore+=6;
    if(titleScore>0)return titleScore;
    // Only use summary words when the title itself is not found anywhere on this page.
    const summaryWords=tokens(summary).slice(0,12);
    return summaryWords.reduce((s,w)=>s+(n.includes(w)?0.4:0),0)-(objective?8:0)-(questionPage?6:0);
  }
  function pickPages(l,ps){
    if(!ps.length)return [];
    const ordered=ps.slice().sort((a,b)=>a.page-b.page);
    const scored=ordered.map(p=>({p,s:scoreTitle(l.title,l.summary,p.text)}));
    const positive=scored.filter(x=>x.s>0);
    if(!positive.length)return [];
    positive.sort((a,b)=>b.s-a.s||a.p.page-b.p.page);
    const anchor=positive[0].p;
    const selected=[anchor];
    // Include the next pages of this lesson only. Stop before a different lesson
    // heading appears near the top of a page, and never mix distant matching pages.
    const sameSubject=typeof lessons!=='undefined'?lessons.filter(x=>x.subject===l.subject&&x.id!==l.id):[];
    const sortedAnchorIndex=ordered.findIndex(p=>p.page===anchor.page);
    for(let i=sortedAnchorIndex+1;i<ordered.length&&selected.length<4;i++){
      const p=ordered[i];
      const top=norm(p.text.slice(0,420));
      const otherHeading=sameSubject.some(other=>{
        const title=norm(other.title);
        return title.length>5&&top.includes(title)&&!(/الأهداف السلوكية|األهداف السلوكية|الأهداف التعليمية|األهداف التعليمية/.test(p.text));
      });
      if(otherHeading)break;
      selected.push(p);
    }
    return selected.filter(p=>p.text&&p.text.length>0);
  }
  function clean(s){return s.replace(/\s+/g,' ').trim()}
  function sentences(text){return text.split(/(?<=[.!؟:؛])\s+/).map(clean).filter(x=>x.length>=25&&x.length<=360)}
  function unique(items,key){
    const seen=new Set(); return items.filter(x=>{const k=key(x);if(!k||seen.has(k))return false;seen.add(k);return true;});
  }
  function extractQuestionBlocks(picked){
    const out=[];
    for(const p of picked){
      const t=clean(p.text);
      const m=t.match(/(?:الأسئل[ةـ]|الاسئله)([\s\S]{0,12000})/);
      if(!m) continue;
      const block=m[1];
      const re=/(?:س\s*\.?\s*|س\.?\s*\d+\s*\.?\s*)([^؟\n]{8,240}؟?)/g;
      let q; while((q=re.exec(block))){
        const question=clean(q[1]).replace(/^[:.\- ]+/,'');
        if(question.length>=8) out.push({question,answer:'',page:p.page});
      }
    }
    return unique(out,x=>norm(x.question)).slice(0,30);
  }
  function makeContent(l,ps){
    const picked=pickPages(l,ps);
    const raw=clean(picked.map(x=>x.text).join(' '));
    const sourceMissing=raw.length<120;
    const usableRaw=sourceMissing?clean(l.summary):raw;
    const ss=sentences(usableRaw).filter(x=>!/(الأهداف السلوكية|األهداف السلوكية|الأهداف التعليمية|األهداف التعليمية|معلومة إثرائية|نشاط\s*[-–]?|األسئل|الأسئلة|الفصل الدراسي|الصف الثالث)/.test(x));
    const keySentences=sentences(raw).filter(x=>!/(حقوق الطبع|جميع الحقوق|وزارة التربية|الصف الثالث|الفصل الدراسي)/.test(x)).slice(0,5);
    const info=[l.summary,...keySentences.filter(x=>norm(x)!==norm(l.summary))].slice(0,6);
    const defs=[],reasons=[],enumers=[],blanks=[],tf=[];
    const chapterQuestions=extractQuestionBlocks(picked).filter(q=>String(q.answer||'').trim());
    const ministerial=(window.Future100MinisterialBank?.byLesson?.(l.id)||[])
      .filter(q=>q.verified===true&&q.sourceId&&q.sourceUrl&&String(q.answer||'').trim())
      .map(q=>({...q,type:'وزاري موثّق'}));
    const titleTerms=tokens(l.title);
    ss.filter(x=>/(هو|هي|يعرف|تعرف|يقصد|المقصود|عبارة عن|تتكون|يتكون|يطلق على)/.test(x)&&titleTerms.some(w=>norm(x).includes(w)))
      .slice(0,8).forEach(x=>{
        const term=(l.title||'المفهوم').replace(/^(ما|تعريف|درس)\s+/,'');
        defs.push({question:'ما المقصود بـ '+term+'؟',answer:x,source:'الكتاب'});
      });
    ss.filter(x=>/(بسبب|لان|لأن|نظرا|نتيجة|يعود ذلك|يؤدي الى|تؤدي الى|يسبب|يسهم)/.test(x)&&titleTerms.some(w=>norm(x).includes(w)))
      .slice(0,8).forEach(x=>reasons.push({question:'علل/فسر: '+x,answer:x,source:'الكتاب'}));
    const listLines=raw.split(/(?=\b(?:[1-9]|10|11|12|13|14|15)[.)]\s)/).map(clean)
      .filter(x=>/^\d+[.)]\s/.test(x)&&x.length<500);
    if(listLines.length>=2) enumers.push({question:'عدد/اذكر ما يأتي:',answer:listLines.slice(0,10).map(x=>x.replace(/^\d+[.)]\s*/,'')),source:'الكتاب'});
    ss.slice(0,8).forEach(x=>{
      const words=x.split(' ').filter(Boolean);
      if(words.length>=9){
        const idx=Math.min(words.length-2,Math.max(2,Math.floor(words.length*.55)));
        const answer=words[idx];
        blanks.push({question:x.replace(answer,'________'),answer,source:'مستخرج من نص الكتاب'});
      }
    });
    // Do not fabricate a false/true exam bank by marking every extracted sentence true.
    // This section stays empty until the textbook contains a real, answerable statement set.
    const qbank=(typeof quizBank!=='undefined'?quizBank:[]).filter(x=>{
      const t=norm((x.q||'')+' '+(x.a||''));
      const words=norm(l.title).split(' ').filter(w=>w.length>3);
      return words.some(w=>t.includes(w));
    }).slice(0,12).map(x=>({question:x.q,answer:x.a,type:x.type||'تدريب'}));
    for(const q of qbank) chapterQuestions.push(q);
    let fallback=sourceMissing;
    if(chapterQuestions.length<2){
      fallback=true;
      chapterQuestions.push(
        {question:'ما موضوع درس «'+l.title+'»؟',answer:l.summary,source:'تدريب تثبيت — ملخص الدرس'},
        {question:'ما الفكرة الأساسية في درس «'+l.title+'»؟',answer:l.summary,source:'تدريب تثبيت — ملخص الدرس'}
      );
    }
    if(defs.length===0) defs.push({question:'ما المقصود بموضوع درس «'+l.title+'»؟',answer:l.summary,source:'تدريب تثبيت — ملخص الدرس'});
    if(reasons.length===0) reasons.push({question:'علل أهمية دراسة «'+l.title+'».',answer:'لفهم الأفكار والمعلومات الأساسية الواردة في هذا الدرس وربطها بالأسئلة.',source:'تدريب تثبيت — ليس وزارياً'});
    if(enumers.length===0) enumers.push({question:'اذكر أهم فكرة في درس «'+l.title+'».',answer:[l.summary],source:'تدريب تثبيت — ليس وزارياً'});
    if(blanks.length===0) blanks.push({question:'أكمل: يتناول هذا الدرس موضوع ______.',answer:l.title,source:'تدريب تثبيت — ليس وزارياً'});
    // Leave true/false empty unless a real, answerable item is available.
    // The UI will state that this type has not yet been reviewed.
    return {
      version:CONTENT_VERSION,lessonId:l.id,sourceFile:'book-'+sourceFor(l)+'.txt',
      pages:[...new Set(picked.map(x=>x.page))],info,
      definitions:unique(defs,x=>norm(x.question)+'|'+norm(x.answer)).slice(0,8),
      reasons:unique(reasons,x=>norm(x.answer)).slice(0,8),
      enumerate:enumers,blanks:unique(blanks,x=>norm(x.question)).slice(0,8),
      trueFalse:unique(tf,x=>norm(x.question)).slice(0,8),
      chapterQuestions:unique(chapterQuestions,x=>norm(x.question)).slice(0,20),
      ministerial:unique(ministerial,x=>norm(x.question)).slice(0,50),
      fallback,sourceMissing,
      raw:usableRaw.slice(0,7000)
    };
  }
  function typeLabel(k){return ({definitions:'📌 تعريفات',reasons:'❓ علل وفسر',enumerate:'🔢 عدد/اذكر',blanks:'✏️ فراغات',trueFalse:'✅❌ صح وخطأ',chapterQuestions:'📝 أسئلة الدرس',ministerial:'🏆 وزاريات'})[k]||k}
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
      const sections=['definitions','reasons','enumerate','blanks','trueFalse','chapterQuestions','ministerial'];
      const ls=window.Future100Learning?.lessonStats?window.Future100Learning.lessonStats(id):{total:0,mastery:0,due:0,mistakes:0,ministerial:0};
      box.innerHTML='<div class="lessonHead"><span class="tag">'+esc(l.subject)+' • '+esc(l.chapter)+'</span><h2>'+esc(l.title)+'</h2><p>'+esc(l.summary)+'</p><div class="sourceNote">📚 المحتوى مستخرج من الكتاب المنشور داخل المشروع • الصفحات: '+c.pages.join('، ')+'</div></div>'+
      '<div class="examPanel"><div class="kpiGrid"><div class="kpi"><b>'+ls.total+'</b><span>أسئلة الدرس</span></div><div class="kpi"><b>'+ls.mastery+'%</b><span>نسبة الإتقان</span></div><div class="kpi"><b>'+ls.due+'</b><span>مستحقة للتكرار</span></div><div class="kpi"><b>'+ls.mistakes+'</b><span>أخطاء مسجلة</span></div></div><div style="margin-top:12px"><div class="sessionBar"><i style="width:'+ls.mastery+'%"></i></div><small class="small">النظام يعيد الأسئلة الضعيفة تلقائياً ويؤخر الأسئلة المتقنة.</small></div></div>'+
      '<div class="lessonBody"><h3>🧠 معلومات قصيرة</h3><div class="fact">'+c.info.map(esc).join('<br><br>')+'</div>'+
      sections.map(k=>'<section class="contentSection"><h3>'+typeLabel(k)+'</h3>'+(c[k]&&c[k].length?c[k].map((x,i)=>'<article class="studyItem"><b>'+(i+1)+'. '+esc(x.question||'')+'</b><small class="small">'+esc(x.sourceLabel||x.source||x.type||(x.verified?'وزاري موثّق':'تدريب من الكتاب'))+'</small><div class="studyAnswer">'+esc(Array.isArray(x.answer)?x.answer.join(' • '):x.answer||'')+'</div></article>').join(''):'<div class="empty">سيتم إدخال هذا النوع بعد تدقيقه.</div>')+'</section>').join('')+
      '<div class="actions"><button class="primary" onclick="startRichQuiz('+id+')">ابدأ اختبار الدرس ←</button><button class="ghost" onclick="completeLesson('+id+')">تمت المراجعة ✓</button></div></div>';
    }catch(e){box.innerHTML='<div class="lessonCard"><div class="dangerNote">تعذر تحميل محتوى الكتاب. افتح الكتاب كامل وتأكد من نشر ملفات book-*.txt.</div></div>';console.error(e)}
  }
  window.openLesson=openRich;
  window.startRichQuiz=function(id){
    if(window.Future100Learning?.startLessonQuiz){window.Future100Learning.startLessonQuiz(id);return;}
    const l=lessons.find(x=>x.id===id), c=window.lessonContentCache?.[id];
    if(!l||!c){openRich(id);return}
    const qs=[...(c.ministerial||[]),...(c.chapterQuestions||[]),...(c.definitions||[]),...(c.reasons||[]),...(c.enumerate||[]),...(c.blanks||[]),...(c.trueFalse||[])].slice(0,15);
    if(!qs.length){toast('لا توجد أسئلة كافية لهذا الدرس بعد');return}
    setView('quiz'); renderQuiz(qs.map(x=>({q:x.question,a:Array.isArray(x.answer)?x.answer.join('، '):x.answer,type:x.type||'تدريب من الكتاب',lessonId:id,verified:x.verified===true})));
  };
  window.Future100Content={version:CONTENT_VERSION,get};
})();