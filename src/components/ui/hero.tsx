'use client'
import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Target } from "lucide-react";
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import Image from "next/image";
import pin from '../../images/pin.png'
import { LineDivider } from "@/components/mdx/article";

type TerminalLine =
    | { type: "prompt"; command: string }
    | { type: "code"; content: React.ReactNode; segments?: TerminalCodeSegment[]; nowrap?: boolean }
    | { type: "output"; content: string; colorClassName?: string }
    | { type: "error"; content: string }

type TerminalCodeSegment = {
    text: string;
    className?: string;
}

type CommandResult = {
    lines?: string[];
    terminalLines?: TerminalLine[];
    redirectTo?: string;
}

const githubUrl = "https://github.com/chriy";
const bootCommand = "whoami";
const bootStorageKey = "hero-terminal-booted";
const terminalOutputColors = [
    "text-emerald-400",
    "text-sky-400",
    "text-violet-300",
    "text-amber-300",
    "text-rose-300",
    "text-teal-300",
];

const renderCodeSegments = (segments: TerminalCodeSegment[], visibleCharacters?: number) => {
    let remainingCharacters = visibleCharacters ?? segments.reduce((total, segment) => total + segment.text.length, 0);

    return segments.map((segment, index) => {
        const visibleText = segment.text.slice(0, Math.max(0, remainingCharacters));
        remainingCharacters -= segment.text.length;

        if (!visibleText) {
            return null;
        }

        return (
            <span key={ index } className={ clsx("whitespace-pre", segment.className) }>
                { visibleText }
            </span>
        );
    });
};

const getCodeLineLength = (line: TerminalLine) => (
    line.type === "code" && line.segments
        ? line.segments.reduce((total, segment) => total + segment.text.length, 0)
        : 0
);

const createCodeLine = (segments: TerminalCodeSegment[], nowrap = false): TerminalLine => ({
    type: "code",
    nowrap,
    segments,
    content: renderCodeSegments(segments),
});

const profileCodeLines: TerminalLine[] = [
    createCodeLine([
        { text: "const", className: "text-blue-500/90" },
        { text: " Profile", className: "text-zinc-100" },
        { text: " = ", className: "text-zinc-500" },
        { text: "{", className: "text-zinc-500" },
    ]),
    createCodeLine([
        { text: "    name:", className: "text-zinc-400" },
        { text: ' "Chris Yang"', className: "text-emerald-400" },
        { text: ",", className: "text-zinc-500" },
    ], true),
    createCodeLine([
        { text: "    role:", className: "text-zinc-400" },
        { text: ' "Software Engineer"', className: "text-emerald-400" },
        { text: ",", className: "text-zinc-500" },
    ], true),
    createCodeLine([
        { text: "    stack:", className: "text-zinc-400" },
        { text: ' ["Java", "TypeScript", "Node.js"]', className: "text-emerald-400" },
        { text: ",", className: "text-zinc-500" },
    ], true),
    createCodeLine([
        { text: "    passion:", className: "text-zinc-400" },
        { text: ' "Photography (Sony α7M4)"', className: "text-emerald-400" },
    ], true),
    createCodeLine([
        { text: "}", className: "text-zinc-500" },
    ]),
];

const initialTerminalLines: TerminalLine[] = [
    { type: "prompt", command: bootCommand },
    ...profileCodeLines,
];

const menuOutputLines = [
    "╭─ Chrisy's tiny terminal menu",
    "│ whoami  → print the human behind the pixels",
    "│ git    → open the GitHub constellation",
    "│ about   → jump to the about page",
    "│ post    → browse the writing archive",
    "│ hi      → unlock a small easter egg",
    "│ hh      → double-tap h, if you like secret doors",
    "│ clean   → sweep the desk, keep the portrait",
    "╰─ hint: curiosity is a valid command, even when the shell disagrees.",
];

const commandOutput: Record<string, CommandResult> = {
    help: {
        lines: menuOutputLines,
    },
    menu: {
        lines: menuOutputLines,
    },
    whoami: {
        terminalLines: profileCodeLines,
    },
    hi: {
        lines: [
            "✦ secret_found: /chrisy",
            "  [O]  _ ",
            "  [_/\\_(_)  \"If you found this, the site likes you back.\""
        ],
    },
    git: {
        lines: [
            "Opening GitHub orbit...",
            "If the stars align, you will land on Chrisy's profile.",
        ],
        redirectTo: githubUrl,
    },
    about: {
        lines: [
            "Routing to ~/about...",
            "Packing the coffee, lenses, and a few stray thoughts.",
        ],
        redirectTo: "/about",
    },
    post: {
        lines: [
            "Routing to ~/posts...",
            "Opening the archive drawer. Mind the dust, some ideas bite.",
        ],
        redirectTo: "/posts",
    },
    posts: {
        lines: [
            "Routing to ~/posts...",
            "Opening the archive drawer. Mind the dust, some ideas bite.",
        ],
        redirectTo: "/posts",
    },
};

export default function Hero() {
    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
    const [command, setCommand] = useState("");
    const [bootCommandText, setBootCommandText] = useState("");
    const [hasBooted, setHasBooted] = useState(false);
    const [typedLine, setTypedLine] = useState("");
    const [typedCodeLine, setTypedCodeLine] = useState<{ line: TerminalLine; visibleCharacters: number } | null>(null);
    const [pendingLines, setPendingLines] = useState<string[]>([]);
    const [pendingTerminalLines, setPendingTerminalLines] = useState<TerminalLine[]>([]);
    const [redirectTo, setRedirectTo] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const lastHKeyAtRef = useRef(0);
    const currentOutputColorRef = useRef(terminalOutputColors[ 0 ]);

    const isTyping = pendingLines.length > 0 || pendingTerminalLines.length > 0;

    useEffect(() => {
        if (hasBooted) {
            return;
        }

        if (window.sessionStorage.getItem(bootStorageKey)) {
            setTerminalLines(initialTerminalLines);
            setHasBooted(true);
            return;
        }

        if (bootCommandText.length < bootCommand.length) {
            const timeout = window.setTimeout(() => {
                setBootCommandText(bootCommand.slice(0, bootCommandText.length + 1));
            }, 90);

            return () => window.clearTimeout(timeout);
        }

        const timeout = window.setTimeout(() => {
            window.sessionStorage.setItem(bootStorageKey, "true");
            setTerminalLines([{ type: "prompt", command: bootCommand }]);
            setPendingTerminalLines(profileCodeLines);
            setHasBooted(true);
        }, 350);

        return () => window.clearTimeout(timeout);
    }, [bootCommandText, hasBooted]);

    useEffect(() => {
        if (pendingTerminalLines.length === 0) {
            return;
        }

        const [currentLine, ...restLines] = pendingTerminalLines;

        if (currentLine.type === "code" && currentLine.segments) {
            const codeLineLength = getCodeLineLength(currentLine);
            const visibleCharacters = typedCodeLine?.line === currentLine ? typedCodeLine.visibleCharacters : 0;

            if (visibleCharacters < codeLineLength) {
                const timeout = window.setTimeout(() => {
                    setTypedCodeLine({
                        line: currentLine,
                        visibleCharacters: visibleCharacters + 1,
                    });
                }, 20);

                return () => window.clearTimeout(timeout);
            }

            const timeout = window.setTimeout(() => {
                setTerminalLines((lines) => [...lines, currentLine]);
                setTypedCodeLine(null);
                setPendingTerminalLines(restLines);
            }, 120);

            return () => window.clearTimeout(timeout);
        }

        const timeout = window.setTimeout(() => {
            setTerminalLines((lines) => [...lines, currentLine]);
            setPendingTerminalLines(restLines);
        }, 180);

        return () => window.clearTimeout(timeout);
    }, [pendingTerminalLines, typedCodeLine]);

    useEffect(() => {
        if (pendingLines.length === 0) {
            return;
        }

        const [currentLine, ...restLines] = pendingLines;

        if (typedLine.length < currentLine.length) {
            const timeout = window.setTimeout(() => {
                setTypedLine(currentLine.slice(0, typedLine.length + 1));
            }, 28);

            return () => window.clearTimeout(timeout);
        }

        const timeout = window.setTimeout(() => {
            setTerminalLines((lines) => [
                ...lines,
                { type: "output", content: currentLine, colorClassName: currentOutputColorRef.current },
            ]);
            setTypedLine("");
            setPendingLines(restLines);

            if (restLines.length === 0 && redirectTo) {
                window.setTimeout(() => {
                    window.location.href = redirectTo;
                }, 450);
            }
        }, 220);

        return () => window.clearTimeout(timeout);
    }, [pendingLines, redirectTo, typedLine]);

    useEffect(() => {
        terminalBodyRef.current?.scrollTo({
            top: terminalBodyRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [terminalLines, typedCodeLine, typedLine]);

    const executeCommand = (normalizedCommand: string, displayCommand = normalizedCommand) => {
        if (!normalizedCommand || isTyping || !hasBooted) {
            return;
        }

        setTerminalLines((lines) => [...lines, { type: "prompt", command: displayCommand }]);
        setCommand("");

        if (normalizedCommand === "clean") {
            window.setTimeout(() => {
                setTerminalLines(initialTerminalLines);
                setPendingLines([]);
                setPendingTerminalLines([]);
                setTypedLine("");
                setTypedCodeLine(null);
            }, 120);
            return;
        }

        const result = commandOutput[ normalizedCommand ];

        if (!result) {
            currentOutputColorRef.current = terminalOutputColors[ Math.floor(Math.random() * terminalOutputColors.length) ];
            setPendingLines([
                `command not found: ${ normalizedCommand }`,
                "Type `help` to see the tiny spellbook.",
            ]);
            setRedirectTo(null);
            return;
        }

        currentOutputColorRef.current = terminalOutputColors[ Math.floor(Math.random() * terminalOutputColors.length) ];
        setPendingLines(result.lines ?? []);
        setPendingTerminalLines(result.terminalLines ?? []);
        setRedirectTo(result.redirectTo ?? null);
    };

    const runCommand = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        executeCommand(command.trim().toLowerCase().replace(/\.+$/, ""));
    };

    const handleCommandKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key.toLowerCase() !== "h" || isTyping || !hasBooted) {
            return;
        }

        const now = Date.now();

        if (now - lastHKeyAtRef.current < 420) {
            event.preventDefault();
            executeCommand("hi", "hh");
            lastHKeyAtRef.current = 0;
            return;
        }

        lastHKeyAtRef.current = now;
    };

    const renderTerminalLine = (line: TerminalLine, index: number, visibleCharacters?: number) => {
        const lineNumber = String(index + 1).padStart(2, "0");

        if (line.type === "prompt") {
            return (
                <div key={ index } className="flex gap-4 whitespace-nowrap">
                    <span className="w-5 shrink-0 text-right text-zinc-700">{ lineNumber }</span>
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className={ clsx(line.command.startsWith("//") ? "text-zinc-600 italic" : "text-zinc-200") }>
                        { line.command }
                    </span>
                </div>
            );
        }

        if (line.type === "output") {
            return (
                <div key={ index } className="flex gap-4 whitespace-nowrap">
                    <span className="w-5 shrink-0 text-right text-zinc-700">{ lineNumber }</span>
                    <span className="text-zinc-700">›</span>
                    <span className={ line.colorClassName ?? "text-emerald-400" }>{ line.content }</span>
                </div>
            );
        }

        if (line.type === "error") {
            return (
                <div key={ index } className="flex gap-4 whitespace-nowrap">
                    <span className="w-5 shrink-0 text-right text-zinc-700">{ lineNumber }</span>
                    <span className="text-red-400">×</span>
                    <span className="text-red-300">{ line.content }</span>
                </div>
            );
        }

        return (
            <div key={ index } className={ clsx("flex gap-4", line.nowrap && "whitespace-nowrap") }>
                <span className="w-5 text-zinc-700 shrink-0 text-right">{ lineNumber }</span>
                <span className="whitespace-pre">
                    { line.segments ? renderCodeSegments(line.segments, visibleCharacters) : line.content }
                    { visibleCharacters !== undefined && <span className="ml-1 animate-pulse text-blue-400">_</span> }
                </span>
            </div>
        );
    };

    return (
        <section className={"container-root pt-12 sm:pt-16 md:pt-20 lg:pt-24"}>
            <div className="flex items-center gap-4 mb-10 translate-x-1">
                <span className="h-px w-12 bg-zinc-600"></span>
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    <span className="inline-block sm:inline sm:w-full">SOFTWARE ENGINEER 软件工程师</span>
                    <span className="hidden sm:inline-block mx-2">/</span>
                    <span className="inline-block sm:inline sm:w-full">PHOTOGRAPHER 摄影爱好者</span>
                </span>
            </div>

            <h1 className={ clsx("italic text-[clamp(2.8rem,10vw,4.5rem)] lg:text-[clamp(4.5rem,6.5vw,7.5rem)] leading-[0.9] mb-6 group select-none relative", nunito.className) }>
                <div className="text-neutral-800 dark:text-white cursor-default tracking-wider font-black flex flex-col lg:flex-row items-center lg:items-end justify-start gap-4 lg:gap-6">
                    <div className="flex items-center gap-1.5 lg:gap-4 whitespace-nowrap">
                        CODE <span className="text-blue-400 text-[0.85em] inline-block translate-y-[-0.05em] mx-0.5">&</span>BEYOND
                    </div>
                    <Image src={ pin } alt={ 'pinned' } width={ 220 } className="w-36 lg:w-48 xl:w-55 h-auto object-contain mb-2 lg:mb-4 opacity-90"/>
                </div>
                <div className="italic font-normal tracking-tighter cursor-default flex items-center my-4 sm:my-6 md:my-8 lg:my-12">
                    <div className={clsx("transition-all duration-300 opacity-30 cursor-pointer tracking-wider font-medium", maple.className,
                        "[-webkit-text-stroke:1px_rgba(0,0,0,0.6)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.6)] text-transparent",
                        "hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] hover:opacity-90")}>lens.
                    </div>

                    <div className="hidden lg:flex items-center gap-3 not-italic">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                            <Target size={18} className="text-blue-500"/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Focus Status</span>
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Locked</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <div className="h-px w-8 bg-blue-600/50"></div>
                    <span className="text-xl lg:text-2xl font-light tracking-[0.8em] text-zinc-500 uppercase">结构与光影</span>
                </div>
            </h1>

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 w-full items-start">
                <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-6">
                        <p className="text-xl text-zinc-500 font-normal leading-snug">
                            你好，我是 <span className="dark:text-yellow-300 text-yellow-400 font-extrabold text-lg">Chrisy</span>
                        </p>
                        <p className="text-base text-zinc-500 leading-relaxed max-w-md">
                            一名软件工程师 <LineDivider/> 工作时敲键盘，闲暇时按快门 ：)
                            <span className="block mt-4 text-zinc-700 italic">
                                Solving problems with code, exploring the world through the lens.
                            </span>
                        </p>
                    </div>

                </div>

                <div className="lg:col-span-7 relative">
                    <div className="absolute -left-12 top-0 hidden lg:block">
                        <span className="[writing-mode:vertical-lr] text-[9px] font-bold uppercase tracking-[1em] text-zinc-800 select-none">
                          PERSPECTIVE & PRECISION
                        </span>
                    </div>

                    <div className="transition-transform duration-700 hover:-translate-y-1">
                        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-zinc-950/95 font-mono text-sm text-zinc-400 group">

                            <div className="pointer-events-none absolute right-0 top-0 h-40 w-56 bg-blue-500/7 blur-xl"></div>
                            <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-44 bg-emerald-500/3 blur-xl"></div>

                            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.07] bg-white/2 px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className={ clsx("flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500", maple.className) }>
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                    terminal
                                </div>
                            </div>

                            <div
                                className="relative z-10 flex h-90 flex-col px-6 py-7 md:px-8"
                                onClick={ () => inputRef.current?.focus() }
                            >
                                <div ref={ terminalBodyRef } className="flex-1 space-y-3.5 overflow-x-auto overflow-y-auto no-scrollbar">
                                    { terminalLines.map((line, index) => renderTerminalLine(line, index)) }
                                    { typedCodeLine && renderTerminalLine(
                                        typedCodeLine.line,
                                        terminalLines.length,
                                        typedCodeLine.visibleCharacters,
                                    ) }
                                    { typedLine && (
                                        <div className="flex gap-4 whitespace-nowrap">
                                            <span className="w-5 shrink-0 text-right text-zinc-700">
                                                { String(terminalLines.length + 1).padStart(2, "0") }
                                            </span>
                                            <span className="text-zinc-700">›</span>
                                            <span className={ currentOutputColorRef.current }>
                                                { typedLine }
                                                <span className="ml-1 animate-pulse text-blue-400">_</span>
                                            </span>
                                        </div>
                                    ) }
                                    <form onSubmit={ runCommand } className="flex gap-4 whitespace-nowrap">
                                        <span className="w-5 shrink-0 text-right text-zinc-700">
                                            { String(terminalLines.length + (typedLine ? 2 : 1)).padStart(2, "0") }
                                        </span>
                                        <span className="text-green-400">➜</span>
                                        <span className="text-blue-400">~</span>
                                        <label className="sr-only" htmlFor="hero-terminal-command">Terminal
                                            command</label>
                                        <input
                                            ref={ inputRef }
                                            id="hero-terminal-command"
                                            value={ hasBooted ? command : bootCommandText }
                                            onChange={ (event) => setCommand(event.target.value) }
                                            onKeyDown={ handleCommandKeyDown }
                                            disabled={ isTyping || !hasBooted }
                                            className="min-w-40 flex-1 border-none bg-transparent p-0 text-zinc-100 outline-none placeholder:text-zinc-700 disabled:cursor-wait"
                                            placeholder={ isTyping ? "typing..." : "try: whoami / help / hi" }
                                            autoComplete="off"
                                            spellCheck={ false }
                                        />
                                        <span className="animate-pulse text-blue-500">_</span>
                                    </form>
                                </div>

                                <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
                                        Online
                                    </div>
                                </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                    <span>UTF-8 | Spaces: 4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
