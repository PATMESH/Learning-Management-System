import { API_BASE_URL } from "./constant";
import axios from "axios";

async function getEnrollments(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/learning/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch enrollments");

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return { success: false, error: "Could not fetch enrollments" };
  }
}

async function enrollCourse(userId, courseId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/learning`, {
      userId,
      courseId,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Enrollment error:", error);
    return { success: false, error: "Could not enroll in course" };
  }
}

export const learningService = {
  getEnrollments,
  enrollCourse,
};
