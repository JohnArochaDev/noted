/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,  // Disables the error during static build
  },
};

export default nextConfig;