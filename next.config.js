/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for Google Reviews
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // Aggressive caching for optimized video assets served from public/videos/
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
