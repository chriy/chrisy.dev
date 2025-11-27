'use client'

// 定义文章接口
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface PostProps {
    title: string;
    summary: string;
    tag: string;
    date: string;
    readTime: string;
    color: string; // 例如 "text-blue-500" 或 hex 值，这里我们稍微改一下用法，传入颜色类名
    gradient: string; // 背景光晕颜色
}

const MiniPostCard = ({ post, index }: {post: PostProps, index: number}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Link href="/" className="block h-full group relative">
                <div className={`
                    h-full flex flex-col p-6 bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 rounded-3xl transition-all duration-300 relative overflow-hidden group-hover:shadow-xl
                    /* 核心修改：Hover 时，边框颜色变成文章对应的主题色 */
                    ${post.color.replace('text-', 'group-hover:border-').replace('500', '300')}
                `}>

                    {/*
                        核心修改 1: 背景纹理 (Dot Pattern)
                        增加 subtle 的科技感，不喧宾夺主
                    */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"/>

                    {/*
                        核心修改 2: 动态光晕
                        Hover 时，光晕稍微变大并移动，营造“呼吸感”
                    */}
                    <div className={`
                        absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-all duration-500 ease-out
                        bg-gradient-to-br ${post.gradient}
                        group-hover:scale-150
                    `}></div>

                    {/* 顶部：标签 (模拟文件路径风格) */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-2">
                            {/* 图标容器 */}
                            <div className={`p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 ${post.color}`}>
                                <Hash className="w-4 h-4"/>
                            </div>
                            <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                {post.tag}
                            </span>
                        </div>

                        {/* 箭头：Hover 时变色并位移 */}
                        <ArrowRight className={`w-5 h-5 text-neutral-300 transition-all duration-300 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1`}/>
                    </div>

                    {/* 内容区域 */}
                    <div className="flex-1 relative z-10 py-2">
                        {/*group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-900 group-hover:to-neutral-600*/}
                        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-300 leading-tight mb-3 group-hover:text-blue-500 group-hover:dark:text-white transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
                            {post.summary}
                        </p>
                    </div>

                    {/* 底部元数据：极简风格 */}
                    <div className="flex items-center gap-4 pt-6 mt-auto relative z-10 opacity-80 group-hover:opacity-100 transition-opacity border-t border-neutral-100 dark:border-neutral-800/50">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                            <Calendar className="w-3.5 h-3.5"/>
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                            <Clock className="w-3.5 h-3.5"/>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function LatestPost() {
    const posts = [
        {
            title: "Try Dev Container",
            summary: "Setting up a consistent development environment using Docker and VS Code Dev Containers.",
            tag: "DevOps",
            date: "Nov 20", // 缩短日期显示
            readTime: "5 min",
            // 使用 text class 方便控制图标颜色，使用 gradient class 控制背景光晕
            color: "text-blue-500",
            gradient: "from-blue-500 to-cyan-400"
        },
        {
            title: "Nginx负载均衡的一致性Hash路由方案详解",
            summary: "Deep dive into consistent hashing algorithms and how to implement them in Nginx.",
            tag: "Nginx",
            date: "Nov 18",
            readTime: "8 min",
            color: "text-emerald-500",
            gradient: "from-emerald-500 to-teal-400"
        },
        {
            title: "MNIST Handwritten Digit Recognition",
            summary: "Building a simple neural network to recognize handwritten digits from scratch.",
            tag: "AI/ML",
            date: "Nov 15",
            readTime: "12 min",
            color: "text-orange-500",
            gradient: "from-orange-500 to-amber-400"
        },
        {
            title: "React useState vs useEffect Hooks",
            summary: "Understanding the lifecycle of React components and when to use which hook effectively.",
            tag: "React",
            date: "Nov 10",
            readTime: "6 min",
            color: "text-purple-500",
            gradient: "from-purple-500 to-pink-400"
        }
    ];

    return (
        <section className="py-0"> {/* 这里背景微微灰一点，区分 header */}
            <div className="">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                            {/*font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff705b] to-[#ffb457] ml-2*/}
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff705b] to-[#ffb457]">Posts</span>
                        </h2>
                        <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl font-light">
                            Exploring code, architecture, and the digital world.
                        </p>
                    </div>

                    <Link href="/posts" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        View Posts <span>&rarr;</span>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post, index) => (
                        <MiniPostCard key={index} post={post as PostProps} index={index}/>
                    ))}
                </div>

                <div className="mt-10 md:hidden flex justify-center">
                    <Link href="/posts" className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm shadow-xl shadow-neutral-200/50">
                        View Archive
                    </Link>
                </div>
            </div>
        </section>
    )
}