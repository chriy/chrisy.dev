declare module '*.mdx' {

    import type { ReactElement } from 'react'
    import type { Metadata } from 'next'

    // mdx 文件导出一个默认组件
    export default function MDXContent(props: any): ReactElement

    // mdx 文件可能导出一个 metadata 对象
    export const metadata: Metadata
}