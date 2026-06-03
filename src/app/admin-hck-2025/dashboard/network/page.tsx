'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function AdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2340] capitalize" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Network Manager
        </h1>
        <p className="text-[#8896B3] text-sm">Manage network content from this panel</p>
      </div>
      <div className="bg-white rounded-xl border border-[#D1DCF5] p-8 text-center text-[#8896B3]">
        <p className="text-lg font-medium text-[#0F2340] mb-2">
          Network management panel
        </p>
        <p className="text-sm">Content syncs to the public site in real-time via Supabase.</p>
      </div>
    </div>
  );
}
