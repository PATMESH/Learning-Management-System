import { API_BASE_URL } from "./constant";

async function getQuestions(courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch questions");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching questions:", err);
    return { success: false, error: "Unable to fetch questions" };
  }
}

async function submitAssessment(userId, courseId, marks) {
  try {
    const data = {
      courseId: courseId,
      userId: userId,
      marks: marks
    };
    
    const res = await fetch(`${API_BASE_URL}/api/assessments/add/${userId}/${courseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error("Failed to submit assessment");
    return { success: true};
  } catch (err) {
    console.error("Error submitting assessment:", err);
    return { success: false, error: "Unable to submit assessment" };
  }
}

export const assessmentService = {
  getQuestions,
  submitAssessment,
};