import { API_BASE_URL } from "./constant";

async function getPerformanceData(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/assessments/perfomance/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch performance data");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching performance data:", err);
    return { success: false, error: "Unable to fetch performance data" };
  }
}

async function getCertificate(courseId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/certificates/${courseId}`);
    if (!res.ok) throw new Error("Failed to fetch certificate");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching certificate:", err);
    return { success: false, error: "Unable to fetch certificate" };
  }
}

async function downloadCertificate(courseId, userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/certificates/download/${courseId}/${userId}`);
    if (!res.ok) throw new Error("Failed to download certificate");
    
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${courseId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return { success: true };
  } catch (err) {
    console.error("Error downloading certificate:", err);
    return { success: false, error: "Unable to download certificate" };
  }
}

export const performanceService = {
  getPerformanceData,
  getCertificate,
  downloadCertificate,
};