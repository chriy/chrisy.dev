'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Paperclip, Terminal } from 'lucide-react';
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import { Tag } from "@/components/mdx/tag";
import { Post, PostMetadata } from "@/lib/posts";

export default function LatestPost({ posts }: {posts: Post[]}) {
    return (
        <section className="overflow-hidden bg-theme-light dark:bg-theme-dark transition-colors duration-500 md:-mt-20">
            <div className="container-root">
                {/* 标题 */}
                <div>
                    <div className="flex items-center justify-start gap-3 mb-4 pl-1">
                        <Terminal className="text-indigo-500" size={16}/>
                        <span className="text-[12px] tracking-[0.2em] text-zinc-400 dark:text-zinc-600 lowercase">
                            ~/chrisy/blog/archive
                      </span>
                    </div>

                    {/* 命令行 */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="group h-full">
                            <h2 className={clsx("text-4xl font-mono font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 flex items-center", maple.className)}>
                                <span className="text-indigo-500 mr-4 select-none">$</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-indigo-500">tail</span>
                                    <span className="text-zinc-400 dark:text-zinc-600 w-10">-n</span>
                                    <span className="text-indigo-500">5</span>
                                    <span className="mr-2">~/posts</span>
                                </div>

                                <motion.div
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-10 bg-indigo-500 ml-4 mt-2 mx-auto shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                />
                            </h2>
                        </div>
                        <Bot/>
                    </div>
                </div>

                {/* 卡片 */}
                <div className={"pt-18 border-l-zinc-200 border-r-zinc-200"}>
                    <div className="relative line w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className={clsx('w-full mt-12 flex flex-col sm:flex-row items-center justify-center gap-16 md:gap-8')}>
                        {posts.map((post, i) => (
                            <FilmCard key={i} post={post.metadata} index={i}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


const FilmCard = ({ post, index }: {post: PostMetadata, index: number}) => {
    const deg = index % 2 === 0 ? 1 : -1;
    const sensorRef = useRef(null);
    // amount: 0.5 代表“至少有 50% 暴露在屏幕内才算 isInView 为 true”
    // 当窗口缩小，卡片有 50% 以上被切掉时，isInView 就会变成 false
    const isInView = useInView(sensorRef, { amount: 0.5 });

    return (
        <div ref={sensorRef} className="relative flex flex-col items-center shrink-0 w-64 group">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileHover={{ translateY: -30 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <motion.div
                    animate={{
                        rotate: [deg, -deg, deg],
                    }}
                    transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ transformOrigin: 'top center' }}
                >
                    {/* 胶片夹子 */}
                    <div className="absolute -top-16 left-28 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center shadow-md group-hover:bg-indigo-400 dark:group-hover:bg-indigo-400 transition-colors duration-300">
                            <Paperclip size={16} className="text-zinc-500 dark:text-zinc-400 group-hover:text-white dark:group-hover:text-white"/>
                        </div>
                        <div className="w-px h-12 bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>
                    <Link href={'#'} className="block cursor-pointer">
                        <div className={clsx("relative flex flex-col justify-between min-w-64 min-h-80 px-6 py-10 overflow-hidden")}>
                            {/* 胶卷孔洞 */}
                            <FilmSprockets className="top-0 bg-black/65 dark:bg-black border-b border-zinc-200 dark:border-white/10"/>
                            <FilmSprockets className="bottom-0 bg-black/65 dark:bg-black border-t border-zinc-200 dark:border-white/10"/>
                            {/* 背景大水印 */}
                            <span className="absolute -right-4 bottom-4 text-9xl font-black text-black/5 dark:text-white/5 select-none rotate-30 scale-200 -translate-y-8">{index + 1}</span>

                            {/* 顶部信息 */}
                            <div className="relative z-10 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-500 font-bold">POST_{index}</span>
                                {post.tags?.length && (
                                    <Tag children={post.tags.at(0)} variant={'info'} size={"sm"}/>
                                )}
                            </div>

                            {/* 中间文字 (显影效果) */}
                            <div className="relative z-10 mt-auto mb-8 space-y-2">
                                {/* 线条 */}
                                <div className="w-8 h-px bg-indigo-400 group-hover:w-full transition-all duration-800"></div>
                                <h3 className={clsx(
                                    "text-3xl font-bold italic leading-none transition-all duration-800 my-4",
                                    "text-zinc-400 grayscale-100 blur-[0px] group-hover:text-indigo-400 group-hover:blur-[0px] group-hover:grayscale-0",
                                    "dark:text-indigo-400",
                                    nunito.className
                                )}>
                                    {post.title}
                                </h3>
                                <p className={clsx("text-xs text-zinc-500 opacity-0 transition-opacity duration-500", "group-hover:opacity-100")}>
                                    {post.summary}
                                </p>
                            </div>

                            {/* 底部 */}
                            <div className="relative z-10 border-t border-dashed border-zinc-400/30 pt-4 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-600">{post.date}</span>
                                <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-indigo-400"/>
                            </div>

                            {/* 发光边框 (Hover) */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-400/10 pointer-events-none"></div>

                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

const FilmSprockets = ({ className = "" }: {className?: string}) => {
    return (
        <div className={`absolute left-0 w-full h-8 flex justify-between items-center px-3 z-20 ${className}`}>
            {Array.from({ length: 7 }).map((_, i) => (
                <div
                    key={i}
                    className={clsx("w-3 h-4 rounded-xs transition-all duration-500",
                        "bg-white border border-zinc-300 shadow-sm",
                        "dark:bg-zinc-800 dark:border-zinc-700",
                    )}></div>
            ))}
        </div>
    );
};


const Bot = () => {
    return (
        <div className="relative flex flex-col items-center justify-end w-20 group cursor-crosshair">
            <motion.div
                initial={{ y: -25, opacity: 0, scale: 0.8 }}
                animate={{ y: 6, opacity: 1, scale: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute bottom-2 w-12 h-14 bg-white dark:bg-zinc-200 border border-zinc-300 dark:border-zinc-400 rounded flex flex-col items-center pt-1.5 z-0 shadow-sm"
            >
                <div className="w-9 h-7 bg-zinc-200 dark:bg-zinc-300 rounded-xs mb-1"></div>
                <div className="w-9 h-0.5 bg-zinc-300 dark:bg-zinc-400 rounded-full"></div>
            </motion.div>

            <motion.div
                animate={{ y: [-3, 2, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
            >
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-500 dark:text-zinc-400 drop-shadow-md"
                >
                    <path d="M12 2v4" className="stroke-indigo-500 group-hover:stroke-indigo-400 transition-colors"/>
                    <circle cx="12" cy="2" r="1.5" className="fill-indigo-500 stroke-none drop-shadow-[0_0_3px_rgba(99,102,241,0.8)] group-hover:fill-indigo-400 transition-colors"/>
                    <rect x="3" y="6" width="18" height="13" rx="3" className="fill-[#fafafa] dark:fill-[#121212] transition-colors"/>
                    <rect x="5" y="8" width="14" height="9" rx="1.5" className="stroke-zinc-300 dark:stroke-zinc-700/50"/>
                    <motion.g
                        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}
                        style={{ transformOrigin: "center 12px" }}
                    >
                        <path d="M 7.5 10.5 L 9 11.5 L 7.5 12.5" className="stroke-zinc-500 dark:stroke-zinc-400"/>
                        <path d="M 16.5 10.5 L 15 11.5 L 16.5 12.5" className="stroke-zinc-500 dark:stroke-zinc-400"/>
                    </motion.g>
                    <path d="M 11 13.5 h 2" className="stroke-zinc-500 dark:stroke-zinc-400"/>
                </svg>
            </motion.div>
        </div>
    );
};