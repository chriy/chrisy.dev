'use client'

import React, { useCallback, useEffect, useState } from "react";
import { Check, Copy, WrapText } from "lucide-react";
import { clsx } from "clsx";
import { maple } from "@/lib/font";
import { detectLang, extractText, highlight, LANG_ALIAS, LANG_LABELS } from "@/lib/shiki";

// inline code
export const Code = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <code
            { ...props }
            className={ clsx(
                "bg-zinc-100 dark:bg-zinc-800/50 text-indigo-600 dark:text-indigo-400 rounded-md px-1.5 py-0.5 text-[0.95em] border border-zinc-200 dark:border-zinc-700 mx-0.5 font-medium",
                maple.className,
                props.className
            ) }
        >
            { children }
        </code>
    );
};

const MacDots = () => (
    <div className="flex gap-1.5 opacity-60">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"/>
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60"/>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"/>
    </div>
);

const ActionButtons = ({ isWrap, onToggleWrap, rawCode }: {
    isWrap: boolean;
    onToggleWrap: () => void;
    rawCode: string;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [rawCode]);

    return (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={ onToggleWrap }
                className={ clsx(
                    "rounded-md p-1.5 text-xs transition-all active:scale-90 border",
                    isWrap
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                        : "bg-white/5 border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
                ) }
                title="Toggle line wrap"
            >
                <WrapText size={ 14 }/>
            </button>
            <button
                onClick={ handleCopy }
                className="rounded-md px-2.5 py-1 text-xs bg-white/5 border border-transparent hover:border-white/10 text-zinc-500 hover:text-zinc-300 transition-all active:scale-90 flex items-center gap-1.5"
            >
                { copied ? (
                    <>
                        <Check size={ 13 } className="text-green-400"/>
                        <span className={ clsx("text-green-400 font-medium text-[10px]", maple.className) }>COPIED</span>
                    </>
                ) : (
                    <>
                        <Copy size={ 13 }/>
                        <span className={ clsx("font-medium text-[10px]", maple.className) }>COPY</span>
                    </>
                ) }
            </button>
        </div>
    );
};

export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
    const rawCode = extractText(children).replace(/\n+$/, '');
    const lang = detectLang(children);
    const resolvedLang = LANG_ALIAS[ lang ] ?? lang;
    const langLabel = LANG_LABELS[ resolvedLang ] ?? resolvedLang;

    const [nodes, setNodes] = useState<React.ReactNode>(null);
    const [isWrap, setIsWrap] = useState(false);

    useEffect(() => {
        if (!rawCode) return;
        highlight(rawCode, lang).then(setNodes);
    }, [rawCode, lang]);

    return (
        <div className={ clsx(
            "shiki-renderer group my-10 overflow-hidden rounded-xl border bg-[#1e1e2e] dark:bg-[#09090b] border-zinc-300 dark:border-white/10",
            isWrap && "shiki-wrap"
        ) }>
            {/* Header Bar */ }
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/4 bg-transparent backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <MacDots/>
                    <span className={ clsx(
                        "text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400/80 ml-2",
                        maple.className
                    ) }>
                        { langLabel }
                    </span>
                </div>

                <ActionButtons
                    isWrap={ isWrap }
                    onToggleWrap={ () => setIsWrap(w => !w) }
                    rawCode={ rawCode }
                />
            </div>

            {/* Code Content */ }
            <div className={ clsx("relative overflow-hidden pr-6", maple.className) }>
                <div className="overflow-x-auto no-scrollbar py-1">
                    { nodes ?? (
                        <pre className="m-0 px-6 py-5 text-sm leading-relaxed text-[#5c6370] opacity-50">
                            <code>{ rawCode }</code>
                        </pre>
                    ) }
                </div>
            </div>
        </div>
    );
};
