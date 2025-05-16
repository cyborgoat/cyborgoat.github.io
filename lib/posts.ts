// lib/posts.ts
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { Post, PostMetadata } from '@/types/post';

// Define the directory where your posts are stored
const postsDirectory = path.join(process.cwd(), 'data', 'posts');

// Recursively collect all markdown file paths under postsDirectory
function getPostFiles(): string[] {
  const files: string[] = [];
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) { // Only .md files
        files.push(fullPath);
      }
    }
  }
  walk(postsDirectory);
  return files;
}

// Helper function to find the full path of a post by slug (slug is relative path from postsDirectory, without .md)
function findPostPathBySlug(targetSlug: string): string | null {
  const potentialPath = path.join(postsDirectory, `${targetSlug}.md`);
  if (fs.existsSync(potentialPath)) {
    return potentialPath;
  }
  // Fallback for cases where the direct construction might miss due to casing or other subtle issues.
  // This part is less likely to be hit if targetSlug is correctly formed.
  const allFiles = getPostFiles();
  for (const filePath of allFiles) {
    const slugFromFile = path.relative(postsDirectory, filePath).replace(/\.md$/, '');
    if (slugFromFile === targetSlug) {
      return filePath;
    }
  }
  return null;
}

export function getAllPosts(): Post[] {
  try {
    const filePaths = getPostFiles();
    const posts = filePaths.map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const actualSlug = path.relative(postsDirectory, filePath).replace(/\.md$/, '');

      const tags = Array.isArray(data.tags) ? data.tags : [];
      return {
        metadata: {
          ...data,
          slug: actualSlug, // Use actual slug for metadata
          tags,
        } as PostMetadata,
        content,
      } as Post;
    });

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
    return filePaths.map((filePath) => {
      const slug = path.relative(postsDirectory, filePath).replace(/\.md$/, '');
      return { slug };
    });
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export function getPostData(slug: string): Post | null {
  const postPath = findPostPathBySlug(slug);

  if (!postPath) {
    console.error(`Post file not found for slug "${slug}"`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(postPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      metadata: {
        ...matterResult.data,
        slug, 
        tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags as string[] : [],
      } as PostMetadata,
      content: matterResult.content,
    } as Post;

  } catch (error) {
    console.error(`Error reading post data for slug "${slug}":`, error);
    return null;
  }
}