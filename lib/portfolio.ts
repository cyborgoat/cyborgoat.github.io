import { portfolioData } from '@/data/portfolio';
import type { Project, Skill } from '@/types/portfolio';

export const getCurrentProjects = (): Project[] => {
  return portfolioData.projects.filter(project => project.status === 'ongoing');
};

export const getEarlierProjects = (): Project[] => {
  return portfolioData.projects.filter(
    project => project.status === 'archived' || project.status === 'completed'
  );
};

export const getFeaturedProjects = (): Project[] => {
  return portfolioData.featuredProjects;
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
