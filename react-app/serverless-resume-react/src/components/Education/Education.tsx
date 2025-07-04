import React from "react";

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
    <div className="bg-white rounded-lg shadow-lg p-8 mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-blue-600 mb-2 font-saira">
            {institution}
          </h3>
          <div className="text-lg text-gray-700 mb-2 font-medium">
            {degree}
          </div>
          {details && (
            <div className="text-gray-600 pl-4 border-l-4 border-pink-200 bg-blue-50 py-2 pr-4">
              {details}
            </div>
          )}
        </div>
        <div className="text-pink-600 font-medium bg-pink-50 px-4 py-2 rounded-full text-sm">
          {period}
        </div>
      </div>
    </div>
  );
};

const Education: React.FC = () => {
  const educationItems = [
    {
      institution: "Carleton University",
      degree: "Bachelor of Computer Science Honours",
      details:
        "Concentration in Management & Business Systems + Business Minor",
      period: "September 2020 - June 2025"
    },
    {
      institution: "Dansol High School",
      degree: "Information and Computer Technology",
      period: "September 2016 - July 2019"
    }
  ];

  return (
    <section className="py-24 bg-white" id="education">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Education
        </h2>
        <div className="space-y-6">
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
