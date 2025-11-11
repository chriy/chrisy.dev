"use client"

import { useEffect, useState } from "react";

export default function Theme() {

    const [theme, setTheme] = useState<"dark"|"light">("light");

    // init
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setTheme(theme === "dark" ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
        // listening system
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            document.documentElement.classList.toggle("dark", e.matches);
        };
        return () => media.removeEventListener("change", handler);
    }, [])

    // switch theme
    const toggle = () => {
        const invoke = () => {
            const isDark = document?.documentElement.classList.toggle('dark')
            setTheme(isDark ? "dark" : "light");
            localStorage.setItem('theme', isDark ? 'dark' : 'light')
        }
        return document?.startViewTransition ? document?.startViewTransition(invoke) : invoke()
    }

    return (
        <button type="button" onClick={toggle} className="rounded-full size-7 inline-flex cursor-pointer justify-center items-center text-primary-text-light focus:outline-hidden text-xs md:text-sm dark:border-neutral-700 dark:text-white">
            {theme === 'dark' ?
                <svg className="hover:rotate-360 rotate-0 transition-all duration-500 shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="#121212"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="#121212"/>
                </svg>
            }
        </button>
    )
}