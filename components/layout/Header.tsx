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
import {Menu, MountainIcon} from 'lucide-react'; // Or your preferred icons
import {ThemeToggleButton} from "@/components/theme-toggle-button";
import {usePathname} from 'next/navigation';
import {cn} from "@/lib/utils";

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
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-6 mx-auto">
                {/* Logo/Site Name */}
                <Link
                    href="/"
                    className="mr-6 flex items-center space-x-2"
                    prefetch={false}
                    legacyBehavior>
          <span className="flex items-center space-x-2">
            <MountainIcon className="h-6 w-6"/>
            <span className="font-bold inline-block">Cyborgoat</span>
          </span>
                </Link>

                {/* Centered Desktop Navigation Wrapper */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.href}>
                                    <Link href={link.href} legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={cn(
                                                "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                "bg-transparent",
                                                pathname !== link.href &&
                                                "hover:text-primary hover:underline underline-offset-4 focus:bg-transparent focus:text-primary focus:outline-none focus:underline",
                                                pathname === link.href
                                                    ? "text-primary font-semibold underline underline-offset-4"
                                                    : "text-muted-foreground",
                                                "disabled:pointer-events-none disabled:opacity-50"
                                            )}
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right-aligned items: Theme Toggle and Mobile Menu Trigger */}
                <div className="flex items-right ml-auto space-x-4">
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
                                        className="flex items-center gap-2 text-lg font-semibold"
                                        prefetch={false}
                                        legacyBehavior>
                    <span className="flex items-center gap-2 text-lg font-semibold">
                      <MountainIcon className="h-6 w-6"/>
                      <span className="">Cyborgoat</span>
                    </span>
                                    </Link>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-muted-foreground hover:text-foreground"
                                            prefetch={false}
                                            legacyBehavior>
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