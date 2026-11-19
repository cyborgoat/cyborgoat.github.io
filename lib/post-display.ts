import type {PostMetadata} from "@/types/post";

const dateFormatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
});

export function formatPostDate(value?: string) {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime()) ? dateFormatter.format(date) : "";
}

export function articlePath({slug}: Pick<PostMetadata, "slug">) {
    return `/blog/${slug.split("/").map(encodeURIComponent).join("/")}`;
}
