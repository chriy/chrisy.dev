import { Bot, Camera, Cpu } from "lucide-react";
import { clsx } from "clsx";
import { maple, nunito } from "@/lib/font";
import type { ReactNode } from "react";

const stack = [
    { key: "framework", value: "\"Next.js\"" },
    { key: "content", value: "\"MDX\"" },
    { key: "style", value: "\"Tailwind CSS\"" },
    { key: "motion", value: "\"Framer Motion\"" },
    { key: "focus", value: "[\"Backend\", \"AI\", \"Photography\"]" },
];

export default function About() {
    return (
        <section className="container-root min-h-screen py-16 md:py-24">
            <div className="flex items-center gap-4 mb-12 translate-x-1">
                <span className="h-px w-12 bg-zinc-600"></span>
                <span className={ clsx("text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400", maple.className) }>
                    Site / Profile
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5">
                    <div className="sticky top-24 border-l border-zinc-200 pl-6 dark:border-zinc-900">
                        <p className={ clsx("mb-5 text-xs font-bold uppercase tracking-[0.35em] text-blue-500", maple.className) }>
                            about chrisy
                        </p>
                        <h1 className={ clsx(
                            "max-w-sm text-4xl font-black leading-snug tracking-tight text-zinc-900 dark:text-white md:text-5xl",
                            nunito.className
                        ) }>
                            Notes, and a little light.
                        </h1>
                        <p className="mt-7 max-w-md text-base leading-8 text-zinc-600 dark:text-zinc-400">
                            在碎片化的时代，留一个安静的角落，记录技术上的坑与路，以及生活中的一些光影。
                        </p>
                        <PixelCamera/>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AboutBlock
                            icon={ <Camera size={ 20 }/> }
                            title="Beyond Code"
                            body="键盘之外的另一种视角。摄影无关标签，而是观察世界的方式：捕捉光线、秩序与偶然，并保持一点耐心。"
                        />
                        <AboutBlock
                            icon={ <Bot size={ 20 }/> }
                            title="AI Now"
                            body="拥抱 AI 对开发的重塑。我更愿将它看作新的工作界面：帮助探索问题、验证灵感，而非替代思考。"
                        />
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 shadow-2xl shadow-zinc-300/40 dark:border-white/10 dark:shadow-none">
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                            </div>
                            <div className={ clsx("flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600", maple.className) }>
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                site.ts
                            </div>
                        </div>

                        <div className={ clsx("relative p-6 md:p-8 font-mono text-sm overflow-y-auto", maple.className) }>
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
                            <CodeLine number="01">
                                <span className="text-blue-400">const</span>
                                <span className="text-white"> site</span>
                                <span className="text-zinc-500"> = { "{" }</span>
                            </CodeLine>
                            { stack.map((item, index) => (
                                <CodeLine key={ item.key } number={ String(index + 2).padStart(2, "0") }>
                                    <span className="pl-8 text-zinc-400">{ item.key }:</span>
                                    <span className="text-emerald-400"> { item.value }</span>
                                    <span className="text-zinc-500">,</span>
                                </CodeLine>
                            )) }
                            <CodeLine number="07">
                                <span className="text-zinc-500">{ "}" }</span>
                            </CodeLine>
                            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                <Cpu size={ 14 }/>
                                built with curiosity, shipped with care
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const AboutBlock = ({ icon, title, body }: {
    icon: ReactNode;
    title: string;
    body: string;
}) => {
    return (
        <article className="group rounded-2xl border border-zinc-200/80 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950/20 dark:hover:border-blue-500/40 dark:hover:bg-zinc-900/30">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-950/30 dark:text-blue-400">
                { icon }
            </div>
            <h2 className={ clsx("text-lg font-black text-zinc-900 dark:text-white", nunito.className) }>
                { title }
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                { body }
            </p>
        </article>
    );
};

const PixelCamera = () => {
    return (
        <div className="mt-14 hidden w-fit select-none md:block" aria-hidden="true">
            <div className="relative h-40 w-44">
                <div className={ clsx("absolute left-1 top-0 border-2 border-zinc-800 bg-zinc-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-800 shadow-[4px_4px_0_rgba(24,24,27,0.1)] dark:border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:shadow-[4px_4px_0_rgba(255,255,255,0.05)]", maple.className) }>
                    Camera
                </div>
                <div className="absolute left-10 top-7 h-6 w-0.5 bg-zinc-800 dark:bg-zinc-200"></div>
                <div className="absolute left-8 top-12 h-2 w-2 bg-zinc-800 dark:bg-zinc-200"></div>
                <div className="absolute bottom-0 left-5 h-4 w-28 bg-zinc-200/80 dark:bg-zinc-900"></div>
                <div className="absolute bottom-3 left-0 h-20 w-36 border-4 border-zinc-800 bg-zinc-100 shadow-[10px_10px_0_rgba(24,24,27,0.08)] dark:border-zinc-200 dark:bg-zinc-900 dark:shadow-[10px_10px_0_rgba(255,255,255,0.04)]">
                    <div className="absolute -top-7 left-5 h-7 w-16 border-4 border-b-0 border-zinc-800 bg-zinc-100 dark:border-zinc-200 dark:bg-zinc-900"></div>
                    <div className="absolute -top-4 right-4 h-4 w-8 bg-blue-500"></div>
                    <div className="absolute left-4 top-4 h-5 w-8 bg-zinc-800 dark:bg-zinc-200"></div>
                    <div className="absolute right-4 top-4 h-3 w-3 bg-emerald-400"></div>

                    <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 border-4 border-zinc-800 bg-zinc-300 dark:border-zinc-200 dark:bg-zinc-700">
                        <div className="absolute inset-2 bg-zinc-900 dark:bg-zinc-100"></div>
                        <div className="absolute right-2 top-2 h-2 w-2 bg-blue-300"></div>
                    </div>
                </div>
                <div className="absolute bottom-12 right-0 h-4 w-4 bg-blue-500"></div>
                <div className="absolute bottom-7 right-4 h-3 w-3 bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
        </div>
    );
};

const CodeLine = ({ number, children }: {
    number: string;
    children: ReactNode;
}) => {
    return (
        <div className="relative z-10 flex gap-4 py-1.5 whitespace-nowrap">
            <span className="w-6 shrink-0 text-right text-zinc-700">{ number }</span>
            <span>{ children }</span>
        </div>
    );
};
