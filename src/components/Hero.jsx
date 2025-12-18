import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  // CAMBIO: Seleccionamos las mejores fotos HDR panorámicas de tu lista
  const heroImages = [
    "/galeria/20211120_111629_HDR.jpg", // Gran plano general
    "/galeria/20211120_135409_HDR.jpg", // Grupo o actividad
    "/galeria/20211120_132956_HDR.jpg", // Otra toma vibrante
    "/galeria/20211224_163500_HDR.jpg"  // La foto de Navidad (emotiva)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const scrollToDonation = () => {
    const donationSection = document.getElementById('donar');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('nosotros');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // CORRECCIÓN: 'supports-[height:100dvh]:h-[100dvh]' asegura que ocupe la pantalla completa real en móviles
    <header id="inicio" className="relative h-screen supports-[height:100dvh]:h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* FONDO (CARRUSEL) */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((imgSrc, index) => (
          <img 
            key={index}
            src={imgSrc} 
            alt={`Fundación Ana y José - Momento ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 z-[-1]'
            }`}
          />
        ))}
        
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-black/40 to-black/20"></div>
      </div>

      {/* CONTENIDO PRINCIPAL (Aseguramos Z-20 para que esté siempre encima) */}
      <div className="container mx-auto px-6 relative z-20 text-center mt-20 animate-fade-in-up">
        
        <div className="inline-block animate-fade-in-up mb-6">
          <span className="bg-rose-600/90 backdrop-blur-sm text-white py-1 px-4 rounded-full text-sm font-bold tracking-widest inline-block uppercase shadow-lg border border-rose-500/50">
            Bogotá, Colombia
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] max-w-5xl mx-auto">
          Recuperando <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-rose-500 drop-shadow-sm">
             Sonrisas Perdidas
          </span>
        </h1>

        <p className="text-xl text-white mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          En la <strong>Fundación Ana y José</strong>, convertimos la soledad en compañía, el hambre en alimento y el olvido en esperanza de nuestras personas Mayores.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button 
            variant="accent" 
            onClick={scrollToDonation} 
            className="py-4 px-8 text-lg shadow-xl shadow-yellow-400/20 flex items-center gap-2 transform hover:scale-105 transition-transform"
          >
            <Heart className="w-5 h-5 fill-current animate-pulse" /> Quiero Ayudar
          </Button>
          
          <Button 
            variant="outline" 
            onClick={scrollToAbout}
            className="group backdrop-blur-sm bg-black/20 hover:bg-black/40 border-white/50 text-white py-4 px-8" 
          >
            Conocer más <ChevronDown className="group-hover:translate-y-1 transition-transform ml-1 inline-block" size={18}/>
          </Button>
        </div>
      </div>
      
      {/* DIVIDER INFERIOR (Ondas) */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-stone-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;