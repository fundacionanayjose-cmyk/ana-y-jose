import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// We import the pages
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';

// Auxiliary component to ensure the view scrolls to top when changing page
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
      {/* Activate automatic scroll */}
      <ScrollToTop />
      
      <Routes>
        {/* Main Route: Landing Page */}
        <Route path="/" element={<Home />} />
        
        {/* Dynamic Route: Project Detail */}
        <Route path="/proyecto/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
};

export default App;