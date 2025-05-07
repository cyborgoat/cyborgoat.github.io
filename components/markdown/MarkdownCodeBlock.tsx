"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownCodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const match = /language-(\w+)/.exec(className || "");
  return (
    <div className="my-4">
      <SyntaxHighlighter
        style={oneDark}
        language={match ? match[1] : undefined}
        PreTag="div"
        customStyle={{ borderRadius: 8, fontSize: 14 }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
