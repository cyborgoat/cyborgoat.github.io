import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogMainPage() {
    const posts = await getAllPosts(); // [{ metadata, content }]
    return (
        <section className="container max-w-3xl py-8 mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>
            <ul className="space-y-8">
                {posts.map((post) => (
                    <li
                        key={post.metadata.slug}
                        className="border rounded-lg p-6 hover:shadow-lg transition"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <Link
                                href={`/blog/${post.metadata.slug}`}
                                className="text-xl font-semibold hover:underline"
                            >
                                {post.metadata.title}
                            </Link>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage
                                        src={post.metadata.authorImage}
                                        alt={post.metadata.author ?? "Author"}
                                    />
                                    <AvatarFallback>
                                        {post.metadata.author
                                            ?.slice(0, 1)
                                            .toUpperCase() ?? "A"}
                                    </AvatarFallback>
                                </Avatar>
                                <span>
                                    {post.metadata.author ?? "Anonymous"}
                                </span>
                                <span>·</span>
                                <time dateTime={post.metadata.date}>
                                    {post.metadata.date
                                        ? new Date(
                                              post.metadata.date
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })
                                        : "No date"}
                                </time>
                            </div>
                        </div>
                        <p className="mb-3 text-muted-foreground">
                            {post.metadata.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {post.metadata.tags?.map((tag: string) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
