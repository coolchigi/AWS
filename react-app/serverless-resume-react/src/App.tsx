import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Interests from "./components/Interests/Interests";
import Awards from "./components/Awards/Awards";
import VisitorCounter from "./components/VisitorCounter/VisitorCounter";
import TechnicalExpertise from "./components/TechnicalExpertise/TechnicalExpertise";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <About />
        <Experience />
        <TechnicalExpertise />
        <Awards />
        <Interests />
        <VisitorCounter />
      </main>
    </div>
  );
};

export default App;
