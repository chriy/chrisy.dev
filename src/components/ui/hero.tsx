'use client'
import { Target } from "lucide-react";
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import Image from "next/image";
import pin from '../../images/pin.png'
import { LineDivider } from "@/components/mdx/article";

export default function Hero() {
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
                                    profile.ts
                                </div>
                            </div>

                            <div className="relative z-10 overflow-x-auto px-6 py-7 md:px-8">
                                <div className="space-y-3.5">
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 shrink-0 text-right text-zinc-700">01</span>
                                    <span className="text-green-400">➜</span>
                                    <span className="text-blue-400">~</span>
                                    <span className="text-zinc-600 italic">// Hello</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">02</span>
                                    <span className="text-blue-500/90">const</span>
                                    <span className="text-zinc-100">Profile</span>
                                    <span className="text-zinc-500">=</span>
                                    <span className="text-zinc-500">{'{'}</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">03</span>
                                    <span className="text-zinc-400 pl-8">role:</span>
                                    <span className="text-emerald-400">"Software Engineer"</span>
                                    <span className="text-zinc-500">,</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">04</span>
                                    <span className="text-zinc-400 pl-8">stack:</span>
                                    <span className="text-emerald-400">["Java", "TypeScript", "Node.js"]</span>
                                    <span className="text-zinc-500">,</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">05</span>
                                    <span className="text-zinc-400 pl-8">passion:</span>
                                    <span className="text-emerald-400">"Photography (Sony α7M4)"</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">06</span>
                                    <span className="text-zinc-500">{'}'}</span>
                                </div>
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
