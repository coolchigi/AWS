import React from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../utils/blog";

const BlogListPage: React.FC = () => {
  const posts = getAllPosts();

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Blog</h1>
        <p className="text-gray-500 mb-10">
          Thoughts on cloud engineering, AWS, and building things.
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-pink-300 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogListPage;
