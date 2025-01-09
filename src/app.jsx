import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Ruta para la página de login */}
        <Route path="/registro" element={<Register />} />  {/* Ruta para registro */}
      </Routes>
    </Router>
  );
}

export default App;
