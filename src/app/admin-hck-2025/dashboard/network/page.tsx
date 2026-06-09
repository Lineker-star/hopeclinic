'use client';
import { useEffect, useState, useCallback } from 'react';
import {
  Plus, Edit3, Trash2, X, Save, RefreshCw,
  MapPin, CheckCircle, AlertCircle, Upload,
} from 'lucide-react';

interface Location {
  id: string; name: string; city: string; country: string; region: string;
  latitude: number; longitude: number; year_founded?: number; status: string;
  description?: string; phone?: string; email?: string;
  director?: string; photo_url?: string;
  is_hq: boolean; order_index: number;
}

const REGIONS  = ['East Cameroon', 'Cameroon', 'Africa', 'World'];
const STATUSES = ['ACTIVE', 'PLANNED', 'IN_CONSTRUCTION', 'HISTORICAL'];
const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PLANNED: 'bg-blue-100 text-blue-700',
  IN_CONSTRUCTION: 'bg-amber-100 text-amber-700',
  HISTORICAL: 'bg-gray-100 text-gray-600',
};
const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

function Modal({ loc, onClose, onSave }: {
  loc: Partial<Location>;
  onClose: () => void;
  onSave: (l: Partial<Location>) => Promise<void>;
}) {
  const [form, setForm]         = useState<Partial<Location>>(loc);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k: keyof Location, v: unknown) => setForm(f => ({ ...f, [k]: v }));
  const submit = async () => { setSaving(true); await onSave(form); setSaving(false); };

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'network');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const { url } = await r.json() as { url: string }; if (url) set('photo_url', url); }
    } catch { /* ignore */ }
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5] sticky top-0 bg-white z-10">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {loc.id ? 'Edit Location' : 'Add Hope Clinic Location'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">

          {/* Photo upload */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#EBF0FB] flex-shrink-0 border border-[#D1DCF5]">
              {form.photo_url
                ? <img src={form.photo_url} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><MapPin className="w-6 h-6 text-[#D1DCF5]" /></div>}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Clinic Photo</label>
              <div className="flex gap-2">
                <input value={form.photo_url ?? ''} onChange={e => set('photo_url', e.target.value)}
                  className={inputCls + ' flex-1'} placeholder="Photo URL" />
                <label className="flex-shrink-0 flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#D1DCF5]">
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Clinic Name *</label>
            <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className={inputCls} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">City *</label>
              <input value={form.city ?? ''} onChange={e => set('city', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Country *</label>
              <input value={form.country ?? ''} onChange={e => set('country', e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Region</label>
              <select value={form.region ?? 'Africa'} onChange={e => set('region', e.target.value)} className={inputCls + ' bg-white'}>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Status</label>
              <select value={form.status ?? 'ACTIVE'} onChange={e => set('status', e.target.value)} className={inputCls + ' bg-white'}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Latitude *</label>
              <input type="number" step="any" value={form.latitude ?? ''} onChange={e => set('latitude', parseFloat(e.target.value))} className={inputCls} placeholder="e.g. 4.5753" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Longitude *</label>
              <input type="number" step="any" value={form.longitude ?? ''} onChange={e => set('longitude', parseFloat(e.target.value))} className={inputCls} placeholder="e.g. 13.6856" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Director / Head</label>
            <input value={form.director ?? ''} onChange={e => set('director', e.target.value)} className={inputCls} placeholder="e.g. Dr. Jean Paul" />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Year Founded</label>
              <input type="number" value={form.year_founded ?? ''} onChange={e => set('year_founded', +e.target.value || undefined)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Phone</label>
              <input type="tel" value={form.phone ?? ''} onChange={e => set('phone', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Email</label>
              <input type="email" value={form.email ?? ''} onChange={e => set('email', e.target.value)} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Description</label>
            <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value)} rows={2} className={inputCls + ' resize-none'} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_hq ?? false} onChange={e => set('is_hq', e.target.checked)} className="w-4 h-4 accent-[#D4A017]" />
            <span className="text-sm text-[#2D2D2D]">Main HQ / Headquarters</span>
          </label>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#D1DCF5]">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={submit} disabled={saving || !form.name || !form.city || !form.country}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NetworkManager() {
  const [locs, setLocs]       = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState<Partial<Location> | null>(null);
  const [filter, setFilter]   = useState('ALL');
  const [toast, setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/network');
      if (r.ok) setLocs(await r.json() as Location[]);
      else showToast(`Load failed (HTTP ${r.status})`, false);
    } catch { showToast('Network error loading locations', false); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this location?')) return;
    const r = await fetch(`/api/admin/network/${id}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { showToast('Deleted'); await load(); }
    else { const e = await r?.json().catch(() => ({})) as { error?: string }; showToast('Delete failed: ' + (e?.error ?? 'Server error'), false); }
  };

  const save = async (form: Partial<Location>) => {
    try {
      const r = await fetch(form.id ? `/api/admin/network/${form.id}` : '/api/admin/network', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({})) as { error?: string };
        showToast('Save failed: ' + (err.error ?? `HTTP ${r.status}`), false);
        return;
      }
      showToast('Saved — map updated!');
      setModal(null);
      await load();
    } catch { showToast('Network error — please try again', false); }
  };

  const displayed = filter === 'ALL' ? locs : locs.filter(l => l.status === filter || l.region === filter);
  const activeCt  = locs.filter(l => l.status === 'ACTIVE').length;

  return (
    <div>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Hope Clinics Network</h1>
          <p className="text-[#8896B3] text-sm">{activeCt} active · {locs.length} total locations</p>
        </div>
        <button onClick={() => setModal({ status: 'ACTIVE', region: 'Africa', is_hq: false, order_index: locs.length })}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {['ALL', 'ACTIVE', 'PLANNED', 'IN_CONSTRUCTION', ...REGIONS].map(v => (
          <button key={v} onClick={() => setFilter(v)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === v ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#0F2340]'}`}>
            {v === 'ALL' ? `All (${locs.length})` : v.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#8896B3]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
                <tr>{['HQ', 'Clinic Name', 'Location', 'Director', 'Region', 'Year', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#4A5568] uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-[#F0F4FF]">
                {displayed.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-14 text-center text-[#8896B3] text-sm">No locations yet. Click &ldquo;Add Location&rdquo; to add one.</td></tr>
                )}
                {displayed.map(loc => (
                  <tr key={loc.id} className="hover:bg-[#FAFBFF] transition-colors">
                    <td className="px-4 py-3">{loc.is_hq && <span className="text-[#D4A017] text-base">★</span>}</td>
                    <td className="px-4 py-3 font-semibold text-[#0F2340] text-sm">
                      <div className="flex items-center gap-2">
                        {loc.photo_url && (
                          <img src={loc.photo_url} alt="" className="w-8 h-8 rounded-lg object-cover border border-[#D1DCF5]" />
                        )}
                        {loc.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#4A5568]">{loc.city}, {loc.country}</td>
                    <td className="px-4 py-3 text-xs text-[#4A5568]">{loc.director ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-[#8896B3]">{loc.region}</td>
                    <td className="px-4 py-3 text-xs text-[#8896B3]">{loc.year_founded ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[loc.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {loc.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal(loc)} className="p-1.5 rounded-lg text-[#0F2340] hover:bg-[#EBF0FB]"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => remove(loc.id)} className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <Modal loc={modal} onClose={() => setModal(null)} onSave={save} />}
    </div>
  );
}
