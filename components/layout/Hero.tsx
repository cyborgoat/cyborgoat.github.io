import Link from 'next/link';
import {Button} from "@/components/ui/button"; // Import shadcn Button

export default function Hero() {
    return (
        <section className="w-full min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center bg-muted/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-6 text-center"> {/* Increased space-y */}
                    <div className="space-y-3"> {/* Adjusted space-y */}
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-primary">
                            Cyborgoat
                        </h1>
                        <p className="mx-auto max-w-[700px] text-foreground/80 text-lg md:text-xl">
                            AI Engineer & Fullstack Enthusiast. Building the future, one line of code at a time.
                        </p>
                    </div>
                    <div className="space-x-4 pt-4">
                        <Button asChild size="lg">
                            <Link href="/project" prefetch={false}>
                                View Projects
                            </Link>
                        </Button>
                        {/* Example Secondary Button */}
                        <Button variant="secondary" size="lg" asChild>
                            <Link href="/contact" prefetch={false}>
                                Contact Me
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
