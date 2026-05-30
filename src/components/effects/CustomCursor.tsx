"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.5 });
  const dotSpringX = useSpring(dotX, { stiffness: 800, damping: 40 });
  const dotSpringY = useSpring(dotY, { stiffness: 800, damping: 40 });

  const isHoveringRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
    };

    const enter = () => {
      isHoveringRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1.5)";
        cursorRef.current.style.background = "rgba(201,168,76,0.15)";
        cursorRef.current.style.borderColor = "rgba(201,168,76,0.8)";
      }
    };

    const leave = () => {
      isHoveringRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1)";
        cursorRef.current.style.background = "transparent";
        cursorRef.current.style.borderColor = "rgba(201,168,76,0.5)";
      }
    };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [role='button'], [data-cursor='hover']")
      .forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold-400/50 pointer-events-none z-9999 transition-all duration-200 hidden md:block"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-400 pointer-events-none z-9999 hidden md:block"
        style={{ x: dotSpringX, y: dotSpringY }}
      />
    </>
  );
}
