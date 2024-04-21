/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
  remotePatterns: [
    {
      protocol:'https',
      hostname: '**',
    },
    {
      protocol:'http',
      hostname: '**',
    }
  ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
