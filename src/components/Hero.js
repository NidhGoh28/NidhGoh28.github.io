"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from "./Icons";

const VolSurface = dynamic(() => import("./VolSurface"), { ssr: false, loading: () => <div className="vs-wrap" /> });

function useTypewriter(words, type = 70, del = 35, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const w = words[i];
    let t;
    if (!deleting && text.length < w.length) t = setTimeout(() => setText(w.slice(0, text.length + 1)), type);
    else if (!deleting) t = setTimeout(() => setDeleting(true), pause);
    else if (text.length > 0) t = setTimeout(() => setText(w.slice(0, text.length - 1)), del);
    else { setDeleting(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, del, pause]);
  return text;
}

const rise = (d) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: d, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const role = useTypewriter(PROFILE.roles);
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0]);
  const shrink = useTransform(scrollY, [0, 500], [1, 0.88]);

  const socials = [
    { label: "GitHub", href: PROFILE.github, icon: <GitHubIcon /> },
    { label: "LinkedIn", href: PROFILE.linkedin, icon: <LinkedInIcon /> },
    { label: "Email", href: `mailto:${PROFILE.email}`, icon: <MailIcon /> },
  ];

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="hero-status mono" {...rise(0.1)}>
            <span className="status-dot" /> Open to {PROFILE.openTo.split("—")[1]?.trim() || "new-grad"} roles · {PROFILE.location}
          </motion.div>

          <motion.h1 className="hero-title" {...rise(0.2)}>
            Hi, I&apos;m <span className="hero-name">{PROFILE.first}.</span>
            <br />
            <span className="hero-sub">I price uncertainty.</span>
          </motion.h1>

          <motion.div className="hero-role mono" {...rise(0.35)}>
            <span className="prompt">&gt;</span> {role}
            <span className="caret" />
          </motion.div>

          <motion.p className="hero-tag" {...rise(0.45)}>{PROFILE.tagline}</motion.p>

          <motion.div className="hero-ctas" {...rise(0.55)}>
            <a href="#projects" className="btn btn-primary">View projects</a>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <DownloadIcon size={14} /> Resume
            </a>
          </motion.div>

          <motion.div className="hero-socials" {...rise(0.65)}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                {s.icon}
              </a>
            ))}
            <span className="hero-focus mono">Quant · Data Science · SWE</span>
          </motion.div>
        </div>

        <motion.div className="hero-visual" style={{ opacity: fade, scale: shrink }}>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="hero-visual-inner">
            <div className="hero-halo" />
            <VolSurface />
            <span className="corner tl" /><span className="corner br" />
          </motion.div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue mono" aria-label="Scroll to About">
        <span>scroll</span>
        <i />
      </a>
    </section>
  );
}
