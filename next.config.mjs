/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dlqemm2fo/image/upload/**"),
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
