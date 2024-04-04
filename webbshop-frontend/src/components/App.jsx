import "../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Firstpage from "./Firstpage";
import Login from "./Login";
import NavbarHead from "./NavbarHead";
import Shop from "./Shop";
import { BackendAPI } from "./BackendAPI";

function App() {

  return (
    <div>
      <BackendAPI>
    <Router>
      <NavbarHead />
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Shop />} />
      </Routes>
    </Router>
    </BackendAPI>
    
    </div>
  );
}

export default App;
