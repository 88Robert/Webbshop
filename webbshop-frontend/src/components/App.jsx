import "../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Firstpage from "./Firstpage";
import Login from "./Login";
import NavbarHead from "./NavbarHead";
import Shop from "./Shop";
import { BackendAPI } from "./BackendAPI";

/* Alla mina komponenter använder sig av Context Provider, för att få ta del av rätt info baserat på vilken komponent som behöver. 
Jag har anvdvänt minimal vanlig css, bara som bakgrundsfärg och resten är bootstrap */

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
