import React from "react";
import { PiEnvelopeSimple, PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";
import { iconButtonClass } from "../ui";

const links = [
  { label: "Email", href: "mailto:chigo.s.eke@gmail.com", Icon: PiEnvelopeSimple, external: false },
  { label: "GitHub", href: "https://github.com/coolchigi", Icon: PiGithubLogo, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chigozirim-eke/", Icon: PiLinkedinLogo, external: true },
];

const SocialLinks: React.FC = () => (
  <div className="flex gap-2">
    {links.map(({ label, href, Icon, external }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        title={label}
        className={iconButtonClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Icon aria-hidden="true" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
