'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyOTP() {
  const router = useRouter();
  useEffect(() => { router.replace('/admin-hck-2025'); }, [router]);
  return null;
}
