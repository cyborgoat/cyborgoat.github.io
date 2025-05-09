import { getAllPosts } from "@/lib/posts";
import BlogList from "./BlogList";

export default async function BlogMainPage() {
  const posts = await getAllPosts();
  return <BlogList posts={posts} />;
}
