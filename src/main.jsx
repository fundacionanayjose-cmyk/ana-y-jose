import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import './index.css'

// Inicializar Google Analytics (Reemplaza con tu ID real de GA4 cuando lo tengas, ej: G-XXXXXXXXXX)
// Si aún no lo tienes, puedes dejar este string o comentarlo temporalmente.
ReactGA.initialize("G-MEASUREMENT_ID");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)