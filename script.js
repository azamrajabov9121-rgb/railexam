

// ===== 150+ SAVOLLAR (har yo'nalish 10-15 ta) =====
// Sub-directions for all directions
const SUBDIRS = {
  "Yo'l xo'jaligi": [
    "Yo'l ta'mirlovchi",
    "Nuqson izlovchi",
    "Temir yo'l kesishmasi navbatchisi",
    "Suniy inshoat ta'mirlovchisi"
  ],
  "Elektr ta'minoti xo'jaligi": [
    "Kontakt tarmoqlari elektromexaniki",
    "Kontakt tarmoqlari elektromontyor",
    "LEP-10 KW elektromexaniki",
    "LEP-10 KW elektromontyor",
    "TPS elektromexaniki",
    "TPS elektromontyor"
  ],
  "Signallashtirish va aloqa xo'jaligi": [
    "SMR elektromexaniki",
    "SMR elektromontyor",
    "Aloqa elektromexaniki",
    "Aloqa elektromontyor",
    "KTSM (DISK) elektromexaniki",
    "KTSM (DISK) elektromontyor",
    "KIP SMB elektromexaniki",
    "KIP SMB elektromontyor"
  ],
  "Tashish va bekatlar ishlari xo'jaligi": [
    "DSP va manyovr dispetcher (DSS)",
    "Saralash tepaligi navbatchisi (DSPG), saralash tepaligi operatori, MES operatori, saralash tepaligi signalisti",
    "Poyezd tuzuvchisi, poyezd tuzuvchisi yordamchisi, bosh konduktor",
    "Signalist, vagonlar tezligini me'yorlovchisi (RSDV)",
    "Tashish xujjatlarini qayta ishlash operatori, EVM operatori",
    "Situator, vaziyatchi operator",
    "Bekat navbatchisi oldi operatori"
  ],
  "Mehnat muxofazasi va texnika xavfsizligi xo'jaligi": [
    "Muhandis xodimlar",
    "Ishchi xodimlar"
  ],
  "Lokomotiv xo'jaligi": [
    "Xodavik chilangar",
    "Dizilist chilangar",
    "Elektrik chilangar"
  ],
  "Vagon xo'jaligi": [
    "Chilangar",
    "Texnik ko'rik nuqtasi vagon ko'ruvchi-ta'mirlovchi"
  ]
};

// Yangi qo'shilgan yo'nalishlarni yuklash
try {
  const customDirs = JSON.parse(localStorage.getItem('railexam_custom_dirs') || '{}');
  for (const [dept, subs] of Object.entries(customDirs)) {
    if (!SUBDIRS[dept]) SUBDIRS[dept] = [];
    subs.forEach(s => { if (!SUBDIRS[dept].includes(s)) SUBDIRS[dept].push(s); });
  }
} catch (e) {
  console.error("Yangi yo'nalishlarni yuklashda xato:", e);
}
// Legacy alias
const TASHISH_SUBDIRS = SUBDIRS["Tashish va bekatlar ishlari xo'jaligi"];
// Toifalar only for Yo'l ta'mirlovchi
const YOL_TAMIRLOVCHI_TOIFALAR = ["3-toifa", "4-toifa"];

// ===== TRANSLATIONS & TRANSLITERATION =====
const DIR_TRANSLATIONS = {
  uzb: {
    "Yo'l xo'jaligi": "Йўл хўжалиги",
    "Elektr ta'minoti xo'jaligi": "Электр таъминоти хўжалиги",
    "Signallashtirish va aloqa xo'jaligi": "Сигналлаштириш ва алоқа хўжалиги",
    "Tashish va bekatlar ishlari xo'jaligi": "Ташиш ва bekatлар ишлари хўжалиги",
    "Mehnat muxofazasi va texnika xavfsizligi xo'jaligi": "Меҳнат муҳофазаси ва техника хавфсизлиги хўжалиги",
    "Lokomotiv xo'jaligi": "Локомотив хўжалиги",
    "Vagon xo'jaligi": "Вагон хўжалиги",
    "Yo'l ta'mirlovchi": "Йўл таъмирловчи",
    "Nuqson izlovchi": "Нуқсон изловchi",
    "Temir yo'l kesishmasi navbatchisi": "Темир йўл кесишмаси навбатчиси",
    "Suniy inshoat ta'mirlovchisi": "Суний иншоат таъмирловчиси",
    "Kontakt tarmoqlari elektromexaniki": "Контакт тармоқлари электромеханики",
    "Kontakt tarmoqlari elektromontyor": "Контакт тармоқлари электромонтёр",
    "LEP-10 KW elektromexaniki": "ЛЭП-10 КВт электромеханики",
    "LEP-10 KW elektromontyor": "ЛЭП-10 КВт электромонтёр",
    "TPS elektromexaniki": "ТПС электромеханики",
    "TPS elektromontyor": "ТПС электромонтёр",
    "SMR elektromexaniki": "СМР электромеханики",
    "SMR elektromontyor": "СМР электромонтёр",
    "Aloqa elektromexaniki": "Алоқа электромеханики",
    "Aloqa elektromontyor": "Алоқа электромонтёр",
    "KTSM (DISK) elektromexaniki": "КТСМ (ДИСК) электромеханики",
    "KTSM (DISK) elektromontyor": "КТСМ (ДИСК) электромонтёр",
    "KIP SMB elektromexaniki": "КИП СМБ электромеханики",
    "KIP SMB elektromontyor": "КИП СМБ электромонтёр",
    "DSP va manyovr dispetcher (DSS)": "ДСП ва манёвр диспетчер (ДСС)",
    "Saralash tepaligi navbatchisi (DSPG), saralash tepaligi operatori, MES operatori, saralash tepaligi signalisti": "Саралаш тепалиги навбатчиси (ДСПГ), саралаш тепалиги оператори, МЕС оператори, саралаш тепалиги сигналисти",
    "Poyezd tuzuvchisi, poyezd tuzuvchisi yordamchisi, bosh konduktor": "Поезд тузувчиси, поезд тузувчиси ёрдамчиси, бош кондуктор",
    "Signalist, vagonlar tezligini me'yorlovchisi (RSDV)": "Сигналист, вагонlar тезлигини меъёрловчиси (РСДВ)",
    "Tashish xujjatlarini qayta ishlash operatori, EVM operatori": "Ташиш ҳужжатларини qayta ishlash оператори, ЭВМ оператори",
    "Situator, vaziyatchi operator": "Ситуатор, вазиятчи оператори",
    "Bekat navbatchisi oldi operatori": "Бекат навбатчиси олди оператори",
    "Muhandis xodimlar": "Муҳандис ходимлар",
    "Ishchi xodimlar": "Ишчи ходимлар",
    "Xodavik chilangar": "Ходавик чилангар",
    "Dizilist chilangar": "Дизилист чилангар",
    "Elektrik chilangar": "Электрик чилангар",
    "Chilangar": "Чилангар",
    "Texnik ko'rik nuqtasi vagon ko'ruvchi-ta'mirlovchi": "Техник кўрик нуқтаси вагон кўрувчи-таъмирловчи"
  },
  ru: {
    "Yo'l xo'jaligi": "Путевое хозяйство",
    "Elektr ta'minoti xo'jaligi": "Хозяйство электроснабжения",
    "Signallashtirish va aloqa xo'jaligi": "Хозяйство сигнализации и связи",
    "Tashish va bekatlar ishlari xo'jaligi": "Хозяйство перевозок и станционной работы",
    "Mehnat muxofazasi va texnika xavfsizligi xo'jaligi": "Хозяйство охраны труда и техники безопасности",
    "Lokomotiv xo'jaligi": "Локомотивное хозяйство",
    "Vagon xo'jaligi": "Вагонное хозяйство",
    "Yo'l ta'mirlovchi": "Монтер пути",
    "Nuqson izlovchi": "Оператор дефектоскопной тележки",
    "Temir yo'l kesishmasi navbatchisi": "Дежурный по железнодорожному переезду",
    "Suniy inshoat ta'mirlovchisi": "Ремонтник искусственных сооружений",
    "Kontakt tarmoqlari elektromexaniki": "Электромеханик контактной сети",
    "Kontakt tarmoqlari elektromontyor": "Электромонтер контактной сети",
    "LEP-10 KW elektromexaniki": "Электромеханик ЛЭП-10 кВ",
    "LEP-10 KW elektromontyor": "Электромонтер ЛЭП-10 кВ",
    "TPS elektromexaniki": "Электромеханик тяговой подстанции",
    "TPS elektromontyor": "Электромонтер тяговой подстанции",
    "SMR elektromexaniki": "Электромеханик СЦБ",
    "SMR elektromontyor": "Электромонтер СЦБ",
    "Aloqa elektromexaniki": "Электромеханик связи",
    "Aloqa elektromontyor": "Электромонтер связи",
    "KTSM (DISK) elektromexaniki": "Электромеханик КТСМ (ДИСК)",
    "KTSM (DISK) elektromontyor": "Электромонтер КТСМ (ДИСК)",
    "KIP SMB elektromexaniki": "Электромеханик КИП СЦБ",
    "KIP SMB elektromontyor": "Электромонтер КИП СЦБ",
    "DSP va manyovr dispetcher (DSS)": "ДСП и маневровый диспетчер",
    "Saralash tepaligi navbatchisi (DSPG), saralash tepaligi operatori, MES operatori, saralash tepaligi signalisti": "Дежурный по сортировочной горке (ДСПГ), оператор сортировочной горки, оператор поста централизации, сигналист",
    "Poyezd tuzuvchisi, poyezd tuzuvchisi yordamchisi, bosh konduktor": "Составитель поездов, помощник составителя поездов, главный кондуктор",
    "Signalist, vagonlar tezligini me'yorlovchisi (RSDV)": "Сигналист, регулировщик скорости движения вагонов",
    "Tashish xujjatlarini qayta ishlash operatori, EVM operatori": "Оператор по обработке перевозочных документов, оператор ЭВМ",
    "Situator, vaziyatchi operator": "Ситуационный оператор",
    "Bekat navbatchisi oldi operatori": "Оператор при дежурном по станции",
    "Muhandis xodimlar": "Инженерно-технические работники",
    "Ishchi xodimlar": "Рабочий персонал",
    "Xodavik chilangar": "Слесарь по ходовой части",
    "Dizilist chilangar": "Слесарь-дизелист",
    "Elektrik chilangar": "Слесарь-электрик",
    "Chilangar": "Слесарь",
    "Texnik ko'rik nuqtasi vagon ko'ruvchi-ta'mirlovchi": "Осмотрщик-ремонтник вагонов ПТО"
  }
};

function toCyrillic(text) {
  if (typeof text !== 'string') return text;
  let res = text;

  res = res.replace(/yo['‘`’]/gi, m => m[0] === 'y' ? 'йў' : 'Йў');
  res = res.replace(/Yo['‘`’]/g, 'Йў');
  res = res.replace(/YO['‘`’]/g, 'ЙЎ');

  res = res.replace(/o['‘`’]/gi, m => m === 'o' ? 'ў' : 'Ў');
  res = res.replace(/g['‘`’]/gi, m => m === 'g' ? 'ғ' : 'Ғ');

  res = res.replace(/sh/g, 'ш').replace(/Sh/g, 'Ш').replace(/SH/g, 'Ш');
  res = res.replace(/ch/g, 'ч').replace(/Ch/g, 'Ч').replace(/CH/g, 'Ч');

  res = res.replace(/yo/g, 'ё').replace(/Yo/g, 'Ё').replace(/YO/g, 'Ё');
  res = res.replace(/yu/g, 'ю').replace(/Yu/g, 'Ю').replace(/YU/g, 'Ю');
  res = res.replace(/ya/g, 'я').replace(/Ya/g, 'Я').replace(/YA/g, 'Я');
  res = res.replace(/ye/g, 'е').replace(/Ye/g, 'Е').replace(/YE/g, 'Е');

  res = res.replace(/ts/g, 'ц').replace(/Ts/g, 'Ц').replace(/TS/g, 'Ц');

  res = res.replace(/\b([eE])/g, (m, p1) => p1 === 'e' ? 'э' : 'Э');

  res = res.replace(/([a-zA-Zа-яА-ЯёЁўЎғҒҳҲ])['‘`’]([a-zA-Zа-яА-ЯёЁўЎғҒҳҲ])/g, '$1ъ$2');

  const latCyr = {
    'a': 'а', 'A': 'А', 'b': 'б', 'B': 'Б', 'd': 'д', 'D': 'Д',
    'e': 'е', 'E': 'Е', 'f': 'ф', 'F': 'Ф', 'g': 'г', 'G': 'Г',
    'h': 'ҳ', 'H': 'Ҳ', 'i': 'и', 'I': 'И', 'j': 'ж', 'J': 'Ж',
    'k': 'к', 'K': 'К', 'l': 'л', 'L': 'Л', 'm': 'м', 'M': 'М',
    'n': 'н', 'N': 'Н', 'o': 'о', 'O': 'О', 'p': 'п', 'P': 'П',
    'q': 'қ', 'Q': 'Қ', 'r': 'р', 'R': 'Р', 's': 'с', 'S': 'С',
    't': 'т', 'T': 'Т', 'u': 'у', 'U': 'У', 'v': 'в', 'V': 'В',
    'x': 'х', 'X': 'Х', 'y': 'й', 'Y': 'Й', 'z': 'з', 'Z': 'З'
  };

  let finalRes = '';
  for (let i = 0; i < res.length; i++) {
    const char = res[i];
    finalRes += latCyr[char] !== undefined ? latCyr[char] : char;
  }
  return finalRes;
}

function translateDirection(d) {
  if (!d) return '';
  const lang = S.lang;
  if (DIR_TRANSLATIONS[lang] && DIR_TRANSLATIONS[lang][d]) {
    return DIR_TRANSLATIONS[lang][d];
  }
  if (lang === 'uzb') {
    return toCyrillic(d);
  }
  return d;
}

const QUESTIONS = [];
// ===== LOCALES =====
const L = {
  uz: {
    lang: "O'zbek tili", flag: "🇺🇿", sub: "Lotin", back: "Tilni o'zgartirish", reg: "Ro'yxatdan o'tish", name: "F.I.Sh (To'liq ism)", pos: "Lavozim", jshir: "JSHSHIR (14 raqam)", phone: "Telefon", camT: "Kamera", camD: "Imtihon uchun rasm oling", capture: "Rasm olish", retakeCam: "Qayta", camOk: "Tasdiqlash", skipCam: "Kamerasiz davom etish →", dirT: "Yo'nalishni tanlang", dirD: "Imtihon yo'nalishini belgilang", start: "Imtihonni boshlash", cont: "Davom etish", prev: "Oldingi", next: "Keyingisi", finish: "Tugatish", fin2: "Imtihonni tugatish", ansgiven: "javob", finQ: "Imtihonni tugatishni tasdiqlaysizmi?", cancel: "Bekor qilish", yesF: "Ha, tugatish", retake: "Qayta topshirish", home: "Bosh sahifa", tabW: "Boshqa tabga o'tdingiz! Bu qayd etildi.", passed: "O'TDINGIZ! 🎉", failed: "YIQILDINGIZ 😔", passedMsg: "Tabriklaymiz! Imtihondan muvaffaqiyatli o'tdingiz.", failedMsg: "Afsuski, o'ta olmadingiz. Qayta urinib ko'ring.", correct: "To'g'ri javoblar", wrong: "Noto'g'ri javoblar", total: "Jami savollar", passScore: "O'tish bali: 72%",
    errFill: "Barcha maydonlarni to'ldiring!", errJshir: "JSHSHIR 14 ta raqam bo'lishi kerak!", errDir: "Yo'nalishni tanlang!", errSub: "Mutaxassislikni tanlang!", errToifa: "Toifani tanlang (3-toifa yoki 4-toifa)!", errNoQ: "Bu yo'nalish uchun hali savollar qo'shilmagan!",
    tabDesc: "Bu holat qayd etildi.", tabBtn: "Imtihonga qaytish", warnLeft: "ta savol javobsiz!", warnAll: "Barcha savollarga javob berildi.",
    detailTitle: "Savol-javoblar", yourAnsLbl: "Siz:", corrAnsLbl: "To'g'ri:"
  },
  uzb: {
    lang: "Ўзбек тили", flag: "🇺🇿", sub: "Кирилл", back: "Тилни ўзгартириш", reg: "Рўйхатдан ўтиш", name: "Ф.И.Ш (Тўлиқ исм)", pos: "Лавозим", jshir: "ЖШШИР (14 рақам)", phone: "Телефон", camT: "Камера", camD: "Имтиҳон учун расм олинг", capture: "Расм олиш", retakeCam: "Қайта", camOk: "Тасдиқлаш", skipCam: "Камерасиз давом этиш →", dirT: "Йўналишни танланг", dirD: "Имтиҳон йўналишини белгиланг", start: "Имтиҳонни бошлаш", cont: "Давом этиш", prev: "Олдинги", next: "Кейингиси", finish: "Тугатиш", fin2: "Имтиҳонни тугатиш", ansgiven: "жавоб", finQ: "Имтиҳонни тугатишни тасдиқлайсизми?", cancel: "Бекор қилиш", yesF: "Ҳа, тугатиш", retake: "Қайта топшириш", home: "Бош саҳифа", tabW: "Бошқа табга ўтдингиз! Бу қайд этилди.", passed: "ЎТДИНГИЗ! 🎉", failed: "ЙИҚИЛДИНГИЗ 😔", passedMsg: "Табриклаймиз! Имтиҳондан муваффақиятли ўтдингиз.", failedMsg: "Афсуски, ўта олмадингиз. Қайта уриниб кўринг.", correct: "Тўғри жавоблар", wrong: "Нотўғри жавоблар", total: "Жами саволлар", passScore: "Ўтиш бали: 72%",
    errFill: "Барча майдонларни тўлдиринг!", errJshir: "ЖШШИР 14 та рақам бўлиши керак!", errDir: "Йўналишни танланг!", errSub: "Мутахассисликни танланг!", errToifa: "Тоифани танланг (3-тоифа ёки 4-тоифа)!", errNoQ: "Бу йўналиш учун ҳали саволлар қўшилмаган!",
    tabDesc: "Бу ҳолат қайд этилди.", tabBtn: "Имтиҳонга қайтиш", warnLeft: "та савол жавобсиз!", warnAll: "Барча саволларга жавоб берилди.",
    detailTitle: "Савол-жавоблар", yourAnsLbl: "Сиз:", corrAnsLbl: "Тўғри:"
  },
  ru: {
    lang: "Русский язык", flag: "🇷🇺", sub: "Кириллица", back: "Сменить язык", reg: "Регистрация", name: "ФИО (Полное имя)", pos: "Должность", jshir: "ПИНФЛ (14 цифр)", phone: "Телефон", camT: "Камера", camD: "Сделайте фото для экзамена", capture: "Сделать фото", retakeCam: "Переснять", camOk: "Подтвердить", skipCam: "Продолжить без камеры →", dirT: "Выберите направление", dirD: "Укажите направление экзамена", start: "Начать экзамен", cont: "Продолжить", prev: "Предыдущий", next: "Следующий", finish: "Завершить", fin2: "Завершить экзамен", ansgiven: "ответов", finQ: "Вы уверены, что хотите завершить?", cancel: "Отмена", yesF: "Да, завершить", retake: "Пересдать", home: "На главную", tabW: "Вы переключили вкладку! Это зафиксировано.", passed: "СДАЛИ! 🎉", failed: "НЕ СДАЛИ 😔", passedMsg: "Поздравляем! Вы успешно сдали экзамен.", failedMsg: "К сожалению, вы не сдали. Попробуйте ещё раз.", correct: "Правильных ответов", wrong: "Неправильных ответов", total: "Всего вопросов", passScore: "Проходной балл: 72%",
    errFill: "Заполните все поля!", errJshir: "ПИНФЛ должен состоять из 14 цифр!", errDir: "Выберите направление!", errSub: "Выберите специальность!", errToifa: "Выберите категорию (3-я или 4-я категория)!", errNoQ: "Для этого направления вопросы еще не добавлены!",
    tabDesc: "Это было зафиксировано.", tabBtn: "Вернуться к экзамену", warnLeft: "вопросов осталось без ответа!", warnAll: "На все вопросы даны ответы.",
    detailTitle: "Вопросы и ответы", yourAnsLbl: "Вы:", corrAnsLbl: "Правильно:"
  }
};
// ===== STATE =====
window.S = {
  lang: localStorage.getItem('re_lang') || 'uz',
  step: 1,
  userPhoto: '',
  userName: '',
  userPos: '',
  userJshir: '',
  userPhone: '',
  direction: '',
  subDirection: '',
  toifa: '',
  examQuestions: [],
  answers: {},
  currentQ: 0,
  timeLeft: 36 * 60,
  timerInterval: null,
  tabSwitches: 0,
  startTime: null,
  examDone: false,
  results: (window.DB_RESULTS && window.DB_RESULTS.length ? window.DB_RESULTS : []),
  questions: (window.DB_QUESTIONS && window.DB_QUESTIONS.length ? window.DB_QUESTIONS : []),
  phase2Questions: JSON.parse(localStorage.getItem('re_phase2_questions') || (typeof DEFAULT_PHASE2_TICKETS !== 'undefined' ? JSON.stringify(DEFAULT_PHASE2_TICKETS) : '[]')),
  phase2Results: JSON.parse(localStorage.getItem('re_phase2_results') || '[]'),
  phase2Answers: [],
  phase2EnvelopeIndex: null,
  phase2TimeLeft: 40 * 60,
  phase2TimerInterval: null,
  adminSection: 'dash', charts: {}, filterDir: '', filterDept: '', filterStatus: '', qPage: 1, qFilterDir: '',
  phase2ResultsList: [], p2FilterDept: '', p2FilterStatus: ''
};
let S = window.S;

// ===== THEME INIT =====
const savedTheme = localStorage.getItem('re_theme');
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('re_theme', next);
  const btn = document.getElementById('btn-theme');
  if (btn) btn.innerHTML = next === 'light' ? '🌙 Qorong\'i tema' : '☀️ Yorug\' tema';
}

// Global functions
const t = k => L[S.lang][k] || k;
function $(id) { return document.getElementById(id); }
function toast(msg, color) { const e = $('toast'); e.textContent = msg; e.style.background = color || 'var(--blue)'; e.style.opacity = '1'; setTimeout(() => e.style.opacity = '0', 3000); }
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const p = $(id);
  if (p) p.classList.add('active');
  window.scrollTo(0, 0);
  if (id !== 'pg-exam' && id !== 'pg-phase2-exam' && id !== 'pg-result' && id !== 'pg-phase2-finish' && id !== 'pg-phase2-envelopes') {
    localStorage.setItem('re_current_page', id);
  }
}
function closeModal(id) { $(id).style.display = 'none'; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - .5); }

// ===== TIL SAHIFASI =====
function getFlagSVG(code) {
  if (code === 'uz' || code === 'uzb') {
    return `
      <svg width="28" height="18" viewBox="0 0 28 18">
        <rect width="28" height="6" fill="#1EB53A"/>
        <rect y="6" width="28" height="6" fill="#FFFFFF"/>
        <rect y="12" width="28" height="6" fill="#0099B5"/>
        <rect y="5.5" width="28" height="1" fill="#CE1126"/>
        <rect y="11.5" width="28" height="1" fill="#CE1126"/>
      </svg>
    `;
  }

  if (code === 'ru') {
    return `
      <svg width="28" height="18" viewBox="0 0 28 18">
        <rect width="28" height="6" fill="#FFFFFF"/>
        <rect y="6" width="28" height="6" fill="#0039A6"/>
        <rect y="12" width="28" height="6" fill="#D52B1E"/>
      </svg>
    `;
  }

  return '';
}
function initLangPage() {
  $('langList').innerHTML = Object.entries(L).map(([c, l]) => `
    <button class="lang-card ${S.lang === c ? 'sel' : ''}" onclick="selectLang('${c}')">
      
      <span style="font-size:27px;flex-shrink:0;">
        ${typeof getFlagSVG === 'function' ? getFlagSVG(c) : l.flag}
      </span>

      <div style="flex:1;">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:17px;color:var(--text);">
          ${l.lang}
        </div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px;">
          ${l.sub}
        </div>
      </div>

      <div style="width:26px;height:26px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;opacity:${S.lang === c ? 1 : 0};transition:opacity .2s;flex-shrink:0;">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

    </button>
  `).join('');
}
function selectLang(c) {
  S.lang = c;
  localStorage.setItem('re_lang', c);
  initLangPage();
  setTimeout(() => { showPage('pg-register'); initRegister(); }, 250);
}

// ===== RO'YXATDAN O'TISH =====
function initRegister() {
  $('txt-back-lang').textContent = t('back');
  $('txt-register-title').textContent = t('reg');
  $('lbl-name').textContent = t('name');
  $('lbl-pos').textContent = t('pos');
  $('lbl-jshir').textContent = t('jshir');
  $('lbl-phone').textContent = t('phone');
  $('txt-cam-title').textContent = '2. ' + t('camT');
  $('txt-cam-desc').textContent = t('camD');
  $('txt-capture').textContent = t('capture');
  $('txt-retake-cam').textContent = t('retakeCam');
  $('txt-cam-ok').textContent = t('camOk');
  $('txt-skip-cam').textContent = t('skipCam');
  $('txt-dir-title').textContent = '3. ' + t('dirT');
  $('txt-dir-desc').textContent = t('dirD');
  $('txt-start-btn').textContent = t('cont');
  $('txt-continue').textContent = t('cont');
  S.direction = ''; S.subDirection = ''; S.toifa = '';
  ['inp-name', 'inp-pos', 'inp-jshir', 'inp-phone'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  const jc = $('jshir-cnt'); if (jc) jc.textContent = '0/14';

  // Translate "Ortga" buttons dynamically
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Ortga')) {
      btn.innerHTML = '← ' + (S.lang === 'ru' ? 'Назад' : (S.lang === 'uzb' ? 'Ортга' : 'Ortga'));
    }
  });

  // Translate Toifa section header dynamically
  const toifaH4 = document.querySelector('#toifaSection h4');
  if (toifaH4) {
    toifaH4.textContent = S.lang === 'ru' ? 'Выберите категорию' : (S.lang === 'uzb' ? 'Тоифани танланг' : 'Toifani tanlang');
  }

  showStep(1); initDirList(); updateStepBar(1);
}
function showStep(n) {
  S.step = n;
  [1, 2, 3, 4].forEach(i => {
    const el = $('step' + i);
    if (el) el.style.display = i === n ? 'block' : 'none';
  });
  updateStepBar(n);
  if (n === 2) initCamera();
  if (n === 4) initSubDirList();
}
function updateStepBar(a) {
  const showFour = S.direction === "Tashish va bekatlar ishlari xo'jaligi" || a >= 4;
  const total = showFour ? 4 : 3;
  $('stepBar').innerHTML = Array.from({ length: total }, (_, i) => i + 1).map(s => `
    <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;transition:all .3s;background:${a >= s ? 'var(--blue)' : 'var(--surface2)'};color:${a >= s ? 'white' : 'var(--text3)'};">${s}</div>
    ${s < total ? `<div style="width:24px;height:2px;background:${a > s ? 'var(--blue)' : 'var(--border)'};transition:background .3s;"></div>` : ''}`).join('');
}
function goStep2() {
  const name = $('inp-name').value.trim();
  const pos = $('inp-pos').value.trim();
  const jshir = $('inp-jshir').value.trim();
  const phone = $('inp-phone').value.trim();
  if (!name || !pos || !jshir || !phone) { toast(t('errFill'), 'var(--red)'); return; }
  if (jshir.length !== 14) { toast(t('errJshir'), 'var(--amber)'); return; }
  S.userName = name; S.userPos = pos; S.userJshir = jshir; S.userPhone = phone;
  showStep(2);
}
function goStep3() { stopCamera(); showStep(3); }
function goStep4() {
  if (!S.direction) { toast(t('errDir'), 'var(--amber)'); return; }
  if (SUBDIRS[S.direction] && SUBDIRS[S.direction].length > 0) {
    showStep(4);
  } else {
    startExam();
  }
}
// ===== SUB-DIR LIST =====
function initSubDirList() {
  const subdirs = SUBDIRS[S.direction] || [];
  $('subDirList').innerHTML = subdirs.map((d, i) => {
    const sid = 'sd_' + i;
    return `<button onclick="selectSubDir(this,'${d.replace(/'/g, "\\'")}')"; id="${sid}" class="opt" style="margin-bottom:2px;">
      <span class="opt-key" style="flex-shrink:0;">${i + 1}</span>
      <span style="flex:1;text-align:left;font-size:13px;">${translateDirection(d)}</span>
    </button>`;
  }).join('');
  // Toifa bo'limini yashirish
  const ts = $('toifaSection');
  if (ts) ts.style.display = 'none';
  S.toifa = '';
}
function selectSubDir(btn, d) {
  S.subDirection = d;
  S.toifa = '';
  document.querySelectorAll('#subDirList .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  // Faqat "Yo'l ta'mirlovchi" uchun toifa bo'limini ko'rsatish
  const ts = $('toifaSection');
  if (ts) {
    if (d === "Yo'l ta'mirlovchi") {
      ts.style.display = 'block';
      initToifaList();
    } else {
      ts.style.display = 'none';
    }
  }
}
function initToifaList() {
  $('toifaList').innerHTML = YOL_TAMIRLOVCHI_TOIFALAR.map((toifa, i) => {
    const displayName = S.lang === 'uzb' ? toCyrillic(toifa) : (S.lang === 'ru' ? (toifa === '3-toifa' ? '3-я категория' : '4-я категория') : toifa);
    return `<button onclick="selectToifa(this,'${toifa}')" id="toifa_${i}" class="opt" style="margin-bottom:2px;">
      <span class="opt-key" style="flex-shrink:0;background:rgba(245,158,11,.2);color:#f59e0b;">${i + 1}</span>
      <span style="flex:1;text-align:left;font-size:14px;font-weight:600;">${displayName}</span>
    </button>`;
  }).join('');
}
function selectToifa(btn, toifa) {
  S.toifa = toifa;
  document.querySelectorAll('#toifaList .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ===== KAMERA (MOBIL FIX) =====
let camStream = null;
function initCamera() {
  $('btn-capture').disabled = true;
  $('btn-capture').style.display = 'flex';
  $('btn-retake').style.display = 'none';
  $('btn-cam-ok').style.display = 'none';
  $('camVideo').style.display = 'none';
  $('camCanvas').style.display = 'none';
  $('camOverlay').style.display = 'flex';
  $('txt-cam-loading').textContent = 'Kamera yuklanmoqda...';
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    $('txt-cam-loading').textContent = 'Kamera qo\'llab-quvvatlanmaydi.'; return;
  }
  // Mobil uchun optimal constraints
  const constraints = { video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } };
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    camStream = stream;
    const v = $('camVideo');
    v.srcObject = stream;
    v.setAttribute('playsinline', 'true');
    v.muted = true;
    const tryShow = () => { v.style.display = 'block'; $('camOverlay').style.display = 'none'; $('btn-capture').disabled = false; };
    v.onloadedmetadata = () => { v.play().then(tryShow).catch(tryShow); };
    setTimeout(() => { if (v.readyState >= 1) tryShow(); }, 2500);
  }).catch(err => {
    if (err.name === 'NotAllowedError') $('txt-cam-loading').textContent = 'Kameraga ruxsat berilmadi.';
    else if (err.name === 'NotFoundError') $('txt-cam-loading').textContent = 'Kamera topilmadi.';
    else $('txt-cam-loading').textContent = 'Kamerasiz davom etishingiz mumkin.';
  });
}
function stopCamera() { if (camStream) { camStream.getTracks().forEach(t => t.stop()); camStream = null; } }
function capturePhoto() {
  const v = $('camVideo'), c = $('camCanvas');
  c.width = v.videoWidth || 320; c.height = v.videoHeight || 240;
  c.getContext('2d').drawImage(v, 0, 0);
  S.userPhoto = c.toDataURL('image/jpeg', 0.7);
  v.style.display = 'none'; c.style.display = 'block';
  $('btn-capture').style.display = 'none';
  $('btn-retake').style.display = 'flex';
  $('btn-cam-ok').style.display = 'flex';
}
function retakePhoto() {
  S.userPhoto = '';
  $('camCanvas').style.display = 'none';
  $('camVideo').style.display = 'block';
  $('btn-capture').style.display = 'flex';
  $('btn-retake').style.display = 'none';
  $('btn-cam-ok').style.display = 'none';
}

// ===== YO'NALISH RO'YXATI (TO'LIQ TANLANISH) =====
function initDirList() {
  // Yo'nalishlar SUBDIRS dan olinadi (savollar bazasiga bog'liq emas)
  const dirs = Object.keys(SUBDIRS);
  $('dirList').innerHTML = dirs.map((d, i) => {
    return '<button onclick="selectDir(this,\'' + d.replace(/'/g, "\\'") + '\')" class="opt" style="margin-bottom:2px;"><span class="opt-key" style="flex-shrink:0;">' + (i + 1) + '</span><span style="flex:1;text-align:left;">' + translateDirection(d) + '</span></button>';
  }).join('');
}
function selectDir(btn, d) {
  S.direction = d;
  document.querySelectorAll('#dirList .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}


// ===== IMTIHON BOSHLASH (36 ta random) =====
async function startExam() {
  if (!S.direction) { toast(t('errDir'), 'var(--amber)'); return; }
  const hasSubDirs = SUBDIRS[S.direction] && SUBDIRS[S.direction].length > 0;
  if (hasSubDirs && !S.subDirection) {
    toast(t('errSub'), 'var(--amber)'); return;
  }
  if (S.subDirection === "Yo'l ta'mirlovchi" && !S.toifa) {
    toast(t('errToifa'), 'var(--amber)'); return;
  }

  // ===== ESKI IMTIHON QOLDIQLARINI TOZALASH =====
  // Eski event listener olib tashlanadi
  document.removeEventListener('visibilitychange', handleTabSwitch);
  // Eski taymer to'xtatiladi
  if (S.timerInterval) { clearInterval(S.timerInterval); S.timerInterval = null; }
  // Tab ogohlantirish yashiriladi
  const twb = $('tab-warn-badge'); if (twb) twb.style.display = 'none';
  // Eski modallar yopiladi
  const finM = $('finishModal'); if (finM) finM.style.display = 'none';
  const tabM = $('tabModal'); if (tabM) tabM.style.display = 'none';
  // Natija kartasi tozalanadi
  const rc = $('resultCard'); if (rc) rc.innerHTML = '';
  // =============================================

  console.log('S.subDirection:', S.subDirection);
  console.log('S.questions count:', S.questions.length);
  // Faqat tanlangan yo'nalish bo'yicha qat'iy filter
  let pool;
  if (S.subDirection) {
    // Sub-yo'nalish tanlangan: FAQAT shu yo'nalish savollari
    pool = S.questions.filter(q => q.dir === S.subDirection);
  } else {
    // Sub-yo'nalish yo'q: xo'jalik nomi bo'yicha filter
    pool = S.questions.filter(q => q.dir === S.direction);
  }
  // Pool bo'sh bo'lsa ogohlantirish, aks holda faqat shu pool dan olamiz
  if (pool.length === 0) {
    toast(t('errNoQ'), 'var(--amber)');
    return;
  }
  // Savollar takrorlanmasligi uchun faqat boridan (ko'pi bilan 36 ta) random tanlab olinadi
  const picked = shuffle(pool).slice(0, Math.min(36, pool.length));

  S.examQuestions = picked.map(q => {
    const keys = shuffle(['A', 'B', 'C', 'D']);
    const newOpts = {}, keyMap = {};

    keys.forEach((ok, i) => {
      const nk = ['A', 'B', 'C', 'D'][i];
      const rawOpt = q.opts[ok];
      // Faqat uzb uchun toCyrillic, ru uchun keyinroq tarjima
      newOpts[nk] = S.lang === 'uzb' ? toCyrillic(rawOpt) : rawOpt;
      keyMap[ok] = nk;
    });

    const rawQText = q.q;
    return {
      ...q,
      q: S.lang === 'uzb' ? toCyrillic(rawQText) : rawQText,
      opts: newOpts,
      correctMapped: keyMap[q.ans],
      dir: q.dir
    };
  });

  S.answers = {};
  S.currentQ = 0;
  S.timeLeft = 36 * 60;
  S.tabSwitches = 0;
  S.startTime = Date.now();
  S.examDone = false;

  showPage('pg-exam');
  initExam();

  // 🇷🇺 Rus tili uchun: darhol imtihon boshlanadi, tarjima fonda ishlaydi
  if (S.lang === 'ru') {
    translateInBackground();
  }
}

// Fonda tarjima — imtihonni kutdirmaydi, 2 ta savol birdaniga tarjima qilinadi
async function translateInBackground() {
  const SEP = ' ||||| ';
  const BATCH = 10; // 10 matn = 2 ta savol
  const total = S.examQuestions.length * 5;

  for (let i = 0; i < total; i += BATCH) {
    if (S.examDone) break; // Imtihon tugagan bo'lsa to'xtatish

    const batch = [];
    for (let j = i; j < Math.min(i + BATCH, total); j++) {
      const qIdx = Math.floor(j / 5);
      const fIdx = j % 5;
      const q = S.examQuestions[qIdx];
      if (!q) { batch.push(''); continue; }
      if (fIdx === 0) batch.push(q.q || '');
      else batch.push(q.opts[['A', 'B', 'C', 'D'][fIdx - 1]] || '');
    }

    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=uz&tl=ru&dt=t&q=' + encodeURIComponent(batch.join(SEP));
      const resp = await fetch(url);
      const data = await resp.json();
      const joined = data[0].map(x => x[0]).join('');
      const parts = joined.split(/\s*\|\|\|\|\|\s*/);

      // Tarjimani savollarga joylashtirish
      for (let j = 0; j < batch.length; j++) {
        const globalIdx = i + j;
        const qIdx = Math.floor(globalIdx / 5);
        const fIdx = globalIdx % 5;
        if (!S.examQuestions[qIdx]) continue;
        const txt = parts[j] || batch[j];
        if (fIdx === 0) S.examQuestions[qIdx].q = txt;
        else S.examQuestions[qIdx].opts[['A', 'B', 'C', 'D'][fIdx - 1]] = txt;
      }

      // Hozirgi savol tarjima qilingan bo'lsa — ekranni yangilash
      const bStart = Math.floor(i / 5);
      const bEnd = Math.floor((i + BATCH - 1) / 5);
      if (!S.examDone && S.currentQ >= bStart && S.currentQ <= bEnd) {
        renderQ();
      }
    } catch (e) {
      console.error('Tarjima xatosi (batch ' + i + '):', e);
    }
  }
}


// ===== IMTIHON =====
function initExam() {
  $('txt-prev').textContent = t('prev');
  $('txt-next').textContent = t('next');
  $('txt-fin2').textContent = t('fin2');
  $('txt-finish-mid').textContent = t('finish');
  $('txt-ans-given').textContent = t('ansgiven');
  $('txt-finish-q').textContent = t('finQ');
  $('txt-cancel-btn').textContent = t('cancel');
  $('txt-yes-finish').textContent = t('yesF');

  // Translate tab switcher warnings inside modal
  const tabDesc = document.querySelector('#tabModal p');
  if (tabDesc) tabDesc.textContent = t('tabDesc');
  const tabBtn = document.querySelector('#tabModal button');
  if (tabBtn) tabBtn.textContent = t('tabBtn');

  buildQNav();

  // 🔥 Birinchi savolni ko'rsatish - majburiy render
  renderQ();

  // Qo'shimcha xavfsizlik uchun
  setTimeout(() => {
    renderQ();
  }, 50);

  startTimer();

  document.addEventListener('visibilitychange', handleTabSwitch);
}



// ===== NAV =====
function buildQNav() {
  $('qnav').innerHTML = S.examQuestions.map((_, i) => `
    <div class="qnum ${S.answers[i] !== undefined ? 'answered' : ''} ${i === S.currentQ ? 'current' : ''}" onclick="jumpToQ(${i})">${i + 1}</div>
  `).join('');
}


// ===== RENDER =====
function renderQ() {
  // 🔥 Xavfsizlik tekshiruvi
  if (!$('qText') || !$('optGrid')) return;
  if (!S.examQuestions || S.examQuestions.length === 0) return;

  const q = S.examQuestions[S.currentQ];

  // 🔥 crash oldini olamiz
  if (!q) {
    // Agar savol topilmasa, 0-indexga qaytish
    if (S.currentQ > 0 && S.currentQ >= S.examQuestions.length) {
      S.currentQ = 0;
      renderQ();
    }
    return;
  }

  const total = S.examQuestions.length;
  const answered = Object.keys(S.answers).length;

  $('qNumBadge').textContent = String(S.currentQ + 1).padStart(2, '0');
  $('qDirLabel').textContent = translateDirection(q.dir);
  $('exam-q-label').textContent = `${S.currentQ + 1}/${total}`;
  $('exam-ans-count').textContent = `${answered}/${total}`;
  $('bot-ans').textContent = answered;
  $('bot-total').textContent = total;
  $('examPbar').style.width = (answered / total * 100) + '%';

  $('qText').textContent = q.q;

  // Rasm bo'lsa chiqarish
  let imgEl = document.getElementById('q-current-img');
  if (!imgEl) {
    imgEl = document.createElement('img');
    imgEl.id = 'q-current-img';
    imgEl.style.cssText = 'max-width:100%; max-height:250px; border-radius:8px; margin-bottom:15px; display:block;';
    $('qText').parentNode.insertBefore(imgEl, $('qText'));
  }
  if (q.image) {
    imgEl.src = q.image;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  const myAns = S.answers[S.currentQ];

  $('optGrid').innerHTML = ['A', 'B', 'C', 'D']
    .filter(k => q.opts && q.opts[k])
    .map(k => `
      <button class="opt ${myAns === k ? 'selected' : ''}" onclick="selectAnswer('${k}')">
        <span class="opt-key">${k}</span>
        <span style="flex:1;text-align:left;">${q.opts[k]}</span>
      </button>
    `).join('');

  $('btn-prev').disabled = S.currentQ === 0;
  $('btn-next').innerHTML = S.currentQ === total - 1 ? '🏁' : (t('next') + ' →');

  buildQNav();
}

// ===== ACTIONS =====
function selectAnswer(k) {
  if (S.answers[S.currentQ] !== undefined) return; // Prevent changing answer once selected
  S.answers[S.currentQ] = k;
  renderQ();

  setTimeout(() => {
    if (S.currentQ < S.examQuestions.length - 1) nextQ();
  }, 380);
}

function nextQ() {
  if (S.currentQ < S.examQuestions.length - 1) {
    S.currentQ++;
    renderQ();
  } else {
    showFinishModal();
  }
}

function prevQ() {
  if (S.currentQ > 0) {
    S.currentQ--;
    renderQ();
  }
}

function jumpToQ(i) {
  S.currentQ = i;
  renderQ();
}

// ===== TAYMER =====
let examInterval;

function startTimer() {
  // 🔥 Avvalgi intervalni tozalash
  if (S.timerInterval) {
    clearInterval(S.timerInterval);
  }

  // Taymer elementini yangilash
  updateTimer();

  S.timerInterval = setInterval(() => {
    if (S.timeLeft <= 0 || S.examDone) {
      if (S.timerInterval) {
        clearInterval(S.timerInterval);
        S.timerInterval = null;
      }
      if (S.timeLeft <= 0 && !S.examDone) {
        updateTimer();
        submitExam();
      }
      return;
    }

    S.timeLeft--;
    updateTimer();
  }, 1000);
}
function updateTimer() {
  const m = Math.floor(Math.max(0, S.timeLeft) / 60);
  const s = Math.max(0, S.timeLeft) % 60;

  const el = $('examTimer');
  if (!el) return;

  el.textContent =
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0');

  // Xavfli zonada (5 daqiqadan kam)
  if (S.timeLeft < 300) {
    el.classList.add('warn');
  } else {
    el.classList.remove('warn');
  }
}
// ===== ANTI-CHEAT =====
function handleTabSwitch() {
  if (document.hidden && !S.examDone) {
    S.tabSwitches++;
    $('tab-warn-badge').style.display = 'flex';
    $('tab-count-txt').textContent = S.tabSwitches;
    $('tab-modal-txt').textContent = '⚠️ ' + t('tabW');
    $('tabModal').style.display = 'flex';
  }
}


// ===== TUGATISH =====
function showFinishModal() {
  const total = S.examQuestions.length, answered = Object.keys(S.answers).length, left = total - answered;
  let warnMsg = '';
  if (left > 0) {
    warnMsg = `⚠️ ${left} ${t('warnLeft')}`;
  } else {
    warnMsg = `✅ ${t('warnAll')}`;
  }
  $('unanswered-warn').textContent = warnMsg;
  $('finishModal').style.display = 'flex';
}
async function submitExam() {
  closeModal('finishModal'); clearInterval(S.timerInterval);
  S.examDone = true; document.removeEventListener('visibilitychange', handleTabSwitch);
  let correct = 0;
  const detailed = S.examQuestions.map((q, i) => {
    const ua = S.answers[i] || null; const ok = ua === q.correctMapped; if (ok) correct++;
    return { q: q.q, userAns: ua, correctAns: q.correctMapped, opts: q.opts, ok, dir: q.dir };
  });
  const total = S.examQuestions.length, pct = Math.round(correct / total * 100), passed = correct >= 26; // >25 correct means 26 or more
  const elapsed = Math.round((Date.now() - S.startTime) / 1000);
  const randomUserId = Math.floor(100000 + Math.random() * 900000);
  const r = { id: Date.now(), userId: randomUserId, name: S.userName, pos: S.userPos, jshir: S.userJshir, phone: S.userPhone, photo: S.userPhoto, dir: S.direction, lang: S.lang, total, correct, wrong: total - correct, pct, passed, tabs: S.tabSwitches, duration: elapsed, date: new Date().toLocaleString('uz-UZ'), detailed };

  // LocalStorage ga saqlash
  S.results.unshift(r);
  if (S.results.length > 300) S.results = S.results.slice(0, 300);
  localStorage.setItem('re_results', JSON.stringify(S.results));

  // Supabase ga saqlash asinxron (kutib turilmaydi)
  if (window.saveExamResultToSupabase) {
    saveExamResultToSupabase(r).then(supabaseResult => {
      if (supabaseResult.success) {
        console.log('✅ Natija Supabase ga saqlandi');
      } else {
        console.warn('⚠️ Supabase ga saqlanmadi:', supabaseResult.error);
      }
    }).catch(error => {
      console.error('❌ Supabase ga saqlashda xato:', error);
    });
  }

  syncResultsToFile();
  showResult(r);
}

// ===== NATIJA =====
function showResult(r) {
  showPage('pg-result');
  if ($('txt-retake')) $('txt-retake').textContent = t('retake');
  if ($('txt-home')) $('txt-home').textContent = t('home');
  const circ = 2 * Math.PI * 54, dash = circ - (r.pct / 100) * circ, color = r.passed ? '#22c55e' : '#ef4444';
  $('resultCard').innerHTML = `
    <div style="background:${r.passed ? 'rgba(34,197,94,.06)' : 'rgba(239,68,68,.06)'};border:1px solid ${r.passed ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'};border-radius:20px;padding:22px;text-align:center;margin-bottom:13px;">
      <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;margin-bottom:13px;">
        <svg width="132" height="132" viewBox="0 0 132 132">
          <circle cx="66" cy="66" r="54" fill="none" stroke="var(--border)" stroke-width="10"/>
          <circle cx="66" cy="66" r="54" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${dash}" transform="rotate(-90 66 66)"/>
        </svg>
        <div style="position:absolute;display:flex;flex-direction:column;align-items:center;">
          <span style="font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:${color};">${r.pct}%</span>
          <span style="font-size:11px;color:var(--text3);">ball</span>
        </div>
      </div>
      <div style="font-size:34px;margin-bottom:7px;">${r.passed ? '🎉' : '😔'}</div>
      <h2 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:${color};margin-bottom:5px;">${t(r.passed ? 'passed' : 'failed')}</h2>
      <p style="color:var(--text2);font-size:14px;">${t(r.passed ? 'passedMsg' : 'failedMsg')}</p>
      <p style="color:var(--text3);font-size:12px;margin-top:4px;">${t('passScore')}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:11px;">
      <div class="stat-card" style="text-align:center;padding:13px;"><div style="font-size:22px;font-weight:800;color:var(--green);">${r.correct}</div><div style="font-size:11px;color:var(--text3);margin-top:2px;">${t('correct')}</div></div>
      <div class="stat-card" style="text-align:center;padding:13px;"><div style="font-size:22px;font-weight:800;color:var(--red);">${r.wrong}</div><div style="font-size:11px;color:var(--text3);margin-top:2px;">${t('wrong')}</div></div>
      <div class="stat-card" style="text-align:center;padding:13px;"><div style="font-size:22px;font-weight:800;color:var(--blue-light);">${r.total}</div><div style="font-size:11px;color:var(--text3);margin-top:2px;">${t('total')}</div></div>
    </div>
    <div class="card" style="padding:13px;margin-bottom:11px;font-size:13px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">
        ${[['👤', r.name], ['💼', r.pos], ['🪪', 'JSHSHIR: ' + (r.jshir || '—')], ['📞', r.phone], ['🎯', translateDirection(r.dir)], ['📅', r.date], ['⏱', Math.floor(r.duration / 60) + 'd ' + r.duration % 60 + 's'], ['⚠️', 'Tab: ' + r.tabs]].map(([i, v]) => `<div style="display:flex;gap:5px;align-items:start;"><span>${i}</span><span style="color:var(--text2);font-size:12px;">${v || '—'}</span></div>`).join('')}
      </div>
    </div>
    <details>
      <summary style="cursor:pointer;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:13px;list-style:none;display:flex;justify-content:space-between;">
        <span>${t('detailTitle')} (${r.detailed.length})</span><span>▼</span>
      </summary>
      <div style="background:var(--surface);border:1px solid var(--border);border-top:none;border-radius:0 0 10px 10px;max-height:340px;overflow-y:auto;">
        ${r.detailed.map((d, i) => `<div style="padding:9px 12px;border-bottom:1px solid var(--border);display:flex;gap:9px;">
          <span style="width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;background:${d.ok ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.15)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">${d.ok ? '✓' : '✗'}</span>
          <div style="flex:1;min-width:0;">
            <p style="font-size:12px;margin-bottom:3px;">${i + 1}. ${d.q}</p>
            <div style="display:flex;gap:5px;flex-wrap:wrap;font-size:11px;">
              <span style="padding:2px 7px;border-radius:5px;background:${d.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">${t('yourAnsLbl')} ${d.userAns || '—'}</span>
              ${!d.ok ? `<span style="padding:2px 7px;border-radius:5px;background:rgba(34,197,94,.1);color:var(--green);">${t('corrAnsLbl')} ${d.correctAns}</span>` : ''}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </details>`;

  // 2-Bosqich tugmasini ko'rsatish yoki yashirish
  const p2c = $('phase2-btn-container');
  if (p2c) {
    p2c.style.display = r.passed ? 'block' : 'none';
  }
}

// ===== ADMIN =====
function adminLogin() {
  if ($('admin-email').value === 'admin@railexam.uz' && $('admin-pass').value === 'Admin@12345') {
    // Sahifani DARHOL ochamiz — ma'lumotlar orqa fonda yuklanadi
    $('admin-login-err').style.display = 'none';
    localStorage.setItem('re_admin_logged', 'true');
    showPage('pg-admin');
    adminTab('dash');
  } else {
    $('admin-login-err').style.display = 'block';
    $('admin-login-err').textContent = '❌ Login yoki parol noto\'g\'ri!';
  }
}
function adminLogout() {
  localStorage.removeItem('re_admin_logged');
  localStorage.removeItem('re_current_page');
  localStorage.removeItem('re_admin_tab');
  showPage('pg-admin-login');
}

function showAdminLoader(msg) {
  $('adminContent').innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:16px;">
      <div style="width:44px;height:44px;border:3px solid var(--border);border-top-color:var(--blue-light);border-radius:50%;animation:spin .7s linear infinite;"></div>
      <p style="color:var(--text3);font-size:13px;">${msg || 'Yuklanmoqda...'}</p>
    </div>`;
}

async function adminTab(tab) {
  S.adminSection = tab;
  localStorage.setItem('re_admin_tab', tab);
  ['dash', 'results', 'phase2-results', 'questions', 'phase2'].forEach(x => { const n = $('nav-' + x); if (n) n.classList.remove('active'); });
  const a = $('nav-' + tab); if (a) a.classList.add('active');
  $('admin-page-title').textContent = {
    dash: '📊 Dashboard',
    results: '📋 Birinchi bosqich natijalari',
    'phase2-results': '📋 Ikkinchi bosqich natijalari',
    questions: '❓ 1-Bosqich Savollari',
    phase2: '❓ 2-Bosqich Savollar'
  }[tab];

  // Darhol skeleton ko'rsat
  showAdminLoader('Ma\'lumotlar yuklanmoqda...');

  // Ma'lumotlarni orqa fonda yuklaymiz
  if (tab === 'dash' || tab === 'results') {
    try {
      if (window.loadResultsFromSupabase) {
        const resultsData = await loadResultsFromSupabase();
        if (resultsData && resultsData.success && resultsData.data && resultsData.data.length > 0) {
          S.results = resultsData.data;
          console.log(`✅ Admin: ${resultsData.data.length} ta natija yuklandi`);
        }
      }
    } catch (err) {
      console.warn("Supabase natijalari yuklanmadi, lokal o'zgaruvchilardan foydalaniladi:", err);
    }
  }

  if (tab === 'phase2-results') {
    try {
      if (window.loadResultsFromSupabase) {
        const resultsData = await loadResultsFromSupabase();
        if (resultsData && resultsData.success && resultsData.data) {
          S.results = resultsData.data;
        }
      }
    } catch (err) {
      console.warn("Supabase birinchi bosqich natijalari yuklanmadi:", err);
    }
    try {
      if (window.loadPhase2ResultsFromSupabase) {
        const p2Data = await loadPhase2ResultsFromSupabase();
        if (p2Data && p2Data.success && p2Data.data) {
          S.phase2ResultsList = p2Data.data;
          console.log(`✅ Admin: ${p2Data.data.length} ta 2-bosqich natijasi yuklandi`);
        }
      }
    } catch (err) {
      console.warn("2-bosqich natijalari yuklanmadi:", err);
    }
  }

  if (tab === 'questions') {
    try {
      if (window.loadQuestionsFromSupabase) {
        const questionsData = await loadQuestionsFromSupabase();
        if (questionsData && questionsData.success && questionsData.data && questionsData.data.length > 0) {
          S.questions = questionsData.data;
          console.log(`✅ Admin: ${questionsData.data.length} ta savol yuklandi`);
        }
      }
    } catch (err) {
      console.warn("Supabase savollari yuklanmadi, lokal o'zgaruvchilardan foydalaniladi:", err);
    }
  }

  if (tab === 'dash') renderDash();
  else if (tab === 'results') renderResults();
  else if (tab === 'phase2-results') renderPhase2Results();
  else if (tab === 'questions') renderQuestions();
  else if (tab === 'phase2') renderAdminPhase2();
}

function renderDash() {
  const rs = S.results, total = rs.length, passed = rs.filter(r => r.passed).length, failed = total - passed;
  const avg = total ? Math.round(rs.reduce((s, r) => s + r.pct, 0) / total) : 0;
  const byDir = {}; rs.forEach(r => { if (!byDir[r.dir]) byDir[r.dir] = { t: 0, p: 0 }; byDir[r.dir].t++; if (r.passed) byDir[r.dir].p++; });
  const byPos = {}; rs.forEach(r => { const d = r.pos || 'Boshqa'; if (!byPos[d]) byPos[d] = 0; byPos[d]++; });
  const posTop = Object.entries(byPos).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const best10 = [...rs].sort((a, b) => b.pct - a.pct || b.correct - a.correct).slice(0, 10);
  const worst10 = [...rs].sort((a, b) => a.pct - b.pct || a.correct - b.correct).slice(0, 10);
  $('adminContent').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:13px;margin-bottom:20px;">
      ${[['📝', 'Jami imtihonlar', total, '#1e6fc0'], ['✅', "O'tdi", passed, '#22c55e'], ['❌', 'Yiqildi', failed, '#ef4444'], ['📈', "O'rt. ball", avg + '%', '#f59e0b']].map(([ic, l, v, c]) => `
        <div class="stat-card" style="--c:${c};">
          <div style="font-size:22px;margin-bottom:7px;">${ic}</div>
          <div style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;">${v}</div>
          <div style="color:var(--text3);font-size:12px;margin-top:2px;">${l}</div>
        </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:15px;margin-bottom:18px;">
      <div class="card"><div class="stag">Yo'nalishlar</div><h3 style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:13px;">Natijalar tahlili</h3>
        <div style="max-height:190px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;">
          <table class="tbl"><thead><tr><th>Xo'jalik (Yo'nalish)</th><th style="text-align:center;">Jami</th><th style="text-align:center;">O'tdi</th><th style="text-align:center;">Yiqildi</th></tr></thead><tbody>
          ${Object.keys(byDir).length === 0 ? "<tr><td colspan=\"4\" style=\"text-align:center;color:var(--text3);padding:15px;\">Ma'lumot yo'q</td></tr>" : Object.entries(byDir).map(([dir, stat]) => `<tr>
            <td style="font-size:11px;color:var(--text2);">${dir}</td>
            <td style="text-align:center;"><strong style="color:var(--blue-light);">${stat.t}</strong></td>
            <td style="text-align:center;"><strong style="color:var(--green);">${stat.p}</strong></td>
            <td style="text-align:center;"><strong style="color:var(--red);">${stat.t - stat.p}</strong></td>
          </tr>`).join('')}
          </tbody></table>
        </div>
      </div>
      <div class="card"><div class="stag">Statistika</div><h3 style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:13px;">O'tish nisbati</h3><div style="height:170px;"><canvas id="pieChart"></canvas></div>
        <div style="display:flex;justify-content:center;gap:14px;margin-top:9px;font-size:12px;">
          <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:2px;background:#22c55e;"></div><span style="color:var(--text2);">O'tdi: <strong>${passed}</strong></span></div>
          <div style="display:flex;align-items:center;gap:5px;"><div style="width:10px;height:10px;border-radius:2px;background:#ef4444;"></div><span style="color:var(--text2);">Yiqildi: <strong>${failed}</strong></span></div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px;">
      <div class="card"><div class="stag">Reyting</div><h3 style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:11px;color:var(--green);">🏆 Top 10 Eng Yaxshi</h3>
        ${best10.length === 0 ? '<p style="color:var(--text3);">Hali natija yo\'q</p>' : `
        <table class="tbl"><thead><tr><th>#</th><th>F.I.Sh</th><th>Xo'jalik</th><th>Lavozim</th><th>Ball</th><th>Sana</th></tr></thead><tbody>
        ${best10.map((r, i) => `<tr>
          <td style="color:var(--text3);">${i + 1}</td>
          <td style="font-weight:500;">${r.name}</td>
          <td style="color:var(--text2);font-size:11px;">${r.dir || '—'}</td>
          <td style="color:var(--text2);font-size:11px;">${r.pos || '—'}</td>
          <td><strong style="color:var(--green);">${r.pct}%</strong></td>
          <td style="color:var(--text3);font-size:11px;">${r.date.split(',')[0]}</td>
        </tr>`).join('')}</tbody></table>`}
      </div>
      <div class="card"><div class="stag">Reyting</div><h3 style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:11px;color:var(--red);">📉 Top 10 Eng Yomon</h3>
        ${worst10.length === 0 ? '<p style="color:var(--text3);">Hali natija yo\'q</p>' : `
        <table class="tbl"><thead><tr><th>#</th><th>F.I.Sh</th><th>Xo'jalik</th><th>Lavozim</th><th>Ball</th><th>Sana</th></tr></thead><tbody>
        ${worst10.map((r, i) => `<tr>
          <td style="color:var(--text3);">${i + 1}</td>
          <td style="font-weight:500;">${r.name}</td>
          <td style="color:var(--text2);font-size:11px;">${r.dir || '—'}</td>
          <td style="color:var(--text2);font-size:11px;">${r.pos || '—'}</td>
          <td><strong style="color:var(--red);">${r.pct}%</strong></td>
          <td style="color:var(--text3);font-size:11px;">${r.date.split(',')[0]}</td>
        </tr>`).join('')}</tbody></table>`}
      </div>
    </div>
    </div>`;
  requestAnimationFrame(() => {
    const pc = $('pieChart');
    if (pc) {
      if (S.charts.pie) S.charts.pie.destroy();
      S.charts.pie = new Chart(pc, { type: 'doughnut', data: { labels: ["O'tdi", "Yiqildi"], datasets: [{ data: [passed, failed], backgroundColor: ['rgba(34,197,94,.8)', 'rgba(239,68,68,.8)'], borderColor: ['#22c55e', '#ef4444'], borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '62%' } });
    }
    if (activeId) {
      setTimeout(() => {
        const el = document.getElementById(activeId);
        if (el) {
          el.focus();
          if (typeof cursorStart === 'number' && el.setSelectionRange) {
            el.setSelectionRange(cursorStart, cursorStart);
          }
        }
      }, 10);
    }
  });
}

function renderResults() {
  const activeId = document.activeElement ? document.activeElement.id : null;
  const cursorStart = document.activeElement ? document.activeElement.selectionStart : null;
  let rs = [...S.results];
  if (S.filterDir) rs = rs.filter(r => r.dir === S.filterDir);
  if (S.filterDept) rs = rs.filter(r => r.name && r.name.toLowerCase().includes(S.filterDept.toLowerCase()));
  if (S.filterStatus === 'passed') rs = rs.filter(r => r.passed);
  if (S.filterStatus === 'failed') rs = rs.filter(r => !r.passed);

  // Yo'nalishlar ro'yxatini natijalardan olish (Supabase dan)
  const dirs = [...new Set(S.results.map(r => r.dir))].filter(d => d);

  $('adminContent').innerHTML = `
    <div class="card" style="margin-bottom:13px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:9px;margin-bottom:11px;">
        <span style="color:var(--text3);font-size:13px;">Jami: <strong style="color:var(--text);">${rs.length}</strong> (Supabase dan)</span>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="refreshResults()">🔄 Yangilash</button>
        </div>
      </div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;">
        <select class="filter-inp" onchange="S.filterDir=this.value;renderResults()">
          <option value="">— Yo'nalish —</option>
          ${dirs.map(d => `<option value="${d}" ${S.filterDir === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <input id="filterNameP1" class="filter-inp" type="text" placeholder="F.I.Sh qidirish..." value="${S.filterDept}" oninput="S.filterDept=this.value;renderResults()"/>
        <select class="filter-inp" onchange="S.filterStatus=this.value;renderResults()">
          <option value="">— Holat —</option>
          <option value="passed" ${S.filterStatus === 'passed' ? 'selected' : ''}>✅ O'tdi</option>
          <option value="failed" ${S.filterStatus === 'failed' ? 'selected' : ''}>❌ Yiqildi</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="S.filterDir='';S.filterDept='';S.filterStatus='';renderResults()">✕</button>
      </div>
    </div>
    ${rs.length === 0 ? `<div class="card" style="text-align:center;padding:44px;"><div style="font-size:44px;margin-bottom:11px;">📭</div><p style="color:var(--text3);">Natijalar topilmadi</p></div>` : `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
      <div style="overflow-x:auto;">
        <table class="tbl"><thead><tr><th>#</th><th>F.I.Sh</th><th style="color:var(--blue-light);white-space:nowrap;">🪪 ID</th><th>JSHSHIR</th><th>Lavozim</th><th>Yo'nalish</th><th>Ball</th><th>Holat</th><th>Tab</th><th>Sana</th><th></th></tr></thead>
        <tbody>${rs.map((r, i) => {
    // Pseudo-random generator based on ID
    const seed = Number(r.id) || i;
    let x = Math.sin(seed) * 10000;
    let randomFract = x - Math.floor(x);
    // Agar r.userId bo'lsa undan foydalanamiz, aks holda seed dan generatsiya qilamiz
    const empId = r.userId ? String(r.userId).padStart(6, '0') : String(Math.floor(100000 + randomFract * 900000));
    return `<tr>
          <td style="color:var(--text3);">${i + 1}</td>
          <td><div style="display:flex;align-items:center;gap:7px;">
            ${r.photo ? `<img src="${r.photo}" onclick="showPhotoModal('${r.photo}','${(r.name || '').replace(/'/g, '\\&apos;')}')" style="width:30px;height:30px;border-radius:50%;object-fit:cover;cursor:pointer;border:2px solid var(--blue-light);transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='scale(1.15)';this.style.boxShadow='0 0 10px rgba(96,165,250,.7)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">` : `<div style="width:30px;height:30px;border-radius:50%;background:#1e4d8c;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;cursor:pointer;" onclick="showPhotoModal('','${(r.name || '').replace(/'/g, '\\&apos;')}')"><span>${r.name?.[0] || '?'}</span></div>`}
            <span style="font-weight:500;">${r.name || '—'}</span></div></td>
          <td><span style="font-family:monospace;font-size:12px;font-weight:700;color:var(--blue-light);background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);border-radius:6px;padding:2px 8px;letter-spacing:1px;">${empId}</span></td>
          <td style="color:var(--text3);font-size:11px;">${r.jshir || '—'}</td>
          <td style="color:var(--text2);">${r.pos || '—'}</td>
          <td><span style="font-size:11px;background:rgba(30,111,192,.1);color:var(--blue-light);padding:2px 7px;border-radius:5px;">${r.dir || '—'}</span></td>
          <td><strong style="color:${r.passed ? 'var(--green)' : 'var(--red)'};">${r.pct}%</strong><div style="font-size:11px;color:var(--text3);">${r.correct}/${r.total}</div></td>
          <td><span class="badge ${r.passed ? 'badge-green' : 'badge-red'}">${r.passed ? "✓ O'tdi" : '✗ Yiqildi'}</span></td>
          <td>${r.tabs > 0 ? `<span style="color:var(--amber);">⚠️${r.tabs}</span>` : '—'}</td>
          <td style="color:var(--text3);font-size:11px;white-space:nowrap;">${r.date}</td>
          <td style="white-space:nowrap;"><button class="btn btn-secondary btn-sm" onclick="showDetail(${r.id})" style="padding:4px 9px;font-size:11px;">👁</button> <button class="btn btn-sm" onclick="downloadPDF(${r.id})" style="padding:4px 9px;font-size:11px;background:rgba(30,111,192,.1);color:var(--blue-light);border:1px solid rgba(30,111,192,.3);">🖨️</button> <button class="btn btn-sm" onclick="deleteResult(${r.id})" style="padding:4px 9px;font-size:11px;background:rgba(239,68,68,.1);color:var(--red);border:1px solid rgba(239,68,68,.3);margin-left:4px;">🗑</button></td>
        </tr>`;
  }).join('')}</tbody></table>
      </div>
    </div>`}`;

  if (activeId) {
    setTimeout(() => {
      const el = document.getElementById(activeId);
      if (el) {
        el.focus();
        if (typeof cursorStart === 'number' && el.setSelectionRange) {
          el.setSelectionRange(cursorStart, cursorStart);
        }
      }
    }, 10);
  }
}

// ===== RASM KATTA KO'RISH MODALI =====
function showPhotoModal(src, name) {
  const el = document.createElement('div');
  el.className = 'modal-overlay';
  el.style.cssText = 'display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:9999;';
  el.innerHTML = `
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:14px;animation:fadeUp .25s ease;">
      <button onclick="this.closest('.modal-overlay').remove()" style="position:absolute;top:-44px;right:-12px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);color:#fff;font-size:20px;cursor:pointer;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;transition:background .2s;" onmouseover="this.style.background='rgba(239,68,68,.4)'" onmouseout="this.style.background='rgba(255,255,255,.1)'">✕</button>
      ${src ? `<img src="${src}" style="max-width:88vw;max-height:78vh;border-radius:16px;object-fit:contain;box-shadow:0 20px 60px rgba(0,0,0,.7);border:2px solid rgba(96,165,250,.4);">` : `<div style="width:180px;height:180px;border-radius:50%;background:linear-gradient(135deg,#1e4d8c,#2563eb);display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:700;color:#fff;box-shadow:0 20px 60px rgba(0,0,0,.7);">${(name || '?')[0]}</div>`}
      ${name ? `<div style="color:#fff;font-family:'Syne',sans-serif;font-size:15px;font-weight:600;text-shadow:0 1px 6px rgba(0,0,0,.5);">👤 ${name}</div>` : ''}
    </div>`;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
}

// Natijalarni yangilash funksiyasi
async function refreshResults() {
  toast('🔄 Yangilanmoqda...', 'var(--blue)');
  const resultsData = await loadResultsFromSupabase();
  if (resultsData.success && resultsData.data.length > 0) {
    S.results = resultsData.data;
    renderResults();
    toast(`✅ ${resultsData.data.length} ta natija yangilandi`, 'var(--green)');
  } else {
    toast('⚠️ Natijalar topilmadi', 'var(--amber)');
  }
}

// ===== PHASE 2 RESULTS ADMIN PANEL =====
function renderPhase2Results() {
  const activeId = document.activeElement ? document.activeElement.id : null;
  const cursorStart = document.activeElement ? document.activeElement.selectionStart : null;
  const passedEmployees = S.results.filter(r => r.passed);

  let rs = [...passedEmployees];
  if (S.p2FilterDept) rs = rs.filter(r => r.name && r.name.toLowerCase().includes(S.p2FilterDept.toLowerCase()));

  if (S.p2FilterStatus === 'completed') {
    rs = rs.filter(emp => S.phase2ResultsList.some(p2 => p2.first_stage_result_id === emp.id));
  } else if (S.p2FilterStatus === 'pending') {
    rs = rs.filter(emp => !S.phase2ResultsList.some(p2 => p2.first_stage_result_id === emp.id));
  }

  $('adminContent').innerHTML = `
    <div class="card" style="margin-bottom:13px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:9px;margin-bottom:11px;">
        <span style="color:var(--text3);font-size:13px;">Jami: <strong style="color:var(--text);">${rs.length}</strong> (1-Etapdan o'tgan xodimlar)</span>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="refreshPhase2Results()">🔄 Yangilash</button>
        </div>
      </div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;">
        <input id="filterNameP2" class="filter-inp" type="text" placeholder="F.I.Sh qidirish..." value="${S.p2FilterDept}" oninput="S.p2FilterDept=this.value;renderPhase2Results()"/>
        <select class="filter-inp" onchange="S.p2FilterStatus=this.value;renderPhase2Results()">
          <option value="">— Barchasi —</option>
          <option value="completed" ${S.p2FilterStatus === 'completed' ? 'selected' : ''}>📋 Natijasi kiritilganlar</option>
          <option value="pending" ${S.p2FilterStatus === 'pending' ? 'selected' : ''}>⏳ Natijasi kiritilmaganlar</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="S.p2FilterDept='';S.p2FilterStatus='';renderPhase2Results()">✕</button>
      </div>
    </div>
    ${rs.length === 0 ? `<div class="card" style="text-align:center;padding:44px;"><div style="font-size:44px;margin-bottom:11px;">📭</div><p style="color:var(--text3);">Natijalar topilmadi</p></div>` : `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;">
      <div style="overflow-x:auto;">
        <table class="tbl"><thead><tr><th>#</th><th>F.I.Sh</th><th style="color:var(--blue-light);white-space:nowrap;">🪪 ID</th><th>JSHSHIR</th><th style="min-width:110px;">Ball (Foizda)</th><th>Holat</th><th style="min-width:180px;">Qog'ozdagi javob varag'i (Rasm/PDF)</th><th style="min-width:100px;">Sana</th><th style="min-width:100px;">Amal</th></tr></thead>
        <tbody>${rs.map((r, i) => {
    const seed = Number(r.id) || i;
    let x = Math.sin(seed) * 10000;
    let randomFract = x - Math.floor(x);
    const empId = r.userId ? String(r.userId).padStart(6, '0') : String(Math.floor(100000 + randomFract * 900000));

    const p2 = S.phase2ResultsList.find(p => p.first_stage_result_id === r.id);

    if (p2) {
      // Already graded
      return `<tr>
              <td style="color:var(--text3);">${i + 1}</td>
              <td><span style="font-weight:600;color:var(--text);">${r.name || '—'}</span></td>
              <td><span style="font-family:monospace;font-size:12px;font-weight:700;color:var(--blue-light);background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);border-radius:6px;padding:2px 8px;letter-spacing:1px;">${empId}</span></td>
              <td style="color:var(--text3);font-size:11px;">${r.jshir || '—'}</td>
              <td><strong style="font-size:15px;color:${p2.passed ? 'var(--green)' : 'var(--red)'};">${p2.percentage}%</strong></td>
              <td><span class="badge ${p2.passed ? 'badge-green' : 'badge-red'}">${p2.passed ? "✓ O'tdi" : '✗ O\'tmadi'}</span></td>
              <td style="color:var(--text3);font-size:12px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:180px;" title="${p2.attachment_name || ''}">📎 ${p2.attachment_name || 'Fayl biriktirilgan'}</td>
              <td style="color:var(--text3);font-size:11px;white-space:nowrap;">${p2.date.split(',')[0]}</td>
              <td style="white-space:nowrap;">
                <button class="btn btn-secondary btn-sm" onclick="showPhase2Detail(${p2.id})" style="padding:4px 9px;font-size:11px;" title="Ko'rish">👁 Ko'rish</button> 
              </td>
            </tr>`;
    } else {
      // Not graded yet (Inline Inputs)
      return `<tr>
              <td style="color:var(--text3);">${i + 1}</td>
              <td><span style="font-weight:500;">${r.name || '—'}</span></td>
              <td><span style="font-family:monospace;font-size:12px;font-weight:700;color:var(--blue-light);background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.25);border-radius:6px;padding:2px 8px;letter-spacing:1px;">${empId}</span></td>
              <td style="color:var(--text3);font-size:11px;">${r.jshir || '—'}</td>
              <td>
                <input type="number" id="p2-score-${r.id}" class="filter-inp" placeholder="0-100" min="0" max="100" style="width:74px;background:var(--surface);border-color:var(--border);padding:4px 6px;text-align:center;font-weight:700;" oninput="updateRowStatusDisplay(${r.id})" />
              </td>
              <td>
                <span id="p2-status-lbl-${r.id}" style="color:var(--text3);font-size:12px;font-weight:600;">—</span>
              </td>
              <td style="max-width:180px;">
                <label for="p2-file-${r.id}" class="btn btn-secondary btn-sm" style="padding:5px 9px; font-size:11px; cursor:pointer; max-width:170px; display:inline-block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;" title="Fayl tanlash">📁 Fayl tanlash</label>
                <input type="file" id="p2-file-${r.id}" style="display:none;" accept="image/*,application/pdf" onchange="const lbl=this.previousElementSibling; if(this.files[0]) { lbl.textContent=this.files[0].name; lbl.classList.add('btn-primary'); lbl.classList.remove('btn-secondary'); } else { lbl.textContent='📁 Fayl tanlash'; lbl.classList.remove('btn-primary'); lbl.classList.add('btn-secondary'); }" />
              </td>
              <td style="color:var(--text3);font-size:11px;">—</td>
              <td>
                <button class="btn btn-green btn-sm" onclick="saveRowPhase2Result(${r.id})" style="padding:5px 12px;font-size:11px;font-weight:600;">💾 Saqlash</button>
              </td>
            </tr>`;
    }
  }).join('')}</tbody></table>
      </div>
    </div>`}`;

  requestAnimationFrame(() => {
    if (activeId) {
      setTimeout(() => {
        const el = document.getElementById(activeId);
        if (el) {
          el.focus();
          if (typeof cursorStart === 'number' && el.setSelectionRange) {
            el.setSelectionRange(cursorStart, cursorStart);
          }
        }
      }, 10);
    }
  });
}

function updateRowStatusDisplay(empId) {
  const input = $('p2-score-' + empId);
  const lbl = $('p2-status-lbl-' + empId);
  if (!input || !lbl) return;
  const val = parseInt(input.value);
  if (!isNaN(val) && val >= 0 && val <= 100) {
    if (val >= 71) {
      lbl.textContent = "O'tdi";
      lbl.style.color = "var(--green)";
    } else {
      lbl.textContent = "O'tmadi";
      lbl.style.color = "var(--red)";
    }
  } else {
    lbl.textContent = "—";
    lbl.style.color = "var(--text3)";
  }
}

async function saveRowPhase2Result(empId) {
  const scoreInput = $('p2-score-' + empId);
  const fileInput = $('p2-file-' + empId);

  if (!scoreInput || !fileInput) return;

  const pct = parseInt(scoreInput.value);
  if (isNaN(pct) || pct < 0 || pct > 100) {
    alert("Natija foizini kiritishingiz shart (0 dan 100 gacha)!");
    return;
  }

  const file = fileInput.files[0];
  if (!file) {
    alert("Javob varag'i faylini (Rasm yoki PDF) tanlashingiz shart!");
    return;
  }

  const emp = S.results.find(r => r.id === empId);
  if (!emp) return;

  const saveBtn = scoreInput.closest('tr').querySelector('button');
  const originalHTML = saveBtn.innerHTML;
  saveBtn.disabled = true;
  saveBtn.innerHTML = `Kutilmoqda...`;

  try {
    const fileBase64 = await fileToBase64(file);
    const passed = pct >= 71;

    const resultData = {
      name: emp.name,
      jshir: emp.jshir,
      user_id: emp.user_id || null,
      first_stage_result_id: emp.id,
      percentage: pct,
      passed: passed,
      attachment_data: fileBase64,
      attachment_name: file.name
    };

    if (window.savePhase2ResultToSupabase) {
      const res = await savePhase2ResultToSupabase(resultData);
      if (res.success && res.data) {
        toast("✅ 2-bosqich natijasi saqlandi", "var(--green)");

        if (window.loadPhase2ResultsFromSupabase) {
          const p2Res = await loadPhase2ResultsFromSupabase();
          if (p2Res.success && p2Res.data) {
            S.phase2ResultsList = p2Res.data;
            renderPhase2Results();
          }
        }
      } else {
        alert("Saqlashda xato yuz berdi: " + (res.error || "noma'lum xato"));
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHTML;
      }
    }
  } catch (err) {
    console.error(err);
    alert("Faylni o'qishda xato: " + err.message);
    saveBtn.disabled = false;
    saveBtn.innerHTML = originalHTML;
  }
}

async function refreshPhase2Results() {
  toast('🔄 Yangilanmoqda...', 'var(--blue)');
  const p2Data = await loadPhase2ResultsFromSupabase();
  if (p2Data.success && p2Data.data) {
    S.phase2ResultsList = p2Data.data;
    renderPhase2Results();
    toast(`✅ ${p2Data.data.length} ta natija yangilandi`, 'var(--green)');
  } else {
    toast('⚠️ Natijalar topilmadi', 'var(--amber)');
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function showPhase2Detail(id) {
  const r = S.phase2ResultsList.find(x => x.id === id);
  if (!r) return;

  const seed = Number(r.first_stage_result_id) || 0;
  let x = Math.sin(seed) * 10000;
  let randomFract = x - Math.floor(x);
  const empId = String(Math.floor(100000 + randomFract * 900000));

  const el = document.createElement('div');
  el.className = 'modal-overlay';
  el.style.cssText = 'display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);backdrop-filter:blur(12px);z-index:9999;';

  let attachmentHTML = '';
  if (r.attachment_data) {
    const isImage = r.attachment_data.startsWith('data:image/');
    if (isImage) {
      attachmentHTML = `
        <div style="margin-top:15px;text-align:center;">
          <div style="color:var(--text3);font-size:12px;margin-bottom:8px;">Javob varag'i (Rasm):</div>
          <img src="${r.attachment_data}" style="max-width:100%;max-height:350px;border-radius:10px;border:1px solid var(--border);cursor:pointer;object-fit:contain;" onclick="showPhotoModal('${r.attachment_data}','${(r.name || '').replace(/'/g, '\\&apos;')}')" />
          <div style="margin-top:10px;">
            <a href="${r.attachment_data}" download="${r.attachment_name || 'javob_varaq.jpg'}" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;">💾 Yuklab olish</a>
          </div>
        </div>
      `;
    } else {
      attachmentHTML = `
        <div style="margin-top:20px;padding:15px;background:var(--surface);border:1px solid var(--border);border-radius:10px;text-align:center;">
          <div style="font-size:36px;margin-bottom:10px;">📄</div>
          <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px;">Javob varag'i (PDF)</div>
          <div style="font-size:12px;color:var(--text3);margin-bottom:15px;">Fayl nomi: ${r.attachment_name || 'javob_varaq.pdf'}</div>
          <div>
            <a href="${r.attachment_data}" download="${r.attachment_name || 'javob_varaq.pdf'}" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;padding:8px 16px;">📥 PDF Faylni Yuklab Olish</a>
          </div>
        </div>
      `;
    }
  } else {
    attachmentHTML = `<div style="margin-top:15px;color:var(--text3);font-size:13px;text-align:center;padding:15px;">Javob varag'i biriktirilmagan.</div>`;
  }

  el.innerHTML = `
    <div class="modal" style="max-width:600px;width:92%;max-height:90vh;overflow-y:auto;background:var(--surface2);border:1px solid var(--border);border-radius:18px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.6);animation:fadeUp .25s ease;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px;">
        <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:18px;margin:0;">2-Bosqich Natija Batafsil</h3>
        <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;color:var(--text3);font-size:22px;cursor:pointer;">✕</button>
      </div>
      
      <div style="padding:15px;background:var(--surface);border-radius:12px;border:1px solid var(--border);margin-bottom:15px;display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:15px;font-weight:700;color:var(--text);">👤 ${r.name}</div>
        <div style="font-size:13px;color:var(--text2);">🪪 ID raqam: <strong style="color:var(--blue-light);font-family:monospace;">${empId}</strong></div>
        <div style="font-size:13px;color:var(--text2);">📂 JSHSHIR: ${r.jshir || '—'}</div>
        <div style="font-size:13px;color:var(--text2);">📅 Sana: ${r.date}</div>
        <div style="margin-top:5px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:14px;font-weight:600;color:var(--text);">Natija: <strong style="color:${r.passed ? 'var(--green)' : 'var(--red)'};">${r.percentage}%</strong></span>
          <span class="badge ${r.passed ? 'badge-green' : 'badge-red'}">${r.passed ? "O'tdi" : "O'tmadi"}</span>
        </div>
      </div>
      
      ${attachmentHTML}
    </div>
  `;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
}

async function deletePhase2Result(id) {
  if (confirm("Ushbu 2-bosqich natijasini o'chirishni tasdiqlaysizmi?")) {
    toast("🗑 O'chirilmoqda...", "var(--blue)");
    if (window.deletePhase2ResultFromSupabase) {
      const res = await deletePhase2ResultFromSupabase(id);
      if (res.success) {
        toast("✅ Natija o'chirildi", "var(--green)");
        S.phase2ResultsList = S.phase2ResultsList.filter(r => r.id !== id);
        renderPhase2Results();
      } else {
        alert("O'chirishda xatolik yuz berdi: " + (res.error || "noma'lum xato"));
      }
    }
  }
}

function showDetail(id) {
  const r = S.results.find(x => x.id === id); if (!r) return;
  const el = document.createElement('div'); el.className = 'modal-overlay';
  el.innerHTML = `<div class="modal" style="max-width:850px;width:92%;max-height:90vh;overflow-y:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;">Natija tafsiloti</h3>
      <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;">✕</button>
    </div>
    <div style="display:flex;gap:13px;margin-bottom:14px;padding:13px;background:var(--surface2);border-radius:11px;">
      ${r.photo ? `<img src="${r.photo}" style="width:58px;height:58px;border-radius:10px;object-fit:cover;">` : `<div style="width:58px;height:58px;border-radius:10px;background:#1e4d8c;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;">${r.name?.[0] || '?'}</div>`}
      <div><div style="font-family:'Syne',sans-serif;font-size:15px;font-weight:700;">${r.name}</div>
      <div style="color:var(--text2);font-size:13px;">${r.pos}</div>
      <div style="font-size:12px;color:var(--text3);">JSHSHIR: ${r.jshir || '—'} | Tel: ${r.phone}</div>
      <span class="badge ${r.passed ? 'badge-green' : 'badge-red'}" style="margin-top:5px;">${r.pct}% · ${r.passed ? "O'tdi" : 'Yiqildi'}</span></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:13px;">
      <div style="text-align:center;padding:10px;background:rgba(34,197,94,.08);border-radius:9px;"><div style="font-size:20px;font-weight:800;color:var(--green);">${r.correct}</div><div style="font-size:11px;color:var(--text3);">To'g'ri</div></div>
      <div style="text-align:center;padding:10px;background:rgba(239,68,68,.08);border-radius:9px;"><div style="font-size:20px;font-weight:800;color:var(--red);">${r.wrong}</div><div style="font-size:11px;color:var(--text3);">Noto'g'ri</div></div>
      <div style="text-align:center;padding:10px;background:rgba(30,111,192,.08);border-radius:9px;"><div style="font-size:20px;font-weight:800;color:var(--blue-light);">${r.total}</div><div style="font-size:11px;color:var(--text3);">Jami</div></div>
    </div>
    <div style="max-height:480px;overflow-y:auto;border:1px solid var(--border);border-radius:10px;">
      ${r.detailed.map((d, i) => {
    const userText = d.opts && d.userAns && d.opts[d.userAns] ? `) ${d.opts[d.userAns]}` : '';
    const correctText = d.opts && d.correctAns && d.opts[d.correctAns] ? `) ${d.opts[d.correctAns]}` : '';
    return `<div style="padding:12px 14px;border-bottom:1px solid var(--border);display:flex;gap:10px;align-items:start;">
          <span style="width:20px;height:20px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;background:${d.ok ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.15)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">${d.ok ? '✓' : '✗'}</span>
          <div style="font-size:12px;flex:1;min-width:0;">
            <p style="margin-bottom:6px;font-weight:500;line-height:1.4;">${i + 1}. ${d.q}</p>
            <div style="display:flex;flex-direction:column;gap:5px;">
              <div style="padding:5px 10px;border-radius:6px;background:${d.ok ? 'rgba(34,197,94,.08)' : 'rgba(239,68,68,.08)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};font-size:12px;line-height:1.4;">
                Siz: <strong>${d.userAns || '—'}</strong>${userText}
              </div>
              ${!d.ok ? `
              <div style="padding:5px 10px;border-radius:6px;background:rgba(34,197,94,.08);color:var(--green);font-size:12px;line-height:1.4;">
                To'g'ri: <strong>${d.correctAns}</strong>${correctText}
              </div>` : ''}
            </div>
          </div>
        </div>`;
  }).join('')}
    </div>
    <div style="margin-top:13px;">
      <button class="btn btn-primary" onclick="downloadPDF(${r.id})" style="width:100%;font-size:14px;padding:11px;display:flex;align-items:center;justify-content:center;gap:8px;">🖨️ PDF Yuklab olish (A4)</button>
    </div>
  </div>`;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
}

// ===== PDF GENERATSIYA (A4) =====
function downloadPDF(id) {
  const r = S.results.find(x => x.id === id); if (!r) return;
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) { toast('Popup bloklangan! Ruxsat bering.', 'var(--red)'); return; }
  const sc = r.passed ? '#16a34a' : '#dc2626';
  const sb = r.passed ? '#dcfce7' : '#fee2e2';
  const st = r.passed ? "✓ O'TGAN" : '✗ YIQILGAN';
  const ph = r.photo
    ? `<img src="${r.photo}" style="width:72px;height:72px;border-radius:8px;object-fit:cover;border:2px solid #e5e7eb;">`
    : `<div style="width:72px;height:72px;border-radius:8px;background:#dbeafe;border:2px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#1e40af;">${(r.name || '?')[0]}</div>`;
  // 2-ustunli savol jadvali
  let qRows = '';
  for (let i = 0; i < r.detailed.length; i += 2) {
    const buildCell = (d, idx) => {
      if (!d) return '<td style="border:1px solid #e5e7eb;padding:3px 5px;width:50%;"></td>';
      const ok = d.ok; const ic = ok ? '#16a34a' : '#dc2626'; const bg = ok ? '#f0fdf4' : '#fff1f2';
      const qTxt = (d.q || '').length > 82 ? d.q.substring(0, 82) + '…' : (d.q || '');
      const ans = ok
        ? `<b style="color:#16a34a">${d.userAns || '—'}</b>`
        : `<b style="color:#dc2626">${d.userAns || '—'}</b> → <b style="color:#16a34a">${d.correctAns}</b>`;
      return `<td style="border:1px solid #e5e7eb;padding:3px 6px;background:${bg};vertical-align:top;width:50%;font-size:9px;line-height:1.35;">
            <span style="color:${ic};font-weight:700;">${ok ? '✓' : '✗'}</span> <b>${idx + 1}.</b> ${qTxt}<br>${ans}</td>`;
    };
    qRows += `<tr>${buildCell(r.detailed[i], i)}${buildCell(r.detailed[i + 1], i + 1)}</tr>`;
  }
  const html = `<!DOCTYPE html><html lang="uz"><head><meta charset="UTF-8">
<title>RailExam - ${r.name}</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:Arial,sans-serif;font-size:10px;color:#111827;background:#fff;}
@page{size:A4 portrait;margin:8mm 10mm;}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}.no-print{display:none!important;}}
.hdr{display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #1e3a8a;padding-bottom:7px;margin-bottom:7px;}
.logo{width:38px;height:38px;background:#1e3a8a;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;font-weight:900;}
.info{display:flex;gap:9px;align-items:flex-start;padding:6px 9px;border:1.5px solid #e5e7eb;border-radius:8px;background:#f9fafb;margin-bottom:7px;}
.itbl{flex:1;border-collapse:collapse;}
.itbl td{padding:1.5px 4px;font-size:9.5px;}
.lbl{color:#6b7280;width:85px;}
.val{font-weight:600;}
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;color:${sc};background:${sb};border:1.5px solid ${sc};}
.stats{display:flex;gap:5px;margin-bottom:7px;}
.sbox{flex:1;text-align:center;padding:4px 3px;border-radius:6px;border:1px solid #e5e7eb;}
.snum{font-size:16px;font-weight:800;}
.slbl{font-size:7.5px;color:#6b7280;margin-top:1px;}
.stit{font-size:9.5px;font-weight:700;color:#1e3a8a;margin-bottom:3px;padding:2px 7px;background:#eff6ff;border-left:3px solid #1e3a8a;}
.qt{width:100%;border-collapse:collapse;}
.signs{display:flex;justify-content:space-between;margin-top:9px;}
.sbox2{text-align:center;font-size:8.5px;color:#374151;}
.sln{width:110px;border-top:1px solid #374151;margin:16px auto 2px;}
.ftr{margin-top:7px;padding-top:5px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:7.5px;color:#9ca3af;}
.pbtn{position:fixed;bottom:18px;right:18px;background:#1e3a8a;color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:13px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3);}
</style></head><body>
<button class="pbtn no-print" onclick="window.print()">🖨️ Chop etish</button>
<div class="hdr">
  <div style="display:flex;align-items:center;gap:8px;">
    <div class="logo">🚄</div>
    <div><div style="font-size:12px;font-weight:700;color:#1e3a8a;">O'ZBEKISTON TEMIR YO'LLARI</div>
    <div style="font-size:8.5px;color:#6b7280;">RailExam — Bilimlarni Baholash Tizimi</div></div>
  </div>
  <div style="text-align:right;font-size:8.5px;color:#6b7280;">
    <div style="font-weight:700;font-size:10.5px;color:#1e3a8a;">IMTIHON NATIJASI</div>
    <div>Sana: ${r.date}</div><div>ID: ${r.id}</div>
  </div>
</div>
<div class="info">
  ${ph}
  <table class="itbl">
    <tr><td class="lbl">F.I.Sh:</td><td class="val" style="font-size:11px;">${r.name || '—'}</td></tr>
    <tr><td class="lbl">Lavozim:</td><td class="val">${r.pos || '—'}</td></tr>
    <tr><td class="lbl">JSHSHIR:</td><td class="val" style="letter-spacing:1px;">${r.jshir || '—'}</td></tr>
    <tr><td class="lbl">Telefon:</td><td class="val">${r.phone || '—'}</td></tr>
    <tr><td class="lbl">Yo'nalish:</td><td class="val">${translateDirection(r.dir) || '—'}</td></tr>
  </table>
  <div style="text-align:center;min-width:75px;">
    <div class="badge">${st}</div>
    <div style="margin-top:5px;font-size:20px;font-weight:800;color:${sc};">${r.pct}%</div>
    <div style="font-size:7.5px;color:#6b7280;">o'tish: 70%</div>
  </div>
</div>
<div class="stats">
  <div class="sbox" style="border-color:#bbf7d0;background:#f0fdf4;"><div class="snum" style="color:#16a34a;">${r.correct}</div><div class="slbl">✓ To'g'ri</div></div>
  <div class="sbox" style="border-color:#fecaca;background:#fff1f2;"><div class="snum" style="color:#dc2626;">${r.wrong}</div><div class="slbl">✗ Noto'g'ri</div></div>
  <div class="sbox" style="border-color:#bfdbfe;background:#eff6ff;"><div class="snum" style="color:#1e3a8a;">${r.total}</div><div class="slbl">📋 Jami</div></div>
  <div class="sbox" style="border-color:#e5e7eb;background:#f9fafb;"><div class="snum" style="color:#374151;">${Math.floor(r.duration / 60)}m${r.duration % 60}s</div><div class="slbl">⏱ Vaqt</div></div>
  ${r.tabs > 0 ? `<div class="sbox" style="border-color:#fed7aa;background:#fff7ed;"><div class="snum" style="color:#ea580c;">${r.tabs}</div><div class="slbl">⚠️ Tab</div></div>` : ''}
</div>
<div class="stit">SAVOL VA JAVOBLAR (${r.detailed.length} ta savol · ✓ To'g'ri · ✗ Noto'g'ri → To'g'ri javob)</div>
<table class="qt"><tbody>${qRows}</tbody></table>
<div class="signs">
  <div class="sbox2"><div class="sln"></div>Imtihon topshiruvchi</div>
  <div class="sbox2"><div class="sln"></div>Mas'ul xodim</div>
  <div class="sbox2"><div class="sln"></div>Muhr / Print</div>
</div>
<div class="ftr">
  <span>RailExam © O'zbekiston Temir Yo'llari</span>
  <span>Avtomatik yaratilgan: ${new Date().toLocaleString('uz-UZ')}</span>
</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 700);
}

function clearResults() {
  if (confirm('Barcha natijalarni o\'chirish? Bu amalni bekor qilib bo\'lmaydi!')) {
    S.results = []; localStorage.removeItem('re_results');
    syncResultsToFile();
    renderResults(); toast("O'chirildi", 'var(--red)');
  }
}

async function deleteResult(id) {
  if (confirm("Ushbu natijani o'chirishni xohlaysizmi?")) {
    // LocalStorage dan o'chirish
    S.results = S.results.filter(r => r.id !== id);
    localStorage.setItem('re_results', JSON.stringify(S.results));

    // Supabase dan o'chirish
    if (window.deleteResultFromSupabase) {
      try {
        const result = await deleteResultFromSupabase(id);
        if (result.success) {
          console.log('✅ Natija Supabase dan o\'chirildi');
        }
      } catch (error) {
        console.error('❌ Supabase dan o\'chirishda xato:', error);
      }
    }

    syncResultsToFile();
    renderResults();
    toast("Natija o'chirildi", 'var(--red)');
  }
}

function renderQuestions() {
  let qs = [...S.questions];
  if (S.qFilterDir) qs = qs.filter(q => q.dir === S.qFilterDir);
  const dirs = [...new Set(S.questions.map(q => q.dir))];
  const perPage = 15, total = qs.length, pages = Math.ceil(total / perPage);
  const paged = qs.slice((S.qPage - 1) * perPage, S.qPage * perPage);
  $('adminContent').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:9px;margin-bottom:13px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <select class="filter-inp" onchange="S.qFilterDir=this.value;S.qPage=1;renderQuestions()">
          <option value="">— Barcha yo'nalishlar —</option>
          ${dirs.map(d => `<option value="${d}" ${S.qFilterDir === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <span style="color:var(--text3);font-size:13px;">Jami: <strong style="color:var(--text);">${total}</strong></span>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-secondary btn-sm" onclick="showAddDirection()">+ Yo'nalish qo'shish</button>
        <button class="btn btn-primary btn-sm" onclick="showAddQ(null)">+ Savol qo'shish</button>
      </div>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:13px;overflow:hidden;margin-bottom:13px;">
      <div style="overflow-x:auto;">
        <table class="tbl"><thead><tr><th>#</th><th>Yo'nalish</th><th>Savol</th><th>To'g'ri</th><th>Amal</th></tr></thead>
        <tbody>${paged.map((q, i) => `<tr>
          <td style="color:var(--text3);">${(S.qPage - 1) * perPage + i + 1}</td>
          <td><span style="font-size:11px;background:rgba(30,111,192,.1);color:var(--blue-light);padding:2px 7px;border-radius:5px;white-space:nowrap;">${q.dir}</span></td>
          <td style="max-width:230px;"><p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;">${q.q}</p></td>
          <td><span style="width:27px;height:27px;background:rgba(34,197,94,.1);border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--green);">${q.ans}</span></td>
          <td><div style="display:flex;gap:4px;">
            <button class="btn btn-secondary btn-sm" onclick="showAddQ(${q.id})" style="padding:4px 8px;font-size:11px;">✏️</button>
            <button class="btn btn-sm" onclick="deleteQ(${q.id})" style="padding:4px 8px;font-size:11px;background:rgba(239,68,68,.1);color:var(--red);border:1px solid rgba(239,68,68,.2);">🗑</button>
          </div></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    ${pages > 1 ? `<div style="display:flex;gap:5px;justify-content:center;flex-wrap:wrap;">
      ${Array.from({ length: pages }, (_, i) => `<button onclick="S.qPage=${i + 1};renderQuestions()" style="width:32px;height:32px;border-radius:7px;font-size:12px;font-weight:700;border:1px solid var(--border);background:${S.qPage === i + 1 ? 'var(--blue)' : 'var(--surface2)'};color:${S.qPage === i + 1 ? 'white' : 'var(--text2)'};cursor:pointer;">${i + 1}</button>`).join('')}
    </div>`: ''}`;
}

function showAddQ(editId) {
  const q = editId ? S.questions.find(x => x.id === editId) : null;
  // Build the department list from SUBDIRS keys
  const deptKeys = Object.keys(SUBDIRS);
  // Also collect any custom dirs from questions that are not in SUBDIRS
  const existingDirs = [...new Set(S.questions.map(q => q.dir))];
  const customDirs = existingDirs.filter(d => !deptKeys.includes(d) && !Object.values(SUBDIRS).flat().includes(d));

  // Determine current selection for edit mode
  const curDir = q ? q.dir : '';
  // Check if curDir is a sub-direction or a dept-level dir
  let curDept = '', curSubdir = '';
  for (const [dept, subs] of Object.entries(SUBDIRS)) {
    if (dept === curDir) { curDept = dept; curSubdir = ''; break; }
    if (subs.includes(curDir)) { curDept = dept; curSubdir = curDir; break; }
  }
  if (!curDept && customDirs.includes(curDir)) curDept = '__custom__';

  const el = document.createElement('div'); el.className = 'modal-overlay';
  el.innerHTML = `<div class="modal" style="max-width:560px;max-height:92vh;overflow-y:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;">${q ? 'Tahrirlash' : 'Yangi savol'}</h3>
      <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:11px;">
      <div>
        <label class="lbl">Xo'jalik (Bo'lim) *</label>
        <select class="inp" id="qd-dept" onchange="adminUpdateSubdirList(this.value,'${curSubdir}')">
          <option value="">— Xo'jalikni tanlang —</option>
          ${deptKeys.map(d => `<option value="${d}" ${curDept === d ? 'selected' : ''}>${d}</option>`).join('')}
          ${customDirs.map(d => `<option value="__custom__:${d}" ${curDept === '__custom__' && curDir === d ? 'selected' : ''}>${d}</option>`).join('')}
          <option value="__new__">+ Yangi xo'jalik/yo'nalish</option>
        </select>
      </div>
      <div id="qd-subdir-wrap" style="display:${curDept && SUBDIRS[curDept] && SUBDIRS[curDept].length > 0 ? 'block' : 'none'}">
        <label class="lbl">Yo'nalish (Mutaxassislik) *</label>
        <select class="inp" id="qd-subdir">
          <option value="">— Yo'nalishni tanlang —</option>
          ${curDept && SUBDIRS[curDept] ? SUBDIRS[curDept].map(s => `<option value="${s}" ${curSubdir === s ? 'selected' : ''}>${s}</option>`).join('') : ''}
        </select>
      </div>
      <div id="ndw" style="display:${curDept === '' ? 'none' : (deptKeys.includes(curDept) ? 'none' : 'block')}">
        <label class="lbl">Yangi yo'nalish nomi *</label>
        <input class="inp" id="qd-newdir" placeholder="Yangi yo'nalish nomi..." value="${curDept === '__custom__' ? curDir : ''}"/>
      </div>
      <div><label class="lbl">Savol matni *</label><textarea class="inp" id="qd-q" rows="3" style="resize:vertical;">${q?.q || ''}</textarea></div>
      <div>
        <label class="lbl">Rasm yuklash (ixtiyoriy)</label>
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="file" class="inp" id="qd-image" accept="image/*" onchange="handleImageUpload(event)" style="padding: 5px; flex:1;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="removeImage()" style="display:${q?.image ? 'block' : 'none'};" id="qd-img-remove">O'chirish</button>
        </div>
        <img id="qd-img-preview" src="${q?.image || ''}" style="max-width:100%; max-height:150px; margin-top:10px; border-radius:8px; display:${q?.image ? 'block' : 'none'};">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
        ${['A', 'B', 'C', 'D'].map(k => `<div><label class="lbl">${k} variant</label><input class="inp" id="qd-${k}" value="${q?.opts?.[k] || ''}"/></div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
        <div><label class="lbl">To'g'ri javob *</label><select class="inp" id="qd-ans">${['A', 'B', 'C', 'D'].map(k => `<option value="${k}" ${q?.ans === k ? 'selected' : ''}>${k}</option>`).join('')}</select></div>
        <div><label class="lbl">Qiyinlik</label><select class="inp" id="qd-dif"><option value="easy" ${q?.dif === 'easy' ? 'selected' : ''}>Oson</option><option value="medium" ${!q?.dif || q?.dif === 'medium' ? 'selected' : ''}>O'rta</option><option value="hard" ${q?.dif === 'hard' ? 'selected' : ''}>Qiyin</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:3px;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Bekor qilish</button>
        <button class="btn btn-primary" onclick="saveQ(${editId || 'null'})">💾 ${q ? 'Saqlash' : "Qo'shish"}</button>
      </div>
    </div>
  </div>`;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
  // Trigger subdir list if dept already selected
  if (curDept && SUBDIRS[curDept]) adminUpdateSubdirList(curDept, curSubdir);
}

function adminUpdateSubdirList(dept, preselect) {
  const subWrap = document.getElementById('qd-subdir-wrap');
  const subSel = document.getElementById('qd-subdir');
  const ndw = document.getElementById('ndw');
  if (!subWrap || !subSel) return;
  if (dept === '__new__') {
    subWrap.style.display = 'none';
    if (ndw) ndw.style.display = 'block';
    return;
  }
  if (ndw) ndw.style.display = dept.startsWith('__custom__') ? 'block' : 'none';
  const subs = SUBDIRS[dept] || [];
  if (subs.length > 0) {
    subWrap.style.display = 'block';
    subSel.innerHTML = '<option value="">— Yo\'nalishni tanlang —</option>' +
      subs.map(s => `<option value="${s}" ${preselect === s ? 'selected' : ''}>${s}</option>`).join('');
  } else {
    subWrap.style.display = 'none';
    subSel.innerHTML = '';
  }
}
async function saveQ(editId) {
  const deptVal = $('qd-dept') ? $('qd-dept').value : '';
  const subVal = $('qd-subdir') ? $('qd-subdir').value : '';
  let dir = '';
  if (deptVal === '__new__') {
    dir = ($('qd-newdir') || {}).value?.trim() || '';
  } else if (deptVal.startsWith('__custom__:')) {
    dir = ($('qd-newdir') || {}).value?.trim() || deptVal.replace('__custom__:', '');
  } else if (subVal) {
    dir = subVal; // Use sub-direction as the question category
  } else {
    dir = deptVal; // Use dept if no sub-dir
  }
  const q = $('qd-q').value.trim(), A = $('qd-A').value.trim(), B = $('qd-B').value.trim(), C = $('qd-C').value.trim(), D = $('qd-D').value.trim(), ans = $('qd-ans').value, dif = $('qd-dif').value;
  if (!dir || !q || !A || !B || !C || !D) { toast('Barcha maydonlarni to\'ldiring!', 'var(--red)'); return; }

  const b64 = $('qd-image')?.dataset.b64;
  const existingImage = editId ? S.questions.find(x => x.id === editId)?.image : null;
  let image = existingImage;
  if (b64 === 'removed') image = null;
  else if (b64) image = b64;

  const questionData = { id: editId || Date.now(), dir, q, opts: { A, B, C, D }, ans, dif: dif || 'medium' };
  if (image) questionData.image = image;

  // LocalStorage ga saqlash
  if (editId) {
    const idx = S.questions.findIndex(x => x.id === editId);
    if (idx >= 0) S.questions[idx] = questionData;
  } else {
    S.questions.push(questionData);
  }

  // Supabase ga saqlash
  if (window.addQuestionToSupabase || window.updateQuestionInSupabase) {
    try {
      if (editId) {
        const result = await updateQuestionInSupabase(editId, questionData);
        if (result.success) {
          console.log('✅ Savol Supabase da yangilandi');
        }
      } else {
        const result = await addQuestionToSupabase(questionData);
        if (result.success) {
          console.log('✅ Savol Supabase ga qo\'shildi');
        }
      }
    } catch (error) {
      console.error('❌ Supabase ga saqlashda xato:', error);
    }
  }

  syncQuestionsToFile();
  document.querySelector('.modal-overlay')?.remove();
  toast(editId ? 'Yangilandi ✅' : "Qo'shildi ✅", 'var(--green)'); renderQuestions();
}
async function deleteQ(id) {
  if (confirm('Savolni o\'chirish?')) {
    // LocalStorage dan o'chirish
    S.questions = S.questions.filter(q => q.id !== id);

    // Supabase dan o'chirish
    if (window.deleteQuestionFromSupabase) {
      try {
        const result = await deleteQuestionFromSupabase(id);
        if (result.success) {
          console.log('✅ Savol Supabase dan o\'chirildi');
        }
      } catch (error) {
        console.error('❌ Supabase dan o\'chirishda xato:', error);
      }
    }

    syncQuestionsToFile();
    toast("O'chirildi 🗑", 'var(--red)'); renderQuestions();
  }
}
// Natijalarni results.js fayliga saqlaydigan funksiya (DEPRECATED - Supabase ishlatiladi)
function syncResultsToFile() {
  // Bu funksiya endi ishlatilmaydi, chunki Supabase ishlatilmoqda
  console.log('ℹ️ syncResultsToFile: Supabase ishlatilmoqda, backend API kerak emas');
}
// Savollarni questions.js fayliga saqlaydigan funksiya (DEPRECATED - Supabase ishlatiladi)
function syncQuestionsToFile() {
  // Bu funksiya endi ishlatilmaydi, chunki Supabase ishlatilmoqda
  console.log('ℹ️ syncQuestionsToFile: Supabase ishlatilmoqda, backend API kerak emas');
}
function exportCSV() {
  if (!S.results.length) { toast('Natijalar yo\'q!', 'var(--amber)'); return; }
  const rows = [['#', 'F.I.Sh', 'JSHSHIR', 'Lavozim', "Yo'nalish", "To'g'ri", "Noto'g'ri", 'Jami', 'Foiz', 'Natija', 'Tab', 'Davomiylik', 'Sana'], ...S.results.map((r, i) => [i + 1, r.name, r.jshir || '', r.pos, r.dir, r.correct, r.wrong, r.total, r.pct + '%', r.passed ? "O'tdi" : 'Yiqildi', r.tabs, Math.floor(r.duration / 60) + 'm' + r.duration % 60 + 's', r.date])];
  const csv = rows.map(r => r.map(c => `"${String(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `railexam_${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url);
  toast('CSV yuklandi!', 'var(--green)');
}

// Yangi yo'nalish qo'shish funksiyalari
function showAddDirection() {
  const el = document.createElement('div'); el.className = 'modal-overlay';
  el.innerHTML = `<div class="modal" style="max-width:400px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;">Yangi yo'nalish qo'shish</h3>
      <button onclick="this.closest('.modal-overlay').remove()" style="background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:11px;">
      <div>
        <label class="lbl">Asosiy yo'nalish (Xo'jalik nomi) *</label>
        <input class="inp" id="nd-dept" placeholder="Masalan: Maxsus yo'nalish"/>
      </div>
      <div>
        <label class="lbl">Mutaxassislik (ixtiyoriy, agar kerak bo'lsa)</label>
        <input class="inp" id="nd-sub" placeholder="Masalan: Texnik xodim"/>
      </div>
      <button class="btn btn-primary" style="margin-top:10px;" onclick="saveDirection()">Saqlash</button>
    </div>
  </div>`;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
}

function saveDirection() {
  const dept = $('nd-dept').value.trim();
  const sub = $('nd-sub').value.trim();
  if (!dept) { toast("Asosiy yo'nalish nomini kiriting!", "var(--red)"); return; }

  if (!SUBDIRS[dept]) {
    SUBDIRS[dept] = [];
  }
  if (sub && !SUBDIRS[dept].includes(sub)) {
    SUBDIRS[dept].push(sub);
  }

  // LocalStorage ga saqlash
  const custom = JSON.parse(localStorage.getItem('railexam_custom_dirs') || '{}');
  if (!custom[dept]) custom[dept] = [];
  if (sub && !custom[dept].includes(sub)) custom[dept].push(sub);
  localStorage.setItem('railexam_custom_dirs', JSON.stringify(custom));

  document.querySelector('.modal-overlay')?.remove();
  toast("Yo'nalish muvaffaqiyatli qo'shildi!", "var(--green)");

  // Joriy admin bo'limni yangilash
  if (S.adminSection === 'questions') {
    renderQuestions();
  } else if (S.adminSection === 'phase2') {
    S.phase2AdminDept = dept;
    S.phase2AdminDir = sub || (SUBDIRS[dept] && SUBDIRS[dept].length > 0 ? SUBDIRS[dept][0] : '');
    renderAdminPhase2();
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 600;
      let width = img.width;
      let height = img.height;
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const input = document.getElementById('qd-image');
      if (input) input.dataset.b64 = dataUrl;
      const preview = document.getElementById('qd-img-preview');
      if (preview) { preview.src = dataUrl; preview.style.display = 'block'; }
      const removeBtn = document.getElementById('qd-img-remove');
      if (removeBtn) removeBtn.style.display = 'block';
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  const input = document.getElementById('qd-image');
  if (input) { input.value = ''; input.dataset.b64 = 'removed'; }
  const preview = document.getElementById('qd-img-preview');
  if (preview) { preview.src = ''; preview.style.display = 'none'; }
  const removeBtn = document.getElementById('qd-img-remove');
  if (removeBtn) removeBtn.style.display = 'none';
}

// ===== 2-BOSQICH (PHASE 2) ADMIN =====
function renderAdminPhase2() {
  const depts = Object.keys(SUBDIRS);
  if (!S.phase2AdminDept && depts.length > 0) S.phase2AdminDept = depts[0];
  const dirs = S.phase2AdminDept && SUBDIRS[S.phase2AdminDept] ? SUBDIRS[S.phase2AdminDept] : [];
  if (S.phase2AdminDept && !S.phase2AdminDir && dirs.length > 0) S.phase2AdminDir = dirs[0];
  if (S.phase2AdminDir && !dirs.includes(S.phase2AdminDir) && dirs.length > 0) S.phase2AdminDir = dirs[0];

  const qList = (S.phase2Questions || []).filter(q => q.dept === S.phase2AdminDept && q.dir === S.phase2AdminDir);

  let envs = {};
  for (let i = 1; i <= 20; i++) envs[i] = [];
  qList.forEach(q => {
    if (envs[q.env]) envs[q.env].push(q);
  });

  let envHtml = '';
  if (S.phase2AdminDept && S.phase2AdminDir) {
    for (let i = 1; i <= 20; i++) {
      const qCount = envs[i].length;
      let items = envs[i].map((q, idx) => `
        <div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid var(--border);font-size:12px;">
          <div><strong>${idx + 1}.</strong> ${q.text}</div>
          <button onclick="deletePhase2Question('${q.id}')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;">🗑</button>
        </div>
      `).join('');
      if (qCount === 0) items = `<div style="padding:8px;font-size:12px;color:var(--text3);">Savollar yo'q</div>`;

      envHtml += `
        <div class="card" style="margin-bottom:15px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h3 style="font-size:16px;font-weight:700;">Kanvert ${i} <span class="badge" style="background:var(--surface2);color:var(--text2);">${qCount}/7</span></h3>
            ${qCount < 7 ? `<button class="btn btn-primary" style="padding:4px 10px;font-size:11px;" onclick="openPhase2Modal(${i})">+ Qo'shish</button>` : `<span style="font-size:11px;color:var(--green);font-weight:700;">To'ldi</span>`}
          </div>
          <div style="background:var(--surface2);border-radius:8px;">${items}</div>
        </div>
      `;
    }
  } else {
    envHtml = `<div style="padding:20px;text-align:center;color:var(--text3);grid-column:1/-1;">Iltimos, avval xo'jalik va yo'nalishni tanlang</div>`;
  }

  $('adminContent').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:15px;margin-bottom:10px;">
      <h2 style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;">✉️ 2-Etap Savollari (Kanvertlar)</h2>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <select class="filter-inp" onchange="S.phase2AdminDept=this.value; S.phase2AdminDir=''; renderAdminPhase2()">
          <option value="">— Xo'jalikni tanlang —</option>
          ${depts.map(d => `<option value="${d}" ${S.phase2AdminDept === d ? 'selected' : ''}>${translateDirection(d)}</option>`).join('')}
        </select>
        <select class="filter-inp" onchange="S.phase2AdminDir=this.value; renderAdminPhase2()">
          <option value="">— Yo'nalishni tanlang —</option>
          ${dirs.map(d => `<option value="${d}" ${S.phase2AdminDir === d ? 'selected' : ''}>${translateDirection(d)}</option>`).join('')}
        </select>
        <button class="btn btn-secondary btn-sm" onclick="showAddDirection()">+ Yangi qo'shish</button>
      </div>
    </div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:20px;">Kanvertga kirish uchun "Qo'shish" ni bosing. (Maksimal 7 ta/kanvert)</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:15px;">
      ${envHtml}
    </div>
  `;
}

function openPhase2Modal(envIndex) {
  const el = document.createElement('div');
  el.className = 'modal-overlay';
  el.innerHTML = `
  <div class="modal">
    <h3 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:15px;">Kanvert ${envIndex} ga savol qo'shish</h3>
    <div style="margin-bottom:15px;">
      <label class="lbl">Savol matni (Ochiq savol)</label>
      <textarea id="p2q-text" class="inp" style="width:100%;height:100px;resize:vertical;" placeholder="Savolni kiriting..."></textarea>
    </div>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-secondary" style="flex:1;" onclick="this.closest('.modal-overlay').remove()">Bekor qilish</button>
      <button class="btn btn-primary" style="flex:1;" onclick="savePhase2Question(${envIndex})">Saqlash</button>
    </div>
  </div>`;
  el.onclick = e => { if (e.target === el) el.remove(); };
  document.body.appendChild(el);
}

function savePhase2Question(envIndex) {
  const text = $('p2q-text').value.trim();
  if (!text) { toast("Savol matnini kiriting!", "var(--red)"); return; }

  if (!S.phase2AdminDept || !S.phase2AdminDir) {
    toast("Avval xo'jalik va yo'nalishni tanlang!", "var(--amber)");
    return;
  }

  const q = { id: 'p2_' + Date.now(), env: envIndex, text: text, dept: S.phase2AdminDept, dir: S.phase2AdminDir };
  if (!S.phase2Questions) S.phase2Questions = [];
  S.phase2Questions.push(q);
  localStorage.setItem('re_phase2_questions', JSON.stringify(S.phase2Questions));

  document.querySelector('.modal-overlay')?.remove();
  toast("Savol saqlandi!", "var(--green)");
  renderAdminPhase2();
}

function deletePhase2Question(id) {
  if (!confirm("Savolni o'chirasizmi?")) return;
  S.phase2Questions = S.phase2Questions.filter(q => q.id !== id);
  localStorage.setItem('re_phase2_questions', JSON.stringify(S.phase2Questions));
  toast("O'chirildi", "var(--green)");
  renderAdminPhase2();
}

// ===== 2-BOSQICH (PHASE 2) STUDENT =====
function startPhase2Envelopes() {
  // Check if phase 2 questions exist for the student's direction
  const myQs = (S.phase2Questions || []).filter(q => q.dept === S.direction && q.dir === S.subDirection);
  if (myQs.length === 0) {
    toast("Sizning yo'nalishingiz uchun 2-bosqich savollari tayyor emas!", "var(--amber)");
    return;
  }

  // Reset state for new attempt
  S.phase2EnvelopeIndex = null;
  S.phase2VisualEnvelope = null;
  S.phase2Answers = [];
  if (S.phase2TimerInterval) {
    clearInterval(S.phase2TimerInterval);
    S.phase2TimerInterval = null;
  }

  // Randomize actual envelope content mapped to visual positions
  let actualEnvelopes = [];
  for (let i = 1; i <= 20; i++) actualEnvelopes.push(i);
  actualEnvelopes = shuffle(actualEnvelopes);
  S.phase2EnvelopeMapping = actualEnvelopes;

  const grid = $('phase2-envelope-grid');
  grid.innerHTML = actualEnvelopes.map((actualNum, idx) => {
    let visualNum = idx + 1;
    return `
    <div class="envelope-card" onclick="openEnvelope(this, ${visualNum}, ${actualNum})">
      <div class="env-flap"></div>
      <div class="env-body"></div>
      <div class="env-number">${visualNum}</div>
    </div>
  `}).join('');

  showPage('pg-phase2-envelopes');
}

function openEnvelope(cardEl, visualNum, actualNum) {
  // Agar oldin tanlangan bo'lsa, qayta bosilmasligi uchun
  if (S.phase2EnvelopeIndex !== null) return;

  cardEl.classList.add('opening');
  S.phase2EnvelopeIndex = actualNum;
  S.phase2VisualEnvelope = visualNum;
  S.phase2Answers = []; // Tozalash

  // Extract questions for this actual envelope for the user's specific direction
  const myQs = (S.phase2Questions || []).filter(q => q.dept === S.direction && q.dir === S.subDirection);
  const envQuestions = myQs.filter(q => q.env === actualNum);

  setTimeout(() => {
    if (envQuestions.length === 0) {
      toast("Bu biletda savollar yo'q!", "var(--amber)");
      S.phase2EnvelopeIndex = null;
      cardEl.classList.remove('opening');
      return;
    }
    renderPhase2Exam(envQuestions, visualNum);
  }, 800);
}

function renderPhase2Exam(questions, visualNum) {
  const container = $('phase2-questions-container');
  // Update header title to show the envelope number
  const header = document.querySelector('#pg-phase2-exam h2');
  if (header) header.innerHTML = `✉️ ${visualNum}-Kanvert Savollari`;

  container.innerHTML = questions.map((q, i) => `
    <div class="phase2-q-card">
      <div class="phase2-q-badge">SAVOL ${i + 1}</div>
      <div style="font-size:20px;color:var(--text);line-height:1.6;font-weight:500;">${q.text}</div>
    </div>
  `).join('');

  S.phase2TimeLeft = 40 * 60; // 40 minutes
  startPhase2Timer();
  showPage('pg-phase2-exam');
}

function startPhase2Timer() {
  if (S.phase2TimerInterval) clearInterval(S.phase2TimerInterval);

  const updateT = () => {
    const m = Math.floor(Math.max(0, S.phase2TimeLeft) / 60);
    const s = Math.max(0, S.phase2TimeLeft) % 60;
    const el = $('phase2Timer');
    if (el) el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };

  updateT();
  S.phase2TimerInterval = setInterval(() => {
    if (S.phase2TimeLeft <= 0) {
      clearInterval(S.phase2TimerInterval);
      toast("Vaqt tugadi!", "var(--amber)");
      submitPhase2();
      return;
    }
    S.phase2TimeLeft--;
    updateT();
  }, 1000);
}

function submitPhase2() {
  if (S.phase2TimerInterval) clearInterval(S.phase2TimerInterval);

  const envQuestions = S.phase2Questions.filter(q => q.env === S.phase2EnvelopeIndex);
  const result = {
    id: 'p2res_' + Date.now(),
    userId: S.userJshir,
    name: S.userName,
    pos: S.userPos,
    envelope: S.phase2EnvelopeIndex,
    date: new Date().toLocaleString('uz-UZ'),
    answers: envQuestions.map((q, i) => ({
      qId: q.id,
      qText: q.text,
      answer: S.phase2Answers[i] || ''
    }))
  };

  S.phase2Results.unshift(result);
  localStorage.setItem('re_phase2_results', JSON.stringify(S.phase2Results));

  showPage('pg-phase2-finish');
}

function testPhase2() {
  S.userName = "Test User";
  S.userJshir = "12345678901234";
  S.userPos = "Test Position";
  S.direction = "Tashish va bekatlar ishlari xo'jaligi";
  S.subDirection = "DSP va manyovr dispetcher (DSS)";
  startPhase2Envelopes();
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) { const sb = $('adminSidebar'); if (sb) sb.classList.remove('open'); }
});

function restorePageState() {
  const savedLang = localStorage.getItem('re_lang') || 'uz';
  S.lang = savedLang;

  // Foydalanuvchi talabiga binoan: sahifa yangilanganda har doim bosh sahifaga (pg-lang) qaytadi
  showPage('pg-lang');
}

document.addEventListener('DOMContentLoaded', () => {

  // Supabase dan ma'lumotlarni yuklash
  if (window.initializeSupabaseData) {
    Promise.race([
      initializeSupabaseData(),
      new Promise(resolve => setTimeout(resolve, 3000)) // 3 soniyadan so'ng majburiy o'tkazib yuborish
    ]).then(() => {
      setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); restorePageState(); }, 1200);
    }).catch(err => {
      console.error('Supabase yuklashda xato:', err);
      setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); restorePageState(); }, 1200);
    });
  } else {
    setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); restorePageState(); }, 1200);
  }
});