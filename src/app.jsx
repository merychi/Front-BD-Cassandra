import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Login } from "./components/Formulario/Login";
import { Register } from "./components/Formulario/Register";
import { Home } from "./components/Home";
import { Logueado } from "./components/Main/logueado";
import { AdminMovies } from "./components/Main/adminmovies";
import AdminUsuarios from "./components/Main/usuarios";
import AdminPelis from "./components/Main/peliculas";

function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/adminpanel");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar ocupa un ancho fijo */}
      {isAdminRoute && <div style={{ width: "200px", flexShrink: 0 }}><Sidebar /></div>}

      {/* Contenido principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {isAdminRoute && <Navbar />}
        <div style={{ flex: 1, padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/logueado" element={<Logueado />} />
          <Route path="/adminmovies" element={<AdminMovies />} />
          <Route path="/adminpanel/users" element={<AdminUsuarios />} />
          <Route path="/adminpanel/movies" element={<AdminPelis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
