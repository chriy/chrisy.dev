import '@/styles/global.css';
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence } from "framer-motion";
import { Metadata } from "next";
import { NotoSansSC, Nunito } from "@/lib/font";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: 'Chrisy - Software engineer, Photographer & Hiker',
    description: ' Hi, I\'m Chrisy - a passionate software engineer who loves capturing moments through photography and exploring nature on foot.',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
        <html lang="en" className='no-scrollbar' suppressHydrationWarning>
        <body className={`bg-theme-light dark:bg-theme-dark ${[NotoSansSC, Nunito].map(f => f.className)}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            <Header/>
            <AnimatePresence>
                <main className='all-wrapper'>{children}</main>
            </AnimatePresence>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    )
}