import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { Lock, Mail, User, Phone, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Account — Hope Clinic Koumé',
  description: 'Register for a Hope Clinic Koumé account to book appointments and access healthcare services.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F1] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-3">
            <Image src="/images/Hope_Clinic_logo.jpg" alt="Hope Clinic" fill className="object-contain rounded-lg" sizes="64px" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Create Your Account
          </h1>
          <p className="text-[#9A9A9A] text-sm mt-1">Join Hope Clinic to book appointments online</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <button className="w-full flex items-center justify-center gap-3 border-2 border-[#E5E1DC] rounded-xl py-3 text-sm font-semibold text-[#2D2D2D] hover:bg-[#F9F6F1] hover:border-[#C8102E] transition-all mb-6">
            <FaGoogle className="w-4 h-4 text-[#EA4335]" />
            Continue with Google
          </button>
          <div className="relative flex items-center mb-6">
            <div className="flex-1 border-t border-[#E5E1DC]" />
            <span className="px-4 text-[#9A9A9A] text-xs">OR</span>
            <div className="flex-1 border-t border-[#E5E1DC]" />
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input type="text" name="name" required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input type="email" name="email" required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input type="tel" name="phone"
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="+237 ..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Country</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                  <select name="country" className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] bg-white transition-all">
                    <option>Cameroon</option>
                    <option>Côte d'Ivoire</option>
                    <option>Nigeria</option>
                    <option>Uganda</option>
                    <option>Gabon</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Date of Birth</label>
                <input type="date" name="dob"
                  className="w-full px-3 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input type="password" name="password" required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input type="password" name="confirmPassword" required
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E1DC] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] transition-all"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-[#C8102E]" />
              <span className="text-sm text-[#5A5A5A]">
                I agree to the{' '}
                <Link href="#" className="text-[#C8102E] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="#" className="text-[#C8102E] hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-semibold hover:bg-[#8B0000] transition-colors text-sm">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-[#9A9A9A] mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#C8102E] font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
