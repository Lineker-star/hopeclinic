import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { Lock, Mail, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login — Hope Clinic Koumé',
  description: 'Login to your Hope Clinic Koumé account to book appointments and access your health records.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-3">
            <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic Koumé" fill className="object-contain rounded-lg" sizes="64px" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Welcome Back
          </h1>
          <p className="text-[#9A9A9A] text-sm mt-1">Login to your Hope Clinic account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Google OAuth */}
          <button className="w-full flex items-center justify-center gap-3 border-2 border-[#E5E1DC] rounded-xl py-3 text-sm font-semibold text-[#2D2D2D] hover:bg-[#F9F6F1] hover:border-[#C8102E] transition-all mb-6">
            <FaGoogle className="w-4 h-4 text-[#EA4335]" />
            Continue with Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-1 border-t border-[#E5E1DC]" />
            <span className="px-4 text-[#9A9A9A] text-xs">OR</span>
            <div className="flex-1 border-t border-[#E5E1DC]" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input
                  type="email" name="email" required autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input
                  type="password" name="password" required autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="Your password"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#2D2D2D]">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E5E1DC] accent-[#C8102E]" />
                <span className="text-sm text-[#5A5A5A]">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#C8102E] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-semibold hover:bg-[#8B0000] transition-colors text-sm"
            >
              Login to Your Account
            </button>
          </form>

          <p className="text-center text-sm text-[#9A9A9A] mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-[#C8102E] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#9A9A9A] mt-4">
          By logging in, you agree to our{' '}
          <Link href="#" className="text-[#C8102E] hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="#" className="text-[#C8102E] hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
