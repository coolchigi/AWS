import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string | string[];
  additionalInfo?: string;
  link?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 0,
      title: "MapleTrade",
      tags: ["Fullstack", "Cloud"],
      description:
        "A agentic trading application built using Google ADK + Gemini",
      additionalInfo:
        "The aim was to make trading more accessible to users",
      link: "https://github.com/coolchigi/MapleTrade"
    },
    {
      id: 1,
      title: "MediFind",
      tags: ["Fullstack", "Cloud"],
      description:
        "A fullstack application built using React, AWS Amplify Studio & AWS Appsync",
      additionalInfo:
        "The aim was to make healthcare provider data more accessible to users",
      link: "https://github.com/coolchigi/MediFind"
    },
    {
      id: 2,
      title: "AED Simulation",
      tags: ["Fullstack", "Simulation"],
      description: "An automatic defibrillator simulation built using QT C++",
      additionalInfo:
        "Simulate an automatic external defibrillator that can be used to deliver a shock in life threating situations",
      link: "https://github.com/WaillyMohamed/AED"
    },
    {
      id: 3,
      title: "K8s FastAPI",
      tags: ["Infrastructure", "API"],
      description:
        "An API built using the Python FastAPI library, with instructions on how to deploy on a local Kubernetes cluster",
      additionalInfo: "The API lets users query a file-system database",
      link: "https://github.com/coolchigi/K8s-fastapi"
    },
    {
      id: 4,
      title: "Serverless Resume Website",
      tags: ["cloud", "devops"],
      description:
        "An serverless resume website that displays a view counter to the user built using AWS DynamoDB, Lambda & API Gateway",
      additionalInfo:
        "In the future, I will create React components for each section of the page",
      link: "https://github.com/coolchigi/AWS"
    },
    {
      id: 5,
      title: "Pet-Cuddle-O-Tron - A Serverless Reminder Application",
      tags: ["python", "api gateway"],
      description:
        "A reminder application that sends notifications and events to your email developed with serverless technologies",
      additionalInfo: "My first introduction to serverless architecture"
    },
    {
      id: 6,
      title: "Community Fridge Web Application",
      tags: ["node.js", "mongodb"],
      description:
        "A school project for my introduction to web development class",
      additionalInfo:
        "The goal was to create a community fridge application that makes it easy to find, and fill up community fridges in Ottawa"
    },
    {
      id: 7,
      title: "HealthCare MERN Application",
      tags: ["docker", "express"],
      description: "December 2022 - Present",
      link: "https://github.com/coolchigi/HealthCare-MERN"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handlePrev = () => {
    setDirection('prev');
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection('next');
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-white" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Projects
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            className="absolute left-0 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transition-transform transform hover:scale-110 z-10"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <FaChevronLeft />
          </button>

          <div className="relative w-full overflow-hidden min-h-[400px]">
            {projects.map((project, index) => {
              let slideClass = 'opacity-0 invisible absolute inset-0';
              if (index === activeIndex) {
                slideClass = 'opacity-100 visible relative';
              }
              return (
                <div
                  key={project.id}
                  className={`transform transition-all duration-500 ease-in-out ${slideClass}`}
                  style={{
                    transitionProperty: 'opacity, visibility, transform'
                  }}
                >
                  <div className="bg-gray-100 rounded-lg p-8 shadow-lg max-w-lg mx-auto">
                    <h3 className="text-xl font-bold text-blue-600 mb-6 font-saira uppercase text-center tracking-wide">
                      {project.title}
                    </h3>
                    <div className="flex justify-center flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full capitalize font-courier border border-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {typeof project.description === 'string' ? project.description : project.description.join(', ')}
                    </p>
                    {project.additionalInfo && (
                      <p className="text-gray-600 text-sm mb-4 pl-4 border-l-4 border-pink-200">
                        {project.additionalInfo}
                      </p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:translate-y-[-2px]"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="absolute right-0 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transition-transform transform hover:scale-110 z-10"
            onClick={handleNext}
            aria-label="Next project"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-pink-600 transform scale-125"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <div>Current direction: {direction}</div>
      </div>
    </section>
  );
};

export default Projects;
