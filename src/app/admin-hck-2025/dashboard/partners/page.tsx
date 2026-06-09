'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Eye, EyeOff, RefreshCw, CheckCircle, X, Save, Upload, AlertCircle } from 'lucide-react';

interface Partner {
  id: string; name: string; description?: string;
  logo_url?: string; website_url?: string;
  is_active: boolean; order_index: number;
}

const inputCls = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';

function Modal({ partner, onClose, onSave }: {
  partner: Partial<Partner>; onClose: () => void; onSave: (p: Partial<Partner>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Partner>>(partner);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k: keyof Partner, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const uploadLogo = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'partners');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const { url } = await r.json() as { url: string }; if (url) set('logo_url', url); }
    } catch { /* ignore */ }
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5]">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {partner.id ? 'Edit Partner' : 'Add Partner'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Partner Name *</label>
            <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className={inputCls} placeholder="e.g. FESIDEV" /></div>

          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Description</label>
            <textarea value={form.description ?? ''} onChange={e => set('description', e.target.value)}
              rows={2} className={inputCls + ' resize-none'} /></div>

          <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Website URL</label>
            <input value={form.website_url ?? ''} onChange={e => set('website_url', e.target.value)}
              className={inputCls} placeholder="https://..." /></div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Logo</label>
            {form.logo_url && (
              <div className="relative w-20 h-20 mb-2 rounded-lg overflow-hidden border border-[#D1DCF5] bg-[#F8FAFF]">
                <Image src={form.logo_url} alt="logo" fill className="object-contain p-1" sizes="80px" />
              </div>
            )}
            <div className="flex gap-2">
              <input value={form.logo_url ?? ''} onChange={e => set('logo_url', e.target.value)}
                className={inputCls + ' flex-1'} placeholder="Logo URL or upload" />
              <label className="flex-shrink-0 flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#D1DCF5]">
                {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#0F2340] mb-1">Order</label>
              <input type="number" value={form.order_index ?? 0} onChange={e => set('order_index', +e.target.value)} className={inputCls} /></div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_active ?? true} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 accent-[#0F2340]" />
                <span className="text-sm text-[#2D2D2D]">Active on site</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-[#D1DCF5]">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={async () => { setSaving(true); await onSave(form); setSaving(false); }}
            disabled={saving || !form.name}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save Partner'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState<Partial<Partner> | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/partners');
      if (r.ok) setPartners(await r.json() as Partner[]);
      else setPartners([]);
    } catch { setPartners([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (id: string) => {
    const item = partners.find(p => p.id === id);
    if (!item) return;
    const r = await fetch(`/api/admin/partners/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !item.is_active }),
    }).catch(() => null);
    if (r?.ok) await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this partner?')) return;
    const r = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { showToast('Deleted'); await load(); }
    else showToast('Delete failed', false);
  };

  const save = async (form: Partial<Partner>) => {
    try {
      const r = await fetch(form.id ? `/api/admin/partners/${form.id}` : '/api/admin/partners', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({})) as { error?: string };
        showToast('Save failed: ' + (err.error ?? `HTTP ${r.status}`), false);
        return;
      }
      showToast('Partner saved!');
      setModal(null);
      await load();
    } catch { showToast('Network error', false); }
  };

  return (
    <div>
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />} {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Partners Manager</h1>
          <p className="text-[#8896B3] text-sm">{partners.filter(p => p.is_active).length} active · {partners.length} total</p>
        </div>
        <button onClick={() => setModal({ is_active: true, order_index: partners.length })}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B]">
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#D1DCF5] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#8896B3]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" />
            <p className="text-sm">Loading partners…</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="p-12 text-center text-[#8896B3]">
            <p className="text-sm">No partners yet. Click &ldquo;Add Partner&rdquo; to add one.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {partners.sort((a, b) => a.order_index - b.order_index).map(p => (
              <div key={p.id} className={`bg-[#F8FAFF] rounded-xl border p-4 transition-all ${p.is_active ? 'border-[#D1DCF5]' : 'border-[#F0F0F0] opacity-60'}`}>
                <div className="flex items-start gap-3 mb-3">
                  {p.logo_url ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-[#D1DCF5] flex-shrink-0">
                      <Image src={p.logo_url} alt={p.name} fill className="object-contain p-1" sizes="48px" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#EBF0FB] flex items-center justify-center flex-shrink-0 text-xl font-bold text-[#0F2340]">
                      {p.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F2340] text-sm truncate">{p.name}</p>
                    {p.website_url && (
                      <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                        className="text-[#1B3A6B] text-xs hover:underline truncate block">{p.website_url}</a>
                    )}
                  </div>
                </div>
                {p.description && <p className="text-[#4A5568] text-xs mb-3 line-clamp-2">{p.description}</p>}
                <div className="flex items-center gap-2">
                  <button onClick={() => setModal(p)} className="flex-1 text-center text-xs font-semibold text-[#1B3A6B] border border-[#D1DCF5] py-1.5 rounded-lg hover:bg-[#EBF0FB]">Edit</button>
                  <button onClick={() => toggle(p.id)} className="p-1.5 rounded-lg border border-[#D1DCF5] hover:bg-[#EBF0FB] text-[#4A5568]">
                    {p.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && <Modal partner={modal} onClose={() => setModal(null)} onSave={save} />}
    </div>
  );
}
