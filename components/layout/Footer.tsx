import {Button} from "@/components/ui/button";
import {Github, Linkedin, Twitter} from 'lucide-react';

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
                        {/* Example additional links */}
                        {/* <Link href="/privacy" className="font-medium underline underline-offset-4 ml-2">Privacy</Link> */}
                    </p>
                </div>
                {/* Social Links Example */}
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/cyborgoat" target="_blank" rel="noopener noreferrer"
                           aria-label="GitHub">
                            <Github className="h-4 w-4"/>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"
                           aria-label="LinkedIn">
                            <Linkedin className="h-4 w-4"/>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer"
                           aria-label="Twitter">
                            <Twitter className="h-4 w-4"/>
                        </a>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
