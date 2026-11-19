import Link from "next/link";
import Hero from "@/components/layout/Hero";
import ProjectGrid from "@/components/layout/ProjectGrid";
import AnchorMenu from "@/components/layout/AnchorMenu";
import {getAllPosts} from "@/lib/posts";
import {profile} from "@/data/site";
import {selectedProjects} from "@/data/projects";
import {articlePath, formatPostDate} from "@/lib/post-display";

export default function HomePage() {
    const posts = getAllPosts().slice(0, 3);
    const [cmu, drexel] = profile.education;

    const sections = [
        {id: "intro", label: "Intro"},
        {id: "projects", label: "Projects"},
        ...(posts.length > 0 ? [{id: "writing", label: "Writing"}] : []),
        {id: "about", label: "About"},
    ];

    return (
        <div className="wide-shell grid gap-y-5 pb-16 pt-4 sm:pt-7 xl:grid-cols-[9rem_minmax(0,1fr)] xl:gap-x-12">
            <div className="min-w-0 xl:col-start-2 xl:row-start-1"><Hero/></div>
            <aside className="min-w-0 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:pt-6">
                <AnchorMenu sections={sections}/>
            </aside>
            <div className="min-w-0 xl:col-start-2 xl:row-start-2">
                <section id="projects" className="home-reveal pt-2">
                    <div id="featured" className="section-heading">
                        <h2 className="section-title">Selected projects</h2>
                        <Link className="text-link" href="/project">All projects</Link>
                    </div>
                    <ProjectGrid projects={selectedProjects} appearance="plain"/>
                </section>
                {posts.length > 0 && (
                    <section id="writing" className="home-reveal pt-12 sm:pt-16 lg:pt-20">
                        <div className="section-heading">
                            <h2 className="section-title">Recent writing</h2>
                            <Link className="text-link" href="/blog">All writing</Link>
                        </div>
                        <ul className="space-y-2">
                            {posts.map(({metadata}) => (
                                <li key={metadata.slug}>
                                    <Link href={articlePath(metadata)} className="group grid gap-1.5 rounded-sm py-2.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                                        <time className="meta-text sm:pt-0.5" dateTime={metadata.date}>{formatPostDate(metadata.date)}</time>
                                        <span className="font-medium group-hover:text-brand">{metadata.title ?? metadata.slug}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section id="about" className="home-reveal pt-12 sm:pt-16 lg:pt-20" aria-labelledby="about-title">
                    <h2 id="about-title" className="section-title">About</h2>
                    <p className="mt-3 max-w-[70ch] leading-relaxed text-muted-foreground">
                        I’m an AI developer and software engineer, and I lead a team working on language models and AI agents. My work includes building agent frameworks and optimizing models. I’m especially interested in the engineering that makes AI useful in everyday tools, from how an agent runs a workflow to how a local app retrieves the right information.
                    </p>
                    <p id="skills" className="mt-3 max-w-[70ch] leading-relaxed text-muted-foreground">
                        I work across the stack with Python, TypeScript, Java, and Rust, and with databases including PostgreSQL and SQLite. I build desktop and web apps as well as backend systems. In Nest, for example, that means bringing Markdown editing, offline search, and AI chat together in a local-first workspace.
                    </p>
                    <p id="background" className="mt-3 max-w-[70ch] leading-relaxed text-muted-foreground">
                        I studied electrical and computer engineering at {cmu.displayName} and physics at {drexel.displayName}. Away from my desk, I like cycling, making music, and golfing.
                    </p>
                </section>
            </div>
        </div>
    );
}
