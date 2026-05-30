"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiAngular, SiTypescript, SiReactivex, SiNestjs, SiNodedotjs,
  SiFlutter, SiPostgresql, SiMongodb, SiMysql,
  SiStripe, SiTailwindcss, SiPrisma, SiExpress, SiPuppeteer,
  SiDart, SiJsonwebtokens, SiGit, SiGithub, SiPostman,
  SiSocketdotio, SiFastapi, SiPython, SiSqlalchemy, SiPydantic,
  SiCloudinary, SiRender
} from "react-icons/si";
import { TbApi, TbCloud, TbShieldLock, TbFingerprint } from "react-icons/tb";
import { MdOutlinePayment, MdOutlineSms } from "react-icons/md";
import SectionWrapper from "@/components/common/SectionWrapper";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const SKILLS_WITH_ICONS: Record<string, { label: string; icon: React.ReactNode; color: string }[]> = {
  Frontend: [
    { label: "Angular 21",      icon: <SiAngular />,      color: "#dd0031" },
    { label: "TypeScript",      icon: <SiTypescript />,   color: "#3178c6" },
    { label: "RxJS",            icon: <SiReactivex />,    color: "#b7178c" },
    { label: "Angular Signals", icon: <SiAngular />,      color: "#dd0031" },
    { label: "Tailwind CSS",    icon: <SiTailwindcss />,  color: "#06b6d4" },
    { label: "HTML5",           icon: <TbApi />,          color: "#e34c26" },
    { label: "SCSS",            icon: <TbApi />,          color: "#cc6699" },
  ],
  Backend: [
    { label: "NestJS",       icon: <SiNestjs />,      color: "#e0234e" },
    { label: "Node.js",      icon: <SiNodedotjs />,   color: "#68a063" },
    { label: "Express.js",   icon: <SiExpress />,     color: "#ffffff" },
    { label: "FastAPI",      icon: <SiFastapi />,     color: "#009688" },
    { label: "Python",       icon: <SiPython />,      color: "#3776ab" },
    { label: "Prisma ORM",   icon: <SiPrisma />,      color: "#5a67d8" },
    { label: "SQLAlchemy",   icon: <SiSqlalchemy />,  color: "#d71f00" },
    { label: "Pydantic",     icon: <SiPydantic />,    color: "#e92063" },
    { label: "WebSockets",   icon: <SiSocketdotio />, color: "#ffffff" },
    { label: "Puppeteer",    icon: <SiPuppeteer />,   color: "#40b5a4" },
    { label: "REST APIs",    icon: <TbApi />,         color: "#a78bfa" },
  ],
  Mobile: [
    { label: "Flutter",  icon: <SiFlutter />, color: "#54c5f8" },
    { label: "Dart",     icon: <SiDart />,    color: "#0175c2" },
    { label: "Riverpod", icon: <TbApi />,     color: "#1e4c96" },
    { label: "GoRouter", icon: <TbApi />,     color: "#00adef" },
  ],
  Databases: [
    { label: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
    { label: "MongoDB",    icon: <SiMongodb />,    color: "#47a248" },
    { label: "MySQL",      icon: <SiMysql />,      color: "#4479a1" },
  ],
  Security: [
    { label: "JWT",                icon: <SiJsonwebtokens />, color: "#d63aff" },
    { label: "RBAC",               icon: <TbShieldLock />,    color: "#f59e0b" },
    { label: "Device Fingerprinting", icon: <TbFingerprint />, color: "#ec4899" },
    { label: "Rate Limiting",      icon: <TbShieldLock />,    color: "#ef4444" },
    { label: "Helmet",             icon: <TbShieldLock />,    color: "#6366f1" },
  ],
  "DevOps/Tooling": [
    { label: "Git",           icon: <SiGit />,      color: "#f05032" },
    { label: "GitHub",        icon: <SiGithub />,   color: "#ffffff" },
    { label: "AWS",           icon: <TbCloud />,    color: "#ff9900" },
    { label: "Render",        icon: <SiRender />,   color: "#46e3b7" },
    { label: "Postman",       icon: <SiPostman />,  color: "#ff6c37" },
    { label: "Prisma Studio", icon: <SiPrisma />,   color: "#5a67d8" },
  ],
  Integrations: [
    { label: "Plaid",              icon: <MdOutlinePayment />, color: "#00c8a0" },
    { label: "Stripe",             icon: <SiStripe />,         color: "#635bff" },
    { label: "Razorpay",           icon: <MdOutlinePayment />, color: "#3395ff" },
    { label: "Cloudinary",         icon: <SiCloudinary />,     color: "#3448c5" },
    { label: "MSG91",              icon: <MdOutlineSms />,     color: "#ea4c89" },
    { label: "Socket.IO",          icon: <SiSocketdotio />,    color: "#ffffff" },
    { label: "Pusher",             icon: <TbApi />,            color: "#300d4f" },
    { label: "AG Grid Enterprise", icon: <TbApi />,            color: "#ff8800" },
    { label: "Chart.js",           icon: <TbApi />,            color: "#ff6384" },
  ],
};

const CATEGORY_META: Record<string, { accent: string; bg: string; border: string }> = {
  Frontend:         { accent: "#c9a84c", bg: "rgba(201,168,76,0.06)",  border: "rgba(201,168,76,0.15)" },
  Backend:          { accent: "#c084fc", bg: "rgba(192,132,252,0.06)", border: "rgba(192,132,252,0.15)" },
  Mobile:           { accent: "#38bdf8", bg: "rgba(56,189,248,0.06)",  border: "rgba(56,189,248,0.15)" },
  Databases:        { accent: "#4ade80", bg: "rgba(74,222,128,0.06)",  border: "rgba(74,222,128,0.15)" },
  Security:         { accent: "#fb923c", bg: "rgba(251,146,60,0.06)",  border: "rgba(251,146,60,0.15)" },
  "DevOps/Tooling": { accent: "#facc15", bg: "rgba(250,204,21,0.06)",  border: "rgba(250,204,21,0.15)" },
  Integrations:     { accent: "#34d399", bg: "rgba(52,211,153,0.06)",  border: "rgba(52,211,153,0.15)" },
};

const categories = Object.keys(SKILLS_WITH_ICONS);

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, inView } = useInView(0.1);

  const visible = activeCategory ? [activeCategory] : categories;

  return (
    <SectionWrapper
      id="skills"
      label="Skills"
      title="Tech"
      titleAccent="arsenal."
      subtitle="A production-grade stack built for scale — from mobile to enterprise."
    >
      <div ref={ref}>
        {/* Category pills */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <motion.button
            variants={fadeInUp}
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === null
                ? "bg-gold-500 text-zinc-950 shadow-[0_0_16px_rgba(201,168,76,0.4)]"
                : "bg-zinc-900 border border-white/5 text-zinc-400 hover:border-white/10 hover:text-zinc-200"
            }`}
          >
            All
          </motion.button>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                variants={fadeInUp}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className="px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
                style={
                  isActive
                    ? { background: meta.bg, borderColor: meta.border, color: meta.accent, boxShadow: `0 0 16px ${meta.accent}25` }
                    : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)", color: "#71717a" }
                }
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {visible.map((category) => {
              const meta = CATEGORY_META[category];
              const skills = SKILLS_WITH_ICONS[category];
              return (
                <motion.div
                  key={category}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border p-6"
                  style={{ background: "rgba(9,9,11,0.8)", borderColor: "rgba(255,255,255,0.05)" }}
                >
                  {/* Category label */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.accent }} />
                    <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: meta.accent }}>
                      {category}
                    </span>
                  </div>

                  {/* Skill cards */}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.04, duration: 0.25 }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        className="group flex items-center gap-2 px-3 py-2 rounded-xl border cursor-default transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.06)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = `${skill.color}12`;
                          (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}35`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                        }}
                      >
                        <span
                          className="text-base leading-none transition-colors duration-200"
                          style={{ color: `${skill.color}80` }}
                        >
                          {skill.icon}
                        </span>
                        <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 whitespace-nowrap">
                          {skill.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
