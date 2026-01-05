import React from "react";
import { FaTrophy } from "react-icons/fa";
import cloudPractitioner from "../../assets/img/aws-certified-cloud-practitioner.png";
import solutionsArchitect from "../../assets/img/aws-certified-solutions-architect-associate.png";
import aiPractitioner from "../../assets/img/aws-certified-ai-practitioner.png";

interface Certification {
  title: string;
  image: string;
  link: string;
  isPlaceholder?: boolean;
}

const Awards: React.FC = () => {
  const certifications: Certification[] = [
    {
      title: "AWS Certified Cloud Practitioner",
      image: cloudPractitioner,
      link: "https://www.credly.com/badges/e479bdf1-d672-4638-a6e8-35de53c3f3bf/public_url"
    },
    {
      title: "AWS Certified Solutions Architect Associate",
      image: solutionsArchitect,
      link: "https://www.credly.com/badges/876a2eef-b396-408d-86ff-811da7f10d5a/public_url"
    },
    {
      title: "AWS Certified AI Practitioner",
      image: aiPractitioner,
      link: "https://www.credly.com/badges/58b81f6e-19af-484b-9048-b5b39d8103b7/public_url"
    },
    {
      title: "Coming Soon",
      image: "",
      link: "#",
      isPlaceholder: true
    }
  ];

  const awards = [
    "Dean's Honors List - Carleton University",
    "Computer Science Honours Program",
    "Google Developer Student Club Member"
  ];

  return (
    <section className="py-12 bg-white scroll-mt-20" id="awards">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-8 text-gray-800 font-saira text-center">
          Awards & Certifications
        </h2>

        <div className="space-y-12">
          {/* AWS Certifications Grid */}
          <div>
            <h3 className="text-2xl font-saira text-blue-600 mb-6 text-center">
              AWS Certifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                cert.isPlaceholder ? (
                  <div
                    key={index}
                    className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[220px] hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-400 font-saira text-center text-sm">
                      Future Certification<br/>Coming Soon
                    </span>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-xl hover:border-blue-400 transition-all duration-300 group flex flex-col items-center"
                  >
                    <div className="w-full h-40 flex items-center justify-center mb-3">
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                      {cert.title}
                    </p>
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Academic Achievements Grid */}
          <div>
            <h3 className="text-2xl font-saira text-blue-600 mb-6 text-center">
              Academic Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-pink-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <FaTrophy className="text-pink-600 text-lg flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{award}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Awards;
