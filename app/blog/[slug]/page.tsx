import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {notFound} from "next/navigation";
import {getAllPostSlugs, getPostData} from "@/lib/posts";
import MarkdownRender from "@/components/markdown/MarkdownRender";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mark the component as async - getPostData can remain async if other async operations happen, but it is not strictly necessary if only getPostData (now sync) is awaited.
// For simplicity with potential future async ops, we can leave page as async.
export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>; // params can still be a Promise if Next.js passes it that way
}) {
    const {slug} = await params;
    // getPostData is now synchronous, but awaiting a sync function is harmless.
    const post = getPostData(slug); // No longer needs await if getPostData is truly sync and not returning a Promise
                                    // However, to be safe and if other async ops might be added, keeping await is fine.
                                    // Or, ensure getPostData is not Promise and remove await.
                                    // For this change, we assume getPostData is now sync.

    // console.logs removed for brevity in this revert

    if (!post) {
        notFound(); // Render 404 if post data is null
    }

    const metadata = post.metadata; // No need for default, as getPostData should always return full metadata or null.

    const displayDate = metadata.date
        ? new Date(metadata.date).toLocaleDateString("en-US", {
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
                    {metadata.title ?? "Untitled Post"}
                </h1>

                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={metadata.authorImage ?? "/images/authors/cyborgoat-avatar.png"}
                                alt={metadata.author ?? "Author"}
                            />
                            <AvatarFallback>
                                {metadata.author?.slice(0, 1).toUpperCase() ?? "A"}
                            </AvatarFallback>
                        </Avatar>
                        <span>{metadata.author ?? "Anonymous"}</span>
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
                {metadata.video && <MarkdownMedia src={metadata.video} alt={metadata.title || "Post video"} />}
                {/* Always use MarkdownRender as we only have .md files */}
                <MarkdownRender content={post.content as string} />
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
    const posts = getAllPostSlugs(); // Use helper function
    return posts; // The helper already returns [{ slug: '...' }, ...]
}
