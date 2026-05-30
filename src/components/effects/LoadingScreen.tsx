"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldLogo from "@/components/common/GoldLogo";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const pct = Math.floor(Math.min(progress, 100));
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-99999 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
            }}
          />

          {/* All rings + logo in one 220×220 relative container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ width: 220, height: 220 }}
          >
            {/* Outer slow-spin decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width="210" height="210" viewBox="0 0 210 210" fill="none">
                <circle cx="105" cy="105" r="100" stroke="url(#ringGrad1)"
                  strokeWidth="0.6" strokeDasharray="6 14" opacity="0.4" />
                <defs>
                  <linearGradient id="ringGrad1" x1="0" y1="0" x2="210" y2="210" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Counter-spin inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width="175" height="175" viewBox="0 0 175 175" fill="none">
                <circle cx="87.5" cy="87.5" r="82" stroke="url(#ringGrad2)"
                  strokeWidth="0.5" strokeDasharray="3 20" opacity="0.25" />
                <defs>
                  <linearGradient id="ringGrad2" x1="0" y1="0" x2="175" y2="175" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ead99a" />
                    <stop offset="100%" stopColor="#8b6a1a" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Circular progress ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="196" height="196" viewBox="0 0 196 196" fill="none"
                style={{ transform: "rotate(-90deg)" }}>
                <circle cx="98" cy="98" r={radius} stroke="#1a1a1a" strokeWidth="1.5" />
                <circle
                  cx="98" cy="98" r={radius}
                  stroke="url(#progressGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 0.15s ease" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0" y1="0" x2="196" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8b6a1a" />
                    <stop offset="50%" stopColor="#c9a84c" />
                    <stop offset="100%" stopColor="#ead99a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Logo centered inside */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 blur-2xl rounded-full opacity-30 animate-pulse-glow"
                  style={{ background: "rgba(201,168,76,0.5)", transform: "scale(0.9)" }}
                />
                <GoldLogo height={110} className="relative z-10" />
              </div>
            </div>
          </motion.div>

          {/* Percentage — bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-16 font-mono text-xs"
            style={{ color: pct === 100 ? "#c9a84c" : "#4a4a4a" }}
          >
            {pct === 100 ? "Ready" : `${pct}%`}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
