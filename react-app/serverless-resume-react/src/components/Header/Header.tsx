import { useState } from "react";

const Header = () => {
  return (
    <nav>
      <div>
        <a href="#home">Chigozirim Eke</a>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
