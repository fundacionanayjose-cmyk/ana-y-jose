import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ scrolled, logoUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);
    
    if (isHome) {
      // Si estamos en Home, hacemos scroll suave
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, vamos al Home y luego scrolleamos
      // Usamos un hash en la URL para que el Home sepa a dónde ir al cargar
      navigate(`/#${sectionId}`);
      // Un pequeño timeout para dar tiempo a que cargue el Home
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Programas', id: 'programas' }
  ];

  // Determinar estilos según si es Home o página interna
  const isTransparent = isHome && !scrolled;
  const textColorClass = isTransparent ? 'text-white drop-shadow-md' : 'text-gray-800';

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${!isTransparent ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Identidad de Marca */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('inicio')}>
          <img src={logoUrl} alt="Logo Ana y José" className="h-12 w-auto object-contain drop-shadow-md" />
          <span className={`text-xl font-bold tracking-tight hidden md:block ${textColorClass}`}>
            Fundación Ana y José
          </span>
        </div>

        {/* Menú Escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavigation(item.id)}
              className={`text-sm font-semibold uppercase tracking-wider hover:text-rose-500 transition-colors ${textColorClass}`}
            >
              {item.label}
            </button>
          ))}
          <Button 
            variant={!isTransparent ? 'primary' : 'accent'} 
            className="py-2 px-4 text-sm" 
            onClick={() => handleNavigation('donar')}
          >
            <Heart className="w-4 h-4 fill-current" /> Donar Amor
          </Button>
        </div>

        {/* Botón Menú Móvil */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50">
          {isMenuOpen ? <X className="text-gray-800" /> : <Menu className={textColorClass} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((item) => (
          <button key={item.id} onClick={() => handleNavigation(item.id)} className="text-2xl font-bold text-gray-800 hover:text-rose-600">
            {item.label}
          </button>
        ))}
        <Button variant="primary" onClick={() => handleNavigation('donar')}>Donar Ahora</Button>
      </div>
    </nav>
  );
};

export default Navbar;