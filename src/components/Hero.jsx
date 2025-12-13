import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from './Button';

const Hero = ({ onPrimaryAction }) => {
  // --- CONFIGURACIÓN DE IMÁGENES REALES ---
  // Usamos las fotos que tienes en tu carpeta public/galeria
  const heroImages = [
    "/galeria/20211120_111629_HDR.jpg", // Foto grupal / principal
    "/galeria/20211121_132212_HDR.jpg", // Abuelos
    "/galeria/20210503_205438.jpg",     // Otra foto de impacto
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Mantenemos tu lógica de Autoplay intacta
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* --- CARRUSEL DE FONDO (Lógica Original Preservada) --- */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((imgSrc, index) => (
          <img 
            key={index}
            src={imgSrc} 
            alt={`Fondo ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 z-[-1]'
            }`}
          />
        ))}
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-black/40"></div>
      </div>

      {/* --- CONTENIDO CON LEMA OFICIAL --- */}
      <div className="container mx-auto px-6 relative z-10 text-center mt-20 animate-fade-in-up">
        <div className="inline-block animate-fade-in-up mb-6">
          <span className="bg-rose-600/90 backdrop-blur-sm text-white py-1 px-4 rounded-full text-sm font-bold tracking-widest inline-block uppercase shadow-lg">
            Bogotá, Colombia
          </span>
        </div>
        
        {/* LEMA ACTUALIZADO */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl max-w-5xl mx-auto">
           Recuperando  <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-rose-500">
           Sonrisas Perdidas
          </span>
        </h1>

        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          En la <strong>Fundación Ana y José</strong>, convertimos la soledad en compañía y el olvido en esperanza.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="accent" onClick={onPrimaryAction} className="shadow-xl shadow-yellow-400/20">
            Quiero Ayudar
          </Button>
          
          <Button variant="outline" className="group backdrop-blur-sm bg-white/5 hover:bg-white/20 border-white/30" onClick={() => document.getElementById('nosotros')?.scrollIntoView({behavior: 'smooth'})}>
            Conocer más <ChevronDown className="group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Curva decorativa original */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-stone-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;