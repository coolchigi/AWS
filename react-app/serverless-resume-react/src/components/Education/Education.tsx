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
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-8 text-gray-800 font-saira text-center">
          Education
        </h2>

        {/* Compact table-like layout */}
        <div className="space-y-4">
          {educationItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-4 border-b border-gray-200 last:border-0"
            >
              {/* Institution */}
              <div className="md:w-1/3">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.institution}
                </h3>
              </div>

              {/* Degree & Details */}
              <div className="md:w-1/2 flex-grow">
                <p className="text-gray-700 font-medium">
                  {item.degree}
                </p>
                {item.details && (
                  <p className="text-sm text-gray-600 mt-1">
                    {item.details}
                  </p>
                )}
              </div>

              {/* Period */}
              <div className="md:w-auto md:text-right">
                <span className="text-sm font-medium text-pink-600">
                  {item.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
