import React from "react";
import { useParams } from "react-router-dom";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main className="pt-28 pb-12 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-gray-400 text-sm mb-4">Post: {slug}</p>
        <p className="text-gray-500">Content coming soon...</p>
      </div>
    </main>
  );
};

export default BlogPostPage;
