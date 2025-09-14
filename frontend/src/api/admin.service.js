import axios from "axios";
import { API_BASE_URL } from "./constant";

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

async function getAllCourses() {
  try {
    const { data } = await api.get("/api/courses");
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Could not fetch courses" };
  }
}

async function getCourseById(courseId) {
  try {
    const { data } = await api.get(`/api/courses/${courseId}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching course:", error);
    return { success: false, error: "Could not fetch course details" };
  }
}

async function createCourse(courseData) {
  try {
    const { data } = await api.post("/api/courses", courseData);
    return { success: true, data };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Could not create course" };
  }
}

async function updateCourse(courseId, courseData) {
  try {
    const { data } = await api.put(`/api/courses/${courseId}`, courseData);
    return { success: true, data };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, error: "Could not update course" };
  }
}

async function deleteCourse(courseId) {
  try {
    const { data } = await api.delete(`/api/courses/${courseId}`);
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, error: "Could not delete course" };
  }
}

async function getAllUsers() {
  try {
    const { data } = await api.get("/api/users");
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Could not fetch users" };
  }
}

async function getAllLearning() {
  try {
    const { data } = await api.get("/api/learning");
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return { success: false, error: "Could not fetch enrollments" };
  }
}

async function updateUser(userId, updatedData) {
  try {
    const { data } = await api.put(`/api/users/${userId}`, updatedData);
    return { success: true, data };
  } catch (err) {
    console.error("Error updating user:", err);
    return { success: false, error: "Unable to update user" };
  }
}

async function createQuestion(questionData) {
  try {
    const { data } = await api.post("/api/questions", questionData);
    return { success: true, data };
  } catch (err) {
    console.error("Error creating question:", err);
    return { success: false, error: err.response?.data?.message || "Unable to create question" };
  }
}

async function updateQuestion(questionId, questionData) {
  try {
    const { data } = await api.put(`/api/questions/${questionId}`, questionData);
    return { success: true, data };
  } catch (err) {
    console.error("Error updating question:", err);
    return { success: false, error: err.response?.data?.message || "Unable to update question" };
  }
}

async function deleteQuestion(questionId) {
  try {
    await api.delete(`/api/questions/${questionId}`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting question:", err);
    return { success: false, error: err.response?.data?.message || "Unable to delete question" };
  }
}

export const adminService = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllUsers,
  updateUser,
  getAllLearning,
};
