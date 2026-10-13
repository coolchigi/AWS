import { useEffect, useState } from "react";
import { config } from "../config/config";

type VisitorCount =
  | { status: "loading" }
  | { status: "ready"; count: number }
  | { status: "error" };

// Every call to the API counts as a visit, so it's made once per page load and shared.
// The counter shows in the sidebar on desktop and in the footer on phones, and React's
// StrictMode runs effects twice in development. Both would double-count without this.
let countRequest: Promise<number> | null = null;

function requestVisitorCount(): Promise<number> {
  countRequest ??= fetch(config.apiUrl)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch visitor count: ${response.status}`);
      }
      return Number(await response.json());
    })
    .catch((error: unknown) => {
      console.error("Error fetching visitor count:", error);
      throw error;
    });
  return countRequest;
}

export function useVisitorCount(): VisitorCount {
  const [state, setState] = useState<VisitorCount>({ status: "loading" });

  useEffect(() => {
    let active = true;
    requestVisitorCount().then(
      (count) => active && setState({ status: "ready", count }),
      () => active && setState({ status: "error" })
    );
    return () => {
      active = false;
    };
  }, []);

  return state;
}
