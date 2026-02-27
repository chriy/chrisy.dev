'use client'

import { ArrowUpRight, Mail, MapPin, Radio } from "lucide-react";
import Link from "next/link";
import React from "react";
import { clsx } from "clsx";
import { maple } from "@/lib/font";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";


export default function Contact() {

    const links = [
        {
            name: 'GitHub',
            href: 'https://github.com/chriy',
            detail: 'View my code & open source contributions',
            className: "hover:border-amber-200 hover:bg-amber-50/50 dark:hover:border-amber-900 dark:hover:bg-amber-900/10",
            iconBg: "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white",
            icon: <FaGithub size={32}/>
        },
        {
            name: 'Email',
            href: 'mailto:hi@chrisy.dev',
            detail: 'Let’s build something together',
            className: "hover:border-amber-200 hover:bg-amber-50/50 dark:hover:border-amber-900 dark:hover:bg-amber-900/10",
            icon: <Mail size={32}/>,
            iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500"
        },
        {
            name: "Location: Hangzhou (UTC +08:00)",
            href: "#",
            detail: "Available for on-site & remote opportunities",
            className: "hover:border-purple-200 hover:bg-purple-50/50 dark:hover:border-purple-900 dark:hover:bg-purple-900/10",
            iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
            icon: <MapPin size={32}/>
        },
    ];

    return (
        <section className="container-root">
            {/* title */}
            <div className="flex md:flex-row flex-col">
                <div className="flex-1 py-8">
                    <div className="flex items-center gap-4 w-full justify-start py-8">
                        <Radio className="text-blue-500 animate-pulse" size={18}/>
                        <span className={'text-[10px] font-mono tracking-[0.8em] uppercase dark:text-zinc-600 text-zinc-400'}>
                        ping chrisy.dev
                    </span>
                    </div>
                    <h2 className={clsx('text-4xl md:text-4xl font-bold tracking-tight font-mono dark:text-white text-zinc-900', maple.className)}>
                        <span className="text-green-500">#</span>
                        <span className="text-teal-500 px-6">cat</span>
                        <span className={clsx("text-4xl align-middle block sm:inline")}>~/conf/me.dat</span>
                        <span className="text-blue-500 animate-pulse">_</span>
                    </h2>
                    <p className={clsx('italic mt-8 text-md max-w-sm dark:text-zinc-500 text-zinc-400', maple.className)}>
                        Let's connect and build something amazing together.
                    </p>
                    <p className={clsx(' mt-8 text-md max-w-sm dark:text-zinc-500 text-zinc-400', maple.className)}>
                        如果你有想法，一起做一些有趣的事情吧
                    </p>
                </div>
                <div className="flex-1 flex flex-col justify-between py-16">
                    {links.map((link, index) => (
                        <motion.div
                            key={index}
                            className={clsx('w-full h-full')}
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Link
                                href={link.href}
                                className={clsx('group flex items-center py-8 p-4 w-full h-full border-b border-neutral-200 dark:border-neutral-800 rounded-xl transition-all duration-300', link.className)}
                            >
                                <div className={`shrink-0 p-3 rounded-lg ${link.iconBg} transition-colors`}>
                                    {link.icon}
                                </div>

                                <div className="ml-4 grow">
                                    <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {link.name}
                                    </h3>
                                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 mt-0.5">
                                        {link.detail}
                                    </p>
                                </div>

                                <div className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500  dark:border-zinc-800 dark:group-hover:bg-white dark:group-hover:text-black border-zinc-200 group-hover:bg-black group-hover:text-white`}>
                                        <ArrowUpRight size={20} className="group-hover:scale-110 transition-transform"/>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}