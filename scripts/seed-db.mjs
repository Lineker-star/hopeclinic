/**
 * Seed script — populates empty Supabase tables from seed data.
 * Run: node scripts/seed-db.mjs
 */

const SUPABASE_URL = 'https://ealvnhuxzqsdyzdnjmsw.supabase.co';
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbHZuaHV4enFzZHl6ZG5qbXN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQzNTc2MywiZXhwIjoyMDk2MDExNzYzfQ.N4BbK1FGv7GFcVCvQG7iDzr6WNwqFV2ky2cMCBqvj4M';

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates',
};

async function upsert(table, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`[${table}] ${res.status}: ${err}`);
  }
  return rows.length;
}

// ─── DEPARTMENTS ──────────────────────────────────────────────────────────────
// IDs: a0000000-0000-0000-0000-0000000000XX
const DEPT = {
  emergency:         'a0000000-0000-0000-0000-000000000001',
  icu:               'a0000000-0000-0000-0000-000000000002',
  surgery:           'a0000000-0000-0000-0000-000000000003',
  pediatrics:        'a0000000-0000-0000-0000-000000000004',
  cardiology:        'a0000000-0000-0000-0000-000000000005',
  gynecology:        'a0000000-0000-0000-0000-000000000006',
  internal_medicine: 'a0000000-0000-0000-0000-000000000007',
  laboratory:        'a0000000-0000-0000-0000-000000000008',
  radiology:         'a0000000-0000-0000-0000-000000000009',
  pharmacy:          'a0000000-0000-0000-0000-000000000010',
  maternity:         'a0000000-0000-0000-0000-000000000011',
  dental:            'a0000000-0000-0000-0000-000000000012',
  spiritual:         'a0000000-0000-0000-0000-000000000013',
  holistic:          'a0000000-0000-0000-0000-000000000014',
  mobile:            'a0000000-0000-0000-0000-000000000015',
};

const departments = [
  { id: DEPT.emergency,         slug: 'emergency',         name: 'Emergency Care',           description: '24/7 staffed emergency unit with triage, resuscitation, and rapid response teams ready for any medical crisis.', icon_name: 'AlertTriangle', image_url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop', is_active: true, order_index: 1 },
  { id: DEPT.icu,               slug: 'icu',               name: 'Intensive Care Unit',       description: 'Critical care facility with ventilator support, continuous monitoring, and specialist-led intensive treatment.', icon_name: 'Activity', image_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop', is_active: true, order_index: 2 },
  { id: DEPT.surgery,           slug: 'surgery',           name: 'Surgical Procedures',       description: 'Comprehensive surgical services including general surgery, caesarean sections, and minimally invasive procedures.', icon_name: 'Scissors', image_url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop', is_active: true, order_index: 3 },
  { id: DEPT.pediatrics,        slug: 'pediatrics',        name: 'Pediatrics',                description: 'Dedicated child health services including vaccinations, neonatal care, and specialized pediatric consultations.', icon_name: 'Baby', image_url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop', is_active: true, order_index: 4 },
  { id: DEPT.cardiology,        slug: 'cardiology',        name: 'Cardiology',                description: 'Advanced heart diagnostics, ECG, cardiac monitoring, and cardiovascular health management.', icon_name: 'Heart', image_url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&auto=format&fit=crop', is_active: true, order_index: 5 },
  { id: DEPT.gynecology,        slug: 'gynecology',        name: 'Gynecology & Obstetrics',   description: "Complete women's health services: prenatal care, safe delivery, postnatal care, and gynecological consultations.", icon_name: 'Users', image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop', is_active: true, order_index: 6 },
  { id: DEPT.internal_medicine, slug: 'internal-medicine', name: 'Internal Medicine',          description: 'General consultations, chronic disease management, and comprehensive internal medicine care.', icon_name: 'Stethoscope', image_url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&auto=format&fit=crop', is_active: true, order_index: 7 },
  { id: DEPT.laboratory,        slug: 'laboratory',        name: 'Laboratory & Diagnostics',  description: 'Modern diagnostic laboratory offering blood tests, urinalysis, pathology, and rapid test services.', icon_name: 'FlaskConical', image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop', is_active: true, order_index: 8 },
  { id: DEPT.radiology,         slug: 'radiology',         name: 'Radiology & Imaging',       description: 'Digital X-ray, ultrasound scanning, and advanced imaging services for accurate diagnosis.', icon_name: 'Scan', image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop', is_active: true, order_index: 9 },
  { id: DEPT.pharmacy,          slug: 'pharmacy',          name: 'Pharmacy',                  description: 'On-site pharmacy dispensing prescribed medications with qualified pharmacists available during working hours.', icon_name: 'Pill', image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop', is_active: true, order_index: 10 },
  { id: DEPT.maternity,         slug: 'maternity',         name: 'Maternity & Midwifery',     description: 'Safe maternity care including prenatal support, skilled delivery, and comprehensive postnatal services.', icon_name: 'HeartHandshake', image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop', is_active: true, order_index: 11 },
  { id: DEPT.dental,            slug: 'dental',            name: 'Dental Care',               description: 'Basic dental services including extractions, fillings, cleaning, and oral health education.', icon_name: 'Smile', image_url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&auto=format&fit=crop', is_active: true, order_index: 12 },
  { id: DEPT.spiritual,         slug: 'spiritual',         name: 'Hope Spiritual Clinic',     description: 'Prayer ministry, spiritual counseling, and holistic spiritual healing for patients and their families.', icon_name: 'BookOpen', image_url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&auto=format&fit=crop', is_active: true, order_index: 13 },
  { id: DEPT.holistic,          slug: 'holistic',          name: 'Hope Holistic Clinic',      description: 'Marital counseling, career guidance, family therapy, and comprehensive holistic wellbeing support.', icon_name: 'Leaf', image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop', is_active: true, order_index: 14 },
  { id: DEPT.mobile,            slug: 'mobile',            name: 'Hope Mobile Clinic',        description: 'Outreach medical campaigns bringing healthcare to remote communities across the East Region.', icon_name: 'Truck', image_url: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=600&auto=format&fit=crop', is_active: true, order_index: 15 },
];

// ─── DOCTORS ──────────────────────────────────────────────────────────────────
// Schema: id, name, title_prefix, role, specialization, bio, image_url, department_id,
//         qualifications[], languages[], experience_years, available_days[],
//         is_featured, is_active, order_index
const doctors = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    name: 'Ginette Bekolo', title_prefix: 'Dr.',
    role: 'General Practitioner & Medical Director',
    specialization: 'General Practice, Hospital Administration, Public Health',
    bio: 'Dr. Ginette Bekolo leads Hope Clinic Koumé with visionary dedication. Under her leadership since 2015, the clinic has grown from a 7-day inaugural campaign with ~100 patients into a 4-pavilion modern medical facility serving 800+ patients monthly with 87 dedicated staff.',
    image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop',
    department_id: DEPT.internal_medicine,
    qualifications: ['MD — Faculty of Medicine, University of Yaoundé I', 'Certificate in Hospital Administration', 'Diploma in Public Health & Community Medicine'],
    languages: ['French', 'English', 'Ewondo'],
    experience_years: 10,
    available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    is_featured: true, is_active: true, order_index: 1,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    name: 'Laura Enoh', title_prefix: 'Dr.',
    role: 'Pediatrician & Neonatologist',
    specialization: 'Pediatrics, Neonatal Care, Child Health',
    bio: "Dr. Laura Enoh specialises in paediatrics and neonatal care. She oversees the Mother & Child Pavilion (Building B4), managing the care of newborns including premature infants in the neonatal intensive care unit.",
    image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop',
    department_id: DEPT.pediatrics,
    qualifications: ['MD — Faculty of Medicine, University of Douala', 'Specialist Certificate in Paediatrics', 'Diploma in Neonatology & Neonatal Intensive Care'],
    languages: ['French', 'English', 'Bassa'],
    experience_years: 7,
    available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    is_featured: true, is_active: true, order_index: 2,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000003',
    name: 'Coulibaly', title_prefix: 'Dr.',
    role: 'Neurologist & Neurosurgeon',
    specialization: 'Neurology, Neurosurgery, Spinal Surgery',
    bio: "Dr. Coulibaly brings rare specialist neurological expertise to Hope Clinic Koumé. His work includes advanced neurological consultations and the clinic's landmark spinal neurosurgery procedure — one of the most advanced operations performed in the East Region of Cameroon.",
    image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop',
    department_id: null,
    qualifications: ['MD — University of Abidjan', 'Specialist Certificate in Neurology', 'Fellowship in Neurosurgery & Spinal Surgery', 'Training in Stroke Management'],
    languages: ['French', 'English', 'Dioula'],
    experience_years: 8,
    available_days: ['Tuesday', 'Wednesday', 'Thursday'],
    is_featured: true, is_active: true, order_index: 3,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000004',
    name: 'Emmanuel Nkoa', title_prefix: 'Dr.',
    role: 'General Surgeon',
    specialization: 'General Surgery, Trauma Surgery, Laparoscopic Surgery',
    bio: "Dr. Nkoa leads surgical operations at Hope Clinic Koumé, having performed hundreds of the clinic's 1,135 surgeries over 10 years including major abdominal surgery, emergency procedures, and caesarean sections.",
    image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop',
    department_id: DEPT.surgery,
    qualifications: ['MD — Faculty of Medicine, University of Yaoundé I', 'Fellowship in General & Digestive Surgery', 'Certificate in Laparoscopic Surgery', 'Trauma Surgery Training'],
    languages: ['French', 'English'],
    experience_years: 12,
    available_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    is_featured: false, is_active: true, order_index: 4,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000005',
    name: 'Marie-Claire Essomba', title_prefix: 'Dr.',
    role: 'Obstetrician-Gynecologist',
    specialization: 'Obstetrics, Gynecology, High-Risk Pregnancy',
    bio: 'Dr. Essomba has presided over hundreds of the 1,576 deliveries at Hope Clinic, providing expert prenatal care and ensuring safe births for mothers across the East Region.',
    image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop',
    department_id: DEPT.gynecology,
    qualifications: ['MD — Faculty of Medicine, University of Yaoundé II', 'Specialist Certificate in Obstetrics & Gynecology', 'Training in High-Risk Pregnancy Management'],
    languages: ['French', 'Ewondo'],
    experience_years: 9,
    available_days: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    is_featured: false, is_active: true, order_index: 5,
  },
  {
    id: 'b0000000-0000-0000-0000-000000000006',
    name: 'Patrice Mbarga', title_prefix: 'Dr.',
    role: 'Cardiologist',
    specialization: 'Cardiology, Internal Medicine, Echocardiography, Pacemaker Implantation',
    bio: 'Dr. Mbarga is responsible for cardiac care at Hope Clinic Koumé, including the landmark successful implantation of 2 pacemakers (2018 and 2020) — a remarkable achievement for a regional clinic in the East Region.',
    image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&auto=format&fit=crop',
    department_id: DEPT.cardiology,
    qualifications: ['MD — Faculty of Medicine, University of Yaoundé I', 'Specialist Certificate in Cardiology', 'Diploma in Echocardiography & Cardiac Imaging', 'Pacemaker Implantation Training — France'],
    languages: ['French', 'English', 'Beti'],
    experience_years: 11,
    available_days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    is_featured: false, is_active: true, order_index: 6,
  },
];

// ─── STAFF ────────────────────────────────────────────────────────────────────
// Schema: id, name, title, category, department, image_url, bio, is_active, order_index
const staff = [
  // All objects have identical keys: id, name, title, category, department, image_url, bio, is_active, order_index
  { id: 'c0000000-0000-0000-0000-000000000001', name: 'Dr. Ginette Bekolo',    title: 'Director / Médecin Directrice',         category: 'TOP_ADMINISTRATION', department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Founding Director of Hope Clinic Koumé since 2015.', is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000002', name: 'Jean-Pierre Mbarga',    title: 'Deputy Director & Medical Supervisor',  category: 'TOP_ADMINISTRATION', department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Oversees medical operations and quality assurance across all departments.', is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000003', name: 'Claudine Nkomo',        title: 'Administrative Director',               category: 'TOP_ADMINISTRATION', department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Manages administrative operations, HR, and institutional partnerships.', is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000004', name: 'Jeannette Abena',       title: 'Head of Nursing',                       category: 'TOP_ADMINISTRATION', department: 'Nursing',                 image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Leads the nursing department with 15+ years of experience.', is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000005', name: 'Samuel Owona',          title: 'Financial Officer',                     category: 'TOP_ADMINISTRATION', department: 'Finance',                 image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Manages financial planning, accounting, and budget oversight.', is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000011', name: 'Dr. Laura Enoh',        title: 'Pediatrician & Neonatologist',          category: 'RESIDENT_DOCTORS',   department: 'Pediatrics & Neonatology',image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialist in child health and neonatal intensive care.', is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000012', name: 'Dr. Coulibaly',         title: 'Neurologist & Neurosurgeon',            category: 'RESIDENT_DOCTORS',   department: 'Neurology',               image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Expert in neurological disorders and spinal surgery.', is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000013', name: 'Dr. Marie-Claire Essomba', title: 'Obstetrician-Gynecologist',          category: 'RESIDENT_DOCTORS',   department: 'Gynecology & Maternity',  image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: "Specialist in obstetrics and women's health.", is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000014', name: 'Dr. Emmanuel Nkoa',     title: 'General Surgeon',                       category: 'RESIDENT_DOCTORS',   department: 'Surgery',                 image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Leads surgical operations with 12+ years of experience.', is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000015', name: 'Dr. Patrice Mbarga',    title: 'Cardiologist',                          category: 'RESIDENT_DOCTORS',   department: 'Cardiology',              image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Specialist in cardiology, including pacemaker implantation.', is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000016', name: 'Dr. Alphonse Biyong',   title: 'Internal Medicine Specialist',          category: 'RESIDENT_DOCTORS',   department: 'Internal Medicine',       image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Expert in chronic disease management and adult consultations.', is_active: true, order_index: 6 },
  { id: 'c0000000-0000-0000-0000-000000000017', name: 'Dr. Sandrine Atangana', title: 'Emergency Physician',                   category: 'RESIDENT_DOCTORS',   department: 'Emergency Care',          image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Dedicated to 24/7 emergency and critical care management.', is_active: true, order_index: 7 },
  { id: 'c0000000-0000-0000-0000-000000000018', name: 'Dr. Ibrahim Diallo',    title: 'Radiologist',                           category: 'RESIDENT_DOCTORS',   department: 'Radiology & Imaging',     image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialist in diagnostic imaging and ultrasound.', is_active: true, order_index: 8 },
  { id: 'c0000000-0000-0000-0000-000000000021', name: 'Marguerite Bella',      title: 'Senior Nurse — Emergency Ward',         category: 'MAIN_NURSES',        department: 'Emergency Care',          image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000022', name: 'Yvonne Essama',         title: 'Senior Nurse — Pediatric Ward',         category: 'MAIN_NURSES',        department: 'Pediatrics',              image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000023', name: 'Patricia Manga',        title: 'Senior Nurse — Medical Ward',           category: 'MAIN_NURSES',        department: 'Internal Medicine',       image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000024', name: 'Célestine Ndoumbe',     title: 'ICU Head Nurse',                        category: 'MAIN_NURSES',        department: 'ICU',                     image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000025', name: 'Angèle Fouda',          title: 'Surgical Ward Nurse',                   category: 'MAIN_NURSES',        department: 'Surgery',                 image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000026', name: 'Solange Ottou',         title: 'Maternity Head Nurse',                  category: 'MAIN_NURSES',        department: 'Maternity',               image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 6 },
  { id: 'c0000000-0000-0000-0000-000000000027', name: 'Véronique Ayissi',      title: 'Cardiology Nurse Specialist',           category: 'MAIN_NURSES',        department: 'Cardiology',              image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 7 },
  { id: 'c0000000-0000-0000-0000-000000000028', name: 'Clarisse Ekwalla',      title: 'Senior Nurse — General Ward',           category: 'MAIN_NURSES',        department: 'General',                 image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 8 },
  { id: 'c0000000-0000-0000-0000-000000000029', name: 'Béatrice Noa',          title: 'Neonatal Nurse Specialist',             category: 'MAIN_NURSES',        department: 'Neonatology',             image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 9 },
  { id: 'c0000000-0000-0000-0000-000000000030', name: 'Monique Abomo',         title: 'Head Nurse — Consultation',             category: 'MAIN_NURSES',        department: 'Outpatient',              image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 10 },
  { id: 'c0000000-0000-0000-0000-000000000031', name: 'Jacqueline Onana',      title: 'Senior Nurse — Gynecology',             category: 'MAIN_NURSES',        department: 'Gynecology',              image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 11 },
  { id: 'c0000000-0000-0000-0000-000000000032', name: 'Esther Eboa',           title: 'Community Health Nurse',                category: 'MAIN_NURSES',        department: 'Community Health',        image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 12 },
  { id: 'c0000000-0000-0000-0000-000000000041', name: 'Rose Mba',              title: 'Certified Midwife',                     category: 'MIDWIVES',           department: 'Maternity & Gynecology',  image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: '15 years of experience in safe deliveries and prenatal care.', is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000042', name: 'Cécile Abate',          title: 'Certified Midwife',                     category: 'MIDWIVES',           department: 'Maternity',               image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Specialised in high-risk pregnancy monitoring and postnatal support.', is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000043', name: 'Thérèse Ndi',           title: 'Certified Midwife',                     category: 'MIDWIVES',           department: 'Maternity',               image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Community midwife with expertise in traditional and modern birth practices.', is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000044', name: 'Henriette Bikele',      title: 'Sage-femme Principale',                 category: 'MIDWIVES',           department: 'Maternity',               image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Head midwife coordinating the maternity ward delivery team.', is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000045', name: 'Paulette Owono',        title: 'Certified Midwife',                     category: 'MIDWIVES',           department: 'Neonatal Ward',           image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Specialist in newborn care and neonatal unit management.', is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000046', name: 'Fatima Boukar',         title: 'Certified Midwife',                     category: 'MIDWIVES',           department: 'Antenatal Clinic',        image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Focuses on antenatal care, family planning, and prenatal education.', is_active: true, order_index: 6 },
  { id: 'c0000000-0000-0000-0000-000000000051', name: 'Bernadette Ako',        title: 'Auxiliary Nurse — Surgical',            category: 'AIDING_NURSES',      department: 'Surgery',                 image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000052', name: 'Henri Zoa',             title: 'Auxiliary Nurse — ICU',                 category: 'AIDING_NURSES',      department: 'ICU',                     image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000053', name: 'Angèle Ndongo',         title: 'Auxiliary Nurse — Outpatient',          category: 'AIDING_NURSES',      department: 'Outpatient',              image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000054', name: 'Marc Ondoua',           title: 'Laboratory Technician',                 category: 'AIDING_NURSES',      department: 'Laboratory',              image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000055', name: 'Christine Bello',       title: 'Pharmacy Technician',                   category: 'AIDING_NURSES',      department: 'Pharmacy',                image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000056', name: 'Eric Mvondo',           title: 'Radiology Technician',                  category: 'AIDING_NURSES',      department: 'Radiology',               image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 6 },
  { id: 'c0000000-0000-0000-0000-000000000057', name: 'Louise Nkengue',        title: 'Auxiliary Nurse — Medical',             category: 'AIDING_NURSES',      department: 'Internal Med.',           image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 7 },
  { id: 'c0000000-0000-0000-0000-000000000058', name: 'Paul Bilong',           title: 'Laboratory Technician',                 category: 'AIDING_NURSES',      department: 'Laboratory',              image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 8 },
  { id: 'c0000000-0000-0000-0000-000000000059', name: 'Irène Fokom',           title: 'Auxiliary Nurse — Maternity',           category: 'AIDING_NURSES',      department: 'Maternity',               image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 9 },
  { id: 'c0000000-0000-0000-0000-000000000060', name: 'David Mbida',           title: 'Auxiliary Nurse — Pediatrics',          category: 'AIDING_NURSES',      department: 'Pediatrics',              image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 10 },
  { id: 'c0000000-0000-0000-0000-000000000061', name: 'Anastasie Etoundi',     title: 'Auxiliary Nurse — Emergency',           category: 'AIDING_NURSES',      department: 'Emergency',               image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 11 },
  { id: 'c0000000-0000-0000-0000-000000000062', name: 'Fidèle Ango',           title: 'Lab Technician — Haematology',          category: 'AIDING_NURSES',      department: 'Laboratory',              image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 12 },
  { id: 'c0000000-0000-0000-0000-000000000063', name: 'Mireille Ateba',        title: 'Auxiliary Nurse — Cardiology',          category: 'AIDING_NURSES',      department: 'Cardiology',              image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 13 },
  { id: 'c0000000-0000-0000-0000-000000000064', name: 'Colette Biyongo',       title: 'Auxiliary Nurse — Gynecology',          category: 'AIDING_NURSES',      department: 'Gynecology',              image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 14 },
  { id: 'c0000000-0000-0000-0000-000000000065', name: 'Albert Owona',          title: 'Sterilisation Technician',              category: 'AIDING_NURSES',      department: 'Surgical Block',          image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 15 },
  { id: 'c0000000-0000-0000-0000-000000000071', name: 'Florence Ateba',        title: 'Head Receptionist',                     category: 'SUPPORT_STAFF',      department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'First point of contact for all patients — warm and efficient.', is_active: true, order_index: 1 },
  { id: 'c0000000-0000-0000-0000-000000000072', name: 'Gaston Ngoue',          title: 'IT & Communications Officer',           category: 'SUPPORT_STAFF',      department: 'IT',                      image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 2 },
  { id: 'c0000000-0000-0000-0000-000000000073', name: 'Madeleine Beti',        title: 'Administrative Clerk',                  category: 'SUPPORT_STAFF',      department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 3 },
  { id: 'c0000000-0000-0000-0000-000000000074', name: 'Pastor Emmanuel',       title: 'Chaplain / Spiritual Counsellor',       category: 'SUPPORT_STAFF',      department: 'Spiritual Clinic',        image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Leads the spiritual and pastoral care ministry for patients and staff.', is_active: true, order_index: 4 },
  { id: 'c0000000-0000-0000-0000-000000000075', name: 'Jean Mendoua',          title: 'Head of Security',                      category: 'SUPPORT_STAFF',      department: 'Security',                image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 5 },
  { id: 'c0000000-0000-0000-0000-000000000076', name: 'Sylvie Oto',            title: 'Head of Catering & Nutrition',          category: 'SUPPORT_STAFF',      department: 'Nutrition',               image_url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 6 },
  { id: 'c0000000-0000-0000-0000-000000000077', name: 'Robert Abah',           title: 'Maintenance Supervisor',                category: 'SUPPORT_STAFF',      department: 'Maintenance',             image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 7 },
  { id: 'c0000000-0000-0000-0000-000000000078', name: 'Viviane Akoa',          title: 'Social Worker',                         category: 'SUPPORT_STAFF',      department: 'Holistic Clinic',         image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Supports patients and families through social challenges and crises.', is_active: true, order_index: 8 },
  { id: 'c0000000-0000-0000-0000-000000000079', name: 'Thomas Essono',         title: 'Driver & Logistics',                    category: 'SUPPORT_STAFF',      department: 'Logistics',               image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: null, is_active: true, order_index: 9 },
  { id: 'c0000000-0000-0000-0000-000000000080', name: 'Hélène Mbazoa',         title: 'Patient Liaison Officer',               category: 'SUPPORT_STAFF',      department: 'Administration',          image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Bridges communication between patients, families, and medical staff.', is_active: true, order_index: 10 },
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
const blogPosts = [
  { id: 'd0000000-0000-0000-0000-000000000001', slug: 'hope-clinic-bertoua-special-medical-campaign-2025', title: 'HOPE CLINIC BERTOUA — Special Medical Campaign!', excerpt: 'Theme: The Merciful Compassion of God. Join us for our special medical campaign bringing free healthcare consultations, diagnostics, and treatment to the Bertoua community.', content: '# HOPE CLINIC BERTOUA — Special Medical Campaign\n\n**Theme: "The Merciful Compassion of God"**\n\nHope Clinic Koumé is proud to announce our upcoming Special Medical Campaign.\n\n## What We\'re Offering\n\n- Free general medical consultations\n- Free laboratory tests for common conditions\n- Free vaccinations for children and adults\n- Free prenatal consultations for expectant mothers\n\n**Date:** 17–21 June 2025 | **Location:** Hope Clinic Koumé, Bertoua\n\n*"Come to us and we will care for you — because every life is precious in the eyes of God."*\n\n**Contact:** +237 650 441 422', cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop', category: 'Events & Campaigns', tags: ['campaign', 'free healthcare', 'community', 'Bertoua'], author_name: 'Hope Clinic Koumé', author_image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop', is_published: true, is_featured: true, published_at: '2025-06-10T08:00:00Z', reading_time_minutes: 3 },
  { id: 'd0000000-0000-0000-0000-000000000002', slug: 'world-sickle-cell-awareness-day-june-19-2025', title: 'World Sickle Cell Awareness Day — June 19, 2025', excerpt: 'Hope Clinic Koumé joins the world in raising awareness about sickle cell disease — offering free screenings and counselling.', content: '# World Sickle Cell Awareness Day — June 19, 2025\n\nEvery year on June 19th, the world unites to raise awareness about sickle cell disease.\n\n## Free Sickle Cell Screening at Hope Clinic\n\nOn June 19th, Hope Clinic Koumé will offer:\n- Free sickle cell electrophoresis testing\n- Free haematology screening (31-parameter blood count via URIT 5160)\n- Genetic counselling for couples planning families\n\n**Date:** June 19, 2025 | **Hours:** 8:00 AM – 2:00 PM\n\n*"For where there is life, there is hope." — ZTF*', cover_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop', category: 'Health Awareness', tags: ['sickle cell', 'blood disorders', 'awareness', 'free screening'], author_name: 'Hope Clinic Medical Team', author_image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop', is_published: true, is_featured: false, published_at: '2025-06-08T08:00:00Z', reading_time_minutes: 4 },
  { id: 'd0000000-0000-0000-0000-000000000003', slug: 'world-blood-donor-day-june-14-2025', title: 'World Blood Donor Day — June 14, 2025: Give Blood, Give Life', excerpt: 'On World Blood Donor Day, Hope Clinic Koumé calls on healthy community members to donate life-saving blood.', content: '# World Blood Donor Day — June 14, 2025\n\nJune 14th marks World Blood Donor Day. This year\'s theme: **"Thank you, blood donors!"**\n\n## Hope Clinic Blood Drive — June 14\n\n**Date:** June 14, 2025 | **Hours:** 8:00 AM – 2:00 PM\n\nAll donors receive:\n- Free full health screening\n- Refreshments after donation\n- Certificate of appreciation\n\n**Eligibility:** 18–65 years | Weight above 50kg | No recent illness', cover_image_url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop', category: 'Health Awareness', tags: ['blood donation', 'World Blood Donor Day', 'community health'], author_name: 'Hope Clinic Medical Team', author_image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&auto=format&fit=crop', is_published: true, is_featured: false, published_at: '2025-06-05T08:00:00Z', reading_time_minutes: 3 },
  { id: 'd0000000-0000-0000-0000-000000000004', slug: 'hope-clinic-koume-10-years-of-excellence', title: 'Hope Clinic Koumé — 10 Years of Healing Excellence', excerpt: '68,791 patients treated. 1,576 births. 1,135 surgeries. 87 staff. 4 buildings. We celebrate a decade of compassionate healthcare in the East Region of Cameroon.', content: '# Hope Clinic Koumé — 10 Years of Healing Excellence\n\nSince our founding in 2015, Hope Clinic Koumé has grown from a 7-day inaugural campaign into a 4-pavilion modern medical facility.\n\n## 10 Years by the Numbers\n\n| Milestone | Achievement |\n|-----------|-------------|\n| Total Patients | 68,791 |\n| Surgeries | 1,135 |\n| Births | 1,576 |\n| Staff | 87 |\n\n*"Ten years ago, we started with a vision, a calling, and God\'s grace."*\n\n**— Dr. Ginette Bekolo, Director**', cover_image_url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop', category: 'Clinic News', tags: ['anniversary', '10 years', 'milestone', 'celebration'], author_name: 'Dr. Ginette Bekolo', author_image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop', is_published: true, is_featured: false, published_at: '2025-01-15T08:00:00Z', reading_time_minutes: 5 },
  { id: 'd0000000-0000-0000-0000-000000000005', slug: 'fesidev-partnership-equipping-hope-clinic', title: 'FESIDEV Partnership: Equipping Hope Clinic for Excellence', excerpt: 'Multiple containers of state-of-the-art medical equipment have transformed Hope Clinic Koumé from a basic facility into a regional centre of excellence.', content: '# FESIDEV Partnership: Equipping Hope Clinic\n\nOne of the most remarkable stories in Hope Clinic\'s 10-year journey is the transformation through the extraordinary FESIDEV partnership.\n\n## What the Containers Brought\n\n- Advanced ultrasound machines\n- Biochemistry automat for full blood chemistry analysis\n- URIT 5160 — 31-parameter complete blood count machine\n- Electrophoresis chain for sickle cell detection\n\n*"The containers from FESIDEV are truly the hands of God equipping us to serve His people."*\n— Dr. Ginette Bekolo', cover_image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop', category: 'Partnerships', tags: ['FESIDEV', 'equipment', 'partnership', 'laboratory'], author_name: 'Hope Clinic Administration', author_image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop', is_published: true, is_featured: false, published_at: '2024-12-01T08:00:00Z', reading_time_minutes: 4 },
  { id: 'd0000000-0000-0000-0000-000000000006', slug: 'two-pacemakers-two-lives-saved', title: 'Two Pacemakers, Two Lives Saved: Our Cardiac Success Stories', excerpt: 'In 2018 and again in 2020, Hope Clinic Koumé achieved a remarkable feat — performing pacemaker implantations in the East Region of Cameroon.', content: '# Two Pacemakers, Two Lives Saved\n\nIn 2018, a patient with severe heart block was admitted to Hope Clinic. Under Dr. Patrice Mbarga\'s expert care, a pacemaker was successfully implanted. A life was saved.\n\nIn 2020, Hope Clinic performed its second pacemaker implantation — confirming a genuine cardiac capability in the East Region.\n\n*"Every heartbeat that continues because of our work is a testament to God\'s grace."*\n\n— Dr. Patrice Mbarga, Cardiologist', cover_image_url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&auto=format&fit=crop', category: 'Medical Achievements', tags: ['cardiology', 'pacemaker', 'surgery', 'achievement'], author_name: 'Dr. Patrice Mbarga', author_image_url: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=100&auto=format&fit=crop', is_published: true, is_featured: false, published_at: '2024-11-01T08:00:00Z', reading_time_minutes: 5 },
];

// ─── GALLERY ITEMS ────────────────────────────────────────────────────────────
// Schema: id, type, url, thumbnail_url, caption, category, date_taken, is_active, order_index
const galleryItems = [
  { id: 'e0000000-0000-0000-0000-000000000001', type: 'image', url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop', caption: 'Main Entrance — Hope Clinic Koumé',      category: 'facility',  is_active: true, order_index: 1 },
  { id: 'e0000000-0000-0000-0000-000000000002', type: 'image', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop', caption: 'Consultation Room',                       category: 'facility',  is_active: true, order_index: 2 },
  { id: 'e0000000-0000-0000-0000-000000000003', type: 'image', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop', caption: 'Modern Laboratory Equipment',             category: 'equipment', is_active: true, order_index: 3 },
  { id: 'e0000000-0000-0000-0000-000000000004', type: 'image', url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&fit=crop', caption: 'Surgical Theatre',                        category: 'facility',  is_active: true, order_index: 4 },
  { id: 'e0000000-0000-0000-0000-000000000005', type: 'image', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop', caption: 'Medical Campaign — Community Outreach',   category: 'campaigns', is_active: true, order_index: 5 },
  { id: 'e0000000-0000-0000-0000-000000000006', type: 'image', url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop', caption: 'Maternity & Neonatal Ward',               category: 'facility',  is_active: true, order_index: 6 },
  { id: 'e0000000-0000-0000-0000-000000000007', type: 'image', url: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&auto=format&fit=crop', caption: 'Blood Donation Campaign',                 category: 'campaigns', is_active: true, order_index: 7 },
  { id: 'e0000000-0000-0000-0000-000000000008', type: 'image', url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&auto=format&fit=crop', caption: 'Pediatrics Ward',                         category: 'facility',  is_active: true, order_index: 8 },
  { id: 'e0000000-0000-0000-0000-000000000009', type: 'image', url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop', caption: 'FESIDEV Equipment Delivery',              category: 'events',    is_active: true, order_index: 9 },
  { id: 'e0000000-0000-0000-0000-000000000010', type: 'image', url: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&auto=format&fit=crop', caption: 'Cardiology & ECG Unit',                   category: 'equipment', is_active: true, order_index: 10 },
  { id: 'e0000000-0000-0000-0000-000000000011', type: 'image', url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop', caption: 'Ultrasound & Imaging Suite',              category: 'equipment', is_active: true, order_index: 11 },
  { id: 'e0000000-0000-0000-0000-000000000012', type: 'image', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop', caption: 'Patient Recovery Ward',                   category: 'facility',  is_active: true, order_index: 12 },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Seeding Hope Clinic Koumé database...\n');
  try {
    const n1 = await upsert('departments',  departments);  console.log(`✓ departments:   ${n1} rows`);
    const n2 = await upsert('doctors',      doctors);      console.log(`✓ doctors:       ${n2} rows`);
    const n3 = await upsert('staff',        staff);        console.log(`✓ staff:         ${n3} rows`);
    const n4 = await upsert('blog_posts',   blogPosts);    console.log(`✓ blog_posts:    ${n4} rows`);
    const n5 = await upsert('gallery_items',galleryItems); console.log(`✓ gallery_items: ${n5} rows`);
    console.log('\nSeeding complete!');
  } catch (e) {
    console.error('\nSeed error:', e.message);
    process.exit(1);
  }
}

main();
