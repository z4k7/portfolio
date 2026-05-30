"use client";
import { motion } from "framer-motion";
import { Mail, Code2, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PERSONAL } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

export default function Contact() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-gold-400/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-400 text-xs font-medium tracking-wider uppercase mb-6"
        >
          <span className="w-1 h-1 rounded-full bg-gold-400" />
          Contact
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          Let&apos;s build something{" "}
          <span className="gradient-text-accent text-glow">exceptional.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
        >
          I&apos;m open to senior engineering roles, contract work, and exciting fintech projects.
          If you&apos;re building something serious, let&apos;s talk.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gold-500 hover:bg-gold-600 text-white font-semibold transition-all duration-200 text-sm"
          >
            <Mail size={16} />
            {PERSONAL.email}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: <GithubIcon size={20} />, href: PERSONAL.github, label: "GitHub" },
            { icon: <LinkedinIcon size={20} />, href: PERSONAL.linkedin, label: "LinkedIn" },
            { icon: <Code2 size={20} />, href: PERSONAL.leetcode, label: "LeetCode" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-950/80 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-all duration-200 min-w-20"
            >
              <span className="text-zinc-500 group-hover:text-zinc-200 transition-colors">
                {social.icon}
              </span>
              <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                {social.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
