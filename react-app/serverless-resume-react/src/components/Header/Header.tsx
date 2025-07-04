import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

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
    const handleScroll = () => {
      const sections = [
        "about",
        "projects",
        "education",
        "skills",
        "interests",
        "awards"
      ];

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
              src="/src/assets/img/profile-pic.jpeg"
              alt="Chigozirim Eke"
            />
          </a>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden ml-4 p-2 rounded-lg hover:bg-gray-100"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
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
