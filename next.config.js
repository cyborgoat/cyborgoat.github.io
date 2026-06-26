/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
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
