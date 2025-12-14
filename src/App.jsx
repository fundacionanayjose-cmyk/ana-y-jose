import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importamos las páginas
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import PrivacyPolicy from './components/PrivacyPolicy'; // IMPORTAR NUEVO COMPONENTE

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/:id" element={<ProjectDetail />} />
        {/* Nueva Ruta Legal */}
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;