import React from "react";
import "./Education.css";

interface EducationItemProps {
  institution: string;
  degree: string;
  details?: string;
  period: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
  institution,
  degree,
  details,
  period
}) => {
  return (
    <div className="education-item">
      <div className="education-details">
        <h3 className="education-institution">{institution}</h3>
        <div className="education-degree">{degree}</div>
        {details && <div className="education-info">{details}</div>}
      </div>
      <div className="education-period">{period}</div>
    </div>
  );
};

const Education: React.FC = () => {
  const educationItems = [
    {
      institution: "Carleton University",
      degree: "Bachelor of Computer Science Honours",
      details:
        "Computer Science - Concentration in Management & Business Systems",
      period: "September 2020 - June 2025"
    },
    {
      institution: "Dansol High School",
      degree: "Information and Computer Technology",
      period: "September 2016 - July 2019"
    }
  ];

  return (
    <section className="education-section" id="education">
      <div className="education-content">
        <h2 className="education-section-title">🎓 Education 🎓</h2>
        <div className="education-items">
          {educationItems.map((item, index) => (
            <EducationItem
              key={index}
              institution={item.institution}
              degree={item.degree}
              details={item.details}
              period={item.period}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
