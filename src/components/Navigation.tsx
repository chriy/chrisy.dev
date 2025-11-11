"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
    { path: '/', label: 'Home' },
    { path: '/posts', label: 'Posts' },
    { path: '/archive', label: 'Archive' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' }
]


export default function Navigation() {
    const pathname = usePathname();
    return (
        <nav className="h-fit items-center justify-end px-2 pb-2 md:pb-0 flex-1 text-primary-text-light dark:text-primary-text-dark">
            <div className="flex flex-col md:flex-row justify-end md:items-center">
                {menu.map(({ label, path }, index) => {
                    const active = path === pathname;
                    return <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="relative"
                    >
                        <Link href={path} className={`inline-block py-2 px-4 hover:text-accent-light font-bold w-full h-full ${active && 'text-accent-light dark:text-accent-dark'} `}>
                            {label}
                        </Link>
                        <span className={`absolute md:hidden left-0 top-0 -z-10 w-full h-10 rounded-md bg-[#f4f6f8] dark:bg-[#2c3e50] transition-all duration-200 ${active ? "opacity-100" : "opacity-0"}`}></span>
                    </motion.div>
                })}
            </div>
        </nav>
    )
}