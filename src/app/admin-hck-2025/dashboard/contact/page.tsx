'use client';
import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, MessageSquare, RefreshCw, Search, Reply } from 'lucide-react';

interface Message {
  id: string; name: string; email: string; phone?: string;
  subject?: string; message: string; language: string;
  is_read: boolean; is_replied: boolean; admin_notes?: string;
  created_at: string;
}

const DEMO: Message[] = [
  { id: '1', name: 'Chantal Mbono',    email: 'chantal@example.com',  phone: '+237 670 111 222', subject: 'Appointment inquiry',  message: "Hello, I would like to know how to book an appointment for my son. He is 5 years old and needs a pediatric consultation. Can you help me?", language: 'en', is_read: false, is_replied: false, created_at: '2025-06-03T08:00:00Z' },
  { id: '2', name: 'Pierre Essomba',   email: 'pierre@example.com',   phone: '+237 690 333 444', subject: 'Information on cardiology', message: "Bonjour, je voudrais avoir des informations sur le service de cardiologie. Mon père a des douleurs cardiaques et nous souhaitons le faire examiner.", language: 'fr', is_read: false, is_replied: false, created_at: '2025-06-02T14:30:00Z' },
  { id: '3', name: 'Fatima Diallo',    email: 'fatima@example.com',   phone: '+237 655 555 666', subject: 'Thank you',             message: "I just wanted to say thank you to Dr. Enoh and the whole maternity team for their wonderful care during my delivery. My baby and I are doing great!", language: 'en', is_read: true,  is_replied: true,  admin_notes: 'Sent thank you reply', created_at: '2025-06-01T10:00:00Z' },
  { id: '4', name: 'Emmanuel Bindzi',  email: 'emmanuel@example.com', phone: '+237 677 777 888', subject: 'Partnership inquiry',   message: "We are an NGO working in the East Region. We would like to explore a partnership with Hope Clinic for our upcoming health campaign in October.", language: 'en', is_read: true,  is_replied: false, created_at: '2025-05-30T09:00:00Z' },
  { id: '5', name: 'Marcelle Nkongo',  email: 'marcelle@example.com', phone: '+237 699 999 000', subject: 'General inquiry',      message: "Quels sont vos tarifs pour une consultation générale? Acceptez-vous les assurances maladie?", language: 'fr', is_read: false, is_replied: false, created_at: '2025-05-29T16:00:00Z' },
];

export default function ContactManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter,   setFilter]   = useState('ALL');
  const [search,   setSearch]   = useState('');
  const [noteText, setNoteText] = useState('');
  const [saving,   setSaving]   = useState(false);

  useEffect(() => {
    fetch(`/api/admin/contact${filter !== 'ALL' ? `?filter=${filter}` : ''}`).then(r => r.ok ? r.json() : null).then(d => setMessages(d?.length ? d : DEMO)).catch(() => setMessages(DEMO)).finally(() => setLoading(false));
  }, [filter]);

  const markRead = async (id: string) => {
    setMessages(p => p.map(m => m.id === id ? { ...m, is_read: true } : m));
    await fetch(`/api/admin/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }) }).catch(() => {});
  };

  const markReplied = async (id: string) => {
    setMessages(p => p.map(m => m.id === id ? { ...m, is_replied: true } : m));
    if (selected?.id === id) setSelected(s => s ? { ...s, is_replied: true } : null);
    await fetch(`/api/admin/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_replied: true }) }).catch(() => {});
  };

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    setMessages(p => p.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    await fetch(`/api/admin/contact/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const saveNote = async () => {
    if (!selected) return;
    setSaving(true);
    setMessages(p => p.map(m => m.id === selected.id ? { ...m, admin_notes: noteText } : m));
    setSelected(s => s ? { ...s, admin_notes: noteText } : null);
    await fetch(`/api/admin/contact/${selected.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin_notes: noteText }) }).catch(() => {});
    setSaving(false);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg); setNoteText(msg.admin_notes ?? '');
    if (!msg.is_read) markRead(msg.id);
  };

  const unread   = messages.filter(m => !m.is_read).length;
  const unreplied = messages.filter(m => !m.is_replied).length;

  const filtered = messages.filter(m => {
    const matchFilter = filter === 'ALL' || (filter === 'UNREAD' ? !m.is_read : filter === 'REPLIED' ? m.is_replied : !m.is_replied);
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || (m.subject ?? '').toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Contact Messages</h1>
        <p className="text-[#8896B3] text-sm">{unread} unread · {unreplied} awaiting reply · {messages.length} total</p>
      </div>

      {/* Filters & search */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {[['ALL', `All (${messages.length})`], ['UNREAD', `Unread (${unread})`], ['UNREPLIED', `Unreplied (${unreplied})`], ['REPLIED', 'Replied']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === val ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#0F2340]'}`}>
            {label}
          </button>
        ))}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages…"
            className="w-full pl-9 pr-4 py-2 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Message list */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D1DCF5] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#8896B3]"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-[#8896B3] text-sm">No messages match your filter.</div>
          ) : (
            <div className="divide-y divide-[#F0F4FF]">
              {filtered.map(msg => (
                <div key={msg.id} onClick={() => openMessage(msg)}
                  className={`flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors ${selected?.id === msg.id ? 'bg-[#EBF0FB]' : msg.is_read ? 'hover:bg-[#FAFBFF]' : 'bg-amber-50/40 hover:bg-amber-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${!msg.is_read ? 'bg-[#0F2340]' : 'bg-[#F0F4FF]'}`}>
                    {msg.is_read ? <MailOpen className="w-4 h-4 text-[#8896B3]" /> : <Mail className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-sm truncate ${!msg.is_read ? 'font-bold text-[#0F2340]' : 'font-medium text-[#2D2D2D]'}`}>{msg.name}</p>
                      <span className="text-[10px] text-[#8896B3] flex-shrink-0">
                        {new Date(msg.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    {msg.subject && <p className="text-xs text-[#4A5568] truncate">{msg.subject}</p>}
                    <p className="text-xs text-[#8896B3] truncate">{msg.message.slice(0, 60)}…</p>
                    <div className="flex items-center gap-2 mt-1">
                      {!msg.is_read && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">New</span>}
                      {msg.is_replied && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">Replied</span>}
                      <span className="text-[10px] text-[#8896B3] uppercase">{msg.language}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-6">
          {selected ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0F2340] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{selected.name}</h2>
                  <p className="text-[#8896B3] text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-[#8896B3] text-sm">{selected.phone}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8896B3]">{new Date(selected.created_at).toLocaleString()}</span>
                  <button onClick={() => deleteMsg(selected.id)}
                    className="p-2 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {selected.subject && (
                <p className="font-semibold text-sm text-[#0F2340] mb-3">Re: {selected.subject}</p>
              )}

              {/* Message body */}
              <div className="bg-[#F8FAFF] rounded-xl p-4 text-sm text-[#2D2D2D] leading-relaxed mb-5 whitespace-pre-wrap border border-[#D1DCF5]">
                {selected.message}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mb-5">
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject ?? 'Your message to Hope Clinic')}`}
                  onClick={() => markReplied(selected.id)}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
                  <Reply className="w-4 h-4" /> Reply by Email
                </a>
                {!selected.is_replied && (
                  <button onClick={() => markReplied(selected.id)}
                    className="flex items-center gap-2 border border-green-300 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors">
                    <Mail className="w-4 h-4" /> Mark as Replied
                  </button>
                )}
              </div>

              {/* Admin notes */}
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1.5">Admin Notes (internal)</label>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
                  className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340] resize-none mb-2"
                  placeholder="Internal note for your team…" />
                <button onClick={saveNote} disabled={saving}
                  className="flex items-center gap-2 bg-[#D4A017] text-[#0F2340] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#F5C842] transition-colors disabled:opacity-60">
                  {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                  {saving ? 'Saving…' : 'Save Note'}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-[#8896B3]">
              <MessageSquare className="w-12 h-12 mb-3 opacity-25" />
              <p className="text-sm">Select a message to read it</p>
              {unread > 0 && <p className="text-xs mt-1 text-amber-600 font-medium">{unread} unread message{unread > 1 ? 's' : ''}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
