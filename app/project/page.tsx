import React from "react";
import fs from "fs";
import path from "path";
import { ArrowUpRight } from "lucide-react";

type Project = {
    title: string;
    excerpt: string;
    thumbnail: string;
    link: string;
};

export default async function ProjectMainPage() {
    // Load projects data from the data folder
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const json = fs.readFileSync(filePath, "utf8");
    const projects: Project[] = JSON.parse(json);

    return (
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
            <header className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                    Projects
                </p>
                <h1 className="mt-4 font-serif text-4xl font-normal tracking-[-0.02em] text-foreground sm:text-5xl">
                    Things I&rsquo;ve built
                </h1>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Local-first apps, agent tooling, and research experiments &mdash; newest
                    first. Each links out to its repository.
                </p>
            </header>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[--radius] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                    <a
                        key={idx}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col bg-background p-6 transition-colors hover:bg-accent/40"
                    >
                        <h2 className="font-serif text-xl font-normal text-foreground">
                            {project.title}
                        </h2>
                        <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground line-clamp-5">
                            {project.excerpt}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-1 text-sm text-brand transition-opacity group-hover:opacity-70">
                            Go to project
                            <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
