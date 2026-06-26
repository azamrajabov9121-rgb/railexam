-- ============================================================
-- RAILEXAM — to'liq baza sxemasi
-- Xavfsiz (idempotent): mavjud jadval/policy bo'lsa xato bermay o'tkazib yuboradi
-- Supabase Dashboard -> SQL Editor -> New query ga joylashtirib Run qiling
-- ============================================================

-- 1. Users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  jshir TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_jshir ON users(jshir);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- 2. Questions (1-bosqich savollari)
CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL PRIMARY KEY,
  direction TEXT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_questions_direction ON questions(direction);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);

-- 3. Exam Results (1-bosqich natijalari)
CREATE TABLE IF NOT EXISTS exam_results (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  jshir TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo TEXT,
  direction TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'uz',
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  wrong_answers INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  tab_switches INTEGER DEFAULT 0,
  duration_seconds INTEGER NOT NULL,
  exam_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  detailed_answers JSONB
);
CREATE INDEX IF NOT EXISTS idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_direction ON exam_results(direction);
CREATE INDEX IF NOT EXISTS idx_exam_results_passed ON exam_results(passed);
CREATE INDEX IF NOT EXISTS idx_exam_results_exam_date ON exam_results(exam_date DESC);
CREATE INDEX IF NOT EXISTS idx_exam_results_jshir ON exam_results(jshir);

-- 4. Phase 2 Questions (2-bosqich ochiq savollari)
CREATE TABLE IF NOT EXISTS phase2_questions (
  id BIGSERIAL PRIMARY KEY,
  envelope INTEGER NOT NULL,
  department TEXT NOT NULL,
  direction TEXT NOT NULL,
  question_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_phase2_questions_dept_dir ON phase2_questions(department, direction);
CREATE INDEX IF NOT EXISTS idx_phase2_questions_envelope ON phase2_questions(envelope);

-- 5. Phase 2 Results (2-bosqich natijalari)
CREATE TABLE IF NOT EXISTS phase2_results (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  jshir TEXT NOT NULL,
  first_stage_result_id BIGINT REFERENCES exam_results(id) ON DELETE SET NULL,
  percentage INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  attachment_data TEXT,
  attachment_name TEXT,
  exam_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_phase2_results_jshir ON phase2_results(jshir);
CREATE INDEX IF NOT EXISTS idx_phase2_results_exam_date ON phase2_results(exam_date DESC);

-- ============================================================
-- Row Level Security (RLS) — xavfsiz qayta ishlatish uchun avval eski policy o'chiriladi
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users are viewable by everyone" ON users;
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can be inserted by everyone" ON users;
CREATE POLICY "Users can be inserted by everyone" ON users FOR INSERT WITH CHECK (true);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Questions are viewable by everyone" ON questions;
CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Questions can be inserted by everyone" ON questions;
CREATE POLICY "Questions can be inserted by everyone" ON questions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Questions can be updated by everyone" ON questions;
CREATE POLICY "Questions can be updated by everyone" ON questions FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Questions can be deleted by everyone" ON questions;
CREATE POLICY "Questions can be deleted by everyone" ON questions FOR DELETE USING (true);

ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Exam results are viewable by everyone" ON exam_results;
CREATE POLICY "Exam results are viewable by everyone" ON exam_results FOR SELECT USING (true);
DROP POLICY IF EXISTS "Exam results can be inserted by everyone" ON exam_results;
CREATE POLICY "Exam results can be inserted by everyone" ON exam_results FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Exam results can be deleted by everyone" ON exam_results;
CREATE POLICY "Exam results can be deleted by everyone" ON exam_results FOR DELETE USING (true);

ALTER TABLE phase2_questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Phase2 questions are viewable by everyone" ON phase2_questions;
CREATE POLICY "Phase2 questions are viewable by everyone" ON phase2_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Phase2 questions can be inserted by everyone" ON phase2_questions;
CREATE POLICY "Phase2 questions can be inserted by everyone" ON phase2_questions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Phase2 questions can be deleted by everyone" ON phase2_questions;
CREATE POLICY "Phase2 questions can be deleted by everyone" ON phase2_questions FOR DELETE USING (true);

ALTER TABLE phase2_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Phase2 results are viewable by everyone" ON phase2_results;
CREATE POLICY "Phase2 results are viewable by everyone" ON phase2_results FOR SELECT USING (true);
DROP POLICY IF EXISTS "Phase2 results can be inserted by everyone" ON phase2_results;
CREATE POLICY "Phase2 results can be inserted by everyone" ON phase2_results FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Phase2 results can be deleted by everyone" ON phase2_results;
CREATE POLICY "Phase2 results can be deleted by everyone" ON phase2_results FOR DELETE USING (true);
