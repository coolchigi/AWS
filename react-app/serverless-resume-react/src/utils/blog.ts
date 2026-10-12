import type { Post, PostMeta } from "../types/blog";

// Loaded at build time — no runtime file system access.
// Only the frontmatter is bundled up front (see the ?frontmatter plugin in vite.config.ts).
// A post's full text is a separate chunk that loads when the post is opened.
const frontmatterFiles = import.meta.glob<string>("../content/blog/*.md", {
  query: "?frontmatter",
  import: "default",
  eager: true,
});

const markdownFiles = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
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
    series: typeof data.series === "string" ? data.series : undefined,
  };
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(frontmatterFiles)
    .map(([path, frontmatter]) => parsePostMeta(path, frontmatter))
    .sort((a, b) => {
      // Date.parse yields NaN for empty/invalid dates; fall back to 0 so those
      // posts sort deterministically to the end (oldest) instead of shuffling.
      const bTime = Date.parse(b.date) || 0;
      const aTime = Date.parse(a.date) || 0;
      return bTime - aTime;
    });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Validate slug — rejects malformed URLs before any lookup
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const entry = Object.entries(markdownFiles).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return null;

  const [path, loadRaw] = entry;
  const raw = await loadRaw();
  const { content } = parseFrontmatter(raw);

  return {
    ...parsePostMeta(path, raw),
    content,
  };
}
