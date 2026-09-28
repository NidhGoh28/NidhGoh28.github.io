"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PROFILE, STATS, COURSEWORK } from "@/data/site";

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = parseFloat(value.replace(/,/g, ""));
  const decimals = (value.split(".")[1] || "").length;
  const comma = value.includes(",");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now(); const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  let s = n.toFixed(decimals);
  if (comma) s = Number(s).toLocaleString("en-US");
  return <span ref={ref}>{s}</span>;
}

/* Monogram with three orbiting rings — rotated in 3D with CSS */
function OrbitBadge() {
  return (
    <div className="orbit">
      <div className="orbit-ring r1"><i /></div>
      <div className="orbit-ring r2"><i /></div>
      <div className="orbit-ring r3"><i /></div>
      <div className="orbit-core">
        {PROFILE.photo ? (
          <img src={PROFILE.photo} alt={PROFILE.name} />
        ) : (
          <span className="orbit-mono">NG</span>
        )}
      </div>
      <span className="orbit-tag t1 mono">μ</span>
      <span className="orbit-tag t2 mono">σ</span>
      <span className="orbit-tag t3 mono">E[X]</span>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div {...fadeUp}>
          <span className="eyebrow"><span className="idx">01</span> About</span>
          <h2 className="h-title">Most things are a <em>probability</em> question in disguise.</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div className="about-left" {...fadeUp}>
            <OrbitBadge />
            <div className="card now-card">
              <p className="now-head mono">// currently</p>
              <dl>
                <div><dt>Building</dt><dd>Kalshi mispricing engine</dd></div>
                <div><dt>Studying</dt><dd>Stochastic processes</dd></div>
                <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
                <div><dt>Graduating</dt><dd>{PROFILE.grad}</dd></div>
              </dl>
            </div>
          </motion.div>

          <motion.div className="about-right" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <p>
              I study Applied Mathematics at York University, and what hooked me is how often a real decision
              comes down to one question: <strong>what is this worth when I can&apos;t know the outcome?</strong>{" "}
              A prediction market asks it. So does a stock, and so does every trading interview.
            </p>
            <p>
              So I answer it with code. Right now that&apos;s a Kalshi engine, built with my project partner, that checks
              whether linked contracts obey no-arbitrage rules — and then, the part that matters, whether an
              &ldquo;edge&rdquo; still exists after fees, locked-up capital and thin order books. Before that: Monte Carlo
              risk models, a FinBERT sentiment classifier, and a drill app for the mental math trading firms test.
            </p>
            <p>
              Almost three years at IKEA taught me the unglamorous half. Data is messy, people need answers fast,
              and a dashboard nobody opens is worth nothing.
            </p>

            <div className="course-row">
              {COURSEWORK.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </motion.div>
        </div>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="card stat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <span className="stat-val"><CountUp value={s.value} /></span>
              <span className="stat-lbl">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
