'use client';
import dynamic from 'next/dynamic';

const HopeClinicsNetworkMap = dynamic(() => import('./HopeClinicsNetworkMap'), { ssr: false });

export default function NetworkMapWrapper() {
  return <HopeClinicsNetworkMap />;
}
