import Image from "next/image";
import {GitHubIcon} from "@/components/social-icons";
import type {CatalogProject} from "@/data/projects";

interface ProjectGridProps {
    projects: CatalogProject[];
    appearance?: "plain" | "cards";
}

export default function ProjectGrid({projects, appearance = "cards"}: ProjectGridProps) {
    const cards = appearance === "cards";
    return (
        <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 ${cards ? "gap-3" : "gap-x-8 gap-y-6 lg:gap-x-12"}`}>
            {projects.map(({title, excerpt, link, tags, logo}) => (
                <li key={link} className="min-w-0">
                    <a href={link} target="_blank" rel="noopener noreferrer"
                       className={`group flex h-full flex-col motion-safe:duration-200 ${cards
                           ? "rounded-xl border border-rule bg-card p-4 hover:border-brand/55 hover:bg-accent/45 motion-safe:transition-[background-color,border-color,translate] motion-safe:hover:-translate-y-0.5"
                           : "py-1"}`}>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                {logo && <ProjectLogo logo={logo}/>}
                                <h3 className={`font-semibold leading-snug group-hover:text-brand ${cards ? "" : "text-lg group-hover:underline group-hover:underline-offset-4"}`}>{title}</h3>
                            </div>
                            <GitHubIcon className="mt-0.5 size-[1.1rem] shrink-0 text-muted-foreground group-hover:text-brand"/>
                            <span className="sr-only">GitHub repository (opens in a new tab)</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
                        {tags.length > 0 && (
                            <ul aria-label="Project topics" className={`mt-auto flex flex-wrap pt-3 ${cards ? "gap-1.5" : "gap-x-3 gap-y-1"}`}>
                                {tags.map((tag) => (
                                    <li key={tag} className={`font-mono text-xs text-muted-foreground ${cards ? "rounded-sm bg-muted px-1.5 py-0.5" : ""}`}>{tag}</li>
                                ))}
                            </ul>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ProjectLogo({logo}: {logo: NonNullable<CatalogProject["logo"]>}) {
    const imageClass = logo.cropWordmark
        ? "absolute top-1/2 -left-[7px] h-auto w-[11.25rem] max-w-none -translate-y-1/2"
        : "size-full object-contain";
    const width = logo.cropWordmark ? 180 : 40;
    const height = logo.cropWordmark ? 60 : 40;

    return (
        <span aria-hidden="true" className="relative size-10 shrink-0 overflow-hidden">
            <Image src={logo.url} alt="" width={width} height={height}
                   className={`${imageClass} ${logo.darkUrl ? "dark:hidden" : ""}`}/>
            {logo.darkUrl && (
                <Image src={logo.darkUrl} alt="" width={width} height={height}
                       className={`${imageClass} hidden dark:block`}/>
            )}
        </span>
    );
}
