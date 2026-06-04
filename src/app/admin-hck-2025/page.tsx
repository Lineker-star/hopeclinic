'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router   = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }
      // Always go to verify-otp (TOTP via Google Authenticator)
      router.push('/admin-hck-2025/verify-otp');
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2340] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Hope_Clinic_logo.jpg"
            alt="Hope Clinic"
            className="w-20 h-20 mx-auto mb-4 rounded-xl object-contain"
          />
          <h1 className="text-2xl font-bold text-[#0F2340]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Hope Clinic
          </h1>
          <p className="text-[#D4A017] font-semibold text-sm tracking-wider">ADMIN PORTAL</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]"
              placeholder="admin@hopeclinic.koume.org"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#0F2340] text-white rounded-lg font-semibold text-base hover:bg-[#1B3A6B] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-gray-400">
          You will be asked for your Google Authenticator code next.
        </p>
      </div>
    </div>
  );
}
