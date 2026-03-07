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
        container: "bg-emerald-50/80 border-emerald-200/50 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800/50 dark:text-emerald-200 backdrop-blur-sm",
        iconStyle: "text-emerald-500",
    },
    info: {
        icon: Info,
        container: "bg-blue-50/80 border-blue-200/50 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800/50 dark:text-blue-200 backdrop-blur-sm",
        iconStyle: "text-blue-500",
    },
    warn: {
        icon: MessageSquareWarning,
        container: "bg-amber-50/80 border-amber-200/50 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800/50 dark:text-amber-200 backdrop-blur-sm",
        iconStyle: "text-amber-500",
    },
    danger: {
        icon: Ban,
        container: "bg-rose-50/80 border-rose-200/50 text-rose-700 dark:bg-rose-950/50 dark:border-rose-800/50 dark:text-rose-200 backdrop-blur-sm",
        iconStyle: "text-rose-500",
    }
} as const;

export const Callout = ({ title, type = 'info', children }: CalloutProps) => {
    const config = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.info;
    const Icon = config.icon;

    return (
        <div className={clsx("my-6 flex gap-3 rounded-lg border p-4", config.container)}>
            <div className={clsx("shrink-0 mt-0.5", config.iconStyle)}>
                <Icon />
            </div>

            <div className="w-full min-w-0 leading-7 flex items-start justify-center flex-col">
                {title && (
                    <div className="font-bold mb-1 flex items-center gap-2">
                        {title}
                    </div>
                )}
                <div className="text-sm opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
};