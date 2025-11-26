// frontend/src/components/navigation/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(email, password);

    if (res.token) {
      const role = sessionStorage.getItem("role");

      // Redirect based on role
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 20 }}>
      <h2>Login</h2>

      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
