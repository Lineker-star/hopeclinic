'use client';
import { useEffect, useState, useCallback } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Download, Search, RefreshCw } from 'lucide-react';

interface Appointment {
  id: string; reference_number: string;
  patient_name: string; patient_email: string; patient_phone?: string;
  appointment_date: string; appointment_time: string;
  reason?: string; status: string; admin_notes?: string;
  created_at: string;
  doctor?: { name: string }; department?: { name: string };
}

const STATUS = {
  PENDING:     { label: 'Pending',     cls: 'bg-amber-100 text-amber-700',  icon: AlertCircle  },
  CONFIRMED:   { label: 'Confirmed',   cls: 'bg-green-100 text-green-700',  icon: CheckCircle  },
  COMPLETED:   { label: 'Completed',   cls: 'bg-gray-100  text-gray-600',   icon: CheckCircle  },
  CANCELLED:   { label: 'Cancelled',   cls: 'bg-red-100   text-red-700',    icon: XCircle      },
  RESCHEDULED: { label: 'Rescheduled', cls: 'bg-blue-100  text-blue-700',   icon: Calendar     },
} as const;

type StatusKey = keyof typeof STATUS;

// Seed for demo (no Supabase configured)
const DEMO: Appointment[] = [
  { id: '1', reference_number: 'HC-2025-001', patient_name: 'Marie Nkomo',    patient_email: 'marie@example.com',  patient_phone: '+237 670 111 222', appointment_date: '2025-06-15', appointment_time: '09:00', reason: 'Routine checkup',     status: 'CONFIRMED',   admin_notes: '', created_at: '2025-06-01T10:00:00Z' },
  { id: '2', reference_number: 'HC-2025-002', patient_name: 'Pierre Essomba', patient_email: 'pierre@example.com', patient_phone: '+237 690 333 444', appointment_date: '2025-06-16', appointment_time: '11:00', reason: 'Chest pain',          status: 'PENDING',     admin_notes: '', created_at: '2025-06-02T09:30:00Z' },
  { id: '3', reference_number: 'HC-2025-003', patient_name: 'Fatima Diallo',  patient_email: 'fatima@example.com', patient_phone: '+237 655 555 666', appointment_date: '2025-06-10', appointment_time: '08:30', reason: 'Prenatal visit',      status: 'COMPLETED',   admin_notes: 'All normal', created_at: '2025-05-28T14:00:00Z' },
  { id: '4', reference_number: 'HC-2025-004', patient_name: 'Jean Mendoua',   patient_email: 'jean@example.com',   patient_phone: '+237 677 777 888', appointment_date: '2025-06-20', appointment_time: '14:00', reason: 'Follow-up surgery',   status: 'PENDING',     admin_notes: '', created_at: '2025-06-03T08:00:00Z' },
  { id: '5', reference_number: 'HC-2025-005', patient_name: 'Chantal Ateba',  patient_email: 'chantal@example.com',patient_phone: '+237 699 999 000', appointment_date: '2025-06-05', appointment_time: '10:30', reason: 'Vaccination child',   status: 'CANCELLED',   admin_notes: 'Patient no-show', created_at: '2025-05-25T11:00:00Z' },
];

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search,    setSearch]    = useState('');
  const [selected,  setSelected]  = useState<Appointment | null>(null);
  const [noteText,  setNoteText]  = useState('');
  const [saving,    setSaving]    = useState(false);

  const fetchAppointments = useCallback(async () => {
    const url = statusFilter === 'ALL' ? '/api/admin/appointments' : `/api/admin/appointments?status=${statusFilter}`;
    try {
      const r = await fetch(url);
      const d = r.ok ? await r.json() as Appointment[] : null;
      setAppointments(d?.length ? d : DEMO);
    } catch { setAppointments(DEMO); }
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    fetchAppointments();
    // Real-time subscription for new bookings
    let channel: unknown = null;
    import('@/lib/supabase').then(({ supabase }) => {
      channel = supabase.channel('appointments_admin')
        .on('postgres_changes' as 'postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, fetchAppointments)
        .subscribe();
    }).catch(() => {});
    return () => {
      if (channel) import('@/lib/supabase').then(({ supabase }) => supabase.removeChannel(channel as ReturnType<typeof supabase.channel>));
    };
  }, [fetchAppointments]);

  const updateStatus = async (id: string, status: string) => {
    setAppointments(p => p.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null);
    await fetch(`/api/admin/appointments/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }).catch(() => {});
  };

  const saveNote = async () => {
    if (!selected) return;
    setSaving(true);
    setAppointments(p => p.map(a => a.id === selected.id ? { ...a, admin_notes: noteText } : a));
    setSelected(s => s ? { ...s, admin_notes: noteText } : null);
    await fetch(`/api/admin/appointments/${selected.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin_notes: noteText }) }).catch(() => {});
    setSaving(false);
  };

  const filtered = appointments.filter(a => !search || a.patient_name.toLowerCase().includes(search.toLowerCase()) || a.patient_email.toLowerCase().includes(search.toLowerCase()) || a.reference_number.toLowerCase().includes(search.toLowerCase()));

  const pending   = appointments.filter(a => a.status === 'PENDING').length;
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Appointments</h1>
          <p className="text-[#8896B3] text-sm">{appointments.length} total · {pending} pending · {confirmed} confirmed</p>
        </div>
        <button className="flex items-center gap-2 border border-[#D1DCF5] text-[#0F2340] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#EBF0FB] transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['ALL', ...Object.keys(STATUS)] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${statusFilter === s ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#0F2340]'}`}>
            {s === 'ALL' ? `All (${appointments.length})` : STATUS[s as StatusKey]?.label}
            {s === 'PENDING' && pending > 0 && <span className="ml-1 bg-amber-500 text-white text-[10px] px-1 rounded-full">{pending}</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or ref…"
          className="w-full pl-9 pr-4 py-2.5 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D1DCF5] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#8896B3]"><RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 opacity-40" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
                  <tr>{['Ref #', 'Patient', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#4A5568] uppercase tracking-wide">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-[#F0F4FF]">
                  {filtered.map(apt => {
                    const cfg = STATUS[apt.status as StatusKey] ?? STATUS.PENDING;
                    const Icon = cfg.icon;
                    return (
                      <tr key={apt.id} onClick={() => { setSelected(apt); setNoteText(apt.admin_notes ?? ''); }}
                        className={`cursor-pointer transition-colors ${selected?.id === apt.id ? 'bg-[#EBF0FB]' : 'hover:bg-[#FAFBFF]'}`}>
                        <td className="px-4 py-3 font-mono text-[11px] text-[#8896B3]">{apt.reference_number}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#0F2340] text-sm">{apt.patient_name}</p>
                          <p className="text-[#8896B3] text-xs truncate max-w-[140px]">{apt.patient_email}</p>
                        </td>
                        <td className="px-4 py-3 text-[#4A5568] text-xs whitespace-nowrap">
                          {new Date(apt.appointment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-4 py-3 text-[#4A5568] text-xs">{apt.appointment_time}</td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${cfg.cls}`}>
                            <Icon className="w-3 h-3" />{cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                            {apt.status === 'PENDING' && (
                              <button onClick={() => updateStatus(apt.id, 'CONFIRMED')}
                                className="text-[11px] bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors">Confirm</button>
                            )}
                            {!['CANCELLED', 'COMPLETED'].includes(apt.status) && (
                              <button onClick={() => updateStatus(apt.id, 'CANCELLED')}
                                className="text-[11px] bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors">Cancel</button>
                            )}
                            {apt.status === 'CONFIRMED' && (
                              <button onClick={() => updateStatus(apt.id, 'COMPLETED')}
                                className="text-[11px] bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors">Done</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="p-10 text-center text-[#8896B3] text-sm">No appointments match your filter.</div>
              )}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
          {selected ? (
            <>
              <h2 className="font-bold text-[#0F2340] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <User className="w-4 h-4 text-[#D4A017]" /> Appointment Details
              </h2>
              <div className="space-y-2 text-sm mb-4">
                {[
                  ['Reference', selected.reference_number],
                  ['Patient',   selected.patient_name],
                  ['Email',     selected.patient_email],
                  ['Phone',     selected.patient_phone ?? '—'],
                  ['Date',      new Date(selected.appointment_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
                  ['Time',      selected.appointment_time],
                  ['Reason',    selected.reason ?? '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2 border-b border-[#F0F4FF] py-1.5 last:border-0">
                    <span className="text-[#8896B3] flex-shrink-0">{label}</span>
                    <span className="text-[#0F2340] font-medium text-right text-xs">{value}</span>
                  </div>
                ))}
              </div>

              {/* Status actions */}
              <div className="flex flex-col gap-2 mb-4">
                {selected.status === 'PENDING' && (
                  <button onClick={() => updateStatus(selected.id, 'CONFIRMED')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Confirm Appointment
                  </button>
                )}
                {selected.status === 'CONFIRMED' && (
                  <button onClick={() => updateStatus(selected.id, 'COMPLETED')}
                    className="w-full bg-[#0F2340] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
                    Mark as Completed
                  </button>
                )}
                {!['CANCELLED', 'COMPLETED'].includes(selected.status) && (
                  <button onClick={() => updateStatus(selected.id, 'CANCELLED')}
                    className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" /> Cancel Appointment
                  </button>
                )}
              </div>

              {/* Admin notes */}
              <div>
                <label className="block text-xs font-semibold text-[#0F2340] mb-1">Admin Notes</label>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
                  className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340] resize-none mb-2" />
                <button onClick={saveNote} disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4A017] text-[#0F2340] py-2 rounded-lg text-sm font-bold hover:bg-[#F5C842] transition-colors disabled:opacity-60">
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  {saving ? 'Saving…' : 'Save Note'}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 text-[#8896B3]">
              <Calendar className="w-10 h-10 mb-3 opacity-25" />
              <p className="text-sm">Click an appointment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
