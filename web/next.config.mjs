/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Sanity CDN + local media. Add hosts here as the CMS is wired up.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  experimental: {
    // three / drei ship modern ESM; keep optimizePackageImports off the 3D libs
    optimizePackageImports: ["@react-three/drei"],
  },
};

export default nextConfig;
