'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface NewsItem { id: string; content: string; is_active: boolean; order_index: number }

const DEFAULTS: NewsItem[] = [
  { id: '1', content: '🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated', is_active: true, order_index: 0 },
  { id: '2', content: '📅 Special Medical Campaign — June 2025 | Free consultations for vulnerable populations', is_active: true, order_index: 1 },
  { id: '3', content: '🌍 23 Health Campaigns completed | 15,726+ patients reached across the region', is_active: true, order_index: 2 },
  { id: '4', content: '🩺 New Mother & Child Pavilion (B4) now fully operational with Neonatal ICU', is_active: true, order_index: 3 },
  { id: '5', content: '📞 Emergency 24/7: +237 650 441 422 | WhatsApp: +237 650 441 422', is_active: true, order_index: 4 },
  { id: '6', content: '🏆 Hope Clinic eligible for Government Universal Health Coverage (CSU) programme', is_active: true, order_index: 5 },
];

export default function NewsBarManager() {
  const [items,   setItems]   = useState<NewsItem[]>(DEFAULTS);
  const [newText, setNewText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    fetch('/api/admin/news-bar')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.length) setItems(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const add = async () => {
    if (!newText.trim()) return;
    const body = { content: newText.trim(), is_active: true, order_index: items.length };
    const r = await fetch('/api/admin/news-bar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { const d = await r.json(); setItems(p => [...p, d]); setNewText(''); }
    else { // offline — add locally
      setItems(p => [...p, { id: Date.now().toString(), ...body }]);
      setNewText('');
    }
  };

  const remove = async (id: string) => {
    setItems(p => p.filter(i => i.id !== id));
    await fetch(`/api/admin/news-bar/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const toggle = async (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i);
    setItems(updated);
    const item = updated.find(i => i.id === id)!;
    await fetch(`/api/admin/news-bar/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: item.is_active }) }).catch(() => {});
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/news-bar/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items.map((item, i) => ({ id: item.id, order_index: i }))) });
      setSaved(true); setTimeout(() => setSaved(false), 2000);
    } catch { /**/ } finally { setSaving(false); }
  };

  const activeCount = items.filter(i => i.is_active).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>News Bar Manager</h1>
          <p className="text-[#8896B3] text-sm mt-1">{activeCount} active · {items.length} total — scrolling across every page</p>
        </div>
        <button onClick={saveOrder} disabled={saving}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : saved ? '✓ Saved' : 'Save Order'}
        </button>
      </div>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-5 mb-5">
        <p className="text-xs font-semibold text-[#0F2340] mb-2 uppercase tracking-wide">Add New Announcement</p>
        <div className="flex gap-2">
          <input value={newText} onChange={e => setNewText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="🏥 Your announcement… (emoji + text works great)"
            className="flex-1 border border-[#D1DCF5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
          <button onClick={add} className="flex-shrink-0 flex items-center gap-1.5 bg-[#D4A017] text-[#0F2340] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#F5C842] transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#D1DCF5] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#0F2340] uppercase tracking-wide">Announcements</span>
          <span className="text-xs text-[#8896B3]">Drag to reorder · Toggle to show/hide</span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[#8896B3]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" />
            <p className="text-sm">Loading…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-[#8896B3] text-sm">No announcements yet. Add one above.</div>
        ) : (
          <div className="divide-y divide-[#F0F4FF]">
            {items.map((item, idx) => (
              <div key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${!item.is_active ? 'bg-[#F8FAFF] opacity-55' : 'hover:bg-[#FAFBFF]'}`}>
                <GripVertical className="w-4 h-4 text-[#D1DCF5] flex-shrink-0 cursor-grab" />
                <span className="text-[#D1DCF5] text-xs w-5 flex-shrink-0 text-center">{idx + 1}</span>
                <p className="flex-1 text-sm text-[#2D2D2D] min-w-0">{item.content}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggle(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${item.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}
                    title={item.is_active ? 'Hide' : 'Show'}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(item.id)}
                    className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-[#8896B3] text-xs mt-3 text-center">
        Changes sync to the live scrolling marquee in real-time via Supabase.
      </p>
    </div>
  );
}
