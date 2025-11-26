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


// 'use client'
//
// import Link from "next/link";
// import { motion } from "framer-motion";
//
// // 定义文章接口
// interface PostProps {
//     title: string;
//     summary: string;
//     tag: string;
//     date: string;
//     readTime: string;
//     color: string; // 用于定义卡片的强调色
// }
//
// const MiniPostCard = ({ post }: {post: PostProps}) => {
//     return (
//         <motion.div
//             whileHover={{ y: -5 }}
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className="h-full"
//         >
//             <Link href="/" className="block h-full group">
//                 <div className={`
//                     h-full flex flex-col p-6
//                     bg-white dark:bg-neutral-900
//                     border border-zinc-200 dark:border-neutral-800
//                     rounded-xl
//                     hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700
//                     transition-all duration-300 relative overflow-hidden
//                 `}>
//                     {/* 装饰：顶部的一个柔和渐变光晕，替代图片的色彩作用 */}
//                     <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${post.color} opacity-10 blur-2xl rounded-full -mr-10 -mt-10 transition-opacity group-hover:opacity-20`}></div>
//
//                     {/* 顶部元数据：日期与标签 */}
//                     <div className="flex items-center justify-between mb-4 relative z-10">
//                         <div className="flex items-center gap-2">
//                             {/* 标签做成类似代码徽章的样子 */}
//                             <span className={`
//                                 px-2 py-1 rounded-md text-xs font-mono font-semibold tracking-tight
//                                 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400
//                                 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors
//                             `}>
//                                 #{post.tag}
//                             </span>
//                         </div>
//                         <span className="text-xs font-mono text-neutral-400">
//                             {post.date}
//                         </span>
//                     </div>
//
//                     {/* 标题区域 */}
//                     <div className="mb-3 relative z-10 flex-1">
//                         <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                             {post.title}
//                         </h3>
//                     </div>
//
//                     {/* 摘要 (可选，如果不需要摘要可以去掉这个 div) */}
//                     <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-6 leading-relaxed">
//                         {post.summary}
//                     </p>
//
//                     {/* 底部：阅读时间 + 箭头 */}
//                     <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-auto relative z-10">
//                         <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                             {post.readTime}
//                         </span>
//
//                         <span className="text-xs text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                            Read Post &rarr;
//                         </span>
//                     </div>
//                 </div>
//             </Link>
//         </motion.div>
//     )
// }
//
// export default function LatestPosts() {
//     // 模拟数据，增加了 summary 和 color 字段
//     const posts: PostProps[] = [
//         {
//             title: "Try Dev Container",
//             summary: "Setting up a consistent development environment using Docker and VS Code Dev Containers.",
//             tag: "DevOps",
//             date: "Nov 20, 2025",
//             readTime: "5 min read",
//             color: "from-blue-400 to-cyan-300" // 蓝色系
//         },
//         {
//             title: "Nginx负载均衡的一致性Hash路由方案详解",
//             summary: "Deep dive into consistent hashing algorithms and how to implement them in Nginx.",
//             tag: "Nginx",
//             date: "Nov 18, 2025",
//             readTime: "8 min read",
//             color: "from-emerald-400 to-green-300" // 绿色系
//         },
//         {
//             title: "MNIST Handwritten Digit Recognition in PyTorch",
//             summary: "Building a simple neural network to recognize handwritten digits from scratch.",
//             tag: "AI/ML",
//             date: "Nov 15, 2025",
//             readTime: "12 min read",
//             color: "from-orange-400 to-amber-300" // 橙色系
//         },
//         {
//             title: "React useState vs useEffect Hooks",
//             summary: "Understanding the lifecycle of React components and when to use which hook effectively.",
//             tag: "React",
//             date: "Nov 10, 2025",
//             readTime: "6 min read",
//             color: "from-purple-400 to-pink-300" // 紫色系
//         }
//     ];
//
//     return (
//         <section className="py-12 lg:py-2">
//             <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
//                 <div>
//                     <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
//                         {/* 这里用了之前建议的蓝紫渐变，非常 Tech */}
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Latest Posts</span>
//                         {/*<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Latest Posts</span>*/}
//
//                         {/*Latest<span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff705b] to-[#ffb457]"> Posts</span>*/}
//                     </h2>
//                     <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
//                         Exploring code, architecture, and the digital world.
//                     </p>
//                 </div>
//
//                 <Link href="/posts" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
//                     View Archive <span>&rarr;</span>
//                 </Link>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {posts.map((post, index) => (
//                     <MiniPostCard key={index} post={post}/>
//                 ))}
//             </div>
//
//             <div className="mt-8 md:hidden flex justify-center">
//                 <Link href="/posts" className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm shadow-xl shadow-neutral-200/50">
//                     View Archive
//                 </Link>
//             </div>
//         </section>
//     )
// }
// 'use client'
//
// import Link from "next/link";
// import { motion } from "framer-motion";
// import PostCover1 from '@/images/post_cover-1.png'
// import PostCover2 from '@/images/post_cover-5.png'
// import PostCover3 from '@/images/post_cover-3.png'
// import PostCover4 from '@/images/post_cover-4.png'
// import Image, { StaticImageData } from "next/image";
//
// interface CardProps {
//     cover: StaticImageData;
//     tag: Array<string>
//     content: string;
// }
//
// const MiniPostCard = (props: CardProps) => {
//     const date = new Date();
//     // 格式化日期，看起来更专业一点
//     const dateStr = date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//     });
//
//     return (
//         <motion.div
//             whileHover={{ y: -5 }} // 向上浮动效果比缩放 scale 更优雅，不会糊字
//             transition={{ type: "spring", stiffness: 300, damping: 20 }}
//             className="h-full" // 关键：确保容器占满高度
//         >
//             <Link href="/" className="block h-full">
//                 <div className="group flex flex-col h-full bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
//
//                     {/* 图片区域：固定高度 + Object Cover */}
//                     <div className="relative h-48 w-full overflow-hidden">
//                         <Image
//                             src={props.cover}
//                             alt={props.content}
//                             placeholder="blur" // 静态图片自带 blurdata
//                             className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
//                         />
//                         {/* 可选设计：将Tag浮动在图片左上角，节省下方空间 */}
//                         {/*
//                         <div className="absolute top-3 left-3 flex gap-2">
//                              {props.tag.map((tag) => ( ... ))}
//                         </div>
//                         */}
//                     </div>
//
//                     {/* 内容区域：使用 Flex 布局实现底部对齐 */}
//                     <div className="flex flex-col flex-1 p-5">
//
//                         {/* Tags */}
//                         <div className="flex flex-wrap gap-2 mb-3">
//                             {props.tag.map((tag, index) => (
//                                 <span
//                                     key={index}
//                                     className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
//                                 >
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//
//                         {/* Title: flex-1 会占据剩余空间，把底部内容挤下去 */}
//                         <div className="flex-1 mb-4">
//                             <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
//                                 {props.content}
//                             </h2>
//                         </div>
//
//                         {/* Meta Info (Footer) */}
//                         <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-700 pt-4 mt-auto">
//                             <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 font-medium">
//                                 <span>📅 {dateStr}</span>
//                                 <span>•</span>
//                                 <span>5 min read</span>
//                             </div>
//
//                             {/* 将原本的三个点换成更明确的箭头，增加点击诱导 */}
//                             <div className="text-blue-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
//                                     <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Link>
//         </motion.div>
//     )
// }
//
// export default function MiniLatestPost() {
//
//     const posts = [
//         {
//             cover: PostCover1,
//             content: "Try Dev Container",
//             tag: ["Tech"],
//         },
//         {
//             cover: PostCover2,
//             content: "Nginx负载均衡的一致性Hash路由方案详解与实战", // 故意加长测试对齐
//             tag: ["Nginx", "DevOps"]
//         },
//         {
//             cover: PostCover3,
//             content: "MNIST Handwritten Digit Recognition in PyTorch",
//             tag: ["Torch", "Python"],
//         },
//         {
//             cover: PostCover4,
//             content: "React useState vs useEffect Hooks",
//             tag: ["React"]
//         }
//     ];
//
//     return (
//         <article className="">
//             <div className="py-2">
//                 {/* Header 区域优化 */}
//                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
//                     <div>
//                         <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
//                             {/*<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Latest Posts</span>*/}
//                             {/*<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Latest Posts</span>*/}
//                             <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff705b] to-[#ffb457]">Latest</span> Posts
//                         </h2>
//                         <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
//                             Random thoughts on tech, code, and life’s journeys.
//                         </p>
//                     </div>
//
//                     {/* View More 按钮放到右上角更符合桌面端习惯，移动端自动换行 */}
//                     <Link href="/posts" className="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-sm">
//                         View Archive
//                     </Link>
//                 </div>
//
//                 {/* Grid 布局优化：gap-8 让留白更舒服 */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//                     {posts.map((props, index) => (
//                         <MiniPostCard
//                             key={index}
//                             content={props.content}
//                             cover={props.cover}
//                             tag={props.tag}
//                         />
//                     ))}
//                 </div>
//
//                 {/* 移动端显示的按钮 */}
//                 <div className="mt-8 md:hidden flex justify-center">
//                     <Link href="/posts" className="px-6 py-2 rounded-full bg-amber-500 text-white font-medium shadow-sm">
//                         View more posts
//                     </Link>
//                 </div>
//             </div>
//         </article>
//     )
// }