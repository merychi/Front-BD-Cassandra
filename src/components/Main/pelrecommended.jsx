import React from "react";
import "../../global.css";

const PeliRecommended = ({ recommendedMovies, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2 className="letricablanca">Películas recomendadas</h2>
        <ul className="recommended-titles">
          {recommendedMovies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PeliRecommended;