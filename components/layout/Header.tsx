// /components/layout/header.tsx
"use client";

import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Menu} from 'lucide-react'; // Or your preferred icons
import {usePathname} from 'next/navigation';
import {cn} from "@/lib/utils";
import {ThemeToggleButton} from "@/components/theme-toggle-button";

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        {href: "/", label: "Home"},
        {href: "/project", label: "Projects"},
        {href: "/blog", label: "Blogs"},
        // { href: "/contact", label: "Contact" }, // Example
    ];

    return (
        <header
            className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="container flex h-14 items-center px-4 md:px-6 mx-auto">
                {/* Logo/Site Name */}
                <Link
                    href="/"
                    className="mr-6 flex items-center"
                    prefetch={false}
                >
          <span className="font-serif text-lg tracking-[-0.01em] text-foreground">Junxiao&nbsp;Guo</span>
                </Link>

                {/* Centered Desktop Navigation Wrapper */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            "bg-transparent",
                                            pathname !== link.href &&
                                            "hover:text-foreground focus:bg-transparent focus:text-foreground focus:outline-none",
                                            pathname === link.href
                                                ? "text-foreground font-semibold underline decoration-brand underline-offset-[6px]"
                                                : "text-muted-foreground",
                                            "disabled:pointer-events-none disabled:opacity-50"
                                        )}
                                    >
                                        <Link href={link.href} prefetch={false}>
                                            {link.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right-aligned items: Theme toggle + Mobile Menu Trigger */}
                <div className="flex items-center gap-1 ml-auto">
                    <ThemeToggleButton/>
                    {/* Mobile Navigation Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                {/* You can add a SheetHeader/Title if needed */}
                                <nav className="grid gap-6 text-lg font-medium mt-6">
                                    <Link
                                        href="/"
                                        className="font-serif text-lg tracking-[-0.01em]"
                                        prefetch={false}
                                    >
                                        Junxiao Guo
                                    </Link>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-muted-foreground hover:text-foreground"
                                            prefetch={false}
                                        >
                                            {link.label}
                                        </Link>
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