import { useState, useEffect } from "react";
import { config } from "../../config/config";


const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(config.apiUrl);
        const data = await response.json();
        setVisitorCount(data);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <span className="visitor-counter">
      You are visitor number: <span>{visitorCount}</span>
    </span>
  );
};

export default VisitorCounter;
