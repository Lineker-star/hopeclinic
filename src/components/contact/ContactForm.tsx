'use client';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const SUBJECTS = [
  'General Inquiry', 'Appointment Request', 'Medical Information',
  'Billing & Payments', 'Partnership / Donation', 'Media & Press', 'Emergency', 'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/admin/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, language: 'en' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h3 className="font-bold text-[#0F2340] text-lg mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Message sent!
        </h3>
        <p className="text-[#8896B3] text-sm">We will respond within 24 hours.</p>
        <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' }); }}
          className="mt-4 text-[#0F2340] text-sm font-semibold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const inputCls = 'w-full border border-[#D1DCF5] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340] transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          Failed to send. Please try again or call us directly.
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Full Name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} required
            className={inputCls} placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required
            className={inputCls} placeholder="your@email.com" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
            className={inputCls} placeholder="+237 ..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Subject</label>
          <select value={form.subject} onChange={e => set('subject', e.target.value)}
            className={inputCls + ' bg-white'}>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#2D2D2D] mb-1">Message *</label>
        <textarea value={form.message} onChange={e => set('message', e.target.value)} required rows={5}
          className={inputCls + ' resize-none'}
          placeholder="Tell us how we can help you..." />
      </div>
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-[#0F2340] text-white py-3 rounded-xl font-semibold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60">
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </span>
        ) : 'Send Message'}
      </button>
    </form>
  );
}
