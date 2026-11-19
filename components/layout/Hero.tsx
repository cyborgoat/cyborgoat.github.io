import Image from "next/image";
import Link from "next/link";
import {Terminal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {profile} from "@/data/site";

export default function Hero() {
    return (
        <section id="intro" aria-labelledby="intro-title"
                 className="home-hero grid min-w-0 grid-cols-[minmax(0,1fr)_5rem] gap-x-4 gap-y-5 pb-10 pt-7 sm:gap-x-8 sm:pb-14 sm:pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:content-center md:items-center md:gap-y-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-x-16 lg:pb-20 lg:pt-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
            <div className="col-start-1 row-start-1 self-center md:self-end">
                <p className="flex items-center gap-2 font-mono text-sm text-brand">
                    <Terminal aria-hidden="true" className="size-4 shrink-0"/>
                    cyborgoat
                </p>
                <h1 id="intro-title" className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[clamp(3rem,6.5vw,5.25rem)]">
                    {profile.name}
                </h1>
                <p className="mt-3 text-base font-medium leading-snug sm:text-lg">AI developer &amp; software engineer</p>
            </div>
            <div className="col-start-2 row-start-1 self-center md:row-span-2">
                <Image src={profile.portrait} alt={profile.name} width={460} height={460}
                       preload className="hero-portrait aspect-square w-full rounded-lg object-cover"/>
            </div>
            <div className="col-span-2 md:col-span-1 md:col-start-1 md:row-start-2 md:self-start">
                <p className="max-w-[49ch] leading-relaxed text-muted-foreground md:mt-4">
                    I build software that saves people time in everyday life. I’m curious about how new technology works, and I write about what I learn along the way.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-6">
                    <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                        <a href="#projects">Explore projects</a>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/blog">Read my writing</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
