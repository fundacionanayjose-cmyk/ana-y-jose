import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

// --- IMPORTACIÓN DINÁMICA (LAZY LOADING) ---
// Optimización para que la página cargue rápido
const Home = lazy(() => import('./components/Home'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Terms = lazy(() => import('./components/Terms'));
const AdminLayout = lazy(() => import('./components/AdminLayout')); // Panel Administrativo
const NotFound = lazy(() => import('./components/NotFound'));

// --- PANTALLA DE CARGA ---
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 transition-opacity duration-500">
    <div className="relative">
      <div className="absolute inset-0 bg-rose-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
      <Heart className="w-16 h-16 text-rose-600 relative z-10 animate-bounce fill-current" />
    </div>
    <p className="mt-6 text-rose-800 font-bold text-sm tracking-[0.2em] uppercase animate-pulse">
      Cargando Esperanza...
    </p>
  </div>
);

// --- UTILIDAD: SCROLL AL INICIO AL CAMBIAR DE RUTA ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          
          {/* Rutas Legales */}
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-condiciones" element={<Terms />} />
          
          {/* Ruta Privada (Admin) */}
          <Route path="/admin" element={<AdminLayout />} />
          
          {/* Error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;