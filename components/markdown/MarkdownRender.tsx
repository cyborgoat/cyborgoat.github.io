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
import MermaidDiagram from "@/components/markdown/MermaidDiagram";

interface MarkdownRenderProps {
    content: string;
    className?: string;
}

export default function MarkdownRender({content, className}: MarkdownRenderProps) {
    const getNodeText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return String(node);
        if (Array.isArray(node)) return node.map(getNodeText).join("");
        if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
            return getNodeText(node.props.children);
        }
        return "";
    };

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const components: Components = {
        code(
            props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }
        ) {
            const {className: codeClass, children} = props;

            // Check if it's a mermaid diagram
            if (codeClass === 'language-mermaid') {
                const content = typeof children === 'string' ? children : String(children);
                return <MermaidDiagram content={content} />;
            }

            // Check if className indicates a language-specific fenced code block
            if (codeClass && codeClass.startsWith('language-')) {
                return <MarkdownCodeBlock className={codeClass}>{children}</MarkdownCodeBlock>;
            } else {
                // Treat as inline code
                return (
                    <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
                        {children}
                    </code>
                );
            }
        },
        a({href, children}) {
            const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'));
            return (
                <a
                    href={href}
                    className="text-brand underline underline-offset-4 decoration-brand/40 hover:decoration-brand transition-colors"
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
                        <figcaption className="text-center text-sm text-muted-foreground mt-2 italic">
                            {alt}
                        </figcaption>
                    )}
                </figure>
            );
        },
        table({children}) {
            return (
                <div className="overflow-x-auto my-6 rounded-[--radius] border border-border">
                    <table className="min-w-full text-sm text-foreground">{children}</table>
                </div>
            );
        },
        thead({children}) {
            return <thead className="bg-muted text-foreground">{children}</thead>;
        },
        tbody({children}) {
            return <tbody className="divide-y divide-border text-foreground">{children}</tbody>;
        },
        th({children}) {
            return <th
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{children}</th>;
        },
        td({children}) {
            return <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{children}</td>;
        },
        p({children}) {
            return <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>;
        },
        strong({children}) {
            return <strong className="font-semibold text-foreground">{children}</strong>;
        },
        em({children}) {
            return <em className="italic text-foreground">{children}</em>;
        },
        ul({children}) {
            return <ul className="list-disc list-inside text-foreground/90 mb-4">{children}</ul>;
        },
        ol({children}) {
            return <ol className="list-decimal list-inside text-foreground/90 mb-4">{children}</ol>;
        },
        li({children}) {
            return <li className="text-foreground/90">{children}</li>;
        },
        h1({children}) {
            const id = slugify(getNodeText(children));
            return <h1 id={id} className="font-serif text-3xl font-normal text-foreground mb-6">{children}</h1>;
        },
        h2({children}) {
            const id = slugify(getNodeText(children));
            return <h2
                id={id}
                className="font-serif text-2xl font-normal text-foreground mb-4 pb-2 border-b border-border">{children}</h2>;
        },
        h3({children}) {
            const id = slugify(getNodeText(children));
            return <h3 id={id} className="font-serif text-xl font-normal text-foreground mb-3">{children}</h3>;
        },
        h4({children}) {
            const id = slugify(getNodeText(children));
            return <h4 id={id} className="text-lg font-semibold text-foreground mb-2">{children}</h4>;
        },
        h5({children}) {
            const id = slugify(getNodeText(children));
            return <h5 id={id} className="text-base font-semibold text-foreground mb-2">{children}</h5>;
        },
        h6: ({children}) => {
            const id = slugify(getNodeText(children));
            return <h6 id={id} className="text-sm font-semibold text-muted-foreground mb-2">{children}</h6>;
        },
        blockquote: ({children}) => {
            return (
                <blockquote className="border-l-4 border-brand pl-4 text-muted-foreground italic mb-4">
                    {children}
                </blockquote>
            );
        },
    };

    return (
        <div className={`prose prose-stone prose-lg dark:prose-invert max-w-none ${className || ''}`}>
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
