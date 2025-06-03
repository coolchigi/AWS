import React from "react";
import "./Interests.css";

const Interests: React.FC = () => {
  return (
    <section className="interests-section" id="interests">
      <div className="interests-content">
        <h2 className="interests-section-title">Interests</h2>
        <div className="interests-description">
          <p>
            Apart from being a cloud enthusiast, I enjoy most of my time being
            outdoors. In the summer, I enjoy mountain biking, playing soccer &
            attending networking conferences. During colder months, I enjoy
            spending time with family and friends.
          </p>
          <p>
            I also love playing video games and journalling. This year, I have
            decided to explore my creative side a bit more. Let's see where the
            journey takes us!
          </p>
        </div>

        <div className="interests-categories">
          <div className="interest-category">
            <i className="fas fa-laptop-code interest-icon"></i>
            <h3 className="interest-title">Tech</h3>
            <ul className="interest-list">
              <li>Cloud Computing</li>
              <li>System Design</li>
              <li>Full-stack Development</li>
              <li>Backend Development</li>
            </ul>
          </div>

          <div className="interest-category">
            <i className="fas fa-mountain interest-icon"></i>
            <h3 className="interest-title">Outdoors</h3>
            <ul className="interest-list">
              <li>Mountain Biking</li>
              <li>Soccer</li>
              <li>Hiking</li>
              <li>Exploring</li>
            </ul>
          </div>

          <div className="interest-category">
            <i className="fas fa-gamepad interest-icon"></i>
            <h3 className="interest-title">Gaming</h3>
            <ul className="interest-list">
              <li>Strategy Games</li>
              <li>RPGs</li>
              <li>Simulation Games</li>
              <li>Indie Games</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
