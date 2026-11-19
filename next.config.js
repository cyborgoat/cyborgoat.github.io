/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/cyborgoat/**" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "bbs-img.huaweicloud.com" },
            { protocol: "https", hostname: "arxiv.org" },
            { protocol: "https", hostname: "pbs.twimg.com" },
            { protocol: "https", hostname: "media.springernature.com" },
            { protocol: "https", hostname: "cdn.sanity.io" },
            { protocol: "https", hostname: "upload.wikimedia.org" },
        ],
    },
};

module.exports = nextConfig;
