# 🚀 SUPABASE - BOSQICHMA-BOSQICH QO'LLANMA

## QADAM 1: Supabase Akkauntini Yaratish

### 1.1. Saytga kirish
1. Brauzeringizni oching
2. [https://supabase.com](https://supabase.com) ga kiring
3. O'ng yuqori burchakdagi **"Start your project"** yoki **"Sign Up"** tugmasini bosing

### 1.2. Ro'yxatdan o'tish
Quyidagi usullardan birini tanlang:
- ✅ **GitHub** orqali (tavsiya etiladi - tezroq)
- ✅ **Email** orqali

**GitHub orqali:**
1. "Continue with GitHub" tugmasini bosing
2. GitHub akkauntingizga kiring
3. Supabase ga ruxsat bering

**Email orqali:**
1. Email manzilingizni kiriting
2. Parol o'rnating (kamida 8 ta belgi)
3. "Sign Up" tugmasini bosing
4. Emailingizga kelgan xabarni oching
5. Tasdiqlash havolasini bosing

---

## QADAM 2: Yangi Loyiha Yaratish

### 2.1. Dashboard ga kirish
Ro'yxatdan o'tgandan keyin avtomatik Dashboard ga tushadi.

### 2.2. Loyiha yaratish
1. **"New Project"** tugmasini bosing (yashil tugma)

2. Quyidagi ma'lumotlarni to'ldiring:

   **Organization:**
   - Agar birinchi marta bo'lsa, avval "New organization" yarating
   - Nom: `MyCompany` yoki istalgan nom
   - "Create organization" tugmasini bosing

   **Project Settings:**
   - **Name**: `railexam` (kichik harflar bilan)
   - **Database Password**: Kuchli parol o'rnating
     ```
     Masalan: RailExam2024!Secure
     ```
     ⚠️ **MUHIM**: Bu parolni ALBATTA saqlab qo'ying! Keyin kerak bo'ladi.
   
   - **Region**: `Southeast Asia (Singapore)` ni tanlang
     (Yoki eng yaqin regionni tanlang - tezroq ishlaydi)
   
   - **Pricing Plan**: `Free` (0$) - bu yetarli

3. **"Create new project"** tugmasini bosing

4. ⏳ **2-3 daqiqa kuting** - loyiha yaratilmoqda...
   (Ekranda "Setting up project..." yozuvi ko'rinadi)

---

## QADAM 3: Ma'lumotlar Bazasini Yaratish (SQL)

Loyiha tayyor bo'lgach:

### 3.1. SQL Editor ga o'tish
1. Chap tarafdagi menyudan **"SQL Editor"** ni bosing
2. Yoki yuqoridagi menyudan **"SQL Editor"** ni toping

### 3.2. Birinchi jadval - USERS (Foydalanuvchilar)

1. SQL Editor oynasiga quyidagi kodni nusxalang:

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

2. O'ng pastdagi **"Run"** tugmasini bosing (yoki Ctrl+Enter)
3. Pastda **"Success. No rows returned"** yozuvi chiqishi kerak ✅

### 3.3. Ikkinchi jadval - QUESTIONS (Savollar)

1. SQL Editor oynasini tozalang (Ctrl+A, Delete)
2. Quyidagi kodni nusxalang:

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

3. **"Run"** tugmasini bosing
4. **"Success"** yozuvini kuting ✅

### 3.4. Uchinchi jadval - EXAM_RESULTS (Imtihon natijalari)

1. SQL Editor oynasini tozalang
2. Quyidagi kodni nusxalang:

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

3. **"Run"** tugmasini bosing
4. **"Success"** yozuvini kuting ✅

### 3.5. Xavfsizlik sozlamalari (RLS)

1. SQL Editor oynasini tozalang
2. Quyidagi kodni nusxalang:

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

3. **"Run"** tugmasini bosing
4. **"Success"** yozuvini kuting ✅

### 3.6. Jadvallarni tekshirish

1. Chap tarafdagi menyudan **"Table Editor"** ni bosing
2. Quyidagi 3 ta jadval ko'rinishi kerak:
   - ✅ `users`
   - ✅ `questions`
   - ✅ `exam_results`

---

## QADAM 4: API Kalitlarini Olish

### 4.1. Settings ga o'tish
1. Chap pastdagi **Settings** (⚙️) tugmasini bosing
2. **"API"** bo'limini tanlang

### 4.2. Ma'lumotlarni nusxalash

Quyidagi 2 ta ma'lumotni nusxalang:

**1. Project URL:**
```
https://xxxxxxxxxxxxxx.supabase.co
```
- "Project URL" yozuvi ostidagi manzilni nusxalang
- Masalan: `https://abcdefghijklmn.supabase.co`

**2. anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODc2MzAsImV4cCI6MjAwNTE2MzYzMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- "Project API keys" bo'limidan
- **"anon public"** kalitini nusxalang (uzun matn)
- ⚠️ **MUHIM**: `service_role` kalitini EMAS, `anon` kalitini oling!

---

## QADAM 5: Loyihangizni Sozlash

### 5.1. supabase-config.js faylini ochish

1. VS Code yoki boshqa kod editoringizda loyihani oching
2. `supabase-config.js` faylini toping
3. Faylni oching

### 5.2. Kalitlarni almashtirish

Faylning yuqori qismida quyidagi qatorlarni toping:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Ularni o'zingizning ma'lumotlaringiz bilan almashtiring:

```javascript
const SUPABASE_URL = 'https://abcdefghijklmn.supabase.co';  // 👈 O'zingizniki
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // 👈 O'zingizniki
```

### 5.3. Faylni saqlash

- Ctrl+S (Windows) yoki Cmd+S (Mac) bosing
- Yoki File → Save

---

## QADAM 6: Test Qilish

### 6.1. Loyihani ishga tushirish

1. Loyiha papkasida `index.html` faylini toping
2. Faylni brauzerda oching:
   - Faylga o'ng tugma → "Open with" → Brauzeringiz
   - Yoki faylni brauzerga sudrab tashlang

### 6.2. Browser Console ni ochish

- **Windows**: F12 yoki Ctrl+Shift+I
- **Mac**: Cmd+Option+I

### 6.3. Xabarlarni tekshirish

Console da quyidagi xabarlar ko'rinishi kerak:

```
🔄 Supabase dan ma'lumotlar yuklanmoqda...
✅ 0 ta savol yuklandi
✅ 0 ta natija yuklandi
✅ Supabase ma'lumotlari yuklandi
```

Agar xato bo'lsa:
- ❌ `Failed to fetch` - Internet ulanishini tekshiring
- ❌ `Invalid API key` - Kalitlarni qayta tekshiring
- ❌ `relation does not exist` - SQL kodlarni qayta bajaring

### 6.4. Imtihon topshirish

1. Tilni tanlang
2. Ma'lumotlaringizni kiriting
3. Yo'nalishni tanlang
4. Imtihon topshiring

### 6.5. Natijani tekshirish

Console da quyidagi xabar ko'rinishi kerak:
```
✅ Natija Supabase ga saqlandi
```

### 6.6. Supabase da tekshirish

1. Supabase Dashboard ga qayting
2. **Table Editor** → **exam_results** ni oching
3. Sizning natijangiz ko'rinishi kerak! 🎉

---

## ✅ TAYYOR!

Agar hammasi ishlasa:
- ✅ Imtihon natijalari Supabase ga saqlanadi
- ✅ Admin panel natijalarni ko'rsatadi
- ✅ Savollar bazasi Supabase da saqlanadi

---

## 🐛 Muammolar va Yechimlar

### Muammo 1: "Failed to fetch"
**Sabab**: Internet ulanishi yo'q yoki Supabase ishlamayapti
**Yechim**: 
- Internet ulanishini tekshiring
- [status.supabase.com](https://status.supabase.com) ga kiring

### Muammo 2: "Invalid API key"
**Sabab**: Kalitlar noto'g'ri nusxalangan
**Yechim**:
- Supabase Dashboard → Settings → API ga qayting
- Kalitlarni qayta nusxalang
- `supabase-config.js` da qayta kiriting

### Muammo 3: "relation does not exist"
**Sabab**: SQL kodlar to'liq bajarilmagan
**Yechim**:
- SQL Editor ga qayting
- Barcha SQL kodlarni qayta bajaring
- Har bir kod blokini alohida bajaring

### Muammo 4: Ma'lumotlar saqlanmayapti
**Sabab**: RLS sozlamalari noto'g'ri
**Yechim**:
- SQL Editor da RLS kodlarini qayta bajaring
- Table Editor da jadvallarni tekshiring

---

## 📞 Yordam Kerakmi?

1. Browser Console (F12) ni oching
2. Xatolarni screenshot qiling
3. Supabase Dashboard → Logs ga o'ting
4. Xatolarni o'qing

---

**Omad! Agar savollar bo'lsa, so'rang! 🚀**
