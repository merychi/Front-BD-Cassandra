import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function PeliculasVistas() {
  const [showModal, setShowModal] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");
  const [allMovies, setAllMovies] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [watchedResponse, allMoviesResponse] = await Promise.all([
          axios.get(`http://localhost:8080/movies/user/${userID}`), 
          axios.get(`http://localhost:8080/movies/`) 
        ]);

        if (watchedResponse.status === 200 && watchedResponse.data.data) {
          setMovies(watchedResponse.data.data);
        }

        if (allMoviesResponse.status === 200 && allMoviesResponse.data.data) {
          const formattedMovies = allMoviesResponse.data.data.map((movie) => ({
            value: movie.id, 
            label: movie.series_title 
          }));
          setAllMovies(formattedMovies);
        }
      } catch (error) {
        console.error("Error obteniendo las películas:", error);
      }
    };

    fetchMovies();
  }, [userID]);

  // Manejar la adición de películas
  const handleAddMovie = async () => {
    if (selectedMovie) {
      try {
        const response = await axios.put(
          `http://localhost:8080/users/${userID}/watched/${selectedMovie.value}`,
          [selectedMovie.value] // Enviar un array de movieIDs
        );
  
        if (response.status === 200) {
          setMovies([...movies, { series_title: selectedMovie.label }]);
          setSelectedMovie(null);
          setShowAddModal(false);
          alert("Película agregada correctamente.");
        }
      } catch (error) {
        console.error("Error agregando la película:", error);
        alert("Hubo un error al agregar la película.");
      }
    } else {
      alert("Por favor, selecciona una película.");
    }
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <h2 className="letricablanca">Películas vistas</h2>
          <div className="scroll-container">
            <ul>
              {movies.map((movie, index) => (
                <li key={index}>{movie.series_title}</li> 
              ))}
            </ul>
          </div>
          <button onClick={() => setShowAddModal(true)}>Agregar película</button>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </div>
      )}

      {showAddModal && (
        <div className="modal">
          <h2 className="letricablanca">Agregar Película</h2>

          <Select
            options={allMovies}
            value={selectedMovie}
            onChange={(selected) => setSelectedMovie(selected)}
            placeholder="Busca una película..."
            isClearable
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#333",
                color: "#fff", 
                borderColor: "#b86326", 
                boxShadow: "none",
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "#fff",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: "#fff",
                caretColor: "#fff",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#333", 
                color: "#fff",
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#b86326" : "#333", 
                color: "#fff", 
              }),
            }}
          />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleAddMovie}>Guardar</button>
            <button onClick={() => setShowAddModal(false)}>Volver</button>
          </div>
        </div>
      )}

      <style>{`
         .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          border: 1px solid #ccc;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          width: 300px;
          text-align: center;
        }

        .scroll-container {
          max-height: 300px; 
          overflow-y: auto;
          margin: 10px 0;
          padding: 2px;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin: 5px 0;
        }

        button {
          margin: 5px;
        }

      `}</style>
    </div>
  );
}

export default PeliculasVistas;
