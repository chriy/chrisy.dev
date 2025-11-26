'use client'

import Image from "next/image";
import Link from "next/link";
import logo from '@/images/logo.png';
import Theme from "@/components/Theme";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";

export default function Header() {
    const [visible, setVisible] = useState(true);
    const lastY = useRef(0);
    const ticking = useRef(false);
    const [colspan, setColspan] = useState(false);

    const threshold = 50;

    useEffect(() => {
        const updateScroll = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastY.current;

            if (Math.abs(diff) <= 50) {
                ticking.current = false;
                return;
            }

            if (currentY < threshold) {
                setVisible(true);
            } else if (diff > 0) {
                setColspan(false);
                // setVisible(false);
            } else {
                setVisible(true);
            }

            lastY.current = currentY;
            ticking.current = false;
        };

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScroll);
                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            ticking.current = false;
        };
    }, []);

    return (
        <header className="w-full h-24 pointer-events-none">
            <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{
                    y: visible ? 0 : -120, // When hidden, move upwards off the screen.
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-auto px-2"
            >
                <motion.div
                    layout
                    animate={colspan ? "open" : "closed"}
                    variants={{
                        open: { borderRadius: "24px" },
                        closed: { borderRadius: "50px" }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative flex flex-col items-center w-full lg:w-9/12 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 shadow-md shadow-neutral-200/20 dark:shadow-neutral-950/10"
                >
                    {/* Top Row: Logo, Nav, Actions */}
                    <div className="flex items-center justify-between w-full h-14 pl-2 pr-4">

                        {/* Left: Logo area */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="relative block shrink-0">
                                <div className="relative w-10 h-10 overflow-hidden rounded-full border border-neutral-100 dark:border-neutral-700 shadow-sm">
                                    <Image
                                        src={logo}
                                        alt="Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                            <Link href="/" className="hidden sm:block font-bold text-neutral-700 dark:text-neutral-200 tracking-tight hover:opacity-80 transition-opacity">
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    {colspan ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/>
                                    )}
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

                </motion.div>
            </motion.div>
        </header>
    )
}