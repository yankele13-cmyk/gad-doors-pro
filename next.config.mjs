/** @type {import('next').NextConfig} */
// Force redeploy - production env vars configured
const nextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whstcylkadklvjzfwdmz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
