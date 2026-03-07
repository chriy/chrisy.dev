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
        container: "bg-green-50 border-green-200 text-green-900 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-200",
        iconStyle: "text-green-600 dark:text-green-400 mt-0.5",
    },
    info: {
        icon: Info,
        container: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-200",
        iconStyle: "text-blue-600 dark:text-blue-400 mt-0.5",
    },
    warn: {
        icon: MessageSquareWarning,
        container: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-200",
        iconStyle: "text-amber-600 dark:text-amber-400 mt-0.5",
    },
    danger: {
        icon: Ban,
        container: "bg-red-50 border-red-200 text-red-900 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-200",
        iconStyle: "text-red-600 dark:text-red-400 mt-0.5",
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