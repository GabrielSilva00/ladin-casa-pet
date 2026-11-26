/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  },
  experimental: {
    optimizePackageImports: ["iconoir-react", "framer-motion", "date-fns"]
  }
};

export default nextConfig;
