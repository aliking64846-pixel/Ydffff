/* FUTURE100 — RUNTIME ERROR REPORTING
   Displays the exact file and line for uncaught browser errors. */
(function(){
  window.__future100BootErrors = window.__future100BootErrors || [];
  var reported = false;

  function showError(message, source, line, column){
    var details = (source ? source.split('/').pop() : 'script');
    if(line) details += ':' + line + (column ? ':' + column : '');
    var full = message + ' — ' + details;
    window.__future100BootErrors.push({message:message,source:source||'',line:line||0,column:column||0});
    console.error('[مستقبلي 100]', full, source || '', line || '', column || '');
    if(reported) return;
    reported = true;
    setTimeout(function(){
      var toast = document.getElementById('toast');
      if(toast){
        toast.textContent = '⚠️ خطأ تشغيل: ' + full;
        toast.classList.add('show');
        toast.style.maxWidth = 'min(94vw,560px)';
        toast.style.whiteSpace = 'normal';
        toast.style.overflowWrap = 'anywhere';
      }
    }, 0);
  }

  window.addEventListener('error', function(e){
    if(e && e.target && (e.target.src || e.target.href)){
      var url = e.target.src || e.target.href;
      showError('تعذر تحميل ملف', url, 0, 0);
      return;
    }
    showError((e && e.message) || 'JavaScript error',
      e && e.filename, e && e.lineno, e && e.colno);
  }, true);

  window.addEventListener('unhandledrejection', function(e){
    var reason = e && e.reason;
    var message = reason && reason.message ? reason.message : String(reason || 'Promise error');
    window.__future100BootErrors.push({message:message,type:'unhandledrejection'});
    console.error('[مستقبلي 100] Promise error:', reason);
    if(!reported){
      reported = true;
      setTimeout(function(){
        var toast = document.getElementById('toast');
        if(toast){
          toast.textContent = '⚠️ خطأ تشغيل غير معالج: ' + message;
          toast.classList.add('show');
          toast.style.maxWidth = 'min(94vw,560px)';
          toast.style.whiteSpace = 'normal';
          toast.style.overflowWrap = 'anywhere';
        }
      }, 0);
    }
  });
})();