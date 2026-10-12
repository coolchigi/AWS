import React from "react";
import { Link, useLocation } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";
import SocialLinks from "../SocialLinks/SocialLinks";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import VisitorCounter from "../VisitorCounter/VisitorCounter";

type NavItem =
  // A section on the homepage. activeOn lights the link up on its matching page.
  | { label: string; section: string; activeOn?: string }
  // A page of its own
  | { label: string; to: string };

const navItems: NavItem[] = [
  { label: "Projects", section: "projects", activeOn: "/projects" },
  { label: "A brief timeline", section: "timeline" },
  { label: "Designs", to: "/designs" },
  { label: "Blogs", section: "posts", activeOn: "/blog" },
];

const navLinkClass = (active: boolean) =>
  `px-3 py-1.5 rounded-full font-medium text-[0.9375rem] lg:text-base whitespace-nowrap transition-colors hover:text-accent ${
    active ? "text-accent" : ""
  }`;

// Fixed on the left from 1024px up, a bar across the top below that
const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <aside className="flex flex-col gap-5 p-4 border-b border-line lg:sticky lg:top-0 lg:h-dvh lg:gap-7 lg:px-6 lg:py-8 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3">
        <SectionLink
          section="top"
          className="font-display font-[650] text-lg tracking-[-0.01em] transition-colors hover:text-accent"
        >
          Chigozirim <span className="text-accent">Eke</span>
        </SectionLink>
        <ThemeToggle />
      </div>

      <nav aria-label="Main" className="flex gap-1 overflow-x-auto -mx-2 lg:flex-col lg:overflow-visible lg:-mx-3">
        {navItems.map((item) => {
          if ("to" in item) {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={navLinkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          }
          const active = item.activeOn !== undefined && pathname.startsWith(item.activeOn);
          return (
            <SectionLink key={item.label} section={item.section} className={navLinkClass(active)}>
              {item.label}
            </SectionLink>
          );
        })}
      </nav>

      <div className="hidden lg:flex flex-col gap-3 mt-auto">
        <SocialLinks />
        <VisitorCounter />
      </div>
    </aside>
  );
};

export default Sidebar;
