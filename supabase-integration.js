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
        name: r.name,
        pos: r.position,
        jshir: r.jshir,
        phone: r.phone,
        photo: r.photo,
        dir: r.direction,
        lang: r.language,
        total: r.total_questions,
        correct: r.correct_answers,
        wrong: r.wrong_answers,
        pct: r.percentage,
        passed: r.passed,
        tabs: r.tab_switches,
        duration: r.duration_seconds,
        date: new Date(r.exam_date).toLocaleString('uz-UZ'),
        detailed: r.detailed_answers || []
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

// ===== INITIALIZATION =====
async function initializeSupabaseData() {
  console.log('🔄 Supabase dan ma\'lumotlar yuklanmoqda...');

  const questionsResult = await loadQuestionsFromSupabase();
  if (questionsResult.success && questionsResult.data.length > 0) {
    window.DB_QUESTIONS = questionsResult.data;
    // S allaqachon yaratilgan, shuning uchun to'g'ridan-to'g'ri yangilaymiz
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

  console.log('✅ Supabase ma\'lumotlari yuklandi');
}

// Global scope ga export
window.saveExamResultToSupabase = saveExamResultToSupabase;
window.loadResultsFromSupabase = loadResultsFromSupabase;
window.loadQuestionsFromSupabase = loadQuestionsFromSupabase;
window.addQuestionToSupabase = addQuestionToSupabase;
window.updateQuestionInSupabase = updateQuestionInSupabase;
window.deleteQuestionFromSupabase = deleteQuestionFromSupabase;
window.deleteResultFromSupabase = deleteResultFromSupabase;
window.initializeSupabaseData = initializeSupabaseData;
