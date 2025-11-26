// frontend/src/components/admin/CreateUser.jsx
import React, { useState } from "react";
import { apiPost } from "../../utils/api";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await apiPost("/api/users/create", {
      name,
      email,
      password,
      role,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } else {
      setMessage(data.message || "Failed to create user");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", padding: 20 }}>
      <h2>Create New User</h2>

      {message && (
        <div style={{ marginBottom: 10, color: "green" }}>{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
