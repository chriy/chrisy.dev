import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TerminalWindow() {
    const [text, setText] = useState("");
    const fullText = "whoami";
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        let offset = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, offset + 1));
            offset++;
            if (offset > fullText.length) {
                clearInterval(timer);
                setTimeout(() => setShowResult(true), 500); // 打完字停顿一下显示结果
            }
        }, 150); // 打字速度
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full mx-auto lg:mx-0 bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-neutral-800 font-mono text-sm sm:text-base">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-gray-400 text-xs select-none">chrisy — zsh — 80x24</div>
            </div>

            <div className="p-6 text-gray-300 min-h-[200px] flex flex-col gap-2">
                <div>
                    <span className="text-green-400">➜</span> <span className="text-blue-400">~</span>
                    <span className="text-gray-400"> System initialized. Terminal ready.</span>
                </div>
                <div>
                    <span className="text-green-400">➜</span> <span className="text-blue-400">~</span>
                    <span className="ml-2 text-white">{text}</span>
                    <span className="animate-pulse inline-block w-2 h-4 bg-gray-500 ml-1 align-middle"></span>
                </div>

                {/* 结果显示区 */}
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                    >
                        <div className="text-yellow-300 font-bold text-lg">Chrisy</div>
                        <div className="text-gray-400 text-sm mt-1">Backend Developer & Photography Hobbyist.</div>
                        <div className="text-gray-500 text-xs mt-4">
                            Type <span className="text-cyan-400">'help'</span> to see available commands...
                        </div>

                    </motion.div>
                )}
            </div>
        </div>
    );
};
