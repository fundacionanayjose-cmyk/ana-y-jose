import React, { useState, useEffect } from 'react';

// Sub-componente para animar los números
const AnimatedCounter = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Duración de la animación: 2 segundos (2000ms)
    const duration = 2000; 
    const increment = end / (duration / 20); // Calcula cuánto sumar cada 20ms

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center p-4 transform hover:scale-110 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2 font-mono flex justify-center items-center">
        {count}<span className="text-2xl text-rose-400 ml-1">+</span>
      </div>
      <div className="text-gray-600 font-bold uppercase tracking-wide text-xs md:text-sm">{label}</div>
    </div>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-20 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          {/* Decoración de fondo animada */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1534349762943-d306ca27d78e?auto=format&fit=crop&q=80&w=1000" 
            alt="Pareja fundadores simbólica" 
            className="rounded-3xl shadow-2xl relative z-10 w-full transform rotate-2 group-hover:rotate-0 transition-all duration-500 object-cover h-[500px]"
          />
          <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border-l-4 border-rose-600 hidden md:block animate-fade-in-up">
            <p className="text-gray-600 italic font-medium text-lg">"El amor no envejece, solo madura."</p>
          </div>
        </div>
        
        <div>
          <span className="text-rose-600 font-bold uppercase tracking-wider text-sm mb-2 block">Nuestra Esencia</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">El Legado de <br/> Ana y José</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed text-justify">
            <p>
              Todo comenzó en el corazón de Bogotá, cuando Ana y José, una pareja que dedicó su vida al servicio, notaron cuántos de sus contemporáneos enfrentaban el atardecer de sus vidas en soledad.
            </p>
            <p>
              Lo que inició como almuerzos compartidos en su propio comedor, hoy es una fundación sólida que abraza a cientos de abuelos. 
              <strong> No somos un asilo, somos una familia extendida.</strong>
            </p>
          </div>
          
          {/* Rejilla de Contadores Animados */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-gray-200 pt-8">
            <AnimatedCounter end={15} label="Años sirviendo" />
            <AnimatedCounter end={120} label="Abuelos felices" />
            <AnimatedCounter end={8000} label="Comidas/mes" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;