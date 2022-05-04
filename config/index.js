const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;

export const server = dev
  ? `http://localhost:${port}`
  : "https://mercado-libre-project.vercel.app";
