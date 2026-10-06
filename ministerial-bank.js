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
    {id:'social_2025_r1_detail',subject:'الاجتماعيات',year:2025,round:'الدور الأول',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1'},
    {id:'social_2025_pre_detail',subject:'الاجتماعيات',year:2025,round:'تمهيدي',provider:'يُدرك',url:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary'},
    {id:'social_2025_r2_detail',subject:'الاجتماعيات',year:2025,round:'الدور الثاني',provider:'يُدرك',url:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2'},
    {id:'social_2026_pre_detail',subject:'الاجتماعيات',year:2026,round:'تمهيدي',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_preliminary'}
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
    {id:'min_2025_pre_plains',question:'عرّف السهول.',answer:'هي مناطق من سطح الأرض تتميز بأنها مسطحة أو شبه مسطحة وتكون صالحة للزراعة وتتركز فيها معظم السكان في كل منطقة. السهل الرسوبي في العراق.',subject:'الجغرافية',lessonId:5,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_pre_natural_vegetation',question:'عرّف النبات الطبيعي.',answer:'هو النبات الذي ينمو طبيعياً دون تدخل الإنسان في إنباته.',subject:'الجغرافية',lessonId:12,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_pre_groundwater',question:'عرّف المياه الجوفية.',answer:'هي المياه التي توجد في باطن الأرض وتظهر على السطح بصورة طبيعية كالينابيع والعيون أو يتدخل الإنسان لاستخراجها كالآبار.',subject:'الجغرافية',lessonId:18,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_pre_ottomans',question:'عرّف العثمانيين.',answer:'قبائل تركية نزحت من آسيا الوسطى واستقرت في آسيا الصغرى (أناضول) وكانت تهدف إلى الوصول إلى أوروبا، وسميت بهذا الاسم نسبة إلى مؤسس الدولة العثمانية عثمان بن أرطغرل.',subject:'التاريخ',lessonId:31,chapter:'العراق في العهد العثماني',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_pre_mandate',question:'عرّف الانتداب.',answer:'وضع المشرفين على الدول التي انفصلت عن الدولة العثمانية وتقديم المساعدة والخبرة لها حتى تصبح قادرة على أن تستقل وتسيّر شؤونها بنفسها.',subject:'التاريخ',lessonId:40,chapter:'العراق في أثناء الحرب العالمية الأولى وبعدها',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_pre_national_values',question:'عرّف القيم الوطنية.',answer:'هي مجموعة من المبادئ والضوابط التي تحدد سلوك الفرد في المجتمع الذي ينتمي إليه وتمثل في المواطنة الصالحة وترتبط بالانتماء والولاء والوفاء والتضحية في سبيل الوطن والالتزام بالقواعد والقوانين.',subject:'التربية الوطنية والاجتماعية',lessonId:48,chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2026_pre_hills',question:'عرّف منطقة التلال.',answer:'تشكل هذه المنطقة الحدود الجنوبية للمنطقة شبه الجبلية، وتتألف من تلال لا يتجاوز ارتفاعها 100م مثل تلال جبل سنجار.',subject:'الجغرافية',lessonId:7,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2026,round:'تمهيدي',sourceId:'social_2026_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2026_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2026_pre_surface_water',question:'عرّف المياه السطحية.',answer:'هي المياه الجارية على سطح الأرض وتشمل الأنهار الدائمة الجريان وتمثل بمياه نهري دجلة والفرات.',subject:'الجغرافية',lessonId:13,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2026,round:'تمهيدي',sourceId:'social_2026_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2026_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2026_pre_climate',question:'عرّف المناخ.',answer:'هو وصف حالة الجو من حيث عناصره (درجة الحرارة، والضغط الجوي، والرياح، والأمطار)، وتكون الفترة الزمنية طويلة قد تكون شهراً أو سنة.',subject:'الجغرافية',lessonId:10,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2026,round:'تمهيدي',sourceId:'social_2026_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2026_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2026_pre_social_values',question:'عرّف القيم الاجتماعية.',answer:'هي مجموعة من المبادئ التي تحدد تعامل الفرد مع المجتمع مع الالتزام بمبادئ الأخلاق الحميدة والاحترام والإنسانية والتسامح والمصداقية.',subject:'التربية الوطنية والاجتماعية',lessonId:53,chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',year:2026,round:'تمهيدي',sourceId:'social_2026_pre_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2026_pre_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_r2_sunflower',question:'عرّف زهرة الشمس.',answer:'هي من المحاصيل الصيفية وتحتاج زراعتها إلى ظروف طبيعية معينة كدرجة حرارة مرتفعة وتربة جيدة.',subject:'الجغرافية',lessonId:23,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_r2_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_r2_hilla_canal',question:'عرّف شط الحلة.',answer:'هو الفرع الأول لنهر الفرات عند سدة الهندية الذي يجري إلى الجنوب الشرقي ماراً بمدينتي الحلة والهاشمية، وبعد الهاشمية يتفرع إلى قسمين الشرقي يسمى شط الدغارة والغربي يعرف بشط الديوانية.',subject:'الجغرافية',lessonId:15,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_r2_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_r2_transformative_industry',question:'عرّف الصناعات التحويلية.',answer:'هي الصناعات التي يقتصر نشاطها على تحويل المواد الأولية إلى منتجات وسيطة أو منتجات نهائية.',subject:'الجغرافية',lessonId:27,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_r2_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_r2_selim',question:'عرّف سليم الأول.',answer:'هو السلطان العثماني الذي استطاع احتلال البلاد العربية ولاسيما بعد انتصاره على الصفويين في معركة جالديران عام 1514م.',subject:'التاريخ',lessonId:31,chapter:'العراق في العهد العثماني',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_r2_detail')?.url||'',verified:true,type:'وزاري'},
    {id:'min_2025_r2_harford',question:'عرّف هارفورد جونز.',answer:'هو القنصل البريطاني الذي تم تعيينه من قبل بريطانيا على ولاية بغداد وما حولها عام 1802م بأمر من السلطان العثماني ومنح الحصانة والامتيازات.',subject:'التاريخ',lessonId:35,chapter:'العراق في العهد العثماني',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري مع الحل المنشور',sourceUrl: sources.find(s=>s.id==='social_2025_r2_detail')?.url||'',verified:true,type:'وزاري'},
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
    version:'1.1.0',
    sources,
    questions,
    all(){ return questions.slice(); },
    byLesson(id){ return questions.filter(q=>q.lessonId===id); },
    byYear(year){ return questions.filter(q=>Number(q.year)===Number(year)); },
    byRound(round){ return questions.filter(q=>q.round===round); }
  };
})();