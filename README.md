# Nidhi Gohel — Portfolio

Personal portfolio for quant, data science and software roles. Built with Next.js, Three.js (React Three Fiber) and Framer Motion.

## What's on the page

- **Intro** — the name drops in over Brownian random walks (plays once per session; click to skip)
- **Hero** — a live, mouse-reactive 3D implied-volatility surface σ(K, T)
- **Scroll background** — 4,000 particles that morph as you scroll: sphere → bivariate normal → Lorenz attractor → Monte Carlo price paths
- **Projects** — all 13 projects with 3D tilt cards, generated cover art, and filters (Quant / Data Science & ML / Software / Creative Coding)
- **Skills** — interactive 3D tag sphere plus grouped skills
- **Journey** — scroll-drawn timeline (York University, IKEA)
- **Code Chronicles** — every public GitHub repo with live-demo links
- **Contact** — copy-to-clipboard email and a form that opens your email app (no backend needed)
- Light / dark mode, smooth scrolling (Lenis), reduced-motion support, mobile layout

## Edit the content

Almost everything lives in **`src/data/site.js`**: profile, stats, projects, skills, timeline, repos.

- **Add a project:** copy an entry in `PROJECTS`. `category` is one of `quant`, `data`, `swe`, `creative`. `cover` picks the artwork (`orderbook`, `gbm`, `quote`, `sentiment`, `heatmap`, `bars`, `ticker`, `maze`, `hands`, `raag`, `wave`, `strings`, `slice`).
- **Add your photo:** put it in `public/` (e.g. `public/nidhi.jpg`) and set `photo: "/nidhi.jpg"` in `PROFILE`.
- **Update your resume:** replace `public/Nidhi_Gohel_Resume.pdf`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy

The site is a static export (`output: "export"`), so it runs anywhere.

**Vercel (easiest):** push this folder to a GitHub repo → vercel.com → New Project → import the repo → Deploy. No settings to change.

**GitHub Pages:** `npm run build`, then publish the `out/` folder. If the site lives at `nidhgoh28.github.io/portfolio/`, add `basePath: "/portfolio"` to `next.config.mjs` first.

## Stack

Next.js 15 · React 19 · Three.js + @react-three/fiber · Framer Motion · Lenis
