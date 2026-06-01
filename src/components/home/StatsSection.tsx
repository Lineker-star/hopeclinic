'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 30726, suffix: '+', label: 'Patients Treated', prefix: '' },
  { value: 15, suffix: '', label: 'Functional Hope Clinics', prefix: '' },
  { value: 24, suffix: '/7', label: 'Emergency Care', prefix: '' },
  { value: 10, suffix: '+', label: 'Countries Reached', prefix: '' },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#8B0000] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, suffix, label, prefix }) => (
            <div key={label} className="group">
              <div
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-[#D4A017] transition-colors"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <AnimatedCounter target={value} suffix={suffix} prefix={prefix} />
              </div>
              <p className="text-white/70 text-sm sm:text-base font-medium">{label}</p>
              <div className="w-8 h-0.5 bg-[#D4A017] mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
