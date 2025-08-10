import React from "react";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import fs from "fs";
import path from "path";
import {CircleArrowOutUpLeft} from "lucide-react";
import TextPressure from "@/components/animation/TextPressure";

type Project = {
    title: string;
    excerpt: string;
    thumbnail: string;
    link: string;
};

export default async function ProjectMainPage() {
    // Load projects data from public folder
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const json = fs.readFileSync(filePath, "utf8");
    const projects: Project[] = JSON.parse(json);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-36 h-12 mx-auto">
                <TextPressure
                    text="Projects"
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ff0000"
                    minFontSize={8}
                />
            </div>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                    <CardContainer
                        key={idx}
                        className="group w-full h-full cursor-pointer"
                    >
                        <CardBody className="h-[500px] flex flex-col">
                            <CardItem
                                as="img"
                                src={project.thumbnail}
                                alt={project.title}
                                translateZ={50}
                                className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 ease-out group-hover:scale-105 flex-shrink-0"
                            />
                            <CardItem
                                as="h3"
                                translateY={20}
                                className="mt-4 text-xl font-semibold line-clamp-2 flex-shrink-0"
                            >
                                {project.title}
                            </CardItem>
                            <CardItem
                                as="p"
                                translateY={20}
                                className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow line-clamp-4"
                            >
                                {project.excerpt}
                            </CardItem>
                            <CardItem
                                as="a"
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:underline hover:text-bold transition-colors duration-200 flex-shrink-0"
                            >
                                <CircleArrowOutUpLeft size={14}/>
                                <span>Go to project</span>
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </div>
    );
}
