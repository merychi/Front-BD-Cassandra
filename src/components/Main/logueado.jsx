import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StatusBar from "./statusbar";
import axios from "axios";
import "../../global.css";
import PeliculasVistas from "./peliculasVistas";

export const Logueado = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [showRecommended, setShowRecommended] = useState(true);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [showWatchedMovies, setShowWatchedMovies] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);
  const userID = localStorage.getItem("userID");

  useEffect(() => {

    const mockMovies = [
      { id: 1, series_title: "Interstellar", poster_link: "https://i.imgur.com/mClzJYp.png" },
      { id: 2, series_title: "Her", poster_link: "https://i.imgur.com/6OD4OjT.png" },
      { id: 3, series_title: "Joker", poster_link: "https://i.imgur.com/CUhrd1i.png" },
      { id: 4, series_title: "Maze Runner", poster_link: "https://i.imgur.com/okOFya0.png" },
      { id: 5, series_title: "Stranger Things", poster_link: "https://i.imgur.com/erTqXbm.png" },
    ];
    
    setRandomMovie(mockMovies[0])

    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/movies/'); 
        if (Array.isArray(response.data.data)) {
          setMovies(response.data.data);
        } else {
          console.error("Los datos recibidos no están en el formato esperado.");
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recommendations/${userID}`);
        setRecommendedMovies(response.data.data); 
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchMovies();
    fetchRecommendations();
  }, [userID]);

  const goHome = () => {
    navigate("/");
  };

    const closeVistas = () => {
    setShowWatchedMovies(false);
  };

  return (
    <div className="app">
      <StatusBar onButtonClick={goHome} />
      {showRecommended && (
        <PeliculasVistas
          watchedMovies ={watchedMovies}
          onClose={closeVistas}
        />
      )}
      
      <div className="featured-movie">
        {randomMovie && (
          <>
            <img
              src={randomMovie.poster_link}
              alt={randomMovie.series_title}
              className="featured-img"
            />
            <div className="movie-info">
              <h1>{randomMovie.series_title}</h1>
            </div>
          </>
        )}
      </div>

      <div className="recommended">
        <h2 className="letricablanca-home">Películas recomendadas</h2>
        <div className="movie-list">
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.poster_link}
                  alt={movie.series_title}
                />
                <h3>{movie.series_title}</h3>
              </div>
            ))
          ) : (
            <p>No se encontraron recomendaciones.</p>
          )}
        </div>
      </div>

      <div className="all-movies">
        <h2 className="letricablanca-home">Listado de películas</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster_link}
                alt={movie.series_title}
              />
              <h3>{movie.series_title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logueado;
