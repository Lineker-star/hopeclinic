'use client';
import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, RefreshCw, CheckCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  content: string;
  content_fr?: string;
  is_active: boolean;
  order_index: number;
}

const DEFAULT_ITEMS: NewsItem[] = [
  { id: '1', content: '🏥 Hope Clinic Koumé — 10 Years of Excellence | 68,791 Patients Treated', is_active: true, order_index: 0 },
  { id: '2', content: '🌍 23 Health Campaigns completed | 15,726+ patients reached', is_active: true, order_index: 1 },
  { id: '3', content: '📞 Emergency 24/7: +237 650 441 422', is_active: true, order_index: 2 },
];

export default function NewsBarManager() {
  const [items,    setItems]    = useState<NewsItem[]>(DEFAULT_ITEMS);
  const [loading,  setLoading]  = useState(true);
  const [newText,  setNewText]  = useState('');
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState('');
  const [editId,   setEditId]   = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/news-bar');
      if (r.ok) {
        const d = await r.json() as NewsItem[];
        if (d.length > 0) setItems(d);
      }
    } catch { /* keep defaults */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async () => {
    if (!newText.trim()) return;
    try {
      const r = await fetch('/api/admin/news-bar', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newText.trim(), is_active: true, order_index: items.length }),
      });
      if (r.ok) {
        const d = await r.json() as NewsItem;
        setItems(p => [...p, d]);
        setNewText('');
        showToast('Announcement added!');
      }
    } catch { showToast('Failed to add'); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    setItems(p => p.filter(i => i.id !== id));
    try {
      await fetch(`/api/admin/news-bar/${id}`, { method: 'DELETE' });
      showToast('Deleted');
    } catch { /* item still removed from UI */ }
  };

  const toggle = async (id: string) => {
    const updated = items.map(i => i.id === id ? { ...i, is_active: !i.is_active } : i);
    setItems(updated);
    const item = updated.find(i => i.id === id)!;
    try {
      await fetch(`/api/admin/news-bar/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: item.is_active }),
      });
    } catch { /* ignore */ }
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    setItems(p => p.map(i => i.id === id ? { ...i, content: editText } : i));
    setEditId(null);
    try {
      await fetch(`/api/admin/news-bar/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editText }),
      });
      showToast('Saved');
    } catch { showToast('Save failed'); }
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/news-bar/reorder', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items.map((item, i) => ({ id: item.id, order_index: i }))),
      });
      showToast('Order saved! Frontend updated in real-time.');
    } catch { showToast('Failed to save order'); }
    setSaving(false);
  };

  const activeCount = items.filter(i => i.is_active).length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            News Bar Manager
          </h1>
          <p className="text-[#8896B3] text-sm mt-1">
            {activeCount} active · {items.length} total · changes sync to frontend in real-time
          </p>
        </div>
        <button onClick={saveOrder} disabled={saving}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
          Save Order
        </button>
      </div>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-5 mb-5">
        <p className="text-xs font-semibold text-[#0F2340] uppercase tracking-wide mb-2">Add New Announcement</p>
        <div className="flex gap-2">
          <input value={newText} onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="🏥 Your announcement text..."
            className="flex-1 border border-[#D1DCF5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]"
          />
          <button onClick={add} disabled={!newText.trim()}
            className="flex-shrink-0 flex items-center gap-1.5 bg-[#D4A017] text-[#0F2340] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#F5C842] transition-colors disabled:opacity-50">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#D1DCF5] flex justify-between text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
          <span>Announcements (drag to reorder)</span>
          <span>{activeCount} showing</span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[#8896B3]">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 opacity-40" />
            <p className="text-sm">Loading from Supabase...</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0F4FF]">
            {items.map((item, idx) => (
              <div key={item.id}
                className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${!item.is_active ? 'opacity-50 bg-[#F8FAFF]' : 'hover:bg-[#FAFBFF]'}`}>
                <GripVertical className="w-4 h-4 text-[#D1DCF5] flex-shrink-0 cursor-grab" />
                <span className="text-[#D1DCF5] text-xs w-5 text-center flex-shrink-0">{idx + 1}</span>

                {editId === item.id ? (
                  <div className="flex-1 flex gap-2">
                    <input value={editText} onChange={e => setEditText(e.target.value)}
                      className="flex-1 border border-[#0F2340] rounded-lg px-3 py-1 text-sm focus:outline-none"
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.id); if (e.key === 'Escape') setEditId(null); }}
                      autoFocus
                    />
                    <button onClick={() => saveEdit(item.id)} className="text-xs bg-[#0F2340] text-white px-3 py-1 rounded-lg hover:bg-[#1B3A6B]">Save</button>
                    <button onClick={() => setEditId(null)} className="text-xs text-[#8896B3] hover:text-[#0F2340]">Cancel</button>
                  </div>
                ) : (
                  <p className="flex-1 text-sm text-[#2D2D2D] cursor-pointer hover:text-[#0F2340]"
                    onClick={() => { setEditId(item.id); setEditText(item.content); }}>
                    {item.content}
                  </p>
                )}

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
            {items.length === 0 && (
              <div className="p-10 text-center text-[#8896B3] text-sm">No announcements. Add one above.</div>
            )}
          </div>
        )}
      </div>
      <p className="text-[#8896B3] text-xs mt-3 text-center">
        Click any item to edit inline. Changes sync live to the scrolling news bar.
      </p>
    </div>
  );
}
