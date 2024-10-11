import React, { useState } from "react";
import { login, register } from "../AuthServices/AuthService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/messages");
    } catch (error) {
      alert("Failed to log in");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Registered successfully!");
    } catch (error) {
      alert("Registration failed");
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={isRegister ? handleRegister : handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Login;
