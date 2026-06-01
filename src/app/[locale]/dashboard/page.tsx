import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, Settings, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Dashboard — Hope Clinic Koumé',
  description: 'Manage your appointments and profile at Hope Clinic Koumé.',
};

const mockAppointments = [
  { id: '1', doctor: 'Dr. Laura Enoh', department: 'Pediatrics', date: '2025-06-15', time: '09:00', status: 'CONFIRMED', reason: 'Child routine checkup' },
  { id: '2', doctor: 'Dr. Ginette Bekolo', department: 'Internal Medicine', date: '2025-06-20', time: '11:00', status: 'PENDING', reason: 'General consultation' },
  { id: '3', doctor: 'Dr. Marie-Claire Nguema', department: 'Gynecology', date: '2025-05-10', time: '09:30', status: 'COMPLETED', reason: 'Prenatal checkup' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  CONFIRMED: { label: 'Confirmed', color: '#16A34A', bg: '#DCFCE7', icon: CheckCircle },
  PENDING: { label: 'Pending', color: '#D97706', bg: '#FEF3C7', icon: AlertCircle },
  COMPLETED: { label: 'Completed', color: '#6B7280', bg: '#F3F4F6', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: '#DC2626', bg: '#FEE2E2', icon: AlertCircle },
};

export default function DashboardPage() {
  const upcoming = mockAppointments.filter(a => a.status !== 'COMPLETED' && a.status !== 'CANCELLED');
  const past = mockAppointments.filter(a => a.status === 'COMPLETED');

  return (
    <div className="bg-[#F9F6F1] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              My Dashboard
            </h1>
            <p className="text-[#9A9A9A] text-sm">Manage your appointments and profile</p>
          </div>
          <Link href="/booking" className="flex items-center gap-2 bg-[#C8102E] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#8B0000] transition-colors">
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Upcoming', value: upcoming.length, color: '#C8102E', icon: Calendar },
            { label: 'Completed', value: past.length, color: '#16A34A', icon: CheckCircle },
            { label: 'Profile', value: '85%', color: '#D97706', icon: User },
            { label: 'Documents', value: '0', color: '#2563EB', icon: Settings },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color } as React.CSSProperties} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{value}</div>
                  <div className="text-[#9A9A9A] text-xs">{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Upcoming Appointments
              </h2>
              {upcoming.length === 0 ? (
                <div className="text-center py-10">
                  <Calendar className="w-12 h-12 text-[#E5E1DC] mx-auto mb-3" />
                  <p className="text-[#9A9A9A]">No upcoming appointments</p>
                  <Link href="/booking" className="mt-4 inline-flex items-center gap-1 text-[#C8102E] text-sm font-semibold">
                    Book one now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.map((apt) => {
                    const config = statusConfig[apt.status];
                    const StatusIcon = config.icon;
                    return (
                      <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-[#F9F6F1] hover:bg-[#F2F0ED] transition-colors">
                        <div>
                          <p className="font-semibold text-[#1A1A1A] text-sm">{apt.doctor}</p>
                          <p className="text-[#9A9A9A] text-xs">{apt.department}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#5A5A5A]">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: config.color, backgroundColor: config.bg }}>
                          <StatusIcon className="w-3 h-3" />{config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Past */}
            {past.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Past Appointments
                </h2>
                <div className="space-y-3">
                  {past.map((apt) => {
                    const config = statusConfig[apt.status];
                    const StatusIcon = config.icon;
                    return (
                      <div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-[#F9F6F1]">
                        <div>
                          <p className="font-semibold text-[#1A1A1A] text-sm">{apt.doctor}</p>
                          <p className="text-[#9A9A9A] text-xs">{apt.department}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#5A5A5A]">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: config.color, backgroundColor: config.bg }}>
                          <StatusIcon className="w-3 h-3" />{config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Profile Quick Edit */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                My Profile
              </h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#C8102E]/10 flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-[#C8102E]" />
                </div>
                <p className="font-bold text-[#1A1A1A]">Welcome, Patient</p>
                <p className="text-[#9A9A9A] text-xs">patient@email.com</p>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Full Name', value: '—' },
                  { label: 'Phone', value: '—' },
                  { label: 'Country', value: 'Cameroon' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-[#F2F0ED]">
                    <span className="text-[#9A9A9A]">{label}</span>
                    <span className="text-[#1A1A1A] font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border-2 border-[#C8102E] text-[#C8102E] py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Quick Actions</h2>
              {[
                { label: 'Book Appointment', href: '/booking', icon: Calendar },
                { label: 'View Doctors', href: '/doctors', icon: User },
                { label: 'Contact Clinic', href: '/contact', icon: Settings },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} className="flex items-center justify-between py-3 border-b border-[#F2F0ED] last:border-0 hover:text-[#C8102E] transition-colors">
                  <div className="flex items-center gap-2.5 text-sm font-medium text-[#2D2D2D]">
                    <Icon className="w-4 h-4 text-[#C8102E]" />{label}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9A9A9A]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
