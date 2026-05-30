"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import { useMousePosition } from "@/hooks/useMousePosition";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";

// Three.js scene — dynamic import to avoid SSR crash
const HeroScene = dynamic(() => import("@/components/effects/HeroScene"), { ssr: false });

// ─── Particle canvas ─────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.25 + 0.04,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.05 * (1 - d / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />;
}

// ─── Marquee strip ───────────────────────────────────────────────────────────
const marqueeItems = [
  "Angular 21", "·", "NestJS", "·", "Flutter", "·", "TypeScript", "·",
  "PostgreSQL", "·", "WebSockets", "·", "Plaid", "·", "Stripe", "·",
  "Prisma", "·", "AWS", "·", "Node.js", "·", "Socket.IO", "·",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden py-3 border-y border-white/4">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className={item === "·" ? "text-zinc-700" : "text-xs font-mono text-zinc-600 tracking-widest uppercase"}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const mouse = useMousePosition();

  // Normalize mouse to -1..1 for the 3D scene
  const mouseNorm = {
    x: typeof window !== "undefined" ? (mouse.x / window.innerWidth) * 2 - 1 : 0,
    y: typeof window !== "undefined" ? -((mouse.y / window.innerHeight) * 2 - 1) : 0,
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden grid-bg">
      <ParticleField />

      {/* Mouse-follow glow */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          width: 500, height: 500,
          left: mouse.x - 250, top: mouse.y - 250,
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-gold-400/4 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500/4 blur-3xl animate-float-delay pointer-events-none" />

      {/* ── Main content: 2-col on desktop ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 grid lg:grid-cols-[55fr_45fr] gap-8 items-center pt-32 pb-8">

        {/* ── Left — Text ── */}
        <div className="flex flex-col">
          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400/80 font-medium">Available</span>
            </div>
            <span className="text-zinc-800">·</span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-600">
              <MapPin size={10} />
              {PERSONAL.location}
            </div>
            <span className="text-zinc-800">·</span>
            <span className="text-xs text-zinc-700 font-mono">Full-Stack Engineer</span>
          </motion.div>

          {/* Name */}
          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%", skewY: 3 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight text-white"
              >
                Sachin
              </motion.h1>
            </div>
            <div className="overflow-hidden flex items-end gap-4">
              <motion.h1
                initial={{ y: "105%", skewY: 3 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.9, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.9] tracking-tight gradient-text-accent"
              >
                KP
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                className="pb-3 hidden sm:block"
              >
                <p className="text-sm text-zinc-400 leading-snug max-w-55">
                  Building fintech systems &amp; real-time platforms that actually scale.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Mobile tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="sm:hidden text-sm text-zinc-400 mb-8 max-w-sm leading-relaxed"
          >
            Building fintech systems &amp; real-time platforms that actually scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.15 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-zinc-950 text-sm font-semibold transition-all duration-200"
            >
              View work
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="px-5 py-2.5 rounded-xl border border-white/8 text-zinc-400 text-sm font-medium hover:border-white/15 hover:text-zinc-200 transition-all duration-200"
            >
              Get in touch
            </a>
            <div className="ml-auto flex items-center gap-3">
              <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150">
                <GithubIcon size={17} />
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150">
                <LinkedinIcon size={17} />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.3 }}
            className="border-t border-white/5 pt-6 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { value: "330+", label: "Components" },
              { value: "2.5+", label: "Yrs Experience" },
              { value: "40+",  label: "REST APIs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-zinc-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right — 3D scene ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full" style={{ aspectRatio: "1 / 1", maxWidth: 480 }}>
            {/* Glow orb behind the canvas */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse-glow"
                style={{ background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)" }}
              />
            </div>
            <HeroScene mouseNorm={mouseNorm} />
          </div>
        </motion.div>
      </div>

      {/* ── Marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="relative z-10"
      >
        <Marquee />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="absolute bottom-16 right-6 flex flex-col items-center gap-1.5"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={13} className="text-zinc-700" />
        </motion.div>
        <span className="text-[10px] text-zinc-800 tracking-[0.2em] uppercase" style={{ writingMode: "vertical-rl" }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}
