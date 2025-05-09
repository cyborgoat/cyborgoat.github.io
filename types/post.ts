export interface PostMetadata {
  title?: string;
  date?: string;
  author?: string;
  authorImage?: string;
  tags?: string[];
  excerpt?: string;
  video?: string;
  thumbnail?: string;
  slug: string;
  [key: string]: unknown;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}
