// client/src/api/client.js
// Simple Axios instance so we can reuse baseURL across the app.
import axios from 'axios';

// For now, point to your backend dev server.
// Later, we'll move this to an environment variable.
const API_BASE_URL =
  (globalThis.process?.env?.REACT_APP_API_URL) ||
  'http://localhost:5173';

const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, // enable if you add auth/cookies later
});

export default api;