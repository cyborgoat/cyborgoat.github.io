import {profile} from "@/data/site";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {notFound} from "next/navigation";
import {getAllPostSlugs, getPostData} from "@/lib/posts";
import {formatPostDate} from "@/lib/post-display";
import MarkdownRender from "@/components/markdown/MarkdownRender";
import MarkdownMedia from "@/components/markdown/MarkdownMedia";
import Link from "next/link";
import BlogTocMenu from "@/components/layout/BlogTocMenu";

export default async function BlogDetailPage({params}: {params: Promise<{slug: string[]}>}) {
    const {slug} = await params;
    const post = getPostData(slug.join("/"));

    if (!post) notFound();

    const {metadata, content} = post;
    const date = formatPostDate(metadata.date);
    const author = metadata.author ?? profile.name;

    return (
        <article className="site-shell page-spacing article-shell">
            <header className="mb-7 border-b border-rule pb-6 md:mb-8">
                <Link href="/blog" className="text-link">Blog archive</Link>
                <h1 className="mt-4 max-w-[28ch] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {metadata.title ?? "Untitled article"}
                </h1>
                {(metadata.excerpt ?? metadata.description) && (
                    <p className="mt-4 max-w-[70ch] leading-relaxed text-muted-foreground">{metadata.excerpt ?? metadata.description}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Avatar className="size-8">
                        <AvatarImage src={metadata.authorImage ?? profile.portrait} alt=""/>
                        <AvatarFallback>{author.slice(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{author}</span>
                    {date && <time dateTime={metadata.date} className="border-l border-rule pl-3">{date}</time>}
                </div>
                {metadata.tags && metadata.tags.length > 0 && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{metadata.tags.join(" · ")}</p>
                )}
            </header>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_12rem]">
                <div className="mx-auto w-full min-w-0 max-w-[46rem]">
                    <div id="post-content" className="break-words">
                        {metadata.video && <MarkdownMedia src={metadata.video} alt={metadata.title ?? "Post video"}/>}
                        <MarkdownRender content={content}/>
                    </div>
                    <div className="mt-10 border-t border-rule pt-6">
                        <Link href="/blog" className="text-link">Back to the blog</Link>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <BlogTocMenu/>
                </div>
            </div>
        </article>
    );
}

export function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({slug: slug.split("/")}));
}
