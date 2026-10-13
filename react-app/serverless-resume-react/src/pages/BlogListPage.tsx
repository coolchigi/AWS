import React from "react";
import BlogCards from "../components/BlogCards/BlogCards";
import { pageTitleClass } from "../components/ui";
import { getAllPosts } from "../utils/blog";

const BlogListPage: React.FC = () => {
  const posts = getAllPosts().filter((post) => !post.series);

  return (
    <section aria-labelledby="blogs-title">
      <h1 id="blogs-title" className={`${pageTitleClass} mb-6`}>
        Blogs
      </h1>
      <BlogCards posts={posts} />
    </section>
  );
};

export default BlogListPage;
