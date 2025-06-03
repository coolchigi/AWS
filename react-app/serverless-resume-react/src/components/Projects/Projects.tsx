import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Projects.css";

interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string;
  additionalInfo?: string;
  link?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
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
      link: "https://github.com/coolchigi/MediFind"
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

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <section className="py-20 bg-white" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          💪 Projects 💪
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center mb-8">
          <button
            className="absolute left-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <FaChevronLeft />
          </button>

          <div className="relative w-full overflow-hidden min-h-[300px]">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="bg-gray-100 rounded-lg p-8 shadow-lg max-w-lg text-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    {project.title}
                  </h3>
                  <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-200 text-blue-600 text-sm px-3 py-1 rounded-full capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {project.additionalInfo && (
                    <p className="text-gray-500 text-sm italic mb-4">
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
            ))}
          </div>

          <button
            className="absolute right-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110"
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
                  ? "bg-blue-600 transform scale-125"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
