import type { StaffMember } from '@/types';

export const staff: StaffMember[] = [
  // TOP ADMINISTRATION (5)
  { id: 'a1', name: 'Dr. Ginette Bekolo',    title: 'Director / Médecin Directrice',         category: 'TOP_ADMINISTRATION', department: 'Administration',     imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Founding Director of Hope Clinic Koumé since 2015.', isActive: true, order: 1 },
  { id: 'a2', name: 'Jean-Pierre Mbarga',    title: 'Deputy Director & Medical Supervisor',  category: 'TOP_ADMINISTRATION', department: 'Administration',     imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Oversees medical operations and quality assurance across all departments.', isActive: true, order: 2 },
  { id: 'a3', name: 'Claudine Nkomo',        title: 'Administrative Director',               category: 'TOP_ADMINISTRATION', department: 'Administration',     imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Manages administrative operations, HR, and institutional partnerships.', isActive: true, order: 3 },
  { id: 'a4', name: 'Jeannette Abena',       title: 'Head of Nursing',                       category: 'TOP_ADMINISTRATION', department: 'Nursing',           imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Leads the nursing department with 15+ years of experience.', isActive: true, order: 4 },
  { id: 'a5', name: 'Samuel Owona',          title: 'Financial Officer',                     category: 'TOP_ADMINISTRATION', department: 'Finance',           imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Manages financial planning, accounting, and budget oversight.', isActive: true, order: 5 },

  // RESIDENT DOCTORS (8)
  { id: 'd1', name: 'Dr. Laura Enoh',             title: 'Pediatrician & Neonatologist',     category: 'RESIDENT_DOCTORS', department: 'Pediatrics & Neonatology',  imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialist in child health and neonatal intensive care.', isActive: true, order: 1 },
  { id: 'd2', name: 'Dr. Coulibaly',              title: 'Neurologist & Neurosurgeon',       category: 'RESIDENT_DOCTORS', department: 'Neurology',                 imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Expert in neurological disorders and spinal surgery.', isActive: true, order: 2 },
  { id: 'd3', name: 'Dr. Marie-Claire Essomba',   title: 'Obstetrician-Gynecologist',        category: 'RESIDENT_DOCTORS', department: 'Gynecology & Maternity',    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Specialist in obstetrics and women\'s health.', isActive: true, order: 3 },
  { id: 'd4', name: 'Dr. Emmanuel Nkoa',          title: 'General Surgeon',                  category: 'RESIDENT_DOCTORS', department: 'Surgery',                   imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Leads surgical operations with 12+ years of experience.', isActive: true, order: 4 },
  { id: 'd5', name: 'Dr. Patrice Mbarga',         title: 'Cardiologist',                     category: 'RESIDENT_DOCTORS', department: 'Cardiology',                imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Specialist in cardiology, including pacemaker implantation.', isActive: true, order: 5 },
  { id: 'd6', name: 'Dr. Alphonse Biyong',        title: 'Internal Medicine Specialist',     category: 'RESIDENT_DOCTORS', department: 'Internal Medicine',         imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Expert in chronic disease management and adult consultations.', isActive: true, order: 6 },
  { id: 'd7', name: 'Dr. Sandrine Atangana',      title: 'Emergency Physician',              category: 'RESIDENT_DOCTORS', department: 'Emergency Care',            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Dedicated to 24/7 emergency and critical care management.', isActive: true, order: 7 },
  { id: 'd8', name: 'Dr. Ibrahim Diallo',         title: 'Radiologist',                      category: 'RESIDENT_DOCTORS', department: 'Radiology & Imaging',       imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialist in diagnostic imaging and ultrasound.', isActive: true, order: 8 },

  // MAIN NURSES (12)
  { id: 'n1', name: 'Marguerite Bella',    title: 'Senior Nurse — Emergency Ward',    category: 'MAIN_NURSES', department: 'Emergency Care',       imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', isActive: true, order: 1 },
  { id: 'n2', name: 'Yvonne Essama',      title: 'Senior Nurse — Pediatric Ward',    category: 'MAIN_NURSES', department: 'Pediatrics',            imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 2 },
  { id: 'n3', name: 'Patricia Manga',     title: 'Senior Nurse — Medical Ward',      category: 'MAIN_NURSES', department: 'Internal Medicine',     imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 3 },
  { id: 'n4', name: 'Célestine Ndoumbe',  title: 'ICU Head Nurse',                   category: 'MAIN_NURSES', department: 'ICU',                   imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 4 },
  { id: 'n5', name: 'Angèle Fouda',       title: 'Surgical Ward Nurse',              category: 'MAIN_NURSES', department: 'Surgery',               imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', isActive: true, order: 5 },
  { id: 'n6', name: 'Solange Ottou',      title: 'Maternity Head Nurse',             category: 'MAIN_NURSES', department: 'Maternity',             imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 6 },
  { id: 'n7', name: 'Véronique Ayissi',   title: 'Cardiology Nurse Specialist',      category: 'MAIN_NURSES', department: 'Cardiology',            imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 7 },
  { id: 'n8', name: 'Clarisse Ekwalla',   title: 'Senior Nurse — General Ward',      category: 'MAIN_NURSES', department: 'General',               imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 8 },
  { id: 'n9', name: 'Béatrice Noa',       title: 'Neonatal Nurse Specialist',        category: 'MAIN_NURSES', department: 'Neonatology',           imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', isActive: true, order: 9 },
  { id: 'n10', name: 'Monique Abomo',     title: 'Head Nurse — Consultation',        category: 'MAIN_NURSES', department: 'Outpatient',            imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 10 },
  { id: 'n11', name: 'Jacqueline Onana',  title: 'Senior Nurse — Gynecology',        category: 'MAIN_NURSES', department: 'Gynecology',            imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 11 },
  { id: 'n12', name: 'Esther Eboa',       title: 'Community Health Nurse',           category: 'MAIN_NURSES', department: 'Community Health',      imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 12 },

  // MIDWIVES (6)
  { id: 'm1', name: 'Rose Mba',         title: 'Certified Midwife',         category: 'MIDWIVES', department: 'Maternity & Gynecology', imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: '15 years of experience in safe deliveries and prenatal care.', isActive: true, order: 1 },
  { id: 'm2', name: 'Cécile Abate',     title: 'Certified Midwife',         category: 'MIDWIVES', department: 'Maternity',             imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Specialised in high-risk pregnancy monitoring and postnatal support.', isActive: true, order: 2 },
  { id: 'm3', name: 'Thérèse Ndi',      title: 'Certified Midwife',         category: 'MIDWIVES', department: 'Maternity',             imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Community midwife with expertise in traditional and modern birth practices.', isActive: true, order: 3 },
  { id: 'm4', name: 'Henriette Bikele', title: 'Sage-femme Principale',     category: 'MIDWIVES', department: 'Maternity',             imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Head midwife coordinating the maternity ward delivery team.', isActive: true, order: 4 },
  { id: 'm5', name: 'Paulette Owono',   title: 'Certified Midwife',         category: 'MIDWIVES', department: 'Neonatal Ward',         imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Specialist in newborn care and neonatal unit management.', isActive: true, order: 5 },
  { id: 'm6', name: 'Fatima Boukar',    title: 'Certified Midwife',         category: 'MIDWIVES', department: 'Antenatal Clinic',      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Focuses on antenatal care, family planning, and prenatal education.', isActive: true, order: 6 },

  // AIDING NURSES (15)
  { id: 'an1', name: 'Bernadette Ako',    title: 'Auxiliary Nurse — Surgical',   category: 'AIDING_NURSES', department: 'Surgery',        imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 1 },
  { id: 'an2', name: 'Henri Zoa',         title: 'Auxiliary Nurse — ICU',        category: 'AIDING_NURSES', department: 'ICU',            imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', isActive: true, order: 2 },
  { id: 'an3', name: 'Angèle Ndongo',     title: 'Auxiliary Nurse — Outpatient', category: 'AIDING_NURSES', department: 'Outpatient',     imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 3 },
  { id: 'an4', name: 'Marc Ondoua',       title: 'Laboratory Technician',        category: 'AIDING_NURSES', department: 'Laboratory',     imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', isActive: true, order: 4 },
  { id: 'an5', name: 'Christine Bello',   title: 'Pharmacy Technician',          category: 'AIDING_NURSES', department: 'Pharmacy',       imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 5 },
  { id: 'an6', name: 'Eric Mvondo',       title: 'Radiology Technician',         category: 'AIDING_NURSES', department: 'Radiology',      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', isActive: true, order: 6 },
  { id: 'an7', name: 'Louise Nkengue',    title: 'Auxiliary Nurse — Medical',    category: 'AIDING_NURSES', department: 'Internal Med.',  imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', isActive: true, order: 7 },
  { id: 'an8', name: 'Paul Bilong',       title: 'Laboratory Technician',        category: 'AIDING_NURSES', department: 'Laboratory',     imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', isActive: true, order: 8 },
  { id: 'an9', name: 'Irène Fokom',       title: 'Auxiliary Nurse — Maternity',  category: 'AIDING_NURSES', department: 'Maternity',      imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 9 },
  { id: 'an10', name: 'David Mbida',      title: 'Auxiliary Nurse — Pediatrics', category: 'AIDING_NURSES', department: 'Pediatrics',     imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', isActive: true, order: 10 },
  { id: 'an11', name: 'Anastasie Etoundi', title: 'Auxiliary Nurse — Emergency', category: 'AIDING_NURSES', department: 'Emergency',     imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 11 },
  { id: 'an12', name: 'Fidèle Ango',      title: 'Lab Technician — Haematology', category: 'AIDING_NURSES', department: 'Laboratory',     imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 12 },
  { id: 'an13', name: 'Mireille Ateba',   title: 'Auxiliary Nurse — Cardiology', category: 'AIDING_NURSES', department: 'Cardiology',     imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', isActive: true, order: 13 },
  { id: 'an14', name: 'Colette Biyongo',  title: 'Auxiliary Nurse — Gynecology', category: 'AIDING_NURSES', department: 'Gynecology',     imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 14 },
  { id: 'an15', name: 'Albert Owona',     title: 'Sterilisation Technician',     category: 'AIDING_NURSES', department: 'Surgical Block', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', isActive: true, order: 15 },

  // SUPPORT STAFF (41 — represented by 10 key roles)
  { id: 's1',  name: 'Florence Ateba',   title: 'Head Receptionist',                  category: 'SUPPORT_STAFF', department: 'Administration',       imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'First point of contact for all patients — warm and efficient.', isActive: true, order: 1 },
  { id: 's2',  name: 'Gaston Ngoue',     title: 'IT & Communications Officer',        category: 'SUPPORT_STAFF', department: 'IT',                   imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', isActive: true, order: 2 },
  { id: 's3',  name: 'Madeleine Beti',   title: 'Administrative Clerk',               category: 'SUPPORT_STAFF', department: 'Administration',       imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', isActive: true, order: 3 },
  { id: 's4',  name: 'Pastor Emmanuel',  title: 'Chaplain / Spiritual Counsellor',    category: 'SUPPORT_STAFF', department: 'Spiritual Clinic',     imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Leads the spiritual and pastoral care ministry for patients and staff.', isActive: true, order: 4 },
  { id: 's5',  name: 'Jean Mendoua',     title: 'Head of Security',                   category: 'SUPPORT_STAFF', department: 'Security',             imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', isActive: true, order: 5 },
  { id: 's6',  name: 'Sylvie Oto',       title: 'Head of Catering & Nutrition',       category: 'SUPPORT_STAFF', department: 'Nutrition',            imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', isActive: true, order: 6 },
  { id: 's7',  name: 'Robert Abah',      title: 'Maintenance Supervisor',             category: 'SUPPORT_STAFF', department: 'Maintenance',          imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', isActive: true, order: 7 },
  { id: 's8',  name: 'Viviane Akoa',     title: 'Social Worker',                      category: 'SUPPORT_STAFF', department: 'Holistic Clinic',      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Supports patients and families through social challenges and crises.', isActive: true, order: 8 },
  { id: 's9',  name: 'Thomas Essono',    title: 'Driver & Logistics',                 category: 'SUPPORT_STAFF', department: 'Logistics',            imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', isActive: true, order: 9 },
  { id: 's10', name: 'Hélène Mbazoa',    title: 'Patient Liaison Officer',            category: 'SUPPORT_STAFF', department: 'Administration',       imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Bridges communication between patients, families, and medical staff.', isActive: true, order: 10 },
];

export const staffByCategory = {
  TOP_ADMINISTRATION: staff.filter(s => s.category === 'TOP_ADMINISTRATION'),
  RESIDENT_DOCTORS:   staff.filter(s => s.category === 'RESIDENT_DOCTORS'),
  MAIN_NURSES:        staff.filter(s => s.category === 'MAIN_NURSES'),
  MIDWIVES:           staff.filter(s => s.category === 'MIDWIVES'),
  AIDING_NURSES:      staff.filter(s => s.category === 'AIDING_NURSES'),
  SUPPORT_STAFF:      staff.filter(s => s.category === 'SUPPORT_STAFF'),
};

export const staffCounts = {
  TOP_ADMINISTRATION: 5,
  RESIDENT_DOCTORS:   8,
  MAIN_NURSES:        12,
  MIDWIVES:           6,
  AIDING_NURSES:      15,
  SUPPORT_STAFF:      41,
  TOTAL:              87,
};
