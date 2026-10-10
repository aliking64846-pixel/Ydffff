/* GLOBAL RUNTIME STATE */


(function(){
  window.__future100BootErrors=[];
  window.addEventListener('error',function(e){
    var msg=(e&&e.message)||'JavaScript error';
    window.__future100BootErrors.push(msg);
    setTimeout(function(){
      var t=document.getElementById('toast');
      if(t){
        t.textContent='⚠️ خطأ تشغيل: '+msg;
        t.classList.add('show');
      }
    },0);
  },true);
  window.addEventListener('unhandledrejection',function(e){
    var msg=e&&e.reason&&e.reason.message?e.reason.message:String(e.reason||'Promise error');
    window.__future100BootErrors.push(msg);
  });
})();