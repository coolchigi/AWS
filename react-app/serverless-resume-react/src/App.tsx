import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

// Lazy-load blog pages — markdown + highlight.js only download when /blog is visited
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Suspense fallback={<div className="pt-28 px-6 text-gray-400">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
