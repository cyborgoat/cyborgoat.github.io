import { portfolioData } from '@/data/portfolio';
import type { Project, Skill } from '@/types/portfolio';

export const getOngoingProjects = (): Project[] => {
  return portfolioData.projects.filter(project => project.status === 'ongoing');
};

export const getCompletedProjects = (): Project[] => {
  return portfolioData.projects.filter(project => project.status === 'completed');
};

export const getFeaturedProject = () => {
  return portfolioData.featuredProject;
};

export const getSkillsByCategory = (category: Skill['category']) => {
  return portfolioData.skills.filter(skill => skill.category === category);
};

export const getAllSkills = () => {
  return portfolioData.skills;
};

export const getAboutMe = () => {
  return portfolioData.about;
};

export const getEducation = () => {
  return portfolioData.education;
};

export const getHobbies = () => {
  return portfolioData.hobbies;
};

export const getSocialLinks = () => {
  return portfolioData.about.socialLinks;
};
