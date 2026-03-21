'use client'

// 文章根布局
import { Clock, MapPin } from "lucide-react";
import { Metadata } from "next";
import BackTop from "@/components/ui/backtop";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tag } from "@/components/mdx/tag";
import { Catalog } from "@/components/mdx/catalog";
import { clsx } from "clsx";
import Image, { ImageProps } from "next/image";
import { maple } from "@/lib/font";
import { extractText } from "@/lib/shiki";

/**
 * 布局组件
 */
export interface ArticleMeta extends Metadata {
    title: string;
    date: string;
    tags?: Array<string>;
    cover?: string;
    address?: string;
    summary?: string;
}


export const ArticleLayout = ({ children, meta }: { children: React.ReactNode, meta: ArticleMeta }) => {
    const [renderCatalog, setRenderCatalog] = useState<boolean>(false)
    useEffect(() => {
        // 等待 DOM 渲染完成后执行
        const headers = document.querySelectorAll('.v-content h1, h2, h3, h4');
        setRenderCatalog(headers.length > 0);
    }, [children]); // 当 children 变化时重新检测 (或者依赖 meta.title/pathname)

    return (
        <article className={ clsx("w-full max-w-6xl mx-auto px-4 py-12 sm:py-16 font-sans antialiased text-zinc-800 dark:text-zinc-200", maple.className) }>
            <div className="v-title mb-10 text-center">
                <h1 className={ clsx("text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-zinc-700 dark:text-zinc-100 wrap-break-word") }>
                    { meta.title }
                </h1>
                <div className="flex flex-row justify-center items-center gap-2 text-zinc-500">
                    <Clock size={ 14 }/>
                    <span className="text-sm font-normal">{ new Date(meta.date).toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric'
                    }) }</span>
                    { meta.address && (
                        <>
                            <DotSeparator/>
                            <MapPin size={ 14 }/>
                            <span className="text-sm">{ meta.address }</span>
                        </>
                    ) }
                </div>
                { meta.tags && (
                    <div className="mt-4 flex gap-2 justify-center">
                        { meta.tags.map(tag => (
                            <Tag size={ 'sm' } variant={ "default" } key={ tag } children={ tag }/>
                        )) }
                    </div>
                ) }
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-0 sm:gap-8">
                <div className={ clsx("v-content w-full overflow-x-auto", renderCatalog && "sm:w-9/12") }>
                    { children }
                </div>
                { renderCatalog && (
                    <div className="sticky top-40 v-catalog w-3/12 max-w-xs px-2 py-4 bg-theme-light dark:bg-theme-dark sm:block hidden">
                        <Catalog/>
                    </div>
                ) }
            </div>
            <BackTop/>
        </article>
    )
};


// 竖线分隔
export const LineDivider = () => (
    <span className="inline-block w-px h-2.5 bg-neutral-300 dark:bg-neutral-700 mx-2"></span>
)

// 点分隔
export const DotSeparator = () => (
    <span className="text-zinc-400 dark:text-zinc-700">·</span>
)

export const Line = () => {
    return (
        <hr className="my-12 border-0 h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"/>
    )
}

export const EoFLine = () => {
    return (
        <div className="group my-16 flex items-center gap-4">
            <div className="h-px grow bg-zinc-200 transition-all group-hover:bg-indigo-400 dark:bg-zinc-800"/>
            <div className="font-mono text-[10px] font-bold tracking-widest text-zinc-300 transition-colors group-hover:text-indigo-500">
                EOF
            </div>
            <div className="h-px grow bg-zinc-200 transition-all group-hover:bg-indigo-400 dark:bg-zinc-800"/>
        </div>
    );
};

// 一级标题：自动带锚点 ID，方便做目录
export const H1 = ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchorId = id || extractText(children).toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').replace(/\s+/g, '-');
    return (
        <h1 id={ anchorId } className="group text-3xl font-bold mt-12 mb-6 flex items-center scroll-mt-24 cursor-pointer gap-2">
            <span className="text-blue-500 group-hover:opacity-70 font-extrabold">#&nbsp;</span>
            { children }
        </h1>
    );
};

// 二级标题：自动带锚点 ID，方便做目录
export const H2 = ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchorId = id || extractText(children).toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').replace(/\s+/g, '-');
    return (
        <h2 id={ anchorId } className="group text-2xl font-bold mt-12 mb-6 flex items-center scroll-mt-24 cursor-pointer gap-2">
            <span className="text-blue-500 group-hover:opacity-70 font-extrabold">#&nbsp;</span>
            { children }
        </h2>
    );
};

// 三级标题
export const H3 = ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchorId = id || extractText(children).toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').replace(/\s+/g, '-');
    return (
        <h3 id={ anchorId } className="text-xl font-semibold mt-8 mb-4 flex items-center scroll-mt-24 cursor-pointer gap-2">
            <span className="text-blue-500 group-hover:opacity-70 font-extrabold">#&nbsp;</span>
            { children }
        </h3>
    )
};

// 四级标题
export const H4 = ({ children, id }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const anchorId = id || extractText(children).toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').replace(/\s+/g, '-');
    return (
        <h4 id={ anchorId } className="text-lg font-medium mt-8 mb-4 flex items-center scroll-mt-24 cursor-pointer gap-2">
            <span className="text-blue-500 group-hover:opacity-70 font-extrabold">#&nbsp;</span>
            { children }
        </h4>
    )
};

// 段落
export const P = ({ children }: { children: React.ReactNode }) => (
    <p className={ clsx("my-6 text-base leading-7 text-zinc-700 dark:text-zinc-300 wrap-break-word") }>
        { children }
    </p>
);

// 加粗
export const B = ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-zinc-900 dark:text-zinc-100 mx-1">
        { children }
    </strong>
)

// 斜体
export const Italic = ({ children }: { children: React.ReactNode }) => (
    <i className="italic text-zinc-800 font-medium dark:text-zinc-200">
        { children }
    </i>
)

// 下划线
export const Underline = ({ children }: { children: React.ReactNode }) => (
    <span className="underline underline-offset-4 decoration-zinc-400 dark:decoration-zinc-500">
        { children }
    </span>
)

// 删除线
export const DeleteLine = ({ children }: { children: React.ReactNode }) => (
    <del className="line-through text-zinc-500 dark:text-zinc-400">
        { children }
    </del>
)

// 链接
export const A = ({ children, href }: { children: React.ReactNode, href: string }) => {
    const className = "underline text-blue-500 font-medium hover:underline underline-offset-4 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors";
    const isExternal = href.startsWith('http') || href.startsWith('mailto');
    return isExternal
        ? <a href={ href } className={ className } target="_blank" rel="noopener noreferrer">{ children }</a>
        : <Link href={ href } className={ className }>{ children }</Link>
};


export const EM = ({ children }: { children: React.ReactNode }) => (
    <em className="italic font-serif pr-1">{ children }</em>
);


// 引用块
export const Blockquote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="pl-6 py-px border-l-4 border-zinc-300 dark:border-zinc-700 italic text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
        { children }
    </blockquote>
)

export const Ul = ({ children }: { children: React.ReactNode }) => (
    <ul className="my-6 ml-2 list-disc list-inside marker:text-zinc-500 space-y-2 text-zinc-700 dark:text-zinc-300">
        { children }
    </ul>
);

export const Ol = ({ children }: { children: React.ReactNode }) => (
    <ol className="my-6 ml-2 list-decimal list-inside marker:text-zinc-500 space-y-2 text-zinc-700 dark:text-zinc-300">
        { children }
    </ol>
);

// 3. 列表项 (List Item)
export const Li = ({ children }: { children: React.ReactNode }) => (
    <li className="my-2 pl-1 leading-7">
        { children }
    </li>
);


// 强调列表
export const List = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-700 dark:text-zinc-300">
        { items.map((item, i) => <li key={ i }>{ item }</li>) }
    </ul>
);

// 图片 - 必须带有 figcaption
export const Figure = ({ src, alt, caption, ...props }: ImageProps & { caption?: string }) => (
    <figure className="my-10 group">
        <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100">
            <Image
                src={ src }
                alt={ alt }
                width={ 1200 }
                height={ 630 }
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                { ...props }
            />
        </div>
        { caption && (
            <figcaption className="mt-6 text-center text-sm text-zinc-500 italic">
                { caption }
            </figcaption>
        ) }
    </figure>
);