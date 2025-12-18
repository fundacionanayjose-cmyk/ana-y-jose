import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { supabase } from './supabase/client';

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
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <HelmetProvider>
      {/* CORRECCIÓN: Activamos las 'future flags' para eliminar las advertencias de la consola */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Home />} />
          <Route path="/inscripciones" element={<Registration />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-condiciones" element={<Terms />} />

          {/* --- RUTAS DE ADMINISTRACIÓN --- */}
          {/* Login: Si ya hay sesión, redirige al dashboard */}
          <Route 
            path="/admin/login" 
            element={
              !session ? (
                <AdminLogin onLoginSuccess={(s) => setSession(s)} />
              ) : (
                <Navigate to="/admin" replace />
              )
            } 
          />

          {/* Zona Protegida: Requiere sesión activa */}
          <Route 
            path="/admin" 
            element={session ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
          >
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