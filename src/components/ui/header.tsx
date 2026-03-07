'use client'

import Image from "next/image";
import Link from "next/link";
import logo from '@/images/logo.png';
import Theme from "@/components/ui/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { clsx } from "clsx";
import { nunito } from "@/lib/font";

export default function Header() {
    const [colspan, setColspan] = useState(false);
    return (
        <header className={clsx("sticky top-0 z-50 w-full px-1 transition-all duration-300 select-none", nunito.className)}>
            <div className="mx-auto w-full sm:w-fit m-h-16 sm:mt-6 sm:py-1 py-1 px-1 sm:rounded-full sm:border border-white/40 dark:border-white/10 shadow-md shadow-neutral-200/20 dark:shadow-black/40 backdrop-blur-xl backdrop-saturate-150 bg-white/60 dark:bg-[#09090b]/60 transition-colors">
                <div className="flex items-center justify-between w-full h-12 pl-1 pr-4">
                    {/* Left: Logo area */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-white/20 dark:ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300">
                                <Image
                                    src={logo}
                                    alt="Avatar"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="eager"
                                />
                            </div>
                            <span className="text-md lg:text-lg font-extrabold text-neutral-800 dark:text-neutral-100 tracking-tight transition-all">
                                Chrisy<span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-cyan-400">.dev</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1 px-8">
                        <Navigation />
                    </div>

                    {/* Right: Theme & Hamburger */}
                    <div className="flex items-center gap-3">
                        <div className="scale-90 sm:scale-100">
                            <Theme />
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
                            <div className="p-4 border-t border-neutral-100 dark:border-white/5 flex flex-col items-center gap-4 pb-10">
                                <Navigation />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}