'use client';
import { useEffect, useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';

interface Appointment {
  id: string; reference_number: string; patient_name: string; patient_email: string;
  patient_phone?: string; doctor_id?: string; department_id?: string;
  appointment_date: string; appointment_time: string; reason?: string;
  status: string; admin_notes?: string; created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  PENDING:     { label: 'Pending',     color: '#D97706', bg: '#FEF3C7', icon: AlertCircle },
  CONFIRMED:   { label: 'Confirmed',   color: '#16A34A', bg: '#DCFCE7', icon: CheckCircle },
  COMPLETED:   { label: 'Completed',   color: '#6B7280', bg: '#F3F4F6', icon: CheckCircle },
  CANCELLED:   { label: 'Cancelled',   color: '#DC2626', bg: '#FEE2E2', icon: XCircle },
  RESCHEDULED: { label: 'Rescheduled', color: '#2563EB', bg: '#DBEAFE', icon: Calendar },
};

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => { fetchAppointments(); }, [statusFilter]);

  const fetchAppointments = async () => {
    setLoading(true);
    const url = statusFilter === 'ALL' ? '/api/admin/appointments' : `/api/admin/appointments?status=${statusFilter}`;
    const r = await fetch(url);
    if (r.ok) setAppointments(await r.json());
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/appointments/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchAppointments();
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const saveNote = async () => {
    if (!selected) return;
    await fetch(`/api/admin/appointments/${selected.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_notes: adminNote }),
    });
    setSelected(prev => prev ? { ...prev, admin_notes: adminNote } : null);
  };

  const pending = appointments.filter(a => a.status === 'PENDING').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Appointments
          </h1>
          <p className="text-[#8896B3] text-sm">
            {appointments.length} total{pending > 0 && ` — ${pending} pending confirmation`}
          </p>
        </div>
        <button className="flex items-center gap-2 border border-[#D1DCF5] text-[#0F2340] px-4 py-2 rounded-lg text-sm hover:bg-[#EBF0FB] transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              statusFilter === s ? 'bg-[#0F2340] text-white' : 'bg-white text-[#4A5568] border border-[#D1DCF5] hover:border-[#0F2340]'
            }`}>
            {s === 'ALL' ? 'All' : STATUS_CONFIG[s]?.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D1DCF5] overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-[#8896B3]">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-[#8896B3]">No appointments found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFF] border-b border-[#D1DCF5]">
                  <tr>
                    {['Ref #', 'Patient', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[#4A5568] font-semibold text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F4FF]">
                  {appointments.map(apt => {
                    const cfg = STATUS_CONFIG[apt.status] || STATUS_CONFIG.PENDING;
                    const Icon = cfg.icon;
                    return (
                      <tr key={apt.id} onClick={() => { setSelected(apt); setAdminNote(apt.admin_notes || ''); }}
                        className="hover:bg-[#F8FAFF] cursor-pointer transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-[#8896B3]">{apt.reference_number}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#0F2340]">{apt.patient_name}</p>
                          <p className="text-[#8896B3] text-xs">{apt.patient_email}</p>
                        </td>
                        <td className="px-4 py-3 text-[#4A5568]">
                          {new Date(apt.appointment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-4 py-3 text-[#4A5568]">{apt.appointment_time}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                            style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                            <Icon className="w-3 h-3" /> {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {apt.status === 'PENDING' && (
                              <button onClick={e => { e.stopPropagation(); updateStatus(apt.id, 'CONFIRMED'); }}
                                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Confirm</button>
                            )}
                            {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                              <button onClick={e => { e.stopPropagation(); updateStatus(apt.id, 'CANCELLED'); }}
                                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Cancel</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
            <h2 className="font-bold text-[#0F2340] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Appointment Details
            </h2>
            <div className="space-y-2 text-sm mb-4">
              {[
                ['Ref', selected.reference_number],
                ['Patient', selected.patient_name],
                ['Email', selected.patient_email],
                ['Phone', selected.patient_phone || '—'],
                ['Date', new Date(selected.appointment_date).toLocaleDateString()],
                ['Time', selected.appointment_time],
                ['Reason', selected.reason || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[#F0F4FF] py-1.5">
                  <span className="text-[#8896B3]">{label}</span>
                  <span className="text-[#0F2340] font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Admin Notes</label>
              <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={3}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 resize-none" />
              <button onClick={saveNote}
                className="mt-2 w-full bg-[#0F2340] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
                Save Note
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {selected.status !== 'COMPLETED' && (
                <button onClick={() => updateStatus(selected.id, 'COMPLETED')}
                  className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-8 text-center text-[#8896B3]">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Click an appointment to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
