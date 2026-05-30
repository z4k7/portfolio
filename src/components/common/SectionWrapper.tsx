"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  label?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
}

export default function SectionWrapper({
  children,
  id,
  className,
  label,
  title,
  titleAccent,
  subtitle,
}: SectionWrapperProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section id={id} className={cn("section-padding relative", className)}>
      <div className="max-w-6xl mx-auto px-6">
        {(label || title) && (
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-16 text-center"
          >
            {label && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-400 text-xs font-medium tracking-wider uppercase mb-4"
              >
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                {label}
              </motion.div>
            )}
            {title && (
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                {title}{" "}
                {titleAccent && (
                  <span className="gradient-text-accent">{titleAccent}</span>
                )}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
