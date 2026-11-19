import Image from "next/image";
import {Globe} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {GitHubIcon} from "@/components/social-icons";
import type {CatalogProject} from "@/data/projects";

interface ProjectGridProps {
    projects: CatalogProject[];
    appearance?: "plain" | "cards";
}

export default function ProjectGrid({projects, appearance = "cards"}: ProjectGridProps) {
    const cards = appearance === "cards";
    const Surface = cards ? Card : "div";
    const Header = cards ? CardHeader : "div";
    const Content = cards ? CardContent : "div";
    const Footer = cards ? CardFooter : "div";

    return (
        <ul className={`grid sm:grid-cols-2 lg:grid-cols-3 ${cards ? "gap-4 lg:gap-5" : "gap-x-8 gap-y-7 lg:gap-x-12"}`}>
            {projects.map(({title, excerpt, link, tags, logo}) => (
                <li key={link} className="min-w-0">
                    <a href={link} target="_blank" rel="noopener noreferrer"
                       className={`group block h-full ${cards ? "rounded-xl" : "rounded-sm"}`}>
                        <Surface className={cards
                            ? "h-full group-hover:border-brand/50 group-hover:bg-accent/25 motion-safe:transition-colors"
                            : "flex h-full flex-col gap-2.5 py-1"}>
                            <Header className="flex min-h-10 items-center justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    {logo && <ProjectLogo logo={logo}/>}
                                    <h3 className={`min-w-0 wrap-break-word font-semibold leading-snug group-hover:text-brand ${cards ? "" : "text-lg group-hover:underline group-hover:underline-offset-4"}`}>{title}</h3>
                                </div>
                                <ProjectDestination link={link}/>
                            </Header>
                            <Content>
                                <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
                            </Content>
                            {tags.length > 0 && (
                                <Footer className="mt-auto pt-1">
                                    <ul aria-label="Project topics" className={`flex flex-wrap ${cards ? "gap-1.5" : "gap-x-3 gap-y-1"}`}>
                                        {tags.map((tag) => (
                                            <li key={tag} className="font-mono text-xs text-muted-foreground">
                                                {cards ? <Badge>{tag}</Badge> : tag}
                                            </li>
                                        ))}
                                    </ul>
                                </Footer>
                            )}
                        </Surface>
                    </a>
                </li>
            ))}
        </ul>
    );
}

function ProjectDestination({link}: {link: string}) {
    const isRepository = new URL(link).hostname === "github.com";
    const Icon = isRepository ? GitHubIcon : Globe;

    return (
        <>
            <Icon aria-hidden="true" className="size-[1.1rem] shrink-0 text-muted-foreground group-hover:text-brand"/>
            <span className="sr-only">{isRepository ? "GitHub repository" : "Project website"} (opens in a new tab)</span>
        </>
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
