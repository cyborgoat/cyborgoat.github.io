"use client";

import {useState} from "react";
import Link from "next/link";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {articlePath, formatPostDate} from "@/lib/post-display";
import type {PostMetadata} from "@/types/post";

const postsPerPage = 6;

export default function BlogList({posts}: {posts: PostMetadata[]}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState("");
    const tags = [...new Set(posts.flatMap((post) => post.tags ?? []))].sort();
    const query = search.trim().toLowerCase();
    const filtered = posts.filter((post) => {
        if (selectedTag && !post.tags?.includes(selectedTag)) return false;
        return !query || [post.title, post.excerpt, post.description, ...(post.tags ?? [])]
            .some((value) => value?.toLowerCase().includes(query));
    });
    const pageCount = Math.ceil(filtered.length / postsPerPage);
    const visible = filtered.slice((page - 1) * postsPerPage, page * postsPerPage);

    return (
        <section aria-labelledby="blog-archive" className="min-w-0">
            <h2 id="blog-archive" className="sr-only">Archive</h2>
            <div className="grid gap-3 sm:grid-cols-[minmax(0,22rem)_minmax(0,14rem)]">
                <label className="relative block">
                    <span className="sr-only">Search articles</span>
                    <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground"/>
                    <input type="search" placeholder="Search articles" value={search}
                           className="h-11 w-full rounded-md border border-rule bg-background pl-9 pr-3 text-foreground placeholder:text-muted-foreground"
                           onChange={(event) => { setSearch(event.target.value); setPage(1); }}/>
                </label>
                <label>
                    <span className="sr-only">Filter by topic</span>
                    <select value={selectedTag} className="h-11 w-full rounded-md border border-rule bg-background px-3 text-foreground"
                            onChange={(event) => { setSelectedTag(event.target.value); setPage(1); }}>
                        <option value="">All topics</option>
                        {tags.map((tag) => <option key={tag}>{tag}</option>)}
                    </select>
                </label>
            </div>
            <p className="my-4 text-sm text-muted-foreground" role="status">
                {filtered.length === 0 ? "No articles match your filters." : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
            </p>
            <ul className="border-t border-rule">
                {visible.map((post) => (
                    <li key={post.slug} className="border-b border-rule">
                        <Link href={articlePath(post)} className="group grid gap-2 rounded-sm py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                            <time className="meta-text sm:pt-1" dateTime={post.date}>{formatPostDate(post.date)}</time>
                            <div>
                                <h3 className="font-semibold leading-snug group-hover:text-brand">{post.title ?? post.slug}</h3>
                                <p className="mt-1 max-w-2xl leading-relaxed text-muted-foreground">{post.excerpt ?? post.description}</p>
                                {post.tags && post.tags.length > 0 && (
                                    <p className="mt-2 break-words font-mono text-xs text-muted-foreground">{post.tags.join(" · ")}</p>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {pageCount > 1 && (
                <nav aria-label="Archive pagination" className="mt-6 flex flex-wrap items-center gap-2">
                    <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
                    {Array.from({length: pageCount}, (_, index) => (
                        <Button key={index} variant={page === index + 1 ? "default" : "outline"}
                                aria-label={`Page ${index + 1}`} aria-current={page === index + 1 ? "page" : undefined}
                                onClick={() => setPage(index + 1)}>{index + 1}</Button>
                    ))}
                    <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === pageCount}>Next</Button>
                </nav>
            )}
        </section>
    );
}
