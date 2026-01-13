'use client'

import React, { useEffect, useRef, useState } from 'react'
import { clsx } from "clsx";

interface Heading {
    id: string
    text: string
    level: number
}

export const Catalog = () => {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    // 使用 useRef 缓存 DOM 元素引用，避免在 scroll 事件中重复 querySelectorAll
    const headingElementsRef = useRef<HTMLElement[]>([])

    // 1. 解析目录结构 & 补全 ID
    useEffect(() => {
        // 获取文章标题
        const articleTitle = document.querySelector('.v-title h1')?.textContent || '目录'
        setTitle(articleTitle)

        // 获取所有标题元素
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.v-content h1, h2, h3, h4'))

        // 转换数据并处理缺失 ID 的情况
        const headings = elements.map((elem, index) => {
            // 如果元素没有 ID，根据文本内容生成一个，并赋值回 DOM 元素
            // 确保点击跳转能找到目标
            if (!elem.id) {
                elem.id = elem.textContent
                        ?.trim()
                        .replace(/\s+/g, '-') // 空格转横杠
                        .replace(/[^\w\u4e00-\u9fa5-]/g, '') // 移除非字母数字汉字字符（可选）
                    || `heading-${index}`
            }

            return {
                id: elem.id,
                text: elem.textContent || '',
                level: Number(elem.tagName.substring(1)),
            }
        })

        setHeadings(headings)
        // 将 DOM 元素存入 ref 供 scroll 事件使用
        headingElementsRef.current = elements
    }, [])

    // 2. 监听滚动
    useEffect(() => {

        const updateActiveHeading = () => {
            const elements = headingElementsRef.current
            if (elements.length === 0) return

            // 1. 判断是否到底部
            const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20
            if (isAtBottom) {
                setActiveId(elements[elements.length - 1].id)
                return
            }

            // 2. 查找当前视口内的标题
            let currentId = ''
            // 顶部偏移量，在这个范围内算作“当前章节”
            // 比如 header 高度是 60，这里留出 100 的余量
            const topOffset = 120

            for (const elem of elements) {
                const rect = elem.getBoundingClientRect()
                // 如果标题的顶部位置小于 topOffset，说明它已经在上方或者刚好到了
                if (rect.top < topOffset) {
                    currentId = elem.id
                } else {
                    // 因为是顺序遍历，一旦遇到在下方的，后面的肯定都在下方，直接退出
                    break
                }
            }

            // 如果页面刚打开在最顶部，可能没有匹配到任何小于 topOffset 的标题
            // 此时默认高亮第一个（如果在第一个之前）或者保持空
            if (!currentId && elements.length > 0 && window.scrollY < 100) {
                currentId = elements[0].id
            }

            if (currentId) setActiveId(currentId)
        }

        let ticking = false // 用于简单的节流 (Throttle)

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveHeading()
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll)
        // 监听 resize，防止窗口大小改变导致计算不准
        window.addEventListener('resize', handleScroll)

        // 初始化执行一次
        updateActiveHeading()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    // 点击平滑滚动
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            // 偏移量，避免标题被顶部 Header 遮挡
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            // 点击时立即设置高亮，提升交互响应速度
            setActiveId(id)
        }
    }

    if (headings.length === 0) return null

    // 目录缩进
    const indent: Record<number, string> = {
        1: 'pl-1',
        2: 'pl-3',
        3: 'pl-5',
        4: 'pl-7',
    }

    return (
        <nav className="space-y-2" aria-label="文章目录">
            <h1 className="py-3 font-bold text-md text-zinc-900 dark:text-zinc-100">
                {title.replace(/#/g, '')}
            </h1>
            <ul className="space-y-1 text-sm max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {headings.map((heading) => (
                    <li key={heading.id} className={clsx(indent[heading.level] ?? "pl-1")}>
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={clsx(
                                "block text-left w-full py-1.5 px-3 rounded-md transition-all duration-200 border-l-2",
                                "hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer",
                                activeId === heading.id
                                    ? "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 font-medium translate-x-1"
                                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                            )}
                        >
                            <span className="truncate block">
                                {heading.text.replace(/#/g, '')}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}