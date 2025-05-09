import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {notFound} from "next/navigation";
import {getAllPostSlugs, getPostData} from "@/lib/posts";
import MarkdownRender from "@/components/markdown/MarkdownRender";
import MarkdownVideo from "@/components/markdown/MarkdownVideo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mark the component as async
export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
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
                                src={post.metadata.authorImage ?? "/images/authors/cyborgoat-avatar.png"}
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
                {post.metadata.video && <MarkdownVideo url={post.metadata.video}/>}
                <MarkdownRender content={post.content}/>
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
