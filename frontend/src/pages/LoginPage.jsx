import React, { useState } from 'react';
import './LoginPage.css';
import * as api from '../api';

function LoginPage({ onLogin }) {
  const [valuer_id, setValuerId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "none" });

  const login = async (e) => {
    e.preventDefault();
    try {
      const { error, accessToken } = await api.login({ valuer_id, password });
      if (error) {
        setMessage({ type: "error", text: error });
      } else {
        onLogin(accessToken);
      }
    } catch (err) {
      setMessage({ type: "error", text: err.toString() })
    }
  };
  
  return (
    
    <div className="login-page">
      <div id="image-form">
        <div className="myImage"> </div>
        </div>
        <div id="form-login">
        <div class="title">
      <h2>Iniciar sessió</h2>
      </div>
      <form onSubmit={login}>
        <label className="form-label">
          <div>Usuari</div>
          <input className="form-input" id="user" type="text" value={valuer_id} onChange={(e) => setValuerId(e.target.value)} />
        </label>
        <label className="form-label">
          <div>Contrasenya</div>
          <input className="form-input" id="key" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="btn">
          <input className="submit-btn" type="submit" value="Entra" />
        </div>        
      </form>
      <div className={`message ${message.type}`}>{message.text}</div>
    </div>
    </div>
  )
}

export default LoginPage;