'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { maple } from "@/lib/font";

const menu = [
    { path: '/', label: '~/' },
    { path: '/posts', label: '~/posts' },
    { path: '/about', label: '~/about' },
]

export default function Navigation() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    return (
        <nav className="w-full md:w-auto">
            <div
                className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full"
                onMouseLeave={() => setHoveredPath(null)}
            >
                {menu.map(({ label, path }, index) => {
                    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
                    const isHighlighted = path === hoveredPath || (!hoveredPath && isActive);

                    return (
                        <motion.div
                            key={path}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: "easeOut"
                            }}
                            className="relative w-full md:w-auto"
                            onMouseEnter={() => setHoveredPath(path)}
                        >
                            <Link
                                href={path}
                                className={clsx(
                                    "relative block w-full px-6 py-2 rounded-full text-[14px] font-extrabold transition-colors duration-100 text-left md:text-center", maple.className,
                                    isHighlighted
                                        ? "text-white"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                                )}
                            >
                                {isHighlighted && (
                                    <motion.span
                                        layoutId="nav-item-pill"
                                        className="absolute inset-0 bg-zinc-950 dark:bg-white/10 rounded-full -z-10 hidden md:block"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 35
                                        }}
                                    />
                                )}

                                {isActive && (
                                    <span className="absolute inset-0 bg-zinc-950 dark:bg-white/10 rounded-lg -z-10 md:hidden w-full"></span>
                                )}

                                <span className="relative z-10">{label}</span>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </nav>
    )
}