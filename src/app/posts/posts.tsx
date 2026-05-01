'use client'

import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";
import { Calendar, GitBranch, Hash, MapPin, Search, Tag as TagIcon, Terminal } from "lucide-react";
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/posts";
import BackTop from "@/components/ui/backtop";

type SetState<T> = Dispatch<SetStateAction<T>>;

function useDebouncedValue<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debouncedValue;
}

function parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? null : date;
}

function getYearLabel(dateString: string): string {
    const date = parseDate(dateString);
    return date ? String(date.getFullYear()) : "Unknown";
}

function formatPostDate(dateString: string): string {
    const date = parseDate(dateString);
    if (!date) return "Unknown";
    return date.toISOString().split("T")[0].replace(/-/g, ".");
}

function sortYearsDescWithUnknownLast(years: string[]): string[] {
    return [...years].sort((a, b) => {
        if (a === "Unknown") return 1;
        if (b === "Unknown") return -1;
        return Number(b) - Number(a);
    });
}

export default function Posts({ posts }: { posts: Post[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [showAllTags, setShowAllTags] = useState(false);
    const [showAllYears, setShowAllYears] = useState(false);
    const [displayLimit, setDisplayLimit] = useState(10);
    const debouncedSearchQuery = useDebouncedValue(searchQuery, 150);

    // Reset limit when query/filters change.
    useEffect(() => {
        setDisplayLimit(10);
    }, [searchQuery, selectedTag, selectedYear]);

    // Metadata extraction
    const allTags = useMemo(() => {
        const counts = new Map<string, number>();
        for (const post of posts) {
            for (const tag of post.metadata.tags ?? []) {
                const normalized = tag.trim();
                if (!normalized) continue;
                counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
            }
        }
        return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    }, [posts]);

    const allYears = useMemo(() => {
        const years = new Set<string>();
        for (const post of posts) years.add(getYearLabel(post.metadata.date));
        return sortYearsDescWithUnknownLast([...years]);
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const query = debouncedSearchQuery.trim().toLowerCase();
        return posts.filter(post => {
            const title = post.metadata.title ?? "";
            const summary = post.metadata.summary ?? "";
            const tags = (post.metadata.tags ?? []).map(t => t.trim()).filter(Boolean);

            const matchesSearch = !query
                || title.toLowerCase().includes(query)
                || summary.toLowerCase().includes(query)
                || tags.some(t => t.toLowerCase().includes(query));

            const matchesTag = !selectedTag || tags.includes(selectedTag);
            const postYear = getYearLabel(post.metadata.date);
            const matchesYear = !selectedYear || postYear === selectedYear;
            return matchesSearch && matchesTag && matchesYear;
        });
    }, [posts, debouncedSearchQuery, selectedTag, selectedYear]);

    const visiblePosts = useMemo(() => filteredPosts.slice(0, displayLimit), [filteredPosts, displayLimit]);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 min-h-screen selection:bg-blue-500/20 relative">
            {/* Vertical Decoration - Matching Home Style */}
            <div className="absolute left-4 top-40 hidden xl:block">
                <span className="[writing-mode:vertical-lr] text-[10px] font-bold uppercase tracking-[1em] text-zinc-300 dark:text-zinc-800 select-none opacity-50">
                    PERSPECTIVE & PRECISION
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-8">

                {/* Header Section */}
                <div className="lg:col-span-12 space-y-10">
                    {/* Top Meta Bar */}
                    <div className="flex items-center gap-4 translate-x-1 opacity-60">
                        <span className="h-px w-10 bg-zinc-600"></span>
                        <span className={ clsx("text-[12px] font-bold uppercase tracking-[0.3em] text-zinc-500", maple.className) }>
                            Archives / <span className="text-blue-500">Notes</span>
                        </span>
                    </div>

                    <SearchHeader
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />


                </div>

                {/* Left: Main Post Timeline */}
                <div className="lg:col-span-8 relative">
                    {/* Decorative Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 hidden md:block">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-zinc-200 dark:via-zinc-800/60 to-transparent" />
                    </div>

                    <div className="space-y-4 relative">
                        <AnimatePresence mode="popLayout">
                            {visiblePosts.map((post, index) => (
                                <PostItem key={post.slug} post={post} index={index} />
                            ))}
                        </AnimatePresence>

                        {filteredPosts.length > displayLimit && (
                            <FetchMoreButton
                                onClick={() => setDisplayLimit(prev => prev + 15)}
                                displayLimit={displayLimit}
                                totalFiltered={filteredPosts.length}
                            />
                        )}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="py-40 text-center ml-20">
                            <Terminal size={32} className="mx-auto mb-6 text-zinc-100 dark:text-zinc-900" />
                            <p className={clsx("text-[10px] text-zinc-400 font-mono tracking-[0.3em] uppercase", maple.className)}>
                                No matching notes found for "{searchQuery}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Sidebar Widgets */}
                <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 self-start pt-2 max-w-md w-full mx-auto">
                    <YearWidget
                        allYears={allYears}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        showAllYears={showAllYears}
                        setShowAllYears={setShowAllYears}
                    />

                    <TagWidget
                        allTags={allTags}
                        selectedTag={selectedTag}
                        setSelectedTag={setSelectedTag}
                        showAllTags={showAllTags}
                        setShowAllTags={setShowAllTags}
                    />
                </aside>
            </div>
            <BackTop />
        </section>
    );
}

// --- Sub-Components ---

const SearchHeader = ({
    searchQuery,
    setSearchQuery
}: {
    searchQuery: string;
    setSearchQuery: SetState<string>;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <div className="group relative">
                <div className={clsx('flex flex-wrap items-center gap-x-5 gap-y-4 text-xl md:text-3xl font-bold tracking-tight', maple.className)}>
                    {/* Static Command Part */}
                    <div className="flex items-center shrink-0">
                        <span className="text-green-500 font-black mr-4">{ '#' }</span>
                        <span className="text-blue-500 italic mr-4">ls</span>
                        <span className="text-zinc-400 dark:text-zinc-500">-l</span>
                        <span className="text-zinc-900 dark:text-white ml-4">～/posts</span>
                    </div>

                    {/* Integrated Pipe & Grep Search Unit */}
                    <div className="flex-1 min-w-full sm:min-w-100 flex items-center gap-4 sm:gap-6 group/search">
                        <span className="hidden sm:block text-zinc-300 dark:text-zinc-800 transition-colors duration-500 group-focus-within/search:text-zinc-400 font-light text-lg md:text-xl">|</span>

                        <div className="flex-1 flex items-baseline gap-4 sm:gap-8 relative py-2 group/search-area cursor-pointer">
                            <div className="absolute -inset-x-5 -inset-y-1 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 group-hover/search:bg-zinc-700/5 dark:group-hover/search:bg-zinc-800/10 transition-all duration-700" />

                            <motion.div whileHover={{ y: -1 }} className="flex items-center gap-3 shrink-0 relative z-10">
                                <span className="sm:hidden text-zinc-200 dark:text-zinc-800 font-light text-lg md:text-xl">|</span>
                                <span className={clsx(
                                    "italic font-black text-lg md:text-xl transition-all duration-700",
                                    searchQuery ? "text-teal-500" : "text-zinc-300 dark:text-zinc-800/60"
                                )}>
                                    grep
                                </span>
                            </motion.div>

                            <div className="flex-1 relative z-10">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder=""
                                    className={clsx(
                                        "w-full bg-transparent focus:outline-none text-zinc-900 dark:text-white font-bold text-xl md:text-3xl leading-none tracking-tight px-6 caret-transparent cursor-text",
                                        maple.className
                                    )}
                                />
                                <motion.span
                                    animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.95, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-[0.7em] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] opacity-0 group-focus-within/search:opacity-100 transition-opacity pointer-events-none"
                                />

                                {/* Subtle Data-Flow Bottom Border - Just the moving light */}
                                <div className="absolute bottom-0 left-1 right-0 h-px overflow-hidden opacity-0 group-hover/search:opacity-100 group-focus-within/search:opacity-100 transition-opacity duration-700">
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                        className="w-[40%] h-full bg-linear-to-r from-transparent via-blue-500/50 dark:via-blue-400/40 to-transparent"
                                    />
                                </div>
                            </div>

                            {/* Decorative Search Icon */}
                            <div className="hidden sm:flex items-center px-4 opacity-40 group-focus-within/search:opacity-100 group-hover/search:opacity-70 transition-all duration-700">
                                <Search size={24} className="text-zinc-400 dark:text-zinc-600 group-focus-within/search:text-blue-500" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const PostItem = ({ post, index }: { post: Post; index: number }) => {
    const postHash = useMemo(() => {
        return Math.abs(post.slug.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0)).toString(16).substring(0, 7).toUpperCase();
    }, [post.slug]);

    const postDate = useMemo(() => {
        return formatPostDate(post.metadata.date);
    }, [post.metadata.date]);

    const tags = useMemo(() => {
        return (post.metadata.tags ?? []).map(t => t.trim()).filter(Boolean);
    }, [post.metadata.tags]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="group relative md:pl-20"
        >
            {/* Commit Node */}
            <div className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-400/10 rounded-full scale-[2] animate-pulse" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full scale-[2.5] opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-theme-light dark:bg-theme-dark border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-blue-400 group-hover:bg-blue-400 relative transition-all duration-300 shadow-sm" />
                </div>
            </div>

            <Link href={`/${post.slug}`} className="block relative py-8 px-2 md:px-8 rounded-2xl transition-all duration-500 bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/10 group/card overflow-hidden">
                <article className="relative z-10 flex flex-col gap-4">
                    {/* Meta Row */}
                    <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
                        <div className={clsx(
                            "text-[10px] flex items-center gap-2 text-xs font-black text-blue-400 tracking-[0.2em]",
                            maple.className
                        )}>
                            <Hash size={ 12 } strokeWidth={ 3 }/>
                            <span>{ postHash }</span>
                        </div>
                        <div className={ clsx("text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest flex items-center gap-2 uppercase", maple.className) }>
                            <Calendar size={ 14 } className="opacity-80"/>
                            { postDate }
                        </div>
                        { post.metadata.address && (
                            <div className={ clsx("text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest flex items-center gap-2 uppercase", maple.className) }>
                                <MapPin size={ 14 } className="opacity-80"/>
                                { post.metadata.address }
                            </div>
                        ) }
                    </div>

                    {/* Title & Summary */}
                    <div className="space-y-3">
                        <h3 className={clsx(
                            "text-xl md:text-[26px] font-bold tracking-tight text-neutral-800 dark:text-zinc-100 leading-snug group-hover/card:translate-x-1 transition-transform duration-500",
                            nunito.className
                        )}>
                            {post.metadata.title}
                        </h3>
                        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 text-[14px] leading-relaxed line-clamp-2 italic opacity-80 group-hover/card:opacity-100 transition-opacity">
                            { post.metadata.summary || "Ta很懒 简介都不写." }
                        </p>
                    </div>

                    {/* Tags Row - Moved below summary with divider */}
                    {tags.length ? (
                        <div className="flex items-center gap-3 pt-5 border-t border-dashed border-zinc-100 dark:border-zinc-800/60">
                            {tags.map(tag => (
                                <span key={tag} className={clsx(
                                    "text-xs font-bold text-zinc-400 dark:text-zinc-600 lowercase tracking-tight transition-colors group-hover/card:text-blue-400/60",
                                    maple.className
                                )}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </article>

                {/* Subtle File Icon Decor - More Integrated Background */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-[0.03] transition-opacity duration-1000 -rotate-12 transform-gpu">
                    <GitBranch size={160} strokeWidth={0.5} className="text-blue-500" />
                </div>
            </Link>
        </motion.div>
    );
};

const TagWidget = ({
    allTags,
    selectedTag,
    setSelectedTag,
    showAllTags,
    setShowAllTags
}: {
    allTags: [string, number][];
    selectedTag: string | null;
    setSelectedTag: SetState<string | null>;
    showAllTags: boolean;
    setShowAllTags: SetState<boolean>;
}) => {
    return (
        <div className="bg-zinc-50/30 dark:bg-[#050505]/40 border border-zinc-200/50 dark:border-white/5 p-6 rounded-3xl space-y-6 relative overflow-hidden group/widget">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-orange-400/10 flex items-center justify-center border border-orange-400/10">
                        <TagIcon size={12} className="text-orange-400 rotate-90" />
                    </div>
                    <h4 className={clsx("text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100", nunito.className)}>
                        Cluster Tags
                    </h4>
                </div>
                <div className="flex gap-3 items-center">
                    {allTags.length > 12 && (
                        <button
                            onClick={() => setShowAllTags(!showAllTags)}
                            className={clsx("text-[10px] font-bold text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-widest", nunito.className)}
                        >
                            {showAllTags ? 'collapse' : 'expand'}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {(showAllTags ? allTags : allTags.slice(0, 12)).map(([tag]) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={clsx(
                            "px-3.5 py-1.5 text-xs font-bold transition-all duration-300 rounded-lg border",
                            selectedTag === tag
                                ? "bg-blue-400 border-blue-400 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-blue-400/30 hover:text-blue-400",
                            nunito.className
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

const YearWidget = ({
    allYears,
    selectedYear,
    setSelectedYear,
    showAllYears,
    setShowAllYears
}: {
    allYears: string[];
    selectedYear: string | null;
    setSelectedYear: SetState<string | null>;
    showAllYears: boolean;
    setShowAllYears: SetState<boolean>;
}) => {
    return (
        <div className="bg-zinc-50/30 dark:bg-[#050505]/40 border border-zinc-200/50 dark:border-white/5 p-6 rounded-3xl space-y-6 relative overflow-hidden group/widget">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-blue-400/10 flex items-center justify-center border border-blue-400/10">
                        <Calendar size={12} className="text-blue-400" />
                    </div>
                    <h4 className={clsx("text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100", nunito.className)}>
                        Time Machine
                    </h4>
                </div>
                <div className="flex gap-3 items-center relative z-10">
                    {allYears.length > 6 && (
                        <button
                            onClick={() => setShowAllYears(!showAllYears)}
                            className={clsx("text-[10px] font-bold text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-widest", nunito.className)}
                        >
                            {showAllYears ? 'collapse' : 'expand'}
                        </button>
                    )}
                    {selectedYear && (
                        <button
                            onClick={() => setSelectedYear(null)}
                            className={clsx("text-[10px] font-bold text-blue-400 hover:underline uppercase tracking-wider", nunito.className)}
                        >
                            clear
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {(showAllYears ? allYears : allYears.slice(0, 9)).map(year => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                        className={clsx(
                            "px-3 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl border flex items-center justify-center gap-2 relative overflow-hidden",
                            selectedYear === year
                                ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-blue-400/30 hover:bg-blue-500/2",
                            nunito.className
                        )}
                    >
                        <span className="tracking-tight">{year}</span>
                        {selectedYear === year && (
                            <motion.div
                                layoutId="activeYearDot"
                                className="w-1 h-1 rounded-full bg-white animate-pulse"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FetchMoreButton = ({
    onClick,
    displayLimit,
    totalFiltered
}: {
    onClick: () => void;
    displayLimit: number;
    totalFiltered: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex justify-center md:justify-start md:ml-20 px-4 md:px-0"
        >
            <button
                onClick={onClick}
                className="group relative flex items-center transition-all duration-500"
            >
                {/* Timeline Integration Node */}
                <div className="absolute -left-12.5 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-theme-light dark:bg-theme-dark border-2 border-zinc-200 dark:border-zinc-800/80 group-hover:border-blue-400 group-hover:bg-blue-400 group-active:scale-90 transition-all duration-500 shadow-sm" />
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full scale-[2.5] opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
                    </div>
                </div>

                {/* Simplified Button Content */}
                <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800/80 hover:border-blue-400/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20 transition-all duration-500">
                    <span className={clsx(
                        "text-xs font-black uppercase tracking-[0.6em] text-zinc-400 group-hover:text-blue-500 transition-colors pl-1",
                        maple.className
                    )}>
                        More
                    </span>
                    <span className="w-px h-3 bg-zinc-200 dark:bg-zinc-800/80 group-hover:bg-blue-300/30 transition-colors" />
                    <span className={clsx(
                        "text-[10px] font-bold text-zinc-300 dark:text-zinc-600 group-hover:text-blue-400/60 transition-colors",
                        nunito.className
                    )}>
                        {totalFiltered - displayLimit}
                    </span>
                </div>
            </button>
        </motion.div>
    );
};
