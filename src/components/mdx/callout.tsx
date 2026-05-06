// 标注框
import { Ban, CircleCheckBig, Info, MessageSquareWarning } from "lucide-react";
import React from "react";
import { clsx } from "clsx";

export interface CalloutProps {
    type: 'info' | 'warn' | 'danger' | 'success';
    title?: string;
    children: React.ReactNode;
}

const CALLOUT_CONFIG = {
    success: {
        icon: CircleCheckBig,
        container: "bg-emerald-50/80 border-emerald-200/50 dark:bg-emerald-950/50 dark:border-emerald-800/50",
        iconStyle: "text-emerald-500 dark:text-emerald-400",
        titleStyle: "text-emerald-800 dark:text-emerald-200",
        bodyStyle: "text-emerald-700/80 dark:text-emerald-300/70",
    },
    info: {
        icon: Info,
        container: "bg-blue-50/80 border-blue-200/50 dark:bg-blue-950/50 dark:border-blue-800/50",
        iconStyle: "text-blue-500 dark:text-blue-400",
        titleStyle: "text-blue-800 dark:text-blue-200",
        bodyStyle: "text-blue-700/80 dark:text-blue-300/70",
    },
    warn: {
        icon: MessageSquareWarning,
        container: "bg-amber-50/80 border-amber-200/50 dark:bg-amber-950/50 dark:border-amber-800/50",
        iconStyle: "text-amber-500 dark:text-amber-400",
        titleStyle: "text-amber-800 dark:text-amber-200",
        bodyStyle: "text-amber-700/80 dark:text-amber-300/70",
    },
    danger: {
        icon: Ban,
        container: "bg-rose-50/80 border-rose-200/50 dark:bg-rose-950/50 dark:border-rose-800/50",
        iconStyle: "text-rose-500 dark:text-rose-400",
        titleStyle: "text-rose-800 dark:text-rose-200",
        bodyStyle: "text-rose-700/80 dark:text-rose-300/70",
    }
} as const;

export const Callout = ({ title, type = 'info', children }: CalloutProps) => {
    const config = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.info;
    const Icon = config.icon;

    return (
        <div className={ clsx("my-6 flex gap-3 rounded-xl border p-4", config.container) }>
            <div className={clsx("shrink-0 mt-0.5", config.iconStyle)}>
                <Icon size={ 18 }/>
            </div>

            <div className="min-w-0 flex-1">
                {title && (
                    <div className={ clsx("font-semibold text-md mb-1", config.titleStyle) }>
                        {title}
                    </div>
                )}
                <div className={ clsx(
                    "[&>p]:text-sm leading-7 [&>p]:m-0 [&>p]:text-inherit [&>p]:leading-[inherit]",
                    config.bodyStyle
                ) }>
                    { children }
                </div>
            </div>
        </div>
    );
};
