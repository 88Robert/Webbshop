import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav>
        <div>Webbshop</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Cart">Shop</Link>
          </li>
        </ul>
      </nav>
    );
  };

export default Navbar