/** @type {import('next').NextConfig} */
// Force redeploy for env vars update
const nextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
