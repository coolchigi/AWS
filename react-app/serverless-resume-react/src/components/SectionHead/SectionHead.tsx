import React from "react";
import { Link } from "react-router-dom";
import { PiArrowRight } from "react-icons/pi";
import { pillLinkClass, sectionTitleClass } from "../ui";

interface SectionHeadProps {
  id: string;
  title: string;
  link?: { to: string; label: string };
}

const SectionHead: React.FC<SectionHeadProps> = ({ id, title, link }) => (
  <div className="flex items-baseline justify-between gap-4 mb-5">
    <h2 id={id} className={sectionTitleClass}>
      {title}
    </h2>
    {link && (
      <Link to={link.to} className={pillLinkClass}>
        {link.label} <PiArrowRight aria-hidden="true" />
      </Link>
    )}
  </div>
);

export default SectionHead;
