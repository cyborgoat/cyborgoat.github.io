import type {Metadata} from "next";
import {getAllPosts} from "@/lib/posts";
import BlogList from "./BlogList";

export const metadata: Metadata = {title: "Blog"};

export default function BlogMainPage() {
    const posts = getAllPosts().map(({metadata}) => metadata);

    return (
        <div className="site-shell page-spacing">
            <header className="mb-7">
                <h1 className="page-title">Writing</h1>
                <p className="mt-3 leading-relaxed text-muted-foreground">Notes on AI, software engineering, and technology.</p>
            </header>
            <BlogList posts={posts}/>
        </div>
    );
}
