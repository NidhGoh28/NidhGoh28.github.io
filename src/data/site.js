// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — components read from it, nothing is hard-coded.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Nidhi Gohel",
  first: "Nidhi",
  roles: [
    "Quantitative Researcher",
    "Quant Trader in training",
    "Data Scientist",
    "Software Engineer",
  ],
  tagline:
    "Applied Mathematics at York University. I turn probability into code — pricing edges, sizing bets, and building the tools to test them.",
  location: "Toronto, ON",
  grad: "Dec 2026",
  email: "nidhi2842002@gmail.com",
  github: "https://github.com/NidhGoh28",
  githubUser: "NidhGoh28",
  linkedin: "https://linkedin.com/in/nidhi28",
  resume: "Nidhi_Gohel_Resume.pdf",
  photo: null, // drop a photo in /public (e.g. "/nidhi.jpg") and put its path here
  openTo: "Quant Trading / Research · Data Science · SWE — new-grad 2027",
};

export const STATS = [
  { value: "511", label: "Kalshi market groups scanned for arbitrage" },
  { value: "0.80", label: "F1 after fine-tuning FinBERT (from 0.71)" },
  { value: "1,800", label: "portfolios mapped on the efficient frontier" },
  { value: "13", label: "projects across quant, data, software & creative code" },
];

// category keys used by the filter tabs
export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "quant", label: "Quant" },
  { key: "data", label: "Data Science & ML" },
  { key: "swe", label: "Software" },
  { key: "creative", label: "Creative Coding" },
];

const GH = "https://github.com/NidhGoh28";
const PAGES = "https://nidhgoh28.github.io";

// `cover` picks the generative artwork drawn on each card (see ProjectCover.js)
export const PROJECTS = [
  {
    id: "kalshi",
    title: "Kalshi Mispricing Engine",
    category: "quant",
    featured: true,
    status: "In progress",
    date: "Sep 2026 – Present",
    tagline: "Scanning live prediction markets for prices that break the laws of probability.",
    points: [
      "Encodes no-arbitrage rules between linked contracts: mutually exclusive brackets must price to $1, nested thresholds must be monotone.",
      "First live run: 511 related market groups checked, 7 apparent violations flagged — then stress-tested against fees, capital lock-up and order-book depth.",
      "Kelly-criterion sizing and fee-adjusted expected value decide what reaches the paper-trading book.",
    ],
    stack: ["Python", "Linear Programming", "Kelly Sizing", "Kalshi API"],
    repo: `${GH}/kalshi-mispricing-engine`,
    demo: null,
    cover: "orderbook",
    note: "Team of 2",
  },
  {
    id: "stock-risk",
    title: "Stock Risk & Portfolio Analyser",
    category: "quant",
    featured: true,
    date: "Jun 2026",
    tagline: "Monte Carlo, VaR and a Markowitz frontier in one interactive dashboard.",
    points: [
      "Simulates price paths with exact Geometric Brownian Motion; 500 Monte Carlo paths per asset, 90 days forward.",
      "1-day VaR (95/99), CVaR / expected shortfall, max drawdown, skew and kurtosis for AAPL, GOOGL, TSLA, JPM and BTC.",
      "Maps 1,800 random portfolios to find the max-Sharpe allocation; correlation heatmap for diversification.",
    ],
    stack: ["Python", "NumPy", "SciPy", "Chart.js"],
    repo: `${GH}/Stock-Risk-Analyses`,
    demo: null,
    cover: "gbm",
  },
  {
    id: "trading-drills",
    title: "Trading Drills",
    category: "quant",
    featured: true,
    date: "Sep 2026",
    tagline: "Practice what trading interviews test: mental math on a clock and making markets.",
    points: [
      "Timed mental-math sprints (2 / 5 / 8 min) mixing the arithmetic trading tests actually use.",
      "Market-making game: quote a bid and ask on dice and coin-flip sums against a better-informed counterparty.",
      "Customer flow is a signal — update your fair value or get picked off.",
    ],
    stack: ["JavaScript", "Probability", "Game Design"],
    repo: `${GH}/trading-drills`,
    demo: `${PAGES}/trading-drills/`,
    cover: "quote",
  },
  {
    id: "finbert",
    title: "Market Sentiment Analyzer",
    category: "data",
    featured: true,
    date: "May – Jun 2025",
    tagline: "Fine-tuned FinBERT to read the tone of financial headlines.",
    points: [
      "F1 improved from 0.71 to 0.80 by fine-tuning FinBERT on a 5,000-headline financial news corpus, beating a TF-IDF + logistic-regression baseline.",
      "Batched tokenization and text cleaning cut preprocessing latency by ~40%.",
      "Compared 3 transformer configurations on stratified validation sets to pick the best checkpoint.",
    ],
    stack: ["Python", "HuggingFace", "FinBERT", "Scikit-learn"],
    repo: null,
    demo: null,
    cover: "sentiment",
  },
  {
    id: "media",
    title: "Media Consumption & Engagement Analytics",
    category: "data",
    date: "Dec 2025 – Present",
    tagline: "What 8,000+ viewing records say about how people actually watch.",
    points: [
      "Found 4 statistically significant engagement patterns via frequency, duration and time-of-day analysis.",
      "Modular cleaning and transformation scripts made results 100% reproducible across analyst runs.",
      "Documented every data decision so a new contributor can reproduce results from the README alone.",
    ],
    stack: ["Python", "Pandas", "NumPy"],
    repo: null,
    demo: null,
    cover: "heatmap",
  },
  {
    id: "kpi",
    title: "Executive KPI Analytics Dashboard",
    category: "data",
    date: "Apr – May 2025",
    tagline: "A self-serve dashboard that answers the questions executives keep asking.",
    points: [
      "Star-schema SQL model (2 fact, 5 dimension tables) with MoM / YoY DAX variance that flags shifts of 5% or more.",
      "Translated 10+ business questions into defined KPIs, cutting ad-hoc report requests by ~60%.",
      "Pre-aggregated slow dimensions in SQL views for sub-3-second loads.",
    ],
    stack: ["SQL", "Power BI", "DAX"],
    repo: null,
    demo: null,
    cover: "bars",
  },
  {
    id: "trading-buddy",
    title: "Trading Buddy",
    category: "swe",
    date: "Jan – Apr 2024",
    tagline: "A stock-market web platform with live quotes, discussion threads and guides.",
    points: [
      "Real-time data for 50+ tickers from 2 financial REST APIs through a Node.js backend, <500 ms average latency.",
      "JWT authentication with expiry and refresh across multi-page navigation.",
      "Modular React UI so new features drop in without rewrites.",
    ],
    stack: ["React", "Node.js", "REST APIs", "JWT"],
    repo: null,
    demo: null,
    cover: "ticker",
  },
  {
    id: "pacman",
    title: "Pac-Man in Java",
    category: "swe",
    date: "Nov 2024",
    tagline: "The arcade classic rebuilt from scratch with Swing.",
    points: [
      "Tile-map maze, collision detection and a game loop built on Java Swing.",
      "Four ghosts, power food and a scared-ghost state.",
      "Directional sprites and bonus cherries.",
    ],
    stack: ["Java", "Swing", "OOP"],
    repo: `${GH}/PacMan-Game`,
    demo: null,
    cover: "maze",
  },
  {
    id: "air-band",
    title: "Air Band",
    category: "creative",
    date: "Sep 2026",
    tagline: "A band that plays behind you while you sing — conducted with your hands.",
    points: [
      "Hand tracking through the webcam: raise a hand for the chorus, pinch for a drum fill, make a fist to hold a chord.",
      "Auto-band plays chord progressions in any key, tempo and mood; tap-tempo supported.",
      "Record your voice over the band and save the take.",
    ],
    stack: ["JavaScript", "Computer Vision", "Web Audio"],
    repo: `${GH}/Air-Band`,
    demo: `${PAGES}/Air-Band/`,
    cover: "hands",
  },
  {
    id: "air-raag",
    title: "Air Raag",
    category: "creative",
    date: "Sep 2026",
    tagline: "Play chords and Indian classical raags in the air.",
    points: [
      "Left hand chooses what to play, right hand shapes how it sounds.",
      "Music theory encoded as data: major scale degrees, and raags like Yaman and Bilawal as pitch sets.",
      "Tanpura drone, recording and video export.",
    ],
    stack: ["JavaScript", "Hand Tracking", "Music Theory"],
    repo: `${GH}/Air-raag`,
    demo: `${PAGES}/Air-raag/`,
    cover: "raag",
  },
  {
    id: "wave-sculptor",
    title: "Wave Sculptor",
    category: "creative",
    date: "Sep 2026",
    tagline: "Your fingers bend a glowing string — its shape is the sound wave.",
    points: [
      "Finger geometry becomes the waveform: curved fingers give a pure tone, spiky ones a bright buzz.",
      "Hand distance sets string length and pitch, snapped to a chosen raag.",
      "8-second looper to layer up to three voices.",
    ],
    stack: ["JavaScript", "Signal Processing", "Web Audio"],
    repo: `${GH}/Music-on-Fingers`,
    demo: null,
    cover: "wave",
  },
  {
    id: "string-theory",
    title: "String Theory",
    category: "creative",
    date: "Sep 2026",
    tagline: "Stretch glowing harp strings between your fingertips and pluck them.",
    points: [
      "Karplus–Strong synthesis for realistic plucked strings, through a convolution reverb.",
      "String length follows hand distance, so pitch is physics.",
      "Touch fallback when there is no camera.",
    ],
    stack: ["JavaScript", "DSP", "Canvas"],
    repo: `${GH}/String-Theory`,
    demo: `${PAGES}/String-Theory/`,
    cover: "strings",
  },
  {
    id: "slice-club",
    title: "Slice Club",
    category: "creative",
    date: "Sep 2026",
    tagline: "Fruit-slicing where your index finger is the blade.",
    points: [
      "Webcam fingertip tracking drives the blade in real time.",
      "Physics-based fruit arcs, bombs, lives and a persistent best score.",
      "Swipe mode for touch screens.",
    ],
    stack: ["JavaScript", "Hand Tracking", "Canvas"],
    repo: `${GH}/slice-club`,
    demo: `${PAGES}/slice-club/`,
    cover: "slice",
  },
];

export const SKILLS = [
  {
    group: "Quantitative",
    accent: "var(--signal)",
    items: ["Probability", "Stochastic Processes", "Expected Value", "Kelly Sizing", "Linear Programming", "Statistical Testing", "Monte Carlo", "VaR / CVaR"],
  },
  {
    group: "Languages & Databases",
    accent: "var(--amber)",
    items: ["Python", "SQL", "Java", "JavaScript", "PostgreSQL", "MySQL", "Star-Schema Modeling"],
  },
  {
    group: "ML & Data",
    accent: "var(--violet)",
    items: ["Pandas", "NumPy", "SciPy", "Scikit-learn", "Matplotlib", "HuggingFace", "FinBERT", "LangChain"],
  },
  {
    group: "Analytics",
    accent: "var(--signal)",
    items: ["KPI / KRI Design", "Trend & Variance Analysis", "A/B Testing", "Scenario Analysis", "Power BI", "DAX"],
  },
  {
    group: "Web & Tooling",
    accent: "var(--amber)",
    items: ["React", "Node.js", "REST APIs", "Web Audio", "Git", "Jupyter", "VS Code"],
  },
];

export const COURSEWORK = [
  "Probability & Statistics",
  "Stochastic Processes",
  "Linear Algebra",
  "Calculus",
  "Mathematical Proofs",
  "Logic",
  "Data Structures & Algorithms",
];

export const TIMELINE = [
  {
    kind: "Education",
    title: "B.Sc. Applied Mathematics",
    org: "York University",
    place: "Toronto, ON",
    date: "Expected Dec 2026",
    points: [
      "Coursework: Probability & Statistics, Stochastic Processes, Linear Algebra, Calculus, Proofs, Logic, Data Structures & Algorithms.",
      "Building a quant portfolio alongside classes: arbitrage detection, risk modelling and trading-interview practice tools.",
    ],
  },
  {
    kind: "Experience",
    title: "Returns & Exchanges Co-Worker (Data & Operations)",
    org: "IKEA",
    place: "Toronto, ON",
    date: "Jun 2023 – Mar 2026",
    points: [
      "Automated 5+ returns-tracking and reporting workflows (Excel macros, SharePoint, Office 365), cutting reconciliation time by 12%.",
      "Built Power BI dashboards on return patterns and defect categories for 3 department managers, replacing a weekly manual report.",
      "Improved POS uptime by 18% in peak windows; incident-to-resolution time down from 55 to 45 minutes.",
    ],
  },
];

// language colours match GitHub's
export const LANG_COLORS = {
  Python: "#3572A5",
  HTML: "#e34c26",
  Java: "#b07219",
  JavaScript: "#f1e05a",
};

// Every public repo (profile config repo left out)
export const REPOS = [
  { name: "kalshi-mispricing-engine", lang: "Python", updated: "Sep 2026", desc: "Arbitrage checks across linked Kalshi contracts, with a research log of what's real edge and what's fees.", demo: null },
  { name: "trading-drills", lang: "HTML", updated: "Sep 2026", desc: "Mental-math sprints and a market-making game for trading interviews.", demo: `${PAGES}/trading-drills/` },
  { name: "Air-raag", lang: "HTML", updated: "Sep 2026", desc: "Play chords and raags in the air with both hands.", demo: `${PAGES}/Air-raag/` },
  { name: "Air-Band", lang: "HTML", updated: "Sep 2026", desc: "A gesture-controlled backing band you sing over.", demo: `${PAGES}/Air-Band/` },
  { name: "Music-on-Fingers", lang: "HTML", updated: "Sep 2026", desc: "Wave Sculptor — finger shape becomes the sound wave.", demo: null },
  { name: "String-Theory", lang: "HTML", updated: "Sep 2026", desc: "Karplus–Strong harp strings stretched between fingertips.", demo: `${PAGES}/String-Theory/` },
  { name: "slice-club", lang: "HTML", updated: "Sep 2026", desc: "Fruit-slicing game controlled by your index finger.", demo: `${PAGES}/slice-club/` },
  { name: "Stock-Risk-Analyses", lang: "HTML", updated: "Jun 2026", desc: "GBM Monte Carlo, VaR/CVaR and a Markowitz efficient frontier.", demo: null },
  { name: "PacMan-Game", lang: "Java", updated: "Nov 2024", desc: "Pac-Man rebuilt in Java Swing.", demo: null },
].map((r) => ({ ...r, url: `${GH}/${r.name}` }));

export const MARQUEE = [
  "Probability",
  "Stochastic Processes",
  "Monte Carlo",
  "Kelly Criterion",
  "No-Arbitrage",
  "Value at Risk",
  "Markowitz",
  "Market Making",
  "FinBERT",
  "Python",
  "SQL",
  "React",
];
