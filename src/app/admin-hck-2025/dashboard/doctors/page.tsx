'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Plus, Edit3, Trash2, ToggleLeft, ToggleRight, Star,
  X, Save, RefreshCw, Search, CheckCircle, Upload, AlertCircle, FileText,
} from 'lucide-react';

interface Education    { degree: string; institution: string; year: string; description?: string }
interface Certification { name: string; issuing_body: string; year: string }
interface Achievement  { title: string; description: string; year?: string }
interface Publication  { title: string; journal: string; year: string; url?: string }

interface Doctor {
  id: string;
  name: string;
  title_prefix: string;
  role: string;
  specialization?: string;
  bio?: string;
  image_url?: string;
  experience_years?: number;
  languages?: string[];
  available_days?: string[];
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  email?: string;
  phone?: string;
  consultation_fee?: number;
  rating?: number;
  review_count?: number;
  education?: Education[];
  certifications?: Certification[];
  achievements?: Achievement[];
  publications?: Publication[];
  cv_url?: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const cls  = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';
const sh   = 'text-[0.65rem] font-semibold text-[#8896B3] uppercase tracking-wide mb-3 flex items-center gap-2';

// ── sub-editors ──────────────────────────────────────────────────────────────

function EduEditor({ items, onChange }: { items: Education[]; onChange: (v: Education[]) => void }) {
  const blank = { degree: '', institution: '', year: '', description: '' };
  const [draft, setDraft] = useState<Education>(blank);
  const upd = (i: number, k: keyof Education, v: string) =>
    onChange(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const add = () => { if (!draft.degree || !draft.institution) return; onChange([...items, draft]); setDraft(blank); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-12 gap-1.5 p-2.5 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
          <input value={item.degree} onChange={e => upd(i, 'degree', e.target.value)} placeholder="Degree" className={cls + ' col-span-5'} />
          <input value={item.institution} onChange={e => upd(i, 'institution', e.target.value)} placeholder="Institution" className={cls + ' col-span-4'} />
          <input value={item.year} onChange={e => upd(i, 'year', e.target.value)} placeholder="Year" className={cls + ' col-span-2'} />
          <button onClick={() => del(i)} className="col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
          <input value={item.description ?? ''} onChange={e => upd(i, 'description', e.target.value)} placeholder="Description (optional)" className={cls + ' col-span-12'} />
        </div>
      ))}
      <div className="grid grid-cols-12 gap-1.5 p-2.5 bg-white rounded-lg border border-dashed border-[#D1DCF5]">
        <input value={draft.degree} onChange={e => setDraft(d => ({ ...d, degree: e.target.value }))} placeholder="Degree*" className={cls + ' col-span-5'} />
        <input value={draft.institution} onChange={e => setDraft(d => ({ ...d, institution: e.target.value }))} placeholder="Institution*" className={cls + ' col-span-4'} />
        <input value={draft.year} onChange={e => setDraft(d => ({ ...d, year: e.target.value }))} placeholder="Year" className={cls + ' col-span-2'} />
        <button onClick={add} disabled={!draft.degree || !draft.institution} className="col-span-1 flex items-center justify-center bg-[#EBF0FB] text-[#0F2340] rounded-lg hover:bg-[#D1DCF5] disabled:opacity-40"><Plus className="w-3.5 h-3.5" /></button>
        <input value={draft.description} onChange={e => setDraft(d => ({ ...d, description: e.target.value }))} placeholder="Description (optional)" className={cls + ' col-span-12'} />
      </div>
    </div>
  );
}

function CertEditor({ items, onChange }: { items: Certification[]; onChange: (v: Certification[]) => void }) {
  const blank = { name: '', issuing_body: '', year: '' };
  const [draft, setDraft] = useState<Certification>(blank);
  const upd = (i: number, k: keyof Certification, v: string) =>
    onChange(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const add = () => { if (!draft.name) return; onChange([...items, draft]); setDraft(blank); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-12 gap-1.5 p-2.5 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
          <input value={item.name} onChange={e => upd(i, 'name', e.target.value)} placeholder="Cert name" className={cls + ' col-span-5'} />
          <input value={item.issuing_body} onChange={e => upd(i, 'issuing_body', e.target.value)} placeholder="Issuing body" className={cls + ' col-span-4'} />
          <input value={item.year} onChange={e => upd(i, 'year', e.target.value)} placeholder="Year" className={cls + ' col-span-2'} />
          <button onClick={() => del(i)} className="col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <div className="grid grid-cols-12 gap-1.5 p-2.5 bg-white rounded-lg border border-dashed border-[#D1DCF5]">
        <input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} placeholder="Cert name*" className={cls + ' col-span-5'} />
        <input value={draft.issuing_body} onChange={e => setDraft(d => ({ ...d, issuing_body: e.target.value }))} placeholder="Issuing body" className={cls + ' col-span-4'} />
        <input value={draft.year} onChange={e => setDraft(d => ({ ...d, year: e.target.value }))} placeholder="Year" className={cls + ' col-span-2'} />
        <button onClick={add} disabled={!draft.name} className="col-span-1 flex items-center justify-center bg-[#EBF0FB] text-[#0F2340] rounded-lg hover:bg-[#D1DCF5] disabled:opacity-40"><Plus className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}

function AchvEditor({ items, onChange }: { items: Achievement[]; onChange: (v: Achievement[]) => void }) {
  const blank = { title: '', description: '', year: '' };
  const [draft, setDraft] = useState<Achievement>(blank);
  const upd = (i: number, k: keyof Achievement, v: string) =>
    onChange(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const add = () => { if (!draft.title) return; onChange([...items, draft]); setDraft(blank); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-12 gap-1.5 p-2.5 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
          <input value={item.title} onChange={e => upd(i, 'title', e.target.value)} placeholder="Title" className={cls + ' col-span-6'} />
          <input value={item.year ?? ''} onChange={e => upd(i, 'year', e.target.value)} placeholder="Year" className={cls + ' col-span-2'} />
          <button onClick={() => del(i)} className="col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg ml-auto"><Trash2 className="w-3.5 h-3.5" /></button>
          <input value={item.description} onChange={e => upd(i, 'description', e.target.value)} placeholder="Description" className={cls + ' col-span-12'} />
        </div>
      ))}
      <div className="grid grid-cols-12 gap-1.5 p-2.5 bg-white rounded-lg border border-dashed border-[#D1DCF5]">
        <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="Title*" className={cls + ' col-span-6'} />
        <input value={draft.year ?? ''} onChange={e => setDraft(d => ({ ...d, year: e.target.value }))} placeholder="Year" className={cls + ' col-span-2'} />
        <button onClick={add} disabled={!draft.title} className="col-span-1 flex items-center justify-center bg-[#EBF0FB] text-[#0F2340] rounded-lg hover:bg-[#D1DCF5] disabled:opacity-40 ml-auto"><Plus className="w-3.5 h-3.5" /></button>
        <input value={draft.description} onChange={e => setDraft(d => ({ ...d, description: e.target.value }))} placeholder="Description" className={cls + ' col-span-12'} />
      </div>
    </div>
  );
}

function PubEditor({ items, onChange }: { items: Publication[]; onChange: (v: Publication[]) => void }) {
  const blank = { title: '', journal: '', year: '', url: '' };
  const [draft, setDraft] = useState<Publication>(blank);
  const upd = (i: number, k: keyof Publication, v: string) =>
    onChange(items.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const add = () => { if (!draft.title) return; onChange([...items, draft]); setDraft(blank); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-12 gap-1.5 p-2.5 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
          <input value={item.title} onChange={e => upd(i, 'title', e.target.value)} placeholder="Title" className={cls + ' col-span-7'} />
          <input value={item.journal} onChange={e => upd(i, 'journal', e.target.value)} placeholder="Journal" className={cls + ' col-span-3'} />
          <input value={item.year} onChange={e => upd(i, 'year', e.target.value)} placeholder="Year" className={cls + ' col-span-1'} />
          <button onClick={() => del(i)} className="col-span-1 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
          <input value={item.url ?? ''} onChange={e => upd(i, 'url', e.target.value)} placeholder="URL (optional)" className={cls + ' col-span-12'} />
        </div>
      ))}
      <div className="grid grid-cols-12 gap-1.5 p-2.5 bg-white rounded-lg border border-dashed border-[#D1DCF5]">
        <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} placeholder="Title*" className={cls + ' col-span-7'} />
        <input value={draft.journal} onChange={e => setDraft(d => ({ ...d, journal: e.target.value }))} placeholder="Journal" className={cls + ' col-span-3'} />
        <input value={draft.year} onChange={e => setDraft(d => ({ ...d, year: e.target.value }))} placeholder="Year" className={cls + ' col-span-1'} />
        <button onClick={add} disabled={!draft.title} className="col-span-1 flex items-center justify-center bg-[#EBF0FB] text-[#0F2340] rounded-lg hover:bg-[#D1DCF5] disabled:opacity-40"><Plus className="w-3.5 h-3.5" /></button>
        <input value={draft.url ?? ''} onChange={e => setDraft(d => ({ ...d, url: e.target.value }))} placeholder="URL (optional)" className={cls + ' col-span-12'} />
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────

function Modal({ doc, onClose, onSave }: {
  doc: Partial<Doctor>;
  onClose: () => void;
  onSave: (d: Partial<Doctor>) => Promise<void>;
}) {
  const [form,      setForm]      = useState<Partial<Doctor>>(doc);
  const [saving,      setSaving]      = useState(false);
  const [uploading,   setUploading]   = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [langInput,   setLangInput]   = useState('');

  const set = (k: keyof Doctor, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'doctors');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const { url } = await r.json() as { url: string }; if (url) set('image_url', url); }
    } catch { /* ignore */ }
    setUploading(false);
  };

  const uploadCV = async (file: File) => {
    setUploadingCV(true);
    const fd = new FormData(); fd.append('file', file); fd.append('folder', 'doctors-cv');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      if (r.ok) { const { url } = await r.json() as { url: string }; if (url) set('cv_url', url); }
      else { const e = await r.json().catch(() => ({})) as { error?: string }; alert('CV upload failed: ' + (e.error ?? `HTTP ${r.status}`)); }
    } catch { alert('Network error uploading CV'); }
    setUploadingCV(false);
  };

  const addLang   = () => { if (!langInput.trim()) return; set('languages', [...(form.languages ?? []), langInput.trim()]); setLangInput(''); };
  const delLang   = (l: string) => set('languages', (form.languages ?? []).filter(x => x !== l));
  const togDay    = (d: string) => set('available_days', (form.available_days ?? []).includes(d) ? (form.available_days ?? []).filter(x => x !== d) : [...(form.available_days ?? []), d]);
  const submit    = async () => { setSaving(true); await onSave(form); setSaving(false); };

  const SectionHead = ({ label }: { label: string }) => (
    <div className="col-span-full pt-4 pb-1">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#EBF0FB]" />
        <span className="text-xs font-bold text-[#8896B3] uppercase tracking-widest px-2">{label}</span>
        <div className="flex-1 h-px bg-[#EBF0FB]" />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1DCF5] sticky top-0 bg-white z-10">
          <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {doc.id ? 'Edit Doctor Profile' : 'Add New Doctor'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F0F4FF] text-[#4A5568]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">

          {/* ── BASIC INFO ── */}
          {/* Photo */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#EBF0FB] flex-shrink-0">
              {form.image_url
                ? <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-3xl text-[#D1DCF5]">👤</div>}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Profile Photo</label>
              <div className="flex gap-2">
                <input value={form.image_url ?? ''} onChange={e => set('image_url', e.target.value)}
                  className={cls + ' flex-1'} placeholder="Photo URL" />
                <label className="flex-shrink-0 flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#D1DCF5]">
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadPhoto(e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Title</label>
              <select value={form.title_prefix ?? 'Dr.'} onChange={e => set('title_prefix', e.target.value)} className={cls + ' bg-white'}>
                {['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Full Name *</label>
              <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className={cls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Role / Position</label>
              <input value={form.role ?? ''} onChange={e => set('role', e.target.value)} className={cls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Specialization</label>
              <input value={form.specialization ?? ''} onChange={e => set('specialization', e.target.value)} className={cls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Biography</label>
            <textarea value={form.bio ?? ''} onChange={e => set('bio', e.target.value)}
              rows={4} className={cls + ' resize-none'} />
          </div>

          {/* ── CONTACT & DETAILS ── */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Experience (yrs)</label>
              <input type="number" min={0} value={form.experience_years ?? ''}
                onChange={e => set('experience_years', e.target.value ? +e.target.value : undefined)} className={cls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Email</label>
              <input type="email" value={form.email ?? ''} onChange={e => set('email', e.target.value)} className={cls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Phone</label>
              <input type="tel" value={form.phone ?? ''} onChange={e => set('phone', e.target.value)} className={cls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Consultation Fee (XAF)</label>
              <input type="number" min={0} value={form.consultation_fee ?? 0}
                onChange={e => set('consultation_fee', +e.target.value)} className={cls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Rating (0–5)</label>
              <input type="number" min={0} max={5} step={0.1} value={form.rating ?? 5.0}
                onChange={e => set('rating', +e.target.value)} className={cls} />
            </div>
          </div>

          {/* ── LANGUAGES ── */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Languages Spoken</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(form.languages ?? []).map(l => (
                <span key={l} className="flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] text-xs px-2.5 py-1 rounded-full">
                  {l}
                  <button type="button" onClick={() => delLang(l)} className="text-[#8896B3] hover:text-[#C8102E] ml-0.5">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={langInput} onChange={e => setLangInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addLang()}
                placeholder="Add language…" className={cls + ' flex-1'} />
              <button type="button" onClick={addLang}
                className="px-3 py-2 bg-[#EBF0FB] text-[#0F2340] rounded-lg text-sm font-semibold hover:bg-[#D1DCF5]">Add</button>
            </div>
          </div>

          {/* ── AVAILABLE DAYS ── */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-2">Available Days</label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button key={day} type="button" onClick={() => togDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${(form.available_days ?? []).includes(day) ? 'bg-[#0F2340] text-white' : 'bg-[#F0F4FF] text-[#4A5568] hover:bg-[#EBF0FB]'}`}>
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* ── VISIBILITY ── */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured ?? false} onChange={e => set('is_featured', e.target.checked)} className="w-4 h-4 accent-[#D4A017]" />
              <span className="text-sm text-[#2D2D2D]">Featured on homepage</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active ?? true} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 accent-[#0F2340]" />
              <span className="text-sm text-[#2D2D2D]">Active / Visible</span>
            </label>
          </div>

          {/* ── CV UPLOAD ── */}
          <div className="col-span-full pt-4 pb-1">
            <div className={sh}>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
              <span className="px-2">Curriculum Vitae (PDF)</span>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
            </div>
          </div>
          <div>
            {form.cv_url ? (
              <div className="flex items-center gap-2 bg-[#F8FAFF] border border-[#D1DCF5] rounded-lg px-3 py-2 mb-2">
                <FileText className="w-4 h-4 text-[#0F2340] flex-shrink-0" />
                <span className="text-xs text-[#4A5568] flex-1 truncate">
                  {decodeURIComponent(form.cv_url.split('/').pop()?.split('?')[0] ?? 'cv.pdf')}
                </span>
                <a href={form.cv_url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#1B3A6B] hover:underline flex-shrink-0 font-semibold">View</a>
                <button type="button" onClick={() => set('cv_url', undefined)}
                  className="text-red-400 hover:text-red-600 text-xs flex-shrink-0 font-semibold">Remove</button>
              </div>
            ) : (
              <p className="text-xs text-[#8896B3] mb-2">No CV uploaded yet.</p>
            )}
            <label className="inline-flex items-center gap-2 bg-[#EBF0FB] text-[#0F2340] px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-[#D1DCF5] font-semibold">
              {uploadingCV ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>{uploadingCV ? 'Uploading…' : 'Upload PDF'}</span>
              <input type="file" accept="application/pdf" className="hidden"
                onChange={e => e.target.files?.[0] && uploadCV(e.target.files[0])} />
            </label>
          </div>

          {/* ── EDUCATION ── */}
          <div className="col-span-full pt-4 pb-1">
            <div className={sh}>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
              <span className="px-2">Education &amp; Training</span>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
            </div>
          </div>
          <EduEditor
            items={form.education ?? []}
            onChange={v => set('education', v)}
          />

          {/* ── CERTIFICATIONS ── */}
          <div className="col-span-full pt-2">
            <div className={sh}>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
              <span className="px-2">Certifications</span>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
            </div>
          </div>
          <CertEditor
            items={form.certifications ?? []}
            onChange={v => set('certifications', v)}
          />

          {/* ── ACHIEVEMENTS ── */}
          <div className="col-span-full pt-2">
            <div className={sh}>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
              <span className="px-2">Achievements</span>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
            </div>
          </div>
          <AchvEditor
            items={form.achievements ?? []}
            onChange={v => set('achievements', v)}
          />

          {/* ── PUBLICATIONS ── */}
          <div className="col-span-full pt-2">
            <div className={sh}>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
              <span className="px-2">Publications</span>
              <div className="flex-1 h-px bg-[#EBF0FB]" />
            </div>
          </div>
          <PubEditor
            items={form.publications ?? []}
            onChange={v => set('publications', v)}
          />

        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#D1DCF5] sticky bottom-0 bg-white">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={submit} disabled={saving || !form.name}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save & Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<Partial<Doctor> | null>(null);
  const [search,  setSearch]  = useState('');
  const [toast,   setToast]   = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/doctors');
      if (r.ok) setDoctors(await r.json() as Doctor[]);
      else setDoctors([]);
    } catch { setDoctors([]); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (id: string) => {
    const item = doctors.find(d => d.id === id);
    if (!item) return;
    const r = await fetch(`/api/admin/doctors/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !item.is_active }),
    }).catch(() => null);
    if (r?.ok) await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this doctor?')) return;
    const r = await fetch(`/api/admin/doctors/${id}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { showToast('Doctor deleted'); await load(); }
    else showToast('Delete failed', false);
  };

  const save = async (form: Partial<Doctor>) => {
    try {
      const r = await fetch(form.id ? `/api/admin/doctors/${form.id}` : '/api/admin/doctors', {
        method: form.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({})) as { error?: string };
        showToast('Save failed: ' + (err.error ?? `HTTP ${r.status}`), false);
        setModal(null); return;
      }
      showToast('Saved — doctors page updated!');
      setModal(null);
      await load();
    } catch { showToast('Network error', false); }
  };

  const newDoc: Partial<Doctor> = {
    title_prefix: 'Dr.', is_active: true, is_featured: false,
    languages: [], available_days: [],
    education: [], certifications: [], achievements: [], publications: [],
    rating: 5.0, consultation_fee: 0,
  };

  const filtered = doctors.filter(d =>
    !search ||
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    (d.specialization ?? '').toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Doctors Manager</h1>
          <p className="text-[#8896B3] text-sm">{doctors.length} specialist physicians</p>
        </div>
        <button onClick={() => setModal(newDoc)}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors…"
          className="w-full pl-9 pr-4 py-2.5 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-12 text-center text-[#8896B3]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" />
          <p className="text-sm">Loading from Supabase…</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full bg-white rounded-xl border border-dashed border-[#D1DCF5] p-14 text-center">
              <p className="text-[#8896B3] text-sm mb-4">No doctors in the database yet.</p>
              <button onClick={() => setModal(newDoc)}
                className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold mx-auto hover:bg-[#1B3A6B]">
                <Plus className="w-4 h-4" /> Add First Doctor
              </button>
            </div>
          )}
          {filtered.map(doc => (
            <div key={doc.id} className={`bg-white rounded-xl border overflow-hidden shadow-sm ${!doc.is_active ? 'opacity-60' : 'border-[#D1DCF5]'}`}>
              <div className="relative h-48 bg-[#EBF0FB]">
                {doc.image_url && (
                  <Image src={doc.image_url} alt={doc.name} fill className="object-cover" sizes="25vw" />
                )}
                {doc.is_featured && (
                  <div className="absolute top-2 left-2 bg-[#D4A017] text-[#0F2340] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-bold text-[#0F2340] text-sm leading-tight">{doc.title_prefix} {doc.name}</p>
                <p className="text-[#8896B3] text-xs mt-0.5 truncate">{doc.specialization ?? doc.role}</p>
                <p className="text-[#8896B3] text-xs">{doc.experience_years ? `${doc.experience_years}+ yrs` : ''}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <button onClick={() => setModal(doc)}
                    className="flex-1 flex items-center justify-center gap-1 border border-[#D1DCF5] text-[#4A5568] py-1.5 rounded-lg text-xs hover:bg-[#EBF0FB]">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => toggle(doc.id)}
                    className={`p-1.5 rounded-lg transition-colors ${doc.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                    {doc.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(doc.id)}
                    className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <Modal doc={modal} onClose={() => setModal(null)} onSave={save} />}
    </div>
  );
}
