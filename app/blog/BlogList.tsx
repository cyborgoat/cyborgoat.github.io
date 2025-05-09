"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import TextPressure from "@/components/animation/TextPressure";

export default function BlogList({ posts }: { posts: Post[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const postsPerPage = 2;

    const filteredPosts = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return posts;
        return posts.filter((post) => {
            const { title = "", excerpt = "", tags = [] } = post.metadata || {};
            return (
                title.toLowerCase().includes(q) ||
                excerpt.toLowerCase().includes(q) ||
                (tags &&
                    tags.some((tag: string) => tag.toLowerCase().includes(q)))
            );
        });
    }, [search, posts]);

    const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = useMemo(
        () =>
            filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage),
        [filteredPosts, page]
    );

    useEffect(() => {
        if (page > pageCount) setPage(1);
    }, [pageCount, page]);

    return (
        <section className="container max-w-3xl py-8 mx-auto">
            <div className="w-32 h-12 mx-auto mb-8">
                <TextPressure
                    text="Blogs"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ff0000"
                    minFontSize={8}
                />
            </div>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                />
            </div>
            <ul className="space-y-8">
                {paginatedPosts.map((post) => (
                    <li
                        key={post.metadata.slug}
                        className="border rounded-lg p-6 hover:shadow-lg transition"
                    >
                        {post.metadata.thumbnail && (
                            <Link
                                href={`/blog/${post.metadata.slug}`}
                                className="block mb-4"
                            >
                                <Image
                                    src={post.metadata.thumbnail!}
                                    alt={
                                        post.metadata.title
                                            ? `${post.metadata.title} thumbnail`
                                            : "Blog post thumbnail"
                                    }
                                    width={1080}
                                    height={480}
                                    className="w-full h-48 object-cover rounded-md mb-2 transition-transform hover:scale-105"
                                    loading="lazy"
                                />
                            </Link>
                        )}
                        <div className="flex flex-col items-left mb-2">
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
            {/* Pagination */}
            {pageCount > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <button
                        className="px-3 py-1 rounded-md border bg-background hover:bg-muted text-sm disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: pageCount }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded-md border text-sm ${
                                page === i + 1
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-background hover:bg-muted"
                            }`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="px-3 py-1 rounded-md border bg-background hover:bg-muted text-sm disabled:opacity-50"
                        onClick={() => setPage(page + 1)}
                        disabled={page === pageCount}
                    >
                        Next
                    </button>
                </div>
            )}
            {filteredPosts.length === 0 && !search && (
                <div className="text-center text-muted-foreground mt-12">
                    No blogs found.
                </div>
            )}
            {filteredPosts.length === 0 && search && (
                <div className="text-center text-muted-foreground mt-12">
                    No blogs match your search.
                </div>
            )}
        </section>
    );
}
