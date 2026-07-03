import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import profilePic from "../../assets/img/profile-pic.jpeg";

// Scroll offset constant for better maintainability
const SCROLL_OFFSET = 100;
const THROTTLE_DELAY = 100; // milliseconds

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const scrollTimeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    // Prevent the anchor from writing to the URL hash — HashRouter owns it,
    // and a raw "#about" would be parsed as a route and hit the catch-all.
    e.preventDefault();
    setActiveSection(section);
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      // Off the home route — go home first, then scroll once the section mounts.
      navigate("/");
      setTimeout(() => scrollToSection(section), 100);
      return;
    }

    scrollToSection(section);
  };

  useEffect(() => {
    const sections = [
      "about",
      "experience",
      "technical-expertise",
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
    <nav className="fixed top-0 w-full bg-[#9F2B68] text-white z-50 px-6 py-1">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleNavLinkClick(e, "about")}
            className="flex items-center space-x-2 text-blue-500"
          >
            <img
              className="h-32 w-32 rounded-full -my-8 relative z-10 border-4 border-white shadow-xl"
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
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "technical-expertise", label: "Projects" },
            ].map(({ id, label }) => (
              <li key={id}>
                <a
                  href="/"
                  onClick={(e) => handleNavLinkClick(e, id)}
                  className={`block py-0 px-4 transition-colors duration-200
        ${
          activeSection === id
            ? "text-white font-bold"
            : "text-blue-500 font-bold"
        }
        hover:text-white`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block py-0 px-4 text-blue-500 font-bold transition-colors duration-200 hover:text-white"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
