import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

// --- OPTIMIZACIÓN DE RENDIMIENTO (LAZY LOADING) ---
// Importamos los componentes solo cuando el usuario los necesita.
// Esto reduce drásticamente el peso inicial de la página.
const Home = lazy(() => import('./components/Home'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const NotFound = lazy(() => import('./components/NotFound'));

// --- COMPONENTE DE CARGA (FEEDBACK VISUAL) ---
// Se muestra mientras se descargan los "chunks" de código en segundo plano.
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
// Asegura que al navegar, la vista siempre empiece desde arriba.
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
      
      {/* Suspense atrapa la carga de los componentes Lazy y muestra el LoadingScreen */}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Ruta Principal */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas Dinámicas de Proyectos (ej: /proyecto/nutricion) */}
          <Route path="/proyecto/:id" element={<ProjectDetail />} />
          
          {/* Ruta Legal */}
          <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
          
          {/* RUTA DE CAPTURA DE ERRORES (404) */}
          {/* El "*" atrapa cualquier ruta que no coincida con las anteriores */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;