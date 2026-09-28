/*
  Generative cover art for each project card — pure SVG, drawn from the
  idea behind the project, so no screenshots are needed.
  Deterministic (seeded) so server and client render the same thing.
*/

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const W = 400, H = 220;
const S = "var(--signal)", A = "var(--amber)", V = "var(--violet)", M = "var(--faint)";

function walk(r, n, y0, vol, drift = 0) {
  let y = y0; const pts = [];
  for (let i = 0; i < n; i++) { pts.push([(i / (n - 1)) * W, y]); y += drift + (r() - 0.5) * vol; y = Math.max(12, Math.min(H - 12, y)); }
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
}

const covers = {
  orderbook: () => {
    const r = rng(7); const rows = 9;
    return (
      <g>
        {Array.from({ length: rows }).map((_, i) => {
          const y = 22 + i * 20; const bid = 40 + r() * 120; const ask = 40 + r() * 120;
          return (
            <g key={i} className="cv-flick" style={{ animationDelay: `${i * 0.23}s` }}>
              <rect x={200 - bid} y={y} width={bid} height={13} rx="2" fill={S} opacity="0.55" />
              <rect x={204} y={y} width={ask} height={13} rx="2" fill={A} opacity="0.55" />
            </g>
          );
        })}
        <line x1="202" y1="12" x2="202" y2="208" stroke={M} strokeDasharray="3 4" />
        <text x="16" y="208" className="cv-txt" fill={S}>Σ YES = 100¢ ?</text>
        <text x="384" y="208" className="cv-txt" fill={A} textAnchor="end">edge − fees</text>
      </g>
    );
  },
  gbm: () => {
    const r = rng(11);
    return (
      <g>
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d={walk(r, 60, 110, 16, (r() - 0.5) * 1.2)} fill="none" stroke={i === 3 ? A : S} strokeWidth={i === 3 ? 2 : 1} opacity={i === 3 ? 1 : 0.35} className="cv-draw" style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
        <line x1="0" y1="176" x2={W} y2="176" stroke={A} strokeDasharray="4 5" opacity="0.8" />
        <text x="392" y="170" className="cv-txt" fill={A} textAnchor="end">VaR 95%</text>
      </g>
    );
  },
  quote: () => (
    <g>
      <text x="200" y="98" textAnchor="middle" className="cv-big" fill={S}>9.8 <tspan fill={M}>@</tspan> <tspan fill={A}>10.6</tspan></text>
      <text x="200" y="126" textAnchor="middle" className="cv-txt" fill={M}>bid · ask — sum of 3 dice</text>
      {["17 × 24 = ?", "0.35 × 180", "√196", "7/8 → %"].map((q, i) => (
        <g key={q} className="cv-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <rect x={20 + i * 95} y={158} width={82} height={30} rx="8" fill="none" stroke={i % 2 ? A : S} opacity="0.6" />
          <text x={61 + i * 95} y={178} textAnchor="middle" className="cv-txt" fill="var(--text)">{q}</text>
        </g>
      ))}
    </g>
  ),
  sentiment: () => {
    const r = rng(5);
    return (
      <g>
        {Array.from({ length: 48 }).map((_, i) => {
          const x = 20 + (i % 12) * 31; const y = 30 + Math.floor(i / 12) * 42;
          const v = r(); const c = v > 0.62 ? S : v < 0.3 ? A : M;
          return <rect key={i} x={x} y={y} width={24} height={8} rx="4" fill={c} opacity={0.35 + v * 0.5} className="cv-flick" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />;
        })}
        <text x="20" y="208" className="cv-txt" fill={S}>positive</text>
        <text x="110" y="208" className="cv-txt" fill={M}>neutral</text>
        <text x="196" y="208" className="cv-txt" fill={A}>negative</text>
        <text x="384" y="208" className="cv-txt" fill="var(--text)" textAnchor="end">F1 0.71 → 0.80</text>
      </g>
    );
  },
  heatmap: () => {
    const cols = 24, rows = 7;
    return (
      <g>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const c = i % cols, rr = Math.floor(i / cols);
          const v = 0.5 + 0.5 * Math.sin((c - 20) / 3.5) * Math.cos((rr - 5) / 3);
          return <rect key={i} x={16 + c * 15.4} y={20 + rr * 24} width={13} height={20} rx="3" fill={v > 0.6 ? A : S} opacity={0.1 + v * 0.75} />;
        })}
        <text x="16" y="208" className="cv-txt" fill={M}>hour of day →</text>
        <text x="384" y="208" className="cv-txt" fill="var(--text)" textAnchor="end">8,000+ records</text>
      </g>
    );
  },
  bars: () => {
    const r = rng(3);
    return (
      <g>
        {Array.from({ length: 12 }).map((_, i) => {
          const h = 40 + r() * 110; const flag = i === 8;
          return <rect key={i} x={24 + i * 30} y={180 - h} width={20} height={h} rx="3" fill={flag ? A : S} opacity={flag ? 0.95 : 0.5} className="cv-grow" style={{ animationDelay: `${i * 0.06}s` }} />;
        })}
        <text x="270" y="30" className="cv-txt" fill={A}>▲ +5.4% MoM</text>
        <line x1="16" y1="182" x2="384" y2="182" stroke={M} />
      </g>
    );
  },
  ticker: () => {
    const r = rng(19);
    const names = ["AAPL", "MSFT", "NVDA", "TD", "RY", "SHOP"];
    return (
      <g>
        <path d={walk(r, 70, 120, 14, -0.4)} fill="none" stroke={S} strokeWidth="2" className="cv-draw" />
        {names.map((n, i) => {
          const up = r() > 0.4;
          return (
            <text key={n} x={16 + i * 64} y="206" className="cv-txt" fill={up ? S : A}>
              {n} {up ? "▲" : "▼"}
            </text>
          );
        })}
        <text x="16" y="30" className="cv-txt" fill={M}>JWT · REST · &lt;500 ms</text>
      </g>
    );
  },
  maze: () => (
    <g>
      <rect x="20" y="16" width="360" height="176" rx="10" fill="none" stroke={V} strokeWidth="3" opacity="0.7" />
      {[[80, 16, 80, 90], [160, 192, 160, 120], [240, 16, 240, 80], [320, 192, 320, 110], [80, 140, 200, 140], [220, 60, 330, 60]].map((l, i) => (
        <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={V} strokeWidth="3" opacity="0.7" strokeLinecap="round" />
      ))}
      {Array.from({ length: 14 }).map((_, i) => <circle key={i} cx={46 + i * 24} cy="110" r="2.5" fill="var(--text)" opacity="0.6" />)}
      <path d="M0 0 L16 -9 A18 18 0 1 0 16 9 Z" transform="translate(120 110)" fill={A} className="cv-chomp" />
      <path d="M300 118 v-12 a12 12 0 0 1 24 0 v12 l-4 -4 -4 4 -4 -4 -4 4 -4 -4z" fill={S} opacity="0.85" className="cv-float" />
    </g>
  ),
  hands: () => (
    <g>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={40 + i * 86} y="130" width="70" height="60" rx="10" fill="none" stroke={i === 1 ? A : S} opacity="0.6" />)}
      {["C", "Am", "F", "G"].map((c, i) => <text key={c} x={75 + i * 86} y="166" textAnchor="middle" className="cv-big-sm" fill={i === 1 ? A : "var(--text)"}>{c}</text>)}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx={160 + i * 22} cy={60 + Math.abs(2 - i) * 10} r="6" fill={S} className="cv-float" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <text x="384" y="30" className="cv-txt" fill={M} textAnchor="end">raise → chorus · pinch → fill</text>
    </g>
  ),
  raag: () => {
    const notes = ["Sa", "Re", "Ga", "Ma♯", "Pa", "Dha", "Ni"];
    return (
      <g>
        {notes.map((n, i) => {
          const a = (i / notes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 80, y = 110 + Math.sin(a) * 80;
          return (
            <g key={n}>
              <line x1="200" y1="110" x2={x} y2={y} stroke={S} opacity="0.25" />
              <circle cx={x} cy={y} r="16" fill="var(--bg)" stroke={i === 3 ? A : S} className="cv-flick" style={{ animationDelay: `${i * 0.35}s` }} />
              <text x={x} y={y + 4} textAnchor="middle" className="cv-txt" fill="var(--text)">{n}</text>
            </g>
          );
        })}
        <text x="200" y="115" textAnchor="middle" className="cv-txt" fill={A}>Yaman</text>
      </g>
    );
  },
  wave: () => {
    const path = (amp, f, ph) => {
      let d = ""; for (let x = 0; x <= W; x += 4) { const y = 110 + amp * Math.sin((x / W) * Math.PI * f + ph) * Math.sin((x / W) * Math.PI); d += `${x ? "L" : "M"}${x} ${y.toFixed(1)} `; } return d;
    };
    return (
      <g>
        <path d={path(60, 4, 0)} fill="none" stroke={S} strokeWidth="2.5" className="cv-wave" />
        <path d={path(34, 9, 1)} fill="none" stroke={A} strokeWidth="1.5" opacity="0.7" className="cv-wave" style={{ animationDelay: "-1s" }} />
        <path d={path(18, 16, 2)} fill="none" stroke={V} strokeWidth="1" opacity="0.6" className="cv-wave" style={{ animationDelay: "-2s" }} />
        <text x="16" y="206" className="cv-txt" fill={M}>fundamental + harmonics</text>
      </g>
    );
  },
  strings: () => (
    <g>
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 30 + i * 20;
        return <path key={i} d={`M30 ${y} Q200 ${y + (i % 3 === 1 ? 14 : 0)} 370 ${y}`} fill="none" stroke={i % 3 === 1 ? A : S} strokeWidth={1 + (9 - i) * 0.18} opacity="0.75" className="cv-pluck" style={{ animationDelay: `${i * 0.21}s` }} />;
      })}
      <circle cx="30" cy="110" r="7" fill={S} /><circle cx="370" cy="110" r="7" fill={S} />
    </g>
  ),
  slice: () => (
    <g>
      <path d="M40 180 Q200 -20 360 150" fill="none" stroke={S} strokeWidth="3" strokeLinecap="round" className="cv-draw" />
      {[["🍉", 110, 90], ["🍋", 210, 60], ["🥝", 300, 100], ["💣", 170, 160]].map(([e, x, y], i) => (
        <text key={i} x={x} y={y} fontSize="34" textAnchor="middle" className="cv-float" style={{ animationDelay: `${i * 0.4}s` }}>{e}</text>
      ))}
    </g>
  ),
};

export default function ProjectCover({ type }) {
  const draw = covers[type] || covers.gbm;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cover-svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {draw()}
    </svg>
  );
}
