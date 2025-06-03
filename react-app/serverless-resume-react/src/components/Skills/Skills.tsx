import React, { useState } from "react";
import {
  FaPython,
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker
} from "react-icons/fa";
import {
  SiKubernetes,
  SiTerraform,
  SiFastapi,
  SiMongodb,
  SiExpress
} from "react-icons/si";
import "./Skills.css";

interface SkillCategory {
  title: string;
  icon: string;
  skills: Array<{
    name: string;
    icon: React.ReactElement;
  }>;
  experience: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: "brackets-curly",
      experience: "1+ years",
      skills: [
        { name: "HTML", icon: <FaHtml5 /> },
        { name: "CSS", icon: <FaCss3 /> },
        { name: "JavaScript", icon: <FaJs /> },
        { name: "React", icon: <FaReact /> }
      ]
    },
    {
      title: "Backend Development",
      icon: "server-network",
      experience: "2+ years",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Python", icon: <FaPython /> },
        { name: "FastAPI", icon: <SiFastapi /> },
        { name: "MongoDB", icon: <SiMongodb /> }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: "cloud-database-tree",
      experience: "2+ years",
      skills: [
        { name: "AWS", icon: <FaAws /> },
        { name: "Docker", icon: <FaDocker /> },
        { name: "Terraform", icon: <SiTerraform /> },
        { name: "Kubernetes", icon: <SiKubernetes /> }
      ]
    }
  ];

  const toggleCategory = (index: number) => {
    if (activeCategory === index) {
      setActiveCategory(null);
    } else {
      setActiveCategory(index);
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-content">
        <h2 className="section-title">Skills</h2>
        <div className="skills-subtitle"></div>

        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`skill-category ${
                activeCategory === index ? "active" : ""
              }`}
            >
              <div
                className="skill-header"
                onClick={() => toggleCategory(index)}
              >
                <div className="skill-icon">
                  <i className={`uil uil-${category.icon}`}></i>
                </div>
                <div className="skill-info">
                  <h3 className="skill-title">{category.title}</h3>
                  <span className="skill-subtitle">{category.experience}</span>
                </div>
                <div className="skill-arrow">
                  <i
                    className={`uil uil-angle-down ${
                      activeCategory === index ? "rotate" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div className="skill-list-container">
                <div className="skill-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="skill-name">
                        <i className="uil uil-check-circle"></i>
                        {skill.icon}
                        {skill.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
