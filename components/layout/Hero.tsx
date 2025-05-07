// /components/layout/hero.tsx
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
              Cyborgoat
            </h1>
            <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
              AI Engineer & Fullstack Enthusiast. Building the future, one line
              of code at a time.
            </p>
          </div>
          <div className="space-x-4 pt-4">
            <Link
              href="/project"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Projects
            </Link>
            <Link
              href="/contact" // Example contact link
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
