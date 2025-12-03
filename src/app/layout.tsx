import '@/styles/global.css';
import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Metadata } from "next";
import { NotoSansSC, Nunito } from "@/lib/font";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: 'Chrisy - Software engineer',
    description: ' Hi, I\'m Chrisy - a passionate software engineer who loves capturing moments through photography and exploring nature on foot.',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
        <html lang="en" className='no-scrollbar' suppressHydrationWarning>
        <body className={`bg-theme-light dark:bg-theme-dark transition-colors duration-300 ${NotoSansSC.className} ${Nunito.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header/>
            <main className='w-11/12 lg:w-9/12 2xl:max-w-6xl mx-auto md:px-15'>{children}</main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    )
}