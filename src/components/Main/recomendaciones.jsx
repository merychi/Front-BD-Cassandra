import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";
import { BiTv } from "react-icons/bi";  // Asegúrate de que el ícono esté importado correctamente
import "../../global.css";

export const RecomendacionesRecibidas = () => {
  const userID = 1;
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recommendations/${userID}`);
        setPeliculasRecomendadas(response.data.data);  
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userID]);

  return (
    <div className="admin-container2">
      <h2 className="letricablanca">Recomendaciones Recibidas</h2>
      <List>
        {peliculasRecomendadas && peliculasRecomendadas.length > 0 ? (
          peliculasRecomendadas.map((pelicula) => (
            <ListItem key={pelicula.id}>
              <BiTv style={{ marginRight: 20, color:'orange' }} /> 
              <ListItemText primary={pelicula.series_title} /> 
            </ListItem>
          ))
        ) : (
          <p>No se encontraron recomendaciones.</p>
        )}
      </List>
    </div>
  );
};
