import { useNavigate } from "react-router-dom";
import "./Formulario.css";
import { BiLock, BiEnvelope, BiSolidDoorOpen, BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import axios from "axios"; 

export const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !clave) {
      setError(true);
      setMensajeError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    // Datos para el login
    const loginData = {
      username: user,
      password: clave
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        navigate("/logueado"); 
      }
    } catch (error) {
      setError(true);
      setMensajeError("Credenciales incorrectas o error en el servidor.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <button className="go-home-btn" onClick={goHome}>
        <BiSolidDoorOpen className="input-icon" />
      </button>
      <div className="background"></div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div className="input-container">
          <div className="input-wrapper">
            <BiEnvelope className="input-icon" />
            <input
              id="user"
              type="text"
              value={user}
              onChange={(e) => setuser(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <BiLock className="input-icon" />
            <input
              id="clave"
              type={passwordVisible ? "text" : "password"}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {error && <p className="error-message">{mensajeError}</p>}
          <div className="account-question">
            <p>
              <a href="/modificar">¿Olvidaste tu contraseña?</a>
            </p>
          </div>
        </div>

        <button type="submit">Ingresar</button>

        <div className="account-question">
          <p>¿No tienes una cuenta?</p>
          <p>
            <a href="/registro">Ingresa aquí</a>
          </p>
        </div>
      </form>
    </div>
  );
};
