import { useState } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Firstpage from "./Firstpage";
import Login from "./Login";
import Navbar from "./Navbar";
import Shop from "./Shop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
