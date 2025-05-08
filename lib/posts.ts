// lib/posts.ts
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { Post, PostMetadata } from '@/types/post';

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), '_posts');

export function getAllPosts(): Post[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const posts = fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, '');
                const filePath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContents);
                return {
                    metadata: {
                        ...data,
                        slug
                    } as PostMetadata,
                    content,
                } as Post;
            });
        // Sort by date descending, posts with no date go to the end
        return posts.sort((a, b) => {
            const dateA = new Date(a.metadata.date || '2000-01-01');
            const dateB = new Date(b.metadata.date || '2000-01-01');
            return dateB.getTime() - dateA.getTime();
        });
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

export function getAllPostSlugs(): { slug: string }[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        return fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map((fileName) => ({
                slug: fileName.replace(/\.md$/, ''),
            }));
    } catch (error) {
        console.error('Error reading post slugs:', error);
        return [];
    }
}

export async function getPostData(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        // Combine the data with the slug and content
        return {
            metadata: {
                ...matterResult.data,
                slug
            } as PostMetadata,
            content: matterResult.content,
        } as Post;
    } catch (error) {
        console.error(`Error reading post data for slug "${slug}":`, error);
        return null; // Return null if file doesn't exist or other error
    }
}