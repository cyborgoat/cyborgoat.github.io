"use client";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from 'remark-gfm';
import MarkdownCodeBlock from "@/components/markdown/MarkdownCodeBlock";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";

interface MarkdownRenderProps {
  content: string;
  className?: string;
}

export default function MarkdownRender({ content, className }: MarkdownRenderProps) {
  const components: Components = {
    code(
      props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }
    ) {
      const { className: codeClass, children, inline } = props;
      if (!inline) {
        return <MarkdownCodeBlock className={codeClass}>{children}</MarkdownCodeBlock>;
      }
      return <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">{children}</code>;
    },
    a({ href, children }) {
      const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'));
      return (
        <a
          href={href}
          className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    img({ src, alt }) {
      const srcString = typeof src === 'string' ? src : "";
      return <MarkdownMedia src={srcString} alt={alt || ""} />;
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">{children}</table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-50 dark:bg-gray-900">{children}</thead>;
    },
    tbody({ children }) {
      return <tbody>{children}</tbody>;
    },
    tr({ children }) {
      return <tr className="border-b border-gray-200 dark:border-gray-700">{children}</tr>;
    },
    th({ children }) {
      return <th className="px-4 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800">{children}</th>;
    },
    td({ children }) {
      return <td className="px-4 py-2">{children}</td>;
    },
    ul({ children }) {
      return <ul className="list-disc pl-6 mb-4">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
    },
    li({ children }) {
      return <li className="mb-1">{children}</li>;
    },
    blockquote({ children }) {
      return <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">{children}</blockquote>;
    },
    hr() {
      return <hr className="my-8 border-t border-gray-300 dark:border-gray-700" />;
    },
    h1({ children }) {
      return <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-2xl font-semibold mt-8 mb-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>;
    },
    h4({ children }) {
      return <h4 className="text-lg font-semibold mt-5 mb-2">{children}</h4>;
    },
    h5({ children }) {
      return <h5 className="text-base font-semibold mt-4 mb-2">{children}</h5>;
    },
    h6({ children }) {
      return <h6 className="text-sm font-semibold mt-3 mb-2">{children}</h6>;
    },
    p({ children }) {
      return <p className="mb-4 leading-relaxed">{children}</p>;
    },
  };

  return (
    <div className={`markdown-container ${className || ''}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
