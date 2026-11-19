import {profile, rssPath} from "@/data/site";
import {Button} from "@/components/ui/button";
import {GitHubIcon, LinkedInIcon} from "@/components/social-icons";
import {Rss} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-rule bg-background">
            <div
                className="wide-shell flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
                <p className="meta-text">&copy; {currentYear} {profile.name}</p>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="bg-transparent shadow-none" asChild>
                        <a href={profile.github} target="_blank" rel="noopener noreferrer"
                           aria-label="GitHub (opens in a new tab)">
                            <GitHubIcon className="h-4 w-4"/>
                            GitHub
                        </a>
                    </Button>
                    <Button variant="outline" className="bg-transparent shadow-none" asChild>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                           aria-label="LinkedIn (opens in a new tab)">
                            <LinkedInIcon className="h-4 w-4"/>
                            LinkedIn
                        </a>
                    </Button>
                    <Button variant="outline" className="bg-transparent shadow-none" asChild>
                        <a href={rssPath} type="application/rss+xml" title="Subscribe to the blog in your feed reader">
                            <Rss className="h-4 w-4" aria-hidden="true"/>
                            Subscribe via RSS
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
