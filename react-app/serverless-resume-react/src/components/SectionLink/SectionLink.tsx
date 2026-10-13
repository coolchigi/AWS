import React from "react";
import { useNavigate } from "react-router-dom";

// HashRouter owns the URL hash, so "#projects" can't be a plain anchor.
// Instead this goes to the homepage and passes the section in router state,
// and HomePage scrolls to it. Works from any page, including the blog.
export interface ScrollState {
  scrollTo: string;
}

interface SectionLinkProps {
  section: string;
  className?: string;
  children: React.ReactNode;
}

const SectionLink: React.FC<SectionLinkProps> = ({ section, className, children }) => {
  const navigate = useNavigate();

  return (
    <a
      href="#/"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        const state: ScrollState = { scrollTo: section };
        navigate("/", { state });
      }}
    >
      {children}
    </a>
  );
};

export default SectionLink;
