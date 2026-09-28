"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { TIMELINE } from "@/data/site";

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="eyebrow"><span className="idx">04</span> Journey</span>
          <h2 className="h-title">Education &amp; <em>experience</em>.</h2>
        </motion.div>

        <div className="timeline" ref={ref}>
          <div className="tl-track"><motion.div className="tl-fill" style={{ scaleY: line }} /></div>
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.title}
              className="tl-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <span className="tl-node" />
              <div className="card tl-card">
                <div className="tl-top">
                  <span className={`chip tl-kind ${t.kind === "Education" ? "edu" : "exp"}`}>{t.kind}</span>
                  <span className="tl-date mono">{t.date}</span>
                </div>
                <h3>{t.title}</h3>
                <p className="tl-org">{t.org} · <span>{t.place}</span></p>
                <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
