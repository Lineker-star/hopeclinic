'use client';
import { useEffect } from 'react';
import { hopeClinicLocations } from '@/data/hope-clinics';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#16A34A',
  PLANNED: '#2563EB',
  IN_CONSTRUCTION: '#D97706',
  HISTORICAL: '#6B7280',
};

export default function HopeClinicsNetworkMap() {
  useEffect(() => {
    let map: import('leaflet').Map | null = null;

    async function initMap() {
      const L = (await import('leaflet')).default;

      const mapContainer = document.getElementById('network-map');
      if (!mapContainer) return;

      map = L.map('network-map', { center: [5, 15], zoom: 3 });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      hopeClinicLocations.forEach((clinic) => {
        const color = STATUS_COLORS[clinic.status] || '#C8102E';
        const isMain = clinic.name.includes('(HQ)');

        const icon = L.divIcon({
          html: `<div style="
            width:${isMain ? 28 : 20}px;height:${isMain ? 28 : 20}px;
            background:${color};border-radius:50%;
            border:${isMain ? '3px solid white' : '2px solid white'};
            box-shadow:0 2px 6px rgba(0,0,0,0.4);
            ${isMain ? 'box-shadow:0 0 0 3px ' + color + '40,0 2px 6px rgba(0,0,0,0.4)' : ''}
          "></div>`,
          className: '',
          iconSize: [isMain ? 28 : 20, isMain ? 28 : 20],
          iconAnchor: [isMain ? 14 : 10, isMain ? 14 : 10],
          popupAnchor: [0, isMain ? -14 : -10],
        });

        L.marker([clinic.latitude, clinic.longitude], { icon })
          .addTo(map!)
          .bindPopup(`
            <div style="font-family:sans-serif;min-width:180px;padding:4px">
              <strong style="color:#C8102E;font-size:13px">${clinic.name}</strong><br>
              <span style="color:#5A5A5A;font-size:11px">${clinic.city}, ${clinic.country}</span><br>
              ${clinic.yearFounded ? `<span style="color:#D4A017;font-size:11px">Est. ${clinic.yearFounded}</span><br>` : ''}
              <span style="background:${color};color:white;font-size:10px;padding:2px 6px;border-radius:4px;display:inline-block;margin-top:4px">${clinic.status}</span>
            </div>
          `);
      });
    }

    initMap();
    return () => { if (map) { map.remove(); map = null; } };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div id="network-map" style={{ height: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden' }} />
    </>
  );
}
