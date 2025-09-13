import { API_BASE_URL } from "./constant";

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
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
    if (!response.ok) throw new Error("Failed to fetch course");

    return {
      success: true,
      data: await response.json(),
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return { success: false, error: "Could not fetch course details" };
  }
}

async function getFeedbacks(courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/feedbacks/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch feedbacks");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    return { success: false, error: "Unable to fetch feedbacks" };
  }
}

async function postFeedback(courseId, comment) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/feedbacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, course_id: courseId }),
    });

    if (!res.ok) throw new Error("Failed to post feedback");

    return { success: true };
  } catch (err) {
    console.error("Error posting feedback:", err);
    return { success: false, error: "Unable to post feedback" };
  }
}

async function getMessages(courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/discussions/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching messages:", err);
    return { success: false, error: "Unable to fetch messages" };
  }
}

async function addMessage(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/discussions/addMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Failed to add message");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error adding message:", err);
    return { success: false, error: "Unable to add message" };
  }
}

export const courseService = {
  getAllCourses,
  getCourseById,
  getFeedbacks,
  postFeedback,
  getMessages,
  addMessage,
};
