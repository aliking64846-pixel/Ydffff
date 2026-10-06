/* Future100 — قاعدة الوزاريات الموثقة
   لا تُضاف أي صيغة إلى questions إلا بعد إدخال نص السؤال والحل ومصدره.
   المصدر هنا أرشيف مرجعي للأسئلة، وليس ادعاءً بأن كل سؤال تم تفريغه نصيًا.
*/
(function(){
  const sources = [
    {id:'social_2024_pre',subject:'الاجتماعيات',year:2024,round:'تمهيدي',provider:'ملازمنا',url:'https://mlazemna.com/tm24gt3/'},
    {id:'social_2024_pre_detail',subject:'الاجتماعيات',year:2024,round:'تمهيدي',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2024_preliminary'},
    {id:'social_2024_r1_detail',subject:'الاجتماعيات',year:2024,round:'الدور الأول',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2024_round1'},
    {id:'social_2024_r3_detail',subject:'الاجتماعيات',year:2024,round:'الدور الثالث',provider:'يُدرك',url:'https://yudrik.com/ar/blog/social_3rd_intermediate_2024_round3'},
    {id:'social_2023_archive',subject:'الاجتماعيات',year:2023,round:'أرشيف كامل',provider:'IraqEdu',url:'https://iraqedu.net/%D8%A7%D8%B3%D8%A6%D9%84%D8%A9-%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A%D8%A7%D8%AA-%D8%AF%D9%88%D8%B1-%D8%A7%D9%84%D8%A7%D9%88%D9%84-%D8%AB%D8%A7%D9%84%D8%AB-%D9%85%D8%AA%D9%88%D8%B3%D8%B7-2023/'},
    {id:'social_2023_r2_archive',subject:'الاجتماعيات',year:2023,round:'الدور الثاني',provider:'أحمد الداوودي',url:'https://www.ahmed-aldaoody.com/2023/08/20232022_91.html'},
    {id:'social_2022_r1_archive',subject:'الاجتماعيات',year:2022,round:'الدور الأول',provider:'نتعلم',url:'https://ntallem.com/wasari/wsari3mut2022d1.html'},
    {id:'social_2022_r2_detail',subject:'الاجتماعيات',year:2022,round:'الدور الثاني',provider:'نتعلم/أرشيف',url:'https://ntallem.com/wasari/wsari3mut2022d1.html'},
    {id:'social_2023_r3_detail',subject:'الاجتماعيات',year:2023,round:'الدور الثالث',provider:'ملازمنا',url:'https://mlazemna.com/as23ga3/'},
    {id:'social_2024_r3_detail',subject:'الاجتماعيات',year:2024,round:'الدور الثالث',provider:'ملازمنا',url:'https://mlazemna.com/s243ga/'},
    {id:'social_2025_r3_detail',subject:'الاجتماعيات',year:2025,round:'الدور الثالث',provider:'ملازمنا',url:'https://mlazemna.com/sa253ga/'},
    {id:'social_2022_2025_index',subject:'الاجتماعيات',year:2022,round:'أرشيف',provider:'ملازمنا',url:'https://mlazemna.com/mvgtwz/'},
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
    },
    {
      id:'min_2026_r1_geography_plant_ranges',
      question:'عدّد نطاقات النباتات الطبيعية في العراق.',
      answer:'1- نطاق الغابات والأعشاب الجبلية. 2- نطاق السهوب (الاستبس). 3- نطاق ضفاف الأنهار. 4- نطاق نباتات الأهوار والمستنقعات. 5- نطاق النباتات الصحراوية.',
      subject:'الجغرافية', lessonId:12, chapter:'الخصائص الطبيعية لجغرافية العراق',
      year:2026, round:'الدور الأول', sourceId:'social_2026_r1',
      sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1',
      verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_geography_oil_transport',
      question:'عرّف النفط الخام، وعدّد طرق نقل النفط في العراق.',
      answer:'النفط الخام من أهم الثروات الطبيعية ويُسمى الذهب الأسود. ومن طرق نقله في العراق: الأنابيب، والسفن، والنقل البري بواسطة القاطرات على سكك الحديد والسيارات الحوضية.',
      subject:'الجغرافية', lessonId:27, chapter:'الخصائص البشرية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_history_ottoman_revolts',
      question:'وضح زيادة المعارضة العراقية ضد الحكم العثماني مع ذكر أبرز الانتفاضات.',
      answer:'تزايدت المعارضة العراقية مع ضعف الدولة العثمانية والتدخلات الأجنبية، ومن أبرزها انتفاضة كربلاء عام 1604م وانتفاضة بغداد عام 1832م بقيادة المفتي عبد الغني آل جميل.',
      subject:'التاريخ', lessonId:31, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_history_medhat_reforms',
      question:'علل: لإصلاحات الوالي مدحت باشا أهمية كبيرة رغم قصر مدة ولايته.',
      answer:'لأنه أحدث تحولاً مهماً في الواقع العراقي، فشملت إصلاحاته التعليم والصحافة والجيش وتحديث المدن وحل مشكلة الأراضي وتوطين العشائر، مما أوجد أساساً متيناً لعهد جديد.',
      subject:'التاريخ', lessonId:34, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_history_european_intervention',
      question:'علل: تدخل القوى الأوروبية، لاسيما البريطانية والفرنسية والألمانية، في أوضاع العراق.',
      answer:'بسبب ضعف الدولة العثمانية في إدارة شؤون البلاد الداخلية، وللاستفادة من موقع العراق الجغرافي المتميز وثرواته الاقتصادية واستغلاله سوقاً لتصريف البضائع.',
      subject:'التاريخ', lessonId:35, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_geography_natural_vegetation_false',
      question:'النبات الطبيعي هو النبات الذي ينمو عن طريق زراعة الإنسان له في مواسم معينة.',
      answer:'خطأ. النبات الطبيعي هو النبات الذي ينمو طبيعياً دون تدخل الإنسان في إنباته.',
      subject:'الجغرافية', lessonId:12, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_geography_transport_false',
      question:'تتميز طرق النقل النهرية بأنها الأكثر طولاً والأوسع انتشاراً.',
      answer:'خطأ. تتميز طرق النقل البرية، كالسيارات وسكك الحديد، بأنها الأكثر طولاً والأوسع انتشاراً.',
      subject:'الجغرافية', lessonId:27, chapter:'الخصائص البشرية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2025_r1_reasons_flatlands',
      question:'علل: يفضل السكان عادة السكن في المناطق السهلية.',
      answer:'لما تتمتع به من سهولة التنقل والتربة الخصبة وإمكانية القيام بالعمليات الزراعية والنشاطات الاقتصادية الأخرى.',
      subject:'الجغرافية', lessonId:5, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2025, round:'الدور الأول',
      sourceId:'social_2025_r1_detail', sourceLabel:'تفريغ سؤال وزاري 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2025_r1_reasons_twenty',
      question:'علل: تعد ثورة العشرين في العراق حدثاً مهماً في تاريخه المعاصر.',
      answer:'لأنها تمثل مرحلة تاريخية مهمة من مراحل نضال الشعب العراقي ضد المحتل لنيل الحرية والاستقلال.',
      subject:'التاريخ', lessonId:40, chapter:'العراق في أثناء الحرب العالمية الأولى وبعدها', year:2025, round:'الدور الأول',
      sourceId:'social_2025_r1_detail', sourceLabel:'تفريغ سؤال وزاري 2025 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2025_round1', verified:true, type:'وزاري'
    }
    {
      id:'min_2026_r1_hammr_marsh',
      question:'عرّف هور الحمار.',
      answer:'هو أحد الأهوار الكبرى المهمة التي تقع في منطقة السهل الرسوبي في جنوب العراق، وتمتد أراضيه بين محافظتي البصرة وذي قار.',
      subject:'الجغرافية', lessonId:13, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_halgurd',
      question:'عرّف هلكرد.',
      answer:'هي أعلى قمة جبلية ويبلغ ارتفاعها أكثر من 3600م فوق مستوى سطح البحر ضمن سلسلة جبال حصاروست قرب الحدود العراقية الإيرانية.',
      subject:'الجغرافية', lessonId:6, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_suleiman',
      question:'عرّف سليمان القانوني.',
      answer:'هو السلطان العثماني الذي استطاع احتلال بغداد عام 1534م بعد انتصاره على الصفويين الذين كانوا يسيطرون على العراق.',
      subject:'التاريخ', lessonId:31, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_chaldiran',
      question:'عرّف جالديران.',
      answer:'هي المعركة التي حدثت بين العثمانيين والصفويين عام 1514م، وانتصر فيها العثمانيون واحتلوا عاصمة الصفويين تبريز.',
      subject:'التاريخ', lessonId:31, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_stanley_maude',
      question:'عرّف الجنرال ستانلي مود.',
      answer:'هو الجنرال البريطاني والقائد العام للقوات البريطانية في العراق الذي استطاع احتلال بغداد في 11 آذار 1917م بعد معارك مع العثمانيين.',
      subject:'التاريخ', lessonId:40, chapter:'العراق في أثناء الحرب العالمية الأولى وبعدها', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_annual_plants',
      question:'أكمل: النباتات الحولية هي نباتات ______ تنمو خلال الموسم الملائم لنموها.',
      answer:'فصلية (أو صحراوية فصلية).',
      subject:'الجغرافية', lessonId:12, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_shuaiba',
      question:'أكمل: دارت معركة الشعيبة بين العثمانيين بقيادة ______ والبريطانيين.',
      answer:'سليمان العسكري.',
      subject:'التاريخ', lessonId:35, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_abbas',
      question:'أكمل: وقع الاختيار على ______ وهو من العائلة الهاشمية المالكة ليكون وصياً جديداً على عرش العراق بعد هروب الوصي عبد الإله إلى البصرة.',
      answer:'الشريف شرف.',
      subject:'التاريخ', lessonId:47, chapter:'العراق بعد تأسيس الدولة', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/ar/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_ports',
      question:'أكمل: هناك العديد من الموانئ البحرية التي تطل على شط العرب منها ميناءا ______ و ______.',
      answer:'أبو فلوس والمعقل.',
      subject:'الجغرافية', lessonId:15, chapter:'الخصائص الطبيعية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_rice',
      question:'أكمل: احتلت محافظة ______ المرتبة الأولى في زراعة الرز.',
      answer:'النجف (النجف الأشرف).',
      subject:'الجغرافية', lessonId:23, chapter:'الخصائص البشرية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_durat_taj',
      question:'أكمل: أطلق على الهند بسبب أهميتها الاقتصادية لبريطانيا لقب ______.',
      answer:'درة التاج (أو درة التاج البريطاني).',
      subject:'التاريخ', lessonId:35, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_animal_wealth',
      question:'عدّد أهمية الثروة الحيوانية.',
      answer:'1- مصدر مهم في الدخل القومي. 2- مادة غذائية أساسية للسكان كاللحوم والحليب وبيض المائدة. 3- رفد الصناعات بمواد أولية كالجلود والأصواف والشعر. 4- يستعمل بعضها واسطة للنقل في المناطق الصحراوية والوعرة. 5- يستفاد من مخلفاتها كأسمدة عضوية لزيادة خصوبة التربة.',
      subject:'الجغرافية', lessonId:23, chapter:'الخصائص البشرية لجغرافية العراق', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    },
    {
      id:'min_2026_r1_medhat_school',
      question:'صح أم خطأ: أول مدرسة أسسها الوالي مدحت باشا هي المدرسة الرشيدية العسكرية، وكان يُقبل بها الطلبة المتخرجون من المدارس الدينية.',
      answer:'صح.',
      subject:'التاريخ', lessonId:34, chapter:'العراق في العهد العثماني', year:2026, round:'الدور الأول',
      sourceId:'social_2026_r1', sourceLabel:'تفريغ سؤال وزاري 2026 الدور الأول مع الحل المنشور',
      sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2026_round1', verified:true, type:'وزاري'
    }

    {id:'min_2025_r2_foreign_trade',question:'تكلم عن التجارة الخارجية، وبين أهم الخصائص الأساسية لتجارة العراق الخارجية.',answer:'التجارة الخارجية هي النشاط التجاري الذي يتم من خلاله تبادل المنتجات بين دولة معينة ودول أخرى. ومن أهم خصائص تجارة العراق الخارجية: التركيز والتخصص في النفط الخام، انفتاح التجارة العراقية على دول العالم وتنوع مصادرها، واختلال الميزان التجاري.',subject:'الجغرافية',lessonId:27,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_social_communication',question:'من أهم أسس العلاقات الاجتماعية التواصل الاجتماعي، وضح ذلك.',answer:'يمثل التواصل مع الناس أحد أهم أسس العلاقات الاجتماعية؛ فالإنسان بحاجة إلى الآخرين في مختلف مجالات الحياة، ويؤدي التواصل الصادق إلى تقوية العلاقات الاجتماعية وزيادة التعاون واستمرار الألفة والمحبة بين أفراد المجتمع.',subject:'التربية الوطنية والاجتماعية',lessonId:53,chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_mandate_conditions',question:'ما الشروط التي وضعتها عصبة الأمم لأي دولة تريد إنهاء الانتداب؟',answer:'وجود حكومة مستقلة وإدارة قادرة على تسيير شؤون الدولة، والقدرة على حفظ الوحدة والاستقلال والأمن، وتوفر مصادر مالية كافية للنفقات الحكومية، ووجود قوانين وتنظيم قضائي يضمن العدل للجميع.',subject:'التاريخ',lessonId:40,chapter:'العراق في أثناء الحرب العالمية الأولى وبعدها',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_reasons_medhat',question:'علل: وصف الوالي العثماني مدحت باشا بأنه أشهر الولاة العثمانيين المصلحين في العراق.',answer:'لقيامه بإصلاحات كثيرة أدت إلى تحسين الأوضاع العامة في العراق.',subject:'التاريخ',lessonId:34,chapter:'العراق في العهد العثماني',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_reasons_astronomical_location',question:'علل: يعد الموقع الفلكي العامل الأكثر تأثيراً على المناخ.',answer:'لأنه المسؤول عن تحديد زاوية سقوط أشعة الشمس وطول النهار، أي المدة التي تشرق فيها الشمس.',subject:'الجغرافية',lessonId:10,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_fill_climate_seasons',question:'أكمل: يعد فصلا الربيع والخريف فصلين ______ لا تتجاوز مدتهما ______ في جميع أنحاء العراق.',answer:'انتقاليين، الشهرين.',subject:'الجغرافية',lessonId:10,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_fill_ports',question:'أكمل: أهم الموانئ المطلة على الخليج العربي هي ميناء ______ وميناء ______ وميناء ______.',answer:'الفاو، خور الزبير، أم قصر.',subject:'الجغرافية',lessonId:15,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_fill_iraq_hemisphere',question:'أكمل: يقع وطننا العراق في ______ من الكرة الأرضية.',answer:'النصف الشمالي.',subject:'الجغرافية',lessonId:1,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_r2_truth_dijla_meanders',question:'صح أم خطأ: يتميز نهر دجلة بكثرة تعرجاته وخاصة في جزئه الواقع بين مدينة بغداد والكوت.',answer:'صح.',subject:'الجغرافية',lessonId:15,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'الدور الثاني',sourceId:'social_2025_r2_detail',sourceLabel:'تفريغ سؤال وزاري 2025 الدور الثاني مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_round2',verified:true,type:'وزاري'},
    {id:'min_2025_pre_tanzimat',question:'أكمل: مثّل العهد العثماني الأخير بعصر ______ أو عصر الإصلاحات.',answer:'التنظيمات.',subject:'التاريخ',lessonId:33,chapter:'العراق في العهد العثماني',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_migration',question:'أكمل: تقسم هجرة السكان في العراق إلى قسمين ______ و ______.',answer:'الهجرة الداخلية والهجرة الخارجية.',subject:'الجغرافية',lessonId:20,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_human_rights',question:'أكمل: تشمل حقوق الإنسان من حيث الأهمية ______ و ______.',answer:'حقوق أساسية وحقوق غير أساسية.',subject:'التربية الوطنية والاجتماعية',lessonId:55,chapter:'القيم الوطنية والاجتماعية والقضايا الاجتماعية',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_tourism',question:'أكمل: للسياحة والاصطياف أهمية اقتصادية وثقافية و ______ و ______.',answer:'ترفيهية وإعلامية.',subject:'الجغرافية',lessonId:28,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_location_importance',question:'علل: لموقع العراق أهمية كبيرة.',answer:'بسبب موقعه الاستراتيجي وإشرافه على القسم الشرقي من الدول العربية ضمن منطقة الهلال الخصيب، وكونه جسراً أرضياً يربط طرق التجارة والمواصلات بين مناطق العالم القديم.',subject:'الجغرافية',lessonId:1,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_summer_rain',question:'علل: انعدام سقوط الأمطار في فصل الصيف.',answer:'بسبب سيادة الضغط العالي المداري وقلة الرطوبة النسبية.',subject:'الجغرافية',lessonId:10,chapter:'الخصائص الطبيعية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'},
    {id:'min_2025_pre_water_transport',question:'علل: يعد النقل المائي من أسهل وأرخص وسائط النقل.',answer:'لانخفاض تكاليفه وقدرته الكبيرة على استيعاب الشحنات الكبيرة، ولا يحتاج إلى صيانة الممرات التي يسلكها ولا سيما البحرية منها.',subject:'الجغرافية',lessonId:27,chapter:'الخصائص البشرية لجغرافية العراق',year:2025,round:'تمهيدي',sourceId:'social_2025_pre_detail',sourceLabel:'تفريغ سؤال وزاري 2025 التمهيدي مع الحل المنشور',sourceUrl:'https://yudrik.com/en/blog/social_3rd_intermediate_2025_preliminary',verified:true,type:'وزاري'}
  ];

  window.Future100MinisterialBank = {
    coverageVerified: {2024:['تمهيدي','الدور الأول','الدور الثاني','الدور الثالث']},
    version:'1.5.0',
    sources,
    questions,
    all(){ return questions.slice(); },
    byLesson(id){ return questions.filter(q=>q.lessonId===id); },
    byYear(year){ return questions.filter(q=>Number(q.year)===Number(year)); },
    byRound(round){ return questions.filter(q=>q.round===round); }
  };
})();