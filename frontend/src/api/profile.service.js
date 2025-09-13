import { API_BASE_URL } from "./constant";

async function getUserDetails(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user details");
    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error fetching user details:", err);
    return { success: false, error: "Unable to fetch user details" };
  }
}

async function getProfileImage(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/profile-image`);
    if (!res.ok) throw new Error("Failed to fetch profile image");
    const blob = await res.blob();
    return { success: true, data: URL.createObjectURL(blob) };
  } catch (err) {
    console.error("Error fetching profile image:", err);
    return { success: false, error: "Unable to fetch profile image" };
  }
}

async function updateUser(userId, updatedData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update user");

    return { success: true, data: await res.json() };
  } catch (err) {
    console.error("Error updating user:", err);
    return { success: false, error: "Unable to update user" };
  }
}


async function uploadProfileImage(userId, file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/api/users/${userId}/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload profile image");

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
  updateUser
};
