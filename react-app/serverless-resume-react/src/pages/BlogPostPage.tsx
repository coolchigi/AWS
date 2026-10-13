import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { PiArrowLeft } from "react-icons/pi";
// Dark code blocks in both themes
import "highlight.js/styles/github-dark.css";
import { cardMetaClass } from "../components/ui";
import type { Post } from "../types/blog";
import { getPostBySlug } from "../utils/blog";
import { formatPostDate } from "../utils/date";

const BlogPostPage: React.FC = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const [loaded, setLoaded] = useState<{ slug: string; post: Post | null } | null>(null);

  // The post's text is its own chunk, fetched when the post is opened
  useEffect(() => {
    let active = true;
    // getPostBySlug validates the slug — returns null for malformed or missing slugs
    getPostBySlug(slug).then((post) => {
      if (active) setLoaded({ slug, post });
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (!loaded || loaded.slug !== slug) {
    return <p className="text-muted">Loading…</p>;
  }

  const { post } = loaded;
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article aria-labelledby="post-title">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent mb-8"
      >
        <PiArrowLeft aria-hidden="true" /> Back to Blogs
      </Link>

      <header className="mb-10">
        <time className={`${cardMetaClass} block mb-3`} dateTime={post.date}>
          {formatPostDate(post.date)}
        </time>
        <h1
          id="post-title"
          className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] mb-4"
        >
          {post.title}
        </h1>
        <p className="text-muted text-lg leading-relaxed">{post.description}</p>
      </header>

      <hr className="border-line mb-10" />

      <div className="prose prose-site max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Wide tables scroll inside their own box instead of pushing the page sideways on phones
            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPostPage;
