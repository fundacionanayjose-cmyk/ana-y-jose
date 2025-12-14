import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Variables para controlar el gesto táctil (Swipe)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // LISTA DE IMÁGENES REALES
  const images = [
    { src: '/galeria/20211120_111629_HDR.jpg', caption: 'Momentos que iluminan vidas' },
    { src: '/galeria/20210503_205438.jpg', caption: 'Compartiendo sonrisas' },
    { src: '/galeria/20210909_160146.jpg', caption: 'Talleres y actividades' },
    { src: '/galeria/20211224_163500_HDR.jpg', caption: 'Celebrando la Navidad en familia' },
    { src: '/galeria/IMG20250805144021 (1).jpg', caption: 'Nuestra comunidad unida' },
    { src: '/galeria/20211121_132212_HDR.jpg', caption: 'Cuidado y bienestar' },
  ];

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // --- LÓGICA DE SWIPE (TÁCTIL) ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Mínimo píxeles para considerar swipe

    if (distance > minSwipeDistance) {
      // Deslizó a la izquierda -> Siguiente
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Deslizó a la derecha -> Anterior
      prevSlide();
    }
    
    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Momentos</h2>
          <p className="text-gray-400">Un recorrido visual por la felicidad que construimos juntos.</p>
        </div>

        {/* --- VISOR DEL CARRUSEL --- */}
        <div 
          className="relative max-w-5xl mx-auto h-[300px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* IMAGEN OPTIMIZADA */}
          <div className="w-full h-full relative bg-gray-800">
             <img 
               src={images[currentIndex].src} 
               alt={images[currentIndex].caption}
               className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
               loading="lazy"
               // --- PROTECCIÓN CONTRA CLIC DERECHO ---
               onContextMenu={(e) => {
                 e.preventDefault();
                 return false;
               }}
               // --------------------------------------
               onError={(e) => {
                 e.target.onerror = null; 
                 e.target.src = "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1000"; // Fallback elegante
               }}
             />
             
             {/* Gradiente para texto */}
             <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pb-8 pointer-events-none">
               <h3 className="text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg text-center px-4">
                 {images[currentIndex].caption}
               </h3>
             </div>
          </div>

          {/* --- CONTROLES (Flechas) --- */}
          {/* Ocultos en móvil para no tapar la foto, ya que ahora tenemos SWIPE */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all hidden md:block opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all hidden md:block opacity-0 group-hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight size={32} />
          </button>

          {/* --- INDICADORES --- */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {images.map((_, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm ${
                  idx === currentIndex ? 'bg-rose-500 w-8' : 'bg-white/50 w-2 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-4 md:hidden">
          (Desliza para ver más fotos)
        </p>
      </div>
    </section>
  );
};

export default Gallery;