import axios from "axios";

// Helper function to get localStorage value
const getLocalStorage = (name) => {
  if (typeof window === 'undefined') return null; // Server-side
  return localStorage.getItem(name);
};

const api = axios.create({
  baseURL: '/api/v1',
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional, for handling common errors)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      window.dispatchEvent(new Event('authChange'));
      // You could redirect to login here
    }
    return Promise.reject(error);
  }
);

export default api;
