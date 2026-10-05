// ============================================================
// إعدادات النظام
// ============================================================

const CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbyC-xIxjIoR7K7WQs_5PnG33_dHpPVsDzRGhAnM5I0Ca4qE1qBX9MIv35eNrQZ1SU0V/exec',

  SYSTEM_NAME: 'سجل رصد الدرجات والغياب',
  SCHOOL_YEAR: '2026 / 2027',
  GRADE: 'الصف الأول الثانوي',
  MINISTRY_DECISION: '234',
  MINISTRY_YEAR: '2025',

  DEFAULT_DIRECTORATE: '\u0645\u062f\u064a\u0631\u064a\u0629 \u0627\u0644\u062a\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0628\u0627\u0644\u062c\u064a\u0632\u0629',
  DEFAULT_ADMINISTRATION: '\u0625\u062f\u0627\u0631\u0629 \u062c\u0646\u0648\u0628 \u0627\u0644\u062c\u064a\u0632\u0629',
  DEFAULT_SCHOOL: '\u0645\u062f\u0631\u0633\u0629 ................',

  STUDENTS_PER_PAGE: 50,
  WEEKS_PER_PAGE: 4,

  GRADE_COLUMNS: [
    { label: 'تقييم أسبوعي', max: 15 },
    { label: 'الواجب', max: 15 },
    { label: 'سلوك ومواظبة', max: 10 },
    { label: 'المجموع', max: 40 }
  ],

  ATTENDANCE_DAYS: [
    { label: 'الأحد', key: 'sunday' },
    { label: 'الاثنين', key: 'monday' },
    { label: 'الثلاثاء', key: 'tuesday' },
    { label: 'الأربعاء', key: 'wednesday' },
    { label: 'الخميس', key: 'thursday' }
  ],

  FINAL_TOTAL_COLUMNS: [
    { label: 'موسوعة الفصل الأول', max: 40 },
    { label: 'اختبارات الفصول', max: 30 },
    { label: 'المجموع النهائي', max: 70 }
  ]
};
