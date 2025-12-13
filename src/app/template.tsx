'use client'

import { motion } from 'framer-motion'
import React from "react";

export default function Template({ children }: {children: React.ReactNode}) {
    return (
        <motion.div
            // 高斯模糊
            // initial={{ opacity: 0, filter: 'blur(5px)' }}
            // animate={{ opacity: 1, filter: 'blur(0px)' }}
            // transition={{
            //     duration: 0.4,
            //     ease: "easeOut"
            // }}

            // 弹簧
            initial={{ opacity: 0, scale: 0.98 }} // 稍微小一点点
            animate={{ opacity: 1, scale: 1 }}    // 恢复原状
            transition={{
                type: "spring", // 使用弹簧物理效果，而不是时间曲线
                stiffness: 260, // 刚度：越高越快
                damping: 20,    // 阻尼：越低回弹越厉害，20 比较适中
            }}

            // 简单上浮
            // initial={{ opacity: 0, y: 10 }} // 位移距离减半
            // animate={{ opacity: 1, y: 0 }}
            // transition={{
            //     ease: 'easeInOut',
            //     duration: 0.4
            // }}
        >
            {children}
        </motion.div>
    )
}