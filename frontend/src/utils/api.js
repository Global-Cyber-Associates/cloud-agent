import { getToken } from "./authService";

export async function apiGet(url) {
  const token = getToken();

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function apiPost(url, body) {
  const token = getToken();

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
