import { Link } from "react-router-dom";  // Importa Link
import "./Formulario.css";
import { BiLock, BiUser, BiEnvelope } from "react-icons/bi";
import { useState } from "react";

export const Register = () => {

    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [ConfirmarClave, setConfirmarClave] = useState("");
    const [error, setError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|gov|edu|co)$/;
  
      if (clave !== ConfirmarClave) { 
        setError(true);
        setMensajeError("Las claves no coinciden");
        return;
      }

      if (!emailRegex.test(email)) {
        setError(true);
        setMensajeError("Por favor ingresa un correo válido.");
        return;
      }
  
      setError(false);
      setMensajeError("");
      alert("Registro exitoso");
    }


  return (
    <div className="container">
      <div className="background"></div>
      <form onSubmit={handleSubmit}>
        <h2>Bienvenido a Netflix</h2>

        <div className="input-container">
          <div className="input-wrapper">
            <BiEnvelope className="input-icon" />
            <input id="email" type="text" value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Correo electrónico" required/>
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <BiUser className="input-icon" />
            <input id="user" type="text" value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario" required/>
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <BiLock className="input-icon" />
            <input id="clave" type="password" value={clave}
              onChange={(e) => setClave(e.target.value)} placeholder="Contraseña" required/>
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <BiLock className="input-icon" />
            <input id="ConfirmarClave" type="password" value={ConfirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)} placeholder="Confirmar contraseña" required/>
          </div>
        </div>
        {error && (
            <p className="error-message">{mensajeError}</p>
          )}
        <button type="submit">Crear Cuenta</button>

        <div className="account-question">
          <p>¿Ya tienes una cuenta?</p>
          <p>
            <Link to="/login">Ingresa aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
