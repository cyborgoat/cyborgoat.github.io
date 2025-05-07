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
        const { data } = matter(fileContents);
        return {
          slug,
          metadata: data as {
            title?: string;
            date?: string;
            author?: string;
            authorImage?: string;
            tags?: string[];
            excerpt?: string;
            [key: string]: unknown;
          },
        };
      });
    // Sort by date descending
    return posts.sort((a, b) => (b.metadata.date && a.metadata.date && b.metadata.date > a.metadata.date ? 1 : -1));
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
      metadata: matterResult.data as { // Add type assertion for metadata
        title?: string;
        date?: string;
        author?: string;
        authorImage?: string;
        tags?: string[];
        [key: string]: unknown; // Allow other frontmatter fields, but avoid 'any'
      },
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error reading post data for slug "${slug}":`, error);
    return null; // Return null if file doesn't exist or other error
  }
}