'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, Save } from 'lucide-react';

interface NewsItem { id: string; content: string; is_active: boolean; order_index: number; }

export default function NewsBarAdmin() {
  const [items, setItems]   = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [newItem, setNewItem] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/news-bar');
    if (r.ok) setItems(await r.json());
    setLoading(false);
  };

  const save = async (item: NewsItem) => {
    setSaving(true);
    await fetch(`/api/admin/news-bar/${item.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    setSaving(false);
  };

  const toggle = (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i);
    setItems(updated);
    const item = updated.find(i => i.id === id)!;
    save(item);
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/news-bar/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  const add = async () => {
    if (!newItem.trim()) return;
    const r = await fetch('/api/admin/news-bar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newItem.trim(), is_active: true, order_index: items.length }),
    });
    if (r.ok) { await fetchItems(); setNewItem(''); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            News Bar Manager
          </h1>
          <p className="text-[#8896B3] text-sm">Manage the scrolling announcement bar at the top of every page</p>
        </div>
        {saving && <span className="text-[#D4A017] text-sm font-medium animate-pulse">Saving...</span>}
      </div>

      {/* Add new item */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-5 mb-6">
        <h2 className="font-semibold text-[#0F2340] mb-3 text-sm">Add New Announcement</h2>
        <div className="flex gap-3">
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="🏥 Your announcement here..."
            className="flex-1 border border-[#D1DCF5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]"
          />
          <button onClick={add}
            className="bg-[#0F2340] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#D1DCF5] flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0F2340]">{items.length} announcement{items.length !== 1 ? 's' : ''}</span>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#8896B3]">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-[#8896B3]">No announcements yet. Add one above.</div>
        ) : (
          <div className="divide-y divide-[#F0F4FF]">
            {items.map((item) => (
              <div key={item.id} className={`flex items-center gap-3 px-5 py-3.5 ${!item.is_active ? 'opacity-50' : ''}`}>
                <GripVertical className="w-4 h-4 text-[#8896B3] cursor-grab flex-shrink-0" />
                <p className="flex-1 text-sm text-[#2D2D2D]">{item.content}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggle(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${item.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(item.id)}
                    className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
