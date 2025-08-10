import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {notFound} from "next/navigation";
import {getAllPostSlugs, getPostData} from "@/lib/posts";
import MarkdownRender from "@/components/markdown/MarkdownRender";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";
import Link from "next/link";
import {Button} from "@/components/ui/button";

// Mark the component as async - getPostData can remain async if other async operations happen, but it is not strictly necessary if only getPostData (now sync) is awaited.
// For simplicity with potential future async ops, we can leave page as async.

// The params object itself is a Promise in Next.js 15 for Server Components
export default async function BlogDetailPage({params}: { params: Promise<{ slug: string[] }> }) {
    const {slug: slugArray} = await params; // Await params to get its properties
    const slugString = slugArray.join('/');

    const post = getPostData(slugString);

    if (!post) {
        notFound();
    }

    const metadata = post.metadata;

    const displayDate = metadata.date
        ? new Date(metadata.date).toLocaleDateString("en-US", { // Default to en-US date format
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        })
        : "Date not available"; // Reverted to hardcoded string

    return (
        <article className="container relative max-w-3xl py-6 lg:py-10 px-4 md:px-6 mx-auto">
            {/* Post Header */}
            <div className="mb-8 text-center">
                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="mb-4 flex justify-center flex-wrap gap-2">
                        {metadata.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1] mb-4">
                    {metadata.title ?? "Untitled Post"} {/* Reverted fallback */}
                </h1>

                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={metadata.authorImage ?? "/images/authors/cyborgoat-avatar.png"}
                                alt={metadata.author ?? "Author"} /* Reverted fallback */
                            />
                            <AvatarFallback>
                                {metadata.author?.slice(0, 1).toUpperCase() ?? "A"} {/* Reverted fallback */}
                            </AvatarFallback>
                        </Avatar>
                        <span>{metadata.author ?? "Anonymous"}</span> {/* Reverted fallback */}
                    </div>
                    {metadata.date && (
                        <>
                            <span>·</span>
                            <time dateTime={metadata.date}>{displayDate}</time>
                        </>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-stone dark:prose-invert max-w-none">
                {metadata.video && <MarkdownMedia src={metadata.video}
                                                  alt={metadata.title || "Post video"}/>} {/* Reverted fallback */}
                <MarkdownRender content={post.content as string}/>
            </div>
            <div className="mt-8 flex justify-center">
                <Button asChild variant="link">
                    <Link href="/blog">← Back to all blogs</Link>
                </Button>
            </div>
        </article>
    );
}

// generateStaticParams function using the helper
export function generateStaticParams() {
    const postSlugs = getAllPostSlugs();
    return postSlugs.map(item => ({
        slug: item.slug.split('/'), // This remains to support [...slug]
    }));
}
