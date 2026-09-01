"use client";
import {useSyncExternalStore} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark, oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import {useTheme} from "next-themes";

const subscribe = () => () => {};

export default function MarkdownCodeBlock({
                                              className,
                                              children,
                                          }: {
    className?: string;
    children?: React.ReactNode;
}) {
    const match = /language-(\w+)/.exec(className || "");
    const {resolvedTheme} = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <div className="my-4 overflow-hidden rounded-[--radius] border border-border">
            {match?.[1] && (
                <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {match[1]}
                </div>
            )}
            <SyntaxHighlighter
                style={isDark ? oneDark : oneLight}
                language={match ? match[1] : undefined}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: 14,
                    background: isDark ? "#211C16" : "#F6F0E6",
                }}
                codeTagProps={{style: {background: "transparent"}}}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        </div>
    );
}
