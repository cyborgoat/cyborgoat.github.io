"use client";

export default function MarkdownVideo({url}: { url: string }) {
    if (!url) return null;
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    const isVimeo = url.includes("vimeo.com");

    if (isYouTube) {
        // Extract YouTube video ID
        let videoId = "";
        if (url.includes("v=")) {
            videoId = url.split("v=")[1]?.split("&")[0] || "";
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
        }
        if (!videoId) return null;
        return (
            <div className="flex justify-center my-6">
                <iframe
                    width="700"
                    height="394"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg w-full max-w-2xl aspect-video"
                />
            </div>
        );
    }
    if (isVimeo) {
        const videoId = url.split("vimeo.com/")[1]?.split("?")[0] || "";
        if (!videoId) return null;
        return (
            <div className="flex justify-center my-6">
                <iframe
                    src={`https://player.vimeo.com/video/${videoId}`}
                    width="700"
                    height="394"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg w-full max-w-2xl aspect-video"
                />
            </div>
        );
    }
    // Fallback for direct video files
    return (
        <div className="flex justify-center my-6">
            <video controls className="rounded-lg w-full max-w-2xl aspect-video">
                <source src={url}/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
