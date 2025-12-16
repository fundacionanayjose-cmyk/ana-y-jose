import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, X, Heart } from 'lucide-react';

const Navbar = ({ scrolled, logoUrl, onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/#nosotros' },
    { name: 'Programas', href: '/#programas' },
    { name: 'Inscripciones', href: '/inscripciones' }, 
    { name: 'Equipo', href: '/#equipo' },
    { name: 'Transparencia', href: '/#transparencia' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-black/20 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoUrl} 
            alt="Fundación Ana y José" 
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                scrolled ? 'text-gray-600 hover:text-rose-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* BOTÓN DONAR */}
          <button
            onClick={onOpenModal}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
              scrolled 
                ? 'bg-amber-400 text-white hover:bg-rose-600' 
                : 'bg-white text-rose-600 hover:bg-amber-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${scrolled ? 'fill-white' : 'fill-rose-600'}`} /> 
            Donar
          </button>
        </div>

        {/* Botón Menú Móvil */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-gray-800" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-gray-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 animate-fade-in-down">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-gray-600 font-medium hover:text-rose-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              className="w-full flex justify-center items-center gap-2 bg-amber-400 text-white font-bold py-3 rounded-xl shadow-md hover:bg-rose-600 transition-colors"
              onClick={() => {
                onOpenModal();
                setIsOpen(false);
              }}
            >
              <Heart className="w-4 h-4 fill-white" /> Quiero Ayudar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;