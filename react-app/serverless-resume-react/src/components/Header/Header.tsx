import React, { useState, useEffect, useRef } from "react";
import profilePic from "../../assets/img/profile-pic.jpeg";

// Scroll offset constant for better maintainability
const SCROLL_OFFSET = 100;
const THROTTLE_DELAY = 100; // milliseconds

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const scrollTimeoutRef = useRef<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sections = [
      "about",
      "experience",
      "projects",
      "education",
      "skills",
      "interests",
      "awards"
    ];

    const handleScroll = () => {
      // Throttle scroll events for better performance
      if (scrollTimeoutRef.current !== null) {
        return;
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }

        scrollTimeoutRef.current = null;
      }, THROTTLE_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#9F2B68] text-white z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <a
            href="#about"
            onClick={() => handleNavLinkClick("about")}
            className="flex items-center space-x-2 text-blue-500"
          >
            <img
              className="h-auto w-auto max-h-20 max-w-20 rounded-full"
              src={profilePic}
              alt="Chigozirim Eke"
            />
          </a>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden ml-4 p-2 rounded-lg hover:bg-pink-800 text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <i className={`uil ${isMenuOpen ? "uil-times" : "uil-bars"} text-2xl`}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            {[
              "about",
              "experience",
              "projects",
              "education",
              "skills",
              "interests",
              "awards"
            ].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={() => handleNavLinkClick(section)}
                  className={`block py-2 px-4 capitalize transition-colors duration-200
        ${
          activeSection === section
            ? "text-white font-bold"
            : "text-blue-500 font-bold"
        }
        hover:text-white`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
