'use client';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';

interface NewsItem { id: string; content: string; is_active: boolean; order_index: number }

const DEFAULTS: NewsItem[] = [
  { id: '1', content: '🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated', is_active: true, order_index: 0 },
  { id: '2', content: '📅 Special Medical Campaign — June 2025 | Free consultations', is_active: true, order_index: 1 },
  { id: '3', content: '🌍 23 Health Campaigns | 15,726+ patients reached', is_active: true, order_index: 2 },
  { id: '4', content: '🩺 Mother & Child Pavilion (B4) now fully operational with Neonatal ICU', is_active: true, order_index: 3 },
  { id: '5', content: '📞 Emergency 24/7: +237 650 441 422 | WhatsApp: +237 650 441 422', is_active: true, order_index: 4 },
  { id: '6', content: '🏆 Hope Clinic eligible for Government Universal Health Coverage (CSU)', is_active: true, order_index: 5 },
];

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('/api/admin/news-bar');
    if (res.ok) {
      const data = await res.json() as NewsItem[];
      const active = data.filter(i => i.is_active).sort((a, b) => a.order_index - b.order_index);
      if (active.length > 0) return active;
    }
  } catch { /* keep defaults */ }
  return DEFAULTS;
}

export default function NewsBar() {
  const { data: items } = useSupabaseRealtime<NewsItem[]>('news_bar', fetchNews, DEFAULTS);

  const visible = items.filter(i => i.is_active);
  if (visible.length === 0) return null;

  const doubled = [...visible, ...visible];

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
