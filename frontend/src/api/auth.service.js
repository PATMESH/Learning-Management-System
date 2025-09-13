import { API_BASE_URL } from "./constant";

async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      const userDetails = await getUserDetails(email);
      if (userDetails.success) {
        localStorage.setItem("name", userDetails.data.username);
        localStorage.setItem("id", userDetails.data.id);

        return {
          success: true,
          token: data.token,
          user: {
            name: userDetails.data.username,
            email,
            id: userDetails.data.id,
          },
        };
      }

      return {
        success: true,
        token: data.token,
        message: "Login successful but couldn't fetch user details",
      };
    } else {
      return {
        success: false,
        error: data.error || "Login failed",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

async function register(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return {
        success: true,
        message: "Registration successful",
      };
    } else {
      const data = await response.json();
      return {
        success: false,
        error: data.error || "Registration failed",
      };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

async function getUserDetails(email) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users/details?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch user details",
      };
    }
  } catch (error) {
    console.error("Get user details error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("id");
}

function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

function getCurrentUser() {
  return {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    id: localStorage.getItem("id"),
  };
}

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authService = {
  login,
  register,
  getUserDetails,
  logout,
  isAuthenticated,
  getCurrentUser,
  getAuthHeader,
};
