import "./home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/registro");  
  };

  return (
    <div className="home-container">
      <h1 className="title">Netflix</h1>
      <h3 className="subtitle">Mira las películas que quieras</h3>
      <h4 className="description">Y recomiéndalas a tus amigos</h4>
      <div className="buttons-container">
        <button className="btn" onClick={goToLogin}>Ingresar</button>
        <button className="btn" onClick={goToRegister}>Crear Cuenta</button>
      </div>
    </div>
  );
};
