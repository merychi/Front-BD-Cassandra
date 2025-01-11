import React, { useState } from "react";

export const AdminMovies = () => {
  const [movies, setMovies] = useState([
    "Pelicula 1",
    "Pelicula 2",
    "Pelicula 3",
    "Pelicula 4",
  ]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAssign = () => {
    if (!selectedMovie || !user) {
      setMessage("Selecciona una película y un usuario.");
      return;
    }
    setMessage(`Se recomendó "${selectedMovie}" para ${user || "todos los usuarios"}.`);
    setSelectedMovie("");
    setUser("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <button className="close-btn" onClick={() => setShowAdminPanel(false)}>
        Cerrar
      </button>

      <h2>Administrar Películas Recomendadas</h2>

      <div className="search-bar">
        <label htmlFor="search">Buscar Película:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar por nombre..."
        />
      </div>

      <div className="movie-selector">
        <label htmlFor="movie">Selecciona una película:</label>
        <select
          id="movie"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {filteredMovies.map((movie, index) => (
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

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};