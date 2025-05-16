"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/animation/DecryptedText";
import TextPressure from "../animation/TextPressure";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions, Container } from "@tsparticles/engine";

const FIXED_PARTICLE_COLOR = "#888888";

export default function Hero() {
    const [init, setInit] = useState(false);
    useEffect(() => {
        console.log("Attempting to initialize particles engine...");
        initParticlesEngine(async (engine: Engine) => {
            console.log("Particle engine starting to load slim bundle...");
            await loadSlim(engine);
            console.log("Particle engine slim bundle loaded.");
        })
            .then(() => {
                console.log("Particle engine initialized successfully.");
                setInit(true);
            })
            .catch((error) => {
                console.error("Particle engine initialization failed:", error);
            });
    }, []);

    const particlesLoaded = useCallback(
        async (container?: Container): Promise<void> => {
            console.log("Particles loaded, container:", container);
            await Promise.resolve(); // Placeholder if no async actions needed, to satisfy Promise<void>
        },
        []
    );

    const particleOptions: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse", // "repulse" is a common hover effect
                    },
                },
                modes: {
                    push: {
                        quantity: 2, // Number of particles to push on click
                    },
                    repulse: {
                        distance: 100, // Distance of repulse effect
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: FIXED_PARTICLE_COLOR,
                },
                links: {
                    color: FIXED_PARTICLE_COLOR,
                    distance: 150,
                    enable: true,
                    opacity: 0.4, // Keep this opacity
                    width: 1,
                },
                collisions: {
                    enable: false, // Disabled for a smoother, less busy effect
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce", // Particles bounce off canvas edges
                    },
                    random: false,
                    speed: 1, // Slow movement speed
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800, // Higher area means fewer particles for a given value
                    },
                    value: 80, // Increased particle count from 30 to 80
                },
                opacity: {
                    value: 0.5, // Adjusted for a fixed gray
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 2 }, // Smaller particles
                },
            },
            detectRetina: true,
            fullScreen: { enable: false }, // Added to ensure it respects container boundaries
        }),
        []
    ); // No dependencies needed now for particleOptions related to color

    console.log("Hero component rendering. Init state:", init);

    return (
        <section className="relative w-full min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center bg-muted/40 overflow-hidden">
            {init ? (
                <Particles
                    id="tsparticles"
                    options={particleOptions}
                    particlesLoaded={particlesLoaded} // Using particlesLoaded as per docs
                    className="absolute inset-0 -z-10" // Ensure it's behind other content
                />
            ) : (
                <div
                    style={{
                        color: "red",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                    }}
                >
                    Particles not initialized yet.
                </div> // Debug message
            )}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {" "}
                {/* Content on top */}
                <div className="flex flex-col items-center space-y-6 text-center">
                    {" "}
                    <div className="space-y-3">
                        {" "}
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-primary">
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
                        <p className="mx-auto max-w-[700px] text-foreground/80 text-lg md:text-xl">
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
