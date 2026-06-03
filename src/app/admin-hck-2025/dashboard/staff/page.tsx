'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit3, Trash2, X, Save, RefreshCw } from 'lucide-react';
import { staff as SEED, staffCounts } from '@/data/staff';
import type { StaffCategory } from '@/types';

interface StaffMember { id: string; name: string; title: string; category: StaffCategory; department?: string; image_url?: string; bio?: string; is_active: boolean; order_index: number }

const TABS: { key: StaffCategory; label: string; emoji: string; count: number }[] = [
  { key: 'TOP_ADMINISTRATION', label: 'Administration',  emoji: '👑', count: staffCounts.TOP_ADMINISTRATION },
  { key: 'RESIDENT_DOCTORS',   label: 'Resident Doctors',emoji: '⚕️', count: staffCounts.RESIDENT_DOCTORS },
  { key: 'MAIN_NURSES',        label: 'Main Nurses',     emoji: '🩺', count: staffCounts.MAIN_NURSES },
  { key: 'MIDWIVES',           label: 'Midwives',        emoji: '🤱', count: staffCounts.MIDWIVES },
  { key: 'AIDING_NURSES',      label: 'Aiding Nurses',   emoji: '💉', count: staffCounts.AIDING_NURSES },
  { key: 'SUPPORT_STAFF',      label: 'Support Staff',   emoji: '🏥', count: staffCounts.SUPPORT_STAFF },
];

const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

function Modal({ member, activeTab, onClose, onSave }: { member: Partial<StaffMember>; activeTab: StaffCategory; onClose: () => void; onSave: (m: Partial<StaffMember>) => Promise<void> }) {
  const [form, setForm]   = useState<Partial<StaffMember>>({ category: activeTab, is_active: true, ...member });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof StaffMember, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => { setSaving(true); await onSave(form); setSaving(false); };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5] sticky top-0 bg-white z-10">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {member.id ? 'Edit Staff Member' : 'Add Staff Member'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          {form.image_url && (
            <div className="flex justify-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#EBF0FB]">
                <Image src={form.image_url} alt="Staff" fill className="object-cover" sizes="80px" />
              </div>
            </div>
          )}
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Photo URL</label>
            <input value={form.image_url ?? ''} onChange={e => set('image_url', e.target.value)} className={inputCls} placeholder="https://…" /></div>
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Full Name *</label>
            <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Title / Position *</label>
            <input value={form.title ?? ''} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="e.g. Senior Nurse, Head of Department" /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Category</label>
              <select value={form.category ?? activeTab} onChange={e => set('category', e.target.value as StaffCategory)} className={inputCls + ' bg-white'}>
                {TABS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Department</label>
              <input value={form.department ?? ''} onChange={e => set('department', e.target.value)} className={inputCls} placeholder="e.g. Pediatrics" /></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Bio (optional)</label>
            <textarea value={form.bio ?? ''} onChange={e => set('bio', e.target.value)} rows={3} className={inputCls + ' resize-none'} /></div>
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
          <button onClick={submit} disabled={saving || !form.name || !form.title}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StaffManager() {
  const [all,     setAll]     = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StaffCategory>('TOP_ADMINISTRATION');
  const [modal, setModal] = useState<Partial<StaffMember> | null>(null);

  const toRows = (): StaffMember[] => SEED.map(s => ({ id: s.id, name: s.name, title: s.title, category: s.category, department: s.department, image_url: s.imageUrl, bio: s.bio, is_active: s.isActive, order_index: s.order }));

  useEffect(() => {
    fetch('/api/admin/staff').then(r => r.ok ? r.json() : null).then(d => setAll(d?.length ? d : toRows())).catch(() => setAll(toRows())).finally(() => setLoading(false));
  }, []);

  const members = all.filter(s => s.category === activeTab).sort((a, b) => a.order_index - b.order_index);

  const remove = (id: string) => { if (!confirm('Delete this staff member?')) return; setAll(p => p.filter(s => s.id !== id)); fetch(`/api/admin/staff/${id}`, { method: 'DELETE' }).catch(() => {}); };

  const save = async (form: Partial<StaffMember>) => {
    try {
      const r = await fetch(form.id ? `/api/admin/staff/${form.id}` : '/api/admin/staff', { method: form.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await r.json();
      setAll(p => form.id ? p.map(x => x.id === d.id ? d : x) : [...p, d]);
    } catch { setAll(p => form.id ? p.map(x => x.id === form.id ? { ...x, ...form } as StaffMember : x) : [...p, { ...form, id: Date.now().toString() } as StaffMember]); }
    setModal(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Staff Manager</h1>
          <p className="text-[#8896B3] text-sm">{all.length} staff members across 6 categories</p>
        </div>
        <button onClick={() => setModal({ category: activeTab })}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-[#D1DCF5] mb-5 overflow-x-auto">
        <div className="flex min-w-max">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-all flex-shrink-0 ${activeTab === tab.key ? 'border-[#0F2340] text-[#0F2340]' : 'border-transparent text-[#4A5568] hover:text-[#0F2340]'}`}>
              <span>{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="ml-1 text-xs bg-[#EBF0FB] text-[#0F2340] px-1.5 py-0.5 rounded-full font-bold">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-12 text-center text-[#8896B3]"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {members.map(member => (
            <div key={member.id} className={`bg-white rounded-xl border overflow-hidden shadow-sm ${!member.is_active ? 'opacity-60' : 'border-[#D1DCF5]'}`}>
              <div className="relative h-44 bg-[#EBF0FB]">
                {member.image_url && <Image src={member.image_url} alt={member.name} fill className="object-cover" sizes="20vw" />}
              </div>
              <div className="p-3">
                <p className="font-bold text-[#0F2340] text-xs leading-tight">{member.name}</p>
                <p className="text-[#1B3A6B] text-[11px] mt-0.5 truncate">{member.title}</p>
                {member.department && <p className="text-[#8896B3] text-[11px]">{member.department}</p>}
                <div className="flex items-center gap-1 mt-2">
                  <button onClick={() => setModal(member)} className="flex-1 flex items-center justify-center gap-1 border border-[#D1DCF5] text-[#4A5568] py-1 rounded-lg text-[11px] hover:bg-[#EBF0FB]"><Edit3 className="w-3 h-3" /> Edit</button>
                  <button onClick={() => remove(member.id)} className="p-1 rounded-lg text-[#C8102E] hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="col-span-full bg-white rounded-xl border border-dashed border-[#D1DCF5] p-10 text-center text-[#8896B3]">
              <p className="text-sm">No members in this category yet.</p>
            </div>
          )}
        </div>
      )}
      {modal && <Modal member={modal} activeTab={activeTab} onClose={() => setModal(null)} onSave={save} />}
    </div>
  );
}
