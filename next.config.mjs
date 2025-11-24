/** @type {import('next').NextConfig} */
// Force redeploy - production env vars configured
const nextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
