import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import "../../global.css";

export const RecomendacionesRecibidas = ({ }) => {
  const userID = 1;
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);
  const [peliculasVistas, setPeliculasVistas] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/enviar?user_id=${userID}`);
        setPeliculasRecomendadas(response.data.recommendations); 
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userID]); // Se vuelve a ejecutar cada vez que cambia el userID

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setPeliculasVistas((prev) => [...prev, id]);
    } else {
      setPeliculasVistas((prev) => prev.filter((peliculaId) => peliculaId !== id));
    }
  };

  return (
    <div className="admin-container2">
      <h2 className="letricablanca">Recomendaciones Recibidas</h2>
      <FormGroup>
        {peliculasRecomendadas && peliculasRecomendadas.length > 0 ? (
          peliculasRecomendadas.map((pelicula) => (
            <FormControlLabel
              key={pelicula.id}
              control={<Checkbox />}
              label={pelicula.nombre}
            />
          ))
        ) : (
          <p>     No se encontraron recomendaciones.</p>
        )}
      </FormGroup>
    </div>
  );
};