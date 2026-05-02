import '@/styles/global.css';
import React from "react";
import { Metadata, Viewport } from "next";
import { maple, noto, nunito } from "@/lib/font";
import { ThemeProvider } from "next-themes";
import { clsx } from "clsx";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SplashScreen from "@/components/ui/splash-screen";

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ],
    width: 'device-width',
    initialScale: 1
}

export const metadata: Metadata = {
    metadataBase: new URL('https://chrisy.dev'),
    title: {
        default: 'Chrisy - Software Engineer',
        template: '%s | Chrisy'
    },
    description: "Hi, I'm Chrisy, a software engineer who loves building things.",
    keywords: [
        'Chrisy', 'Software Engineer', 'Backend Developer', 'Photography',
        'Java', 'TypeScript', 'React', 'Next.js', 'Node.js'
    ],
    authors: [{ name: 'Chrisy', url: 'https://chrisy.dev' }],
    creator: 'Chrisy',
    publisher: 'Chrisy',

    alternates: {
        canonical: '/',
    },

    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className='no-scrollbar' suppressHydrationWarning>
        <body className={ clsx(
            "bg-theme-light dark:bg-theme-dark transition-colors duration-300", nunito.className, noto.className, maple.className
        ) }>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex flex-col min-h-svh">
                <SplashScreen/>
                <Header/>
                <main className="flex flex-col grow">
                    { children }
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}