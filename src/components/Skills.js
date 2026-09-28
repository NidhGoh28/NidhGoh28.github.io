"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/data/site";

/* A 3D tag sphere: every skill sits on a Fibonacci sphere and the whole
   thing spins toward the cursor. Plain DOM + math, no WebGL needed. */
function TagSphere({ tags }) {
  const box = useRef(null);
  const items = useRef([]);
  const vel = useRef({ x: 0.0025, y: 0.004 });
  const target = useRef({ x: 0.0025, y: 0.004 });

  useEffect(() => {
    const N = tags.length;
    const pts = tags.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const th = Math.PI * (1 + Math.sqrt(5)) * i;
      return [Math.cos(th) * Math.sin(phi), Math.sin(th) * Math.sin(phi), Math.cos(phi)];
    });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const tick = () => {
      const R = (box.current?.offsetWidth || 400) * 0.4;
      const v = vel.current, t = target.current;
      v.x += (t.x - v.x) * 0.05; v.y += (t.y - v.y) * 0.05;
      const ax = reduced ? 0 : v.x, ay = reduced ? 0 : v.y;
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (let i = 0; i < N; i++) {
        let [x, y, z] = pts[i];
        // rotate around X then Y
        const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
        const x2 = x * cy + z1 * sy, z2 = -x * sy + z1 * cy;
        pts[i] = [x2, y1, z2];
        const el = items.current[i];
        if (el) {
          const scale = 0.62 + ((z2 + 1) / 2) * 0.45;
          el.style.transform = `translate(-50%, -50%) translate3d(${x2 * R}px, ${y1 * R}px, 0) scale(${scale})`;
          el.style.opacity = String(0.18 + ((z2 + 1) / 2) * 0.82);
          el.style.zIndex = String(Math.round(z2 * 100) + 100);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [tags]);

  const onMove = (e) => {
    const r = box.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    target.current = { x: -dy * 0.03, y: dx * 0.03 };
  };

  return (
    <div ref={box} className="sphere" onPointerMove={onMove} onPointerLeave={() => (target.current = { x: 0.0025, y: 0.004 })}>
      <div className="sphere-core" />
      {tags.map((t, i) => (
        <span key={t.name} ref={(el) => (items.current[i] = el)} className="sphere-tag mono" style={{ color: t.accent }}>
          {t.name}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const tags = SKILLS.flatMap((g) => g.items.map((name) => ({ name, accent: g.accent })));

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="eyebrow"><span className="idx">03</span> Skills</span>
          <h2 className="h-title">The <em>toolkit</em>.</h2>
          <p className="lede">Maths first, then the code to test it. Move your cursor over the sphere to spin it.</p>
        </motion.div>

        <div className="skills-grid">
          <TagSphere tags={tags} />
          <div className="skill-groups">
            {SKILLS.map((g, i) => (
              <motion.div
                key={g.group}
                className="card skill-group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ "--acc": g.accent }}
              >
                <h3><span className="sg-bar" />{g.group}</h3>
                <div className="sg-items">
                  {g.items.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
