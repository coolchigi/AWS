import React, { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  additionalInfo?: string;
  techStack: string[];
  link?: string;
}

const TechnicalExpertise: React.FC = () => {
  const projects: Project[] = [
    {
      id: 0,
      title: "MapleTrade",
      description: "Agentic trading application built using Google ADK + Gemini",
      additionalInfo: "The aim was to make trading more accessible to users",
      techStack: ["Google ADK", "Gemini API", "Python", "React"],
      link: "https://github.com/coolchigi/MapleTrade"
    },
    {
      id: 1,
      title: "MediFind",
      description: "Fullstack application built using React, AWS Amplify Studio & AWS AppSync",
      additionalInfo: "The aim was to make healthcare provider data more accessible to Canadians",
      techStack: ["React", "AWS Amplify", "AWS AppSync", "DynamoDB"],
      link: "https://github.com/coolchigi/MediFind"
    },
    {
      id: 2,
      title: "AED Simulation",
      description: "Automatic defibrillator simulation built using QT C++",
      additionalInfo: "Simulate an automatic external defibrillator that can be used to deliver a shock in life threatening situations",
      techStack: ["C++", "Qt", "OOP"],
      link: "https://github.com/WaillyMohamed/AED"
    },
    {
      id: 3,
      title: "K8s FastAPI",
      description: "API built using the Python FastAPI library, with instructions on how to deploy on a local Kubernetes cluster",
      additionalInfo: "The API lets users query a file-system database",
      techStack: ["Python", "FastAPI", "Kubernetes", "Docker"],
      link: "https://github.com/coolchigi/K8s-fastapi"
    },
    {
      id: 4,
      title: "Serverless Resume",
      description: "Serverless resume website that displays a view counter built using AWS DynamoDB, Lambda & API Gateway",
      additionalInfo: "Automated CI/CD deployment with GitHub Actions and SAM",
      techStack: ["AWS Lambda", "DynamoDB", "API Gateway", "React"],
      link: "https://github.com/coolchigi/AWS"
    },
    {
      id: 5,
      title: "Pet-Cuddle-O-Tron",
      description: "Reminder application that sends notifications and events to your email developed with serverless technologies",
      additionalInfo: "My first introduction to serverless architecture",
      techStack: ["AWS Lambda", "Step Functions", "SES", "Python"]
    },
    {
      id: 6,
      title: "Community Fridge",
      description: "A school project for my introduction to web development class",
      additionalInfo: "The goal was to create a community fridge application that makes it easy to find, and fill up community fridges in Ottawa",
      techStack: ["Node.js", "MongoDB", "Express", "React"]
    },
    {
      id: 7,
      title: "HealthCare MERN",
      description: "Full-stack healthcare application built with the MERN stack",
      additionalInfo: "Containerized deployment with Docker",
      techStack: ["MongoDB", "Express", "React", "Docker"],
      link: "https://github.com/coolchigi/HealthCare-MERN"
    }
  ];

  const [activeProjectIndex, setActiveProject] = useState<number>(0);

  return (
    <section className="py-12 bg-gray-50 scroll-mt-20" id="technical-expertise">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Technical Expertise
        </h2>

        {/* Horizontal Project Tabs */}
        <div className="overflow-x-auto mb-8">
          <div className="flex gap-2 min-w-max pb-2" role="tablist" aria-label="Project navigation">
            {projects.map((project, index) => (
              <button
                key={project.id}
                id={`project-tab-${project.id}`}
                onClick={() => setActiveProject(index)}
                role="tab"
                aria-selected={activeProjectIndex === index}
                aria-controls={`project-panel-${project.id}`}
                tabIndex={activeProjectIndex === index ? 0 : -1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  activeProjectIndex === index
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeProjectIndex < projects.length && (
            <div
              id={`project-panel-${projects[activeProjectIndex].id}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${projects[activeProjectIndex].id}`}
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-4 font-saira uppercase">
                {projects[activeProjectIndex].title}
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {projects[activeProjectIndex].description}
              </p>

              {projects[activeProjectIndex].additionalInfo && (
                <p className="text-gray-600 text-base mb-6 pl-4 border-l-4 border-pink-200 bg-blue-50 py-3 pr-4">
                  {projects[activeProjectIndex].additionalInfo}
                </p>
              )}

              {/* Tech Stack Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {projects[activeProjectIndex].techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project Link */}
              {projects[activeProjectIndex].link && (
                <a
                  href={projects[activeProjectIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View on GitHub
                  <i className="uil uil-external-link-alt"></i>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
