"use client";
import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

interface MermaidDiagramProps {
    content: string;
}

// Warm palette matched to the site theme tokens in app/globals.css
const MERMAID_PALETTE = {
    light: {
        bg: "#FBF8F3",
        surface: "#F3ECE0",
        border: "#B4471F",
        line: "#6F6455",
        text: "#211C16",
    },
    dark: {
        bg: "#221E19",
        surface: "#302A22",
        border: "#E08A4F",
        line: "#A99D8B",
        text: "#ECE4D8",
    },
} as const;

export default function MermaidDiagram({ content }: MermaidDiagramProps) {
    const [svg, setSvg] = useState<string>("");
    const [renderError, setRenderError] = useState(false);
    const { resolvedTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const isDark = mounted && resolvedTheme === "dark";

    const diagramId = useMemo(() => {
        // Stable id derived from content avoids random values and keeps render deterministic.
        let hash = 0;
        for (let i = 0; i < content.length; i += 1) {
            hash = (hash << 5) - hash + content.charCodeAt(i);
            hash |= 0;
        }
        return `mermaid-${Math.abs(hash)}`;
    }, [content]);

    useEffect(() => {
        let isCancelled = false;

        const renderDiagram = async (): Promise<void> => {
            if (!content.trim()) {
                setSvg("");
                setRenderError(false);
                return;
            }

            try {
                const mermaid = (await import("mermaid")).default;
                const p = isDark ? MERMAID_PALETTE.dark : MERMAID_PALETTE.light;

                mermaid.initialize({
                    startOnLoad: false,
                    theme: "base",
                    securityLevel: "loose",
                    fontFamily:
                        "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
                    themeVariables: {
                        background: p.bg,
                        primaryColor: p.surface,
                        primaryTextColor: p.text,
                        primaryBorderColor: p.border,
                        secondaryColor: p.surface,
                        tertiaryColor: p.bg,
                        mainBkg: p.surface,
                        secondBkg: p.bg,
                        lineColor: p.line,
                        textColor: p.text,
                        nodeBorder: p.border,
                        clusterBkg: p.bg,
                        clusterBorder: p.line,
                        titleColor: p.text,
                        edgeLabelBackground: p.bg,
                        labelBoxBkgColor: p.surface,
                        labelBoxBorderColor: p.border,
                        actorBkg: p.surface,
                        actorBorder: p.border,
                        actorTextColor: p.text,
                        signalColor: p.line,
                        signalTextColor: p.text,
                        noteBkgColor: p.surface,
                        noteBorderColor: p.line,
                        noteTextColor: p.text,
                    },
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true,
                    },
                    sequence: {
                        useMaxWidth: true,
                        mirrorActors: true,
                    },
                    gitGraph: {
                        useMaxWidth: true,
                    },
                });

                const { svg: renderedSvg } = await mermaid.render(
                    `${diagramId}-${isDark ? "d" : "l"}`,
                    content,
                );

                if (!isCancelled) {
                    setSvg(renderedSvg);
                    setRenderError(false);
                }
            } catch (error) {
                console.error("Error rendering Mermaid diagram:", error);
                if (!isCancelled) {
                    setSvg("");
                    setRenderError(true);
                }
            }
        };

        void renderDiagram();

        return () => {
            isCancelled = true;
        };
    }, [content, diagramId, isDark]);

    return (
        <div className="flex justify-center my-6 w-full">
            {svg ? (
                <div
                    className="w-full flex justify-center overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            ) : (
                <div className="w-full flex justify-center overflow-x-auto">
                    <pre className="w-full overflow-x-auto rounded-md border border-border/60 bg-muted/30 p-4 text-xs">
                        <code>{renderError ? "Failed to render Mermaid diagram." : content}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}
