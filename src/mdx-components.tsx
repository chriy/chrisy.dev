import { MDXComponents } from "mdx/types";
import {
    A,
    B,
    Blockquote,
    Code,
    CodeBlock,
    CustomHR,
    DeleteLine,
    H1,
    H2,
    H3,
    H4,
    Italic,
    Li,
    Ol,
    P,
    Ul,
    Underline
} from "@/components/mdx/article";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        hr: CustomHR,
        b: B,
        img: Image,
        strong: B,
        p: P,
        a: A,
        em: Italic,
        i: Italic,
        ul: Ul,
        ol: Ol,
        li: Li,
        u: Underline,
        blockquote: Blockquote,
        code: Code,
        pre: CodeBlock,
        del: DeleteLine,
        ...components,
    }
}