import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

// --- OPTIMIZACIÓN DE RENDIMIENTO (LAZY LOADING) ---
// Importamos los componentes solo cuando se necesitan para que la web cargue rápido.
const Home = lazy(() => import('./components/Home'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Terms = lazy(() => import('./components/Terms'));
const NotFound = lazy(() => import('./components/NotFound'));

// --- COMPONENTE DE CARGA (FEEDBACK VISUAL) ---
// Se muestra mientras se descargan las secciones nuevas
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

// --- UTILIDAD DE UX ---
// Asegura que al navegar, la vista siempre empiece desde arriba de la página
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
      
      {/* Suspense maneja la espera de los componentes Lazy */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Ruta Principal (Home) */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas Dinámicas de Proyectos (ej: /proyecto/nutricion) */}
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          
          {/* Rutas Legales */}
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-condiciones" element={<Terms />} />
          
          {/* RUTA DE CAPTURA DE ERRORES (404) */}
          {/* El "*" atrapa cualquier ruta que no exista */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;