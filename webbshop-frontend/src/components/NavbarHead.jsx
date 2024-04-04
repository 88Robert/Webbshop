import { Link } from "react-router-dom";
import { APIContext } from "./BackendAPI";
import { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";

const NavbarHead = () => {
  const { user, logout } = useContext(APIContext);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <div>
          <h1>Webbshop</h1>
        </div>
        <li style={{ listStyleType: "none" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ listStyleType: "none" }}>
          <Link to="/Cart">Shop</Link>
        </li>
        {user ? (
          <>
            <li style={{ listStyleType: "none" }}>
              <span>Welcome, {user.email}</span>
            </li>
            <li style={{ listStyleType: "none" }}>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li style={{ listStyleType: "none" }}>
            <Link to="/Login">Login</Link>
          </li>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarHead;
