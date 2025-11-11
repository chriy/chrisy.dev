"use client"

import Image from "next/image";
import logo from '../images/logo.png';
import Theme from "./Theme";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";

export default function Header() {
    const [visible, setVisible] = useState(true);
    const lastY = useRef(0);
    const ticking = useRef(false);

    const [colspan, setColspan] = useState(false)

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
                setVisible(false);
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
        <header className="w-full h-24">
            <div className="fixed w-full px-2 py-3 sm:py-5 top-0 z-10 overflow-visible">
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                        opacity: visible ? 1 : 0,
                        y: visible ? 0 : -100,
                        pointerEvents: visible ? 'auto' : 'none'
                    }}
                    transition={{ ease: "easeOut" }}
                    className={`flex items-center flex-col justify-between  mx-auto overflow-hidden w-full md:w-9/12 ring-[#e5e7eb] dark:ring-[#3f3f46] max-h-fit duration-200 transition-all backdrop-blur-sm ring-1 ${colspan ? 'rounded-2xl h-80 bg-white/80 dark:bg-transparent' : 'rounded-4xl h-16'}`}
                >
                    <div className={`flex items-center justify-between min-h-16 w-full pr-2`}>
                        <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 mx-2 cursor-pointer relative">
                            <a href="/" className="h-fit">
                                <Image src={logo} alt="Avatar" width={100} height={100} className="rounded-full"/>
                            </a>
                        </div>

                        <div className="flex md:hidden justify-end flex-1 px-5">
                            <button type="button" onClick={() => setColspan(!colspan)} className="size-7 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-text-light dark:text-white" viewBox="0 0 24 24" stroke="currentColor">
                                    {colspan ?
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/> :
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16M4 18h7"/>}
                                </svg>
                            </button>
                        </div>

                        <div className="hidden md:flex w-full">
                            <Navigation/>
                        </div>

                        <div className="flex items-center justify-center gap-4 pr-1 font-medium">
                            <Theme/>
                        </div>
                    </div>
                    <div className="flex md:hidden w-full">
                        <Navigation/>
                    </div>
                </motion.div>
            </div>
        </header>
    )
}