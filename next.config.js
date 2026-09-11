/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
    qualities: [75, 85],
  },
  async rewrites() {
    return [{ source: '/valleyanna-survey', destination: '/valleyanna-survey.html' }]
  },
}

module.exports = nextConfig 