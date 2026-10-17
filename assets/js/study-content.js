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
  const stopWords=new Set(['العراق','العراقي','العراقيه','العربية','العربي','درس','الوحدة','الفصل','من','في','الى','على','عن','مع','و','او','هو','هي','هذا','هذه','التي','الذي','بعض','اهم','اهمية','يتعرف','يفهم','يدرس','يراجع','يحدد','يميز','بين','ضمن','حول','كما','وقد','كان','تكون','يكون','بعد','الى','المجتمع','المجتمعات','الاجتماعيه','الاجتماعية','العلاقات','العالقات','الانسان','الانسان','الوطنيه','الوطنية','القيم','الحقوق','الواجبات','العامة','العامه','تاثير','التاثير']);
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
    const questionMarks=(text.match(/(?:^|\s)س\s*\.?\s*\d+|عرف\s+ما\s+يأتي|عدد\s+ما\s+يأتي/g)||[]).length;
    if(objective)titleScore-=16;
    if(questionPage)titleScore-=12;
    if(questionMarks>=2)titleScore-=14;
    else if(questionMarks===1)titleScore-=5;
    const first=norm(text.slice(0,520));
    if(titleNorm.length>5&&n.includes(titleNorm))titleScore+=14;
    if(titleNorm.length>5&&first.includes(titleNorm))titleScore+=8;
    if(titleScore>0)return titleScore;
    // Only use summary words when the title itself is not found anywhere on this page.
    const summaryWords=tokens(summary).slice(0,12);
    return summaryWords.reduce((s,w)=>s+(n.includes(w)?0.4:0),0)-(objective?8:0)-(questionPage?6:0);
  }
  // Verified page ranges follow the textbook's printed contents and section headings.
  // A lesson may share a page with the neighboring topic; explicit ranges are safer than
  // guessing from broad summary words or selecting a distant matching page.
  const lessonPageMap={
    1:[5,5],2:[6,6],3:[7,7],4:[7,7],5:[7,7],6:[8,9],7:[9,10],8:[11,11],9:[12,12],
    10:[15,21],11:[22,23],12:[24,27],13:[30,30],14:[31,32],15:[33,35],16:[36,37],
    17:[38,41],18:[42,42],19:[45,45],20:[46,47],21:[48,49],22:[50,50],23:[51,55],
    24:[56,58],25:[61,61],26:[61,65],27:[66,69],28:[70,73],29:[74,74],30:[75,77],
    31:[81,82],32:[82,82],33:[83,84],34:[85,87],35:[88,88],36:[91,95],37:[96,101],
    38:[104,104],39:[105,113],40:[102,103,114,115,116,117,118],41:[114,115,116,117,118,119],
    42:[122,123],43:[118,119,120,121,122,123,124,125,126,127],44:[128,129],
    45:[130,131,132],46:[132,133,134],47:[135,135],
    48:[138,139],49:[139,140],50:[147,148],51:[147,149],52:[148,149],53:[140,141],
    54:[142,143],55:[143,146],56:[151,151],57:[152,152],58:[152,152],59:[153,154],
    60:[155,155],61:[156,157],62:[139,139,158,158]
  };
  function pickPages(l,ps){
    if(!ps.length)return [];
    const mapped=lessonPageMap[Number(l.id)];
    if(mapped){
      const wanted=new Set();
      if(mapped.length===2&&mapped[1]>=mapped[0]){
        for(let p=mapped[0];p<=mapped[1];p++)wanted.add(p);
      }else mapped.forEach(p=>wanted.add(p));
      const exact=ps.filter(p=>wanted.has(p.page)&&p.text&&p.text.length>0);
      if(exact.length)return exact;
    }
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
    const keySentences=ss.slice(0,5);
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
      .slice(0,8).forEach(x=>{
        const m=x.match(/^(.*?)(بسبب|لأن|لان|نظرا|نتيجة|يعود ذلك|يؤدي الى|تؤدي الى|يسبب|يسهم)(.*)$/);
        if(!m||m[1].trim().length<12||m[3].trim().length<5)return;
        const connector=m[2],prefix=m[1].trim(),suffix=m[3].trim();
        const cause=/بسبب|لأن|لان|نظرا|نتيجة|يعود ذلك/.test(connector);
        const question=cause?'علل: '+prefix+'؟':'ما نتيجة '+prefix+'؟';
        const answer=connector+' '+suffix;
        if(norm(question)!==norm(answer))reasons.push({question,answer,source:'تدريب مستخرج من نص الكتاب — راجع صياغة الكتاب'});
      });
    const listLines=raw.split(/(?=\b(?:[1-9]|10|11|12|13|14|15)[.)]\s)/).map(clean)
      .filter(x=>/^\d+[.)]\s/.test(x)&&x.length<500);
    if(listLines.length>=2) enumers.push({question:'عدد/اذكر ما يأتي:',answer:listLines.slice(0,10).map(x=>x.replace(/^\d+[.)]\s*/,'')),source:'الكتاب'});
    ss.slice(0,12).forEach(x=>{
      const candidates=x.split(/\s+/).filter(w=>{
        const cleanWord=norm(w);
        return /^[\u0600-\u06FF]{4,}$/.test(w)&&!stopWords.has(cleanWord)&&!/^\d+$/.test(cleanWord);
      });
      if(candidates.length<2)return;
      const answer=candidates[Math.min(candidates.length-1,Math.floor(candidates.length*.55))];
      if(!answer||!x.includes(answer))return;
      blanks.push({question:x.replace(answer,'________'),answer,source:'تدريب إكمال من نص الكتاب'});
    });
    // Only use actual source-checked ministerial true/false items here.
    ministerial.filter(q=>/(صح أم خطأ|صح ام خطأ|صح أو خطأ|صح او خطأ)/.test(q.question)).slice(0,8).forEach(q=>{
      tf.push({question:q.question,answer:q.answer,sourceLabel:q.sourceLabel||q.sourceUrl,source:'وزاري موثّق',verified:true});
    });
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