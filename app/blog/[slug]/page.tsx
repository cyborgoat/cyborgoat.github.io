import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import rehypePrettyCode from 'rehype-pretty-code';
import { getAllPostSlugs, getPostData } from '@/lib/posts'; // Import helper functions
import Link from "next/link"; // For potential internal links in MD
import Image from "next/image"; // For optimized images in MD

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

// Rehype Pretty Code options
const prettyCodeOptions = {
  theme: 'github-dark', // Choose a theme (e.g., github-dark, one-dark-pro)
  // Optional: Callback to customize line rendering if needed
  // onVisitLine(node: any) {
  //   // Prevent lines from collapsing in `display: grid` mode, and allow empty
  //   // lines to be copy/pasted
  //   if (node.children.length === 0) {
  //     node.children = [{type: 'text', value: ' '}];
  //   }
  // },
  // Optional: Callback to customize word highlighting
  // onVisitHighlightedWord(node: any) {
  //   node.properties.className = ['word--highlighted'];
  // },
};

// --- Custom Renderers for ReactMarkdown (Optional but recommended) ---
const customRenderers = {
  // Render Next.js Image for better optimization
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) return null;
    // Assumes images are served from /public directory
    const imageUrl = src.startsWith('/') ? src : `/${src}`;
    return (
       <span className="block my-6"> {/* Add some margin */}
         <Image
           src={imageUrl}
           alt={alt ?? 'Blog post image'}
           width={700} // Adjust default width
           height={400} // Adjust default height
           className="rounded-md object-contain mx-auto" // Style as needed
         />
         {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
      </span>
    );
  },
  // Ensure links open in new tabs if they are external
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    if (!href) return <>{children}</>;
    if (href.startsWith('http') || href.startsWith('//')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    // Use Next.js Link for internal links if needed (optional)
    return <Link href={href} legacyBehavior>{children}</Link>;
  },
   // Add more custom renderers if needed (e.g., for videos)
};
// --- End Custom Renderers ---


// Mark the component as async
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const slug = params.slug;
  const post = await getPostData(slug);

  if (!post) {
    notFound(); // Render 404 if post data is null
  }

  const displayDate = post.metadata.date
    ? new Date(post.metadata.date).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
      })
    : "Date not available";

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10 px-4 md:px-6 mx-auto">
      {/* Post Header */}
      <div className="mb-8 text-center">
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="mb-4 flex justify-center flex-wrap gap-2">
            {post.metadata.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1] mb-4">
          {post.metadata.title ?? "Untitled Post"}
        </h1>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.metadata.authorImage} alt={post.metadata.author ?? 'Author'} />
              <AvatarFallback>{post.metadata.author?.slice(0, 1).toUpperCase() ?? 'A'}</AvatarFallback>
            </Avatar>
            <span>{post.metadata.author ?? 'Anonymous'}</span>
          </div>
          {post.metadata.date && (
             <>
              <span>·</span>
              <time dateTime={post.metadata.date}>{displayDate}</time>
             </>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <ReactMarkdown
          rehypePlugins={[[rehypePrettyCode, prettyCodeOptions]]}
          components={customRenderers} // Add custom renderers here
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

// generateStaticParams function using the helper
export async function generateStaticParams() {
  const posts = getAllPostSlugs(); // Use helper function
  return posts; // The helper already returns [{ slug: '...' }, ...]
}