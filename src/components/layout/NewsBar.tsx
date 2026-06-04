'use client';
import { useEffect, useState } from 'react';

interface NewsItem { id: string; content: string; is_active: boolean; order_index: number }

const DEFAULTS: NewsItem[] = [
  { id: '1', content: '🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated', is_active: true, order_index: 0 },
  { id: '2', content: '📅 Special Medical Campaign — June 2025 | Free consultations', is_active: true, order_index: 1 },
  { id: '3', content: '🌍 23 Health Campaigns | 15,726+ patients reached', is_active: true, order_index: 2 },
  { id: '4', content: '🩺 Mother & Child Pavilion (B4) now fully operational with Neonatal ICU', is_active: true, order_index: 3 },
  { id: '5', content: '📞 Emergency 24/7: +237 650 441 422 | WhatsApp: +237 650 441 422', is_active: true, order_index: 4 },
  { id: '6', content: '🏆 Hope Clinic eligible for Government Universal Health Coverage (CSU)', is_active: true, order_index: 5 },
];

export default function NewsBar() {
  const [items, setItems] = useState<NewsItem[]>(DEFAULTS);

  useEffect(() => {
    let channel: ReturnType<typeof import('@/lib/supabase')['supabase']['channel']> | null = null;

    const fetchItems = async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data } = await supabase
          .from('news_bar')
          .select('id, content, is_active, order_index')
          .eq('is_active', true)
          .order('order_index', { ascending: true });
        if (data && data.length > 0) setItems(data as NewsItem[]);
      } catch { /* keep defaults */ }
    };

    const subscribe = async () => {
      await fetchItems();
      try {
        const { supabase } = await import('@/lib/supabase');
        channel = supabase
          .channel('news_bar_live')
          .on('postgres_changes' as 'postgres_changes', { event: '*', schema: 'public', table: 'news_bar' }, fetchItems)
          .subscribe();
      } catch { /* Supabase not configured */ }
    };

    subscribe();

    return () => {
      if (channel) {
        import('@/lib/supabase').then(({ supabase }) => supabase.removeChannel(channel!));
      }
    };
  }, []);

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
