/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
