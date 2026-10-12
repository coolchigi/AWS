import React from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { pageTitleClass } from "../components/ui";
import { projects } from "../data/projects";

const ProjectsPage: React.FC = () => (
  <section aria-labelledby="projects-page-title">
    <h1 id="projects-page-title" className={`${pageTitleClass} mb-6`}>
      Projects
    </h1>
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  </section>
);

export default ProjectsPage;
