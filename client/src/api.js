export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper for error handling
const handleFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error("API error:", err.message);
  }
};

// ---------- USERS ----------

export const getAllUsers = () =>
  handleFetch(`${API_URL}/users?_sort=-role,employeeID`);

export const getUserById = (id) => handleFetch(`${API_URL}/users/${id}`);

export const createUser = (userData) =>
  handleFetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const updateUser = (id, updatedData) =>
  handleFetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });

export const deleteUser = (id) =>
  handleFetch(`${API_URL}/users/${id}`, { method: "DELETE" });

// ---------- REQUESTS ----------

export const getAllRequests = () =>
  handleFetch(`${API_URL}/requests?_sort=-dateSubmitted`);

export const getRequestsByUserID = (userID) =>
  handleFetch(`${API_URL}/requests?userID=${userID}`);

export const createRequest = (requestData) =>
  handleFetch(`${API_URL}/requests`, {
    method: "POST",
    body: JSON.stringify(requestData),
  });

export const updateRequest = (id, updatedData) =>
  handleFetch(`${API_URL}/requests/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });

export const changeRequestsStatus = (id, newStatus) =>
  handleFetch(`${API_URL}/requests/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newStatus),
  });

export const deleteRequest = (id) =>
  handleFetch(`${API_URL}/requests/${id}`, { method: "DELETE" });
