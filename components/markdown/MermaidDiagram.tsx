"use client";
import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
    content: string;
}

export default function MermaidDiagram({ content }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!mermaidRef.current || !content) return;

            try {
                // Initialize mermaid with responsive configuration
                mermaid.initialize({
                    startOnLoad: true,
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

                // Clear previous content
                mermaidRef.current.innerHTML = content;
                
                // Render the diagram
                await mermaid.contentLoaded();
            } catch (error) {
                console.error("Error rendering Mermaid diagram:", error);
            }
        };

        renderDiagram();
    }, [content]);

    return (
        <div
            ref={containerRef}
            className="flex justify-center my-6 w-full"
        >
            <div
                ref={mermaidRef}
                className="mermaid w-full flex justify-center overflow-x-auto"
            />
        </div>
    );
}
