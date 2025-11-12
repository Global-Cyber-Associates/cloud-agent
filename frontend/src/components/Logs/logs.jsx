import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./logs.css";
import Sidebar from "../navigation/sidenav.jsx";

const SOCKET_URL = "http://localhost:5000";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("✅ Connected to logs socket");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Disconnected from logs socket");
      setConnected(false);
    });

    // Receive snapshot from backend
    socket.on("logs_status_update", (snapshot) => {
      if (!snapshot) return;
      const now = new Date(snapshot.timestamp).toLocaleString();
      const newLogs = [];

      // 🟢 Online agents — show agentId as Type
      if (snapshot.activeAgentsList?.length > 0) {
        snapshot.activeAgentsList.forEach((agent) => {
          newLogs.push({
            _id: Math.random().toString(36).substr(2, 9),
            createdAt: snapshot.timestamp,
            type: agent.agentId || "Unknown Agent",
            actor: "System",
            message: `${agent.agentId || "Unknown"} (${agent.ip || "No IP"}) is online.`,
            metadata: {
              hostname: agent.hostname || "-",
              ip: agent.ip || "-",
              lastSeen: agent.lastSeen || "-",
            },
          });
        });
      }

      // 🔴 Offline agents — show agentId as Type
      if (snapshot.offlineAgentsList?.length > 0) {
        snapshot.offlineAgentsList.forEach((agent) => {
          newLogs.push({
            _id: Math.random().toString(36).substr(2, 9),
            createdAt: snapshot.timestamp,
            type: agent.agentId || "Unknown Agent",
            actor: "System",
            message: `${agent.agentId || "Unknown"} is offline.`,
            metadata: {
              hostname: agent.hostname || "-",
              ip: agent.ip || "-",
            },
          });
        });
      }

      // ⚠️ Unknown Devices
      if (snapshot.unknownDevices?.length > 0) {
        snapshot.unknownDevices.forEach((dev) => {
          newLogs.push({
            _id: Math.random().toString(36).substr(2, 9),
            createdAt: dev.createdAt || snapshot.timestamp,
            type: dev.ip || "Unknown Device",
            actor: "Network Scanner",
            message: `Unknown device detected → ${dev.ip}`,
            metadata: {
              hostname: dev.hostname || "Unknown",
              vendor: dev.vendor || "Unknown",
            },
          });
        });
      }

      // 🧠 Server Status
      newLogs.push({
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: snapshot.timestamp,
        type: "Server",
        actor: "Backend",
        message: `Server is ${snapshot.serverStatus?.toUpperCase() || "UNKNOWN"}`,
        metadata: {},
      });

      // Keep last 100 logs only
      setLogs((prev) => [...prev, ...newLogs].slice(-100));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="logs-page">
      <Sidebar />
      <div className="logs-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h1 className="logs-title">System Activity Logs</h1>
          <span
            style={{
              fontWeight: "600",
              color: connected ? "#00ff9d" : "#ff5757",
              fontSize: "14px",
            }}
          >
            {connected ? "● Live" : "● Disconnected"}
          </span>
        </div>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Agent ID</th>
              <th>Actor</th>
              <th>Message</th>
              <th>Metadata</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", opacity: 0.6 }}>
                  Waiting for live logs...
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id}>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                  <td>{log.type}</td>
                  <td>{log.actor}</td>
                  <td>{log.message}</td>
                  <td>
                    {Object.keys(log.metadata || {}).length > 0
                      ? JSON.stringify(log.metadata)
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
