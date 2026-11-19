import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {Post, PostMetadata} from "@/types/post";

const postsDirectory = path.join(process.cwd(), "data", "posts");

function findSlugs(directory = postsDirectory, prefix = ""): string[] {
    return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
        const name = prefix + entry.name;
        if (entry.isDirectory()) {
            return findSlugs(path.join(directory, entry.name), name + "/");
        }
        return entry.isFile() && entry.name.endsWith(".md") ? [name.slice(0, -3)] : [];
    });
}

function readPost(slug: string): Post {
    const {data, content} = matter(fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8"));
    return {
        metadata: {
            ...data,
            slug,
            tags: Array.isArray(data.tags) ? data.tags : [],
        } as PostMetadata,
        content,
    };
}

export function getAllPostSlugs(): string[] {
    try {
        return findSlugs();
    } catch (error) {
        console.error("Error reading post slugs:", error);
        return [];
    }
}

export function getAllPosts(): Post[] {
    try {
        return findSlugs().map(readPost).sort((a, b) => {
            const dateA = new Date(a.metadata.date || "2000-01-01");
            const dateB = new Date(b.metadata.date || "2000-01-01");
            return dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        console.error("Error reading posts:", error);
        return [];
    }
}

export function getPostData(slug: string): Post | null {
    if (slug.includes("\\") || slug.split("/").some((segment) => !segment || segment === "." || segment === "..")) {
        return null;
    }

    try {
        return readPost(slug);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
            console.error(`Error reading post "${slug}":`, error);
        }
        return null;
    }
}
