export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  icon: string;
  tags: string[];
  status: 'ongoing' | 'completed';
  featured?: boolean;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  category: 'ai-ml' | 'fullstack' | 'cloud-devops';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
  icon: string;
}

export interface Hobby {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface AboutMe {
  title: string;
  description: string;
  experience: string;
  focus: string;
  authorImage?: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  about: AboutMe;
  featuredProject: Project;
  projects: Project[];
  skills: Skill[];
  education: Education[];
  hobbies: Hobby[];
}
