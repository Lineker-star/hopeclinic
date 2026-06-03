'use client';
import { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, X, Save, RefreshCw } from 'lucide-react';
import { departments as SEED } from '@/data/departments';

interface Dept { id: string; slug: string; name: string; description: string; icon_name?: string; image_url?: string; color?: string; is_active: boolean; order_index: number; hod_name?: string; hod_title?: string; hod_bio?: string }

const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

function Modal({ dept, onClose, onSave }: { dept: Partial<Dept>; onClose: () => void; onSave: (d: Partial<Dept>) => Promise<void> }) {
  const [form, setForm] = useState<Partial<Dept>>(dept);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof Dept, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const submit = async () => { setSaving(true); await onSave(form); setSaving(false); };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5] sticky top-0 bg-white z-10">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {dept.id ? 'Edit Department' : 'Add Department'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Name *</label>
              <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className={inputCls} placeholder="e.g. Emergency Care" /></div>
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Slug *</label>
              <input value={form.slug ?? ''} onChange={e => set('slug', e.target.value)} className={inputCls} placeholder="e.g. emergency" /></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Description</label>
            <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value)} rows={3} className={inputCls + ' resize-none'} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Image URL</label>
              <input value={form.image_url ?? ''} onChange={e => set('image_url', e.target.value)} className={inputCls} placeholder="https://…" /></div>
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Accent Color</label>
              <input type="color" value={form.color ?? '#0F2340'} onChange={e => set('color', e.target.value)} className="w-full h-10 border border-[#D1DCF5] rounded-lg cursor-pointer px-1" /></div>
          </div>
          <div className="bg-[#F8FAFF] rounded-xl p-4 border border-[#D1DCF5]">
            <p className="text-xs font-semibold text-[#0F2340] uppercase tracking-wide mb-3">Head of Department (HOD)</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className="block text-xs text-[#8896B3] mb-1">Name</label>
                <input value={form.hod_name ?? ''} onChange={e => set('hod_name', e.target.value)} className={inputCls} placeholder="Dr. …" /></div>
              <div><label className="block text-xs text-[#8896B3] mb-1">Title</label>
                <input value={form.hod_title ?? ''} onChange={e => set('hod_title', e.target.value)} className={inputCls} placeholder="Specialist" /></div>
            </div>
            <div className="mt-3"><label className="block text-xs text-[#8896B3] mb-1">Bio</label>
              <textarea value={form.hod_bio ?? ''} onChange={e => set('hod_bio', e.target.value)} rows={2} className={inputCls + ' resize-none'} /></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1"><label className="block text-xs font-semibold text-[#0F2340] mb-1">Order</label>
              <input type="number" value={form.order_index ?? 0} onChange={e => set('order_index', +e.target.value)} className={inputCls} /></div>
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input type="checkbox" checked={form.is_active ?? true} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 accent-[#0F2340]" />
              <span className="text-sm text-[#2D2D2D]">Active / Visible</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#D1DCF5]">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={submit} disabled={saving || !form.name || !form.slug}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DepartmentsManager() {
  const [depts,   setDepts]   = useState<Dept[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<Partial<Dept> | null>(null);

  const toRows = (): Dept[] => SEED.map(d => ({ id: d.id, slug: d.slug, name: d.name, description: d.description, icon_name: d.iconName, image_url: d.imageUrl, color: d.color, is_active: d.isActive, order_index: d.order }));

  useEffect(() => {
    fetch('/api/admin/departments').then(r => r.ok ? r.json() : null).then(d => setDepts(d?.length ? d : toRows())).catch(() => setDepts(toRows())).finally(() => setLoading(false));
  }, []);

  const toggle = (id: string) => {
    setDepts(p => p.map(d => d.id === id ? { ...d, is_active: !d.is_active } : d));
    const item = depts.find(d => d.id === id)!;
    fetch(`/api/admin/departments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !item.is_active }) }).catch(() => {});
  };

  const remove = (id: string) => {
    if (!confirm('Delete this department?')) return;
    setDepts(p => p.filter(d => d.id !== id));
    fetch(`/api/admin/departments/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const save = async (form: Partial<Dept>) => {
    const method = form.id ? 'PUT' : 'POST';
    const url    = form.id ? `/api/admin/departments/${form.id}` : '/api/admin/departments';
    try {
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await r.json();
      setDepts(prev => form.id ? prev.map(x => x.id === d.id ? d : x) : [...prev, d]);
    } catch {
      setDepts(prev => form.id ? prev.map(x => x.id === form.id ? { ...x, ...form } as Dept : x) : [...prev, { ...form, id: Date.now().toString() } as Dept]);
    }
    setModal(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Departments Manager</h1>
          <p className="text-[#8896B3] text-sm">{depts.filter(d => d.is_active).length} active · {depts.length} total</p>
        </div>
        <button onClick={() => setModal({ is_active: true, order_index: depts.length })}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#8896B3]"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
                <tr>{['#', 'Department', 'Slug', 'HOD', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#4A5568] uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4FF]">
                {depts.sort((a, b) => a.order_index - b.order_index).map(d => (
                  <tr key={d.id} className="hover:bg-[#FAFBFF] transition-colors">
                    <td className="px-4 py-3 text-[#8896B3] text-xs">{d.order_index}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {d.color && <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />}
                        <span className="font-semibold text-[#0F2340]">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#8896B3]">{d.slug}</td>
                    <td className="px-4 py-3 text-xs text-[#4A5568]">{d.hod_name || <span className="text-[#D1DCF5]">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-[#F0F4FF] text-[#8896B3]'}`}>
                        {d.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal(d)} className="p-1.5 rounded-lg text-[#0F2340] hover:bg-[#EBF0FB] transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => toggle(d.id)} className={`p-1.5 rounded-lg transition-colors ${d.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                          {d.is_active ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => remove(d.id)} className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <Modal dept={modal} onClose={() => setModal(null)} onSave={save} />}
    </div>
  );
}
