import '@/styles/global.css';
import React from "react";
import { Metadata, Viewport } from "next";
import { maple, noto, nunito } from "@/lib/font";
import { ThemeProvider } from "next-themes";
import { clsx } from "clsx";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";


// 1. 独立导出 Viewport (控制移动端体验 & 主题色)
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // 让 UI 更有原生 app 的稳重感
}
// 2. 优化后的 Metadata
export const metadata: Metadata = {
    metadataBase: new URL('https://chrisy.dev'), // 替换成您的实际域名
    title: {
        default: 'Chrisy - Software Engineer',
        template: '%s | Chrisy'
    },
    description: "Hi, I'm Chrisy, a software engineer who loves capturing moments through photography.",
    keywords: ['Chrisy', 'Software Engineer', 'Full Stack Developer', 'Photography', 'Digital Garden'],
    authors: [{ name: 'Chrisy', url: 'https://chrisy.dev' }],
    creator: 'Chrisy',
    publisher: 'Chrisy',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico', // 如果有专门的 apple-touch-icon 可以换掉
    },
    // 社交媒体预览配置
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://chrisy.dev',
        siteName: 'Chrisy',
        title: 'Chrisy - Software Engineer',
        description: 'Software engineer who loves capturing moments through photography.',
        images: [
            {
                url: '/og-image.png', // 建议在 public 下放一张预览图
                width: 1200,
                height: 630,
                alt: 'Chrisy.dev',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Chrisy',
        description: 'Software engineer & Photographer',
        creator: '@chrisy', // 替换成您的推特账号
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

// export const metadata: Metadata = {
//     icons: '/favicon.ico',
//     authors: [{ name: 'Chrisy' }],
//     title: {
//         default: 'Chrisy - Software Engineer',
//         template: '%s | Chrisy'
//     },
//     keywords: ['Chrisy', 'Software', 'Developer', 'Photography'],
//     description: 'Hi, I\'m Chrisy, a software engineer who loves capturing moments through photography.',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" className='no-scrollbar' suppressHydrationWarning>
            <body className={clsx("bg-theme-light dark:bg-theme-dark transition-colors duration-300 ", nunito.className, noto.className, maple.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <div className="flex flex-col min-h-svh">
                        <Header />
                        <main className="flex grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}