import React, { useState } from "react";
import ReactSlider from 'react-slider';

export const AdminMovies = () => {
  const [movies, setMovies] = useState([
    "Interestellar",
    "Her",
    "Joker",
    "Maze Runner",
  ]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);

  const handleAssign = () => {
    if (!selectedMovie || !user) {
      setMessage("Selecciona una película y un usuario.");
      return;
    }
    setMessage(`Se recomendó "${selectedMovie}" para ${user || "todos los usuarios"}.`);
    setSelectedMovie("");
    setUser("");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-container">

      <h2 className="letricablanca">Administrar Películas Recomendadas</h2>

      <div className="slider-container">
        <label htmlFor="movie" className="slider-title">Recomendación de películas:</label>
        <div className="slider-wrapper">
          <span className="slider-label">Preciso</span>
          <ReactSlider
            value={sliderValue}
            onChange={handleSliderChange}
            min={0}
            max={1}
            step={0.5}
            renderTrack={(props, state) => <div {...props} className="slider-track" />}
            renderThumb={(props) => <div {...props} className="slider-thumb" />}
            className="slider"
          />
          <span className="slider-label">Variado</span>
        </div>
      </div>

      <div className="slider-info">
        {sliderValue === 0
          ? "El ajuste está en Preciso, las recomendaciones serán muy específicas."
          : sliderValue === 1
            ? "El ajuste está en Variado, las recomendaciones serán más diversas."
            : `El ajuste está Intermedio, recomendaciones más equilibradas entre específicas y diversas.`}
      </div>

      <div className="movie-selector">
        <label htmlFor="movie">Selecciona una película:</label>
        <select
          id="movie"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>

      <div className="user-selector">
        <label htmlFor="user">Usuario (escribe 'all' para todos):</label>
        <input
          id="user"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Usuario específico o todos"
        />
      </div>

      <button className="assign-btn" onClick={handleAssign}>
        Asignar Recomendación
      </button>
      <button className="close-btn" onClick={closeModal}>Cerrar</button>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};