import type { Post, PostMeta } from "../types/blog";

// Loaded at build time — no runtime file system access
const markdownFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  eager: true,
});

// ---------------------------------------------------------------------------
// Custom frontmatter parser — replaces gray-matter
// Handles our fixed schema: string fields + tags array.
// Uses indexOf(':') so values containing colons (URLs, descriptions) are safe.
// ---------------------------------------------------------------------------
interface FrontmatterResult {
  data: Record<string, unknown>;
  content: string;
}

function parseFrontmatter(raw: string): FrontmatterResult {
  const DELIMITER = "---";

  if (!raw.startsWith(DELIMITER)) {
    return { data: {}, content: raw };
  }

  const closeAt = raw.indexOf("\n---", 3);
  if (closeAt === -1) {
    return { data: {}, content: raw };
  }

  const yamlBlock = raw.slice(4, closeAt); // between opening and closing ---
  const content = raw.slice(closeAt + 4).trimStart(); // after closing ---

  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();
    if (!key) continue;

    // Array value — e.g. ["AWS", "React"]
    if (rawValue.startsWith("[")) {
      const inner = rawValue.slice(1, rawValue.lastIndexOf("]"));
      data[key] = inner
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }

    // Scalar — strip surrounding quotes if present
    data[key] = rawValue.replace(/^["']|["']$/g, "");
  }

  return { data, content };
}

// ---------------------------------------------------------------------------

function slugFromPath(path: string): string {
  return (
    path
      .split("/")
      .pop()
      ?.replace(/\.md$/, "")
      .toLowerCase()
      .replace(/_/g, "-") ?? ""
  );
}

function parsePostMeta(path: string, raw: string): PostMeta {
  const { data } = parseFrontmatter(raw);
  return {
    slug: slugFromPath(path),
    title: typeof data.title === "string" ? data.title : "Untitled",
    date: typeof data.date === "string" ? data.date : "",
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    coverImage:
      typeof data.coverImage === "string" ? data.coverImage : undefined,
  };
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(markdownFiles)
    .map(([path, mod]) => {
      const raw = (mod as { default: string }).default;
      return parsePostMeta(path, raw);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  // Validate slug — rejects malformed URLs before any lookup
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const entry = Object.entries(markdownFiles).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return null;

  const raw = (entry[1] as { default: string }).default;
  const { content } = parseFrontmatter(raw);

  return {
    ...parsePostMeta(entry[0], raw),
    content,
  };
}
