import React from "react";

interface EducationItem {
  institution: string;
  degree: string;
  details?: string;
  period: string;
}

const Education: React.FC = () => {
  const educationItems: EducationItem[] = [
    {
      institution: "Carleton University",
      degree: "Bachelor of Computer Science Honours",
      details: "Concentration in Management & Business Systems + Business Minor",
      period: "2020 - 2025"
    },
    {
      institution: "Dansol High School",
      degree: "Information and Computer Technology",
      period: "2016 - 2019"
    }
  ];

  return (
    <section className="py-12 bg-white scroll-mt-20" id="education">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl font-bold uppercase mb-8 text-gray-800 font-saira text-center">
      Education
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {educationItems.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <span className="text-sm font-medium text-pink-600 block mb-2">
            {item.period}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {item.institution}
          </h3>
          <p className="text-gray-700 text-sm mb-2">{item.degree}</p>
          {item.details && (
            <p className="text-xs text-gray-600">{item.details}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default Education;
