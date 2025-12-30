import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Intro Section */}
          <div className="about-intro">
            <h1 className="text-5xl lg:text-6xl font-bold font-heading leading-tight mb-4 flex items-center flex-wrap">
              Chigozirim
              <span className="text-[#9F2B68] ml-2">Eke</span>
              <span className="text-4xl lg:text-5xl ml-4 animate-float">
                ☁️
              </span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-gray-600 mb-6 flex flex-wrap items-center gap-2">
              <span className="text-gray-900">Full-Stack Developer</span>
              <span className="text-[#9F2B68]">•</span>
              <span className="text-gray-900">Cloud Engineer</span>
              <span className="text-[#9F2B68]">•</span>
              <span className="text-gray-900">
                Carleton University Graduate
              </span>
            </h2>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="mailto:chigo.s.eke@gmail.com"
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <i className="uil uil-envelope-alt text-xl mr-2"></i>
                chigo.s.eke@gmail.com
              </a>
              <a
                href="https://chigozirimeke.me"
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <i className="uil uil-globe text-xl mr-2"></i>
                chigozirimeke.me
              </a>
              <a
                href="https://github.com/coolchigi"
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="uil uil-github text-xl mr-2"></i>
                github.com/coolchigi
              </a>
              <a
                href="https://www.linkedin.com/in/chigozirim-eke/"
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="uil uil-linkedin text-xl mr-2"></i>
                linkedin.com/in/chigozirim-eke/
              </a>
            </div>
          </div>

          {/* Story Section */}
          <div className="text-blue-500">
            <div className="bg-orange-50 py-6 px-8 rounded-md border-l-4 border-primary mb-8">
              <span className="text-lg font-medium leading-relaxed text-gray-900">
                A Computer Science (Hon) graduate from Carleton University
                with a passion for cloud computing, designing scalable systems,
                and full-stack development.
              </span>
            </div>

            <div className="space-y-6 text-gray-700">
              <p className="text-base leading-relaxed font-tagesschrift">
                In 2022, I decided to delve into the world of cloud computing by
                obtaining AWS certifications. I read a post that said the best way to learn
                AWS, was to get some hands-on experience. So, that's what I did!
                This was quite the jump from software development--an experience I had gotten through 
                personal projects, but it proved to be a rewarding decision.
                I was fortunate to secure an internship as a Cloud
                Solutions Intern at SurveyMonkey, where I expanded my knowledge of AWS,
                Kubernetes and Terraform. These were tools I had never used before, which led to where I am today.
              </p>
              <p className="text-base leading-relaxed font-tagesschrift">
                A lot of students don't pursue cloud computing due to the high barrier 
                of entry. I told a mentor, "Certain skills require on the job exposure" or at least, that's 
                how it felt with DevOps tools. I can now confidently say, I have experience in leveraging AWS cloud
                infrastructure & I am eager to apply my skills to develop
                innovative solutions 💡.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
