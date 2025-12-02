import React from "react";

interface SubjectProps {
    prefix?: string
    highlight: string
    highlightClass: string
    children: React.ReactNode
}

// home page section header
export default function SectionHeader({ prefix, highlight, highlightClass, children }: SubjectProps) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {prefix}
                <span className={highlightClass || "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}>{highlight}</span>
            </h1>
            <div className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {children}
            </div>
        </div>
    )
}