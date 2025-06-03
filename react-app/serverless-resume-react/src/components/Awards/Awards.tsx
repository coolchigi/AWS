import React from "react";
import "./Awards.css";
import cloudPractitioner from "../../assets/img/aws-certified-cloud-practitioner.png";
import solutionsArchitect from "../../assets/img/aws-certified-solutions-architect-associate.png";

const Awards: React.FC = () => {
  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      image: cloudPractitioner,
      link: "https://www.credly.com/badges/e479bdf1-d672-4638-a6e8-35de53c3f3bf/public_url"
    },
    {
      title: "AWS Certified Solutions Architect Associate",
      image: solutionsArchitect,
      link: "https://www.credly.com/badges/876a2eef-b396-408d-86ff-811da7f10d5a/public_url"
    }
  ];

  const awards = [
    "Dean's Honors List - Carleton University",
    "Computer Science Honours Program",
    "Google Developer Student Club Member"
  ];

  return (
    <section className="awards-section" id="awards">
      <div className="awards-content">
        <h2 className="awards-section-title">Awards & Certifications</h2>

        <div className="awards-container">
          <div className="certifications">
            <h3 className="awards-subtitle">AWS Certifications</h3>
            <div className="certification-badges">
              {certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="certification-badge"
                  title={cert.title}
                >
                  <img src={cert.image} alt={cert.title} />
                </a>
              ))}
            </div>
          </div>

          <div className="academic-awards">
            <h3 className="awards-subtitle">Academic Achievements</h3>
            <ul className="awards-list">
              {awards.map((award, index) => (
                <li key={index} className="award-item">
                  <span className="award-icon">
                    <i className="fas fa-trophy"></i>
                  </span>
                  <span className="award-text">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
