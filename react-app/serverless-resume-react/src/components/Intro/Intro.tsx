import React from "react";
import profilePic from "../../assets/img/profile-pic.jpeg";
import cloudPractitioner from "../../assets/img/aws-certified-cloud-practitioner.png";
import solutionsArchitect from "../../assets/img/aws-certified-solutions-architect-associate.png";
import aiPractitioner from "../../assets/img/aws-certified-ai-practitioner.png";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    image: cloudPractitioner,
    link: "https://www.credly.com/badges/e479bdf1-d672-4638-a6e8-35de53c3f3bf/public_url",
  },
  {
    title: "AWS Certified Solutions Architect Associate",
    image: solutionsArchitect,
    link: "https://www.credly.com/badges/876a2eef-b396-408d-86ff-811da7f10d5a/public_url",
  },
  {
    title: "AWS Certified AI Practitioner",
    image: aiPractitioner,
    link: "https://www.credly.com/badges/58b81f6e-19af-484b-9048-b5b39d8103b7/public_url",
  },
];

const Intro: React.FC = () => (
  <section className="grid gap-6 items-center md:grid-cols-[minmax(0,1fr)_auto] md:gap-10" aria-labelledby="intro-title">
    <div>
      <h1
        id="intro-title"
        className="text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)] font-[650] leading-[1.05] tracking-[-0.025em]"
      >
        Hey, I'm Chigozirim!
      </h1>
      <p className="mt-3.5 text-xl leading-normal text-muted max-w-[34ch]">
        Systems engineer at SurveyMonkey, with a passion for cloud computing. I design systems that
        scale and build the full-stack websites that run on them.
      </p>
      <div className="flex flex-wrap gap-3 mt-5">
        {certifications.map((cert) => (
          <a
            key={cert.title}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            title={cert.title}
            className="block rounded-lg"
          >
            <img src={cert.image} alt={cert.title} width={56} height={56} className="block w-14 h-14 object-contain" />
          </a>
        ))}
      </div>
    </div>
    <img
      src={profilePic}
      width={600}
      height={750}
      alt="Chigozirim in sunglasses and a patterned black top, standing in front of a sculpture of wings"
      className="order-first w-32 h-auto aspect-[4/5] object-cover rounded-[14px] bg-surface md:order-none md:w-44"
    />
  </section>
);

export default Intro;
