import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import './index.css'

// CONFIGURACIÓN DE ANALÍTICA (Paso 10 del Checklist)
// Reemplaza 'G-XXXXXXXXXX' con tu ID real de medición de GA4.
// Puedes obtenerlo gratis en analytics.google.com
const GA_MEASUREMENT_ID = "G-TU_ID_REAL_AQUI"; 

if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-TU_ID_REAL_AQUI") {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  // Enviar pageview inicial
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
} else {
  console.log("Analytics no iniciado (Modo Desarrollo o falta ID)");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)