"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import TextPressure from "@/components/animation/TextPressure";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

export default function BlogList({ posts }: { posts: Post[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState("");
    const [openCombobox, setOpenCombobox] = useState(false);
    const postsPerPage = 5;

    const tagsList = useMemo(() => {
        const setTags = new Set<string>();
        posts.forEach(p => p.metadata.tags?.forEach(tag => setTags.add(tag)));
        return Array.from(setTags).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        let filtered = posts;
        if (selectedTag) {
            filtered = filtered.filter(post => post.metadata.tags?.includes(selectedTag));
        }
        const q = search.trim().toLowerCase();
        if (!q) return filtered;
        return filtered.filter((post) => {
            const { title = "", excerpt = "", tags = [] } = post.metadata || {};
            return (
                title.toLowerCase().includes(q) ||
                excerpt.toLowerCase().includes(q) ||
                (tags &&
                    tags.some((tag: string) => tag.toLowerCase().includes(q)))
            );
        });
    }, [search, selectedTag, posts]);

    const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = useMemo(
        () =>
            filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage),
        [filteredPosts, page]
    );

    useEffect(() => {
        if (page > pageCount && pageCount > 0) setPage(pageCount);
        else if (page > pageCount && pageCount === 0) setPage(1);
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
                    textColor="var(--foreground)"
                    strokeColor="var(--primary)"
                    minFontSize={8}
                />
            </div>
            <div className="mb-6 flex flex-col items-center space-y-4">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/60 transition bg-background text-foreground placeholder:text-muted-foreground"
                />
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button
                        size="sm"
                        variant={selectedTag === "" ? "default" : "outline"}
                        onClick={() => { setSelectedTag(""); setPage(1); }}
                        className="transition-all"
                    >
                        All Tags
                    </Button>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCombobox}
                                className="w-[200px] justify-between transition-all"
                                size="sm"
                            >
                                {selectedTag
                                    ? tagsList.find((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
                                    : "Select a tag..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search tag..." />
                                <CommandList>
                                    <CommandEmpty>No tag found.</CommandEmpty>
                                    <CommandGroup>
                                        {tagsList.map((tag) => (
                                            <CommandItem
                                                key={tag}
                                                value={tag}
                                                onSelect={(currentValue: string) => {
                                                    setSelectedTag(currentValue.toLowerCase() === selectedTag.toLowerCase() ? "" : currentValue);
                                                    setOpenCombobox(false);
                                                    setPage(1);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedTag.toLowerCase() === tag.toLowerCase() ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {tag}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <ul className="space-y-8">
                {paginatedPosts.map((post) => (
                    <motion.li
                        key={post.metadata.slug}
                        className="relative border rounded-lg p-6 group hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1 bg-background/50 backdrop-blur-sm overflow-hidden will-change-transform will-change-opacity"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Link href={`/blog/${post.metadata.slug}`} className="block focus:outline-none">
                            {post.metadata.thumbnail && (
                                <div className="mb-4 overflow-hidden rounded-md">
                                    <motion.div
                                        className="will-change-transform"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
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
                                            className="w-full h-48 object-cover rounded-md transition-all duration-300"
                                            loading="lazy"
                                        />
                                    </motion.div>
                                </div>
                            )}
                            <div className="flex flex-col items-left mb-2">
                                <h2 className="text-xl font-semibold hover:underline">
                                    {post.metadata.title}
                                </h2>
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
                        </Link>
                    </motion.li>
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
