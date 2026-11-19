import {getAllPosts} from "@/lib/posts";

export const dynamic = "force-static";

const siteUrl = "https://cyborgoat.github.io";

function escapeXml(value: string) {
    return value.replace(/[<>&"']/g, (character) => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
    })[character]!);
}

export function GET() {
    const items = getAllPosts().map(({metadata}) => {
        const url = `${siteUrl}/blog/${metadata.slug.split("/").map(encodeURIComponent).join("/")}`;
        const date = metadata.date ? new Date(metadata.date) : null;
        const pubDate = date && !Number.isNaN(date.getTime())
            ? `<pubDate>${date.toUTCString()}</pubDate>`
            : "";

        return `<item>
            <title>${escapeXml(metadata.title || metadata.slug)}</title>
            <link>${escapeXml(url)}</link>
            <guid isPermaLink="true">${escapeXml(url)}</guid>
            <description>${escapeXml(metadata.excerpt || metadata.description || "")}</description>
            ${pubDate}
            ${(metadata.tags || []).map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n")}
        </item>`;
    }).join("\n");

    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Junxiao Guo — Blog</title>
        <link>${siteUrl}/blog</link>
        <description>Writing by Junxiao Guo on AI, technology, and software development.</description>
        <language>en</language>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${items}
    </channel>
</rss>`, {
        headers: {"Content-Type": "application/rss+xml; charset=utf-8"},
    });
}
