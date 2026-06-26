# Supabase Integratsiya Qo'llanmasi

## 1. Supabase Loyihasini Yaratish

1. [supabase.com](https://supabase.com) ga kiring
2. "New Project" tugmasini bosing
3. Loyiha nomini kiriting: `railexam`
4. Parolni o'rnating (Database parol)
5. Region tanlang: `Southeast Asia (Singapore)` yoki eng yaqin region
6. "Create new project" tugmasini bosing

## 2. Ma'lumotlar Bazasi Strukturasi

Supabase Dashboard → SQL Editor ga o'ting va quyidagi SQL kodlarni ketma-ket bajaring:

### 2.1. Users (Foydalanuvchilar) jadvali

```sql
-- Foydalanuvchilar jadvali
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  jshir TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index qo'shish (tezroq qidiruv uchun)
CREATE INDEX idx_users_jshir ON users(jshir);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```

### 2.2. Questions (Savollar) jadvali

```sql
-- Savollar jadvali
CREATE TABLE questions (
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

-- Index qo'shish
CREATE INDEX idx_questions_direction ON questions(direction);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```

### 2.3. Exam Results (Imtihon natijalari) jadvali

```sql
-- Imtihon natijalari jadvali
CREATE TABLE exam_results (
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

-- Index qo'shish
CREATE INDEX idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX idx_exam_results_direction ON exam_results(direction);
CREATE INDEX idx_exam_results_passed ON exam_results(passed);
CREATE INDEX idx_exam_results_exam_date ON exam_results(exam_date DESC);
CREATE INDEX idx_exam_results_jshir ON exam_results(jshir);
```

### 2.4. Row Level Security (RLS) sozlamalari

```sql
-- Users jadvali uchun RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users are viewable by everyone" 
  ON users FOR SELECT 
  USING (true);

CREATE POLICY "Users can be inserted by everyone" 
  ON users FOR INSERT 
  WITH CHECK (true);

-- Questions jadvali uchun RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions are viewable by everyone" 
  ON questions FOR SELECT 
  USING (true);

CREATE POLICY "Questions can be inserted by everyone" 
  ON questions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Questions can be updated by everyone" 
  ON questions FOR UPDATE 
  USING (true);

CREATE POLICY "Questions can be deleted by everyone" 
  ON questions FOR DELETE 
  USING (true);

-- Exam Results jadvali uchun RLS
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exam results are viewable by everyone" 
  ON exam_results FOR SELECT 
  USING (true);

CREATE POLICY "Exam results can be inserted by everyone" 
  ON exam_results FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Exam results can be deleted by everyone" 
  ON exam_results FOR DELETE 
  USING (true);
```

## 3. API Keys ni olish

1. Supabase Dashboard → Settings → API ga o'ting
2. Quyidagi ma'lumotlarni nusxalang:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 4. Keyingi Qadamlar

1. `supabase-config.js` faylini yaratish
2. Supabase client kutubxonasini ulash
3. Frontend kodini yangilash
4. LocalStorage dan Supabase ga migratsiya

---

**Eslatma**: Barcha SQL kodlarni Supabase SQL Editor da ketma-ket bajaring. Har bir kod blokini alohida bajaring va xatolar bo'lmasa keyingisiga o'ting.
