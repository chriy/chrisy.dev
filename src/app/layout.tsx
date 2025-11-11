import '@/styles/global.css';
import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence } from "framer-motion";

const SITE = {
    meta: {
        lang: 'en',
        title: 'Software engineer, Photographer & Hiker',
        url: "https://chrisy.dev/",
        description: ' Hi, I\'m Chrisy - a passionate software engineer who loves capturing moments through photography and exploring nature on foot.',
    }
}
export default function RootLayout({ children }: {children: React.ReactNode}) {
    return (
        <html lang="en" className="no-scrollbar">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="generator" content=""/>
            <meta name="description" content={SITE.meta.description}/>
            <title>{`Chrisy - ${SITE.meta.title}`}</title>
            <link rel="icon" href="/favicon.ico" type="image/icon"/>
        </head>
        <body className="bg-primary-light dark:bg-primary-dark">
        <Header/>
        <AnimatePresence>
            <main className="w-11/12 mx-auto">
                {children}
            </main>
        </AnimatePresence>
        <Footer/>
        </body>
        </html>
    )
}