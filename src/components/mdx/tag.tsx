'use client';

import React from "react";
import { clsx } from "clsx";

export type TagVariant = 'default' | 'success' | 'info' | 'warn' | 'danger';
export type TagSize = 'sm' | 'md' | 'lg';

interface TagProps {
    children: React.ReactNode;
    variant?: TagVariant;   // 颜色变体
    size?: TagSize;         // 尺寸
    icon?: React.ElementType; // 左侧图标组件
    dot?: boolean;          // 是否显示状态小圆点
    onClick?: (e: React.MouseEvent) => void; // 点击回调
    className?: string;
}

const TAG_CONFIG = {
    default: {
        container: 'bg-zinc-50/80 border-zinc-200/50 text-zinc-600 dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-200 backdrop-blur-sm',
        dot: 'bg-zinc-400 dark:bg-zinc-500',
        icon: 'text-zinc-500 dark:text-zinc-400',
    },
    success: {
        container: 'bg-emerald-50/80 border-emerald-200/50 text-emerald-600 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-200 backdrop-blur-sm',
        dot: 'bg-emerald-500 dark:bg-emerald-400',
        icon: 'text-emerald-500 dark:text-emerald-400',
    },
    info: {
        container: 'bg-blue-50/80 border-blue-200/50 text-blue-600 dark:bg-blue-950/50 dark:border-blue-800/50 dark:text-blue-200 backdrop-blur-sm',
        dot: 'bg-blue-500 dark:bg-blue-400',
        icon: 'text-blue-500 dark:text-blue-400',
    },
    warn: {
        container: 'bg-amber-50/80 border-amber-200/50 text-amber-600 dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-200 backdrop-blur-sm',
        dot: 'bg-amber-500 dark:bg-amber-400',
        icon: 'text-amber-500 dark:text-amber-400',
    },
    danger: {
        container: 'bg-rose-50/80 border-rose-200/50 text-rose-600 dark:bg-rose-950/50 dark:border-rose-800/50 dark:text-rose-200 backdrop-blur-sm',
        dot: 'bg-rose-500 dark:bg-rose-400',
        icon: 'text-rose-500 dark:text-rose-400',
    },
} as const;

const SIZES = {
    sm: "px-2 py-0.5 text-[0.7rem] h-5", // 极简
    md: "px-2.5 py-1 text-sm h-7", // 常规
    lg: "px-3 py-1.5 text-base h-8" // 标题或大展示用
} as const;

export const Tag = ({
    children,
    variant = 'default',
    size = 'md',
    icon: Icon,
    dot = false,
    onClick,
    className = ""
}: TagProps) => {
    const config = TAG_CONFIG[variant] || TAG_CONFIG.default;
    const sizeStyles = SIZES[size] || SIZES.md;

    // 如果传入了 onClick，则变成可点击样式 (cursor-pointer)
    const interactiveStyles = onClick ? "cursor-pointer hover:opacity-80 active:scale-95 transition-all" : "cursor-default";

    return (
        <span
            onClick={onClick}
            className={clsx("inline-flex items-center justify-center gap-1.5 my-1.5 rounded-md border font-medium whitespace-nowrap", config.container, sizeStyles, interactiveStyles, className)}
        >
            {/* 1. 状态小圆点模式 */}
            {dot && (
                <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
            )}

            {/* 2. 自定义图标模式 */}
            {Icon && (
                <Icon size={size === 'sm' ? 12 : 14} className={clsx("shrink-0", config.icon)} />
            )}

            {/* 3. 文字内容 */}
            <span>{children}</span>
        </span>
    );
};