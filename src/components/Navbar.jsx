import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import Button from './Button';

const Navbar = ({ scrolled, logoUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['Inicio', 'Nosotros', 'Programas', 'Donar'];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Identidad de Marca */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          {/* Aquí irá tu logo. Si no carga, muestra el texto */}
          <img src={logoUrl} alt="Logo Ana y José" className="h-12 w-auto object-contain drop-shadow-md" />
          <span className={`text-xl font-bold tracking-tight hidden md:block ${scrolled ? 'text-gray-800' : 'text-white drop-shadow-md'}`}>
            Fundación Ana y José
          </span>
        </div>

        {/* Menú Escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`text-sm font-semibold uppercase tracking-wider hover:text-rose-500 transition-colors ${scrolled ? 'text-gray-600' : 'text-white drop-shadow-sm'}`}
            >
              {item}
            </button>
          ))}
          <Button variant={scrolled ? 'primary' : 'accent'} className="py-2 px-4 text-sm" onClick={() => scrollToSection('donar')}>
            <Heart className="w-4 h-4 fill-current" /> Donar Amor
          </Button>
        </div>

        {/* Botón Menú Móvil (Hamburguesa) */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50">
          {isMenuOpen ? <X className="text-gray-800" /> : <Menu className={scrolled ? 'text-gray-800' : 'text-white'} />}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((item) => (
          <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-2xl font-bold text-gray-800 hover:text-rose-600">
            {item}
          </button>
        ))}
        <Button variant="primary" onClick={() => scrollToSection('donar')}>Donar Ahora</Button>
      </div>
    </nav>
  );
};

export default Navbar;