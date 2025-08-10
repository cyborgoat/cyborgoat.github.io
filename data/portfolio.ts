import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  about: {
    title: "About Me",
    description: "I'm passionate about AI and fortunate to lead an incredible team of 20+ brilliant engineers, many of whom graduated from top universities globally. Together, we're pushing the boundaries of Large Language Models (LLMs), AI Agents, and full-stack development.",
    experience: "I'm currently focused on leading our team's work on advanced LLM systems and AI agent development. It's incredibly rewarding to collaborate with such talented individuals - we've successfully delivered multiple AI projects from concept to production while learning from each other and fostering a culture of innovation.",
    focus: "AI Tech Leader & Senior Engineer",
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

  featuredProject: {
    id: "swarm",
    title: "Swarm",
    description: "A powerful CLI-based agent designed for interactive web browsing, intelligent automation, and deep research with seamless LLM integration. This project offers a transparent and controllable way to interact with the web, featuring advanced LLM integration for intelligent automation and research capabilities.",
    githubUrl: "https://github.com/cyborgoat/swarm",
    icon: "Zap",
    tags: ["Python", "CLI", "LLM", "Web Automation"],
    status: "completed",
    featured: true
  },

  projects: [
    // Ongoing Ventures
    {
      id: "llm-workflow-agent-template",
      title: "LLM Workflow Agent Template",
      description: "A minimal agentic LLM web app built with Next.js 15, featuring a chat interface and a visual workflow editor for AI agent flows.",
      githubUrl: "https://github.com/cyborgoat/llm-workflow-agent-template",
      icon: "Rocket",
      tags: ["Next.js", "React", "AI", "Workflow"],
      status: "ongoing"
    },
    {
      id: "company-website-template",
      title: "Company Website Template",
      description: "A responsive website template for companies, built with modern web technologies.",
      githubUrl: "https://github.com/cyborgoat/company-website-template",
      icon: "Code",
      tags: ["Web", "Template", "Responsive"],
      status: "ongoing"
    },
    {
      id: "simplelm",
      title: "SimpleLM",
      description: "A simple language model implementation for educational purposes.",
      githubUrl: "https://github.com/cyborgoat/SimpleLM",
      icon: "BrainCircuit",
      tags: ["Python", "AI", "Education"],
      status: "ongoing"
    },
    {
      id: "omnichat",
      title: "Omnichat",
      description: "A modern chat application for interacting with multiple AI models from different providers.",
      githubUrl: "https://github.com/cyborgoat/omnichat",
      icon: "Cloud",
      tags: ["Chat", "AI", "Multi-provider"],
      status: "ongoing"
    },
    {
      id: "dayrider",
      title: "Dayrider",
      description: "A project related to daily riding or tracking activities.",
      githubUrl: "https://github.com/cyborgoat/dayrider",
      icon: "Bike",
      tags: ["Activity", "Tracking"],
      status: "ongoing"
    },
    {
      id: "monollm",
      title: "MonoLLM",
      description: "A project focused on a monolithic Large Language Model approach.",
      githubUrl: "https://github.com/cyborgoat/MonoLLM",
      icon: "BrainCircuit",
      tags: ["LLM", "Monolithic"],
      status: "ongoing"
    },

    // Completed Milestones
    {
      id: "aod-dc-net",
      title: "AOD-DC-Net",
      description: "An end-to-end image dehazing system using a lightweight CNN and dark channel prior.",
      githubUrl: "https://github.com/cyborgoat/AOD-DC-Net",
      icon: "BrainCircuit",
      tags: ["CNN", "Image Processing", "Dehazing"],
      status: "completed"
    },
    {
      id: "map-matching",
      title: "Map Matching",
      description: "A project focused on matching GPS data to a map for improved navigation and tracking.",
      githubUrl: "https://github.com/cyborgoat/map-matching",
      icon: "Code",
      tags: ["GPS", "Navigation", "Mapping"],
      status: "completed"
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
