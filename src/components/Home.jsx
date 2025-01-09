import "./home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Netflix</h1>
      <h3 className="subtitle">Mira las películas que quieras</h3>
      <h4 className="description">Y recomiéndalas a tus amigos</h4>
      <div className="buttons-container">
        <button className="btn">Ingresar</button>
        <button className="btn">Crear Cuenta</button>
      </div>
    </div>
  );
};
