import { API_BASE_URL } from "./constant";

async function getProgress(userId, courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/progress/${userId}/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch progress");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching progress:", err);
    return { success: false, error: "Unable to fetch progress" };
  }
}

async function updateDuration(userId, courseId, duration) {
  try {
    await fetch(`${API_BASE_URL}/api/progress/update-duration`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId, duration }),
    });
  } catch (err) {
    console.error("Error updating duration:", err);
  }
}

async function updateProgress(userId, courseId, playedTime, duration) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/progress/update-progress`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId, playedTime, duration }),
    });
    return { success: res.ok };
  } catch (err) {
    console.error("Error updating progress:", err);
    return { success: false };
  }
}

export const progressService = {
  getProgress,
  updateDuration,
  updateProgress,
};
