import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

type Project = {
  title: string;
  excerpt: string;
  thumbnail: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Nebula Notes",
    excerpt: "A sleek note-taking app with real-time collaboration and markdown support.",
    thumbnail: "/images/projects/nebula-notes.jpg",
    link: "https://github.com/correctpoding/nebula-notes"
  },
  {
    title: "Pixel Pal",
    excerpt: "An AI-powered image enhancer that transforms your photos with style.",
    thumbnail: "/images/projects/pixel-pal.jpg",
    link: "https://github.com/correctpoding/pixel-pal"
  },
  {
    title: "EcoTrack",
    excerpt: "Track your carbon footprint and discover sustainable habits in an interactive dashboard.",
    thumbnail: "/images/projects/eco-track.jpg",
    link: "https://github.com/correctpoding/eco-track"
  }
];

export default function ProjectMainPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <CardContainer key={idx} className="w-full h-full cursor-pointer">
            <CardBody>
              <CardItem
                as="img"
                src={project.thumbnail}
                alt={project.title}
                translateZ={50}
                className="w-full h-48 object-cover rounded-md"
              />
              <CardItem as="h3" translateY={20} className="mt-4 text-xl font-semibold">
                {project.title}
              </CardItem>
              <CardItem as="p" translateY={20} className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {project.excerpt}
              </CardItem>
              <CardItem
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                translateZ={20}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                View on GitHub
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}