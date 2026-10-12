import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BlogCards from "../components/BlogCards/BlogCards";
import Intro from "../components/Intro/Intro";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SectionHead from "../components/SectionHead/SectionHead";
import type { ScrollState } from "../components/SectionLink/SectionLink";
import Timeline from "../components/Timeline/Timeline";
import { projects } from "../data/projects";
import { getAllPosts } from "../utils/blog";

const HomePage: React.FC = () => {
  const location = useLocation();
  const featuredProjects = projects.filter((project) => project.featured);
  const latestPosts = getAllPosts()
    .filter((post) => !post.series)
    .slice(0, 2);

  // Sidebar links pass the section to scroll to in router state (see SectionLink)
  useEffect(() => {
    const target = (location.state as ScrollState | null)?.scrollTo;
    if (!target) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (target === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior });
  }, [location.key, location.state]);

  return (
    <>
      <Intro />
      <Timeline />

      <section id="projects" aria-labelledby="projects-title">
        <SectionHead id="projects-title" title="Projects" link={{ to: "/projects", label: "All projects" }} />
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section id="posts" aria-labelledby="posts-title">
        <SectionHead id="posts-title" title="Blogs" link={{ to: "/blog", label: "All blogs" }} />
        <BlogCards posts={latestPosts} />
      </section>
    </>
  );
};

export default HomePage;
