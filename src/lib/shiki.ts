import React, { Fragment } from 'react';
import type { BundledLanguage } from 'shiki';
import { codeToHast } from 'shiki';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs } from 'react/jsx-runtime';

export const LANG_ALIAS: Record<string, BundledLanguage> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    bash: 'sh',
    shell: 'sh',
    py: 'python',
    rs: 'rust',
    yml: 'yaml',
    md: 'markdown',
};

export const LANG_LABELS: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    python: 'Python',
    rust: 'Rust',
    go: 'Go',
    sh: 'Shell',
    json: 'JSON',
    yaml: 'YAML',
    markdown: 'Markdown',
    css: 'CSS',
    html: 'HTML',
    sql: 'SQL',
    cpp: 'C++',
    xml: 'XML',
    java: 'Java',
    text: 'Text',
};

export async function highlight(
    code: string,
    lang: string,
    theme = 'one-dark-pro',
): Promise<React.ReactNode> {
    const resolvedLang = (LANG_ALIAS[ lang ] ?? lang) as BundledLanguage;

    try {
        const hast = await codeToHast(code, { lang: resolvedLang, theme });
        return toJsxRuntime(hast, {
            Fragment,
            jsx: jsx as any,
            jsxs: jsxs as any,
            development: false,
        }) as React.ReactNode;
    } catch (e) {
        try {
            const fallbackHast = await codeToHast(code, { lang: 'markdown', theme });
            return toJsxRuntime(fallbackHast, {
                Fragment,
                jsx: jsx as any,
                jsxs: jsxs as any,
                development: false,
            }) as React.ReactNode;
        } catch {
            return null;
        }
    }
}

export function extractText(node: unknown): string {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (typeof node === 'object' && 'props' in node) {
        const el = node as { props?: { children?: unknown } };
        return extractText(el.props?.children);
    }
    return '';
}

export function detectLang(node: unknown): string {
    if (!node || typeof node !== 'object' || !('props' in node)) return 'text';
    const el = node as { props?: { className?: string; children?: unknown } };
    const props = el.props ?? {};
    const match = (props.className ?? '').match(/language-(\w+)/);
    if (match) return match[ 1 ].toLowerCase();
    if (props.children) {
        if (Array.isArray(props.children)) {
            for (const child of props.children) {
                const r = detectLang(child);
                if (r !== 'text') return r;
            }
        } else {
            return detectLang(props.children);
        }
    }
    return 'text';
}
