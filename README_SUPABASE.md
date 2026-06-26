# RailExam - Supabase Integratsiya Qo'llanmasi

## ✅ Bajarilgan Ishlar

### 1. Supabase Konfiguratsiyasi
- ✅ `supabase-config.js` - Supabase client va database helper funksiyalari
- ✅ `supabase-integration.js` - Frontend bilan integratsiya qatlami
- ✅ `SUPABASE_SETUP.md` - Ma'lumotlar bazasi strukturasi va SQL kodlar

### 2. Integratsiya Qismlari
- ✅ Foydalanuvchilar ma'lumotlarini saqlash
- ✅ Imtihon natijalarini saqlash va olish
- ✅ Savollar bazasini boshqarish (CRUD)
- ✅ LocalStorage + Supabase hybrid rejim

---

## 📋 Keyingi Qadamlar (Siz bajarasiz)

### 1. Supabase Loyihasini Yaratish

1. [supabase.com](https://supabase.com) ga kiring
2. "New Project" tugmasini bosing
3. Loyiha ma'lumotlarini kiriting:
   - **Project name**: `railexam`
   - **Database Password**: Kuchli parol o'rnating (saqlab qo'ying!)
   - **Region**: `Southeast Asia (Singapore)` yoki yaqin region
4. "Create new project" tugmasini bosing (2-3 daqiqa kutish kerak)

### 2. Ma'lumotlar Bazasini Sozlash

Loyiha tayyor bo'lgach:

1. Supabase Dashboard → **SQL Editor** ga o'ting
2. `SUPABASE_SETUP.md` faylidagi SQL kodlarni ketma-ket bajaring:
   - **2.1. Users jadvali** - Foydalanuvchilar uchun
   - **2.2. Questions jadvali** - Savollar uchun
   - **2.3. Exam Results jadvali** - Imtihon natijalari uchun
   - **2.4. Row Level Security** - Xavfsizlik sozlamalari

Har bir SQL blokini alohida bajaring va "Success" xabarini kuting.

### 3. API Keys ni Olish

1. Supabase Dashboard → **Settings** → **API** ga o'ting
2. Quyidagi ma'lumotlarni nusxalang:
   - **Project URL**: `https://xxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Loyihangizni Konfiguratsiya Qilish

`supabase-config.js` faylini oching va quyidagi qatorlarni o'zgartiring:

```javascript
// ESKI (o'zgartirish kerak):
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// YANGI (o'zingizning ma'lumotlaringiz):
const SUPABASE_URL = 'https://xxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 5. Testlash

1. Loyihani brauzerda oching
2. Ro'yxatdan o'ting va imtihon topshiring
3. Browser Console ni oching (F12) va quyidagi xabarlarni tekshiring:
   - `✅ Natija Supabase ga saqlandi`
   - `✅ X ta savol yuklandi`
   - `✅ X ta natija yuklandi`

4. Supabase Dashboard → **Table Editor** ga o'ting va ma'lumotlarni ko'ring:
   - `users` - Foydalanuvchilar
   - `questions` - Savollar
   - `exam_results` - Imtihon natijalari

---

## 🔧 Qanday Ishlaydi?

### Hybrid Rejim (LocalStorage + Supabase)

Tizim ikkala joyda ham ma'lumotlarni saqlaydi:

1. **LocalStorage** - Tez ishlash va offline rejim uchun
2. **Supabase** - Markaziy ma'lumotlar bazasi va backup uchun

### Ma'lumotlar Oqimi

```
Foydalanuvchi imtihon topshiradi
         ↓
LocalStorage ga saqlanadi (tezkor)
         ↓
Supabase ga saqlanadi (markaziy)
         ↓
Admin panel ikkalasidan ham ko'rsatadi
```

### Xavfsizlik

- Row Level Security (RLS) yoqilgan
- Barcha foydalanuvchilar faqat o'z ma'lumotlarini ko'radi
- Admin panel uchun alohida autentifikatsiya

---

## 📊 Ma'lumotlar Bazasi Strukturasi

### `users` jadvali
- `id` - Foydalanuvchi ID (auto)
- `name` - F.I.Sh
- `position` - Lavozim
- `jshir` - JSHSHIR (unique)
- `phone` - Telefon
- `photo` - Rasm (base64)
- `created_at` - Yaratilgan vaqt

### `questions` jadvali
- `id` - Savol ID (auto)
- `direction` - Yo'nalish
- `question_text` - Savol matni
- `option_a`, `option_b`, `option_c`, `option_d` - Variantlar
- `correct_answer` - To'g'ri javob (A/B/C/D)
- `difficulty` - Qiyinlik (easy/medium/hard)

### `exam_results` jadvali
- `id` - Natija ID (auto)
- `user_id` - Foydalanuvchi ID (foreign key)
- `name`, `position`, `jshir`, `phone` - Foydalanuvchi ma'lumotlari
- `direction` - Yo'nalish
- `total_questions` - Jami savollar
- `correct_answers` - To'g'ri javoblar
- `percentage` - Foiz
- `passed` - O'tdi/Yiqildi
- `tab_switches` - Tab almashtirishlar soni
- `duration_seconds` - Davomiyligi (soniyalarda)
- `detailed_answers` - Batafsil javoblar (JSON)
- `exam_date` - Imtihon sanasi

---

## 🐛 Muammolarni Hal Qilish

### Agar Supabase ulanmasa:

1. Browser Console ni oching (F12)
2. Xatolarni o'qing
3. Keng uchraydigan muammolar:
   - ❌ `SUPABASE_URL` yoki `SUPABASE_ANON_KEY` noto'g'ri
   - ❌ SQL kodlar to'liq bajarilmagan
   - ❌ RLS sozlamalari noto'g'ri

### Agar ma'lumotlar saqlanmasa:

1. Supabase Dashboard → **Table Editor** ga o'ting
2. Jadvallar mavjudligini tekshiring
3. Browser Console da xatolarni ko'ring
4. `SUPABASE_SETUP.md` dagi SQL kodlarni qayta bajaring

### Agar savollar yuklanmasa:

1. Admin panel → Savollar Banki ga o'ting
2. Yangi savol qo'shing
3. Browser Console da `✅ Savol Supabase ga qo'shildi` xabarini tekshiring
4. Sahifani yangilang (F5)

---

## 📞 Yordam

Agar muammo yuzaga kelsa:

1. Browser Console (F12) ni oching
2. Xatolarni screenshot qiling
3. Supabase Dashboard → **Logs** ga o'ting
4. Xatolarni tekshiring

---

## ✨ Qo'shimcha Imkoniyatlar

Kelajakda qo'shish mumkin:

- 📧 Email orqali natijalarni yuborish
- 📊 Real-time statistika
- 👥 Foydalanuvchilar boshqaruvi
- 🔐 Admin autentifikatsiyasi (Supabase Auth)
- 📱 Mobile app (React Native)
- 🌐 Ko'p tilli interfeys
- 📈 Tahlil va hisobotlar

---

**Muvaffaqiyatlar! 🚀**

Agar savollar bo'lsa, `SUPABASE_SETUP.md` faylini qayta o'qing yoki Supabase dokumentatsiyasiga murojaat qiling: https://supabase.com/docs
