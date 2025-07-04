import React from "react";
import { FaLaptopCode, FaMountain, FaGamepad } from "react-icons/fa";

interface InterestCategory {
  icon: React.ReactElement;
  title: string;
  items: string[];
}

const Interests: React.FC = () => {
  const interestCategories: InterestCategory[] = [
    {
      icon: <FaLaptopCode className="text-3xl text-blue-600" />,
      title: "Tech",
      items: [
        "Cloud Computing",
        "System Design",
        "Full-stack Development",
        "Tech Speaking & Community",
        "Backend Development"
      ]
    },
    {
      icon: <FaMountain className="text-3xl text-blue-600" />,
      title: "Outdoors",
      items: ["Biking", "Soccer", "Hiking", "Exploring"]
    },
    {
      icon: <FaGamepad className="text-3xl text-blue-600" />,
      title: "Gaming",
      items: ["Strategy Games", "RPGs", "Simulation Games", "Indie Games"]
    }
  ];

  return (
    <section className="py-24 bg-white" id="interests">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold uppercase mb-12 text-gray-800 font-saira text-center">
          Interests
        </h2>

        <div className="leading-relaxed font-tagesschrift mb-16 space-y-6 text-lg text-gray-600">
          <p>
            Apart from being a cloud enthusiast, I enjoy most of my time being
            outdoors. In the summer, I enjoy biking, playing soccer &
            attending networking conferences. During colder months, I enjoy
            spending time with family and friends. Although, I would love to learn ice skating.
          </p>
          <p>
            I also love playing video games and journalling. This year, I have
            decided to explore my creative side a bit more. Let's see where the
            journey takes us!
          </p>
          <p>
            I'm passionate about sharing knowledge and contributing to the tech community. In 2023, I had the opportunity to work with Women Who Code, delivering a technical talk on Kubernetes and Docker containerization, sharing practical insights and best practices with fellow developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {interestCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-800 font-saira">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
