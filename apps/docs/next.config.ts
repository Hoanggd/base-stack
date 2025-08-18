import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = withContentlayer({
  images: {
    domains: ['images.unsplash.com'],
  },
})

export default nextConfig
