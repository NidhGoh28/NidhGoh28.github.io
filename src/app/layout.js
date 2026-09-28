import "./globals.css";
import "./components.css";

export const metadata = {
  title: "Nidhi Gohel — Quant · Data Science · Software",
  description:
    "Portfolio of Nidhi Gohel, Applied Mathematics at York University (Dec 2026). Quant research, data science and software projects: Kalshi arbitrage engine, Monte Carlo risk models, FinBERT sentiment, trading drills.",
  openGraph: {
    title: "Nidhi Gohel — Quant · Data Science · Software",
    description: "Probability, priced. Models, shipped.",
    type: "website",
  },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#06080c" };

// set the saved theme before paint so there is no flash
const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%2306080c'/><text x='16' y='22' font-family='Georgia' font-size='17' text-anchor='middle' fill='%235eead4'>σ</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
