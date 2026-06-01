import type { Department } from '@/types';

export const departments: Department[] = [
  {
    id: '1', slug: 'emergency', name: 'Emergency Care',
    description: '24/7 staffed emergency unit with triage, resuscitation, and rapid response teams ready for any medical crisis.',
    iconName: 'AlertTriangle', imageUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&auto=format&fit=crop',
    isActive: true, order: 1, color: '#DC2626'
  },
  {
    id: '2', slug: 'icu', name: 'Intensive Care Unit',
    description: 'Critical care facility with ventilator support, continuous monitoring, and specialist-led intensive treatment.',
    iconName: 'Activity', imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop',
    isActive: true, order: 2, color: '#7C3AED'
  },
  {
    id: '3', slug: 'surgery', name: 'Surgical Procedures',
    description: 'Comprehensive surgical services including general surgery, caesarean sections, and minimally invasive procedures.',
    iconName: 'Scissors', imageUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&fit=crop',
    isActive: true, order: 3, color: '#2563EB'
  },
  {
    id: '4', slug: 'pediatrics', name: 'Pediatrics',
    description: 'Dedicated child health services including vaccinations, neonatal care, and specialized pediatric consultations.',
    iconName: 'Baby', imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop',
    isActive: true, order: 4, color: '#F59E0B'
  },
  {
    id: '5', slug: 'cardiology', name: 'Cardiology',
    description: 'Advanced heart diagnostics, ECG, cardiac monitoring, and cardiovascular health management.',
    iconName: 'Heart', imageUrl: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&auto=format&fit=crop',
    isActive: true, order: 5, color: '#EF4444'
  },
  {
    id: '6', slug: 'gynecology', name: 'Gynecology & Obstetrics',
    description: "Complete women's health services: prenatal care, safe delivery, postnatal care, and gynecological consultations.",
    iconName: 'Users', imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop',
    isActive: true, order: 6, color: '#EC4899'
  },
  {
    id: '7', slug: 'internal-medicine', name: 'Internal Medicine',
    description: 'General consultations, chronic disease management, and comprehensive internal medicine care.',
    iconName: 'Stethoscope', imageUrl: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&auto=format&fit=crop',
    isActive: true, order: 7, color: '#0891B2'
  },
  {
    id: '8', slug: 'laboratory', name: 'Laboratory & Diagnostics',
    description: 'Modern diagnostic laboratory offering blood tests, urinalysis, pathology, and rapid test services.',
    iconName: 'FlaskConical', imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop',
    isActive: true, order: 8, color: '#059669'
  },
  {
    id: '9', slug: 'radiology', name: 'Radiology & Imaging',
    description: 'Digital X-ray, ultrasound scanning, and advanced imaging services for accurate diagnosis.',
    iconName: 'Scan', imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop',
    isActive: true, order: 9, color: '#6366F1'
  },
  {
    id: '10', slug: 'pharmacy', name: 'Pharmacy',
    description: 'On-site pharmacy dispensing prescribed medications with qualified pharmacists available during working hours.',
    iconName: 'Pill', imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop',
    isActive: true, order: 10, color: '#14B8A6'
  },
  {
    id: '11', slug: 'maternity', name: 'Maternity & Midwifery',
    description: 'Safe maternity care including prenatal support, skilled delivery, and comprehensive postnatal services.',
    iconName: 'HeartHandshake', imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop',
    isActive: true, order: 11, color: '#F472B6'
  },
  {
    id: '12', slug: 'dental', name: 'Dental Care',
    description: 'Basic dental services including extractions, fillings, cleaning, and oral health education.',
    iconName: 'Smile', imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&auto=format&fit=crop',
    isActive: true, order: 12, color: '#F97316'
  },
  {
    id: '13', slug: 'spiritual', name: 'Hope Spiritual Clinic',
    description: 'Prayer ministry, spiritual counseling, and holistic spiritual healing for patients and their families.',
    iconName: 'BookOpen', imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&auto=format&fit=crop',
    isActive: true, order: 13, color: '#8B5CF6'
  },
  {
    id: '14', slug: 'holistic', name: 'Hope Holistic Clinic',
    description: 'Marital counseling, career guidance, family therapy, and comprehensive holistic wellbeing support.',
    iconName: 'Leaf', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop',
    isActive: true, order: 14, color: '#84CC16'
  },
  {
    id: '15', slug: 'mobile', name: 'Hope Mobile Clinic',
    description: 'Outreach medical campaigns bringing healthcare to remote communities across the East Region.',
    iconName: 'Truck', imageUrl: 'https://images.unsplash.com/photo-1584346133934-a3afd65a4f50?w=600&auto=format&fit=crop',
    isActive: true, order: 15, color: '#D97706'
  },
];

export const featuredDepartments = departments.slice(0, 6);
