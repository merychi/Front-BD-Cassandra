import React, { useState } from "react";
import { AdminMovies } from "./adminmovies";
import "../../global.css";

const StatusBar = ({ onButtonClick }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
          <button className="status-bar-btn" onClick={onButtonClick}>
            Ver todas
          </button>
          <button
            className="status-bar-btn"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
          >
            Admin
          </button>
        </div>
      </div>
      {showAdminPanel && <AdminMovies searchTerm={searchTerm} />}
    </div>
  );
};

export default StatusBar;