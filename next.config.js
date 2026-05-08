const withPWA = require('next-pwa')({
  dest: 'public',
  // Temporarily disable PWA to avoid stale cached versions after deployment.
  disable: true,
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
