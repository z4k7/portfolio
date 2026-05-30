"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/common/SectionWrapper";
import { EXPERIENCE } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

export default function Experience() {
  const [expanded, setExpanded] = useState<string>(EXPERIENCE[0].company);
  const { ref, inView } = useInView(0.1);

  return (
    <SectionWrapper
      id="experience"
      label="Experience"
      title="Where I've"
      titleAccent="shipped."
      subtitle="Real systems, real users, real scale."
    >
      <div ref={ref} className="max-w-3xl mx-auto space-y-3">
        {EXPERIENCE.map((exp, i) => {
          const isOpen = expanded === exp.company;

          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <button
                onClick={() => setExpanded(isOpen ? "" : exp.company)}
                className="w-full text-left"
              >
                <div
                  className={`group relative px-6 py-5 rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-zinc-950 border-gold-400/30"
                      : "bg-zinc-950/60 border-white/5 hover:border-white/10 hover:bg-zinc-950/80"
                  }`}
                >
                  {/* Left accent bar */}
                  {isOpen && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute left-0 top-4 bottom-4 w-0.75 rounded-full bg-linear-to-b from-gold-400 to-gold-600"
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Index */}
                      <span className="text-xs font-mono text-zinc-700 w-4 shrink-0">
                        0{i + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-bold text-white">{exp.company}</span>
                          {exp.current && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              Now
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-sm text-zinc-400">{exp.role}</span>
                          <span className="text-zinc-700">·</span>
                          <span className="text-xs text-zinc-600 font-mono">{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-zinc-600 shrink-0"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && exp.projects.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 ml-8 space-y-5">
                          {exp.projects.map((proj) => (
                            <div key={proj.name} className="relative pl-4 border-l border-white/5">
                              {/* Project header */}
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={12} className="text-gold-400 shrink-0" />
                                <span className="text-sm font-semibold text-white">{proj.name}</span>
                                <span className="text-xs text-gold-400/70 italic">{proj.description}</span>
                              </div>

                              {/* Highlights grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                {proj.highlights.map((h) => (
                                  <div key={h} className="flex items-center gap-2 text-xs text-zinc-500">
                                    <div className="w-1 h-1 rounded-full bg-gold-400/50 shrink-0" />
                                    {h}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* Location tag */}
                          {exp.location && (
                            <div className="flex items-center gap-1.5 text-xs text-zinc-700 mt-2">
                              <MapPin size={10} />
                              {exp.location}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
