import type { HopeClinicLocation } from '@/types';

export const hopeClinicLocations: HopeClinicLocation[] = [
  // ─── EAST CAMEROON ───
  { id: '1',  name: 'Hope Clinic Koumé (HQ)',            city: 'Bertoua',    country: 'Cameroon',              region: 'East Cameroon', latitude: 4.5753,   longitude: 13.6856, yearFounded: 2015, status: 'ACTIVE',         description: 'Main HQ — 4 pavilions, 87 staff, 800+ patients/month. Emergency: +237 650 441 422.' },
  { id: '2',  name: 'Hope Clinic Bambouti',              city: 'Bambouti',   country: 'Cameroon',              region: 'East Cameroon', latitude: 2.2000,   longitude: 16.3000, yearFounded: 2016, status: 'ACTIVE',         description: 'Serving remote Bambouti community in the East Region.' },
  { id: '3',  name: 'Hope Clinic Nomedjoh',              city: 'Nomedjoh',   country: 'Cameroon',              region: 'East Cameroon', latitude: 3.4800,   longitude: 13.5200, yearFounded: 2013, status: 'ACTIVE',         description: 'Bringing healthcare to the Nomedjoh area of the East Region.' },

  // ─── REST OF CAMEROON ───
  { id: '4',  name: 'Hope Clinic Abong-Mbang (First)',   city: 'Abong-Mbang',country: 'Cameroon',              region: 'Cameroon',      latitude: 3.9994,   longitude: 13.1800, yearFounded: 1999, status: 'HISTORICAL',     description: 'The very first Hope Clinic — founded by Brother Isaac & Bola NGWAN (1999–2012). The seed of the global network.' },
  { id: '5',  name: 'Hope Clinic Douala',                city: 'Douala',     country: 'Cameroon',              region: 'Cameroon',      latitude: 4.0511,   longitude: 9.7679,  yearFounded: 2019, status: 'ACTIVE',         description: 'Serving Cameroon\'s largest economic capital.' },
  { id: '6',  name: 'Hope Clinic Edea',                  city: 'Edea',       country: 'Cameroon',              region: 'Cameroon',      latitude: 3.8000,   longitude: 10.1333, yearFounded: 2023, status: 'ACTIVE',         description: 'Newest Hope Clinic in Cameroon, opened 2023.' },
  { id: '7',  name: 'Hope Clinic Garoua (Planned)',      city: 'Garoua',     country: 'Cameroon',              region: 'Cameroon',      latitude: 9.3016,   longitude: 13.3952, status: 'PLANNED' },
  { id: '8',  name: 'Hope Clinic Bafoussam (Planned)',   city: 'Bafoussam',  country: 'Cameroon',              region: 'Cameroon',      latitude: 5.4737,   longitude: 10.4176, status: 'PLANNED' },
  { id: '9',  name: 'Hope Clinic Kousseri (Planned)',    city: 'Kousseri',   country: 'Cameroon',              region: 'Cameroon',      latitude: 12.0833,  longitude: 15.0333, status: 'PLANNED' },
  { id: '10', name: 'Hope Clinic Ebolowa (Planned)',     city: 'Ebolowa',    country: 'Cameroon',              region: 'Cameroon',      latitude: 2.9000,   longitude: 11.1500, status: 'PLANNED' },

  // ─── AFRICA ───
  { id: '11', name: 'Hope Clinic Abidjan',               city: 'Abidjan',    country: "Côte d'Ivoire",         region: 'Africa',        latitude: 5.3600,   longitude: -4.0083, yearFounded: 2008, status: 'ACTIVE',         description: "Serving Côte d'Ivoire's economic capital." },
  { id: '12', name: 'Hope Clinic Yei',                   city: 'Yei',        country: 'South Sudan',           region: 'Africa',        latitude: 4.0939,   longitude: 30.6764, yearFounded: 2013, status: 'ACTIVE',         description: 'Bringing essential healthcare to South Sudan.' },
  { id: '13', name: 'Hope Clinic Libreville',            city: 'Libreville', country: 'Gabon',                 region: 'Africa',        latitude: 0.3901,   longitude: 9.4544,  yearFounded: 2018, status: 'ACTIVE',         description: 'Serving the capital of Gabon.' },
  { id: '14', name: 'Hope Clinic Uganda',                city: 'Kampala',    country: 'Uganda',                region: 'Africa',        latitude: 0.3476,   longitude: 32.5825, yearFounded: 2019, status: 'ACTIVE',         description: 'Healing ministry in Uganda\'s capital.' },
  { id: '15', name: 'Hope Clinic Mali',                  city: 'Bamako',     country: 'Mali',                  region: 'Africa',        latitude: 12.6392,  longitude: -8.0029, yearFounded: 2023, status: 'ACTIVE',         description: 'Serving the communities of Bamako, Mali.' },
  { id: '16', name: 'Hope Clinic Nigeria',               city: 'Lagos',      country: 'Nigeria',               region: 'Africa',        latitude: 6.5244,   longitude: 3.3792,  yearFounded: 2023, status: 'ACTIVE',         description: 'Bringing Hope Clinic to Africa\'s most populous nation.' },
  { id: '17', name: 'Hope Clinic Mauritanie',            city: 'Nouakchott', country: 'Mauritania',            region: 'Africa',        latitude: 18.0735,  longitude: -15.9582,yearFounded: 2023, status: 'ACTIVE',         description: 'Serving the communities of Mauritania\'s capital.' },
  { id: '18', name: 'Hope Clinic Zimbabwe',              city: 'Harare',     country: 'Zimbabwe',              region: 'Africa',        latitude: -17.8292, longitude: 31.0522, yearFounded: 2023, status: 'ACTIVE',         description: 'Expanding the healing ministry to Southern Africa.' },
  { id: '19', name: 'Hope Clinic Burundi',               city: 'Bujumbura',  country: 'Burundi',               region: 'Africa',        latitude: -3.3731,  longitude: 29.3644, status: 'IN_CONSTRUCTION', description: 'Currently under construction — coming soon.' },
  { id: '20', name: 'Hope Clinic Congo Brazzaville (Planned)', city: 'Brazzaville', country: 'Congo',          region: 'Africa',        latitude: -4.2634,  longitude: 15.2429, status: 'PLANNED' },
  { id: '21', name: 'Hope Clinic Ghana (Planned)',       city: 'Accra',      country: 'Ghana',                 region: 'Africa',        latitude: 5.6037,   longitude: -0.1870, status: 'PLANNED' },
  { id: '22', name: 'Hope Clinic Benin (Planned)',       city: 'Cotonou',    country: 'Benin',                 region: 'Africa',        latitude: 6.3654,   longitude: 2.4183,  status: 'PLANNED' },
  { id: '23', name: 'Hope Clinic Liberia (Planned)',     city: 'Monrovia',   country: 'Liberia',               region: 'Africa',        latitude: 6.2907,   longitude: -10.7605,status: 'PLANNED' },
  { id: '24', name: 'Hope Clinic Bangui RCA (Planned)',  city: 'Bangui',     country: 'Central African Rep.',  region: 'Africa',        latitude: 4.3617,   longitude: 18.5552, status: 'PLANNED' },
  { id: '25', name: 'Hope Clinic Bitam (Planned)',       city: 'Bitam',      country: 'Gabon',                 region: 'Africa',        latitude: 2.0833,   longitude: 11.4833, status: 'PLANNED' },

  // ─── WORLD ───
  { id: '26', name: 'Health Campaign Romania',           city: 'Romania',    country: 'Romania',               region: 'World',         latitude: 45.9432,  longitude: 24.9668, yearFounded: 2023, status: 'HISTORICAL',     description: '40 people impacted (children & elderly). Dental hygiene education and equipment distribution. First international campaign outside Africa.' },
];

export const activeClinics       = hopeClinicLocations.filter(c => c.status === 'ACTIVE');
export const inConstructionClinics = hopeClinicLocations.filter(c => c.status === 'IN_CONSTRUCTION');
export const plannedClinics      = hopeClinicLocations.filter(c => c.status === 'PLANNED');

export const clinicsByRegion = {
  eastCameroon: hopeClinicLocations.filter(c => c.region === 'East Cameroon'),
  cameroon:     hopeClinicLocations.filter(c => c.region === 'Cameroon'),
  africa:       hopeClinicLocations.filter(c => c.region === 'Africa'),
  world:        hopeClinicLocations.filter(c => c.region === 'World'),
};
