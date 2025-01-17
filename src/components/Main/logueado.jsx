import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "./statusbar";
import "../../global.css";

export const Logueado = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    const mockMovies = [
      { id: 1, title: "Interestellar", poster_path: "https://i.imgur.com/mClzJYp.png" },
      { id: 2, title: "Her", poster_path: "https://i.imgur.com/6OD4OjT.png" },
      { id: 3, title: "Joker", poster_path: "https://i.imgur.com/CUhrd1i.png" },
      { id: 4, title: "Maze Runner", poster_path: "https://i.imgur.com/okOFya0.png" },
      { id: 5, title: "Stranger Things", poster_path: "https://i.imgur.com/erTqXbm.png" },
      { id: 6, title: "El Niño Cohete", poster_path: "https://i.imgur.com/SrUyIjt.png" },
      { id: 7, title: "Tiempo", poster_path: "https://i.imgur.com/0FyogES.png" },
      { id: 8, title: "Reyes del Futuro", poster_path: "https://i.imgur.com/OSLQdAR.png" },
      { id: 9, title: "Avengers: Infinity War", poster_path: "https://i.imgur.com/3RMOOZ5.png" },
      { id: 10, title: "La forma del agua", poster_path: "https://i.imgur.com/RQD14cu.png" },
      { id: 11, title: "SHERK", poster_path: "https://i.imgur.com/9gkryX5.png" },
      { id: 12, title: "Géminis", poster_path: "https://i.imgur.com/nLUe7Cg.png" },
      { id: 13, title: "DJANJO", poster_path: "https://i.imgur.com/CZJW1Pz.png" },
      { id: 14, title: "Interestellar", poster_path: "https://i.imgur.com/mClzJYp.png" },
      { id: 92, title: "Her", poster_path: "https://i.imgur.com/6OD4OjT.png" },
      { id: 23, title: "Joker", poster_path: "https://i.imgur.com/CUhrd1i.png" },
      { id: 24, title: "Maze Runner", poster_path: "https://i.imgur.com/okOFya0.png" },
      { id: 25, title: "Stranger Things", poster_path: "https://i.imgur.com/erTqXbm.png" },
      { id: 62, title: "El Niño Cohete", poster_path: "https://i.imgur.com/SrUyIjt.png" },
      { id: 27, title: "Tiempo", poster_path: "https://i.imgur.com/0FyogES.png" },
      { id: 28, title: "Reyes del Futuro", poster_path: "https://i.imgur.com/OSLQdAR.png" },
      { id: 29, title: "Avengers: Infinity War", poster_path: "https://i.imgur.com/3RMOOZ5.png" },
      { id: 30, title: "La forma del agua", poster_path: "https://i.imgur.com/RQD14cu.png" },
      { id: 31, title: "SHERK", poster_path: "https://i.imgur.com/9gkryX5.png" },
      { id: 32, title: "Géminis", poster_path: "https://i.imgur.com/nLUe7Cg.png" },
      { id: 33, title: "DJANJO", poster_path: "https://i.imgur.com/CZJW1Pz.png" },
      { id: 41, title: "Interestellar", poster_path: "https://i.imgur.com/mClzJYp.png" },
      { id: 42, title: "Her", poster_path: "https://i.imgur.com/6OD4OjT.png" },
      { id: 43, title: "Joker", poster_path: "https://i.imgur.com/CUhrd1i.png" },
      { id: 44, title: "Maze Runner", poster_path: "https://i.imgur.com/okOFya0.png" },
      { id: 45, title: "Stranger Things", poster_path: "https://i.imgur.com/erTqXbm.png" },
      { id: 46, title: "El Niño Cohete", poster_path: "https://i.imgur.com/SrUyIjt.png" },
      { id: 47, title: "Tiempo", poster_path: "https://i.imgur.com/0FyogES.png" },
      { id: 48, title: "Reyes del Futuro", poster_path: "https://i.imgur.com/OSLQdAR.png" },
      { id: 49, title: "Avengers: Infinity War", poster_path: "https://i.imgur.com/3RMOOZ5.png" },
      { id: 50, title: "La forma del agua", poster_path: "https://i.imgur.com/RQD14cu.png" },
      { id: 51, title: "SHERK", poster_path: "https://i.imgur.com/9gkryX5.png" },
      { id: 52, title: "Géminis", poster_path: "https://i.imgur.com/nLUe7Cg.png" },
      { id: 53, title: "DJANJO", poster_path: "https://i.imgur.com/CZJW1Pz.png" },
    ];
    setMovies(mockMovies);
    setRecommendedMovies(mockMovies.slice(0, 8));
    setRandomMovie(mockMovies[0]);
  }, []);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <StatusBar onButtonClick={goHome} />

      <div className="featured-movie">
        {randomMovie && (
          <>
            <img
              src={randomMovie.poster_path}
              alt={randomMovie.title}
              className="featured-img"
            />
            <div className="movie-info">
              <h1>{randomMovie.title}</h1>
            </div>
          </>
        )}
      </div>

      <div className="recommended">
        <h2>Películas recomendadas</h2>
        <div className="recommended-list">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_path}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="all-movies">
        <h2>Listado de películas</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_path}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logueado;