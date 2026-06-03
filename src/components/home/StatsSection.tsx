'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

// Real 10-year report data — 23 campaigns
const stats = [
  { value: 68791,  suffix: '',   label: 'Patients Treated (10 yrs)' },
  { value: 1135,   suffix: '+',  label: 'Surgeries Performed'       },
  { value: 1576,   suffix: '+',  label: 'Births / Deliveries'       },
  { value: 87,     suffix: '',   label: 'Dedicated Staff'           },
  { value: 15,     suffix: '',   label: 'Hope Clinics Worldwide'    },
  { value: 23,     suffix: '',   label: 'Health Campaigns'          },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount]   = useState(0);
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-[#0F2340] text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="text-center mb-8">
          <p className="text-[#D4A017] font-semibold text-sm uppercase tracking-widest">10 Years of Excellence</p>
          <h2 className="text-2xl font-bold text-white mt-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Our Impact in Numbers
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map(({ value, suffix, label }) => (
            <motion.div key={label} variants={fadeInUp} className="group">
              <div className="text-3xl sm:text-4xl font-bold text-[#D4A017] mb-1 group-hover:text-white transition-colors"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <Counter target={value} suffix={suffix} />
              </div>
              <p className="text-white/60 text-xs font-medium leading-tight">{label}</p>
              <div className="w-6 h-0.5 bg-[#D4A017]/30 mx-auto mt-2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
