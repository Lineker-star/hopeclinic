-- =====================================================
-- HOPE CLINIC KOUMÉ — COMPLETE SUPABASE SCHEMA
-- Run this in your Supabase SQL editor
-- =====================================================

-- ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin', -- 'super_admin' | 'admin'
  permissions   JSONB DEFAULT '{}',
  is_active     BOOLEAN DEFAULT true,
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- OTP SESSIONS
CREATE TABLE IF NOT EXISTS otp_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id   UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  otp_code   TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_used    BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWS BAR
CREATE TABLE IF NOT EXISTS news_bar (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content     TEXT NOT NULL,
  content_fr  TEXT, content_es TEXT, content_ar TEXT,
  content_zh  TEXT, content_pt TEXT, content_de TEXT,
  is_active   BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                     TEXT UNIQUE NOT NULL,
  name                     TEXT NOT NULL,
  name_translations        JSONB DEFAULT '{}',
  description              TEXT,
  description_translations JSONB DEFAULT '{}',
  hod_name                 TEXT, hod_title TEXT, hod_image_url TEXT, hod_bio TEXT,
  icon_name                TEXT, image_url TEXT, color TEXT,
  features                 TEXT[] DEFAULT '{}',
  stats                    JSONB DEFAULT '{}',
  is_active                BOOLEAN DEFAULT true,
  order_index              INT DEFAULT 0,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id            UUID REFERENCES departments(id) ON DELETE CASCADE,
  name                     TEXT NOT NULL,
  name_translations        JSONB DEFAULT '{}',
  description              TEXT,
  description_translations JSONB DEFAULT '{}',
  is_active                BOOLEAN DEFAULT true,
  order_index              INT DEFAULT 0,
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- DOCTORS
CREATE TABLE IF NOT EXISTS doctors (
  id                         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                       TEXT NOT NULL,
  title_prefix               TEXT DEFAULT 'Dr.',
  role                       TEXT NOT NULL,
  role_translations          JSONB DEFAULT '{}',
  specialization             TEXT,
  specialization_translations JSONB DEFAULT '{}',
  bio                        TEXT,
  bio_translations           JSONB DEFAULT '{}',
  image_url                  TEXT, cv_url TEXT,
  department_id              UUID REFERENCES departments(id),
  qualifications             TEXT[] DEFAULT '{}',
  languages                  TEXT[] DEFAULT '{}',
  experience_years           INT,
  available_days             TEXT[] DEFAULT '{}',
  email TEXT, phone TEXT, facebook_url TEXT, linkedin_url TEXT,
  is_featured                BOOLEAN DEFAULT false,
  is_active                  BOOLEAN DEFAULT true,
  order_index                INT DEFAULT 0,
  created_at                 TIMESTAMPTZ DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ DEFAULT NOW()
);

-- STAFF
CREATE TABLE IF NOT EXISTS staff (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  title               TEXT NOT NULL,
  title_translations  JSONB DEFAULT '{}',
  category            TEXT NOT NULL,
  department          TEXT, image_url TEXT, bio TEXT,
  bio_translations    JSONB DEFAULT '{}',
  is_active           BOOLEAN DEFAULT true,
  order_index         INT DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                   TEXT UNIQUE NOT NULL,
  title                  TEXT NOT NULL,
  title_translations     JSONB DEFAULT '{}',
  excerpt                TEXT,
  excerpt_translations   JSONB DEFAULT '{}',
  content                TEXT,
  content_translations   JSONB DEFAULT '{}',
  cover_image_url        TEXT,
  category               TEXT NOT NULL,
  tags                   TEXT[] DEFAULT '{}',
  author_name            TEXT, author_image_url TEXT,
  is_published           BOOLEAN DEFAULT false,
  is_featured            BOOLEAN DEFAULT false,
  published_at           TIMESTAMPTZ,
  reading_time_minutes   INT DEFAULT 5,
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY
CREATE TABLE IF NOT EXISTS gallery_items (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type                  TEXT DEFAULT 'image',
  url                   TEXT NOT NULL, thumbnail_url TEXT,
  caption               TEXT,
  caption_translations  JSONB DEFAULT '{}',
  category              TEXT NOT NULL,
  date_taken            DATE,
  is_active             BOOLEAN DEFAULT true,
  order_index           INT DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- HOPE CLINIC NETWORK LOCATIONS
CREATE TABLE IF NOT EXISTS hope_clinic_locations (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                     TEXT NOT NULL,
  name_translations        JSONB DEFAULT '{}',
  city TEXT NOT NULL, country TEXT NOT NULL,
  region                   TEXT NOT NULL,
  latitude FLOAT NOT NULL, longitude FLOAT NOT NULL,
  year_founded             INT,
  status                   TEXT NOT NULL DEFAULT 'ACTIVE',
  description              TEXT,
  description_translations JSONB DEFAULT '{}',
  image_url TEXT, phone TEXT, address TEXT,
  is_hq                    BOOLEAN DEFAULT false,
  order_index              INT DEFAULT 0,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

-- APPOINTMENTS
CREATE TABLE IF NOT EXISTS appointments (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,
  patient_name     TEXT NOT NULL,
  patient_email    TEXT NOT NULL,
  patient_phone    TEXT, patient_country TEXT,
  doctor_id        UUID REFERENCES doctors(id),
  department_id    UUID REFERENCES departments(id),
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  reason           TEXT,
  status           TEXT DEFAULT 'PENDING',
  notes TEXT, admin_notes TEXT, user_id TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL, email TEXT NOT NULL,
  phone TEXT, subject TEXT, message TEXT NOT NULL,
  language    TEXT DEFAULT 'en',
  is_read     BOOLEAN DEFAULT false,
  is_replied  BOOLEAN DEFAULT false,
  admin_notes TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name         TEXT NOT NULL, patient_location TEXT,
  content              TEXT NOT NULL,
  content_translations JSONB DEFAULT '{}',
  rating               INT DEFAULT 5,
  image_url            TEXT,
  is_active            BOOLEAN DEFAULT true,
  is_featured          BOOLEAN DEFAULT false,
  order_index          INT DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- PARTNERS
CREATE TABLE IF NOT EXISTS partners (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL, logo_url TEXT, website_url TEXT, description TEXT,
  is_active   BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ──
ALTER TABLE admin_users          ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages     ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_news_bar"    ON news_bar             FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_departments" ON departments           FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_services"    ON services              FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_doctors"     ON doctors               FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_staff"       ON staff                 FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_posts"       ON blog_posts            FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_gallery"     ON gallery_items         FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_locations"   ON hope_clinic_locations FOR SELECT USING (true);
CREATE POLICY "public_read_testimonials"ON testimonials          FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_partners"    ON partners              FOR SELECT USING (is_active = true);
CREATE POLICY "public_insert_contact"   ON contact_messages      FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_appts"     ON appointments          FOR INSERT WITH CHECK (true);

-- ── Enable Realtime ──
ALTER PUBLICATION supabase_realtime ADD TABLE news_bar;
ALTER PUBLICATION supabase_realtime ADD TABLE blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE hope_clinic_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE doctors;
ALTER PUBLICATION supabase_realtime ADD TABLE gallery_items;

-- ── Supabase Storage bucket ──
-- Run this separately in Supabase dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('hope-clinic-media', 'hope-clinic-media', true);

-- ── Seed: Super Admin (change password after first login!) ──
-- Password below is bcrypt hash of: HopeAdmin2025!
-- Generate a new hash at: https://bcrypt.online/
INSERT INTO admin_users (email, password_hash, name, role) VALUES
  ('admin@hopeclinickoume.org', '$2b$10$placeholder_replace_with_real_bcrypt_hash', 'Hope Clinic Admin', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- ── Seed: Initial news bar items ──
INSERT INTO news_bar (content, order_index) VALUES
  ('🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated', 0),
  ('📅 Special Medical Campaign — June 2025 | Free consultations for vulnerable populations', 1),
  ('🌍 23 Health Campaigns completed | 15,726+ patients reached across the region', 2),
  ('🩺 New Mother & Child Pavilion (B4) now fully operational with Neonatal ICU', 3),
  ('📞 Emergency 24/7: +237 650 441 422 | WhatsApp: +237 650 441 422', 4),
  ('🏆 Hope Clinic eligible for Government Universal Health Coverage (CSU) programme', 5)
ON CONFLICT DO NOTHING;
