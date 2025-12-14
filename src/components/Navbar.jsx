import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ scrolled, logoUrl, onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  // Lógica Inteligente de Navegación
  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false); // Cerrar menú móvil si está abierto

    if (isHome) {
      // Si estamos en Home, hacemos scroll suave directo
      const element = document.getElementById(sectionId);
      if (element) {
        // Offset para que la barra de navegación no tape el título (-80px)
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Si estamos en otra página (ej: Proyecto), vamos al Home con un hash
      navigate(`/#${sectionId}`);
    }
  };

  const navLinks = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Programas', id: 'programas' }
  ];

  // Estilos dinámicos
  const isTransparent = isHome && !scrolled;
  const textColorClass = isTransparent ? 'text-white drop-shadow-md' : 'text-gray-800';
  const logoFilter = isTransparent ? 'brightness-0 invert' : ''; // Logo blanco en transparente

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${!isTransparent ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Identidad de Marca */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('inicio')}>
          <img 
            src={logoUrl} 
            alt="Logo Ana y José" 
            className={`h-12 w-auto object-contain drop-shadow-md transition-all duration-300 ${logoFilter}`} 
          />
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
              className={`text-sm font-bold uppercase tracking-wider hover:text-rose-500 transition-colors ${textColorClass}`}
            >
              {item.label}
            </button>
          ))}
          {/* Acción Principal: Donar (Abre el Modal o va a la sección) */}
          <Button 
            variant={!isTransparent ? 'primary' : 'accent'} 
            className="py-2.5 px-5 text-sm shadow-xl" 
            onClick={() => handleNavigation('donar')}
          >
            <Heart className="w-4 h-4 fill-current animate-pulse" /> Donar Amor
          </Button>
        </div>

        {/* Botón Menú Móvil */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50 p-2">
          {isMenuOpen ? <X className="text-gray-800 w-8 h-8" /> : <Menu className={`${textColorClass} w-8 h-8`} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil (Full Screen) */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((item) => (
          <button 
            key={item.id} 
            onClick={() => handleNavigation(item.id)} 
            className="text-2xl font-bold text-gray-800 hover:text-rose-600 uppercase tracking-widest"
          >
            {item.label}
          </button>
        ))}
        <div className="pt-8">
            <Button variant="primary" onClick={() => handleNavigation('donar')} className="w-64 justify-center text-lg">
                <Heart className="w-5 h-5 mr-2" /> Donar Ahora
            </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;