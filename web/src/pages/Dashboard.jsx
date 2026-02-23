import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../authService";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/components.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Card>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>Loading...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            {user && (
              <p className="dashboard-welcome">
                Welcome back, <span className="dashboard-email">{user.email}</span>
              </p>
            )}
          </div>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card title="Your Profile">
          <div style={{ padding: "1rem" }}>
            {user && (
              <div>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  Logged in successfully
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
