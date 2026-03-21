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

    const headingElementsRef = useRef<HTMLElement[]>([])

    useEffect(() => {
        const articleTitle = document.querySelector('.v-title h1')?.textContent || '目录'
        setTitle(articleTitle)
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.v-content h1, h2, h3, h4'))

        const headings = elements.map((elem, index) => {
            if (!elem.id) {
                elem.id = elem.textContent
                        ?.trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\u4e00-\u9fa5-]/g, '')
                    || `heading-${ index }`
            }

            return {
                id: elem.id,
                text: elem.textContent || '',
                level: Number(elem.tagName.substring(1)),
            }
        })

        setHeadings(headings)
        headingElementsRef.current = elements
    }, [])

    useEffect(() => {

        const updateActiveHeading = () => {
            const elements = headingElementsRef.current
            if (elements.length === 0) return

            const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20
            if (isAtBottom) {
                setActiveId(elements[ elements.length - 1 ].id)
                return
            }

            let currentId = ''
            const topOffset = 120

            for (const elem of elements) {
                const rect = elem.getBoundingClientRect()
                if (rect.top < topOffset) {
                    currentId = elem.id
                } else {
                    break
                }
            }

            if (!currentId && elements.length > 0 && window.scrollY < 100) {
                currentId = elements[ 0 ].id
            }

            if (currentId) setActiveId(currentId)
        }

        let ticking = false

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
        window.addEventListener('resize', handleScroll)
        updateActiveHeading()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })

            setActiveId(id)
        }
    }

    if (headings.length === 0) return null

    const indent: Record<number, string> = {
        1: 'pl-1',
        2: 'pl-3',
        3: 'pl-5',
        4: 'pl-7',
    }
    return (
        <nav className="space-y-2" aria-label="文章目录">
            <h1 className="py-3 font-bold text-md text-zinc-900 dark:text-zinc-100">
                { title.replace(/#/g, '') }
            </h1>
            <ul className="space-y-1 text-sm max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                { headings.map((heading) => (
                    <li key={ heading.id } className={ clsx(indent[ heading.level ] ?? "pl-1") }>
                        <button
                            onClick={ () => scrollToHeading(heading.id) }
                            className={ clsx(
                                "block text-left w-full py-1.5 px-3 rounded-md transition-all duration-200 border-l-2",
                                "hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer",
                                activeId === heading.id
                                    ? "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 font-medium translate-x-1"
                                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                            ) }
                        >
                            <span className="truncate block">
                                { heading.text.replace(/#/g, '') }
                            </span>
                        </button>
                    </li>
                )) }
            </ul>
        </nav>
    )
}