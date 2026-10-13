import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ScrollState } from "../SectionLink/SectionLink";

// HashRouter keeps the old scroll position between pages. Start each page at the top,
// unless a SectionLink asked the homepage to scroll to a section.
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!(state as ScrollState | null)?.scrollTo) window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
