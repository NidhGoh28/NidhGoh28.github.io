/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static site -> deploy anywhere (Vercel, GitHub Pages, Netlify)
  images: { unoptimized: true },
  trailingSlash: true,
  // PREVIEW=1 builds with relative asset paths (used only for the hosted preview)
  ...(process.env.PREVIEW ? { assetPrefix: "./" } : {}),
};
export default nextConfig;
