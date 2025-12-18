import React from 'react';
import { Heart, Gift } from 'lucide-react';
import { beneficiaries } from '../data/beneficiaries';
import Button from './Button';

const SponsorSection = ({ onOpenModal }) => {
  const infiniteList = [...beneficiaries, ...beneficiaries];

  return (
    <section id="apadrinar" className="py-16 bg-stone-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <span className="text-rose-600 font-bold uppercase tracking-wider text-xs md:text-sm mb-2 block animate-fade-in-up">
          Plan Padrino
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
          Abriga un Corazón
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
          Desliza para conocer a nuestros adultos mayores. Tu ayuda mensual transforma su realidad.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-stone-100 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-stone-100 to-transparent"></div>

        <div className="flex gap-6 animate-scroll hover:pause">
          {infiniteList.map((beneficiary, index) => (
            <div 
              key={`${beneficiary.id}-${index}`} 
              className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={beneficiary.foto} 
                  alt={beneficiary.nombre} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-lg font-bold leading-tight">{beneficiary.nombre}</h3>
                  <p className="text-white/90 text-xs font-medium flex items-center gap-1 opacity-80">
                    <Gift size={12} /> {beneficiary.edad} años
                  </p>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-500 text-xs mb-3 line-clamp-3 leading-relaxed italic">
                  "{beneficiary.resumen}"
                </p>
                
                <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-100 mb-4 mt-auto">
                  <p className="text-[10px] text-yellow-800 font-bold uppercase tracking-wide mb-0.5">Necesidad:</p>
                  <p className="text-yellow-900 font-bold text-xs">{beneficiary.necesidad}</p>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full justify-center text-xs py-2 shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                  onClick={() => onOpenModal(beneficiary)}
                >
                  <Heart className="w-3 h-3 mr-1.5 fill-white" /> Apadrinar ahora
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