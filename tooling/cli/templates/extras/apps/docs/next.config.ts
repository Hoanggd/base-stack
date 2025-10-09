import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = withContentlayer({
    images: {
        domains: ['images.unsplash.com'],
    },
    async redirects() {
        return [
            {
                source: '/docs/guide',
                destination: '/docs/guide/introduction',
                permanent: false,
            },
            {
                source: '/docs/ui',
                destination: '/docs/ui/button',
                permanent: false,
            },
        ]
    },
})

export default nextConfig
