'use client';
import { useEffect, useState } from 'react';
import { Save, RefreshCw, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface AboutContent {
  mission:    string;
  our_story:  string;
  vision:     string;
  core_values: string[];
  stats: { label: string; value: string }[];
}

const DEFAULT: AboutContent = {
  mission:   'To provide quality medical care in a modern and innovative setting, showing God\'s love to every person in need.',
  our_story: 'Hope Clinic Koumé was established in 2015 in Koumé-Bonis, Bertoua, under the Mercy Works Department of CMFI. Over 10 years, it has grown from a 7-day campaign into a 4-pavilion modern medical facility staffed by 87 dedicated professionals.',
  vision:    'To manifest the Kingdom of God by demonstrating His love and healing every person — body, mind and spirit — across Africa and the world.',
  core_values: ['Compassion', 'Excellence', 'Integrity', 'Innovation', 'Community', 'Faith'],
  stats: [
    { label: 'Patients (10 yrs)', value: '68,791' },
    { label: 'Surgeries', value: '1,135' },
    { label: 'Births', value: '1,576' },
    { label: 'Staff', value: '87' },
  ],
};

const inputCls  = 'w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]';
const labelCls  = 'block text-xs font-semibold text-[#0F2340] mb-1';

export default function AboutManager() {
  const [form,    setForm]    = useState<AboutContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState('');
  const [newVal,  setNewVal]  = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetch('/api/admin/home?section=about_page')
      .then(r => r.ok ? r.json() as Promise<{ value: AboutContent } | null> : null)
      .then(d => { if (d?.value) setForm(d.value); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch('/api/admin/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'about_page', content: form }),
      });
      if (r.ok) showToast('About page content saved!');
      else showToast('Save failed — check admin session');
    } catch { showToast('Network error'); }
    setSaving(false);
  };

  const addValue   = () => { if (!newVal.trim()) return; setForm(f => ({ ...f, core_values: [...f.core_values, newVal.trim()] })); setNewVal(''); };
  const removeValue = (i: number) => setForm(f => ({ ...f, core_values: f.core_values.filter((_, idx) => idx !== i) }));
  const addStat    = () => { if (!newStatLabel.trim() || !newStatValue.trim()) return; setForm(f => ({ ...f, stats: [...f.stats, { label: newStatLabel.trim(), value: newStatValue.trim() }] })); setNewStatLabel(''); setNewStatValue(''); };
  const removeStat = (i: number) => setForm(f => ({ ...f, stats: f.stats.filter((_, idx) => idx !== i) }));

  if (loading) return <div className="flex items-center justify-center py-20 text-[#8896B3]"><RefreshCw className="w-5 h-5 animate-spin mr-2" /><span>Loading…</span></div>;

  return (
    <div className="max-w-3xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-semibold">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>About Page Manager</h1>
          <p className="text-[#8896B3] text-sm">Edit the content shown on the public About page</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60 transition-colors">
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">

        {/* Mission */}
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-6">
          <h2 className="font-bold text-[#0F2340] mb-4 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Mission Statement</h2>
          <label className={labelCls}>Mission</label>
          <textarea value={form.mission} onChange={e => setForm(f => ({ ...f, mission: e.target.value }))}
            rows={3} className={inputCls + ' resize-none'} />
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-6">
          <h2 className="font-bold text-[#0F2340] mb-4 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Our Story</h2>
          <label className={labelCls}>Story Text</label>
          <textarea value={form.our_story} onChange={e => setForm(f => ({ ...f, our_story: e.target.value }))}
            rows={5} className={inputCls + ' resize-none'} />
        </div>

        {/* Vision */}
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-6">
          <h2 className="font-bold text-[#0F2340] mb-4 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Vision</h2>
          <label className={labelCls}>Vision Text</label>
          <textarea value={form.vision} onChange={e => setForm(f => ({ ...f, vision: e.target.value }))}
            rows={3} className={inputCls + ' resize-none'} />
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-6">
          <h2 className="font-bold text-[#0F2340] mb-4 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Core Values</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {form.core_values.map((v, i) => (
              <span key={i} className="flex items-center gap-1.5 bg-[#EBF0FB] text-[#0F2340] text-sm px-3 py-1 rounded-full font-medium">
                {v}
                <button onClick={() => removeValue(i)} className="hover:text-red-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newVal} onChange={e => setNewVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && addValue()}
              placeholder="Add a core value…" className={inputCls + ' flex-1'} />
            <button onClick={addValue} className="flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#D1DCF5]">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl border border-[#D1DCF5] p-6">
          <h2 className="font-bold text-[#0F2340] mb-4 text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Statistics</h2>
          <div className="space-y-2 mb-4">
            {form.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#F8FAFF] rounded-lg border border-[#D1DCF5]">
                <input value={s.value} onChange={e => setForm(f => ({ ...f, stats: f.stats.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x) }))}
                  className="w-28 border border-[#D1DCF5] rounded px-2 py-1 text-sm font-bold text-[#D4A017]" />
                <input value={s.label} onChange={e => setForm(f => ({ ...f, stats: f.stats.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x) }))}
                  className="flex-1 border border-[#D1DCF5] rounded px-2 py-1 text-sm text-[#4A5568]" />
                <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newStatValue} onChange={e => setNewStatValue(e.target.value)} placeholder="Value (e.g. 68,791)" className={inputCls + ' w-32'} />
            <input value={newStatLabel} onChange={e => setNewStatLabel(e.target.value)} onKeyDown={e => e.key === 'Enter' && addStat()}
              placeholder="Label (e.g. Patients)" className={inputCls + ' flex-1'} />
            <button onClick={addStat} className="flex items-center gap-1 bg-[#EBF0FB] text-[#0F2340] px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#D1DCF5] flex-shrink-0">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <button onClick={save} disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#0F2340] text-white py-3 rounded-xl font-semibold hover:bg-[#1B3A6B] disabled:opacity-60 transition-colors">
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}
