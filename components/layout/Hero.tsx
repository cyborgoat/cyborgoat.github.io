"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/animation/DecryptedText";
import TextPressure from "../animation/TextPressure";
import React from "react";
import dynamic from "next/dynamic";

const LightBeams = dynamic(
    () => import("@/components/animation/LightBeams"),
    { ssr: false }
);

export default function Hero() {
    return (
        <section className="relative w-full min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center bg-background overflow-hidden">
            <LightBeams className="absolute inset-0 z-0" sizePercent={80} themeMode="dark" />
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-4">
                        <div className="w-full">
                            <TextPressure
                                text="Junxiao Guo"
                                flex={true}
                                alpha={false}
                                stroke={false}
                                width={true}
                                weight={true}
                                italic={true}
                                className="!text-foreground tracking-[-0.06em] font-black"
                                minFontSize={44}
                            />
                        </div>
                        <p className="mx-auto max-w-[760px] text-foreground/70 text-base md:text-lg">
                            <DecryptedText
                                text="AI Engineer & Fullstack Enthusiast."
                                animateOn="view"
                                revealDirection="start"
                                sequential={true}
                                speed={10}
                            />
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
