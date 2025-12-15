import React from 'react';
import { Heart, Gift } from 'lucide-react';
import { beneficiaries } from '../data/beneficiaries';
import Button from './Button';

const SponsorSection = ({ onOpenModal }) => {
  // Duplicamos la lista para el efecto infinito
  const infiniteList = [...beneficiaries, ...beneficiaries];

  return (
    <section id="apadrinar" className="py-16 bg-stone-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <span className="text-rose-600 font-bold uppercase tracking-wider text-xs md:text-sm mb-2 block animate-fade-in-up">
          Plan Padrino
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
          Adopta un Corazón
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Desliza para conocer a nuestros abuelos. Tu ayuda mensual transforma su realidad.
        </p>
      </div>

      {/* --- CINTA HORIZONTAL --- */}
      <div className="relative w-full">
        {/* Degradados laterales para suavizar bordes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-stone-100 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-stone-100 to-transparent pointer-events-none"></div>

        {/* Contenedor de la animación (hover:pause para detenerse al pasar el mouse) */}
        <div className="flex w-max animate-scroll gap-6 px-4 hover:[animation-play-state:paused]">
          {infiniteList.map((abuelo, index) => (
            <div 
              key={`${abuelo.id}-${index}`} 
              className="w-64 shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              
              {/* Imagen */}
              <div className="relative h-40 overflow-hidden shrink-0">
                <img 
                  src={abuelo.foto} 
                  alt={abuelo.nombre} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-bold leading-tight">{abuelo.nombre}</h3>
                  <p className="text-white/90 text-xs font-medium flex items-center gap-1 opacity-80">
                    <Gift size={12} /> {abuelo.edad} años
                  </p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-500 text-xs mb-3 line-clamp-3 leading-relaxed italic">
                  "{abuelo.resumen}"
                </p>
                
                <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-100 mb-4 mt-auto">
                  <p className="text-[10px] text-yellow-800 font-bold uppercase tracking-wide mb-0.5">Necesidad:</p>
                  <p className="text-yellow-900 font-bold text-xs">{abuelo.necesidad}</p>
                </div>

                {/* BOTÓN APADRINAR (Color corregido: Primary/Rose) */}
                <Button 
                  variant="primary" 
                  className="w-full justify-center text-xs py-2 shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                  onClick={() => onOpenModal(abuelo)}
                >
                  <Heart className="w-3 h-3 mr-1.5 fill-white" /> Apadrinar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;