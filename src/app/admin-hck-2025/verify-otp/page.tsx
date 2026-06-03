'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

const DIGIT_COUNT = 6;
const MAX_ATTEMPTS = 3;
const RESEND_COOLDOWN = 60;

export default function VerifyOTPPage() {
  const router = useRouter();
  const [digits, setDigits]     = useState<string[]>(Array(DIGIT_COUNT).fill(''));
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = Array.from({ length: DIGIT_COUNT }, () => useRef<HTMLInputElement>(null));

  // Focus first box on mount
  useEffect(() => { inputRefs[0].current?.focus(); }, []);

  // Resend countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const locked = attempts >= MAX_ATTEMPTS;

  const verify = useCallback(async (code: string) => {
    if (loading || locked) return;
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
        const next = attempts + 1;
        setAttempts(next);
        setError(
          next >= MAX_ATTEMPTS
            ? 'Too many failed attempts. Please go back and log in again.'
            : `Incorrect code. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next === 1 ? '' : 's'} remaining.`
        );
        setDigits(Array(DIGIT_COUNT).fill(''));
        setTimeout(() => inputRefs[0].current?.focus(), 50);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/admin-hck-2025/dashboard'), 900);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, locked, attempts, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;                    // digits only
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < DIGIT_COUNT - 1) {
      inputRefs[index + 1].current?.focus();             // advance
    }
    if (next.every(d => d !== '')) {
      verify(next.join(''));                             // auto-submit when full
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === 'ArrowLeft'  && index > 0)              inputRefs[index - 1].current?.focus();
    if (e.key === 'ArrowRight' && index < DIGIT_COUNT - 1) inputRefs[index + 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DIGIT_COUNT);
    if (!pasted) return;
    const next = Array(DIGIT_COUNT).fill('');
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    const focusIdx = Math.min(pasted.length, DIGIT_COUNT - 1);
    inputRefs[focusIdx].current?.focus();
    if (pasted.length === DIGIT_COUNT) verify(pasted);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
    setError('');
    setAttempts(0);
    setDigits(Array(DIGIT_COUNT).fill(''));
    setTimeout(() => inputRefs[0].current?.focus(), 50);
    // Navigate back to login to re-trigger OTP send
    router.push('/admin-hck-2025');
  };

  return (
    <div className="min-h-screen bg-[#0F2340] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-white p-2 shadow-xl">
            <Image
              src="/images/Hope_Clinic_logo.jpg"
              alt="Hope Clinic Koumé"
              fill className="object-contain" sizes="80px"
            />
          </div>
          <h1 className="text-3xl font-bold text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Two-Factor Verification
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-green-600" />
              </div>
              <p className="text-[#0F2340] font-bold text-lg">Verified! Redirecting…</p>
            </div>
          ) : (
            <>
              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Digit inputs */}
              <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={loading || locked}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className={[
                      'w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all',
                      'focus:outline-none focus:border-[#0F2340] focus:ring-2 focus:ring-[#0F2340]/20',
                      'disabled:opacity-40 disabled:cursor-not-allowed',
                      digit ? 'border-[#0F2340] bg-[#EBF0FB]' : 'border-[#D1DCF5]',
                    ].join(' ')}
                  />
                ))}
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex justify-center mb-4">
                  <span className="w-6 h-6 border-2 border-[#0F2340]/20 border-t-[#0F2340] rounded-full animate-spin" />
                </div>
              )}

              {/* Resend */}
              <div className="text-center text-sm text-[#8896B3]">
                Didn&apos;t receive a code?{' '}
                <button
                  onClick={handleResend}
                  disabled={cooldown > 0 || locked}
                  className="inline-flex items-center gap-1 text-[#0F2340] font-semibold hover:underline disabled:opacity-40 disabled:no-underline transition-opacity"
                >
                  {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : <><RotateCcw className="w-3 h-3" /> Resend Code</>
                  }
                </button>
              </div>

              {/* Back link */}
              <p className="text-center text-xs text-[#8896B3] mt-4">
                Wrong account?{' '}
                <a href="/admin-hck-2025" className="text-[#0F2340] font-semibold hover:underline">
                  ← Back to login
                </a>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Code expires in 10 minutes · Max {MAX_ATTEMPTS} attempts
        </p>
      </div>
    </div>
  );
}
