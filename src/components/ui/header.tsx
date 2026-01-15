'use client'

import Image from "next/image";
import Link from "next/link";
import logo from '@/images/logo.png';
import Theme from "@/components/ui/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { clsx } from "clsx";

export default function Header() {
    const [colspan, setColspan] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full bg-theme-light/0 dark:bg-theme-dark/0 backdrop-blur-md">
            <div className="mx-auto max-w-360 m-h-20 sm:py-4 py-1">
                <div className="flex items-center justify-between w-full h-14 pl-2 pr-4">

                    {/* Left: Logo area */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="relative block shrink-0">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full">
                                <Image
                                    src={logo}
                                    alt="Avatar"
                                    fill
                                    className="object-cover"
                                    loading="eager"
                                />
                            </div>
                        </Link>
                        <Link href="/" className="text-md lg:text-lg font-bold text-neutral-700 dark:text-neutral-200 tracking-tight hover:opacity-80 transition-opacity">
                            Chrisy<span className="text-blue-500">.dev</span>
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1 px-8">
                        <Navigation/>
                    </div>

                    {/* Right: Theme & Hamburger */}
                    <div className="flex items-center gap-3">

                        <div className="scale-90 sm:scale-100">
                            <Theme/>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            type="button"
                            onClick={() => setColspan(!colspan)}
                            className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M4 12h16"
                                    className={clsx("origin-center transition-all duration-300 ease-in-out",
                                        colspan ? 'rotate-45' : '-translate-y-1'
                                    )}
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M4 12h16"
                                    className={clsx("origin-center transition-all duration-300 ease-in-out",
                                        colspan ? '-rotate-45' : 'translate-y-1'
                                    )}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu (Collapsible) */}
                <AnimatePresence>
                    {colspan && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full overflow-hidden md:hidden"
                        >
                            <div className="p-4 border-t border-neutral-100 dark:border-white/5 flex flex-col items-center gap-4 pb-6">
                                <Navigation/>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}