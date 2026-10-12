/* FUTURE100 — ISOLATED NAVIGATION LAYER
   التنقل يعمل بشكل مستقل عن أخطاء بقية JavaScript. */
(function(){
  var views=['home','masteryMap','lessons','lessonView','study','chapter','book','ministry','quiz','exam','performance','nightReview','examPlan','mistakes','memory'];

  function safeView(v){
    try{
      if(!v || views.indexOf(v)<0)return false;
      document.querySelectorAll('.view').forEach(function(x){x.classList.remove('active');});
      var target=document.getElementById(v);
      if(!target)return false;
      target.classList.add('active');
      document.querySelectorAll('.navbtn').forEach(function(b){
        b.classList.toggle('active',b.getAttribute('data-view')===v);
      });
      var menu=document.getElementById('moreMenu');
      if(menu)menu.classList.remove('open');
      return true;
    }catch(e){return false;}
  }
  window.__future100SafeNavigate=safeView;

  function run(name,fallback){
    try{
      if(typeof window[name]==='function'){
        window[name]();
        return true;
      }
    }catch(e){}
    return fallback?safeView(fallback):false;
  }

  function toggleMore(){
    try{
      var m=document.getElementById('moreMenu');
      if(m){m.classList.toggle('open');return true;}
    }catch(e){}
    return false;
  }

  document.addEventListener('click',function(e){
    try{
      var el=e.target&&e.target.closest?e.target.closest('[data-view],#moreBtn'):null;
      if(!el)return;

      if(el.id==='moreBtn'){
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleMore();
        return;
      }

      var v=el.getAttribute('data-view');
      if(!v)return;

      e.preventDefault();
      e.stopImmediatePropagation();

      /* Keep navigation isolated, but use the app's real setView renderer
         so each page initializes its own content and data. */
      try{
        if(v==='exam' && typeof window.startExam==='function'){
          window.startExam();
        }else if(typeof window.setView==='function'){
          window.setView(v);
        }else{
          safeView(v);
        }
      }catch(navError){
        console.error('Future100 navigation error:',navError);
        safeView(v);
      }
    }catch(err){
      console.error('Future100 click router error:',err);
    }
  },true);

  document.addEventListener('click',function(e){
    try{
      var m=document.getElementById('moreMenu');
      if(m&&m.classList.contains('open')&&!e.target.closest('#moreMenu')&&!e.target.closest('#moreBtn'))m.classList.remove('open');
    }catch(err){}
  },false);
})();

/* Mobile navigation follows scroll direction: hide while reading down,
   reveal gently when the reader scrolls back up. */
(function () {
  var lastY = window.scrollY || window.pageYOffset || 0;
  var accumulated = 0;
  var ticking = false;
  var nav = null;

  function getNav() {
    if (!nav || !document.documentElement.contains(nav)) nav = document.querySelector('.nav');
    return nav;
  }

  function update() {
    ticking = false;
    var bar = getNav();
    if (!bar) return;
    if (!window.matchMedia || !window.matchMedia('(max-width: 800px)').matches) {
      bar.classList.remove('nav-scroll-hidden');
      lastY = window.scrollY || window.pageYOffset || 0;
      accumulated = 0;
      return;
    }

    var y = Math.max(0, window.scrollY || window.pageYOffset || 0);
    var delta = y - lastY;
    lastY = y;

    if (y < 70) {
      bar.classList.remove('nav-scroll-hidden');
      accumulated = 0;
      return;
    }

    var more = document.getElementById('moreMenu');
    if (more && more.classList.contains('open')) {
      bar.classList.remove('nav-scroll-hidden');
      accumulated = 0;
      return;
    }

    if (Math.abs(delta) < 2) return;
    accumulated += delta;

    if (accumulated > 12) {
      bar.classList.add('nav-scroll-hidden');
      accumulated = 0;
    } else if (accumulated < -8) {
      bar.classList.remove('nav-scroll-hidden');
      accumulated = 0;
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    var bar = getNav();
    if (bar && (!window.matchMedia || !window.matchMedia('(max-width: 800px)').matches)) {
      bar.classList.remove('nav-scroll-hidden');
    }
  }, { passive: true });
})();
