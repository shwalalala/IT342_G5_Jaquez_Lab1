import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../authService";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card title="Welcome Back">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email Address"
          />
          <FormInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="auth-link">
          Don't have an account? <Link to="/register">Create one now</Link>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Login;
