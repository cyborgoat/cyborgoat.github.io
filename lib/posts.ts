// lib/posts.ts
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { Post, PostMetadata } from '@/types/post';

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), 'public', 'data', 'posts');

// Recursively collect all markdown file paths under postsDirectory
function getPostFiles(): string[] {
  const files: string[] = [];
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  walk(postsDirectory);
  return files;
}

export function getAllPosts(): Post[] {
  try {
    const filePaths = getPostFiles();
    const posts = filePaths.map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = path.basename(filePath, '.md');
      // Use tags defined in front-matter metadata
      const tags = Array.isArray(data.tags) ? data.tags : [];
      return {
        metadata: {
          ...data,
          slug,
          tags,
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
    const filePaths = getPostFiles();
    return filePaths.map((filePath) => ({
      slug: path.basename(filePath, '.md'),
    }));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<Post | null> {
  // Attempt direct path, else search recursively
  let fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    const filePaths = getPostFiles();
    const match = filePaths.find((fp) => path.basename(fp, '.md') === slug);
    if (match) {
      fullPath = match;
    } else {
      console.error(`Post file not found for slug "${slug}"`);
      return null;
    }
  }
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      metadata: {
        ...matterResult.data,
        slug,
        // Use tags from front-matter
        tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags as string[] : [],
      } as PostMetadata,
      content: matterResult.content,
    } as Post;
  } catch (error) {
    console.error(`Error reading post data for slug "${slug}":`, error);
    return null;
  }
}