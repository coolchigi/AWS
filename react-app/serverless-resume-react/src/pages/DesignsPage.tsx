import React from "react";

// A retro "coming soon" window until the website designs are ready
const DesignsPage: React.FC = () => (
  <section className="max-w-[600px]" aria-labelledby="designs-title">
    <div className="retro-win">
      <div className="retro-bar">
        <span className="retro-title-text">designs.exe</span>
        <span className="retro-btns" aria-hidden="true">
          <span>_</span>
          <span>&#9633;</span>
          <span>&times;</span>
        </span>
      </div>
      <div className="retro-screen">
        <p className="retro-prompt">C:\CHIGOZIRIM&gt; open designs</p>
        <h1 id="designs-title" className="retro-heading">
          COMING SOON
        </h1>
        <p className="retro-text">
          Website designs are on the way.
          <span className="retro-cursor" aria-hidden="true" />
        </p>
        <div className="retro-load">
          <span className="retro-load-label">LOADING</span>
          <div className="retro-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DesignsPage;
