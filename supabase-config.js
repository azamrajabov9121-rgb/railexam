// ============================================================
// Supabase Configuration
// ============================================================

// MUHIM: Quyidagi qiymatlarni o'zingizning Supabase loyihangiz ma'lumotlari bilan almashtiring
// Supabase Dashboard → Settings → API dan oling

const SUPABASE_URL = 'https://wnovsymxrbgcupuubdnt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub3ZzeW14cmJnY3VwdXViZG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NTIxMjIsImV4cCI6MjA5NDIyODEyMn0.g-jINUESL12XwjdWhTtG4QmKqWehT-9V1juOskU1a7I';

// Supabase client yaratish (global window obyektida)
if (!window.supabaseClient && window.supabase) {
  try {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client yaratildi');
  } catch(e) {
    console.error('Supabase client yaratishda xato:', e);
  }
} else if (!window.supabase) {
  console.warn('Supabase kutubxonasi yuklanmadi. Sayt oflayn rejimda ishlashi mumkin.');
}

// ============================================================
// Database Helper Functions
// ============================================================

const DB = {
  // ===== USERS =====
  async createUser(userData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('users')
        .insert([{
          name: userData.name,
          position: userData.position,
          jshir: userData.jshir,
          phone: userData.phone,
          photo: userData.photo || null
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('User yaratishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserByJshir(jshir) {
    try {
      const { data, error } = await window.supabaseClient
        .from('users')
        .select('*')
        .eq('jshir', jshir)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data };
    } catch (error) {
      console.error('User topishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== QUESTIONS =====
  async getAllQuestions() {
    try {
      const allData = [];
      const pageSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await window.supabaseClient
          .from('questions')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData.push(...data);
        if (data.length < pageSize) break;
        from += pageSize;
      }
      console.log(`✅ questions: ${allData.length} ta savol yuklandi (paginatsiya)`);
      return { success: true, data: allData };
    } catch (error) {
      console.error('Savollarni olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getQuestionsByDirection(direction) {
    try {
      const { data, error } = await window.supabaseClient
        .from('questions')
        .select('*')
        .eq('direction', direction);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Yo\'nalish bo\'yicha savollarni olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async createQuestion(questionData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('questions')
        .insert([{
          direction: questionData.dir,
          question_text: questionData.q,
          option_a: questionData.opts.A,
          option_b: questionData.opts.B,
          option_c: questionData.opts.C,
          option_d: questionData.opts.D,
          correct_answer: questionData.ans,
          difficulty: questionData.dif || 'medium',
          image_url: questionData.image || null
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Savol qo\'shishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async updateQuestion(id, questionData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('questions')
        .update({
          direction: questionData.dir,
          question_text: questionData.q,
          option_a: questionData.opts.A,
          option_b: questionData.opts.B,
          option_c: questionData.opts.C,
          option_d: questionData.opts.D,
          correct_answer: questionData.ans,
          difficulty: questionData.dif || 'medium',
          image_url: questionData.image || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Savolni yangilashda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteQuestion(id) {
    try {
      const { error } = await window.supabaseClient
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Savolni o\'chirishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== EXAM RESULTS =====
  async createExamResult(resultData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('exam_results')
        .insert([{
          user_id: resultData.user_id || null,
          name: resultData.name,
          position: resultData.pos,
          jshir: resultData.jshir,
          phone: resultData.phone,
          photo: resultData.photo || null,
          direction: resultData.dir,
          sub_direction: resultData.sub || null,
          language: resultData.lang || 'uz',
          total_questions: resultData.total,
          correct_answers: resultData.correct,
          wrong_answers: resultData.wrong,
          percentage: resultData.pct,
          passed: resultData.passed,
          tab_switches: resultData.tabs || 0,
          duration_seconds: resultData.duration,
          detailed_answers: resultData.detailed || []
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Natijani saqlashda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getAllResults() {
    try {
      const allData = [];
      const pageSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await window.supabaseClient
          .from('exam_results')
          .select('id, user_id, name, position, jshir, phone, photo, direction, sub_direction, language, total_questions, correct_answers, wrong_answers, percentage, passed, tab_switches, duration_seconds, exam_date')
          .order('exam_date', { ascending: false })
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData.push(...data);
        if (data.length < pageSize) break;
        from += pageSize;
      }
      console.log(`✅ exam_results: ${allData.length} ta natija yuklandi (paginatsiya)`);
      return { success: true, data: allData };
    } catch (error) {
      console.error('Natijalarni olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getResultById(id) {
    try {
      const { data, error } = await window.supabaseClient
        .from('exam_results')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Natijani olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getResultsByDirection(direction) {
    try {
      const { data, error } = await window.supabaseClient
        .from('exam_results')
        .select('*')
        .eq('direction', direction)
        .order('exam_date', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Yo\'nalish bo\'yicha natijalarni olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async getResultsByJshir(jshir) {
    try {
      const { data, error } = await window.supabaseClient
        .from('exam_results')
        .select('*')
        .eq('jshir', jshir)
        .order('exam_date', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('JSHSHIR bo\'yicha natijalarni olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteResult(id) {
    try {
      const { error } = await window.supabaseClient
        .from('exam_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Natijani o\'chirishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== CUSTOM DIRECTIONS (xo'jalik/yo'nalish iyerarxiyasi) =====
  async getAllCustomDirections() {
    try {
      const { data, error } = await window.supabaseClient
        .from('custom_directions')
        .select('department, sub_direction')
        .order('created_at', { ascending: true });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async saveCustomDirection(dept, sub) {
    try {
      const { data, error } = await window.supabaseClient
        .from('custom_directions')
        .insert([{ department: dept, sub_direction: sub || null }])
        .select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteCustomDirection(dept, sub) {
    try {
      let query = window.supabaseClient
        .from('custom_directions')
        .delete()
        .eq('department', dept);
      if (sub) query = query.eq('sub_direction', sub);
      else query = query.is('sub_direction', null);
      const { error } = await query;
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // ===== PHASE 2 RESULTS =====
  async getAllPhase2Results() {
    try {
      const allData = [];
      const pageSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await window.supabaseClient
          .from('phase2_results')
          .select('*')
          .order('exam_date', { ascending: false })
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData.push(...data);
        if (data.length < pageSize) break;
        from += pageSize;
      }
      console.log(`✅ phase2_results: ${allData.length} ta natija yuklandi (paginatsiya)`);
      return { success: true, data: allData };
    } catch (error) {
      console.error('2-bosqich natijalarini olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async createPhase2Result(resultData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('phase2_results')
        .insert([{
          user_id: resultData.user_id || null,
          name: resultData.name,
          jshir: resultData.jshir,
          first_stage_result_id: resultData.first_stage_result_id || null,
          percentage: resultData.percentage,
          passed: resultData.passed,
          attachment_data: resultData.attachment_data || null,
          attachment_name: resultData.attachment_name || null,
          envelope: resultData.envelope || null
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('2-bosqich natijasini saqlashda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async deletePhase2Result(id) {
    try {
      const { error } = await window.supabaseClient
        .from('phase2_results')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('2-bosqich natijasini o\'chirishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== PHASE 2 QUESTIONS (2-bosqich ochiq savollari) =====
  async getAllPhase2Questions() {
    try {
      // Supabase max-rows=1000 limitini paginatsiya bilan yengamiz
      const allData = [];
      const pageSize = 1000;
      let from = 0;
      while (true) {
        const { data, error } = await window.supabaseClient
          .from('phase2_questions')
          .select('*')
          .order('created_at', { ascending: true })
          .range(from, from + pageSize - 1);
        if (error) throw error;
        if (!data || data.length === 0) break;
        allData.push(...data);
        if (data.length < pageSize) break;
        from += pageSize;
      }
      console.log(`✅ phase2_questions: ${allData.length} ta savol yuklandi (paginatsiya)`);
      return { success: true, data: allData };
    } catch (error) {
      console.error('2-bosqich savollarini olishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async createPhase2Question(questionData) {
    try {
      const { data, error } = await window.supabaseClient
        .from('phase2_questions')
        .insert([{
          envelope: questionData.env,
          department: questionData.dept,
          direction: questionData.dir,
          question_text: questionData.text
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('2-bosqich savol qo\'shishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  async deletePhase2Question(id) {
    try {
      const { error } = await window.supabaseClient
        .from('phase2_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('2-bosqich savolni o\'chirishda xato:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== STATISTICS =====
  async getStatistics() {
    try {
      const { data, error } = await window.supabaseClient
        .from('exam_results')
        .select('direction, passed, percentage');

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Statistikani olishda xato:', error);
      return { success: false, error: error.message };
    }
  }
};

// Global scope ga export qilish
window.DB = DB;
console.log('✅ Database helper functions yuklandi');
