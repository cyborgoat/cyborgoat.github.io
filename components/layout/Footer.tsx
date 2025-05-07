import Link from 'next/link';
import { cn } from '@/lib/utils'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border bg-background">
      <p className="text-xs text-muted-foreground">
        &copy; {currentYear} Cyborgoat. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          prefetch={false}
        >
          GitHub
        </Link>
        <Link
          href="#"
          className="text-xs hover:underline underline-offset-4 text-muted-foreground"
          prefetch={false}
        >
          LinkedIn
        </Link>
        
      </nav>
    </footer>
  );
}