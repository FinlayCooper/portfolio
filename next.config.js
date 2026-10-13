/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true,
    qualities: [75, 85],
  },
  async redirects() {
    // The archive table became the archive/ folder in the projects listing.
    return [{ source: '/archive', destination: '/projects', permanent: true }]
  },
  async rewrites() {
    return [{ source: '/valleyanna-survey', destination: '/valleyanna-survey.html' }]
  },
}

module.exports = nextConfig 