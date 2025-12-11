import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // LISTA DE IMÁGENES (Asegúrate de tenerlas en public/galeria/)
  const images = [
    { src: '/galeria/foto1.jpg', caption: 'Alegría en cada baile' },
    { src: '/galeria/foto2.jpg', caption: 'Talleres de pintura' },
    { src: '/galeria/foto3.jpg', caption: 'Nuestros eventos' },
    { src: '/galeria/foto4.jpg', caption: 'Cuidado y salud' },
    { src: '/galeria/foto5.jpg', caption: 'Comedor comunitario' },
  ];

  // Lógica del Autoplay (Cambia cada 4 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // 4000ms = 4 segundos

    // Limpiamos el timer si el componente se desmonta o cambia el índice manual
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Momentos</h2>
          <p className="text-gray-400">Un recorrido visual por la felicidad que construimos juntos.</p>
        </div>

        {/* --- VISOR DEL CARRUSEL --- */}
        <div className="relative max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
          
          {/* Imagen de Fondo (La actual) */}
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out transform hover:scale-105"
            style={{ backgroundImage: `url(${images[currentIndex].src})` }}
            // Fallback: Si no encuentra la imagen local, usa una de ejemplo de Unsplash
            onError={(e) => e.target.style.backgroundImage = "url('https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1000')"}
          >
            {/* Gradiente Oscuro Inferior para que el texto se lea bien */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-8">
              <h3 className="text-2xl font-bold tracking-wide drop-shadow-lg">
                {images[currentIndex].caption}
              </h3>
            </div>
          </div>

          {/* --- CONTROLES (Flechas) --- */}
          {/* Botón Izquierda */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={32} />
          </button>
          
          {/* Botón Derecha */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={32} />
          </button>

          {/* --- INDICADORES (Puntitos) --- */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {images.map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${
                  idx === currentIndex ? 'bg-rose-500 w-8' : 'bg-white/50 w-2 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;