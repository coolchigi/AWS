import React from "react";
import { Link } from "react-router-dom";

interface SmartLinkProps {
  // Paths starting with "/" are pages on this site, everything else opens in a new tab
  href: string;
  className?: string;
  children: React.ReactNode;
}

const SmartLink: React.FC<SmartLinkProps> = ({ href, className, children }) =>
  href.startsWith("/") ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export default SmartLink;
