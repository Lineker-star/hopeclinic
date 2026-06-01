import type { HopeClinicLocation } from '@/types';

export const hopeClinicLocations: HopeClinicLocation[] = [
  { id: '1', name: 'Hope Clinic Koumé (HQ)', city: 'Bertoua', country: 'Cameroon', region: 'East Cameroon', latitude: 4.5753, longitude: 13.6856, yearFounded: 2015, status: 'ACTIVE', description: 'Main headquarters — Hope Clinic Koumé, Bertoua, serving as the flagship of the Hope Clinic network.' },
  { id: '2', name: 'Hope Clinic Bambouti', city: 'Bambouti', country: 'Cameroon', region: 'East Cameroon', latitude: 2.2000, longitude: 16.0000, yearFounded: 2016, status: 'ACTIVE', description: 'Serving the remote Bambouti community in the East Region.' },
  { id: '3', name: 'Hope Clinic Nomedjoh', city: 'Nomedjoh', country: 'Cameroon', region: 'East Cameroon', latitude: 3.5000, longitude: 12.5000, yearFounded: 2013, status: 'ACTIVE', description: 'Bringing healthcare to the Nomedjoh area of the East Region.' },
  { id: '4', name: 'Hope Clinic Abong-Mbang', city: 'Abong-Mbang', country: 'Cameroon', region: 'East Cameroon', latitude: 3.9994, longitude: 13.1800, yearFounded: 1999, status: 'HISTORICAL', description: 'The first ever Hope Clinic — founded by Brother Isaac GWAN in 1999. The pioneering clinic that started the global network.' },
  { id: '5', name: 'Hope Clinic Douala', city: 'Douala', country: 'Cameroon', region: 'Cameroon', latitude: 4.0511, longitude: 9.7679, yearFounded: 2019, status: 'ACTIVE', description: 'Serving Cameroon\'s largest city and economic capital.' },
  { id: '6', name: 'Hope Clinic Edea', city: 'Edea', country: 'Cameroon', region: 'Cameroon', latitude: 3.8000, longitude: 10.1333, yearFounded: 2023, status: 'ACTIVE', description: 'The newest Hope Clinic in Cameroon, opened in 2023.' },
  { id: '7', name: 'Hope Clinic Abidjan', city: 'Abidjan', country: "Côte d'Ivoire", region: 'Africa', latitude: 5.3600, longitude: -4.0083, yearFounded: 2008, status: 'ACTIVE', description: "Serving the vibrant economic capital of Côte d'Ivoire." },
  { id: '8', name: 'Hope Clinic Yei', city: 'Yei', country: 'South Sudan', region: 'Africa', latitude: 4.0939, longitude: 30.6764, yearFounded: 2013, status: 'ACTIVE', description: 'Providing essential healthcare in South Sudan.' },
  { id: '9', name: 'Hope Clinic Gabon', city: 'Libreville', country: 'Gabon', region: 'Africa', latitude: 0.3901, longitude: 9.4544, yearFounded: 2018, status: 'ACTIVE', description: 'Serving the capital city of Gabon.' },
  { id: '10', name: 'Hope Clinic Uganda', city: 'Kampala', country: 'Uganda', region: 'Africa', latitude: 0.3476, longitude: 32.5825, yearFounded: 2019, status: 'ACTIVE', description: 'Bringing healing to Uganda\'s capital city.' },
  { id: '11', name: 'Hope Clinic Mali', city: 'Bamako', country: 'Mali', region: 'Africa', latitude: 12.6392, longitude: -8.0029, yearFounded: 2023, status: 'ACTIVE', description: 'Serving the communities of Bamako, Mali.' },
  { id: '12', name: 'Hope Clinic Nigeria', city: 'Lagos', country: 'Nigeria', region: 'Africa', latitude: 6.5244, longitude: 3.3792, yearFounded: 2023, status: 'ACTIVE', description: 'Bringing Hope Clinic\'s mission to Africa\'s most populous nation.' },
  { id: '13', name: 'Hope Clinic Mauritanie', city: 'Nouakchott', country: 'Mauritania', region: 'Africa', latitude: 18.0735, longitude: -15.9582, yearFounded: 2023, status: 'ACTIVE', description: 'Serving the communities of Mauritania\'s capital.' },
  { id: '14', name: 'Hope Clinic Zimbabwe', city: 'Harare', country: 'Zimbabwe', region: 'Africa', latitude: -17.8292, longitude: 31.0522, yearFounded: 2023, status: 'ACTIVE', description: 'Expanding the healing ministry to Southern Africa.' },
  { id: '15', name: 'Hope Clinic Burundi', city: 'Bujumbura', country: 'Burundi', region: 'Africa', latitude: -3.3731, longitude: 29.3644, status: 'IN_CONSTRUCTION', description: 'Currently under construction — coming soon to Burundi.' },
  { id: '16', name: 'Health Campaign Romania', city: 'Bucharest', country: 'Romania', region: 'World', latitude: 44.4268, longitude: 26.1025, yearFounded: 2023, status: 'HISTORICAL', description: 'Special health campaign in Romania — 40 persons impacted. Showing the global reach of Hope Clinic\'s mission.' },
];

export const activeClinics = hopeClinicLocations.filter(c => c.status === 'ACTIVE');
export const plannedClinics = hopeClinicLocations.filter(c => c.status === 'PLANNED');
export const inConstructionClinics = hopeClinicLocations.filter(c => c.status === 'IN_CONSTRUCTION');

export const clinicsByRegion = {
  eastCameroon: hopeClinicLocations.filter(c => c.region === 'East Cameroon'),
  cameroon: hopeClinicLocations.filter(c => c.region === 'Cameroon'),
  africa: hopeClinicLocations.filter(c => c.region === 'Africa'),
  world: hopeClinicLocations.filter(c => c.region === 'World'),
};
