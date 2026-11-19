import {Button} from "@/components/ui/button";
import {GitHubIcon, LinkedInIcon} from "@/components/social-icons";
import {Rss} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-background">
            <div
                className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    {/* Logo can go here too if desired */}
                    {/* <MountainIcon className="h-6 w-6" /> */}
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {currentYear} Cyborgoat. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <a href="https://github.com/cyborgoat" target="_blank" rel="noopener noreferrer"
                           aria-label="GitHub (opens in a new tab)">
                            <GitHubIcon className="h-4 w-4"/>
                            GitHub
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <a href="https://linkedin.com/in/junxiaog" target="_blank" rel="noopener noreferrer"
                           aria-label="LinkedIn (opens in a new tab)">
                            <LinkedInIcon className="h-4 w-4"/>
                            LinkedIn
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <a href="/rss.xml" type="application/rss+xml" title="Subscribe to the blog in your feed reader">
                            <Rss className="h-4 w-4" aria-hidden="true"/>
                            Subscribe via RSS
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
