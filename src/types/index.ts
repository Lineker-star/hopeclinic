export interface Doctor {
  id: string;
  name: string;
  titlePrefix: string;
  specialization: string;
  bio: string;
  imageUrl: string;
  qualifications: string[];
  languages: string[];
  experience: number;
  department: string;
  departmentSlug: string;
  availableDays: string[];
  isActive: boolean;
  phone?: string;
  email?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  category: StaffCategory;
  department?: string;
  imageUrl: string;
  bio?: string;
  isActive: boolean;
  order: number;
}

export type StaffCategory =
  | 'TOP_ADMINISTRATION'
  | 'RESIDENT_DOCTORS'
  | 'MAIN_NURSES'
  | 'MIDWIVES'
  | 'AIDING_NURSES'
  | 'SUPPORT_STAFF';

export interface Department {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  color: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  authorImage: string;
  publishedAt: string;
  readingTime: number;
  locale: string;
}

export interface HopeClinicLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  region: 'East Cameroon' | 'Cameroon' | 'Africa' | 'World';
  latitude: number;
  longitude: number;
  yearFounded?: number;
  status: 'ACTIVE' | 'PLANNED' | 'IN_CONSTRUCTION' | 'HISTORICAL';
  description?: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  imageUrl: string;
  date: string;
}

export interface WorkingHours {
  days: string;
  hours: string;
  emergency?: boolean;
}

export interface GalleryItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnail?: string;
  caption?: string;
  category: string;
}
