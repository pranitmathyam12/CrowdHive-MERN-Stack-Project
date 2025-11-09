import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "./assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to login endpoint
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });

      // Save user details in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);

      // Redirect user based on role
      if (res.data.user.role === "admin") {
        window.location.href = "/register";
      } else {
        window.location.href = "/events";
      }
    } catch (err) {
      // Handle errors gracefully
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  const navigateToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="EduVents Logo" />
        </div>
        <h2>
          <b>LOGIN</b>
        </h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        <button
          type="button"
          className="register-button"
          onClick={navigateToRegister}
        >
          Dont have and account? SignUp
        </button>
      </form>
    </div>
  );
};

export default Login;
