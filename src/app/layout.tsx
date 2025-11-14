import '@/styles/global.css';
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence } from "framer-motion";
import { Metadata } from "next";

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: 'Chrisy - Software engineer, Photographer & Hiker',
    description: ' Hi, I\'m Chrisy - a passionate software engineer who loves capturing moments through photography and exploring nature on foot.',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
        <html lang="en" className='no-scrollbar'>
        <body className='bg-primary-light dark:bg-primary-dark'>
        <Header/>
        <AnimatePresence>
            <main className='all-wrapper'>
                {children}
            </main>
        </AnimatePresence>
        <Footer/>
        </body>
        </html>
    )
}