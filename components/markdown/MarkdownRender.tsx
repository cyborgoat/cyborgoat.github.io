"use client";
import ReactMarkdown from "react-markdown";
import MarkdownCodeBlock from "@/components/markdown/MarkdownCodeBlock";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";

export default function MarkdownRender({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <MarkdownCodeBlock className={className}>{children}</MarkdownCodeBlock>
          ) : (
            <code className={className} {...props}>{children}</code>
          );
        },
        img({ src, alt }) {
          return <MarkdownMedia src={src || ""} alt={alt || ""} />;
        },
        a({ href, children }) {
          if (!href) return <>{children}</>;
          if (href.startsWith("http") || href.startsWith("//")) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }
          return <a href={href}>{children}</a>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
