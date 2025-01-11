import React from "react";
import "../../global.css";

const StatusBar = ({ onButtonClick }) => {
  return (
    <div className="status-bar">
    <div className="memflisb">MEMFLIS</div>
      <button className="status-bar-btn" onClick={onButtonClick}>
        Ver todas
      </button>
    </div>
  );
};

export default StatusBar;
