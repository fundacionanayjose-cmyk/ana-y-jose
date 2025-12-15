import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

const Testimonials = () => {
  // Duplicamos la lista para crear el efecto de "cinta infinita" sin cortes
  const infiniteList = [...testimonialsData, ...testimonialsData];

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      
      {/* --- FONDO ANIMADO (Blobs de color) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-12 text-center">
        <span className="flex items-center justify-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-sm mb-3 animate-fade-in-up">
          <Sparkles size={18} /> Impacto Real
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 animate-fade-in-up">
          Voces de <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-500">Esperanza</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
          Historias que laten. Desliza para conocer a quienes transforman su vida gracias a tu apoyo.
        </p>
      </div>

      {/* --- CARRUSEL INFINITO --- */}
      <div className="relative w-full overflow-hidden">
        
        {/* Degradados laterales para suavizar la entrada y salida */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-20 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none"></div>

        {/* CINTA EN MOVIMIENTO */}
        {/* 'hover:[animation-play-state:paused]' detiene la cinta al poner el mouse */}
        <div className="flex w-max animate-scroll gap-8 px-4 py-4 hover:[animation-play-state:paused]">
          
          {infiniteList.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-[350px] md:w-[400px] shrink-0 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative group transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              {/* Comillas Decorativas */}
              <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br ${item.colorAccent} opacity-10 flex items-center justify-center`}>
                <Quote className={`w-6 h-6 text-gray-900`} />
              </div>

              {/* Contenido */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={item.foto} 
                    alt={item.nombre} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-br ${item.colorAccent} opacity-50 -z-10 blur-sm`}></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{item.nombre}</h4>
                  <p className={`text-xs font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${item.colorAccent}`}>
                    {item.rol}
                  </p>
                  <p className="text-xs text-gray-400">{item.edad} años</p>
                </div>
              </div>

              <blockquote className="text-gray-600 text-lg leading-relaxed italic mb-4">
                "{item.cita}"
              </blockquote>

              {/* Estrellas decorativas */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Borde inferior de color */}
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.colorAccent} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Testimonials;