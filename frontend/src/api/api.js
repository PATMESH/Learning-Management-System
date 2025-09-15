import axios from "axios";
import { API_BASE_URL } from "./constant";
import { message } from "antd";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      message.destroy()
      message.error("Session expired or unauthorized. Please log in again.");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else if (error.response?.status === 403) {
      message.error("You don’t have permission to perform this action.");
    } else if (error.response?.status === 404) {
      message.error("Requested resource not found.");
    } else if (error.response?.status >= 500) {
      message.error("Server error. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default api;