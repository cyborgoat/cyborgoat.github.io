// /components/layout/header.tsx
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {Menu, MountainIcon} from 'lucide-react'; // Or your preferred icons

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/project", label: "Projects" },
    { href: "/blog", label: "Blog" },
    // { href: "/contact", label: "Contact" }, // Example
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        {/* Logo/Site Name */}
        <Link href="/" className="mr-6 flex items-center space-x-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="font-bold inline-block">Cyborgoat</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation Trigger */}
        <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
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
                 >
                    <MountainIcon className="h-6 w-6" />
                    <span className="">Cyborgoat</span>
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
    </header>
  );
}