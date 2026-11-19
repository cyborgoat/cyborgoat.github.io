"use client";

import {profile, weeklyFrontierUrl} from "@/data/site";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {ThemeToggleButton} from "@/components/theme-toggle-button";
import {GitHubIcon} from "@/components/social-icons";

const links = [
    {href: "/", label: "Home"},
    {href: "/project", label: "Projects"},
    {href: "/blog", label: "Blog"},
    {href: weeklyFrontierUrl, label: "Weekly Frontier"},
];

export default function Header() {
    const path = usePathname();
    const current = (href: string) => path === href || (href !== "/" && path.startsWith(href + "/"));

    return (
        <header className="sticky top-0 z-50 border-b border-rule bg-background/95 backdrop-blur-sm">
            <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-background focus:p-3" href="#main-content">Skip to content</a>
            <div className="wide-shell flex h-16 items-center justify-between gap-2 md:grid md:grid-cols-[1fr_auto_1fr]">
                <Link href="/" className="w-fit shrink-0 text-sm font-semibold tracking-tight sm:text-base">
                    {profile.name}
                </Link>
                <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
                    {links.map(({href, label}) => (
                        <Link key={href} href={href} aria-current={current(href) ? "page" : undefined}
                              className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground aria-[current=page]:font-semibold aria-[current=page]:text-brand">{label}</Link>
                    ))}
                </nav>
                <div className="flex items-center gap-0.5 justify-self-end">
                    <Button variant="ghost" size="icon" asChild>
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                            <GitHubIcon className="size-[1.15rem]"/>
                        </a>
                    </Button>
                    <ThemeToggleButton/>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="size-5"/></Button>
                            </SheetTrigger>
                            <SheetContent aria-describedby={undefined} className="p-6 motion-reduce:animate-none motion-reduce:transition-none">
                                <SheetTitle className="meta-text">Menu</SheetTitle>
                                <nav aria-label="Main navigation" className="grid">
                                    {links.map(({href, label}) => (
                                        <SheetClose key={href} asChild>
                                            <Link href={href} aria-current={current(href) ? "page" : undefined}
                                                  className="flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent aria-[current=page]:bg-accent aria-[current=page]:text-brand">{label}</Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
