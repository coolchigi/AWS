import React from "react";
import About from "../components/About/About";
import Experience from "../components/Experience/Experience";
import TechnicalExpertise from "../components/TechnicalExpertise/TechnicalExpertise";
import VisitorCounter from "../components/VisitorCounter/VisitorCounter";

const HomePage: React.FC = () => {
  return (
    <main className="main-content">
      <About />
      <Experience />
      <TechnicalExpertise />
      <VisitorCounter />
    </main>
  );
};

export default HomePage;
