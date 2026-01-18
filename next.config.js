/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "bbs-img.huaweicloud.com",
            "arxiv.org",
            "pbs.twimg.com",
            "media.springernature.com",
            "cdn.sanity.io",
            "upload.wikimedia.org",
            // Add other domains as needed
        ],
    },
};

module.exports = nextConfig;
