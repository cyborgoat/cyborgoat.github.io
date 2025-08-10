"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/animation/DecryptedText";
import TextPressure from "../animation/TextPressure";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const LightBeams = dynamic(
    () => import("@/components/animation/LightBeams"),
    { ssr: false }
);

export default function Hero() {
    const { resolvedTheme } = useTheme();

    return (
        <section className="relative w-full min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center bg-zinc-100 dark:bg-muted/40 overflow-hidden">
            <LightBeams className="absolute inset-0 z-0" sizePercent={80} themeMode={resolvedTheme === "light" ? "light" : "dark"} />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white dark:text-primary">
                            <TextPressure
                                text="Cyborgoat"
                                flex={true}
                                alpha={false}
                                stroke={false}
                                width={true}
                                weight={true}
                                italic={true}
                                textColor="#ffffff"
                                strokeColor="#ff0000"
                                minFontSize={36}
                            />
                        </h1>
                        <p className="mx-auto max-w-[700px] text-white/80 dark:text-foreground/80 text-lg md:text-xl">
                            <DecryptedText
                                text="AI Engineer & Fullstack Enthusiast."
                                animateOn="view"
                                revealDirection="start"
                                sequential={true}
                                speed={10}
                            />
                        </p>
                    </div>
                    <div className="space-x-4 pt-4">
                        <Button asChild size="lg">
                            <Link href="/project" prefetch={false}>
                                View Projects
                            </Link>
                        </Button>
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="/blog" prefetch={false}>
                                View Blogs
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
