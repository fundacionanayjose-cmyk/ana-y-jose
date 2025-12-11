import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Desde que llegué a la fundación, mis días volvieron a tener color. La comida es deliciosa, pero el cariño con el que nos tratan alimenta mucho más.",
    author: "Doña Teresa",
    role: "Beneficiaria (78 años)"
  },
  {
    id: 2,
    text: "Apadrinar a Don Roberto ha sido la experiencia más gratificante de mi vida. Saber que mi aporte le da dignidad a su vejez no tiene precio.",
    author: "Camilo Torres",
    role: "Padrino Donante"
  },
  {
    id: 3,
    text: "Aquí encontré amigos con los que puedo jugar parqués y recordar viejos tiempos. Gracias a Ana y José por darnos un segundo hogar.",
    author: "Don Carlos",
    role: "Beneficiario (82 años)"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play del carrusel cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-stone-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Voces de Esperanza</h2>
        
        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <Quote className="w-12 h-12 text-rose-200 absolute top-8 left-8" />
          
          <div className="relative z-10 min-h-[200px] flex flex-col justify-center items-center transition-opacity duration-500">
             <p className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed">
               "{testimonials[currentIndex].text}"
             </p>
             <div className="mt-4">
               <h4 className="font-bold text-rose-600 text-lg">{testimonials[currentIndex].author}</h4>
               <span className="text-gray-500 text-sm uppercase tracking-wider">{testimonials[currentIndex].role}</span>
             </div>
          </div>

          {/* Controles */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:text-rose-600 hover:scale-110 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:text-rose-600 hover:scale-110 transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Puntos indicadores */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-rose-600 w-8' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;