import React from "react";
import SectionHead from "../SectionHead/SectionHead";
import SectionLink from "../SectionLink/SectionLink";

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-accent font-semibold">{children}</span>
);

const rows: { years: string; body: React.ReactNode }[] = [
  {
    years: "2020-2025",
    body: (
      <>
        <Label>Student</Label>: Computer Science (Honours) at Carleton University, with a concentration in
        Management and Business Systems and a minor in Business. Made the Dean's Honour List.
      </>
    ),
  },
  {
    years: "2022",
    body: (
      <>
        <Label>Cloud beginner</Label>: started on{" "}
        <a
          className="text-link"
          href="https://www.credly.com/badges/876a2eef-b396-408d-86ff-811da7f10d5a/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS certifications
        </a>{" "}
        and built small projects to learn by doing.
      </>
    ),
  },
  {
    years: "2023-2025",
    body: (
      <>
        <Label>Intern</Label>: quality engineering at TD Bank, DevOps/SRE at Nokia, and 2 internships doing
        cloud work at SurveyMonkey. Taught an AWS course at The Key one summer.
      </>
    ),
  },
  {
    years: "2025-now",
    body: (
      <>
        <Label>Systems engineer</Label>: joined SurveyMonkey full-time in June 2025, right after graduating in
        April. I work on Terraform and observability.
      </>
    ),
  },
];

const Timeline: React.FC = () => (
  <section id="timeline" aria-labelledby="timeline-title">
    <SectionHead id="timeline-title" title="A brief timeline" />
    <dl className="grid gap-[18px]">
      {rows.map((row) => (
        <div key={row.years} className="grid gap-0.5 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-5">
          <dt className="font-mono text-[0.8125rem] text-muted pt-1 tabular-nums">{row.years}</dt>
          <dd className="max-w-[60ch]">{row.body}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-6 text-[1.0625rem] max-w-[62ch]">
      <Label>Also</Label>: building{" "}
      <SectionLink section="projects" className="text-link">
        Argus
      </SectionLink>
      , which tells Canadian immigration consultants which of their clients an IRCC policy change affects.
    </p>
    <p className="mt-2.5 text-[1.0625rem] max-w-[62ch]">
      <Label>Next</Label>: building website designs.
    </p>
  </section>
);

export default Timeline;
