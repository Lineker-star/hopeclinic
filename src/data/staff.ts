import type { StaffMember } from '@/types';

export const staff: StaffMember[] = [
  // Top Administration
  { id: '1', name: 'Dr. Ginette Bekolo', title: 'Director / General Practitioner', category: 'TOP_ADMINISTRATION', department: 'Administration', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Founding Director of Hope Clinic Koumé with 15+ years of experience in general medicine and hospital management.', isActive: true, order: 1 },
  { id: '2', name: 'Jean-Pierre Mbarga', title: 'Deputy Director & Medical Supervisor', category: 'TOP_ADMINISTRATION', department: 'Administration', imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Oversees medical operations and quality assurance across all departments.', isActive: true, order: 2 },
  { id: '3', name: 'Claudine Nkomo', title: 'Administrative Director', category: 'TOP_ADMINISTRATION', department: 'Administration', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Manages administrative operations, human resources, and institutional partnerships.', isActive: true, order: 3 },
  { id: '4', name: 'Jeannette Abena', title: 'Head of Nursing', category: 'TOP_ADMINISTRATION', department: 'Nursing', imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Leads the nursing department, ensuring high standards of patient care across all wards.', isActive: true, order: 4 },
  { id: '5', name: 'Samuel Owona', title: 'Financial Officer', category: 'TOP_ADMINISTRATION', department: 'Finance', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Manages the clinic\'s financial planning, accounting, and budget oversight.', isActive: true, order: 5 },

  // Resident Doctors
  { id: '6', name: 'Dr. Laura Enoh', title: 'Resident Pediatrician', category: 'RESIDENT_DOCTORS', department: 'Pediatrics', imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialized in child health, neonatal care, and pediatric emergencies.', isActive: true, order: 1 },
  { id: '7', name: 'Dr. Coulibaly Moussa', title: 'Resident Neurologist', category: 'RESIDENT_DOCTORS', department: 'Internal Medicine', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Expert in neurological disorders and brain health management.', isActive: true, order: 2 },
  { id: '8', name: 'Dr. Marie-Claire Nguema', title: 'Resident Gynecologist', category: 'RESIDENT_DOCTORS', department: 'Gynecology & Obstetrics', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: "Dedicated to women's health, safe deliveries, and prenatal care.", isActive: true, order: 3 },
  { id: '9', name: 'Dr. Emmanuel Fotso', title: 'Resident Surgeon', category: 'RESIDENT_DOCTORS', department: 'Surgery', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Expert in general surgery with over 3,500 successful procedures.', isActive: true, order: 4 },
  { id: '10', name: 'Dr. Amina Diallo', title: 'Resident Cardiologist', category: 'RESIDENT_DOCTORS', department: 'Cardiology', imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Specialist in heart health, hypertension management, and cardiac rehabilitation.', isActive: true, order: 5 },

  // Main Nurses
  { id: '11', name: 'Marguerite Bella', title: 'Senior Nurse — Emergency Ward', category: 'MAIN_NURSES', department: 'Emergency Care', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: '12 years of nursing experience in emergency and critical care settings.', isActive: true, order: 1 },
  { id: '12', name: 'Yvonne Essama', title: 'Senior Nurse — Pediatric Ward', category: 'MAIN_NURSES', department: 'Pediatrics', imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Specialized in pediatric nursing with a gentle and caring approach to child patients.', isActive: true, order: 2 },
  { id: '13', name: 'Patricia Manga', title: 'Senior Nurse — Medical Ward', category: 'MAIN_NURSES', department: 'Internal Medicine', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Expert in medical ward management and patient care coordination.', isActive: true, order: 3 },

  // Midwives
  { id: '14', name: 'Rose Mba', title: 'Certified Midwife', category: 'MIDWIVES', department: 'Maternity & Gynecology', imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: '15 years of experience assisting in deliveries and providing prenatal care to mothers.', isActive: true, order: 1 },
  { id: '15', name: 'Cécile Abate', title: 'Certified Midwife', category: 'MIDWIVES', department: 'Maternity', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'Specialized in high-risk pregnancy monitoring and postnatal support.', isActive: true, order: 2 },
  { id: '16', name: 'Thérèse Ndi', title: 'Certified Midwife', category: 'MIDWIVES', department: 'Maternity', imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Community midwife with expertise in traditional and modern birth practices.', isActive: true, order: 3 },

  // Aiding Nurses
  { id: '17', name: 'Bernadette Ako', title: 'Auxiliary Nurse — Surgical Ward', category: 'AIDING_NURSES', department: 'Surgery', imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&auto=format&fit=crop', bio: 'Provides essential nursing support in the surgical ward and recovery room.', isActive: true, order: 1 },
  { id: '18', name: 'Henri Zoa', title: 'Auxiliary Nurse — ICU', category: 'AIDING_NURSES', department: 'ICU', imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop', bio: 'Dedicated to supporting critical care patients in the intensive care unit.', isActive: true, order: 2 },
  { id: '19', name: 'Angèle Ndongo', title: 'Auxiliary Nurse — Outpatient', category: 'AIDING_NURSES', department: 'General', imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop', bio: 'Assists with outpatient consultations, triage, and patient flow management.', isActive: true, order: 3 },

  // Support Staff
  { id: '20', name: 'Florence Ateba', title: 'Head Receptionist', category: 'SUPPORT_STAFF', department: 'Administration', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop', bio: 'First point of contact for all patients, ensuring warm and efficient reception services.', isActive: true, order: 1 },
  { id: '21', name: 'Marc Ondoua', title: 'Laboratory Technician', category: 'SUPPORT_STAFF', department: 'Laboratory', imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop', bio: 'Expert in diagnostic laboratory analysis with 8 years of experience.', isActive: true, order: 2 },
  { id: '22', name: 'Christine Bello', title: 'Pharmacy Technician', category: 'SUPPORT_STAFF', department: 'Pharmacy', imageUrl: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=300&auto=format&fit=crop', bio: 'Manages medication dispensing and patient pharmaceutical guidance.', isActive: true, order: 3 },
];

export const staffByCategory = {
  TOP_ADMINISTRATION: staff.filter(s => s.category === 'TOP_ADMINISTRATION'),
  RESIDENT_DOCTORS: staff.filter(s => s.category === 'RESIDENT_DOCTORS'),
  MAIN_NURSES: staff.filter(s => s.category === 'MAIN_NURSES'),
  MIDWIVES: staff.filter(s => s.category === 'MIDWIVES'),
  AIDING_NURSES: staff.filter(s => s.category === 'AIDING_NURSES'),
  SUPPORT_STAFF: staff.filter(s => s.category === 'SUPPORT_STAFF'),
};
