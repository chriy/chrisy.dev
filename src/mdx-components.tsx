import { MDXComponents } from "mdx/types";
import { H2, P, Strong } from "@/components/mdx/article";
import React from "react";

const components: MDXComponents = {
    h1: H2,
    h2: ({ children }) => (
        <h2 className="group text-2xl font-bold mt-12 mb-6 flex items-center scroll-mt-24 cursor-pointer gap-2">
            <span className="text-blue-500 group-hover:opacity-70 font-extrabold">#&nbsp;</span>
            {children}
        </h2>
    ),
    b: Strong,
    p: P
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
    return components
}