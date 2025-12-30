import React, { useState } from "react";
import {
  FaPython,
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaChevronDown
} from "react-icons/fa";
import {
  SiKubernetes,
  SiTerraform,
  SiFastapi,
  SiMongodb,
  SiExpress
} from "react-icons/si";

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
        { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
        { name: "CSS", icon: <FaCss3 className="text-[#1572B6]" /> },
        { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: "React", icon: <FaReact className="text-[#61DAFB]" /> }
      ]
    },
    {
      title: "Backend Development",
      icon: "server-network",
      experience: "2+ years",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="text-gray-700" /> },
        { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
        { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: "cloud-database-tree",
      experience: "2+ years",
      skills: [
        { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
        { name: "Terraform", icon: <SiTerraform className="text-[#7B42BC]" /> },
        { name: "Kubernetes", icon: <SiKubernetes className="text-[#326CE5]" /> }
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
    <section className="py-12 bg-white scroll-mt-20" id="skills">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Skills
        </h2>

        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
            >
              <div
                className={`p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                  activeCategory === index ? "bg-blue-50" : ""
                }`}
                onClick={() => toggleCategory(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl text-blue-600">
                    <i className={`uil uil-${category.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-saira">
                      {category.title}
                    </h3>
                    <span className="text-pink-600 text-sm font-medium">
                      {category.experience}
                    </span>
                  </div>
                </div>
                <FaChevronDown
                  className={`text-blue-600 transform transition-transform duration-300 ${
                    activeCategory === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeCategory === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="text-xl">
                          {skill.icon}
                        </div>
                        <span className="text-gray-700 font-medium">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
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
