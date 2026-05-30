"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import SectionWrapper from "@/components/common/SectionWrapper";
import { PROJECTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { staggerContainer } from "@/lib/animations";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative group p-6 rounded-2xl bg-zinc-950/80 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
      style={{ boxShadow: hovered ? `0 20px 60px -10px rgba(0,0,0,0.5)` : undefined }}
      onClick={onOpen}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 200, height: 200,
            left: mousePos.x - 100, top: mousePos.y - 100,
            background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
        >
          <Layers size={18} style={{ color: project.color }} />
        </div>
        {/* Show first repo icon on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.repos.slice(0, 1).map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <GithubIcon size={14} />
            </a>
          ))}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-1 font-mono">{project.name}</h3>
      <p className="text-xs mb-3" style={{ color: project.color }}>{project.tagline}</p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-500 text-xs font-mono">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: project.color }}>
          <span>View details</span>
          <motion.span animate={hovered ? { x: 4 } : { x: 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={12} />
          </motion.span>
        </div>
        {project.repos.length > 1 && (
          <span className="text-[10px] text-zinc-600 font-mono">{project.repos.length} repos</span>
        )}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        animate={hovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: (typeof PROJECTS)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/10 p-8"
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
          <X size={16} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
            <Layers size={22} style={{ color: project.color }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white font-mono">{project.name}</h2>
            <p className="text-sm" style={{ color: project.color }}>{project.tagline}</p>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed mb-6">{project.description}</p>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Key Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Repos */}
        <div className="flex flex-wrap gap-3">
          {project.repos.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-all">
              <GithubIcon size={14} />
              {r.label}
            </a>
          ))}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:opacity-80 transition-all"
              style={{ background: `${project.color}15`, borderColor: `${project.color}30`, color: project.color }}>
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const { ref, inView } = useInView(0.1);

  return (
    <SectionWrapper
      id="projects"
      label="Projects"
      title="Featured"
      titleAccent="work."
      subtitle="Production systems I've built from scratch — each solving real engineering challenges."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} onOpen={() => setSelectedProject(project)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
