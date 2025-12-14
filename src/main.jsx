import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import './index.css'

// Configuración de Analytics segura para producción
const GA_ID = import.meta.env.VITE_GA_ID;

if (GA_ID) {
  ReactGA.initialize(GA_ID);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
} else {
  // En desarrollo no ensuciamos los datos
  if (import.meta.env.MODE === 'development') {
    console.log("Analytics inactivo (Modo Desarrollo)");
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)