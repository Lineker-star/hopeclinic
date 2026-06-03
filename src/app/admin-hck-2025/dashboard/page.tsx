'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar, Mail, UserCheck, Users, FileText,
  Image as ImageIcon, MapPin, Clock, TrendingUp,
  AlertCircle, CheckCircle,
} from 'lucide-react';

interface Stats {
  appointments: number;
  pendingAppointments: number;
  unreadMessages: number;
  doctors: number;
  staff: number;
  publishedPosts: number;
  galleryItems: number;
  locations: number;
}

const EMPTY: Stats = {
  appointments: 0, pendingAppointments: 0, unreadMessages: 0,
  doctors: 0, staff: 0, publishedPosts: 0, galleryItems: 0, locations: 0,
};

const STAT_CARDS = (s: Stats) => [
  { label: 'Appointments (Month)', value: s.appointments,        icon: Calendar,   color: '#0F2340', href: 'appointments' },
  { label: 'Pending Confirmation', value: s.pendingAppointments, icon: Clock,      color: '#D97706', href: 'appointments' },
  { label: 'Unread Messages',      value: s.unreadMessages,      icon: Mail,       color: '#C8102E', href: 'contact'      },
  { label: 'Total Doctors',        value: s.doctors,             icon: UserCheck,  color: '#16A34A', href: 'doctors'      },
  { label: 'Total Staff',          value: s.staff,               icon: Users,      color: '#2563EB', href: 'staff'        },
  { label: 'Published Posts',      value: s.publishedPosts,      icon: FileText,   color: '#7C3AED', href: 'blog'         },
  { label: 'Gallery Items',        value: s.galleryItems,        icon: ImageIcon,  color: '#D4A017', href: 'gallery'      },
  { label: 'Clinic Locations',     value: s.locations,           icon: MapPin,     color: '#0891B2', href: 'network'      },
];

const QUICK_ACTIONS = [
  { label: '+ Add Doctor',       href: 'doctors',      bg: 'bg-[#0F2340]' },
  { label: '+ New Blog Post',    href: 'blog',         bg: 'bg-[#16A34A]' },
  { label: '+ Add Staff Member', href: 'staff',        bg: 'bg-[#2563EB]' },
  { label: 'Manage Appointments',href: 'appointments', bg: 'bg-[#D97706]' },
  { label: 'Update News Bar',    href: 'news-bar',     bg: 'bg-[#7C3AED]' },
  { label: 'Manage Gallery',     href: 'gallery',      bg: 'bg-[#D4A017]' },
];

const BASE = '/admin-hck-2025/dashboard';

export default function DashboardPage() {
  const [stats,   setStats]   = useState<Stats>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard-stats')
      .then(r => r.ok ? r.json() : EMPTY)
      .then(d => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = STAT_CARDS(stats);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-[#8896B3] text-sm mt-1">
          Welcome back — Hope Clinic Koumé Admin Portal
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={`${BASE}/${href}`}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-[#D1DCF5] hover:border-[#0F2340]/30 group"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="w-5 h-5" style={{ color } as React.CSSProperties} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-[#0F2340] leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {loading ? '—' : value.toLocaleString()}
                </p>
                <p className="text-[#8896B3] text-xs leading-tight truncate">{label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
          <h2 className="font-bold text-[#0F2340] mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <TrendingUp className="w-4 h-4 text-[#D4A017]" /> Quick Actions
          </h2>
          <div className="space-y-2">
            {QUICK_ACTIONS.map(({ label, href, bg }) => (
              <Link
                key={href}
                href={`${BASE}/${href}`}
                className={`w-full block text-center text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity ${bg}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Site status */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D1DCF5] p-5">
          <h2 className="font-bold text-[#0F2340] mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <CheckCircle className="w-4 h-4 text-green-500" /> Site Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-8">
            {[
              { label: 'Live Site',       value: 'hopeclinic.koume.org',  ok: true  },
              { label: 'Database',        value: 'Supabase (connected)',  ok: true  },
              { label: 'Deployment',      value: 'GitHub Actions → FTP',  ok: true  },
              { label: 'Emergency Line',  value: '+237 650 441 422',       ok: true  },
              { label: 'Campaigns',       value: '23 completed',           ok: false },
              { label: 'Total Patients',  value: '68,791 (10 years)',      ok: false },
              { label: 'Hope Clinics',    value: '15 active worldwide',    ok: false },
              { label: 'Working Hours',   value: 'Mon–Sat 8AM–5PM',        ok: false },
            ].map(({ label, value, ok }) => (
              <div key={label}
                className="flex items-center justify-between py-2 border-b border-[#F0F4FF] last:border-0">
                <span className="text-[#4A5568] text-sm">{label}</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ok ? 'bg-green-500' : 'bg-[#D4A017]'}`} />
                  <span className="text-[#0F2340] text-sm font-semibold text-right">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending alert */}
      {!loading && stats.pendingAppointments > 0 && (
        <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-amber-800 text-sm">
            <strong>{stats.pendingAppointments} appointment{stats.pendingAppointments > 1 ? 's' : ''}</strong> pending
            confirmation. <Link href={`${BASE}/appointments`} className="underline font-semibold">Review now →</Link>
          </p>
        </div>
      )}
    </div>
  );
}
