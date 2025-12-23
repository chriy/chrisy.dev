'use client'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-mono bg-theme-light dark:bg-theme-dark text-black dark:text-white transition-colors duration-300">
            <h1 className="text-6xl font-bold tracking-tighter">404</h1>
            <div className="w-12 h-px bg-gray-300 dark:bg-gray-700 my-6"></div>
            <div className="flex flex-col items-center gap-2 text-sm md:text-base">
                <p className="text-gray-500 dark:text-gray-400">Page not found.</p>
                <Link href="/" className="group flex items-center mt-4 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <span className="mr-2 text-blue-500 dark:text-blue-400">➜</span>
                    <span className="underline decoration-1 underline-offset-4 decoration-gray-300 dark:decoration-gray-700 group-hover:decoration-blue-500">cd /home</span>
                </Link>
            </div>
        </div>
    )
}