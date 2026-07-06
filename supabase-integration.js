// ============================================================
// Supabase Integration Layer
// Bu fayl script.js dagi funksiyalarni Supabase bilan bog'laydi
// ============================================================

// ===== FOYDALANUVCHI YARATISH / OLISH =====
async function saveOrGetUser(userData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan, localStorage ishlatilmoqda');
    return { success: true, data: null };
  }

  try {
    // Avval JSHSHIR bo'yicha tekshirish
    const existing = await DB.getUserByJshir(userData.jshir);

    if (existing.data) {
      console.log('Foydalanuvchi topildi:', existing.data);
      return existing;
    }

    // Yangi foydalanuvchi yaratish
    const result = await DB.createUser(userData);
    console.log('Yangi foydalanuvchi yaratildi:', result);
    return result;
  } catch (error) {
    console.error('Foydalanuvchi saqlashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== IMTIHON NATIJASINI SAQLASH =====
async function saveExamResultToSupabase(resultData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan, faqat localStorage ishlatilmoqda');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    // Avval foydalanuvchini saqlash/olish
    const userResult = await saveOrGetUser({
      name: resultData.name,
      position: resultData.pos,
      jshir: resultData.jshir,
      phone: resultData.phone,
      photo: resultData.photo
    });

    // Natijani saqlash
    const examResult = await DB.createExamResult({
      ...resultData,
      user_id: userResult.data?.id || null
    });

    if (examResult.success) {
      console.log('✅ Natija Supabase ga saqlandi:', examResult.data);
      return examResult;
    } else {
      console.error('❌ Natijani saqlashda xato:', examResult.error);
      return examResult;
    }
  } catch (error) {
    console.error('❌ Natijani saqlashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== BARCHA NATIJALARNI YUKLASH =====
async function loadResultsFromSupabase() {
  if (!window.DB) {
    console.warn('Supabase ulanmagan, localStorage dan yuklanmoqda');
    return { success: false, data: [] };
  }

  try {
    const result = await DB.getAllResults();

    if (result.success && result.data) {
      // Supabase formatidan local formatga o'tkazish
      const formattedResults = result.data.map(r => ({
        id: r.id,
        userId: r.user_id,
        name: r.name,
        pos: r.position,
        jshir: r.jshir,
        phone: r.phone,
        photo: r.photo || null,
        dir: r.direction,
        sub: r.sub_direction,
        lang: r.language,
        total: r.total_questions,
        correct: r.correct_answers,
        wrong: r.wrong_answers,
        pct: r.percentage,
        passed: r.passed,
        tabs: r.tab_switches,
        duration: r.duration_seconds,
        date: new Date(r.exam_date).toLocaleString('uz-UZ'),
        detailed: []       // ro'yxatda kerak emas — batafsil ko'rishda yuklanadi
      }));

      console.log(`✅ ${formattedResults.length} ta natija Supabase dan yuklandi`);
      return { success: true, data: formattedResults };
    }

    return result;
  } catch (error) {
    console.error('❌ Natijalarni yuklashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== XO'JALIK/YO'NALISH IYERARXIYASINI SUPABASE DAN YUKLASH =====
async function loadCustomDirectionsFromSupabase() {
  if (!window.DB || !DB.getAllCustomDirections) return;
  try {
    const result = await DB.getAllCustomDirections();
    if (!result.success || !result.data) return;

    if (typeof SUBDIRS === 'undefined') return;

    const customFromLS = JSON.parse(localStorage.getItem('railexam_custom_dirs') || '{}');
    let updated = false;

    result.data.forEach(row => {
      const dept = row.department;
      const sub = row.sub_direction;
      if (!SUBDIRS[dept]) { SUBDIRS[dept] = []; }
      if (sub && !SUBDIRS[dept].includes(sub)) { SUBDIRS[dept].push(sub); }
      if (!customFromLS[dept]) { customFromLS[dept] = []; updated = true; }
      if (sub && !customFromLS[dept].includes(sub)) { customFromLS[dept].push(sub); updated = true; }
    });

    if (updated) {
      localStorage.setItem('railexam_custom_dirs', JSON.stringify(customFromLS));
      console.log('✅ Xo\'jalik/yo\'nalishlar Supabase dan sinxronlandi');
    }
  } catch (e) {
    console.warn('custom_directions yuklanmadi:', e);
  }
}

async function saveCustomDirectionToSupabase(dept, sub) {
  if (!window.DB || !DB.saveCustomDirection) return;
  try {
    await DB.saveCustomDirection(dept, sub);
    console.log(`✅ Yo'nalish Supabase ga saqlandi: ${dept} / ${sub || '—'}`);
  } catch (e) {
    console.warn('Yo\'nalishni saqlashda xato:', e);
  }
}

// ===== BITTA NATIJANI TO'LIQ YUKLASH (photo + detailed_answers bilan) =====
async function loadFullResultFromSupabase(id) {
  if (!window.DB || !DB.getResultById) return { success: false };
  try {
    const result = await DB.getResultById(id);
    if (result.success && result.data) {
      const r = result.data;
      return {
        success: true,
        data: {
          id: r.id, user_id: r.user_id, name: r.name, pos: r.position,
          jshir: r.jshir, phone: r.phone, photo: r.photo,
          dir: r.direction, sub: r.sub_direction, lang: r.language, total: r.total_questions,
          correct: r.correct_answers, wrong: r.wrong_answers, pct: r.percentage,
          passed: r.passed, tabs: r.tab_switches, duration: r.duration_seconds,
          date: new Date(r.exam_date).toLocaleString('uz-UZ'),
          detailed: r.detailed_answers || []
        }
      };
    }
    return { success: false };
  } catch (e) {
    return { success: false };
  }
}

// ===== SAVOLLARNI YUKLASH =====
async function loadQuestionsFromSupabase() {
  if (!window.DB) {
    console.warn('Supabase ulanmagan, localStorage dan yuklanmoqda');
    return { success: false, data: [] };
  }

  try {
    const result = await DB.getAllQuestions();

    if (result.success && result.data) {
      // Supabase formatidan local formatga o'tkazish
      const formattedQuestions = result.data.map(q => ({
        id: q.id,
        dir: q.direction,
        q: q.question_text,
        opts: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d
        },
        ans: q.correct_answer,
        dif: q.difficulty
      }));

      console.log(`✅ ${formattedQuestions.length} ta savol Supabase dan yuklandi`);
      return { success: true, data: formattedQuestions };
    }

    return result;
  } catch (error) {
    console.error('❌ Savollarni yuklashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== SAVOL QO'SHISH =====
async function addQuestionToSupabase(questionData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.createQuestion(questionData);

    if (result.success) {
      console.log('✅ Savol Supabase ga qo\'shildi:', result.data);
    }

    return result;
  } catch (error) {
    console.error('❌ Savol qo\'shishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== SAVOLNI YANGILASH =====
async function updateQuestionInSupabase(id, questionData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.updateQuestion(id, questionData);

    if (result.success) {
      console.log('✅ Savol Supabase da yangilandi:', result.data);
    }

    return result;
  } catch (error) {
    console.error('❌ Savolni yangilashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== SAVOLNI O'CHIRISH =====
async function deleteQuestionFromSupabase(id) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.deleteQuestion(id);

    if (result.success) {
      console.log('✅ Savol Supabase dan o\'chirildi');
    }

    return result;
  } catch (error) {
    console.error('❌ Savolni o\'chirishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== NATIJANI O'CHIRISH =====
async function deleteResultFromSupabase(id) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.deleteResult(id);

    if (result.success) {
      console.log('✅ Natija Supabase dan o\'chirildi');
    }

    return result;
  } catch (error) {
    console.error('❌ Natijani o\'chirishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH NATIJALARINI YUKLASH =====
async function loadPhase2ResultsFromSupabase() {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, data: [] };
  }

  try {
    const result = await DB.getAllPhase2Results();

    if (result.success && result.data) {
      const formatted = result.data.map(r => ({
        id: r.id,
        user_id: r.user_id,
        name: r.name,
        jshir: r.jshir,
        first_stage_result_id: r.first_stage_result_id,
        percentage: r.percentage,
        passed: r.passed,
        attachment_data: r.attachment_data,
        attachment_name: r.attachment_name,
        envelope: r.envelope,
        date: new Date(r.exam_date).toLocaleString('uz-UZ')
      }));
      return { success: true, data: formatted };
    }
    return result;
  } catch (error) {
    console.error('❌ 2-bosqich natijalarini yuklashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH NATIJASINI SAQLASH =====
async function savePhase2ResultToSupabase(resultData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.createPhase2Result(resultData);
    if (result.success) {
      console.log('✅ 2-bosqich natijasi Supabase ga saqlandi:', result.data);
    }
    return result;
  } catch (error) {
    console.error('❌ 2-bosqich natijasini saqlashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH NATIJASINI O'CHIRISH =====
async function deletePhase2ResultFromSupabase(id) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.deletePhase2Result(id);
    if (result.success) {
      console.log('✅ 2-bosqich natijasi Supabase dan o\'chirildi');
    }
    return result;
  } catch (error) {
    console.error('❌ 2-bosqich natijasini o\'chirishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH SAVOLLARINI YUKLASH =====
async function loadPhase2QuestionsFromSupabase() {
  if (!window.DB) {
    console.warn('Supabase ulanmagan, localStorage dan yuklanmoqda');
    return { success: false, data: [] };
  }

  try {
    const result = await DB.getAllPhase2Questions();

    if (result.success && result.data) {
      const formatted = result.data.map(q => ({
        id: q.id,
        env: q.envelope,
        dept: q.department,
        dir: q.direction,
        text: q.question_text
      }));

      console.log(`✅ ${formatted.length} ta 2-bosqich savoli Supabase dan yuklandi`);
      return { success: true, data: formatted };
    }

    return result;
  } catch (error) {
    console.error('❌ 2-bosqich savollarini yuklashda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH SAVOL QO'SHISH =====
async function addPhase2QuestionToSupabase(questionData) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.createPhase2Question(questionData);
    if (result.success) {
      console.log('✅ 2-bosqich savoli Supabase ga qo\'shildi:', result.data);
    }
    return result;
  } catch (error) {
    console.error('❌ 2-bosqich savol qo\'shishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== 2-BOSQICH SAVOLNI O'CHIRISH =====
async function deletePhase2QuestionFromSupabase(id) {
  if (!window.DB) {
    console.warn('Supabase ulanmagan');
    return { success: false, error: 'Supabase not connected' };
  }

  try {
    const result = await DB.deletePhase2Question(id);
    if (result.success) {
      console.log('✅ 2-bosqich savoli Supabase dan o\'chirildi');
    }
    return result;
  } catch (error) {
    console.error('❌ 2-bosqich savolni o\'chirishda xato:', error);
    return { success: false, error: error.message };
  }
}

// ===== BIR MARTALIK MIGRATSIYA: shu brauzerdagi lokal 2-bosqich savollarini Supabase'ga ko'chirish =====
// Faqat Supabase jadvali hali bo'sh bo'lganda ishlaydi (initializeSupabaseData ichida chaqiriladi)
async function migratePhase2QuestionsToSupabase(localQuestions) {
  if (!window.DB || !localQuestions || localQuestions.length === 0) return;

  console.log(`🔄 ${localQuestions.length} ta lokal 2-bosqich savoli Supabase'ga ko'chirilmoqda...`);
  const migrated = [];
  for (const q of localQuestions) {
    const result = await DB.createPhase2Question({ env: q.env, dept: q.dept, dir: q.dir, text: q.text });
    if (result.success && result.data) {
      migrated.push({
        id: result.data.id,
        env: result.data.envelope,
        dept: result.data.department,
        dir: result.data.direction,
        text: result.data.question_text
      });
    }
  }

  if (migrated.length > 0) {
    if (window.S) window.S.phase2Questions = migrated;
    localStorage.setItem('re_phase2_questions', JSON.stringify(migrated));
    console.log(`✅ ${migrated.length} ta 2-bosqich savoli muvaffaqiyatli ko'chirildi`);
  }
}

// ===== INITIALIZATION =====
async function initializeSupabaseData() {
  console.log('🔄 Supabase dan ma\'lumotlar yuklanmoqda...');

  const questionsResult = await loadQuestionsFromSupabase();
  if (questionsResult.success && questionsResult.data.length > 0) {
    window.DB_QUESTIONS = questionsResult.data;
    if (window.S) {
      window.S.questions = questionsResult.data;
      console.log(`✅ S.questions yangilandi: ${window.S.questions.length} ta savol`);
    }

  }

  const resultsResult = await loadResultsFromSupabase();
  if (resultsResult.success && resultsResult.data.length > 0) {
    window.DB_RESULTS = resultsResult.data;
    if (window.S) {
      window.S.results = resultsResult.data;
    }
  }

  const phase2Result = await loadPhase2ResultsFromSupabase();
  if (phase2Result.success && phase2Result.data) {
    if (window.S) {
      window.S.phase2ResultsList = phase2Result.data;
    }
  }

  const phase2QResult = await loadPhase2QuestionsFromSupabase();
  if (phase2QResult.success && phase2QResult.data && phase2QResult.data.length > 0) {
    const fromSupabase = phase2QResult.data;

    // Supabase ga saqlanmagan lokal savollarni (id 'p2_' bilan boshlanadi) saqlab qolamiz
    const currentLocal = (window.S?.phase2Questions || []).filter(q => String(q.id).startsWith('p2_'));
    const merged = [...fromSupabase, ...currentLocal];

    if (window.S) window.S.phase2Questions = merged;
    localStorage.setItem('re_phase2_questions', JSON.stringify(merged));

    // phase2_questions dagi dept/dir juftliklarini SUBDIRS ga avtomatik qo'shamiz.
    // Admin kompyuterda saqlangan yo'nalishlar boshqa kompda ham ko'rinadi.
    if (typeof SUBDIRS !== 'undefined') {
      fromSupabase.forEach(q => {
        if (!q.dept || !q.dir) return;
        if (!SUBDIRS[q.dept]) SUBDIRS[q.dept] = [];
        if (!SUBDIRS[q.dept].includes(q.dir)) {
          SUBDIRS[q.dept].push(q.dir);
        }
      });
    }
  } else if (phase2QResult.success) {
    // Supabase jadvali hali bo'sh - shu brauzerda lokal saqlangan savollar bo'lsa, bir martalik ko'chirib qo'yamiz
    const localQs = JSON.parse(localStorage.getItem('re_phase2_questions') || '[]');
    if (localQs.length > 0) {
      await migratePhase2QuestionsToSupabase(localQs);
    }
  }

  // Xo'jalik/yo'nalish iyerarxiyasini yuklash (barcha qurilmalarda bir xil ko'rinishi uchun)
  await loadCustomDirectionsFromSupabase();

  console.log('✅ Supabase ma\'lumotlari yuklandi');
}

// Global scope ga export
window.saveExamResultToSupabase = saveExamResultToSupabase;
window.loadResultsFromSupabase = loadResultsFromSupabase;
window.loadFullResultFromSupabase = loadFullResultFromSupabase;
window.saveCustomDirectionToSupabase = saveCustomDirectionToSupabase;
window.deleteCustomDirectionFromSupabase = async (dept, sub) => {
  if (!window.DB || !DB.deleteCustomDirection) return;
  try { await DB.deleteCustomDirection(dept, sub); } catch(e) {}
};
window.loadQuestionsFromSupabase = loadQuestionsFromSupabase;
window.addQuestionToSupabase = addQuestionToSupabase;
window.updateQuestionInSupabase = updateQuestionInSupabase;
window.deleteQuestionFromSupabase = deleteQuestionFromSupabase;
window.deleteResultFromSupabase = deleteResultFromSupabase;
window.loadPhase2ResultsFromSupabase = loadPhase2ResultsFromSupabase;
window.savePhase2ResultToSupabase = savePhase2ResultToSupabase;
window.deletePhase2ResultFromSupabase = deletePhase2ResultFromSupabase;
window.loadPhase2QuestionsFromSupabase = loadPhase2QuestionsFromSupabase;
window.addPhase2QuestionToSupabase = addPhase2QuestionToSupabase;
window.deletePhase2QuestionFromSupabase = deletePhase2QuestionFromSupabase;
window.migratePhase2QuestionsToSupabase = migratePhase2QuestionsToSupabase;
window.initializeSupabaseData = initializeSupabaseData;
