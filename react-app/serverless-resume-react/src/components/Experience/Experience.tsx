import React, { useState } from "react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  highlights: string[];
}

const Experience: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number>(0);

  const experiences: ExperienceItem[] = [
    {
      role: "Systems Engineer I",
      company: "SurveyMonkey",
      period: "June 2025",
      description:
        "Cloud infrastructure and deployment automation",
      tech: ["Terraform", "AWS", "React", "Kubernetes"],
      highlights: [
        "Implemented observability modules using Terraform",
        
      ]
    },
    {
      role: "Systems Engineer Intern",
      company: "SurveyMonkey",
      period: "May 2024 - May 2025",
      description:
        "Working on cloud infrastructure and deployment automation, focusing on containerization and monitoring solutions.",
      tech: ["Terraform", "AWS", "React", "Kubernetes"],
      highlights: [
        "Developed infrastructure monitoring solutions using Terraform and AWS Lambda",
        "Building company-wide reference applications for Python+React systems"
      ]
    },
    {
      role: "AWS Instructor",
      company: "The Key",
      period: "June 2024 - July 2024",
      description:
        "Developed and delivered comprehensive AWS curriculum for aspiring cloud practitioners, focusing on foundational services and best practices.",
      tech: ["AWS", "EC2", "S3", "IAM", "VPC", "Lambda", "CloudWatch"],
      highlights: [
        "Created detailed syllabus covering core AWS services and architectural principles",
        "Guided students through hands-on labs and real-world scenarios in AWS Console",
        "Emphasized best practices in cloud security and cost optimization",
        "Mentored students in building serverless applications"
      ]
    },
    {
      role: "DevOps/SRE Intern",
      company: "Nokia",
      period: "Jan 2024 - Apr 2024",
      description:
        "Built observability solutions and automated deployment pipelines for critical management systems.",
      tech: ["Docker", "Azure", "Prometheus", "Grafana"],
      highlights: [
        "Created monitoring dashboards for GitLab and Kubernetes clusters",
        "Implemented custom exporters to reduce incident detection time"
      ]
    },
    {
      role: "Cloud Solutions Engineer Intern",
      company: "SurveyMonkey",
      period: "May 2023 - Aug 2023",
      description:
        "Developed solutions for cloud-native applications and microservices, focusing on resilience and deployment.",
      tech: ["Kubernetes", "Bash", "Python", "AWS EKS"],
      highlights: [
        "Migrated over 2 applications to Poetry and Kubernetes",
        "Built decoupled Redis caching endpoints for streamlined disaster recovery"
      ]
    },
    {
      role: "Quality Engineer Intern",
      company: "TD Bank",
      period: "Jan 2023 - Apr 2023",
      description:
        "Improved testing infrastructure and CI/CD pipelines for critical banking APIs.",
      tech: ["Java", "Jenkins", "Maven", "Cucumber"],
      highlights: [
        "Migrated 118 healthcheck scripts to RestAssured and Cucumber BDD",
        "Standardized documentation to reduce onboarding time by 2 weeks"
      ]
    }
  ];

  return (
    <section className="px-20 py-12 bg-gray-50" id="experience">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira">
          Experience
        </h2>

        <div className="flex flex-col md:flex-row gap-8 min-h-[30rem]">
          {/* Tabs Section */}
          <div className="w-64 flex-shrink-0 flex flex-col gap-2">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`p-5 bg-gray-100 rounded-lg border-l-4 cursor-pointer transition-all duration-300 ${
                  activeExp === index
                    ? "border-pink-600 bg-blue-50 text-blue-600"
                    : "border-transparent hover:bg-gray-200"
                }`}
                onClick={() => setActiveExp(index)}
              >
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {exp.company}
                </div>
                <div className="text-sm text-gray-600">{exp.role}</div>
              </div>
            ))}
          </div>

          {/* Details Section */}
          <div className="flex-1 relative bg-white rounded-lg shadow-lg overflow-hidden">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-8 transition-all duration-300 ${
                  activeExp === index
                    ? "opacity-100 visible relative"
                    : "opacity-0 invisible"
                }`}
              >
                <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-blue-600 uppercase">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-semibold px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
                    {exp.period}
                  </span>
                </div>

                <div className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <i className="uil uil-building text-gray-500"></i>
                  {exp.company}
                </div>

                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-courier"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Highlights Section */}
                <div className="mt-auto">
                  <h4 className="text-lg font-bold uppercase text-gray-800 mb-4">
                    Key Highlights
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {exp.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className="relative pl-6 text-gray-700 text-base leading-relaxed"
                      >
                        <span className="absolute left-0 top-2 w-2 h-2 bg-pink-700 rounded-full"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
