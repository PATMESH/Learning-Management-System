import api from "./api";

async function getQuestionsByCourse(courseId) {
  try {
    const { data } = await api.get(`/api/questions/course/${courseId}`);
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching questions:", err);
    return { success: false, error: err.response?.data?.message || "Unable to fetch questions" };
  }
}

async function getQuestionById(questionId) {
  try {
    const { data } = await api.get(`/api/questions/${questionId}`);
    return { success: true, data };
  } catch (err) {
    if (err.response?.status === 404) {
      return { success: false, error: "Question not found" };
    }
    console.error("Error fetching question:", err);
    return { success: false, error: err.response?.data?.message || "Unable to fetch question" };
  }
}

export const questionService = {
  getQuestionsByCourse,
  getQuestionById,
};
