import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = withContentlayer({
    images: {
        domains: ['images.unsplash.com'],
    },
    async redirects() {
        return [
            {
                source: '/docs/ui',
                destination: '/docs/ui/introduction',
                permanent: false,
            },
            {
                source: '/docs/recipes',
                destination: '/docs/recipes/philosophy',
                permanent: false,
            },
        ]
    },
})

export default nextConfig
