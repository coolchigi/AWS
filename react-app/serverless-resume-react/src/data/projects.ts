export interface ProjectLink {
  label: string;
  // Paths starting with "/" are pages on this site, everything else opens in a new tab
  href: string;
}

export interface Project {
  name: string;
  year: string;
  href: string;
  description: string;
  links: ProjectLink[];
  // Featured projects show on the homepage. Every project shows on the Projects page.
  featured: boolean;
}

const ARGUS_LIVE = "https://main.d270cjhakw6y7j.amplifyapp.com";

export const projects: Project[] = [
  {
    name: "Argus",
    year: "2026",
    href: ARGUS_LIVE,
    description:
      "Tells Canadian immigration consultants which clients an IRCC policy change affects, with a signed record of why. Built for AWS Zero to Shipped.",
    links: [
      { label: "Live", href: ARGUS_LIVE },
      { label: "Source", href: "https://github.com/coolchigi/argus" },
    ],
    featured: true,
  },
  {
    name: "MapleTrade",
    year: "2025",
    href: "https://github.com/coolchigi/MapleTrade",
    description:
      "An agentic trading app built with Google ADK and Gemini, meant to make trading easier to get into.",
    links: [{ label: "Source", href: "https://github.com/coolchigi/MapleTrade" }],
    featured: true,
  },
  {
    name: "AED Simulation",
    year: "2023",
    href: "https://github.com/WaillyMohamed/AED",
    description:
      "Simulates an automated external defibrillator, the device that delivers a shock in life-threatening emergencies. Built in C++ with Qt.",
    links: [{ label: "Source", href: "https://github.com/WaillyMohamed/AED" }],
    featured: false,
  },
  {
    name: "MediFind",
    year: "2023",
    href: "https://github.com/coolchigi/MediFind",
    description:
      "A full-stack app that makes healthcare provider data easier for Canadians to search.",
    links: [{ label: "Source", href: "https://github.com/coolchigi/MediFind" }],
    featured: true,
  },
  {
    name: "K8s FastAPI",
    year: "2023",
    href: "https://github.com/coolchigi/K8s-fastapi",
    description:
      "A FastAPI service with a step-by-step guide to running it on a local Kubernetes cluster.",
    links: [{ label: "Source", href: "https://github.com/coolchigi/K8s-fastapi" }],
    featured: false,
  },
  {
    name: "This site",
    year: "2022",
    href: "https://github.com/coolchigi/AWS",
    description:
      "React on S3 and CloudFront, with a serverless visitor counter on Lambda and DynamoDB.",
    links: [
      { label: "Article", href: "/blog/building-my-serverless-resume" },
      { label: "Source", href: "https://github.com/coolchigi/AWS" },
    ],
    featured: true,
  },
];
