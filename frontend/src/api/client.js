import axios from "axios";

// One source of truth:
// - Set REACT_APP_API_BASE_URL in .env.local (local dev) or .env (prod build)
const baseURL =
  (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "") ||
  "http://localhost:10000";

export const api = axios.create({
  baseURL,
  timeout: 30000,
});
