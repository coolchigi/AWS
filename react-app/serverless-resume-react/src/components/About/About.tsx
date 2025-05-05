import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-intro">
          <h1 className="about-name">
            Chigozirim
            <span className="text-primary"> Eke</span>
            <span className="cloud-emoji">☁️</span>
          </h1>

          <h2 className="about-roles">
            <span className="role-item">Full-Stack Developer</span>
            <span className="role-separator">•</span>
            <span className="role-item">Cloud Engineer</span>
            <span className="role-separator">•</span>
            <span className="role-item">Student at Carleton University</span>
          </h2>

          <div className="about-contact">
            <a href="mailto:chigo.s.eke@gmail.com" className="contact-link">
              <i className="uil uil-envelope-alt"></i>
              chigo.s.eke@gmail.com
            </a>
            <a href="https://chigozirimeke.me" className="contact-link">
              <i className="uil uil-globe"></i>
              chigozirimeke.me
            </a>
            <a href="https://github.com/coolchigi" className="contact-link">
              <i className="uil uil-github"></i>
              github.com/coolchigi
            </a>
          </div>
        </div>

        <div className="about-story">
          <div className="about-highlight">
            <span className="highlight-text">
              Fourth-year Computer Science student at Carleton University with a
              passion for cloud computing and full-stack development.
            </span>
          </div>

          <div className="about-paragraphs">
            <p>
              In 2022, I decided to delve into the realm of cloud computing by
              obtaining AWS certifications. This was a significant departure
              from my previous experiences, but it proved to be a rewarding
              decision. I was fortunate to secure an internship as a Cloud
              Solutions Intern at SurveyMonkey, where I expanded my knowledge of
              Kubernetes and Terraform under the mentorship of seasoned
              professionals.
            </p>

            <p>
              Despite the high barrier to entry in cloud computing, especially
              for students, my curiosity drove me to overcome these challenges.
              With experience in leveraging AWS cloud infrastructure, I am eager
              to apply my skills to develop innovative solutions💡.
            </p>

            <p>
              My interests lie in cloud computing, designing scalable systems,
              full-stack development, and backend development. I look forward to
              continuing my journey in the tech industry and making meaningful
              contributions to the field.
            </p>
          </div>
        </div>

        <div className="about-social">
          <a
            className="social-icon"
            target="_blank"
            href="https://www.linkedin.com/in/chigozirim-eke/"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            className="social-icon"
            href="https://github.com/coolchigi"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a className="social-icon" href="#!" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="social-icon" href="#!" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>

        <div className="scroll-down">
          <a href="#experience" className="scroll-link">
            <span>Scroll Down</span>
            <i className="uil uil-arrow-down"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
