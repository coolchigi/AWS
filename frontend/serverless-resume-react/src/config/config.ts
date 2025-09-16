interface Config {
  apiUrl: string;
}

if (!import.meta.env.VITE_API_GATEWAY_URL) {
  throw new Error("VITE_API_GATEWAY_URL is not defined in .env file");
}

export const config: Config = {
  apiUrl: import.meta.env.VITE_API_GATEWAY_URL
};
