'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export default function ServicesManager() {
  const router = useRouter();
  useEffect(() => { router.replace('/admin-hck-2025/dashboard/departments'); }, [router]);
  return (
    <div className="flex items-center justify-center py-20 text-[#8896B3]">
      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
      <span className="text-sm">Redirecting to Departments Manager…</span>
    </div>
  );
}
