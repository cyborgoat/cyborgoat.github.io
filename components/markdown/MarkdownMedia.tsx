import Image from "next/image";

export default function MarkdownMedia({src = "", alt = ""}: { src?: string; alt?: string }) {
    if (!src) return null;
    const isVideo = /\.(mp4|webm|mov)$/i.test(src) || src.includes("youtube.com") || src.includes("vimeo.com");
    const isGif = src.endsWith(".gif");
    // Local images: start with /, else treat as remote
    if (isVideo) {
        if (src.includes("youtube.com") || src.includes("youtu.be")) {
            // YouTube embed
            const videoId = src.split("v=")[1]?.split("&")[0] || src.split("youtu.be/")[1];
            return (
                <div className="my-6 w-full flex justify-center">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                    />
                </div>
            );
        } else if (src.includes("vimeo.com")) {
            // Vimeo embed
            const videoId = src.split("vimeo.com/")[1];
            return (
                <div className="my-6 w-full flex justify-center">
                    <iframe
                        src={`https://player.vimeo.com/video/${videoId}`}
                        width="640"
                        height="360"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                    />
                </div>
            );
        } else {
            // MP4, WebM, MOV
            return (
                <video controls className="rounded-lg my-6 mx-auto max-w-full" style={{maxHeight: 400}}>
                    <source src={src}/>
                    Your browser does not support the video tag.
                </video>
            );
        }
    } else if (isGif || src.startsWith("http")) {
        // GIFs or remote images
        return (
            <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="rounded-lg my-6 mx-auto max-w-full"
                style={{maxHeight: 400, objectFit: 'contain'}}
            />
        );
    } else {
        // Local images (optimize with Next.js)
        return (
            <span className="block my-6">
        <Image
            src={src}
            alt={alt}
            width={700}
            height={400}
            className="rounded-lg object-contain mx-auto"
        />
                {alt && (
                    <figcaption className="text-center text-sm text-muted-foreground mt-2">
                        {alt}
                    </figcaption>
                )}
      </span>
        );
    }
}
