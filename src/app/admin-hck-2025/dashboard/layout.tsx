'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Home, Rss, Info, Building2, Stethoscope,
  UserCheck, Users, FileText, ImageIcon, Star, Calendar, Mail,
  MapPin, Handshake, Settings, Shield, LogOut, Menu, X, Bell,
  ChevronDown, ChevronRight,
} from 'lucide-react';

type NavItem = {
  label: string; href?: string; icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[]; superAdminOnly?: boolean;
};

const BASE = '/admin-hck-2025/dashboard';

const nav: NavItem[] = [
  { label: 'Dashboard',     href: BASE,                          icon: LayoutDashboard },
  { label: 'Website Content', icon: Home, children: [
    { label: 'Homepage',    href: `${BASE}/home`,                icon: Home },
    { label: 'News Bar',    href: `${BASE}/news-bar`,            icon: Rss },
    { label: 'About Page',  href: `${BASE}/about`,               icon: Info },
    { label: 'Departments', href: `${BASE}/departments`,         icon: Building2 },
    { label: 'Services',    href: `${BASE}/services`,            icon: Stethoscope },
  ]},
  { label: 'Medical Staff', icon: UserCheck, children: [
    { label: 'Doctors',     href: `${BASE}/doctors`,             icon: UserCheck },
    { label: 'All Staff',   href: `${BASE}/staff`,               icon: Users },
  ]},
  { label: 'Content', icon: FileText, children: [
    { label: 'Blog & News', href: `${BASE}/blog`,                icon: FileText },
    { label: 'Gallery',     href: `${BASE}/gallery`,             icon: ImageIcon },
    { label: 'Testimonials',href: `${BASE}/testimonials`,        icon: Star },
  ]},
  { label: 'Operations', icon: Calendar, children: [
    { label: 'Appointments',href: `${BASE}/appointments`,        icon: Calendar },
    { label: 'Messages',    href: `${BASE}/contact`,             icon: Mail },
    { label: 'Network',     href: `${BASE}/network`,             icon: MapPin },
  ]},
  { label: 'System', icon: Settings, children: [
    { label: 'Partners',    href: `${BASE}/partners`,            icon: Handshake },
    { label: 'Settings',    href: `${BASE}/settings`,            icon: Settings },
    { label: 'Admin Users', href: `${BASE}/admins`,              icon: Shield, superAdminOnly: true },
  ]},
];

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() =>
    item.children?.some(c => c.href && pathname.startsWith(c.href)) ?? false
  );
  const isActive = item.href ? pathname === item.href : false;

  if (item.children) {
    return (
      <div>
        <button onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-white/70 hover:text-white hover:bg-white/10 ${depth > 0 ? 'pl-5' : ''}`}>
          <item.icon className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
        {open && (
          <div className="ml-3 border-l border-white/10 pl-2 mt-0.5 space-y-0.5">
            {item.children.map(child => <NavLink key={child.label} item={child} depth={depth + 1} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href!}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-[#D4A017]/20 text-[#D4A017] font-semibold'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      } ${depth > 0 ? 'pl-4' : ''}`}>
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {item.label}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router  = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin-hck-2025');
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0F2340] text-white overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b border-white/10">
        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white p-0.5 flex-shrink-0">
          <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic" fill className="object-contain" sizes="36px" />
        </div>
        <div>
          <p className="font-bold text-sm text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            HOPE CLINIC
          </p>
          <p className="text-[#D4A017] text-[10px] font-semibold tracking-wider">ADMIN PORTAL</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(item => <NavLink key={item.label} item={item} />)}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-red-600/20 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[#F0F4FF] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 flex-shrink-0 flex-col shadow-xl">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex-shrink-0 flex flex-col shadow-xl">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-[#D1DCF5] px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-[#0F2340] rounded-lg hover:bg-[#EBF0FB]">
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-[#0F2340] font-semibold text-sm hidden sm:block">Hope Clinic Admin</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[#4A5568] hover:text-[#0F2340] rounded-lg hover:bg-[#EBF0FB]">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#0F2340] flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
