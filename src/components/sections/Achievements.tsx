"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/common/SectionWrapper";
import { ACHIEVEMENTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const duration = 1500;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="text-4xl md:text-5xl font-black gradient-text-accent tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const { ref, inView } = useInView(0.2);

  return (
    <SectionWrapper
      id="achievements"
      label="Impact"
      title="By the"
      titleAccent="numbers."
      subtitle="Concrete outputs from real production systems."
    >
      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            className="group relative p-6 rounded-2xl bg-zinc-950/80 border border-white/5 hover:border-gold-400/20 hover:bg-zinc-950 transition-all duration-300 overflow-hidden text-center"
          >
            <AnimatedCounter value={a.value} suffix={a.suffix} inView={inView} />
            <p className="mt-2 text-xs text-zinc-500 font-medium leading-tight">{a.label}</p>

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gold-400/3 rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
