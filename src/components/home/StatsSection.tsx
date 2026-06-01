'use client';
import { useEffect, useRef, useState } from 'react';

// Real 10-year report data
const stats = [
  { value: 68791,  suffix: '',   label: 'Patients Treated (10 yrs)', prefix: '' },
  { value: 1135,   suffix: '+',  label: 'Surgeries Performed',       prefix: '' },
  { value: 1576,   suffix: '+',  label: 'Births / Deliveries',       prefix: '' },
  { value: 87,     suffix: '',   label: 'Dedicated Staff',           prefix: '' },
  { value: 15,     suffix: '',   label: 'Hope Clinics Worldwide',    prefix: '' },
  { value: 19,     suffix: '',   label: 'Health Campaigns',          prefix: '' },
];

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let v = 0;
    const step = target / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 20);
    return () => clearInterval(t);
  }, [started, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-[#1B3A6B] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">
            10 Years of Excellence
          </p>
          <h2 className="text-2xl font-bold text-white mt-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Impact in Numbers
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map(({ value, suffix, label, prefix }) => (
            <div key={label} className="group">
              <div className="text-3xl sm:text-4xl font-bold text-[#D4A017] mb-1 group-hover:text-white transition-colors"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <Counter target={value} suffix={suffix} prefix={prefix} />
              </div>
              <p className="text-white/65 text-xs font-medium leading-tight">{label}</p>
              <div className="w-6 h-0.5 bg-[#D4A017]/40 mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
