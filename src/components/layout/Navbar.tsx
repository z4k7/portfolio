"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GoldLogo from "@/components/common/GoldLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setActive(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[990] transition-all duration-300",
          "max-w-4xl w-[calc(100%-2rem)]"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300",
            scrolled
              ? "bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-zinc-950/60 backdrop-blur-md border border-white/5"
          )}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="Home"
          >
            <div className="flex items-center" style={{ transform: "scale(1.6)", transformOrigin: "left center" }}>
              <GoldLogo height={36} />
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  active === link.href
                    ? "text-gold-400"
                    : "text-zinc-400 hover:text-zinc-100"
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gold-400/10 rounded-lg"
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={`mailto:${PERSONAL.email}`}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium hover:bg-gold-400/15 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Hire me
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-989 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg bg-gold-400/10 border border-gold-400/20 text-gold-400 text-sm font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
