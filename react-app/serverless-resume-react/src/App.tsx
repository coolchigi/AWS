import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Sidebar from "./components/Sidebar/Sidebar";
import DesignsPage from "./pages/DesignsPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

// Lazy-load blog pages — markdown + highlight.js only download when /blog is visited
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Sidebar on the left from 1024px up, a top bar below that. Every page shares one reading column.
const App: React.FC = () => {
  return (
    <div className="grid grid-cols-1 min-h-dvh lg:grid-cols-[272px_minmax(0,1fr)]">
      <ScrollToTop />
      <Sidebar />
      <main className="min-w-0 px-4 pt-10 pb-12 md:px-12 md:py-16 xl:px-24">
        <div className="max-w-[720px] flex flex-col gap-16">
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/designs" element={<DesignsPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
