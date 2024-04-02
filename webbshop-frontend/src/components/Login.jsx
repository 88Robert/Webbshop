import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI"; // Replace 'YourContextProviderFile' with the actual file name

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, register } = useContext(APIContext); // Accessing login and register functions from the context provider

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      await login(email, password); // Using login function from context provider
      setMessage("Login successful");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred during login");
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      await register(email, password); // Using register function from context provider
      alert("User registered successfully");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred during registration");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h2>Register</h2>
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
