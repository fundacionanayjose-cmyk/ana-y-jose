import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Componentes Públicos
import Home from './components/Home';
import Registration from './components/Registration';
import ProjectDetail from './components/ProjectDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import NotFound from './components/NotFound';

// Componentes de Administración (Protegidos)
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Utilidad ScrollToTop
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Home />} />
          <Route path="/inscripciones" element={<Registration />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-condiciones" element={<Terms />} />

          {/* --- RUTAS DE ADMINISTRACIÓN --- */}
          {/* Login público para admins */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Zona Protegida: Requiere sesión activa */}
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<AdminDashboard />} />
          </Route>

          {/* --- 404 --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;