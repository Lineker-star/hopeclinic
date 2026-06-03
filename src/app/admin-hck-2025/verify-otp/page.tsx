'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function VerifyOTPPage() {
  const router = useRouter();
  const [digits, setDigits]   = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  useEffect(() => {
    refs[0].current?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs[i + 1].current?.focus();
    if (next.every(d => d)) verifyOTP(next.join(''));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs[i - 1].current?.focus();
  };

  const verifyOTP = async (code: string) => {
    if (attempts >= 3) { setError('Too many attempts. Please go back and log in again.'); return; }
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAttempts(a => a + 1);
        setError(data.error || 'Invalid code');
        setDigits(['', '', '', '', '', '']);
        refs[0].current?.focus();
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/admin-hck-2025/dashboard'), 800);
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (cooldown > 0) return;
    setCooldown(60);
    // Trigger re-send — user must refresh login for now
  };

  return (
    <div className="min-h-screen bg-[#0F2340] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-2 shadow-xl">
            <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic" fill className="object-contain" sizes="80px" />
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Verify Your Identity
          </h1>
          <p className="text-white/60 text-sm mt-2">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="font-bold text-[#0F2340] text-lg">Verified! Redirecting...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error} {attempts > 0 && `(${3 - attempts} attempts remaining)`}
                </div>
              )}

              <div className="flex justify-center gap-3 mb-6">
                {digits.map((d, i) => (
                  <input key={i} ref={refs[i]}
                    type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    disabled={loading || attempts >= 3}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl transition-all focus:outline-none focus:border-[#0F2340] disabled:opacity-50
                      border-[#D1DCF5] focus:ring-2 focus:ring-[#0F2340]/20"
                  />
                ))}
              </div>

              {loading && (
                <div className="text-center mb-4">
                  <span className="w-5 h-5 border-2 border-[#0F2340]/30 border-t-[#0F2340] rounded-full animate-spin inline-block" />
                </div>
              )}

              <p className="text-center text-[#8896B3] text-sm">
                Didn&apos;t receive the code?{' '}
                <button onClick={resendCode} disabled={cooldown > 0}
                  className="text-[#0F2340] font-semibold hover:underline disabled:opacity-50">
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                </button>
              </p>

              <p className="text-center text-[#8896B3] text-xs mt-3">
                Code expires in 10 minutes.{' '}
                <a href="/admin-hck-2025" className="text-[#0F2340] hover:underline">← Back to login</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
