/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hostedsitedemo.com",
      },
    ],
  },
};

export default nextConfig;
