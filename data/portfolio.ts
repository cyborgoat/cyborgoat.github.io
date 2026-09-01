import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  about: {
    title: "About Me",
    description: "I'm passionate about AI and fortunate to lead an incredible team of 20+ brilliant engineers, many of whom graduated from top universities globally. Together, we're pushing the boundaries of Large Language Models (LLMs), AI Agents, and full-stack development.",
    experience: "I'm currently focused on leading our team's work on advanced LLM systems and AI agent development. It's incredibly rewarding to collaborate with such talented individuals - we've successfully delivered multiple AI projects from concept to production while learning from each other and fostering a culture of innovation.",
    focus: "AI Tech Leader & Senior Engineer",
    authorImage: "/junxiaog.jpeg",
    socialLinks: [
      {
        id: "github",
        platform: "GitHub",
        url: "https://github.com/cyborgoat",
        icon: "Github",
        label: "GitHub"
      },
      {
        id: "linkedin",
        platform: "LinkedIn",
        url: "https://linkedin.com/in/junxiaog",
        icon: "Linkedin",
        label: "LinkedIn"
      }
    ]
  },

  featuredProjects: [
    {
      id: "nest",
      title: "Nest",
      description: "A local-first desktop knowledge workspace for reading, editing, and searching Markdown knowledge packs via retrieval-augmented chat with OpenAI-compatible LLMs. Built with Tauri v2 + React, a NestJS Hub API, and FastEmbed + SQLite FTS for offline retrieval.",
      githubUrl: "https://github.com/cyborgoat/nest",
      icon: "BookMarked",
      tags: ["Tauri v2", "React", "NestJS", "RAG"],
      status: "ongoing",
      featured: true
    },
    {
      id: "quizzy",
      title: "Quizzy",
      description: "A Tauri v2 desktop quiz app for organizing and tracking learning through local JSON-based quizzes — study goals, attempt history, a mistake log, and integrated markdown notes, with fully private, local-only data.",
      githubUrl: "https://github.com/cyborgoat/quizzy",
      icon: "GraduationCap",
      tags: ["Tauri v2", "React", "Local-first"],
      status: "ongoing",
      featured: true
    }
  ],

  projects: [
    // Currently building
    {
      id: "nest",
      title: "Nest",
      description: "A local-first desktop knowledge workspace: read, edit, and search Markdown knowledge packs via retrieval-augmented chat with OpenAI-compatible LLMs. Tauri v2 + React, NestJS Hub API, FastEmbed + SQLite FTS.",
      githubUrl: "https://github.com/cyborgoat/nest",
      icon: "BookMarked",
      tags: ["Tauri v2", "React", "NestJS", "RAG"],
      status: "ongoing"
    },
    {
      id: "quizzy",
      title: "Quizzy",
      description: "A Tauri v2 desktop quiz app for organizing and tracking learning — study goals, attempt history, a mistake log, and markdown notes, all stored locally and privately.",
      githubUrl: "https://github.com/cyborgoat/quizzy",
      icon: "GraduationCap",
      tags: ["Tauri v2", "React", "Local-first"],
      status: "ongoing"
    },
    {
      id: "finch",
      title: "Finch",
      description: "A privacy-focused voice transcription app that runs locally with Qwen3-ASR-1.7B, with optional LLM post-processing. FastAPI backend, TanStack Start frontend, speaker diarization, and persistent voiceprint profiles.",
      githubUrl: "https://github.com/cyborgoat/finch",
      icon: "Mic",
      tags: ["FastAPI", "ASR", "TanStack Start"],
      status: "ongoing"
    },
    {
      id: "cubicles",
      title: "Cubicles",
      description: "A Python agent workbench for human-guided AI collaboration — persistent sessions, inspectable workflows, explicit tool approvals, and both CLI and web interfaces. Supports Ollama and OpenAI-compatible providers.",
      githubUrl: "https://github.com/cyborgoat/cubicles",
      icon: "Boxes",
      tags: ["Python", "Agents", "CLI"],
      status: "ongoing"
    },

    // Earlier work
    {
      id: "swarm",
      title: "Swarm",
      description: "A CLI-based agent for interactive web browsing, automation, and deep research with LLM integration.",
      githubUrl: "https://github.com/cyborgoat/swarm",
      icon: "Zap",
      tags: ["Python", "CLI", "LLM"],
      status: "archived"
    },
    {
      id: "llm-workflow-agent-template",
      title: "LLM Workflow Agent Template",
      description: "A minimal agentic LLM web app built with Next.js, featuring a chat interface and a visual workflow editor for AI agent flows.",
      githubUrl: "https://github.com/cyborgoat/llm-workflow-agent-template",
      icon: "Rocket",
      tags: ["Next.js", "React", "Workflow"],
      status: "archived"
    },
    {
      id: "simplelm",
      title: "SimpleLM",
      description: "A lightweight, CPU-friendly Transformer language model with SFT and PPO-based RLHF, built for teaching and small-hardware experimentation.",
      githubUrl: "https://github.com/cyborgoat/SimpleLM",
      icon: "BrainCircuit",
      tags: ["Python", "Transformers", "RLHF"],
      status: "archived"
    },
    {
      id: "omnichat",
      title: "Omnichat",
      description: "A modern chat application for interacting with multiple AI models from different providers.",
      githubUrl: "https://github.com/cyborgoat/omnichat",
      icon: "Cloud",
      tags: ["Chat", "AI", "Multi-provider"],
      status: "archived"
    },
    {
      id: "dayrider",
      title: "DayRider",
      description: "A minimal weekly todo and task-management app for simplifying your work week.",
      githubUrl: "https://github.com/cyborgoat/dayrider",
      icon: "Bike",
      tags: ["Productivity", "Tasks"],
      status: "archived"
    },
    {
      id: "monollm",
      title: "MonoLLM",
      description: "An exploration of a monolithic Large Language Model approach.",
      githubUrl: "https://github.com/cyborgoat/MonoLLM",
      icon: "BrainCircuit",
      tags: ["LLM", "Research"],
      status: "archived"
    },
    {
      id: "aod-dc-net",
      title: "AOD-DC-Net",
      description: "An end-to-end image dehazing system using a lightweight CNN and dark channel prior.",
      githubUrl: "https://github.com/cyborgoat/AOD-DC-Net",
      icon: "BrainCircuit",
      tags: ["CNN", "Image Processing"],
      status: "archived"
    },
    {
      id: "map-matching",
      title: "Map Matching",
      description: "Matching noisy GPS traces to road networks for improved navigation and tracking.",
      githubUrl: "https://github.com/cyborgoat/map-matching",
      icon: "Code",
      tags: ["GPS", "Navigation"],
      status: "archived"
    }
  ],

  skills: [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Deep Learning, LLMs, AI Agents, NLP, Computer Vision. 7+ years experience building and deploying AI solutions.",
      icon: "BrainCircuit",
      technologies: ["Python", "PyTorch", "TensorFlow", "Hugging Face"],
      category: "ai-ml"
    },
    {
      id: "fullstack",
      title: "Fullstack Development",
      description: "Building complete web applications with modern stacks and responsive design.",
      icon: "Code",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      category: "fullstack"
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      description: "Deploying and managing applications on cloud platforms with modern DevOps practices.",
      icon: "Cloud",
      technologies: ["Docker", "GitHub Actions", "AWS", "PostgreSQL"],
      category: "cloud-devops"
    }
  ],

  education: [
    {
      id: "cmu",
      institution: "Carnegie Mellon University (CMU)",
      degree: "Master of Science",
      field: "Electrical & Computer Engineering",
      year: "2020",
      icon: "GraduationCap"
    },
    {
      id: "drexel",
      institution: "Drexel University",
      degree: "Bachelor of Science",
      field: "Physics",
      year: "2017",
      icon: "GraduationCap"
    }
  ],

  hobbies: [
    {
      id: "cycling",
      title: "Cycling",
      description: "Exploring trails and roads for fitness and fun.",
      icon: "Bike"
    },
    {
      id: "music-production",
      title: "Music Production",
      description: "Creating beats and exploring sound design.",
      icon: "Music"
    },
    {
      id: "golfing",
      title: "Golfing",
      description: "Enjoying the challenge and outdoors on the course.",
      icon: "Trophy"
    }
  ]
};
