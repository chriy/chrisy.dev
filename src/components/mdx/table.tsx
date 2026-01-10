'use client'

import React from "react";

interface TableProps<T> {
    data: T[];
    columns?: Columns<T>[] // table column style
    className?: string  // table style
}

export type AlignType = "left"|"center"|"right"

export interface Columns<T = any> {
    key: string
    title: string;
    width?: string;
    align?: AlignType
    render?: (val: any, row: T) => React.ReactNode; // page must 'use client' in Next.js
}

export default function Table<T extends Record<string, any>>({ data, columns, className }: TableProps<T>) {
    // Empty data
    if (!data || data.length === 0) return (
        <div className={`p-8 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500 text-sm ${className}`}>
            No data available
        </div>
    );

    // first line key as table header
    const header: Columns<T>[] = columns || Object.keys(data[0]).map((key) => ({
        key, title: key.charAt(0).toUpperCase() + key.slice(1)
    }));

    return (
        <div className={`w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 ${className}`}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    {/* header */}
                    <thead className="bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 font-medium border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                        {header.map((col) => (
                            <th
                                key={col.key}
                                className={`px-6 py-3 whitespace-nowrap ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                                style={{ width: col.width }}
                            >
                                {col.title || col.key}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 bg-white dark:bg-zinc-900">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="group transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30"
                        >
                            {header.map((col) => {
                                const value = row[col.key];
                                return (
                                    <td
                                        key={`${rowIndex}-${col.key}`}
                                        className={`px-6 py-4 text-zinc-600 dark:text-zinc-300 tabular-nums ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                                    >
                                        {col.render ? col.render(value, row) : value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}