import React from "react";
import { PiMoon, PiSun } from "react-icons/pi";
import { iconButtonClass } from "../ui";

// The icon swaps in CSS (.theme-icon-*), so it's right on first paint with no React state
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked (private windows). The toggle still works for this visit.
  }
}

const ThemeToggle: React.FC = () => (
  <button
    type="button"
    onClick={toggleTheme}
    className={iconButtonClass}
    aria-label="Switch between light and dark theme"
  >
    <PiMoon className="theme-icon-moon" aria-hidden="true" />
    <PiSun className="theme-icon-sun" aria-hidden="true" />
  </button>
);

export default ThemeToggle;
