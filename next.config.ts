// next.config.ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const config: NextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    },
    compress: true,
    pageExtensions: ['tsx', 'md', 'mdx']
}
// md plugins
const withMDX = createMDX({})

// merge next config
export default withMDX(config)