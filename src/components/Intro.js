"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/data/site";

/* Brownian paths radiating from the centre while the name drops in. */
function RandomWalks() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, raf;
    const resize = () => {
      W = cv.offsetWidth; H = cv.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const color = getComputedStyle(document.documentElement).getPropertyValue("--signal").trim() || "#5eead4";
    const walkers = Array.from({ length: 70 }, (_, i) => {
      const a = (i / 70) * Math.PI * 2;
      return { x: W / 2, y: H / 2, a, drift: 3 + Math.random() * 3.5, life: 0 };
    });
    ctx.lineWidth = 1;
    const step = () => {
      ctx.fillStyle = "rgba(6,8,12,0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.55;
      for (const w of walkers) {
        const nx = w.x + Math.cos(w.a) * w.drift + (Math.random() - 0.5) * 7;
        const ny = w.y + Math.sin(w.a) * w.drift + (Math.random() - 0.5) * 7;
        ctx.beginPath(); ctx.moveTo(w.x, w.y); ctx.lineTo(nx, ny); ctx.stroke();
        w.x = nx; w.y = ny; w.life++;
        if (w.x < -20 || w.x > W + 20 || w.y < -20 || w.y > H + 20) { w.x = W / 2; w.y = H / 2; }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="intro-canvas" />;
}

export default function Intro() {
  const [show, setShow] = useState(null);

  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("introSeen"); sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    if (seen) { setShow(false); return; }
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 3600);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ""; };
  }, []);

  if (show === null) return <div className="intro-blank" />;

  const letters = PROFILE.name.split("");

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
      {show && (
        <motion.div
          className="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
        >
          <RandomWalks />
          <div className="intro-glow" />
          <div className="intro-inner">
            <motion.p
              className="intro-kicker mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              E[portfolio] → loading
            </motion.p>
            <h1 className="intro-name">
              {letters.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.25 + i * 0.055, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {c === " " ? " " : c}
                </motion.span>
              ))}
            </h1>
            <motion.span
              className="intro-rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: "easeInOut" }}
            />
            <motion.p
              className="intro-line"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.6 }}
            >
              Probability, priced. Models, shipped.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
