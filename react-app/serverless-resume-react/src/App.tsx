import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Interests from "./components/Interests/Interests";
import Awards from "./components/Awards/Awards";
import VisitorCounter from "./components/VisitorCounter/VisitorCounter";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Interests />
        <Awards />
        <VisitorCounter />
      </main>
    </div>
  );
};

export default App;
