'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      router.push('/admin-hck-2025/verify-otp');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2340] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-2 shadow-xl">
            <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic" fill className="object-contain" sizes="80px" />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Admin Portal
          </h1>
          <p className="text-white/50 text-sm mt-1">Hope Clinic Koumé — Secure Access</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0F2340] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/25 focus:border-[#0F2340] transition-all"
                  placeholder="admin@hopeclinickoume.org" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F2340] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-10 py-3 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/25 focus:border-[#0F2340] transition-all"
                  placeholder="Your password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8896B3] hover:text-[#0F2340]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#0F2340] text-white py-3 rounded-xl font-bold hover:bg-[#1B3A6B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-[#8896B3] mt-6">
            A 6-digit OTP will be sent to your email to complete sign-in.
          </p>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Hope Clinic Koumé Admin — Restricted Access
        </p>
      </div>
    </div>
  );
}
