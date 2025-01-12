import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Formulario/Login";
import { Register } from "./components/Formulario/Register";
import { Home } from "./components/Home";
import {Logueado} from "./components/Main/logueado";
import {AdminMovies} from "./components/Main/adminmovies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element={<Home/> } />
        <Route path= "/login" element={<Login/>} />  
        <Route path="/registro" element={<Register />} /> 
        <Route path= "/logueado" element={<Logueado/> } />
        <Route path= "/adminmovies" element={<AdminMovies/> } />
      </Routes>
    </Router>
  );
}

export default App;
