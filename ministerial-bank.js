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
    {id:'social_2026_r1',subject:'الاجتماعيات',year:2026,round:'الدور الأول',provider:'ملازمنا',url:'https://mlazemna.com/sa26ga/'},
    {id:'social_2025_r1_detail',subject:'الاجتماعيات',year:2025,round:'الدور الأول',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1'}
  ];

  // أضف هنا فقط الأسئلة التي تم تفريغها والتحقق من ورقتها/حلها.
  // لا نولّد أسئلة ونضع عليها verified:true.
  const questions = [

    {
      id:'min_2024_r2_note',
      question:'سؤال وزاري موثق: الدور الثاني 2024 — محور التعاريف/الصح والخطأ في الاجتماعيات.',
      answer:'هذا سجل أرشيفي للدور الثاني 2024، وليس نص سؤال؛ لا يُعرض كسؤال اختبار حتى يتم تفريغ نص الورقة.',
      subject:'الاجتماعيات',
      lessonId:null,
      chapter:null,
      year:2024,
      round:'الدور الثاني',
      sourceId:'social_2024_r2',
      sourceLabel:'أرشيف أسئلة الاجتماعيات الثالث متوسط 2024 الدور الثاني',
      sourceUrl:'https://mlazemna.com/s24ga/',
      verified:false,
      type:'أرشيف'
    },
    {
      id:'min_2025_r1_national_traffic',
      question:'عرّف التوعية المرورية.',
      answer:'يقصد بها أن يكون جميع مستعملي الطرق من سائقين ومشاة وراكبي الدراجات على علم تام بقواعد المرور من أجل سلامة الراكب والمشاة.',
      subject:'التربية الوطنية والاجتماعية',
      lessonId:60,
      chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1',
      sourceLabel:'أسئلة الاجتماعيات الثالث متوسط 2025 الدور الأول',
      sourceUrl:'https://mlazemna.com/sa25ga/',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2025_r1_geography_mountain',
      question:'عرّف المنطقة الجبلية.',
      answer:'هي أحد الأشكال التضاريسية المكونة لشكل العراق، تقع في القسم الشمالي والشمالي الشرقي من وطننا العراق وتكون على شكل هلال، تقدر مساحتها بـ 23500 كم² أي ما يعادل 6% من مساحة العراق.',
      subject:'الجغرافية',
      lessonId:6,
      chapter:'الخصائص الطبيعية لجغرافية العراق',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1_detail',
      sourceLabel:'تفريغ سؤال 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2025_r1_geography_weather',
      question:'عرّف الطقس.',
      answer:'هو وصف حالة الجو من حيث درجات الحرارة والضغط الجوي والرياح والأمطار لمكان محدد ولمدة قصيرة (ساعة، يوم، أسبوع).',
      subject:'الجغرافية',
      lessonId:10,
      chapter:'الخصائص الطبيعية لجغرافية العراق',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1_detail',
      sourceLabel:'تفريغ سؤال 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2025_r1_geography_food_crops',
      question:'عرّف المحاصيل الغذائية.',
      answer:'هي أحد المحاصيل الزراعية وتشمل المحاصيل التي تشكل الغذاء الرئيس للسكان، ويمكن تقسيمها على محاصيل الحبوب والخضروات والفواكه والعلف.',
      subject:'الجغرافية',
      lessonId:23,
      chapter:'الخصائص البشرية لجغرافية العراق',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1_detail',
      sourceLabel:'تفريغ سؤال 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2025_r1_history_medhat_pasha',
      question:'عرّف مدحت باشا.',
      answer:'يعد من أشهر الولاة المصلحين في العراق، تولى ولاية بغداد عام 1869، ومنحه السلطان العثماني صلاحيات واسعة، ترأس السلطتين العسكرية والمدنية، واستمرت ولايته ثلاث سنوات أجرى خلالها عدداً من الإصلاحات.',
      subject:'التاريخ',
      lessonId:34,
      chapter:'العراق في العهد العثماني',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1_detail',
      sourceLabel:'تفريغ سؤال 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2025_r1_national_citizenship',
      question:'عرّف المواطنة.',
      answer:'هي كلمة مشتقة من مصطلح الوطن وتعبر عن المكان الذي يعيش فيه الإنسان، وتتحدد بموجبها الحقوق والواجبات التي تتضمن انتماء المواطن لوطنه.',
      subject:'التربية الوطنية والاجتماعية',
      lessonId:49,
      chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',
      year:2025,
      round:'الدور الأول',
      sourceId:'social_2025_r1_detail',
      sourceLabel:'تفريغ سؤال 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1',
      verified:true,
      type:'وزاري'
    },
    {
      id:'min_2026_r1_geography_climate_rain',
      question:'يكثر سقوط الأمطار في فصل الصيف.',
      answer:'خطأ، يكثر سقوط الأمطار في فصل الشتاء.',
      subject:'الجغرافية',
      lessonId:10,
      chapter:'الخصائص الطبيعية لجغرافية العراق',
      year:2026,
      round:'الدور الأول',
      sourceId:'social_2026_r1',
      sourceLabel:'أسئلة الاجتماعيات الثالث متوسط 2026 الدور الأول',
      sourceUrl:'https://mlazemna.com/sa26ga/',
      verified:true,
      type:'وزاري'
    }
  ];

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