import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import Link from "next/link"; 
import Image from "next/image"; 

const customRenderers = {
  // Render Next.js Image for better optimization
  img: ({ src, alt }: { src?: string | Blob; alt?: string }) => {
    if (!src) return null;
    let imageUrl: string;
    if (typeof src === "string") {
      // For string URLs, add / prefix if needed
      imageUrl = src.startsWith("/") ? src : `/${src}`;
    } else {
      // For Blob, convert to URL - only works in client-side rendering
      if (typeof window !== "undefined") {
        imageUrl = URL.createObjectURL(src);
      } else {
        // During server-side rendering, fall back to empty string
        imageUrl = "";
      }
    }
    return (
      <span className="block my-6">
        {" "}
        {/* Add some margin */}
        <Image
          src={imageUrl}
          alt={alt ?? "Blog post image"}
          width={700} // Adjust default width
          height={400} // Adjust default height
          className="rounded-md object-contain mx-auto" // Style as needed
        />
        {alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {alt}
          </figcaption>
        )}
      </span>
    );
  },
  // Ensure links open in new tabs if they are external
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    if (!href) return <>{children}</>;
    if (href.startsWith("http") || href.startsWith("//")) {
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
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound(); // Render 404 if post data is null
  }

  const displayDate = post.metadata.date
    ? new Date(post.metadata.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Date not available";

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10 px-4 md:px-6 mx-auto">
      {/* Post Header */}
      <div className="mb-8 text-center">
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="mb-4 flex justify-center flex-wrap gap-2">
            {post.metadata.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1] mb-4">
          {post.metadata.title ?? "Untitled Post"}
        </h1>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={post.metadata.authorImage}
                alt={post.metadata.author ?? "Author"}
              />
              <AvatarFallback>
                {post.metadata.author?.slice(0, 1).toUpperCase() ?? "A"}
              </AvatarFallback>
            </Avatar>
            <span>{post.metadata.author ?? "Anonymous"}</span>
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
          components={customRenderers} // Add custom renderers here
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

// generateStaticParams function using the helper
export function generateStaticParams() {
  const posts = getAllPostSlugs(); // Use helper function
  return posts; // The helper already returns [{ slug: '...' }, ...]
}
