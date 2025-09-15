import api from "./api";

async function getPerformanceData(userId) {
  try {
    const { data } = await api.get(`/api/assessments/performance/${userId}`);
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching performance data:", err);
    return { success: false, error: err.response?.data?.message || "Unable to fetch performance data" };
  }
}

async function getCertificate(courseId) {
  try {
    const { data } = await api.get(`/api/certificates/${courseId}`);
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching certificate:", err);
    return { success: false, error: err.response?.data?.message || "Unable to fetch certificate" };
  }
}

async function downloadCertificate(courseId, userId) {
  try {
    const res = await api.get(`/api/certificates/download/${courseId}/${userId}`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-${courseId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true };
  } catch (err) {
    console.error("Error downloading certificate:", err);
    return { success: false, error: err.response?.data?.message || "Unable to download certificate" };
  }
}

export const performanceService = {
  getPerformanceData,
  getCertificate,
  downloadCertificate,
};
