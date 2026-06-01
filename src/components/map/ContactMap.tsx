'use client';
import { useEffect } from 'react';

const CLINIC_LAT = 4.5753;
const CLINIC_LNG = 13.6856;

export default function ContactMap() {
  useEffect(() => {
    let map: import('leaflet').Map | null = null;

    async function initMap() {
      const L = (await import('leaflet')).default;

      // Fix default marker icon path issue with webpack
      const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
      const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
      const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

      const DefaultIcon = L.icon({ iconUrl, iconRetinaUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Red custom marker
      const redIcon = L.divIcon({
        html: `<div style="width:32px;height:32px;background:#C8102E;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const mapContainer = document.getElementById('contact-map');
      if (!mapContainer) return;

      map = L.map('contact-map', { center: [CLINIC_LAT, CLINIC_LNG], zoom: 15, zoomControl: true });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.marker([CLINIC_LAT, CLINIC_LNG], { icon: redIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif;min-width:200px;padding:4px">
            <strong style="color:#C8102E;font-size:14px">Hope Clinic Koumé</strong><br>
            <span style="color:#5A5A5A;font-size:12px">Koumé-Bonis Quarter, Bertoua<br>East Region, Cameroon</span><br>
            <a href="tel:+237650441422" style="color:#C8102E;font-size:12px;font-weight:600">+237 650 441 422</a><br>
            <a href="https://maps.google.com?q=${CLINIC_LAT},${CLINIC_LNG}" target="_blank"
               style="display:inline-block;margin-top:6px;background:#C8102E;color:white;padding:4px 10px;border-radius:4px;font-size:11px;text-decoration:none">
              Get Directions
            </a>
          </div>
        `)
        .openPopup();
    }

    initMap();

    return () => {
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div id="contact-map" style={{ height: '450px', width: '100%', borderRadius: '16px', overflow: 'hidden' }} />
    </>
  );
}
