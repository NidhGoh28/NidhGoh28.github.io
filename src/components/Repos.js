"use client";

import { motion } from "framer-motion";
import { REPOS, LANG_COLORS, PROFILE } from "@/data/site";
import { GitHubIcon, ArrowUpRight } from "./Icons";

export default function Repos() {
  return (
    <section id="repos" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="eyebrow"><span className="idx">05</span> Learning in public</span>
          <h2 className="h-title">Code <em>chronicles</em>.</h2>
          <p className="lede">Every public repository on my GitHub. Some are polished, some are experiments — all of them taught me something.</p>
        </motion.div>

        <div className="repo-grid">
          {REPOS.map((r, i) => (
            <motion.div
              key={r.name}
              className="card repo"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <a className="repo-hit" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} on GitHub`} />
              <div className="repo-top">
                <GitHubIcon size={18} />
                <ArrowUpRight size={14} />
              </div>
              <h3 className="repo-name mono">{r.name}</h3>
              <p className="repo-desc">{r.desc}</p>
              <div className="repo-foot mono">
                <span className="repo-lang"><i style={{ background: LANG_COLORS[r.lang] || "var(--faint)" }} />{r.lang}</span>
                <span>Updated {r.updated}</span>
                {r.demo && <a className="repo-demo" href={r.demo} target="_blank" rel="noopener noreferrer">demo ↗</a>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="center-row">
          <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={15} /> github.com/{PROFILE.githubUser}
          </a>
        </div>
      </div>
    </section>
  );
}
