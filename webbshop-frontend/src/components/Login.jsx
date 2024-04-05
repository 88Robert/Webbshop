import React, { useState, useContext } from "react";
import { APIContext } from "./BackendAPI"; 
import { Container, Button, Row, Col } from "react-bootstrap";

/* Hämtar hem context här för att kunna hantera loggin samt registrering, man loggas ut när man refreshar sidan */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, register, logout, user } = useContext(APIContext); 

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      await login(email, password); 
      alert("Login successful");
      setEmail(""); 
      setPassword(""); 
      setMessage(""); 
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
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <br />
          <br />
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
              <br />
              <br />
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
              <br />
              <br />
              <h2>Register</h2>
              <Button variant="secondary" onClick={handleRegister}>
                Register
              </Button>
            </div>

            <p>{message}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
