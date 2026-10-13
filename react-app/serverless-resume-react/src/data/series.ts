export interface SeriesPart {
  label: string;
  summary: string;
  // Slug of the published post. Leave it out until the part is published.
  slug?: string;
  // Shown after the summary while the part isn't published yet, e.g. "October 2026"
  coming?: string;
}

export interface Series {
  // Matches `series:` in the frontmatter of each part's markdown file
  id: string;
  name: string;
  date: string;
  description: string;
  source: string;
  parts: SeriesPart[];
}

export const strandsVsAdk: Series = {
  id: "strands-vs-adk",
  name: "Strands vs ADK",
  date: "2026-09",
  description:
    "I built the same agent system twice, once in AWS Strands Agents and once in Google ADK, so you can compare them on the same problem.",
  source: "https://github.com/coolchigi/strands-vs-adk",
  parts: [
    {
      label: "Part 1: Hello World",
      summary: "Tools, the agent loop, state, multi-agent, evaluation and deployment.",
      slug: "strands-vs-adk-part-1",
    },
    {
      label: "Part 2: The learning system",
      summary: "One sentence in, a Terraform course out.",
      coming: "October 2026",
    },
  ],
};
