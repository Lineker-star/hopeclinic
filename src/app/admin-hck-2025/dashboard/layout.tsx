'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Home, Rss, Info, Building2, Stethoscope,
  UserCheck, Users, FileText, Image as ImageIcon, Star,
  Calendar, Mail, MapPin, Handshake, Settings, Shield,
  LogOut, Menu, X, Bell, ChevronDown, ChevronRight,
} from 'lucide-react';

/* ─── Nav definition ─── */
type NavLeaf   = { label: string; href: string; icon: React.ComponentType<{className?: string}>; superAdminOnly?: boolean };
type NavGroup  = { label: string; icon: React.ComponentType<{className?: string}>; children: NavLeaf[] };
type NavItem   = NavLeaf | NavGroup;

const BASE = '/admin-hck-2025/dashboard';

const NAV: NavItem[] = [
  { label: 'Dashboard', href: BASE, icon: LayoutDashboard },
  {
    label: 'Website Content', icon: Home,
    children: [
      { label: 'Homepage',    href: `${BASE}/home`,        icon: Home },
      { label: 'News Bar',    href: `${BASE}/news-bar`,    icon: Rss },
      { label: 'About Page',  href: `${BASE}/about`,       icon: Info },
      { label: 'Departments', href: `${BASE}/departments`, icon: Building2 },
      { label: 'Services',    href: `${BASE}/services`,    icon: Stethoscope },
    ],
  },
  {
    label: 'Medical Staff', icon: UserCheck,
    children: [
      { label: 'Doctors',   href: `${BASE}/doctors`, icon: UserCheck },
      { label: 'All Staff', href: `${BASE}/staff`,   icon: Users },
    ],
  },
  {
    label: 'Content', icon: FileText,
    children: [
      { label: 'Blog & News',   href: `${BASE}/blog`,         icon: FileText },
      { label: 'Gallery',       href: `${BASE}/gallery`,      icon: ImageIcon },
      { label: 'Testimonials',  href: `${BASE}/testimonials`, icon: Star },
    ],
  },
  {
    label: 'Operations', icon: Calendar,
    children: [
      { label: 'Appointments', href: `${BASE}/appointments`, icon: Calendar },
      { label: 'Messages',     href: `${BASE}/contact`,      icon: Mail },
      { label: 'Network',      href: `${BASE}/network`,      icon: MapPin },
    ],
  },
  {
    label: 'System', icon: Settings,
    children: [
      { label: 'Partners',    href: `${BASE}/partners`,  icon: Handshake },
      { label: 'Settings',    href: `${BASE}/settings`,  icon: Settings },
      { label: 'Admin Users', href: `${BASE}/admins`,    icon: Shield, superAdminOnly: true },
    ],
  },
];

/* ─── Individual nav link ─── */
function Leaf({ item, onNav }: { item: NavLeaf; onNav?: () => void }) {
  const pathname  = usePathname();
  const isActive  = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onNav}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-[#D4A017]/20 text-[#D4A017] font-semibold'
          : 'text-white/65 hover:text-white hover:bg-white/10'
      }`}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      {item.label}
    </Link>
  );
}

/* ─── Collapsible group ─── */
function Group({ item, onNav }: { item: NavGroup; onNav?: () => void }) {
  const pathname  = usePathname();
  const hasActive = item.children.some(c => pathname.startsWith(c.href));
  const [open, setOpen] = useState(hasActive);

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/65 hover:text-white hover:bg-white/10 transition-colors"
      >
        <item.icon className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      {open && (
        <div className="ml-3 mt-0.5 pl-2 border-l border-white/10 space-y-0.5">
          {item.children.map(child => (
            <Leaf key={child.href} item={child} onNav={onNav} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar content ─── */
function SidebarContent({ onNav }: { onNav?: () => void }) {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin-hck-2025');
  };

  return (
    <div className="flex flex-col h-full bg-[#0F2340] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 flex-shrink-0">
        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white p-0.5 flex-shrink-0">
          <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic" fill className="object-contain" sizes="36px" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight text-white truncate"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            HOPE CLINIC
          </p>
          <p className="text-[#D4A017] text-[10px] font-semibold tracking-wider">ADMIN PORTAL</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {NAV.map(item =>
          'href' in item
            ? <Leaf key={item.href} item={item as NavLeaf} onNav={onNav} />
            : <Group key={item.label} item={item as NavGroup} onNav={onNav} />
        )}
      </nav>

      {/* Logout */}
      <div className="flex-shrink-0 px-2 py-3 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-red-600/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

/* ─── Layout ─── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router  = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName]     = useState('Admin');
  const [checking, setChecking]       = useState(true);

  // Auth check — redirect if no valid session
  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) {
          router.replace('/admin-hck-2025');
        } else {
          setAdminName(d.name ?? 'Admin');
          setChecking(false);
        }
      })
      .catch(() => router.replace('/admin-hck-2025'));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0F2340] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F0F4FF] overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <aside className="w-60 flex-shrink-0 flex flex-col shadow-2xl">
            <SidebarContent onNav={() => setSidebarOpen(false)} />
          </aside>
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-[#D1DCF5] px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#0F2340] hover:bg-[#EBF0FB] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-[#0F2340] font-semibold text-sm hidden sm:block">
              Hope Clinic Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-[#4A5568] hover:bg-[#EBF0FB] transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0F2340] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-[#0F2340] hidden sm:block">{adminName}</span>
            </div>
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

