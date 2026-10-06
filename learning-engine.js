/* Future100 — نظام الوزاريات + سجل الأخطاء + التكرار الذكي
   لا يضع أي سؤال على أنه وزاري إلا إذا أضيف له verified:true ومصدره.
*/
(function(){
  const KEY='future100_learning_v2';
  function readDB(){try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):{};}catch(e){try{localStorage.removeItem(KEY)}catch(_e){};return {};}}
  const old=readDB();
  const db={
    version:6,
    questions:old.questions||{},
    mistakes:old.mistakes||{},
    reviews:old.reviews||{},
    stats:old.stats||{answered:0,correct:0,wrong:0}
  };
  const now=()=>Date.now();
  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
  const idOf=q=>q.id||('q_'+btoa(unescape(encodeURIComponent(norm(q.q||q.question)))).replace(/[^a-zA-Z0-9]/g,'').slice(0,32));
  function save(){try{localStorage.setItem(KEY,JSON.stringify(db));}catch(e){console.error('تعذر حفظ نظام التعلم',e);}}
  function interval(level){
    return [0,10,60,360,1440,3*1440,7*1440,14*1440,30*1440][Math.max(0,Math.min(8,level))];
  }
  function ensure(q){
    const id=idOf(q);
    if(!db.questions[id]) db.questions[id]={id,attempts:0,correct:0,wrong:0,mastery:0,level:0,nextReview:0,lastSeen:0,lessonId:q.lessonId||null,category:q.category||q.type||'مراجعة',verified:!!q.verified};
    return db.questions[id];
  }
  function record(q,ok){
    const x=ensure(q); x.attempts++; x.lastSeen=now();
    if(ok){
      x.correct++; x.mastery=Math.min(100,x.mastery+Math.max(5,20-x.level*2)); x.level=Math.min(8,x.level+1);
      x.nextReview=now()+interval(x.level)*60000;
    }else{
      x.wrong++; x.mastery=Math.max(0,x.mastery-20); x.level=Math.max(0,x.level-2); x.nextReview=now()+5*60000;
      db.mistakes[x.id]={...x,question:q.q||q.question,answer:q.a||q.answer,updatedAt:now()};
    }
    if(ok) delete db.mistakes[x.id];
    db.stats.answered++; db.stats.correct+=ok?1:0; db.stats.wrong+=ok?0:1; save();
    return x;
  }
  function due(filter){
    const t=now();
    return Object.values(db.questions).filter(x=>x.nextReview<=t && (!filter||filter(x))).sort((a,b)=>(a.mastery-b.mastery)||(a.nextReview-b.nextReview));
  }
  function mistakes(){return Object.values(db.mistakes).sort((a,b)=>(b.wrong-a.wrong)||(a.mastery-b.mastery));}
  function masteryPercent(){
    const arr=allMinisterial(); if(!arr.length) return 0;
    const vals=arr.map(q=>(db.questions[idOf(q)]||{}).mastery||0);
    return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
  }
  function scoreFor(q){
    const x=db.questions[idOf(q)];
    if(!x) return 0;
    const dueNow=x.nextReview<=now()?70:0;
    const weak=(100-x.mastery)*1.25;
    const wrong=x.wrong*18;
    const unseen=x.attempts===0?35:0;
    return dueNow+weak+wrong+unseen;
  }
  function smartMinisterialPool(filters={}){
    let pool=allMinisterial();
    if(filters.year) pool=pool.filter(q=>Number(q.year)===Number(filters.year));
    if(filters.round) pool=pool.filter(q=>q.round===filters.round);
    if(filters.subject) pool=pool.filter(q=>q.subject===filters.subject);
    if(filters.lessonId) pool=pool.filter(q=>Number(q.lessonId)===Number(filters.lessonId));
    return pool.sort((a,b)=>scoreFor(b)-scoreFor(a));
  }
  function weakMinisterial(){
    return allMinisterial().filter(q=>db.questions[idOf(q)]).sort((a,b)=>scoreFor(b)-scoreFor(a)).slice(0,20);
  }
  function allMinisterial(){
    const out=[];
    if(window.Future100MinisterialBank?.all) return window.Future100MinisterialBank.all().filter(q=>q.verified===true).map((q,i)=>({...q,id:q.id||'m_'+i,category:'وزاريات',verified:true,type:'وزاري'}));
    if(typeof lessons==='undefined') return out;
    lessons.forEach(l=>{
      const c=window.lessonContentCache&&window.lessonContentCache[l.id];
      (c&&c.ministerial||[]).forEach((q,i)=>out.push({...q,id:q.id||'m_'+l.id+'_'+i,lessonId:l.id,category:'وزاريات',verified:true,type:'وزاري'}));
    });
    return out;
  }

  function lessonQuestions(lessonId){
    const l=(typeof lessons!=='undefined'?lessons:[]).find(x=>Number(x.id)===Number(lessonId));
    if(!l) return [];
    const c=window.lessonContentCache&&window.lessonContentCache[lessonId];
    if(!c) return [];
    const out=[];
    const add=(arr,cat,verified)=>{
      (arr||[]).forEach((q,n)=>{
        const raw=q.question||q.q||'';
        if(!raw)return;
        const id=q.id||('l'+lessonId+'_'+cat+'_'+n+'_'+hash(raw));
        out.push({...q,id,lessonId:Number(lessonId),category:cat,type:verified?'وزاري موثّق':'تدريب من الكتاب',verified:!!verified,q:raw,a:q.answer??q.a??''});
      });
    };
    add(c.ministerial,'وزاريات',true);
    add(c.chapterQuestions,'أسئلة الدرس',false);
    add(c.definitions,'تعريفات',false);
    add(c.reasons,'علل وفسر',false);
    add(c.enumerate,'عدد واذكر',false);
    add(c.blanks,'فراغات',false);
    add(c.trueFalse,'صح وخطأ',false);
    return [...new Map(out.map(q=>[idOf(q),q])).values()];
  }
  function hash(s){
    let h=2166136261; for(let i=0;i<String(s).length;i++){h^=String(s).charCodeAt(i);h=Math.imul(h,16777619);}
    return (h>>>0).toString(36);
  }
  async function loadLessonBank(lessonId){
    if(!window.Future100Content?.get) return [];
    const l=(typeof lessons!=='undefined'?lessons:[]).find(x=>Number(x.id)===Number(lessonId));
    if(!l)return [];
    if(!window.lessonContentCache)window.lessonContentCache={};
    if(!window.lessonContentCache[lessonId]) window.lessonContentCache[lessonId]=await window.Future100Content.get(l);
    return lessonQuestions(lessonId);
  }
  function lessonStats(lessonId){
    const qs=lessonQuestions(lessonId);
    const states=qs.map(q=>db.questions[idOf(q)]||null);
    const attempted=states.filter(Boolean);
    const mastery=qs.length?Math.round(qs.reduce((s,q)=>s+((db.questions[idOf(q)]||{}).mastery||0),0)/qs.length):0;
    const dueCount=qs.filter(q=>(db.questions[idOf(q)]||{}).nextReview<=now()).length;
    const mistakesCount=qs.reduce((s,q)=>s+((db.questions[idOf(q)]||{}).wrong||0),0);
    const completed=qs.length?Math.round(attempted.length/qs.length*100):0;
    return {lessonId:Number(lessonId),total:qs.length,attempted:attempted.length,completed,mastery,due:dueCount,mistakes:mistakesCount,ministerial:qs.filter(q=>q.verified).length};
  }
  async function startLessonQuiz(lessonId){
    const qs=await loadLessonBank(lessonId);
    if(!qs.length){toast('جاري تجهيز بنك هذا الدرس من نص الكتاب، حاول مرة ثانية.');return;}
    const ordered=qs.slice().sort((a,b)=>scoreFor(b)-scoreFor(a));
    const selected=ordered.slice(0,15);
    setView('quiz');
    renderQuiz(selected);
  }

  window.Future100Learning={
    version:6,
    record,
    ensure,
    due,
    mistakes,
    stats:()=>({...db.stats}),
    mastery:()=>Object.values(db.questions),
    masteryPercent,
    ministerialCount:()=>allMinisterial().length,
    ministerial:allMinisterial,
    smartMinisterial:smartMinisterialPool,
    weakMinisterial,
    lessonQuestions,
    loadLessonBank,
    lessonStats,
    startLessonQuiz,
    questionState:q=>db.questions[idOf(q)]||null,
    clearMistake:id=>{delete db.mistakes[id];save()},
    reset:()=>{localStorage.removeItem(KEY);location.reload()},
    buildReview:(pool=[])=>{
      const byId=new Map(pool.map(q=>[idOf(q),q]));
      const dueQs=due().map(x=>byId.get(x.id)).filter(Boolean);
      const wrong=mistakes().map(x=>byId.get(x.id)).filter(Boolean);
      const fresh=pool.filter(q=>!db.questions[idOf(q)]).slice(0,20);
      return [...new Map([...wrong,...dueQs,...fresh].map(q=>[idOf(q),q])).values()].slice(0,20);
    }
  };
  window.recordLearningAnswer=record;
  window.showMinistry=function(){
    if(typeof window.renderMinistryDashboard==='function'){
      setView('ministry'); window.renderMinistryDashboard(); return;
    }
    const qs=allMinisterial();
    if(!qs.length){toast('قاعدة الوزاريات موصولة وجاهزة، لكن لم يتم تفريغ أسئلة موثقة فيها بعد.');return;}
    setView('quiz'); renderQuiz(qs.slice(0,20).map(q=>({...q,q:q.question,a:q.answer,type:'وزاري موثّق'})));
  };
  window.startSmartMinisterial=function(filters={}){
    const qs=smartMinisterialPool(filters).slice(0,20);
    if(!qs.length){toast('لا توجد وزاريات مطابقة للفلاتر 🎯');return;}
    setView('quiz');
    renderQuiz(qs.map(q=>({...q,q:q.question,a:q.answer,type:'وزاري • '+(q.round||'موثق')})));
  };
  window.startWeakMinisterial=function(){
    const qs=weakMinisterial();
    if(!qs.length){toast('لم تسجل أخطاء أو محاولات وزارية بعد 🎯');return;}
    setView('quiz');
    renderQuiz(qs.map(q=>({...q,q:q.question,a:q.answer,type:'وزاري • يحتاج تكرار'})));
  };
  window.showSmartReview=function(){
    const base=typeof quizBank!=='undefined'?quizBank.map(q=>({...q,type:q.type||'تدريب'})):[]; const ministry=allMinisterial().map(q=>({...q,q:q.question,a:q.answer,type:'وزاري • '+(q.round||'موثق')})); const pool=[...ministry,...base];
    const qs=Future100Learning.buildReview(pool);
    if(!qs.length){toast('لا توجد مراجعات مستحقة الآن 🎯');return;}
    setView('quiz'); renderQuiz(qs);
  };
  window.showMistakes=function(){
    const box=$('#mistakesContent'); if(!box)return;
    const arr=mistakes();
    box.innerHTML=arr.length?'<div class="sectionTitle"><span>❌ سجل الأخطاء</span><small>'+arr.length+' سؤال</small></div>'+
      arr.slice(0,30).map(x=>'<article class="studyItem"><b>'+norm(x.question)+'</b><div class="studyAnswer">'+norm(x.answer)+'</div><small>خطأ '+x.wrong+' مرة • إتقان '+x.mastery+'%</small></article>').join('')
      :'<div class="empty">ممتاز 🎯 لا توجد أخطاء مسجلة.</div>';
  };
})();