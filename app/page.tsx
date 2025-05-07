import Link from 'next/link';
import Hero from '@/components/layout/Hero'; // Using the centered Hero from previous step
import { BrainCircuit, Code, GraduationCap, Bike, Music, Target, Cloud, Database, Trophy } from 'lucide-react'; // Added more icons
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"; // Import shadcn Button
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import shadcn Card components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"; // Import shadcn Avatar components


export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero /> {/* Assumes the vertically centered Hero */}

      {/* About Me Section - Remains largely the same, could wrap in Card if desired */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">About Me</h2>
              <p className={cn("text-foreground/80", "md:text-lg lg:text-base xl:text-lg")}>
                I'm Cyborgoat, an AI Engineer and Fullstack Enthusiast with over 7 years of experience
                bringing cutting-edge AI concepts to life. My current focus is on developing advanced
                Large Language Models (LLMs) and intelligent AI Agents.
              </p>
              <p className={cn("text-foreground/80", "md:text-lg lg:text-base xl:text-lg")}>
                With a background bridging Physics and Electrical & Computer Engineering, I approach
                problems with a unique analytical perspective, always eager to learn and build robust,
                scalable solutions across the full stack.
              </p>
            </div>
            {/* Optional Avatar */}
            <div className="flex items-center justify-center">
              <Avatar className="w-48 h-48 lg:w-64 lg:h-64 border-2 border-primary/20">
                {/* Add your image source here */}
                <AvatarImage src="https://github.com/shadcn.png" alt="@cyborgoat" />
                {/* Fallback initials */}
                <AvatarFallback className="text-4xl">CG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section - Using shadcn Card */}
      <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-primary">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Card 1: AI/ML */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-4">
                <BrainCircuit className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Deep Learning, LLMs (Large Language Models), AI Agents, Natural Language Processing (NLP), Computer Vision basics. 7+ years experience building and deploying AI solutions.
                </p>
                {/* Optional: Add specific tech badges/list here */}
              </CardContent>
            </Card>

            {/* Skill Card 2: Fullstack Dev */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-4">
                <Code className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>Fullstack Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Building complete web applications with modern stacks. Proficient in React, Next.js, TypeScript, Node.js, Python (Flask/Django), Tailwind CSS, SQL/NoSQL databases.
                </p>
              </CardContent>
            </Card>

            {/* Skill Card 3: Cloud & Tools */}
            <Card className="flex flex-col">
               <CardHeader className="items-center pb-4">
                 <Cloud className="w-10 h-10 mb-4 text-primary" />
                 <CardTitle>Cloud & DevOps</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-muted-foreground text-center">
                   Deploying and managing applications on cloud platforms (AWS, GCP, Azure). Experience with Docker, Kubernetes basics, CI/CD pipelines (GitHub Actions/GitLab CI), Terraform.
                 </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education & Hobbies Section */}
       <section id="background" className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6 mx-auto grid md:grid-cols-2 gap-12">
           {/* Education - Using Card */}
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-primary">Education</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <Avatar>
                      {/* <AvatarImage src="/cmu-logo.png" alt="CMU Logo" /> */}
                      <AvatarFallback><GraduationCap /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                       <CardTitle className="text-base font-semibold">Carnegie Mellon University (CMU)</CardTitle>
                       <CardDescription>Master of Science (2020)</CardDescription>
                    </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">Electrical & Computer Engineering</p>
                   {/* Optional: Add relevant coursework or thesis title */}
                 </CardContent>
              </Card>
              <Card>
                 <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                   <Avatar>
                      {/* <AvatarImage src="/drexel-logo.png" alt="Drexel Logo" /> */}
                      <AvatarFallback><GraduationCap /></AvatarFallback>
                   </Avatar>
                   <div className="flex-1">
                       <CardTitle className="text-base font-semibold">Drexel University</CardTitle>
                       <CardDescription>Bachelor of Science (2017)</CardDescription>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">Physics</p>
                 </CardContent>
              </Card>
            </div>
          </div>

           {/* Hobbies - Keeping simple list */}
           <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-primary">Hobbies</h2>
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <Bike className="w-6 h-6 text-primary flex-shrink-0" />
                 <p className="text-foreground/80">Cycling - Exploring trails and roads for fitness and fun.</p>
               </div>
                <div className="flex items-center gap-4">
                 <Music className="w-6 h-6 text-primary flex-shrink-0" />
                 <p className="text-foreground/80">Music Production - Creating beats and exploring sound design.</p>
               </div>
                <div className="flex items-center gap-4">
                 <Trophy className="w-6 h-6 text-primary flex-shrink-0" />
                 <p className="text-foreground/80">Golfing - Enjoying the challenge and outdoors on the course.</p>
               </div>
             </div>
          </div>
        </div>
       </section>

      {/* Placeholder for Project/Blog Previews - Still recommend adding later */}

    </main>
  );
}