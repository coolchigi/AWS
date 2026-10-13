import React from "react";
import type { Project } from "../../data/projects";
import SmartLink from "../SmartLink/SmartLink";
import {
  cardClass,
  cardDescClass,
  cardHeadClass,
  cardLinksClass,
  cardMetaClass,
  cardTitleClass,
  projectTitleLinkClass,
} from "../ui";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className={cardClass}>
    <div className={cardHeadClass}>
      <h3 className={cardTitleClass}>
        <SmartLink href={project.href} className={projectTitleLinkClass}>
          {project.name}
        </SmartLink>
      </h3>
      <span className={cardMetaClass}>{project.year}</span>
    </div>
    <p className={cardDescClass}>{project.description}</p>
    <p className={cardLinksClass}>
      {project.links.map((link) => (
        <SmartLink key={link.label} href={link.href} className="text-link">
          {link.label}
        </SmartLink>
      ))}
    </p>
  </article>
);

export default ProjectCard;
