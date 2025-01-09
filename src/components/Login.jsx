import { Link } from "react-router-dom";
import "./Formulario.css";
import { BiLock, BiUser, BiEnvelope } from "react-icons/bi";
import { useState } from "react";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos

    if (clave !== "12345") { 
      setError(true);
      setMensajeError("La clave es incorrecta.");
      return;
    }

    setError(false);
    setMensajeError("");
    alert("Inicio de sesión exitoso!");
  }

  return (
    <div className="container">
      <div className="background"></div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div className="input-container">
          <div className="input-wrapper">
            <BiEnvelope className="input-icon" />
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              title="Este campo es obligatorio" 
            />
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <BiLock className="input-icon" />
            <input
              id="clave"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Contraseña"
              required
              title="Este campo es obligatorio" 
            />
          </div>
          {error && (
            <p className="error-message">{mensajeError}</p>
          )}
          <div className="account-question">
            <p><Link to="/modificar">¿Olvidaste tu contraseña?</Link></p>
          </div>
        </div>

        <button type="submit">Ingresar</button>

        <div className="account-question">
          <p>¿No tienes una cuenta?</p>
          <p><Link to="/registro">Ingresa aquí</Link></p>
        </div>
        
      </form>
    </div>
  );
};
