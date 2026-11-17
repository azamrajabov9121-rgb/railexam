-- ============================================================
-- RAILEXAM — bazani himoyalash (RLS)
-- Supabase Dashboard -> SQL Editor -> New query ga joylashtirib Run qiling.
-- Qayta ishga tushirish xavfsiz (idempotent).
--
-- Bu fayldan OLDIN Supabase'da admin foydalanuvchisi yaratilgan bo'lishi kerak:
-- Authentication -> Users -> Add user -> Create new user (Auto Confirm User belgilansin).
-- Pastdagi admins jadvaliga o'sha email yoziladi.
--
-- Natija:
--   imtihon topshiruvchi (anon) — savollarni o'qiydi, o'z natijasini yozadi, xodim sifatida ro'yxatdan o'tadi
--   admin (admins jadvalidagi email bilan kirgan) — hamma narsani ko'radi va o'zgartiradi
--   boshqa hech kim xodimlar, natijalar va 2-bosqich natijalarini o'qiy olmaydi
-- ============================================================

-- 1. Adminlar ro'yxati. Siyosat (policy) yo'q — API orqali hech kim o'qiy olmaydi.
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON admins FROM anon, authenticated;

INSERT INTO admins (email) VALUES ('admin@railexam.uz') ON CONFLICT DO NOTHING;

-- 2. Joriy foydalanuvchi adminmi
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
GRANT EXECUTE ON FUNCTION is_admin() TO anon, authenticated;

-- 3. Xodimni ro'yxatga olish. Imtihon topshiruvchi users jadvalini o'qiy olmaydi,
--    shuning uchun JSHSHIR bo'yicha qidirish va qo'shish shu funksiya ichida bo'ladi.
--    Mavjud xodimning ma'lumotlari o'zgartirilmaydi (begona odam birovning ismini almashtira olmasin).
CREATE OR REPLACE FUNCTION register_user(
  p_name TEXT, p_position TEXT, p_jshir TEXT, p_phone TEXT, p_photo TEXT
) RETURNS BIGINT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid BIGINT;
BEGIN
  IF coalesce(trim(p_jshir), '') = '' OR coalesce(trim(p_name), '') = '' THEN
    RAISE EXCEPTION 'Ism va JSHSHIR majburiy';
  END IF;
  SELECT id INTO uid FROM users WHERE jshir = trim(p_jshir) ORDER BY id LIMIT 1;
  IF uid IS NULL THEN
    INSERT INTO users (name, position, jshir, phone, photo)
    VALUES (trim(p_name), coalesce(p_position, ''), trim(p_jshir), coalesce(p_phone, ''), p_photo)
    RETURNING id INTO uid;
  END IF;
  RETURN uid;
END;
$$;
GRANT EXECUTE ON FUNCTION register_user(TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- 4. Eski "hamma uchun ochiq" siyosatlarning barchasini o'chirish
DO $$
DECLARE p RECORD;
BEGIN
  FOR p IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('users', 'questions', 'exam_results', 'phase2_questions', 'phase2_results', 'custom_directions')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE phase2_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE phase2_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_directions ENABLE ROW LEVEL SECURITY;

-- 5. Yangi siyosatlar
-- Xodimlar: faqat admin (imtihon topshiruvchi register_user orqali yozadi)
CREATE POLICY "admin_all" ON users FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Natijalar: imtihon topshiruvchi faqat qo'sha oladi, o'qish/o'zgartirish/o'chirish — faqat admin
CREATE POLICY "exam_insert" ON exam_results FOR INSERT
  WITH CHECK (percentage BETWEEN 0 AND 100 AND total_questions > 0);
CREATE POLICY "admin_all" ON exam_results FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Savollar, 2-bosqich savollari, yo'nalishlar: hamma o'qiydi (imtihon uchun kerak), faqat admin o'zgartiradi
CREATE POLICY "public_read" ON questions FOR SELECT USING (true);
CREATE POLICY "admin_all" ON questions FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "public_read" ON phase2_questions FOR SELECT USING (true);
CREATE POLICY "admin_all" ON phase2_questions FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "public_read" ON custom_directions FOR SELECT USING (true);
CREATE POLICY "admin_all" ON custom_directions FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- 2-bosqich natijalari (javob varag'i fayllari bilan): faqat admin
CREATE POLICY "admin_all" ON phase2_results FOR ALL USING (is_admin()) WITH CHECK (is_admin());
