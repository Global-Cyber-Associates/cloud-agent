// frontend/src/components/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Manage users below:</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/admin/users">View All Users</Link>
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link to="/admin/create-user">Create New User</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
