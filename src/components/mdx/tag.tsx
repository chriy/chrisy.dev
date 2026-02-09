'use client';

import React from "react";
import { clsx } from "clsx";

export type TagVariant = 'default'|'success'|'info'|'warn'|'danger';
export type TagSize = 'sm'|'md'|'lg';

interface TagProps {
    children: React.ReactNode;
    variant?: TagVariant;   // 颜色变体
    size?: TagSize;         // 尺寸
    icon?: React.ElementType; // 左侧图标组件
    dot?: boolean;          // 是否显示状态小圆点
    onClick?: (e: React.MouseEvent) => void; // 点击回调
    className?: string;
}

const Variants = {
    default: {
        container: 'bg-zinc-500/5 border-zinc-500/15 text-zinc-600 dark:bg-zinc-400/10 dark:border-zinc-400/20 dark:text-zinc-300',
        dot: 'bg-zinc-400',
        icon: 'text-zinc-500 dark:text-zinc-400',
    },
    success: {
        container: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:bg-emerald-400/15 dark:border-emerald-400/25 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        icon: 'text-emerald-500',
    },
    info: {
        container: 'bg-sky-500/10 border-sky-500/20 text-sky-600 dark:bg-sky-400/15 dark:border-sky-400/25 dark:text-sky-400',
        dot: 'bg-sky-500',
        icon: 'text-sky-500',
    },
    warn: {
        container: 'bg-amber-500/10 border-amber-500/25 text-amber-600 dark:bg-amber-400/15 dark:border-amber-400/30 dark:text-amber-400',
        dot: 'bg-amber-500',
        icon: 'text-amber-500',
    },
    danger: {
        container: 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:bg-rose-400/15 dark:border-rose-400/30 dark:text-rose-400',
        dot: 'bg-rose-500',
        icon: 'text-rose-500',
    },
};

const Sizes = {
    sm: "px-2 py-0.5 text-xs h-5", // 极简
    md: "px-2.5 py-1 text-sm h-7", // 常规
    lg: "px-3 py-1.5 text-base h-8" // 标题或大展示用
};

export const Tag = (
    {
        children,
        variant = 'default',
        size = 'md',
        icon: Icon,
        dot = false,
        onClick,
        className = ""
    }: TagProps) => {

    const styles = Variants[variant];
    const sizeStyles = Sizes[size];

    // 如果传入了 onClick，则变成可点击样式 (cursor-pointer)
    const interactiveStyles = onClick ? "cursor-pointer hover:opacity-80 active:scale-95 transition-all" : "cursor-default";

    return (
        <span
            onClick={onClick}
            className={clsx("inline-flex items-center gap-1.5 my-1.5 rounded-md border font-medium whitespace-nowrap", styles.container, sizeStyles, interactiveStyles, className)}
        >
            {/* 1. 状态小圆点模式 */}
            {dot && (
                <span className={clsx("w-1.5 h-1.5 rounded-full", styles.dot)}/>
            )}

            {/* 2. 自定义图标模式 */}
            {Icon && (
                <Icon size={size === 'sm' ? 12 : 14} className={styles.icon}/>
            )}

            {/* 3. 文字内容 */}
            <span>{children}</span>
        </span>
    );
};