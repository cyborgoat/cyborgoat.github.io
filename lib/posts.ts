// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), '_posts');

export function getAllPosts() {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        const posts = fileNames
            .filter((fileName) => fileName.endsWith('.md'))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, '');
                const filePath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const {data} = matter(fileContents);
                return {
                    slug,
                    metadata: data as {
                        title?: string;
                        date?: string;
                        author?: string;
                        authorImage?: string;
                        tags?: string[];
                        excerpt?: string;
                        video?: string;
                        [key: string]: unknown;
                    },
                };
            });
        // Sort by date descending, posts with no date go to the end
        return posts.sort((a, b) => {
            if (!a.metadata.date && !b.metadata.date) return 0; // both dates undefined, keep order
            if (!a.metadata.date) return 1; // a is undefined, b comes first
            if (!b.metadata.date) return -1; // b is undefined, a comes first
            return b.metadata.date.localeCompare(a.metadata.date); // both defined, compare
        });
    } catch (error) {
        console.error('Error reading posts directory:', error);
        return [];
    }
}


export function getAllPostSlugs() {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        return fileNames
            .filter((fileName) => fileName.endsWith('.md')) // Only include markdown files
            .map((fileName) => {
                return {
                    slug: fileName.replace(/\.md$/, ''), // Remove the .md extension for the slug
                };
            });
    } catch (error) {
        console.error("Error reading posts directory:", error);
        return []; // Return empty array if directory doesn't exist or other error
    }
}

export async function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the slug and content
        return {
            slug,
            metadata: matterResult.data as {
                title?: string;
                date?: string;
                author?: string;
                authorImage?: string;
                tags?: string[];
                video?: string;
                [key: string]: unknown; // Allow other frontmatter fields, but avoid 'any'
            },
            content: matterResult.content,
        };
    } catch (error) {
        console.error(`Error reading post data for slug "${slug}":`, error);
        return null; // Return null if file doesn't exist or other error
    }
}