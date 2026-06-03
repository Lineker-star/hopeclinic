'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Mail, UserCheck, Users, FileText, ImageIcon, MapPin, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface Stats { appointments: number; pending: number; messages: number; doctors: number; staff: number; posts: number; gallery: number; locations: number; }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ appointments: 0, pending: 0, messages: 0, doctors: 0, staff: 0, posts: 0, gallery: 0, locations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setStats(d); })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Appointments (Month)', value: stats.appointments, icon: Calendar, color: '#0F2340', href: '/admin-hck-2025/dashboard/appointments' },
    { label: 'Pending Confirmation', value: stats.pending,      icon: Clock,    color: '#D97706', href: '/admin-hck-2025/dashboard/appointments' },
    { label: 'Unread Messages',      value: stats.messages,     icon: Mail,     color: '#C8102E', href: '/admin-hck-2025/dashboard/contact' },
    { label: 'Total Doctors',        value: stats.doctors,      icon: UserCheck,color: '#16A34A', href: '/admin-hck-2025/dashboard/doctors' },
    { label: 'Total Staff',          value: stats.staff,        icon: Users,    color: '#2563EB', href: '/admin-hck-2025/dashboard/staff' },
    { label: 'Published Posts',      value: stats.posts,        icon: FileText, color: '#7C3AED', href: '/admin-hck-2025/dashboard/blog' },
    { label: 'Gallery Items',        value: stats.gallery,      icon: ImageIcon,color: '#D4A017', href: '/admin-hck-2025/dashboard/gallery' },
    { label: 'Clinic Locations',     value: stats.locations,    icon: MapPin,   color: '#0891B2', href: '/admin-hck-2025/dashboard/network' },
  ];

  const quickActions = [
    { label: '+ Add Doctor',          href: '/admin-hck-2025/dashboard/doctors', color: 'bg-[#0F2340]' },
    { label: '+ New Blog Post',        href: '/admin-hck-2025/dashboard/blog',    color: 'bg-[#16A34A]' },
    { label: '+ Add Staff Member',     href: '/admin-hck-2025/dashboard/staff',   color: 'bg-[#2563EB]' },
    { label: 'Manage Appointments',    href: '/admin-hck-2025/dashboard/appointments', color: 'bg-[#D97706]' },
    { label: 'Update News Bar',        href: '/admin-hck-2025/dashboard/news-bar',color: 'bg-[#7C3AED]' },
    { label: 'Manage Gallery',         href: '/admin-hck-2025/dashboard/gallery', color: 'bg-[#D4A017]' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-[#8896B3] text-sm mt-1">Welcome back — Hope Clinic Koumé Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-[#D1DCF5] hover:border-[#0F2340]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-5 h-5" style={{ color } as React.CSSProperties} />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {loading ? '—' : value}
                </div>
                <div className="text-[#8896B3] text-xs leading-tight">{label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
          <h2 className="font-bold text-[#0F2340] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Quick Actions
          </h2>
          <div className="space-y-2">
            {quickActions.map(({ label, href, color }) => (
              <Link key={label} href={href}
                className={`w-full block text-center text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity ${color}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Site Status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
          <h2 className="font-bold text-[#0F2340] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Site Information
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Live Site',          value: 'hopeclinic.koume.org',  status: 'live' },
              { label: 'Database',           value: 'Supabase PostgreSQL',   status: 'live' },
              { label: 'Deployment',         value: 'GitHub Actions → FTP',  status: 'live' },
              { label: 'Emergency Line',     value: '+237 650 441 422',      status: 'live' },
              { label: 'Health Campaigns',   value: '23 completed',          status: 'info' },
              { label: 'Total Patients',     value: '68,791 (10 years)',     status: 'info' },
            ].map(({ label, value, status }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#F0F4FF] last:border-0">
                <span className="text-[#4A5568] text-sm">{label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${status === 'live' ? 'bg-green-500' : 'bg-[#D4A017]'}`} />
                  <span className="text-[#0F2340] text-sm font-semibold">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
