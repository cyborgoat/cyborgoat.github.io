"use client";
import React from "react";
import ReactMarkdown, {Components} from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import MarkdownCodeBlock from "@/components/markdown/MarkdownCodeBlock";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";

interface MarkdownRenderProps {
    content: string;
    className?: string;
}

export default function MarkdownRender({content, className}: MarkdownRenderProps) {
    const components: Components = {
        code(
            props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }
        ) {
            const {className: codeClass, children, inline} = props;
            if (!inline) {
                return <MarkdownCodeBlock className={codeClass}>{children}</MarkdownCodeBlock>;
            }
            return <code
                className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-gray-900 dark:text-gray-200">{children}</code>;
        },
        a({href, children}) {
            const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'));
            return (
                <a
                    href={href}
                    className="text-blue-600 underline hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 transition-colors"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                    {children}
                </a>
            );
        },
        img({src, alt}) {
            const srcString = typeof src === 'string' ? src : "";
            return (
                <figure className="my-4">
                    <MarkdownMedia src={srcString} alt={alt || ""}/>
                    {alt && (
                        <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                            {alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
        table({children}) {
            return (
                <div className="overflow-x-auto my-6">
                    <table
                        className="min-w-full border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-200">{children}</table>
                </div>
            );
        },
        thead({children}) {
            return <thead className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">{children}</thead>;
        },
        tbody({children}) {
            return <tbody
                className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-200">{children}</tbody>;
        },
        th({children}) {
            return <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{children}</th>;
        },
        td({children}) {
            return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{children}</td>;
        },
        p({children}) {
            return <p className="text-gray-900 dark:text-gray-200 leading-relaxed mb-4">{children}</p>;
        },
        strong({children}) {
            return <strong className="font-bold text-gray-900 dark:text-gray-200">{children}</strong>;
        },
        em({children}) {
            return <em className="italic text-gray-900 dark:text-gray-200">{children}</em>;
        },
        ul({children}) {
            return <ul className="list-disc list-inside text-gray-900 dark:text-gray-200 mb-4">{children}</ul>;
        },
        ol({children}) {
            return <ol className="list-decimal list-inside text-gray-900 dark:text-gray-200 mb-4">{children}</ol>;
        },
        li({children}) {
            return <li className="text-gray-900 dark:text-gray-200">{children}</li>;
        },
        h1({children}) {
            return <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-6">{children}</h1>;
        },
        h2({children}) {
            return <h2
                className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4 border-b-2 border-gray-900 dark:border-gray-200">{children}</h2>;
        },
        h3({children}) {
            return <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">{children}</h3>;
        },
        h4({children}) {
            return <h4 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-2">{children}</h4>;
        },
        h5({children}) {
            return <h5 className="text-base font-bold text-gray-900 dark:text-gray-200 mb-2">{children}</h5>;
        },
        h6: ({children}) => {
            return <h6 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2">{children}</h6>;
        },
        blockquote: ({children}) => {
            return (
                <blockquote className="border-l-4 pl-4 text-gray-900 dark:text-gray-200 italic mb-4">
                    {children}
                </blockquote>
            );
        },
    };

    return (
        <div className={`prose prose-lg dark:prose-invert max-w-none ${className || ''}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
