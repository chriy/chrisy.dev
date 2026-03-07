'use client'

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";

export type AnnotationAction =
    | "highlight"
    | "underline"
    | "box"
    | "circle"
    | "strike-through"
    | "crossed-off"
    | "bracket";

export interface HighlighterProps {
    children: React.ReactNode;
    action?: AnnotationAction;
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    isView?: boolean;
}

export const Highlight = ({
    children,
    action = "highlight",
    color = "rgba(129, 140, 248, 0.4)", // 默认柔和的高亮颜色
    strokeWidth = 2,
    animationDuration = 600,
    iterations = 2,
    padding = 2,
    multiline = true,
    isView = true,
}: HighlighterProps) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const annotationRef = useRef<any>(null);

    const isInView = useInView(elementRef, {
        once: true,
        margin: "-10%",
    });

    const shouldShow = !isView || isInView;

    useEffect(() => {
        const element = elementRef.current;
        let resizeObserver: ResizeObserver | null = null;

        if (shouldShow && element) {
            const annotationConfig = {
                type: action,
                color,
                strokeWidth,
                animationDuration,
                iterations,
                padding,
                multiline,
            };

            const annotation = annotate(element, annotationConfig as any);
            annotationRef.current = annotation;
            annotation.show();

            resizeObserver = new ResizeObserver(() => {
                annotation.hide();
                annotation.show();
            });

            resizeObserver.observe(element);
            resizeObserver.observe(document.body);
        }

        return () => {
            if (annotationRef.current) {
                annotationRef.current.remove();
                annotationRef.current = null;
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [
        shouldShow,
        action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
    ]);

    return (
        <span ref={elementRef} className="relative inline mx-0.5 z-10">
            {children}
        </span>
    );
};
