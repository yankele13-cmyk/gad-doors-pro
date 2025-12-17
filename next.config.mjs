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
        hostname: 'kwlyhnmbbgnlczmxqwbq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
      // Also allow old domain potentially if needed, or just replace
      {
        protocol: 'https',
        hostname: 'whstcylkadklvjzfwdmz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
