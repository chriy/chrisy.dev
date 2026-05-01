'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Paperclip, Terminal } from 'lucide-react';
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import { Tag } from "@/components/mdx/tag";
import { Post } from "@/lib/posts";

export default function LatestPost({ posts }: { posts: Post[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const updateScrollState = useCallback(() => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        setCanScrollPrev(track.scrollLeft > 4);
        setCanScrollNext(track.scrollLeft < maxScrollLeft - 4);
    }, []);

    useEffect(() => {
        updateScrollState();

        const track = trackRef.current;

        if (!track) {
            return;
        }

        const resizeObserver = new ResizeObserver(updateScrollState);
        resizeObserver.observe(track);
        window.addEventListener('resize', updateScrollState);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateScrollState);
        };
    }, [posts.length, updateScrollState]);

    const scrollFilm = (direction: 'prev' | 'next') => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const scrollDistance = Math.min(track.clientWidth * 0.75, 420);
        track.scrollBy({
            left: direction === 'next' ? scrollDistance : -scrollDistance,
            behavior: 'smooth',
        });
    };

    return (
        <section className="overflow-hidden bg-theme-light dark:bg-theme-dark transition-colors duration-500">
            <div className="container-root">
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 py-8 md:py-0">
                                <Terminal className="text-indigo-500" size={ 12 }/>
                                <span className="text-[12px] font-mono tracking-wider text-zinc-500 dark:text-zinc-400 lowercase">
                                    ~/chrisy/blog/archive
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="group relative">
                            <h2 className={ clsx(
                                "relative text-3xl md:text-4xl font-mono font-bold tracking-tight flex items-center flex-wrap gap-y-2",
                                "text-zinc-900 dark:text-zinc-100",
                                maple.className
                            ) }>
                                <span className="text-cyan-300 mr-3 select-none">#</span>
                                <span className="text-indigo-500">head</span>
                                <span className="text-zinc-400 dark:text-zinc-600 mx-3">-n</span>
                                <span className="text-emerald-500 dark:text-emerald-400">5</span>
                                <span className="ml-4 text-zinc-800 dark:text-zinc-200">~/posts</span>

                                <motion.div
                                    animate={ {
                                        opacity: [1, 0, 1],
                                    } }
                                    transition={ { duration: 1.5, repeat: Infinity } }
                                    className="w-2.5 h-8 md:h-9 bg-indigo-500 ml-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                />
                            </h2>
                        </div>
                        <div className="hidden translate-y-2 md:block">
                            <Bot/>
                        </div>
                    </div>
                </div>

                <div className={ "pt-20" }>
                    <div className="relative line w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className={ clsx(
                                "pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-linear-to-r from-theme-light to-transparent transition-opacity dark:from-theme-dark",
                                canScrollPrev ? "opacity-100" : "opacity-0"
                            ) }
                        />
                        <div
                            aria-hidden="true"
                            className={ clsx(
                                "pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-linear-to-l from-theme-light to-transparent transition-opacity dark:from-theme-dark",
                                canScrollNext ? "opacity-100" : "opacity-0"
                            ) }
                        />
                        <div
                            ref={ trackRef }
                            onScroll={ updateScrollState }
                            className={ clsx(
                                'w-full flex flex-row items-start justify-start gap-8 md:gap-12',
                                'overflow-x-auto no-scrollbar scroll-smooth px-1',
                                '-mt-16 pt-28 pb-8'
                            ) }
                        >
                            { posts.map((post, i) => (
                                <FilmCard key={ i } post={ post } index={ i }/>
                            )) }
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-3">
                        <FilmScrollButton
                            direction="prev"
                            disabled={ !canScrollPrev }
                            onClick={ () => scrollFilm('prev') }
                        />
                        <FilmScrollButton
                            direction="next"
                            disabled={ !canScrollNext }
                            onClick={ () => scrollFilm('next') }
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const FilmScrollButton = ({ direction, disabled, onClick, }: {
    direction: 'prev' | 'next';
    disabled: boolean;
    onClick: () => void;
}) => {
    const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
    return (
        <button
            type="button"
            onClick={ onClick }
            disabled={ disabled }
            aria-label={ direction === 'prev' ? 'Scroll latest posts left' : 'Scroll latest posts right' }
            className={ clsx(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                "border-zinc-200/80 bg-white/55 text-zinc-600 shadow-lg shadow-zinc-200/50 backdrop-blur-md",
                "hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-500",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-light",
                "dark:border-white/10 dark:bg-zinc-950/35 dark:text-zinc-300 dark:shadow-none dark:hover:border-indigo-400/60 dark:hover:bg-zinc-950/50 dark:hover:text-indigo-300 dark:focus-visible:ring-offset-theme-dark",
                disabled && "pointer-events-none translate-y-0 opacity-35"
            ) }
        >
            <Icon size={ 18 } strokeWidth={ 2.2 }/>
        </button>
    );
};


const FilmCard = ({ post, index }: { post: Post, index: number }) => {
    const deg = index % 2 === 0 ? 1 : -1;
    const sensorRef = useRef(null);

    return (
        <div ref={sensorRef} className="relative flex flex-col items-center shrink-0 w-64 group">
            <motion.div
                whileHover={ { y: -25 } }
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
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center shadow-md group-hover:bg-indigo-400 dark:group-hover:bg-indigo-400 transition-colors duration-300">
                            <Paperclip size={ 16 } className="text-zinc-500 dark:text-zinc-400 group-hover:text-white dark:group-hover:text-white"/>
                        </div>
                        <div className="w-px h-12 bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>
                    <Link href={ post.slug } className="block cursor-pointer">
                        <div className={ clsx(
                            "relative flex h-80 min-w-64 flex-col justify-between overflow-hidden px-6 py-10 transition-colors duration-500",
                            "bg-zinc-50 dark:bg-transparent shadow-2xl shadow-zinc-200/70 dark:shadow-none border border-zinc-200/80 group-hover:border-indigo-300/70 dark:border-transparent dark:group-hover:border-indigo-400/30 rounded-xs"
                        ) }>
                            <FilmSprockets className="top-0 bg-zinc-200/90 dark:bg-black border-b border-zinc-300/80 dark:border-white/10"/>
                            <FilmSprockets className="bottom-0 bg-zinc-200/90 dark:bg-black border-t border-zinc-300/80 dark:border-white/10"/>
                            <span className="absolute -right-4 bottom-4 text-9xl font-black text-black/5 dark:text-white/5 select-none rotate-30 scale-200 -translate-y-8">{index + 1}</span>
                            <div className="relative z-10 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-tight">POST_{ (index + 1).toString().padStart(2, '0') }</span>
                                { post.metadata.tags?.length && (
                                    <Tag children={ post.metadata.tags.at(0) } variant={ 'info' } size={ "sm" }/>
                                )}
                            </div>
                            <div className="relative z-10 mt-auto mb-8 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        { Array.from({ length: 4 }).map((_, markIndex) => (
                                            <span
                                                key={ markIndex }
                                                className="h-1 w-3 rounded-full bg-zinc-300 transition-colors duration-500 group-hover:bg-indigo-300 dark:bg-zinc-700 dark:group-hover:bg-indigo-500/70"
                                            ></span>
                                        )) }
                                    </div>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-500 group-hover:text-indigo-500 dark:text-zinc-600 dark:group-hover:text-indigo-300">
                                        Read
                                    </span>
                                </div>
                                <h3 className={clsx(
                                    "my-4 line-clamp-1 text-3xl font-bold italic leading-tight transition-all duration-700",
                                    "text-zinc-600 group-hover:text-zinc-950",
                                    "dark:text-zinc-400 dark:group-hover:text-white",
                                    nunito.className
                                )}>
                                    { post.metadata.title }
                                </h3>
                                <p className={clsx(
                                    "line-clamp-3 h-15 text-xs leading-5 text-zinc-500 transition-colors duration-500",
                                    "group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-400"
                                )}>
                                    { post.metadata.summary }
                                </p>
                            </div>
                            <div className="relative z-10 border-t border-dashed border-zinc-400/30 pt-4 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-600">{ post.metadata.date }</span>
                                <ArrowUpRight size={ 14 } className="text-zinc-400 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-400"/>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

const FilmSprockets = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`absolute left-0 w-full h-8 flex justify-between items-center px-3 z-20 ${className}`}>
            {Array.from({ length: 7 }).map((_, i) => (
                <div
                    key={i}
                    className={clsx("w-3 h-4 rounded-xs transition-all duration-500",
                        "bg-zinc-500/65 border border-zinc-600/25 shadow-[inset_0_1.5px_3px_rgba(39,39,42,0.22)]",
                        "dark:bg-zinc-800/90 dark:border-zinc-700/70 dark:shadow-none",
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
