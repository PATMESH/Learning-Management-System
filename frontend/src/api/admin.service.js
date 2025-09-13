import { API_BASE_URL } from "./constant";
import axios from "axios";

async function getAllCourses() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    if (!response.ok) throw new Error("Failed to fetch courses");

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Could not fetch courses" };
  }
}

async function getCourseById(courseId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}`);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return { success: false, error: "Could not fetch course details" };
  }
}

async function createCourse(courseData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (response.status === 200) {
      return {
        success: true,
        data: await response.json(),
      };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Failed to create course" };
    }
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "Could not create course" };
  }
}

async function updateCourse(courseId, courseData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/courses/${courseId}`, courseData);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return { success: false, error: "Failed to update course" };
    }
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, error: "Could not update course" };
  }
}

async function deleteCourse(courseId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/courses/${courseId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, error: "Could not delete course" };
  }
}

async function getAllUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Could not fetch users" };
  }
}

async function getAllLearning() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/learning`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return { success: false, error: "Could not fetch enrollments" };
  }
}

export const adminService = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllUsers,
  getAllLearning,
};