import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI"; // Replace 'YourContextProviderFile' with the actual file name
import { Container, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, register, logout, user } = useContext(APIContext); // Accessing login and register functions from the context provider

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      await login(email, password); // Using login function from context provider
      alert("Login successful");
      setEmail(""); // Reset email input
      setPassword(""); // Reset password input
      setMessage(""); // Clear message
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
      await register(email, password);
      alert("User registered successfully");
      setEmail("");
      setPassword("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred during registration");
    }
  };

  return (
    <Container>
      <div>
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
          <Button variant="secondary" onClick={handleLogin}>Login</Button>
          <h2>Register</h2>
          <Button variant="secondary" onClick={handleRegister}>Register</Button>
        </div>

        <p>{message}</p>
      </div>
    </Container>
  );
}

export default Login;
