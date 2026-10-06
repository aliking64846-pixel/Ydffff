/* Future100 — قاعدة الوزاريات الموثقة
   لا تُضاف أي صيغة إلى questions إلا بعد إدخال نص السؤال والحل ومصدره.
   المصدر هنا أرشيف مرجعي للأسئلة، وليس ادعاءً بأن كل سؤال تم تفريغه نصيًا.
*/
(function(){
  const sources = [
    {id:'social_2024_pre',subject:'الاجتماعيات',year:2024,round:'تمهيدي',provider:'ملازمنا',url:'https://mlazemna.com/tm24gt3/'},
    {id:'social_2024_r1',subject:'الاجتماعيات',year:2024,round:'الدور الأول',provider:'ملازمنا',url:'https://mlazemna.com/tm24ga/'},
    {id:'social_2024_r3',subject:'الاجتماعيات',year:2024,round:'الدور الثالث',provider:'ملازمنا',url:'https://mlazemna.com/s243ga/'},
    {id:'social_2025_pre',subject:'الاجتماعيات',year:2025,round:'تمهيدي',provider:'ملازمنا',url:'https://mlazemna.com/tm25gt3/'},
    {id:'social_2025_r1',subject:'الاجتماعيات',year:2025,round:'الدور الأول',provider:'ملازمنا',url:'https://mlazemna.com/sa25ga/'},
    {id:'social_2025_r2',subject:'الاجتماعيات',year:2025,round:'الدور الثاني',provider:'ملازمنا',url:'https://mlazemna.com/sa252ga/'},
    {id:'social_2025_r3',subject:'الاجتماعيات',year:2025,round:'الدور الثالث',provider:'ملازمنا',url:'https://mlazemna.com/sa253ga/'},
    {id:'social_2026_r1',subject:'الاجتماعيات',year:2026,round:'الدور الأول',provider:'ملازمنا',url:'https://mlazemna.com/sa26ga/'}
  ];

  // أضف هنا فقط الأسئلة التي تم تفريغها والتحقق من ورقتها/حلها.
  // لا نولّد أسئلة ونضع عليها verified:true.
  const questions = [];

  window.Future100MinisterialBank = {
    version:'1.0.0',
    sources,
    questions,
    all(){ return questions.slice(); },
    byLesson(id){ return questions.filter(q=>q.lessonId===id); },
    byYear(year){ return questions.filter(q=>Number(q.year)===Number(year)); },
    byRound(round){ return questions.filter(q=>q.round===round); }
  };
})();