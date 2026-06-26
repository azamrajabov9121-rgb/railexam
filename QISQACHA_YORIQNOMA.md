# 🎯 SUPABASE - QISQACHA YO'RIQNOMA

## 📝 Nimalar Qilish Kerak?

### 1️⃣ Supabase ga kirish
- [supabase.com](https://supabase.com) → Sign Up
- GitHub yoki Email orqali ro'yxatdan o'ting

### 2️⃣ Loyiha yaratish
- "New Project" tugmasini bosing
- Nom: `railexam`
- Parol o'rnating (saqlab qo'ying!)
- Region: Singapore
- "Create" bosing (2-3 daqiqa kutish)

### 3️⃣ Ma'lumotlar bazasini yaratish
Chap menyudan **SQL Editor** ni oching va quyidagi 4 ta SQL kodini ketma-ket bajaring:

**KOD 1 - Users jadvali:**
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  jshir TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_jshir ON users(jshir);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
```
→ "Run" bosing → "Success" kutish ✅

**KOD 2 - Questions jadvali:**
```sql
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

CREATE INDEX idx_questions_direction ON questions(direction);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```
→ "Run" bosing → "Success" kutish ✅

**KOD 3 - Exam Results jadvali:**
```sql
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

CREATE INDEX idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX idx_exam_results_direction ON exam_results(direction);
CREATE INDEX idx_exam_results_passed ON exam_results(passed);
CREATE INDEX idx_exam_results_exam_date ON exam_results(exam_date DESC);
CREATE INDEX idx_exam_results_jshir ON exam_results(jshir);
```
→ "Run" bosing → "Success" kutish ✅

**KOD 4 - Xavfsizlik (RLS):**
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can be inserted by everyone" ON users FOR INSERT WITH CHECK (true);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);
CREATE POLICY "Questions can be inserted by everyone" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Questions can be updated by everyone" ON questions FOR UPDATE USING (true);
CREATE POLICY "Questions can be deleted by everyone" ON questions FOR DELETE USING (true);

ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exam results are viewable by everyone" ON exam_results FOR SELECT USING (true);
CREATE POLICY "Exam results can be inserted by everyone" ON exam_results FOR INSERT WITH CHECK (true);
CREATE POLICY "Exam results can be deleted by everyone" ON exam_results FOR DELETE USING (true);
```
→ "Run" bosing → "Success" kutish ✅

### 4️⃣ API kalitlarini olish
- Chap pastda **Settings** (⚙️) → **API**
- 2 ta ma'lumotni nusxalang:
  1. **Project URL**: `https://xxxxx.supabase.co`
  2. **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 5️⃣ Loyihangizni sozlash
`supabase-config.js` faylini oching va o'zgartiring:

```javascript
// ESKI:
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// YANGI (o'zingizniki):
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

Ctrl+S bosib saqlang!

### 6️⃣ Test qilish
1. `index.html` ni brauzerda oching
2. F12 bosib Console ni oching
3. Quyidagi xabarlarni ko'ring:
   ```
   ✅ Supabase ma'lumotlari yuklandi
   ```
4. Imtihon topshiring
5. Console da:
   ```
   ✅ Natija Supabase ga saqlandi
   ```
6. Supabase Dashboard → **Table Editor** → **exam_results** da natijani ko'ring

---

## ✅ TAYYOR!

Agar hammasi ishlasa - tabriklayman! 🎉

Agar xato bo'lsa - `SUPABASE_BOSQICHMA_BOSQICH.md` faylini o'qing.

---

## 🔍 Tezkor Tekshirish

| Qadam | Tekshirish | Natija |
|-------|-----------|--------|
| 1 | Supabase Dashboard ochildi | ✅ |
| 2 | Loyiha yaratildi | ✅ |
| 3 | 3 ta jadval ko'rinadi (Table Editor) | ✅ |
| 4 | API kalitlar nusxalandi | ✅ |
| 5 | supabase-config.js o'zgartirildi | ✅ |
| 6 | Console da "✅ Supabase..." xabari | ✅ |

---

**Omad! 🚀**
