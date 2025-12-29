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
      link: "https://www.credly.com/badges/58b81f6e-19af-484b-9048-b5b39d8103b7/public_url",
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
    <section className="py-24 bg-white" id="awards">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Awards & Certifications
        </h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-saira text-blue-600 mb-8 text-center">
              AWS Certifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              {certifications.map((cert, index) => (
                cert.isPlaceholder ? (
                  <div
                    key={index}
                    className="w-48 h-48 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300"
                  >
                    <span className="text-gray-400 font-saira text-center">
                      Future Certification<br/>Coming Soon
                    </span>
                  </div>
                ) : (
                  <a
                    key={index}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="transform hover:scale-105 transition-transform duration-300"
                    title={cert.title}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-48 h-48 object-contain"
                    />
                  </a>
                )
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-saira text-blue-600 mb-8 text-center">
              Academic Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4">
                    <FaTrophy className="text-pink-600 text-2xl flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{award}</span>
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
