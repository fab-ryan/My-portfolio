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
    domains: ['localhost', 'res.cloudinary.com'],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
