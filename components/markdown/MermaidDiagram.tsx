"use client";
import React, { useEffect, useMemo, useState } from "react";

interface MermaidDiagramProps {
    content: string;
}

export default function MermaidDiagram({ content }: MermaidDiagramProps) {
    const [svg, setSvg] = useState<string>("");
    const [renderError, setRenderError] = useState(false);

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

                mermaid.initialize({
                    startOnLoad: false,
                    theme: "dark",
                    securityLevel: "loose",
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

                const { svg: renderedSvg } = await mermaid.render(diagramId, content);

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
    }, [content, diagramId]);

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
