'use client'

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Theme() {
    const [theme, setTheme] = useState<"dark"|"light">("light");
    const [mounted, setMounted] = useState(false);

    // 初始化逻辑
    useEffect(() => {
        setMounted(true);

        const localTheme = localStorage.getItem('theme') as "dark"|"light"|null;
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const initialTheme = localTheme || (systemPrefersDark ? "dark" : "light");
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? "dark" : "light";
                setTheme(newTheme);
                document.documentElement.classList.toggle("dark", e.matches);
            }
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const toggle = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        const updateDOM = () => {
            document.documentElement.classList.toggle('dark', nextTheme === 'dark');
            localStorage.setItem('theme', nextTheme);
            setTheme(nextTheme);
        };

        if (document.startViewTransition) {
            document.startViewTransition(updateDOM);
        } else {
            updateDOM();
        }
    };

    // 防止 SSR 水合不匹配：未挂载前渲染一个空的占位符
    if (!mounted) {
        return <div className="w-9 h-9"/>;
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle Theme"
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none ring-1 ring-transparent focus-visible:ring-gray-300 cursor-pointer"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                    <motion.div
                        key="sun"
                        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Sun Icon - 显示黄色 */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Moon Icon - 显示深灰色或蓝色 */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}