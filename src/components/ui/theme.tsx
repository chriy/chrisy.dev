'use client'

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

export default function Theme() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggle = () => {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        const updateTheme = () => setTheme(nextTheme);

        if (document.startViewTransition) {
            document.startViewTransition(updateTheme);
        } else {
            updateTheme();
        }
    };

    if (!mounted) {
        return <div className="w-9 h-9"/>; // 占位防止布局跳动
    }

    // 判断当前是否是深色 (resolvedTheme 会处理 system 设置)
    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle Theme"
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none ring-1 ring-transparent focus-visible:ring-gray-300 cursor-pointer"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="text-amber-500" width={20} height={20}/>
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MoonStar className="text-blue-600" width={20} height={20}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}