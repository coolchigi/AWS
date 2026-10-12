import React from "react";
import SocialLinks from "../SocialLinks/SocialLinks";
import VisitorCounter from "../VisitorCounter/VisitorCounter";

const Footer: React.FC = () => (
  <footer className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-muted text-sm">
    <span>&copy; {new Date().getFullYear()} Chigozirim Eke</span>
    {/* The sidebar shows these on desktop */}
    <div className="flex items-center gap-4 flex-wrap lg:hidden">
      <SocialLinks />
      <VisitorCounter />
    </div>
  </footer>
);

export default Footer;
