'use client'
import { Target } from "lucide-react";
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import Image from "next/image";
import pin from '../../images/pin.png'
import { LineDivider } from "@/components/mdx/article";

export default function Hero() {
    return (
        <section className={"container-root min-h-screen pt-12 sm:pt-16 md:pt-20 lg:pt-24"}>
            <div className="flex items-center gap-4 mb-10 translate-x-1">
                <span className="h-px w-12 bg-zinc-600"></span>
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    <span className="inline-block sm:inline sm:w-full">BACKEND ENGINEER 后端工程师</span>
                    <span className="hidden sm:inline-block mx-2">/</span>
                    <span className="inline-block sm:inline sm:w-full">PHOTOGRAPHY 摄影爱好</span>
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
                            <Target size={18} className="text-blue-500 animate-pulse"/>
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
                <div className="lg:col-span-4 space-y-12">
                    <div className="space-y-6">
                        <p className="text-xl text-zinc-500 font-normal leading-snug">
                            你好，我是 <span className="dark:text-yellow-300 text-yellow-400 font-extrabold text-lg">Chrisy</span>
                        </p>
                        <p className="text-base text-zinc-500 leading-relaxed max-w-sm">
                            一名后端工程师 <LineDivider/> 工作时敲键盘，闲暇时按快门 ：)
                            <span className="block mt-4 text-zinc-700 italic">
                                Solving problems with code, exploring the world through the lens.
                            </span>
                        </p>
                    </div>

                </div>

                <div className="lg:col-span-8 relative">
                    <div className="absolute -left-12 top-0 hidden lg:block">
                        <span className="[writing-mode:vertical-lr] text-[9px] font-bold uppercase tracking-[1em] text-zinc-800 select-none">
                          PERSPECTIVE & PRECISION
                        </span>
                    </div>

                    <div className="rounded-[2.5rem] p-1 lg:p-1.5 transition-all duration-700 hover:scale-[1.01]">
                        <div className="bg-[#050505] border border-white/10 rounded-3xl p-10 font-mono text-sm overflow-hidden relative group overflow-x-auto">

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="h-50 w-75 rounded-full bg-blue-400 opacity-30 blur-[120px]"></div>
                            </div>

                            <div className="absolute top-0 right-0 p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-2 items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="px-2 text-zinc-600">profile.ts</div>
                                </div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="text-zinc-700 shrink-0 text-right">01</span>
                                    <span className="text-green-400">➜</span>
                                    <span className="text-blue-400">~</span>
                                    <span className="text-zinc-700 italic">// Hello</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">02</span>
                                    <span className="text-blue-500">const</span>
                                    <span className="text-white">Profile</span>
                                    <span className="text-zinc-500">=</span>
                                    <span className="text-zinc-500">{'{'}</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">03</span>
                                    <span className="text-zinc-400 pl-8">role:</span>
                                    <span className="text-emerald-400">"Backend Engineer"</span>
                                    <span className="text-zinc-500 -translate-x-4">,</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">04</span>
                                    <span className="text-zinc-400 pl-8">stack:</span>
                                    <span className="text-emerald-400">["Java", "TypeScript", "Golang"]</span>
                                    <span className="text-zinc-500 -translate-x-4">,</span>
                                </div>
                                <div className="flex gap-4 whitespace-nowrap">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">05</span>
                                    <span className="text-zinc-400 pl-8">camera:</span>
                                    <span className="text-emerald-400">"SONY A7M4 G Master"</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-5 text-zinc-700 shrink-0 text-right">06</span>
                                    <span className="text-zinc-500">{'}'}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-10 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                        Online
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-zinc-600 uppercase">
                                    <span>UTF-8 | Spaces: 4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}