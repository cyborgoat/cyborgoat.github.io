import type {Metadata} from "next";
import ProjectGrid from "@/components/layout/ProjectGrid";
import {projects} from "@/data/projects";

export const metadata: Metadata = {title: "Projects"};

export default function ProjectMainPage() {
    return (
        <div className="project-shell page-spacing">
            <header className="mb-7 sm:mb-10">
                <h1 className="page-title">Projects</h1>
                <p className="mt-3 max-w-[65ch] leading-relaxed text-muted-foreground">
                    Local-first apps, tools for working with AI, and research experiments.
                </p>
            </header>
            <section aria-labelledby="project-index">
                <h2 id="project-index" className="sr-only">Project index</h2>
                <ProjectGrid projects={projects}/>
            </section>
        </div>
    );
}
