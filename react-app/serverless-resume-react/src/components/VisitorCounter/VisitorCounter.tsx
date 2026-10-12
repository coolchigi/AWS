import React from "react";
import { useVisitorCount } from "../../hooks/useVisitorCount";

const VisitorCounter: React.FC = () => {
  const visitors = useVisitorCount();

  let text = "Counting visitors…";
  if (visitors.status === "ready") text = `You're visitor #${visitors.count.toLocaleString()}`;
  if (visitors.status === "error") text = "Visitor count unavailable";

  return (
    <p className="font-mono text-xs text-muted tabular-nums" aria-live="polite">
      {text}
    </p>
  );
};

export default VisitorCounter;
