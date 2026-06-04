'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Known TOTP secret for this deployment — QR code pre-generated from it
const TOTP_URI =
  'otpauth://totp/HopeClinic:admin@hopeclinic.koume.org?secret=JBSWY3DPEHPK3PXP&issuer=HopeClinic';

export default function VerifyOTPPage() {
  const router  = useRouter();
  const [digits,   setDigits]   = useState(['', '', '', '', '', '']);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(false);
  const [qrSrc,    setQrSrc]    = useState('');
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  // Generate QR code on client using qrcode
  useEffect(() => {
    import('qrcode').then(QRCode => {
      QRCode.default.toDataURL(TOTP_URI, { width: 220, margin: 2 }).then(setQrSrc).catch(() => {});
    }).catch(() => {});
    inputRefs[0].current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const verify = useCallback(async (code: string) => {
    if (loading || attempts >= 3) return;
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/auth/verify-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ otp: code }),
      });
      const data = await res.json();
      if (!res.ok) {
        const next = attempts + 1;
        setAttempts(next);
        setError(
          next >= 3
            ? 'Too many attempts. Go back and log in again.'
            : `${data.error || 'Invalid code.'} ${3 - next} attempt${3 - next === 1 ? '' : 's'} left.`
        );
        setDigits(['', '', '', '', '', '']);
        setTimeout(() => inputRefs[0].current?.focus(), 50);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/admin-hck-2025/dashboard'), 800);
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, attempts, router]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputRefs[i + 1].current?.focus();
    if (next.every(d => d !== '')) verify(next.join(''));
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputRefs[i - 1].current?.focus();
  };

  const locked = attempts >= 3;

  return (
    <div className="min-h-screen bg-[#0F2340] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Two-Factor Verification
          </h1>
          <p className="text-white/60 text-sm mt-1">Hope Clinic Admin Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-9 h-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#0F2340] font-bold text-lg">Verified! Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              {/* QR code section */}
              <div className="bg-[#F8FAFF] rounded-xl p-5 mb-6 border border-[#D1DCF5]">
                <p className="text-sm font-semibold text-[#0F2340] mb-3 text-center">
                  Step 1 — Scan with Google Authenticator
                </p>
                <div className="flex justify-center mb-3">
                  {qrSrc ? (
                    <img src={qrSrc} alt="QR Code for Google Authenticator" className="rounded-lg shadow-sm" style={{ width: 200, height: 200 }} />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-[#EBF0FB] rounded-lg flex items-center justify-center">
                      <span className="text-[#8896B3] text-xs">Loading QR...</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#8896B3] mb-1">Or enter this secret manually:</p>
                  <code className="text-xs font-mono bg-[#EBF0FB] text-[#0F2340] px-3 py-1.5 rounded-lg font-bold tracking-widest">
                    JBSWY3DPEHPK3PXP
                  </code>
                </div>
              </div>

              {/* Code input */}
              <p className="text-sm font-semibold text-[#0F2340] mb-3 text-center">
                Step 2 — Enter the 6-digit code from the app
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-center gap-2 mb-5">
                {digits.map((d, i) => (
                  <input key={i} ref={inputRefs[i]}
                    type="text" inputMode="numeric" maxLength={1} value={d}
                    disabled={loading || locked}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className={[
                      'w-11 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all',
                      'focus:outline-none focus:border-[#0F2340] focus:ring-2 focus:ring-[#0F2340]/15',
                      'disabled:opacity-40',
                      d ? 'border-[#0F2340] bg-[#EBF0FB]' : 'border-[#D1DCF5] bg-white',
                    ].join(' ')}
                  />
                ))}
              </div>

              {loading && (
                <div className="flex justify-center mb-4">
                  <span className="w-6 h-6 border-2 border-[#0F2340]/20 border-t-[#0F2340] rounded-full animate-spin" />
                </div>
              )}

              {!locked && (
                <button
                  onClick={() => verify(digits.join(''))}
                  disabled={loading || digits.some(d => !d)}
                  className="w-full py-3 bg-[#0F2340] text-white rounded-xl font-bold hover:bg-[#1B3A6B] transition-colors disabled:opacity-50"
                >
                  Verify Code
                </button>
              )}

              <p className="text-center text-xs text-[#8896B3] mt-4">
                <a href="/admin-hck-2025" className="hover:text-[#0F2340] hover:underline transition-colors">
                  ← Back to login
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
