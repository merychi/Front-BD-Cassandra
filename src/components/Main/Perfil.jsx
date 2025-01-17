import React from "react";
import "../../global.css";

export const Perfil = () => {
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");

  return (
    <div className="admin-container2">
      <h2 className="letricablanca">Perfil</h2>
      <div>
        <h4 className="perfil-h4 ">Bienvenido a Memflix {userName}</h4>
        <p className="perfil-p">
          Para poder recibir recomendaciones de películas de otros usuarios,
          comparte tu ID.
        </p>
        <text className="perfil-text">ID: {userID}</text>
      </div>
    </div>
  );
};
