import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import fs from 'fs';
import path from 'path';

type Project = {
  title: string;
  excerpt: string;
  thumbnail: string;
  link: string;
};

export default async function ProjectMainPage() {
  // Load projects data from public folder
  const filePath = path.join(process.cwd(), 'public', 'data', 'projects.json');
  const json = fs.readFileSync(filePath, 'utf8');
  const projects: Project[] = JSON.parse(json);

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
                Go to project
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}