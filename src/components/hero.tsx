'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import HeroIllustration from '@/images/illustration.svg'
import TerminalWindow from "@/components/terminal";
import SectionHeader from "@/components/section-header";

export default function Hero() {
    return (
        <section className="relative w-full mx-auto py-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* 左侧：文字与终端 (占 5/12) */}
                <div className="flex flex-col gap-6 z-10 lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SectionHeader
                            prefix={'Code & '}
                            highlight={'Beyond'}
                            highlightClass={"text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}
                        >
                            Hi, I'm <span className="font-bold text-gray-900 dark:text-white">Chrisy</span>.
                            a passionate software engineer. It's really nice to meet you.
                        </SectionHeader>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-2 w-full py-10"
                    >
                        <TerminalWindow/>
                    </motion.div>
                </div>

                {/* 右侧：插画 (占 7/12) - 给图片更多空间 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative lg:col-span-7 flex justify-center lg:-mr-16"
                >

                    {/*背景光晕*/}
                    <div className="absolute top-1/4 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[80px] lg:blur-[128px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-300/20 dark:bg-cyan-400/10 rounded-full blur-[60px]"></div>

                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut"
                        }}
                        className="w-full px-4"
                    >
                        <Image
                            src={HeroIllustration}
                            alt="Coding Journey Illustration"
                            priority
                            className="w-full h-auto object-contain drop-shadow-xl"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}