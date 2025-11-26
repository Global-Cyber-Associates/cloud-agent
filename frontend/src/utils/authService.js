// frontend/src/utils/authService.js

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function loginUser(email, password) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.token) {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("name", data.name);
    }

    return data;

  } catch (err) {
    console.error("Login error:", err);
    return { message: "Server unreachable" };
  }
}

export function logoutUser() {
  sessionStorage.clear();
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function getRole() {
  return sessionStorage.getItem("role");
}
