import { API_BASE_URL } from "./constant";

async function createQuestion(questionData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create question");
    }
    
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error creating question:", err);
    return { success: false, error: err.message || "Unable to create question" };
  }
}

async function updateQuestion(questionId, questionData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions/${questionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update question");
    }
    
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error updating question:", err);
    return { success: false, error: err.message || "Unable to update question" };
  }
}

async function deleteQuestion(questionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions/${questionId}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete question");
    }
    
    return { success: true };
  } catch (err) {
    console.error("Error deleting question:", err);
    return { success: false, error: err.message || "Unable to delete question" };
  }
}

async function getQuestionsByCourse(courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions/course/${courseId}`);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch questions");
    }
    
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching questions:", err);
    return { success: false, error: err.message || "Unable to fetch questions" };
  }
}

async function getQuestionById(questionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/questions/${questionId}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: "Question not found" };
      }
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch question");
    }
    
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching question:", err);
    return { success: false, error: err.message || "Unable to fetch question" };
  }
}

export const questionService = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCourse,
  getQuestionById,
};