export interface CatalogProject {
    title: string;
    excerpt: string;
    link: string;
    tags: string[];
    featuredExcerpt?: string;
    logo?: {
        url: string;
        darkUrl?: string;
        cropWordmark?: boolean;
    };
}

export const projects: CatalogProject[] = [
    {
        title: "Weekly Frontier",
        excerpt: "A weekly reading companion covering AI, technology, politics, finance, science, and business. Collects publisher feeds daily into concise, source-linked briefings, with topic browsing and Atom/RSS subscriptions.",
        link: "https://github.com/cyborgoat/weekly-frontier",
        tags: ["News", "Automation", "RSS", "Markdown"],
        featuredExcerpt: "Source-linked weekly briefings on AI, technology, and more, with RSS and Atom feeds.",
        logo: {
            url: "https://raw.githubusercontent.com/cyborgoat/weekly-frontier/main/assets/brand/weekly-frontier-logo.png",
            darkUrl: "https://raw.githubusercontent.com/cyborgoat/weekly-frontier/main/assets/brand/weekly-frontier-logo-dark.png",
            cropWordmark: true,
        },
    },
    {
        title: "Team Orbit",
        excerpt: "A backend-first team hub for managing ~100 members, with events, announcements, markdown news, a discussion forum, file uploads, and live notifications. NestJS modular monolith with Prisma + SQLite, JWT RBAC, Socket.io, and Swagger docs.",
        link: "https://github.com/cyborgoat/team-orbit",
        tags: ["NestJS", "Prisma", "Socket.io", "React"],
    },
    {
        title: "mdmailer",
        excerpt: "A Node.js CLI that turns a Markdown file into a branded HTML email, an EML file, and a PNG card with QR codes. Supports multiple email types and themes, English/Chinese labels, and batch generation.",
        link: "https://github.com/cyborgoat/mdmailer",
        tags: ["TypeScript", "CLI", "Puppeteer", "Markdown"],
    },
    {
        title: "Nest",
        excerpt: "A local-first desktop knowledge workspace for reading, editing, and searching Markdown knowledge packs via retrieval-augmented chat with OpenAI-compatible LLMs. Built with Tauri v2 + React, a NestJS Hub API, and FastEmbed + SQLite FTS for offline retrieval.",
        link: "https://github.com/cyborgoat/nest",
        tags: ["Tauri v2", "React", "NestJS", "RAG"],
        featuredExcerpt: "A local-first workspace for reading, editing, and chatting with your Markdown knowledge packs.",
        logo: {
            url: "https://raw.githubusercontent.com/cyborgoat/nest/main/apps/desktop/src-tauri/icons/128x128.png",
        },
    },
    {
        title: "Quizzy",
        excerpt: "A Tauri v2 desktop quiz app for organizing and tracking learning through local JSON-based quizzes, with study goal tracking, attempt history, a mistake log, and integrated markdown notes — fully private, local-only data.",
        link: "https://github.com/cyborgoat/quizzy",
        tags: ["Tauri v2", "React", "Local-first"],
        featuredExcerpt: "A private desktop quiz app with study goals, attempt history, and a mistake log.",
        logo: {
            url: "https://raw.githubusercontent.com/cyborgoat/quizzy/main/src-tauri/icons/128x128.png",
        },
    },
    {
        title: "Finch",
        excerpt: "A privacy-focused voice transcription app that runs locally using Qwen3-ASR-1.7B, with optional LLM post-processing. FastAPI backend, TanStack Start frontend, speaker diarization, and persistent voiceprint profiles.",
        link: "https://github.com/cyborgoat/finch",
        tags: ["FastAPI", "ASR", "TanStack Start"],
    },
    {
        title: "Cubicles",
        excerpt: "A Python agent workbench for human-guided AI collaboration, with persistent sessions, inspectable workflows, explicit tool approvals, and both CLI and web interfaces. Supports Ollama and OpenAI-compatible providers.",
        link: "https://github.com/cyborgoat/cubicles",
        tags: ["Python", "Agents", "CLI"],
    },
    {
        title: "Swarm",
        excerpt: "A comprehensive CLI-based agent for web browsing, automation, and deep research with LLM integration.",
        link: "https://github.com/cyborgoat/swarm",
        tags: ["Python", "CLI", "LLM"],
    },
    {
        title: "AOD-DC-Net: End-to-end Image Dehazing",
        excerpt: "An end-to-end image dehazing system with a light-weighted CNN and dark channel prior. Course project (instructor: Joseph Konan) with Jingsi Chen, Junxiao Guo, Shuhao Ren, and Luo Yu.",
        link: "https://github.com/cyborgoat/AOD-DC-Net",
        tags: ["CNN", "Image Processing"],
    },
    {
        title: "Omnichat",
        excerpt: "A modern chat application for interacting with multiple AI models from different providers.",
        link: "https://github.com/cyborgoat/omnichat",
        tags: ["Chat", "AI", "Multi-provider"],
    },
    {
        title: "MonoLLM",
        excerpt: "An exploration of a monolithic Large Language Model approach.",
        link: "https://github.com/cyborgoat/MonoLLM",
        tags: ["LLM", "Research"],
    },
    {
        title: "Map Matching",
        excerpt: "Matching noisy GPS traces to road networks for improved navigation and tracking.",
        link: "https://github.com/cyborgoat/map-matching",
        tags: ["GPS", "Navigation"],
    },
];

export const selectedProjects = projects.flatMap(({featuredExcerpt, ...project}) =>
    featuredExcerpt ? [{...project, excerpt: featuredExcerpt}] : [],
);
