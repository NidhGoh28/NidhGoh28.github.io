"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES } from "@/data/site";
import ProjectCover from "./ProjectCover";
import { GitHubIcon, ArrowUpRight, PlayIcon } from "./Icons";

const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

function TiltCard({ project, index }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg");
  };

  const p = project;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`pcard-shell ${p.featured && index === 0 ? "pcard-wide" : ""}`}
    >
      <div ref={ref} className={`pcard cat-${p.category}`} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="pcard-glare" />
        <div className="pcard-cover">
          <ProjectCover type={p.cover} />
          <div className="pcard-badges">
            <span className="chip chip-cat">{CAT_LABEL[p.category]}</span>
            {p.status && <span className="chip chip-live"><i />{p.status}</span>}
          </div>
        </div>

        <div className="pcard-body">
          <div className="pcard-meta mono">
            <span>{p.date}</span>
            {p.note && <span>· {p.note}</span>}
          </div>
          <h3 className="pcard-title">{p.title}</h3>
          <p className="pcard-tag">{p.tagline}</p>
          <ul className="pcard-points">
            {p.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
          <div className="pcard-stack">
            {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <div className="pcard-links">
            {p.repo ? (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="plink"><GitHubIcon size={15} /> Code <ArrowUpRight size={12} /></a>
            ) : (
              <span className="plink plink-muted mono">code available on request</span>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="plink plink-demo"><PlayIcon size={11} /> Live demo <ArrowUpRight size={12} /></a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [cat, setCat] = useState("all");
  const list = cat === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c.key).length]));

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="eyebrow"><span className="idx">02</span> Projects</span>
          <h2 className="h-title">Everything I&apos;ve <em>built</em>.</h2>
          <p className="lede">
            Quant research first, then the data science, software and creative-coding work that taught me how to ship.
            Hover a card — it tilts.
          </p>
        </motion.div>

        <div className="filters" role="tablist" aria-label="Filter projects">
          {CATEGORIES.map((c) => (
            <button key={c.key} role="tab" aria-selected={cat === c.key} className={`filter ${cat === c.key ? "on" : ""}`} onClick={() => setCat(c.key)}>
              {cat === c.key && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="filter-label">{c.label}</span>
              <span className="filter-count mono">{counts[c.key]}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="pgrid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <TiltCard key={p.id} project={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
