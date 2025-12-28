import { useState, useEffect } from "react";
import { config } from "../../config/config";


const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(config.apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch visitor count: ${response.status}`);
        }

        const data = await response.json();
        setVisitorCount(data);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        setError(error instanceof Error ? error.message : "Failed to load visitor count");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return (
      <span className="visitor-counter text-gray-600">
        Loading visitor count...
      </span>
    );
  }

  if (error) {
    return (
      <span className="visitor-counter text-gray-500">
        Visitor count unavailable
      </span>
    );
  }

  return (
    <span className="visitor-counter">
      You are visitor number: <span className="font-bold text-pink-600">{visitorCount.toLocaleString()}</span>
    </span>
  );
};

export default VisitorCounter;
