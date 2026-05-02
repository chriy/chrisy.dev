'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export default function SplashScreen() {
    const [show, setShow] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                setIsFading(true);
                setTimeout(() => setShow(false), 500);
            }, 300);
        });
    }, []);

    if (!show) return null;

    return (
        <div
            className={ clsx(
                "fixed inset-0 z-100 flex flex-col items-center justify-center bg-theme-light dark:bg-[#09090b] transition-opacity duration-500 ease-in-out",
                isFading ? "opacity-0 pointer-events-none" : "opacity-100"
            ) }
        >
            <div className="flex flex-col items-start font-mono text-sm sm:text-base">
                <div className="text-emerald-600 dark:text-emerald-400 mb-2">
                    <span className="opacity-70">&gt;</span> Initializing environment...
                </div>
                <div className="flex items-center text-slate-800 dark:text-slate-200 mt-2 text-xl font-semibold">
                    <span className="text-emerald-600 dark:text-emerald-400 mr-2">~</span>
                    chrisy.dev
                    <span className="ml-1 inline-block w-2 h-5 bg-slate-800 dark:bg-slate-200 animate-pulse"></span>
                </div>
            </div>
        </div>
    );
}