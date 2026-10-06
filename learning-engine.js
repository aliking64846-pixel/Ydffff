/* Future100 — نظام الوزاريات + سجل الأخطاء + التكرار الذكي
   لا يضع أي سؤال على أنه وزاري إلا إذا أضيف له verified:true ومصدره.
*/
(function(){
  const KEY='future100_learning_v2';
  const old=JSON.parse(localStorage.getItem(KEY)||'{}');
  const db={
    version:2,
    questions:old.questions||{},
    mistakes:old.mistakes||{},
    reviews:old.reviews||{},
    stats:old.stats||{answered:0,correct:0,wrong:0}
  };
  const now=()=>Date.now();
  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
  const idOf=q=>q.id||('q_'+btoa(unescape(encodeURIComponent(norm(q.q||q.question)))).replace(/[^a-zA-Z0-9]/g,'').slice(0,32));
  function save(){localStorage.setItem(KEY,JSON.stringify(db));}
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
      x.wrong++; x.mastery=Math.max(0,x.mastery-15); x.level=Math.max(0,x.level-2); x.nextReview=now()+interval(1)*60000;
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
  function allMinisterial(){
    const out=[];
    if(window.Future100MinisterialBank?.all) return window.Future100MinisterialBank.all().map((q,i)=>({...q,id:q.id||'m_'+i,category:'وزاريات',verified:true,type:'وزاري'}));
    if(typeof lessons==='undefined') return out;
    lessons.forEach(l=>{
      const c=window.lessonContentCache&&window.lessonContentCache[l.id];
      (c&&c.ministerial||[]).forEach((q,i)=>out.push({...q,id:q.id||'m_'+l.id+'_'+i,lessonId:l.id,category:'وزاريات',verified:true,type:'وزاري'}));
    });
    return out;
  }
  window.Future100Learning={
    version:2,
    record,
    ensure,
    due,
    mistakes,
    stats:()=>({...db.stats}),
    mastery:()=>Object.values(db.questions),
    ministerial:allMinisterial,
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
    const qs=allMinisterial();
    if(!qs.length){toast('قاعدة الوزاريات موصولة وجاهزة، لكن لم يتم تفريغ أسئلة موثقة فيها بعد. لن نضع أسئلة تدريبية باسم وزاري.');return;}
    setView('quiz'); renderQuiz(qs.slice(0,20).map(q=>({...q,q:q.question,a:q.answer,type:'وزاري موثّق'})));
  };
  window.showSmartReview=function(){
    const pool=typeof quizBank!=='undefined'?quizBank.map(q=>({...q,type:q.type||'تدريب'})):[];
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