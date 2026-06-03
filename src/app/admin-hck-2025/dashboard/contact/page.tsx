'use client';
import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, MessageSquare } from 'lucide-react';

interface Message { id: string; name: string; email: string; phone?: string; subject?: string; message: string; language: string; is_read: boolean; is_replied: boolean; admin_notes?: string; created_at: string; }

export default function ContactAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('ALL');

  useEffect(() => { fetchMessages(); }, [filter]);

  const fetchMessages = async () => {
    setLoading(true);
    const r = await fetch(`/api/admin/contact${filter === 'ALL' ? '' : `?filter=${filter}`}`);
    if (r.ok) setMessages(await r.json());
    setLoading(false);
  };

  const markRead = async (id: string) => {
    await fetch(`/api/admin/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }) });
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const deleteMsg = async (id: string) => {
    await fetch(`/api/admin/contact/${id}`, { method: 'DELETE' });
    setMessages(msgs => msgs.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Contact Messages
        </h1>
        <p className="text-[#8896B3] text-sm">{unread} unread of {messages.length} total</p>
      </div>

      <div className="flex gap-2 mb-5">
        {[['ALL', 'All'], ['UNREAD', 'Unread'], ['REPLIED', 'Replied']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === val ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5]'
            }`}>
            {label} {val === 'UNREAD' && unread > 0 && `(${unread})`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Message list */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] overflow-hidden">
          {loading ? <div className="p-8 text-center text-[#8896B3]">Loading...</div> :
            messages.length === 0 ? <div className="p-8 text-center text-[#8896B3]">No messages.</div> : (
              <div className="divide-y divide-[#F0F4FF]">
                {messages.map(msg => (
                  <div key={msg.id}
                    onClick={() => { setSelected(msg); if (!msg.is_read) markRead(msg.id); }}
                    className={`flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-[#F8FAFF] transition-colors ${!msg.is_read ? 'bg-[#EBF0FB]/30' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${!msg.is_read ? 'bg-[#0F2340]' : 'bg-[#F0F4FF]'}`}>
                      {msg.is_read ? <MailOpen className="w-4 h-4 text-[#8896B3]" /> : <Mail className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${!msg.is_read ? 'font-bold text-[#0F2340]' : 'font-medium text-[#2D2D2D]'}`}>{msg.name}</p>
                        <span className="text-[#8896B3] text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[#4A5568] text-xs truncate">{msg.subject || msg.message.slice(0, 60)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Message detail */}
        {selected ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-bold text-[#0F2340]">{selected.name}</h2>
                <p className="text-[#8896B3] text-sm">{selected.email}</p>
                {selected.phone && <p className="text-[#8896B3] text-sm">{selected.phone}</p>}
              </div>
              <button onClick={() => deleteMsg(selected.id)}
                className="p-2 text-[#C8102E] hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {selected.subject && (
              <p className="font-semibold text-sm text-[#0F2340] mb-2">Subject: {selected.subject}</p>
            )}
            <div className="bg-[#F8FAFF] rounded-xl p-4 text-sm text-[#2D2D2D] leading-relaxed mb-4 whitespace-pre-wrap">
              {selected.message}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8896B3]">
              <span>{new Date(selected.created_at).toLocaleString()}</span>
              <span>•</span>
              <span>Lang: {selected.language.toUpperCase()}</span>
              {selected.is_replied && <span className="text-green-600 font-semibold">• Replied</span>}
            </div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message to Hope Clinic'}`}
              className="mt-4 w-full block text-center bg-[#0F2340] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
              Reply via Email
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-8 text-center text-[#8896B3]">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a message to read it</p>
          </div>
        )}
      </div>
    </div>
  );
}
