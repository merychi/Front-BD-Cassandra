import React, { useState } from "react";

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

if (!isOpen) return null;

return (
  <div className="admin-container">

    <h2 className="letricablanca">Administrar Películas Recomendadas</h2>

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