import React, { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  }
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) { 
    return <LoginPage onLogin={login} />;
  } else {
    return <SchedulePage onLogout={logout} />;
  }
}

export default App;
