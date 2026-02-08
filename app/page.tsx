'use client';

import Hero from '@/components/layout/Hero';
import AnchorMenu from '@/components/layout/AnchorMenu';
import {
    Bike,
    BrainCircuit,
    CheckCircle,
    Clock,
    Cloud,
    Code,
    ExternalLink,
    Github,
    GraduationCap,
    Linkedin,
    Music,
    Rocket,
    Trophy,
    Zap
} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {
    getAboutMe,
    getAllSkills,
    getCompletedProjects,
    getEducation,
    getFeaturedProject,
    getHobbies,
    getOngoingProjects
} from '@/lib/portfolio';

// Icon mapping for dynamic icon rendering
const iconMap = {
    Bike, BrainCircuit, Cloud, Code, GraduationCap, Music, Trophy,
    Github, Linkedin, ExternalLink, Zap, Rocket, CheckCircle, Clock
};

const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Code;
};

export default function HomePage() {
    const aboutMe = getAboutMe();
    const featuredProject = getFeaturedProject();
    const ongoingProjects = getOngoingProjects();
    const completedProjects = getCompletedProjects();
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
            <div data-speed="1.05">
                <Hero/>
            </div>

            {/* About Me Section */}
            <section id="about" data-speed="0.9" className="w-full py-16 md:py-28 lg:py-32 border-t border-border/60 scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                        <div className="space-y-5 lg:col-span-7 fade-on-scroll">
                            <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl text-foreground">
                                {aboutMe.title}
                            </h2>
                            <p className={cn("text-foreground/70", "leading-relaxed md:text-lg") }>
                                {aboutMe.description}
                            </p>
                            <p className={cn("text-foreground/70", "leading-relaxed md:text-lg") }>
                                {aboutMe.experience}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 pt-4">
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
                                            <IconComponent className="w-5 h-5"/>
                                            <span>{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-center justify-center lg:col-span-5">
                            <Avatar className="w-48 h-48 lg:w-64 lg:h-64 border border-border/60 shadow-sm">
                                <AvatarImage
                                    src={aboutMe.authorImage ?? "/images/authors/cyborgoat-avatar.png"}
                                    alt="Junxiao Guo"
                                />
                                <AvatarFallback className="text-4xl">JG</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Project: Swarm */}
            <section id="featured" data-speed="1.05" className="w-full py-16 md:py-28 lg:py-32 bg-muted/30 border-t border-border/60 scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="text-center mb-12 fade-on-scroll">
                        <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl text-foreground mb-4">
                            Featured Project: {featuredProject.title}
                        </h2>
                        <p className="text-foreground/70 max-w-3xl mx-auto text-base md:text-lg">
                            Dive
                            into <strong>{featuredProject.title}</strong>, {featuredProject.description.split('.')[0]}.
                        </p>
                    </div>
                    <Card className="max-w-4xl mx-auto border border-border/60 bg-card/90 shadow-sm transition-shadow duration-300 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const IconComponent = getIconComponent(featuredProject.icon);
                                    return <IconComponent className="w-8 h-8 text-primary"/>;
                                })()}
                                <div>
                                    <CardTitle className="text-2xl">{featuredProject.title}</CardTitle>
                                    <CardDescription>Interactive Web Browsing & AI Automation</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-foreground/70 leading-relaxed">
                                {featuredProject.description}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {featuredProject.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <a
                                href={featuredProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                                <ExternalLink className="w-4 h-4"/>
                                Explore {featuredProject.title} on GitHub
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Projects Showcase */}
            <section id="projects" data-speed="0.95" className="w-full py-16 md:py-28 lg:py-32 border-t border-border/60 scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="text-center mb-12 fade-on-scroll">
                        <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl text-foreground">
                            Projects Showcase
                        </h2>
                        <p className="mt-3 text-foreground/70 text-base md:text-lg">
                            A focused view of my active builds and completed milestones.
                        </p>
                    </div>

                    {/* Ongoing Ventures */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">
                            <Clock className="w-6 h-6"/>
                            Ongoing Ventures
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ongoingProjects.map((project) => {
                                const IconComponent = getIconComponent(project.icon);
                                return (
                                    <Card key={project.id} className="border border-border/60 shadow-sm transition-shadow duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <IconComponent className="w-5 h-5 text-primary"/>
                                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                                {project.description}
                                            </p>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80 text-sm transition-colors duration-200"
                                            >
                                                View on GitHub →
                                            </a>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Completed Milestones */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">
                            <CheckCircle className="w-6 h-6"/>
                            Completed Milestones
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {completedProjects.map((project) => {
                                const IconComponent = getIconComponent(project.icon);
                                return (
                                    <Card key={project.id} className="border border-border/60 shadow-sm transition-shadow duration-300 hover:shadow-md">
                                        <CardHeader>
                                            <div className="flex items-center gap-2">
                                                <IconComponent className="w-5 h-5 text-primary"/>
                                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                                {project.description}
                                            </p>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80 text-sm transition-colors duration-200"
                                            >
                                                View on GitHub →
                                            </a>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack & Skills */}
            <section id="skills" data-speed="1.1" className="w-full py-16 md:py-28 lg:py-32 bg-muted/30 border-t border-border/60 scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl text-center mb-12 text-foreground fade-on-scroll">
                        My Tech Stack & Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill) => {
                            const IconComponent = getIconComponent(skill.icon);
                            return (
                                <Card key={skill.id} className="flex flex-col border border-border/60 shadow-sm transition-shadow duration-300 hover:shadow-md">
                                    <CardHeader className="items-center pb-4">
                                        <IconComponent className="w-10 h-10 mb-4 text-primary"/>
                                        <CardTitle>{skill.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
                                            {skill.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {skill.technologies.map((tech) => (
                                                <Badge key={tech} variant="outline">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Education & Hobbies */}
            <section id="background" data-speed="0.9" className="w-full py-16 md:py-28 lg:py-32 border-t border-border/60 scroll-mt-20">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl mb-8 text-foreground fade-on-scroll">
                            Education
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => {
                                const IconComponent = getIconComponent(edu.icon);
                                return (
                                    <Card key={edu.id} className="border border-border/60 shadow-sm">
                                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                            <Avatar>
                                                <AvatarFallback>
                                                    <IconComponent/>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <CardTitle className="text-base font-semibold">
                                                    {edu.institution}
                                                </CardTitle>
                                                <CardDescription>
                                                    {edu.degree} ({edu.year})
                                                </CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                {edu.field}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl mb-8 text-foreground fade-on-scroll">
                            Hobbies
                        </h2>
                        <div className="space-y-4">
                            {hobbies.map((hobby) => {
                                const IconComponent = getIconComponent(hobby.icon);
                                return (
                                    <div key={hobby.id} className="flex items-center gap-4">
                                        <IconComponent className="w-6 h-6 text-primary flex-shrink-0"/>
                                        <p className="text-foreground/70 leading-relaxed">
                                            {hobby.title} - {hobby.description}
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