import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

export default function ReadingProgress() {

    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(Math.min(100, Math.round(scrollPercent)));
            setVisible(scrollTop > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="size-9 rounded-full text-sm p-3 bg-primary-dark dark:bg-transparent text-white flex items-center justify-center font-semibold shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: visible ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {progress}
            </motion.div>
        </motion.div>
    );
}