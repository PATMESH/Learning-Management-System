import api from "./api";

async function getUserDetails(userId) {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    return { success: true, data };
  } catch (err) {
    console.error("Error fetching user details:", err);
    return { success: false, error: "Unable to fetch user details" };
  }
}

async function getProfileImage(userId) {
  try {
    const res = await api.get(`/api/users/${userId}/profile-image`, {
      responseType: "blob",
    });
    const blobUrl = URL.createObjectURL(res.data);
    return { success: true, data: blobUrl };
  } catch (err) {
    console.error("Error fetching profile image:", err);
    return { success: false, error: "Unable to fetch profile image" };
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

async function uploadProfileImage(userId, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    await api.post(`/api/users/${userId}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true };
  } catch (err) {
    console.error("Error uploading profile image:", err);
    return { success: false, error: "Unable to upload image" };
  }
}

export const profileService = {
  getUserDetails,
  getProfileImage,
  uploadProfileImage,
  updateUser,
};
