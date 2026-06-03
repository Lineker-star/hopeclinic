'use client';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const defaultNews = [
  '🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated',
  '📅 Special Medical Campaign — June 2025 | Free consultations for vulnerable populations',
  '🌍 23 Health Campaigns completed | 15,726+ patients reached across the region',
  '🩺 New Mother & Child Pavilion (B4) now fully operational with Neonatal ICU',
  '📞 Emergency 24/7: +237 650 441 422 | WhatsApp: +237 650 441 422',
  '🏆 Hope Clinic eligible for Government Universal Health Coverage (CSU) programme',
  '🫀 2 Pacemakers implanted | Spinal Neurosurgery performed — Regional Excellence',
];

const fallback = defaultNews.map((content, i) => ({ id: String(i), content, is_active: true }));

export default function NewsBar() {
  const { data } = useSupabaseData<{ id: string; content: string; is_active: boolean }>(
    'news_bar',
    { filter: { is_active: true }, orderBy: 'order_index', fallback, realtimeTable: 'news_bar' }
  );

  const items  = data.filter(n => n.is_active);
  const doubled = [...items, ...items]; // seamless loop

  return (
    <div className="bg-[#081525] text-white py-2 overflow-hidden border-b border-white/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item.id}-${i}`} className="text-sm font-medium flex-shrink-0">
            <span className="mx-6">{item.content}</span>
            <span className="text-[#D4A017] mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
