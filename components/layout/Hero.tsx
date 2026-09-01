import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="w-full border-b border-border">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex min-h-[72vh] flex-col justify-center py-20 fade-on-scroll">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                        Junxiao Guo <span className="text-muted-foreground">/ AI Engineer</span>
                    </p>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl">
                        Building local-first tools for knowledge and agents.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        I work at the intersection of AI, real-time web, and creative
                        applications&nbsp;&mdash; designing systems that keep people in
                        control of their data and their workflows.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Button asChild size="lg">
                            <Link href="/project" prefetch={false}>
                                View projects
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/blog" prefetch={false}>
                                Read writing
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
