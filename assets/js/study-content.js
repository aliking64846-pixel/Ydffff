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
  const stopWords=new Set(['العراق','العراقي','العراقيه','العربية','العربي','درس','الوحدة','الفصل','من','في','الى','على','عن','مع','و','او','هو','هي','هذا','هذه','التي','الذي','التي','بعض','اهم','اهمية','يتعرف','يفهم','يدرس','يراجع','يحدد','يميز','بين','ضمن','حول','كما','وقد','كان','تكون','يكون','التي']);
  function tokens(s){
    return [...new Set(norm(s).split(' ').filter(x=>x.length>3&&!stopWords.has(x)))];
  }
  function scoreTitle(title,summary,text){
    const n=norm(text), titleNorm=norm(title);
    const titleWords=tokens(title), summaryWords=tokens(summary).filter(w=>!titleWords.includes(w)).slice(0,18);
    let score=0;
    for(const w of titleWords) if(n.includes(w)) score+=4;
    for(const w of summaryWords) if(n.includes(w)) score+=0.7;
    if(titleNorm.length>5&&n.includes(titleNorm)) score+=8;
    return score;
  }
  function pickPages(l,ps){
    if(!ps.length) return [];
    const ordered=ps.slice().sort((a,b)=>a.page-b.page);
    const scored=ordered.map(p=>({p,s:scoreTitle(l.title,l.summary,p.text)}));
    const max=Math.max(0,...scored.map(x=>x.s));
    if(max===0) return [];
    // Keep one contiguous passage around the strongest match. This avoids mixing
    // unrelated pages that happen to contain common words such as "العراق".
    const width=Math.min(5,ordered.length);
    let bestStart=0,bestScore=-1;
    for(let i=0;i<=ordered.length-width;i++){
      let total=0;
      for(let j=i;j<i+width;j++) total+=scored[j].s;
      if(total>bestScore){bestScore=total;bestStart=i;}
    }
    const start=Math.max(0,bestStart-1);
    const end=Math.min(ordered.length,bestStart+width+1);
    return ordered.slice(start,end).filter(p=>p.text&&p.text.length>0);
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
    const ss=sentences(usableRaw);
    const keySentences=sentences(raw).filter(x=>!/(حقوق الطبع|جميع الحقوق|وزارة التربية|الصف الثالث|الفصل الدراسي)/.test(x)).slice(0,5);
    const info=[l.summary,...keySentences.filter(x=>norm(x)!==norm(l.summary))].slice(0,6);
    const defs=[],reasons=[],enumers=[],blanks=[],tf=[];
    const chapterQuestions=extractQuestionBlocks(picked).filter(q=>String(q.answer||'').trim());
    const ministerial=(window.Future100MinisterialBank?.byLesson?.(l.id)||[])
      .filter(q=>q.verified===true&&q.sourceId&&q.sourceUrl&&String(q.answer||'').trim())
      .map(q=>({...q,type:'وزاري موثّق'}));
    ss.filter(x=>/(هو|هي|يعرف|تعرف|يقصد|المقصود|عبارة عن|تتكون|يتكون|يطلق على)/.test(x))
      .slice(0,8).forEach(x=>{
        const term=(l.title||'المفهوم').replace(/^(ما|تعريف|درس)\s+/,'');
        defs.push({question:'ما المقصود بـ '+term+'؟',answer:x,source:'الكتاب'});
      });
    ss.filter(x=>/(بسبب|لان|لأن|نظرا|نتيجة|يعود ذلك|يؤدي الى|تؤدي الى|يسبب|يسهم)/.test(x))
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
    if(tf.length===0) tf.push({question:'صح أم خطأ: يتناول درس «'+l.title+'» موضوعاً من موضوعات الاجتماعيات.',answer:true,correction:'صح.',source:'تدريب تثبيت — ليس وزارياً'});
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
      sections.map(k=>'<section class="contentSection"><h3>'+typeLabel(k)+'</h3>'+(c[k]&&c[k].length?c[k].map((x,i)=>'<article class="studyItem"><b>'+(i+1)+'. '+esc(x.question||'')+'</b><div class="studyAnswer">'+esc(Array.isArray(x.answer)?x.answer.join(' • '):x.answer||'')+'</div></article>').join(''):'<div class="empty">سيتم إدخال هذا النوع بعد تدقيقه.</div>')+'</section>').join('')+
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