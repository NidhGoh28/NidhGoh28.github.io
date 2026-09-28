"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROFILE, MARQUEE } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon, DownloadIcon } from "./Icons";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i} className="marquee-item">
            {m}<i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", subject: "", msg: "" });
  const [copied, setCopied] = useState(false);

  // No backend needed: the form opens the visitor's email app, pre-filled.
  const send = (e) => {
    e.preventDefault();
    const body = `${form.msg}\n\n— ${form.name}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject || "Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {}
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="eyebrow"><span className="idx">06</span> Contact</span>
            <h2 className="h-title">Let&apos;s talk <em>odds</em>.</h2>
            <p className="lede">
              I&apos;m looking for {PROFILE.openTo.split("—")[1]?.trim()} roles in quantitative trading and research,
              data science, and software engineering — Toronto or remote. If you&apos;re hiring, or just want to argue
              about a Kelly fraction, my inbox is open.
            </p>

            <button className="email-big mono" onClick={copy} aria-label="Copy email address">
              {PROFILE.email}
              <span className="email-hint">{copied ? "copied ✓" : "click to copy"}</span>
            </button>

            <div className="contact-links">
              <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a className="icon-btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a className="icon-btn" href={`mailto:${PROFILE.email}`} aria-label="Email"><MailIcon /></a>
              <a className="btn btn-ghost" href={PROFILE.resume} target="_blank" rel="noopener noreferrer"><DownloadIcon size={14} /> Resume</a>
            </div>
          </motion.div>

          <motion.form
            className="card contact-form"
            onSubmit={send}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="form-head mono">// new message</p>
            <label>
              <span>Your name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane from the trading desk" />
            </label>
            <label>
              <span>Subject</span>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Quant role / project / coffee chat" />
            </label>
            <label>
              <span>Message</span>
              <textarea required rows={5} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="Hi Nidhi, …" />
            </label>
            <button type="submit" className="btn btn-primary">Send message →</button>
            <p className="form-note">Opens your email app with the message filled in.</p>
          </motion.form>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-inner mono">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>Built with Next.js · Three.js · Framer Motion</span>
          <a href="#home">back to top ↑</a>
        </div>
      </footer>
    </section>
  );
}
