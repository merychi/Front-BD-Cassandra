import React, { useState } from "react";
import { AdminMovies } from "./adminmovies";
import { BiUser } from "react-icons/bi";
import "../../global.css";
import { useNavigate } from "react-router-dom"; 
import { Perfil } from "./Perfil";

const StatusBar = ({ onButtonClick }) => {
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const adminPanel = () => {
    navigate("/adminpanel");
  };


  return (
    <div>
      <div className="status-bar">
        <div className="memflisb">MEMFLIS</div>

        <div className="search-bar">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar..."
          />
        </div>

        <div className="status-bar-buttons">
          <button 
          className="status-bar-btn" 
          onClick={() => setShowPerfil(!showPerfil)}>
          <BiUser className="input-icon"/>
          </button>

          <button className="status-bar-btn" onClick={adminPanel}>
            Administrador
          </button>
          <button
            className="status-bar-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            Recomendar
          </button>
        </div>
      </div>
      {showPerfil && <Perfil searchTerm={searchTerm} />}
      {showAdminPanel && <AdminMovies searchTerm={searchTerm} />}
    </div>
  );
};

export default StatusBar;