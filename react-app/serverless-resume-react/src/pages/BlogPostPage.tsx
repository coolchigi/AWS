import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { getPostBySlug } from "../utils/blog";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // getPostBySlug validates the slug — returns null for malformed or missing slugs
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#9F2B68] transition-colors mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <p className="text-sm text-gray-400 mb-3">{post.date}</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-pink-50 text-pink-700 border border-pink-200 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="border-gray-200 mb-10" />

        {/* Markdown body */}
        <article className="prose prose-gray max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
};

export default BlogPostPage;
