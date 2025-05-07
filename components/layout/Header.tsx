import Link from 'next/link';
import { MountainIcon } from 'lucide-react'; 
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b border-border">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false} // Optional: set to true if you want prefetching
      >
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Cyborgoat Portfolio</span>
        <span className="font-semibold ml-2">Cyborgoat</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/project"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
          prefetch={false}
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
          prefetch={false}
        >
          Blog
        </Link>
        {/* Add more links as needed (e.g., Contact) */}
      </nav>
    </header>
  );
}