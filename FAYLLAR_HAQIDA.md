# 📁 YARATILGAN FAYLLAR VA ULARNING VAZIFASI

## 🎯 Asosiy Fayllar

### 1. `supabase-config.js` ⚙️
**Vazifasi**: Supabase bilan bog'lanish va database operatsiyalari

**Nima qiladi:**
- Supabase client yaratadi
- Database bilan ishlash uchun funksiyalar:
  - `DB.createUser()` - Foydalanuvchi yaratish
  - `DB.getAllQuestions()` - Barcha savollarni olish
  - `DB.createExamResult()` - Natijani saqlash
  - va boshqalar...

**Siz nima qilishingiz kerak:**
```javascript
// Faqat shu 2 ta qatorni o'zgartiring:
const SUPABASE_URL = 'https://xxxxx.supabase.co';  // 👈 O'zingizniki
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // 👈 O'zingizniki
```

---

### 2. `supabase-integration.js` 🔗
**Vazifasi**: Frontend (script.js) ni Supabase bilan bog'laydi

**Nima qiladi:**
- `saveExamResultToSupabase()` - Imtihon natijasini saqlaydi
- `loadQuestionsFromSupabase()` - Savollarni yuklaydi
- `loadResultsFromSupabase()` - Natijalarni yuklaydi
- `initializeSupabaseData()` - Sahifa ochilganda ma'lumotlarni yuklaydi

**Siz nima qilishingiz kerak:**
❌ Hech narsa! Bu fayl avtomatik ishlaydi.

---

### 3. `index.html` 🌐
**Vazifasi**: Asosiy HTML sahifa

**Nima o'zgardi:**
```html
<!-- Qo'shilgan qatorlar: -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
<script src="supabase-integration.js"></script>
```

**Siz nima qilishingiz kerak:**
❌ Hech narsa! Allaqachon qo'shilgan.

---

### 4. `script.js` 📜
**Vazifasi**: Asosiy JavaScript logika

**Nima o'zgardi:**
- `submitExam()` funksiyasi - endi Supabase ga ham saqlaydi
- `saveQ()` funksiyasi - savollarni Supabase ga qo'shadi
- `deleteQ()` funksiyasi - savollarni Supabase dan o'chiradi
- `deleteResult()` funksiyasi - natijalarni Supabase dan o'chiradi
- `window.addEventListener('load')` - Supabase dan ma'lumotlarni yuklaydi

**Siz nima qilishingiz kerak:**
❌ Hech narsa! Allaqachon o'zgartirilgan.

---

## 📚 Qo'llanma Fayllar

### 5. `SUPABASE_SETUP.md` 📖
**Vazifasi**: SQL kodlar va ma'lumotlar bazasi strukturasi

**Ichida:**
- 3 ta jadval uchun SQL kodlar
- Row Level Security sozlamalari
- Index'lar va optimizatsiya

**Qachon kerak:**
- Supabase da jadvallar yaratishda
- SQL kodlarni nusxalashda

---

### 6. `SUPABASE_BOSQICHMA_BOSQICH.md` 📋
**Vazifasi**: Batafsil qo'llanma (boshlang'ichlar uchun)

**Ichida:**
- Har bir qadam screenshot bilan tushuntirilgan
- Muammolar va yechimlar
- Test qilish yo'llari

**Qachon kerak:**
- Birinchi marta Supabase ishlatayotganingizda
- Muammo yuzaga kelganda

---

### 7. `QISQACHA_YORIQNOMA.md` ⚡
**Vazifasi**: Qisqa va aniq ko'rsatmalar

**Ichida:**
- 6 ta qadam
- Faqat kerakli SQL kodlar
- Tezkor tekshirish jadvali

**Qachon kerak:**
- Tez sozlash uchun
- Qayta sozlashda

---

### 8. `README_SUPABASE.md` 📘
**Vazifasi**: Umumiy ma'lumot va texnik tafsilotlar

**Ichida:**
- Qanday ishlaydi?
- Ma'lumotlar bazasi strukturasi
- Muammolarni hal qilish
- Kelajakdagi imkoniyatlar

**Qachon kerak:**
- Tizimni tushunish uchun
- Texnik ma'lumotlar kerak bo'lganda

---

## 🎬 QAYSI FAYLDAN BOSHLASH KERAK?

### Agar birinchi marta Supabase ishlatayotgan bo'lsangiz:
1. ✅ `SUPABASE_BOSQICHMA_BOSQICH.md` ni oching
2. ✅ Har bir qadamni ketma-ket bajaring
3. ✅ SQL kodlarni `SUPABASE_SETUP.md` dan nusxalang

### Agar tajribangiz bo'lsa:
1. ✅ `QISQACHA_YORIQNOMA.md` ni oching
2. ✅ 6 ta qadamni tez bajaring
3. ✅ `supabase-config.js` ni sozlang

---

## 🔄 QANDAY ISHLAYDI?

```
┌─────────────────────────────────────────────────────┐
│  1. Foydalanuvchi imtihon topshiradi                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  2. script.js → submitExam() funksiyasi chaqiriladi │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  3. Ma'lumotlar LocalStorage ga saqlanadi (tezkor)  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  4. supabase-integration.js →                       │
│     saveExamResultToSupabase() chaqiriladi          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  5. supabase-config.js → DB.createExamResult()      │
│     Supabase ga yuboradi                            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  6. Supabase ma'lumotlarni saqlaydi                 │
│     (exam_results jadvaliga)                        │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  7. Console da: ✅ Natija Supabase ga saqlandi      │
└─────────────────────────────────────────────────────┘
```

---

## ✅ TEKSHIRISH RO'YXATI

Quyidagi savollarni o'zingizga bering:

- [ ] Supabase akkauntim bormi?
- [ ] Loyiha yaratdimmi? (`railexam`)
- [ ] 3 ta jadval yaratdimmi? (users, questions, exam_results)
- [ ] API kalitlarni oldimmi?
- [ ] `supabase-config.js` ni o'zgartirdimmi?
- [ ] Faylni saqladimmi? (Ctrl+S)
- [ ] Brauzerda test qildimmi?
- [ ] Console da "✅ Supabase..." xabarini ko'rdimmi?

Agar hammasi ✅ bo'lsa - TAYYOR! 🎉

---

## 🆘 YORDAM KERAKMI?

### Qaysi faylni ochish kerak?

| Vazifa | Fayl |
|--------|------|
| Birinchi marta sozlash | `SUPABASE_BOSQICHMA_BOSQICH.md` |
| Tez sozlash | `QISQACHA_YORIQNOMA.md` |
| SQL kodlar kerak | `SUPABASE_SETUP.md` |
| Muammo yuzaga keldi | `SUPABASE_BOSQICHMA_BOSQICH.md` (oxirgi bo'lim) |
| Tizimni tushunish | `README_SUPABASE.md` |
| API kalitlarni o'zgartirish | `supabase-config.js` |

---

## 🎯 KEYINGI QADAM

1. ✅ `SUPABASE_BOSQICHMA_BOSQICH.md` ni oching
2. ✅ QADAM 1 dan boshlang
3. ✅ Har bir qadamni ketma-ket bajaring
4. ✅ Muammo bo'lsa - o'sha faylning oxirida "Muammolar va Yechimlar" bo'limi bor

**Omad! Agar savollar bo'lsa - so'rang! 🚀**
