import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from './Button';

const Hero = ({ onPrimaryAction }) => {
  // --- CONFIGURACIÓN DE IMÁGENES ---
  // TODO: Reemplaza estas URLs por las fotos reales de alta calidad de la fundación.
  // Idealmente, usa 3 a 5 imágenes potentes.
  const heroImages = [
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2068&auto=format&fit=crop", // Foto original (Abuelo feliz)
    "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop", // Manos sostenidas
    "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2070&auto=format&fit=crop", // Grupo compartiendo
    // Agrega más aquí si deseas...
  ];

  // Estado para controlar el índice de la imagen actual visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para el cambio automático de imágenes (Autoplay)
  useEffect(() => {
    // Configura un intervalo que se ejecuta cada 5000ms (5 segundos)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        // Usamos el operador módulo (%) para que el índice vuelva a 0 al llegar al final
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    // IMPORTANTE: Limpieza del intervalo cuando el componente se desmonta
    // Esto previene fugas de memoria y comportamientos extraños.
    return () => clearInterval(interval);
  }, []); // El array vacío asegura que esto solo se configure una vez al montar el componente

  return (
    <header id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* --- CONTENEDOR DEL CARRUSEL DE FONDO --- */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((imgSrc, index) => (
          <img 
            key={index}
            src={imgSrc} 
            alt={`Imagen de fondo ${index + 1} Fundación Ana y José`} 
            // Lógica de transición:
            // 1. Todas las imágenes están en posición absoluta cubriendo el área.
            // 2. Solo la imagen cuyo índice coincide con 'currentIndex' tiene opacidad 1. Las demás opacidad 0.
            // 3. 'transition-opacity duration-1000' crea el efecto suave de fundido (crossfade).
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 z-[-1]'
            }`}
          />
        ))}
        
        {/* Overlay (Capa oscura encima de las imágenes para que el texto se lea bien) */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-black/40"></div>
      </div>

      {/* --- CONTENIDO DEL HERO (Sin cambios en la estructura, solo el lema placeholder) --- */}
      <div className="container mx-auto px-6 relative z-10 text-center mt-20 animate-fade-in-up">
        <div className="inline-block animate-fade-in-up mb-6">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white py-1 px-4 rounded-full text-sm font-bold tracking-widest inline-block uppercase shadow-lg">
            Bogotá, Colombia
          </span>
        </div>
        
        {/* --- TODO: RECUERDA CAMBIAR TU LEMA AQUÍ --- */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl max-w-5xl mx-auto">
          Escribe aquí la primera parte de tu lema y <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-rose-500">
            destaca la parte más importante aquí.
          </span>
        </h1>
        {/* ------------------------------------------ */}

        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          En la <strong>Fundación Ana y José</strong>, convertimos la soledad en compañía y el olvido en esperanza.
        </p>
        
        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button variant="accent" onClick={onPrimaryAction} className="shadow-xl shadow-yellow-400/20">
            Quiero ser Padrino
          </Button>
          
          <Button variant="outline" className="group backdrop-blur-sm bg-white/5 hover:bg-white/20 border-white/30" onClick={() => document.getElementById('nosotros')?.scrollIntoView({behavior: 'smooth'})}>
            Conocer más <ChevronDown className="group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Curva decorativa inferior */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-stone-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;