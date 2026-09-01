'use client';

import Hero from '@/components/layout/Hero';
import AnchorMenu from '@/components/layout/AnchorMenu';
import {
    Bike,
    BookMarked,
    Boxes,
    BrainCircuit,
    CheckCircle,
    Clock,
    Cloud,
    Code,
    ExternalLink,
    GraduationCap,
    Link2,
    Mic,
    Music,
    Rocket,
    Trophy,
    Zap
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {
    getAboutMe,
    getAllSkills,
    getCurrentProjects,
    getEarlierProjects,
    getEducation,
    getFeaturedProjects,
    getHobbies
} from '@/lib/portfolio';

// Icon mapping for dynamic icon rendering
const iconMap = {
    Bike, BookMarked, Boxes, BrainCircuit, Cloud, Code, GraduationCap, Mic, Music, Trophy,
    Github: ExternalLink,
    Linkedin: Link2,
    ExternalLink,
    Zap,
    Rocket,
    CheckCircle,
    Clock
};

const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Code;
};

const eyebrow = "font-mono text-xs uppercase tracking-[0.22em] text-brand";
const heading = "font-serif text-3xl font-normal tracking-[-0.01em] text-foreground sm:text-4xl";
const cellCard =
    "flex flex-col rounded-[--radius] border border-border bg-card p-6 transition-colors hover:border-foreground/30 hover:bg-accent/40";
const githubLink =
    "mt-4 inline-flex items-center gap-1 text-sm text-brand transition-opacity hover:opacity-70";

export default function HomePage() {
    const aboutMe = getAboutMe();
    const featuredProjects = getFeaturedProjects();
    const currentProjects = getCurrentProjects();
    const earlierProjects = getEarlierProjects();
    const skills = getAllSkills();
    const education = getEducation();
    const hobbies = getHobbies();

    const anchorSections = [
        { id: 'about', label: 'About' },
        { id: 'featured', label: 'Featured' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'background', label: 'Background' },
    ];

    return (
        <main className="flex-1">
            <AnchorMenu
                sections={anchorSections}
                position="fixed"
                className="hidden lg:block"
            />

            <Hero/>

            {/* About Me Section */}
            <section id="about" className="w-full py-16 md:py-24 border-t border-border scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
                        <div className="space-y-5 lg:col-span-7 fade-on-scroll">
                            <p className={eyebrow}>About</p>
                            <h2 className={heading}>{aboutMe.title}</h2>
                            <p className="text-muted-foreground leading-relaxed md:text-lg">
                                {aboutMe.description}
                            </p>
                            <p className="text-muted-foreground leading-relaxed md:text-lg">
                                {aboutMe.experience}
                            </p>
                            <div className="flex flex-wrap items-center gap-5 pt-2">
                                {aboutMe.socialLinks.map((link) => {
                                    const IconComponent = getIconComponent(link.icon);
                                    return (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
                                        >
                                            <IconComponent className="w-4 h-4"/>
                                            <span>{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-start justify-center lg:col-span-5">
                            <Avatar className="w-44 h-44 lg:w-60 lg:h-60 rounded-[--radius] border border-border">
                                <AvatarImage
                                    src={aboutMe.authorImage ?? "/images/authors/cyborgoat-avatar.png"}
                                    alt="Junxiao Guo"
                                    className="rounded-[--radius]"
                                />
                                <AvatarFallback className="text-4xl rounded-[--radius]">JG</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section id="featured" className="w-full py-16 md:py-24 border-t border-border scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="mb-10 fade-on-scroll">
                        <p className={eyebrow}>Selected work</p>
                        <h2 className={cn(heading, "mt-4")}>Two projects I keep coming back to</h2>
                        <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
                            Local-first desktop tools built with Tauri&nbsp;v2 &mdash; private by
                            default, and shaped by daily use.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {featuredProjects.map((project) => {
                            const IconComponent = getIconComponent(project.icon);
                            return (
                                <div key={project.id} className={cn(cellCard, "p-8")}>
                                    <div className="flex items-center gap-3">
                                        <IconComponent className="w-6 h-6 text-brand"/>
                                        <h3 className="font-serif text-2xl font-normal text-foreground">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">{tag}</Badge>
                                        ))}
                                    </div>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={githubLink}
                                    >
                                        View on GitHub
                                        <ExternalLink className="w-3.5 h-3.5"/>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section id="projects" className="w-full py-16 md:py-24 border-t border-border scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="mb-10 fade-on-scroll">
                        <p className={eyebrow}>Currently</p>
                        <h2 className={cn(heading, "mt-4")}>What I&rsquo;m building now</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentProjects.map((project) => {
                            const IconComponent = getIconComponent(project.icon);
                            return (
                                <div key={project.id} className={cellCard}>
                                    <div className="flex items-center gap-2">
                                        <IconComponent className="w-5 h-5 text-brand"/>
                                        <h3 className="font-serif text-xl font-normal text-foreground">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">{tag}</Badge>
                                        ))}
                                    </div>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={githubLink}
                                    >
                                        View on GitHub
                                        <ExternalLink className="w-3.5 h-3.5"/>
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {/* Earlier work */}
                    <div className="mt-16 fade-on-scroll">
                        <p className={eyebrow}>Earlier work</p>
                        <ul className="mt-6 divide-y divide-border border-y border-border">
                            {earlierProjects.map((project) => (
                                <li key={project.id}>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col gap-1 py-4 transition-colors hover:bg-accent/40 sm:flex-row sm:items-baseline sm:gap-6"
                                    >
                                        <span className="font-serif text-lg font-normal text-foreground shrink-0 sm:w-56">
                                            {project.title}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {project.description}
                                        </span>
                                        <ExternalLink className="hidden w-3.5 h-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:ml-auto sm:block sm:self-center"/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tech Stack & Skills */}
            <section id="skills" className="w-full py-16 md:py-24 border-t border-border scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="mb-10 fade-on-scroll">
                        <p className={eyebrow}>Toolkit</p>
                        <h2 className={cn(heading, "mt-4")}>Tech stack &amp; skills</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill) => {
                            const IconComponent = getIconComponent(skill.icon);
                            return (
                                <div key={skill.id} className={cellCard}>
                                    <IconComponent className="w-7 h-7 mb-4 text-brand"/>
                                    <h3 className="font-serif text-lg font-normal text-foreground">
                                        {skill.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                        {skill.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {skill.technologies.map((tech) => (
                                            <Badge key={tech} variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Education & Hobbies */}
            <section id="background" className="w-full py-16 md:py-24 border-t border-border scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
                    <div className="fade-on-scroll">
                        <p className={eyebrow}>Background</p>
                        <h2 className={cn(heading, "mt-4 mb-8")}>Education</h2>
                        <div className="space-y-4">
                            {education.map((edu) => {
                                const IconComponent = getIconComponent(edu.icon);
                                return (
                                    <div key={edu.id} className="rounded-[--radius] border border-border bg-card p-5">
                                        <div className="flex items-center gap-3">
                                            <IconComponent className="w-5 h-5 text-brand"/>
                                            <div>
                                                <h3 className="font-serif text-base font-normal text-foreground">
                                                    {edu.institution}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {edu.degree} ({edu.year})
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {edu.field}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="fade-on-scroll">
                        <p className={eyebrow}>Off the clock</p>
                        <h2 className={cn(heading, "mt-4 mb-8")}>Hobbies</h2>
                        <div className="space-y-4">
                            {hobbies.map((hobby) => {
                                const IconComponent = getIconComponent(hobby.icon);
                                return (
                                    <div key={hobby.id} className="flex items-center gap-4">
                                        <IconComponent className="w-5 h-5 text-brand flex-shrink-0"/>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {hobby.title} &mdash; {hobby.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
