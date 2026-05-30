"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Layers, Zap, Globe } from "lucide-react";
import SectionWrapper from "@/components/common/SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { PERSONAL } from "@/lib/constants";

const traits = [
  {
    icon: <Code2 size={16} />,
    title: "Frontend Craftsman",
    desc: "330+ Angular components built with performance and scalability as first-class concerns.",
    color: "gold",
  },
  {
    icon: <Layers size={16} />,
    title: "System Architect",
    desc: "End-to-end systems spanning mobile, web, real-time APIs, and enterprise dashboards.",
    color: "gold-dim",
  },
  {
    icon: <Zap size={16} />,
    title: "Fintech Specialist",
    desc: "Multi-channel payment engines, Plaid integrations, and compliant financial workflows.",
    color: "emerald",
  },
  {
    icon: <Globe size={16} />,
    title: "Product Thinker",
    desc: "I bridge the gap between engineering complexity and user-facing clarity.",
    color: "gold",
  },
];

const colorMap: Record<string, string> = {
  gold:     "border-gold-400/20 bg-gold-400/5 text-gold-400",
  "gold-dim": "border-gold-500/20 bg-gold-500/5 text-gold-300",
  emerald:  "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
};

export default function About() {
  const { ref, inView } = useInView(0.15);

  return (
    <SectionWrapper
      id="about"
      label="About"
      title="Engineering with"
      titleAccent="intent."
      subtitle="I don't just write code — I architect systems that scale, perform under pressure, and genuinely move the needle."
    >
      <div ref={ref} className="grid lg:grid-cols-[280px_1fr] gap-12 xl:gap-20 items-start">

        {/* ── Left — Photo + quick facts ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center lg:items-start gap-5"
        >
          {/* Photo frame */}
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-[3px] rounded-2xl bg-linear-to-br from-gold-400/40 via-gold-500/20 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute -inset-[1px] rounded-2xl bg-linear-to-br from-gold-400/30 via-gold-500/10 to-transparent" />

            <div className="relative w-56 h-64 lg:w-64 lg:h-72 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/z4k.jpeg"
                alt={PERSONAL.name}
                fill
                sizes="(max-width: 768px) 224px, 256px"
                className="object-cover object-top grayscale-20 group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                priority
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>

            {/* Available badge — pinned bottom-left of photo */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">Open to work</span>
            </div>
          </div>

          {/* Name + role */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold text-white">{PERSONAL.name}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{PERSONAL.title}</p>
            <p className="text-xs text-zinc-700 mt-0.5">{PERSONAL.location}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {["Angular Expert", "Fintech Builder", "System Architect", "Flutter Dev"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-zinc-500 text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Right — Story + trait cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Bio text */}
          <div className="space-y-4">
            <motion.p variants={fadeInUp} className="text-zinc-300 text-base leading-relaxed">
              I&apos;m a Full-Stack Engineer based in Kerala, India, currently building fintech
              infrastructure at{" "}
              <span className="text-gold-400 font-medium">Paywint</span>. My work spans Angular
              frontend architecture, NestJS backends, Flutter mobile apps, and real-time WebSocket
              systems.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-zinc-500 text-sm leading-relaxed">
              I specialize in complex, high-stakes engineering: payment platforms with multi-channel
              flows, enterprise dashboards with AG Grid, RBAC systems, and embeddable SDK
              architectures. I care deeply about correctness, performance, and developer experience.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-zinc-500 text-sm leading-relaxed">
              Outside of shipping features, I build personal projects like{" "}
              <span className="text-emerald-400 font-medium">Tesseract</span> — a full-stack outlet
              management platform — and explore architectural patterns that push the boundaries of
              what frontend systems can do.
            </motion.p>
          </div>

          {/* Trait cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
            {traits.map((t) => (
              <motion.div
                key={t.title}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="p-4 rounded-xl bg-zinc-950/80 border border-white/5 hover:border-white/10 transition-colors duration-200"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border mb-3 ${colorMap[t.color]}`}>
                  {t.icon}
                </div>
                <h3 className="text-xs font-semibold text-white mb-1">{t.title}</h3>
                <p className="text-[11px] text-zinc-600 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
