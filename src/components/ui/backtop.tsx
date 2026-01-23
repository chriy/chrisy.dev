'use client'

import React from "react";

export default function BackTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="mt-20 pb-6 pt-20 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2 text-sm md:text-base" onClick={scrollToTop}>
                <span className="font-medium text-[10px] tracking-[0.2em] text-zinc-300 dark:text-zinc-600 uppercase">The End</span>
                <span className="group flex items-center mt-4 text-black cursor-pointer dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="mr-2 text-blue-500 dark:text-blue-400">➜</span>
                    <span className="underline font-medium text-md decoration-1 underline-offset-4 decoration-gray-300 dark:decoration-gray-700 group-hover:decoration-blue-500">cd ~/top</span>
                </span>
            </div>
            <button
                onClick={scrollToTop}
                className="group relative h-32 w-20 flex justify-center items-end cursor-pointer"
                aria-label="Back to top"
            >
                <div className="absolute inset-y-0 w-px bg-zinc-100 dark:bg-zinc-800"></div>
                <div className="absolute bottom-0 w-0.5 h-8 bg-zinc-800 dark:bg-zinc-200 group-hover:h-full transition-all duration-500 ease-in-out"></div>
                <span className="absolute -right-8 bottom-0 mb-1 text-xs text-zinc-400 font-medium rotate-90 origin-bottom-left group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">TOP</span>
            </button>
        </div>
    )
}