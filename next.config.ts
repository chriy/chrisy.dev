// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    },
    compress: true
}

export default config