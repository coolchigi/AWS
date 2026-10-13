import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `post.md?frontmatter` imports only the frontmatter block of a post, so the
// blog index stays small and full post bodies load when a post is opened.
function markdownFrontmatter(): Plugin {
  return {
    name: "markdown-frontmatter",
    enforce: "pre",
    transform(code, id) {
      const [file, query = ""] = id.split("?");
      if (!file.endsWith(".md") || !query.split("&").includes("frontmatter")) {
        return null;
      }
      const end = code.startsWith("---") ? code.indexOf("\n---", 3) : -1;
      const block = end === -1 ? "" : code.slice(0, end + 4);
      return { code: `export default ${JSON.stringify(block)};`, map: null };
    },
  };
}

export default defineConfig({
  plugins: [markdownFrontmatter(), react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
