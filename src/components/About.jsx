import React, { useState, useEffect, useRef } from 'react';
import { Target, Lightbulb, Users, Utensils, Calendar } from 'lucide-react';

// Sub-componente Contador Inteligente (Sin cambios en lógica)
const SmartCounter = ({ end, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2500; 
          const increment = end / (duration / 30); 

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={elementRef} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all transform hover:-translate-y-1">
      <div className="p-3 bg-rose-50 text-rose-600 rounded-full mb-3">
        <Icon size={24} />
      </div>
      <div className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-1 font-mono">
        {count}+
      </div>
      <div className="text-gray-500 font-bold uppercase text-xs tracking-wider">{label}</div>
    </div>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-20 container mx-auto px-6 bg-stone-50">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* IMAGEN DE FUNDADORES / ADMINISTRACIÓN */}
        <div className="relative group sticky top-24">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          
          {/* CAMBIO: Ruta a imagen real en public/galeria */}
          <img 
            src="/galeria/20210527_091046.jpg" 
            alt="Administración Fundación Ana y José" 
            className="rounded-3xl shadow-2xl relative z-10 w-full transform rotate-2 group-hover:rotate-0 transition-all duration-500 object-cover min-h-[400px]"
          />
          
          <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border-l-4 border-rose-600 hidden md:block animate-fade-in-up">
            <p className="text-gray-600 italic font-medium text-lg">"El amor no envejece, solo madura."</p>
          </div>
        </div>
        
        {/* TEXTO + MISIÓN/VISIÓN + CONTADORES */}
        <div>
          <span className="text-rose-600 font-bold uppercase tracking-wider text-sm mb-2 block">Nuestra Esencia</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">El Legado de <br/> La Fundacion Ana y José</h2>
          
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed text-justify mb-8">
            <p>
              Todo comenzó en el corazón de Bogotá, cuando Ana y José notaron cuántos de sus contemporáneos enfrentaban el atardecer de sus vidas en soledad. Lo que inició como almuerzos compartidos, hoy es una familia extendida.
            </p>
          </div>

          {/* TARJETAS MISIÓN Y VISIÓN */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
               <div className="flex items-center gap-2 mb-2">
                 <Target className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                 <h3 className="font-bold text-gray-800">Misión</h3>
               </div>
               <p className="text-sm text-gray-600 leading-snug">
                 Mejorar la calidad de vida de los adultos mayores vulnerables mediante alimentación digna, atención básica y compañía afectiva.
               </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
               <div className="flex items-center gap-2 mb-2">
                 <Lightbulb className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                 <h3 className="font-bold text-gray-800">Visión</h3>
               </div>
               <p className="text-sm text-gray-600 leading-snug">
                 Ser una institución líder y autosostenible en Bogotá, fomentando una cultura de respeto y gratitud hacia nuestros abuelos.
               </p>
            </div>
          </div>
          
          {/* CONTADORES */}
          <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-8">
            <SmartCounter end={15} label="Años sirviendo" icon={Calendar} />
            <SmartCounter end={120} label="Abuelos felices" icon={Users} />
            <SmartCounter end={8500} label="Comidas/mes" icon={Utensils} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;