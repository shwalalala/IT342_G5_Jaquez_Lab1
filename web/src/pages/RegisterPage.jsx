import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../authService";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(email, password);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card title="Create Account">
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
          />
          <FormInput
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            label="Confirm Password"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Register;
