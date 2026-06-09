'use client';
import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, GripVertical, Eye, EyeOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  content: string;
  content_fr?: string;
  is_active: boolean;
  order_index: number;
}

export default function NewsBarManager() {
  const [items,    setItems]    = useState<NewsItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [newText,  setNewText]  = useState('');
  const [adding,   setAdding]   = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState<{ msg: string; ok: boolean } | null>(null);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/news-bar');
      if (r.ok) {
        setItems(await r.json() as NewsItem[]);
      } else {
        console.error('Failed to load news bar items, status:', r.status);
        showToast(`Load failed (HTTP ${r.status})`, false);
      }
    } catch (e) {
      console.error('News bar load error:', e);
      showToast('Network error loading items', false);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async () => {
    if (!newText.trim()) return;
    setAdding(true);
    try {
      const r = await fetch('/api/admin/news-bar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newText.trim(), is_active: true, order_index: items.length }),
      });
      if (r.ok) {
        setNewText('');
        showToast('Announcement added!');
        await load();
      } else {
        const err = await r.json().catch(() => ({})) as { error?: string };
        console.error('Add news item failed:', err);
        showToast('Add failed: ' + (err.error ?? `HTTP ${r.status}`), false);
      }
    } catch (e) {
      console.error('Add news item error:', e);
      showToast('Network error', false);
    }
    setAdding(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      const r = await fetch(`/api/admin/news-bar/${id}`, { method: 'DELETE' });
      if (r.ok) {
        showToast('Deleted');
        await load();
      } else {
        const err = await r.json().catch(() => ({})) as { error?: string };
        console.error('Delete news item failed:', err);
        showToast('Delete failed: ' + (err.error ?? `HTTP ${r.status}`), false);
      }
    } catch (e) {
      console.error('Delete news item error:', e);
      showToast('Network error', false);
    }
  };

  const toggle = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    try {
      const r = await fetch(`/api/admin/news-bar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !item.is_active }),
      });
      if (r.ok) {
        await load();
      } else {
        const err = await r.json().catch(() => ({})) as { error?: string };
        console.error('Toggle news item failed:', err);
        showToast('Toggle failed: ' + (err.error ?? `HTTP ${r.status}`), false);
      }
    } catch (e) {
      console.error('Toggle news item error:', e);
      showToast('Network error', false);
    }
  };

  const saveEdit = async (id: string) => {
    if (!editText.trim()) return;
    try {
      const r = await fetch(`/api/admin/news-bar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editText.trim() }),
      });
      if (r.ok) {
        setEditId(null);
        showToast('Saved');
        await load();
      } else {
        const err = await r.json().catch(() => ({})) as { error?: string };
        console.error('Save edit failed:', err);
        showToast('Save failed: ' + (err.error ?? `HTTP ${r.status}`), false);
      }
    } catch (e) {
      console.error('Save edit error:', e);
      showToast('Network error', false);
    }
  };

  const saveOrder = async () => {
    const dbItems = items.filter(i => !['1', '2', '3'].includes(i.id));
    if (dbItems.length === 0) {
      showToast('No DB items to reorder — add announcements first', false);
      return;
    }
    setSaving(true);
    try {
      const r = await fetch('/api/admin/news-bar/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items.map((item, i) => ({ id: item.id, order_index: i }))),
      });
      if (r.ok) {
        showToast('Order saved! Frontend updated in real-time.');
        await load();
      } else {
        showToast('Failed to save order', false);
      }
    } catch (e) {
      console.error('Save order error:', e);
      showToast('Network error', false);
    }
    setSaving(false);
  };

  const activeCount = items.filter(i => i.is_active).length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            News Bar Manager
          </h1>
          <p className="text-[#8896B3] text-sm mt-1">
            {activeCount} active · {items.length} total · changes sync to frontend in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} disabled={loading} title="Reload from DB"
            className="p-2 rounded-lg border border-[#D1DCF5] text-[#4A5568] hover:bg-[#EBF0FB] disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={saveOrder} disabled={saving || loading}
            className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
            Save Order
          </button>
        </div>
      </div>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-5 mb-5">
        <p className="text-xs font-semibold text-[#0F2340] uppercase tracking-wide mb-2">Add New Announcement</p>
        <div className="flex gap-2">
          <input value={newText} onChange={e => setNewText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !adding && add()}
            placeholder="🏥 Your announcement text..."
            className="flex-1 border border-[#D1DCF5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]"
          />
          <button onClick={add} disabled={!newText.trim() || adding}
            className="flex-shrink-0 flex items-center gap-1.5 bg-[#D4A017] text-[#0F2340] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#F5C842] transition-colors disabled:opacity-50">
            {adding ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? 'Adding…' : 'Add'}
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        <div className="px-5 py-3 bg-[#F8FAFF] border-b border-[#D1DCF5] flex justify-between text-xs font-semibold text-[#4A5568] uppercase tracking-wide">
          <span>Announcements (click to edit inline)</span>
          <span>{activeCount} showing on site</span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[#8896B3]">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 opacity-40" />
            <p className="text-sm">Loading from database…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-[#8896B3]">
            <p className="text-sm font-medium mb-1">No announcements in database</p>
            <p className="text-xs">Add your first announcement above.</p>
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
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit(item.id);
                        if (e.key === 'Escape') setEditId(null);
                      }}
                      autoFocus
                    />
                    <button onClick={() => saveEdit(item.id)}
                      className="text-xs bg-[#0F2340] text-white px-3 py-1 rounded-lg hover:bg-[#1B3A6B]">
                      Save
                    </button>
                    <button onClick={() => setEditId(null)} className="text-xs text-[#8896B3] hover:text-[#0F2340]">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="flex-1 text-sm text-[#2D2D2D] cursor-pointer hover:text-[#0F2340]"
                    onClick={() => { setEditId(item.id); setEditText(item.content); }}
                    title="Click to edit">
                    {item.content}
                  </p>
                )}

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggle(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${item.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}
                    title={item.is_active ? 'Hide from ticker' : 'Show in ticker'}>
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
        Click any item to edit inline · Use drag handles + &ldquo;Save Order&rdquo; to reorder
      </p>
    </div>
  );
}
