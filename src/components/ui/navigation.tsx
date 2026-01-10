'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
    { path: '/', label: 'Home' },
    { path: '/posts', label: 'Posts' },
    { path: '/moments', label: 'Moments' },
    { path: '/repo', label: 'Repo' },
    { path: '/about', label: 'About' }
]

export default function Navigation() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string|null>(null);

    return (
        <nav className="w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full">
                {menu.map(({ label, path }, index) => {
                    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);

                    return (
                        <motion.div
                            key={path}
                            // initial={{ opacity: 0, x: -20 }}
                            // animate={{ opacity: 1, x: 0 }}
                            // transition={{ duration: 0.2, delay: index * 0.1 }}
                            className="relative w-full md:w-auto"
                            onMouseEnter={() => setHoveredPath(path)}
                            onMouseLeave={() => setHoveredPath(null)}
                        >
                            <Link
                                href={path}
                                className={`
                                    relative block w-full px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200
                                    ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}
                                `}
                            >
                                {/* 只有当 hover 到当前 item 时才渲染这个背景 */}
                                {(path === hoveredPath || (!hoveredPath && isActive)) && (
                                    <motion.span
                                        layoutId="nav-item-pill"
                                        className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-full -z-10 hidden md:block"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    />
                                )}

                                {/* --- Mobile 端的静态高亮背景 (不需要滑动) --- */}
                                {isActive && (
                                    <span className="absolute inset-0 bg-gray-100 dark:bg-white/10 rounded-lg -z-10 md:hidden"></span>
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