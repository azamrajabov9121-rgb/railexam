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
// Legacy alias
const TASHISH_SUBDIRS = SUBDIRS["Tashish va bekatlar ishlari xo'jaligi"];
// Toifalar only for Yo'l ta'mirlovchi
const YOL_TAMIRLOVCHI_TOIFALAR = ["3-toifa", "4-toifa"];

const QUESTIONS = [];
// ===== LOCALES =====
const L = {
  uz: { lang: "O'zbek tili", flag: "🇺🇿", sub: "Lotin", back: "Tilni o'zgartirish", reg: "Ro'yxatdan o'tish", name: "F.I.Sh (To'liq ism)", pos: "Lavozim", jshir: "JSHSHIR (14 raqam)", phone: "Telefon", camT: "Kamera", camD: "Imtihon uchun rasm oling", capture: "Rasm olish", retakeCam: "Qayta", camOk: "Tasdiqlash", skipCam: "Kamerasiz davom etish →", dirT: "Yo'nalishni tanlang", dirD: "Imtihon yo'nalishini belgilang", start: "Imtihonni boshlash", cont: "Davom etish", prev: "Oldingi", next: "Keyingisi", finish: "Tugatish", fin2: "Imtihonni tugatish", ansgiven: "javob", finQ: "Imtihonni tugatishni tasdiqlaysizmi?", cancel: "Bekor qilish", yesF: "Ha, tugatish", retake: "Qayta topshirish", home: "Bosh sahifa", tabW: "Boshqa tabga o'tdingiz! Bu qayd etildi.", passed: "O'TDINGIZ! 🎉", failed: "YIQILDINGIZ 😔", passedMsg: "Tabriklaymiz! Imtihondan muvaffaqiyatli o'tdingiz.", failedMsg: "Afsuski, o'ta olmadingiz. Qayta urinib ko'ring.", correct: "To'g'ri javoblar", wrong: "Noto'g'ri javoblar", total: "Jami savollar", passScore: "O'tish bali: 70%" },
  uzb: { lang: "Ўзбек тили", flag: "🇺🇿", sub: "Кирилл", back: "Тилни ўзгартириш", reg: "Рўйхатдан ўтиш", name: "Ф.И.Ш (Тўлиқ исм)", pos: "Лавозим", jshir: "ЖШШИР (14 рақам)", phone: "Телефон", camT: "Камера", camD: "Имтиҳон учун расм олинг", capture: "Расм олиш", retakeCam: "Қайта", camOk: "Тасдиқлаш", skipCam: "Камерасиз давом этиш →", dirT: "Йўналишни танланг", dirD: "Имтиҳон йўналишини белгиланг", start: "Имтиҳонни бошлаш", cont: "Давом этиш", prev: "Олдинги", next: "Кейингиси", finish: "Тугатиш", fin2: "Имтиҳонни тугатиш", ansgiven: "жавоб", finQ: "Имтиҳонни тугатишни тасдиқлайсизми?", cancel: "Бекор қилиш", yesF: "Ҳа, тугатиш", retake: "Қайта топшириш", home: "Бош саҳифа", tabW: "Бошқа табга ўтдингиз! Бу қайд этилди.", passed: "ЎТДИНГИЗ! 🎉", failed: "ЙИҚИЛДИНГИЗ 😔", passedMsg: "Табриклаймиз! Имтиҳондан муваффақиятли ўтдингиз.", failedMsg: "Афсуски, ўта олмадингиз. Қайта уриниб кўринг.", correct: "Тўғри жавоблар", wrong: "Нотўғри жавоблар", total: "Жами саволлар", passScore: "Ўтиш бали: 70%" },
  ru: { lang: "Русский язык", flag: "🇷🇺", sub: "Кириллица", back: "Сменить язык", reg: "Регистрация", name: "ФИО (Полное имя)", pos: "Должность", jshir: "ПИНФЛ (14 цифр)", phone: "Телефон", camT: "Камера", camD: "Сделайте фото для экзамена", capture: "Сделать фото", retakeCam: "Переснять", camOk: "Подтвердить", skipCam: "Продолжить без камеры →", dirT: "Выберите направление", dirD: "Укажите направление экзамена", start: "Начать экзамен", cont: "Продолжить", prev: "Предыдущий", next: "Следующий", finish: "Завершить", fin2: "Завершить экзамен", ansgiven: "ответов", finQ: "Вы уверены, что хотите завершить?", cancel: "Отмена", yesF: "Да, завершить", retake: "Пересдать", home: "На главную", tabW: "Вы переключили вкладку! Это зафиксировано.", passed: "СДАЛИ! 🎉", failed: "НЕ СДАЛИ 😔", passedMsg: "Поздравляем! Вы успешно сдали экзамен.", failedMsg: "К сожалению, вы не сдали. Попробуйте ещё раз.", correct: "Правильных ответов", wrong: "Неправильных ответов", total: "Всего вопросов", passScore: "Проходной балл: 70%" }
};
// ===== STATE =====
window.S = {
  lang: 'uz',
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
  adminSection: 'dash', charts: {}, filterDir: '', filterDept: '', filterStatus: '', qPage: 1, qFilterDir: ''
};
let S = window.S;

const t = k => L[S.lang][k] || k;
const $ = id => document.getElementById(id);
function toast(msg, color) { const e = $('toast'); e.textContent = msg; e.style.background = color || 'var(--blue)'; e.style.opacity = '1'; setTimeout(() => e.style.opacity = '0', 3000); }
function showPage(id) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); const p = $(id); if (p) p.classList.add('active'); window.scrollTo(0, 0); }
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
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:17px;color:#ffffff;">
          ${l.lang}
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,.45);margin-top:2px;">
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
function selectLang(c) { S.lang = c; initLangPage(); setTimeout(() => { showPage('pg-register'); initRegister(); }, 250); }

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
  $('txt-start-btn').textContent = "Davom etish";
  $('txt-continue').textContent = t('cont');
  S.direction = ''; S.subDirection = ''; S.toifa = '';
  ['inp-name', 'inp-pos', 'inp-jshir', 'inp-phone'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  const jc = $('jshir-cnt'); if (jc) jc.textContent = '0/14';
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
  if (!name || !pos || !jshir || !phone) { toast('Barcha maydonlarni to\'ldiring!', 'var(--red)'); return; }
  if (jshir.length !== 14) { toast('JSHSHIR 14 ta raqam bo\'lishi kerak!', 'var(--amber)'); return; }
  S.userName = name; S.userPos = pos; S.userJshir = jshir; S.userPhone = phone;
  showStep(2);
}
function goStep3() { stopCamera(); showStep(3); }
function goStep4() {
  if (!S.direction) { toast("Yo'nalishni tanlang!", 'var(--amber)'); return; }
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
      <span style="flex:1;text-align:left;font-size:13px;">${d}</span>
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
    return `<button onclick="selectToifa(this,'${toifa}')" id="toifa_${i}" class="opt" style="margin-bottom:2px;">
      <span class="opt-key" style="flex-shrink:0;background:rgba(245,158,11,.2);color:#f59e0b;">${i + 1}</span>
      <span style="flex:1;text-align:left;font-size:14px;font-weight:600;">${toifa}</span>
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
    return '<button onclick="selectDir(this,\'' + d.replace(/'/g, "\\'") + '\')" class="opt" style="margin-bottom:2px;"><span class="opt-key" style="flex-shrink:0;">' + (i + 1) + '</span><span style="flex:1;text-align:left;">' + d + '</span></button>';
  }).join('');
}
function selectDir(btn, d) {
  S.direction = d;
  document.querySelectorAll('#dirList .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ===== IMTIHON BOSHLASH (36 ta random) =====
function startExam() {
  if (!S.direction) { toast("Yo'nalishni tanlang!", 'var(--amber)'); return; }
  const hasSubDirs = SUBDIRS[S.direction] && SUBDIRS[S.direction].length > 0;
  if (hasSubDirs && !S.subDirection) {
    toast("Mutaxassislikni tanlang!", 'var(--amber)'); return;
  }
  if (S.subDirection === "Yo'l ta'mirlovchi" && !S.toifa) {
    toast("Toifani tanlang (3-toifa yoki 4-toifa)!", 'var(--amber)'); return;
  }
  console.log('S.subDirection:', S.subDirection);
  console.log('S.questions count:', S.questions.length);
  console.log('S.questions dirs:', S.questions.map(q => q.dir));
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
    toast("Bu yo'nalish uchun hali savollar qo'shilmagan!", 'var(--amber)');
    return;
  }
  // 36 tadan kam bo'lsa mavjud savollar qayta aralashtirilib ishlatiladi
  const src = pool.length >= 36 ? pool : [...pool, ...pool, ...pool, ...pool].slice(0, Math.max(pool.length, 36));
  const picked = shuffle(src).slice(0, Math.min(36, pool.length));

  S.examQuestions = picked.map(q => {
    const keys = shuffle(['A', 'B', 'C', 'D']);
    const newOpts = {}, keyMap = {};

    keys.forEach((ok, i) => {
      const nk = ['A', 'B', 'C', 'D'][i];
      newOpts[nk] = q.opts[ok];
      keyMap[ok] = nk;
    });

    return {
      ...q,
      opts: newOpts,
      correctMapped: keyMap[q.ans]
    };
  });

  S.answers = {};
  S.currentQ = 0;  // 0 dan boshlanishi muhim
  S.timeLeft = 36 * 60;
  S.tabSwitches = 0;
  S.startTime = Date.now();
  S.examDone = false;

  showPage('pg-exam');

  // 🔥 MUHIM: initExam ni to'g'ri chaqirish
  initExam();
}


// ===== IMTIHON =====
function initExam() {
  $('txt-prev').textContent = t('prev');
  $('txt-next').textContent = t('next');
  $('txt-fin2').textContent = t('fin2');
  $('txt-ans-given').textContent = t('ansgiven');
  $('txt-finish-q').textContent = t('finQ');
  $('txt-cancel-btn').textContent = t('cancel');
  $('txt-yes-finish').textContent = t('yesF');

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
  $('qDirLabel').textContent = q.dir;
  $('exam-q-label').textContent = `${S.currentQ + 1}/${total}`;
  $('exam-ans-count').textContent = `${answered}/${total}`;
  $('bot-ans').textContent = answered;
  $('bot-total').textContent = total;
  $('examPbar').style.width = (answered / total * 100) + '%';

  $('qText').textContent = q.q;

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
function selectAnswer(k) { S.answers[S.currentQ] = k; renderQ(); setTimeout(() => { if (S.currentQ < S.examQuestions.length - 1) nextQ(); }, 380); }
function nextQ() { if (S.currentQ < S.examQuestions.length - 1) { S.currentQ++; renderQ(); } else showFinishModal(); }
function prevQ() { if (S.currentQ > 0) { S.currentQ--; renderQ(); } }
function jumpToQ(i) { S.currentQ = i; renderQ(); }

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
  $('unanswered-warn').textContent = left > 0 ? `⚠️ ${left} ta savol javobsiz!` : '✅ Barcha savollarga javob berildi.';
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
  const total = S.examQuestions.length, pct = Math.round(correct / total * 100), passed = pct >= 70;
  const elapsed = Math.round((Date.now() - S.startTime) / 1000);
  const r = { id: Date.now(), name: S.userName, pos: S.userPos, jshir: S.userJshir, phone: S.userPhone, photo: S.userPhoto, dir: S.direction, lang: S.lang, total, correct, wrong: total - correct, pct, passed, tabs: S.tabSwitches, duration: elapsed, date: new Date().toLocaleString('uz-UZ'), detailed };

  // LocalStorage ga saqlash
  S.results.unshift(r);
  if (S.results.length > 300) S.results = S.results.slice(0, 300);
  localStorage.setItem('re_results', JSON.stringify(S.results));

  // Supabase ga saqlash
  if (window.saveExamResultToSupabase) {
    try {
      const supabaseResult = await saveExamResultToSupabase(r);
      if (supabaseResult.success) {
        console.log('✅ Natija Supabase ga saqlandi');
      } else {
        console.warn('⚠️ Supabase ga saqlanmadi:', supabaseResult.error);
      }
    } catch (error) {
      console.error('❌ Supabase ga saqlashda xato:', error);
    }
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
          <circle cx="66" cy="66" r="54" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="10"/>
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
        ${[['👤', r.name], ['💼', r.pos], ['🪪', 'JSHSHIR: ' + (r.jshir || '—')], ['📞', r.phone], ['🎯', r.dir], ['📅', r.date], ['⏱', Math.floor(r.duration / 60) + 'd ' + r.duration % 60 + 's'], ['⚠️', 'Tab: ' + r.tabs]].map(([i, v]) => `<div style="display:flex;gap:5px;align-items:start;"><span>${i}</span><span style="color:var(--text2);font-size:12px;">${v || '—'}</span></div>`).join('')}
      </div>
    </div>
    <details>
      <summary style="cursor:pointer;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:13px;list-style:none;display:flex;justify-content:space-between;">
        <span>Savol-javoblar (${r.detailed.length} ta)</span><span>▼</span>
      </summary>
      <div style="background:var(--surface);border:1px solid var(--border);border-top:none;border-radius:0 0 10px 10px;max-height:340px;overflow-y:auto;">
        ${r.detailed.map((d, i) => `<div style="padding:9px 12px;border-bottom:1px solid var(--border);display:flex;gap:9px;">
          <span style="width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;background:${d.ok ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.15)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">${d.ok ? '✓' : '✗'}</span>
          <div style="flex:1;min-width:0;">
            <p style="font-size:12px;margin-bottom:3px;">${i + 1}. ${d.q}</p>
            <div style="display:flex;gap:5px;flex-wrap:wrap;font-size:11px;">
              <span style="padding:2px 7px;border-radius:5px;background:${d.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">Siz: ${d.userAns || '—'}</span>
              ${!d.ok ? `<span style="padding:2px 7px;border-radius:5px;background:rgba(34,197,94,.1);color:var(--green);">To'g'ri: ${d.correctAns}</span>` : ''}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </details>`;
}

// ===== ADMIN =====
async function adminLogin() {
  if ($('admin-email').value === 'admin@railexam.uz' && $('admin-pass').value === 'Admin@12345') {
    // Supabase dan barcha ma'lumotlarni yuklash
    console.log('🔄 Admin panel: Ma\'lumotlar yuklanmoqda...');

    const [resultsData, questionsData] = await Promise.all([
      loadResultsFromSupabase(),
      loadQuestionsFromSupabase()
    ]);

    if (resultsData.success && resultsData.data.length > 0) {
      S.results = resultsData.data;
      console.log(`✅ Admin: ${resultsData.data.length} ta natija yuklandi`);
    }

    if (questionsData.success && questionsData.data.length > 0) {
      S.questions = questionsData.data;
      console.log(`✅ Admin: ${questionsData.data.length} ta savol yuklandi`);
    }

    showPage('pg-admin');
    adminTab('dash');
    $('admin-login-err').style.display = 'none';
  } else {
    $('admin-login-err').style.display = 'block';
    $('admin-login-err').textContent = '❌ Login yoki parol noto\'g\'ri!';
  }
}
function adminLogout() { showPage('pg-admin-login'); }
async function adminTab(tab) {
  S.adminSection = tab;
  ['dash', 'results', 'questions'].forEach(x => { const n = $('nav-' + x); if (n) { n.classList.remove('active'); } });
  const a = $('nav-' + tab); if (a) a.classList.add('active');
  $('admin-page-title').textContent = { dash: '📊 Dashboard', results: '📋 Natijalar', questions: '❓ Savollar Banki' }[tab];

  // Supabase dan ma'lumotlarni yuklash
  if (tab === 'dash' || tab === 'results') {
    const resultsData = await loadResultsFromSupabase();
    if (resultsData.success && resultsData.data.length > 0) {
      S.results = resultsData.data;
      console.log(`✅ Admin: ${resultsData.data.length} ta natija yuklandi`);
    }
  }

  if (tab === 'questions') {
    const questionsData = await loadQuestionsFromSupabase();
    if (questionsData.success && questionsData.data.length > 0) {
      S.questions = questionsData.data;
      console.log(`✅ Admin: ${questionsData.data.length} ta savol yuklandi`);
    }
  }

  if (tab === 'dash') renderDash();
  else if (tab === 'results') renderResults();
  else renderQuestions();
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
  });
}

function renderResults() {
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
        <span style="color:var(--text3);font-size:13px;">Jami: <strong style="color:white;">${rs.length}</strong> (Supabase dan)</span>
        <div style="display:flex;gap:7px;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="refreshResults()">🔄 Yangilash</button>
        </div>
      </div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;">
        <select class="filter-inp" onchange="S.filterDir=this.value;renderResults()">
          <option value="">— Yo'nalish —</option>
          ${dirs.map(d => `<option value="${d}" ${S.filterDir === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <input class="filter-inp" type="text" placeholder="F.I.Sh qidirish..." value="${S.filterDept}" oninput="S.filterDept=this.value;renderResults()"/>
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
        <table class="tbl"><thead><tr><th>#</th><th>F.I.Sh</th><th>JSHSHIR</th><th>Lavozim</th><th>Yo'nalish</th><th>Ball</th><th>Holat</th><th>Tab</th><th>Sana</th><th></th></tr></thead>
        <tbody>${rs.map((r, i) => `<tr>
          <td style="color:var(--text3);">${i + 1}</td>
          <td><div style="display:flex;align-items:center;gap:7px;">
            ${r.photo ? `<img src="${r.photo}" style="width:26px;height:26px;border-radius:50%;object-fit:cover;">` : `<div style="width:26px;height:26px;border-radius:50%;background:#1e4d8c;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${r.name?.[0] || '?'}</div>`}
            <span style="font-weight:500;">${r.name || '—'}</span></div></td>
          <td style="color:var(--text3);font-size:11px;">${r.jshir || '—'}</td>
          <td style="color:var(--text2);">${r.pos || '—'}</td>
          <td><span style="font-size:11px;background:rgba(30,111,192,.1);color:var(--blue-light);padding:2px 7px;border-radius:5px;">${r.dir || '—'}</span></td>
          <td><strong style="color:${r.passed ? 'var(--green)' : 'var(--red)'};">${r.pct}%</strong><div style="font-size:11px;color:var(--text3);">${r.correct}/${r.total}</div></td>
          <td><span class="badge ${r.passed ? 'badge-green' : 'badge-red'}">${r.passed ? "✓ O'tdi" : '✗ Yiqildi'}</span></td>
          <td>${r.tabs > 0 ? `<span style="color:var(--amber);">⚠️${r.tabs}</span>` : '—'}</td>
          <td style="color:var(--text3);font-size:11px;white-space:nowrap;">${r.date}</td>
          <td style="white-space:nowrap;"><button class="btn btn-secondary btn-sm" onclick="showDetail(${r.id})" style="padding:4px 9px;font-size:11px;">👁</button> <button class="btn btn-sm" onclick="downloadPDF(${r.id})" style="padding:4px 9px;font-size:11px;background:rgba(30,111,192,.1);color:var(--blue-light);border:1px solid rgba(30,111,192,.3);">🖨️</button> <button class="btn btn-sm" onclick="deleteResult(${r.id})" style="padding:4px 9px;font-size:11px;background:rgba(239,68,68,.1);color:var(--red);border:1px solid rgba(239,68,68,.3);margin-left:4px;">🗑</button></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>`}`;
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

function showDetail(id) {
  const r = S.results.find(x => x.id === id); if (!r) return;
  const el = document.createElement('div'); el.className = 'modal-overlay';
  el.innerHTML = `<div class="modal" style="max-width:560px;max-height:85vh;overflow-y:auto;">
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
    <div style="max-height:280px;overflow-y:auto;border:1px solid var(--border);border-radius:10px;">
      ${r.detailed.map((d, i) => `<div style="padding:9px 12px;border-bottom:1px solid var(--border);display:flex;gap:8px;">
        <span style="width:19px;height:19px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;background:${d.ok ? 'rgba(34,197,94,.15)' : 'rgba(239,68,68,.15)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">${d.ok ? '✓' : '✗'}</span>
        <div style="font-size:11px;flex:1;min-width:0;"><p style="margin-bottom:3px;">${i + 1}. ${d.q}</p>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <span style="padding:1px 7px;border-radius:5px;background:${d.ok ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)'};color:${d.ok ? 'var(--green)' : 'var(--red)'};">Siz: ${d.userAns || '—'}</span>
            ${!d.ok ? `<span style="padding:1px 7px;border-radius:5px;background:rgba(34,197,94,.1);color:var(--green);">To'g'ri: ${d.correctAns}</span>` : ''}
          </div>
        </div>
      </div>`).join('')}
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
    <tr><td class="lbl">Yo'nalish:</td><td class="val">${r.dir || '—'}</td></tr>
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
        <span style="color:var(--text3);font-size:13px;">Jami: <strong style="color:white;">${total}</strong></span>
      </div>
      <button class="btn btn-primary btn-sm" onclick="showAddQ(null)">+ Savol qo'shish</button>
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
      ${Array.from({ length: Math.min(pages, 8) }, (_, i) => `<button onclick="S.qPage=${i + 1};renderQuestions()" style="width:32px;height:32px;border-radius:7px;font-size:12px;font-weight:700;border:1px solid var(--border);background:${S.qPage === i + 1 ? 'var(--blue)' : 'var(--surface2)'};color:${S.qPage === i + 1 ? 'white' : 'var(--text2)'};cursor:pointer;">${i + 1}</button>`).join('')}
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

  const questionData = { id: editId || Date.now(), dir, q, opts: { A, B, C, D }, ans, dif: dif || 'medium' };

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

window.addEventListener('resize', () => {
  const st = $('sideToggle');
  if (st) st.style.display = window.innerWidth < 900 ? 'flex' : 'none';
  if (window.innerWidth >= 900) { const sb = $('adminSidebar'); if (sb) sb.classList.remove('open'); }
});

window.addEventListener('load', () => {
  const st = $('sideToggle'); if (st && window.innerWidth < 900) st.style.display = 'flex';

  // Supabase dan ma'lumotlarni yuklash
  if (window.initializeSupabaseData) {
    initializeSupabaseData().then(() => {
      setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); showPage('pg-lang'); }, 1200);
    }).catch(err => {
      console.error('Supabase yuklashda xato:', err);
      setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); showPage('pg-lang'); }, 1200);
    });
  } else {
    setTimeout(() => { $('loader').classList.add('hide'); initLangPage(); showPage('pg-lang'); }, 1200);
  }
});