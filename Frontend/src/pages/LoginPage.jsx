import React, { useState } from "react";
import "../Style/loginPageStyle.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ---------- REGISTER ----------
  const handleRegister = async () => {

    if (!email || !password) {
      setMessage("Enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      console.log("REGISTER RESPONSE:", res.status, data);

      if (res.ok) {
        setMessage("Registration Successful! Now Login.");
      } else {
        setMessage(data.message || "User already exists");
      }

    } catch (err) {
      console.error(err);
      setMessage("Backend not responding");
    }
  };

  // ---------- LOGIN ----------
  const handleLogin = async () => {

    if (!email || !password) {
      setMessage("Enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      console.log("LOGIN RESPONSE:", res.status, data);

      if (res.ok) {

        localStorage.setItem("token", data.token);

        setMessage("Login Successful!");

        navigate("/dashboard");

      } else {
        setMessage(data.message || "Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      setMessage("Backend not responding");
    }
  };

  return (
  <div className="login-container">

    <div className="login-card">

      <h2 className="login-title">IPO Management Portal</h2>
      <p className="login-subtitle">Login or Create Account</p>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button onClick={handleLogin} className="login-btn primary">
        Login
      </button>

      <button onClick={handleRegister} className="login-btn secondary">
        Register
      </button>

      {message && <p className="login-message">{message}</p>}

    </div>

  </div>
);

};

export default LoginPage;
