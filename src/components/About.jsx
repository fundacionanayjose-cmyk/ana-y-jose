import React, { useState, useEffect, useRef } from 'react';
import { Target, Lightbulb, Users, Utensils, Calendar } from 'lucide-react';

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
        
        <div className="relative group md:sticky md:top-24">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-all duration-700"></div>
          
          <img 
            src="/galeria/20210527_091046.jpg" 
            alt="Administración Fundación Ana y José" 
            className="rounded-3xl shadow-2xl relative z-10 w-full transform rotate-2 group-hover:rotate-0 transition-all duration-500 object-cover min-h-[400px]"
          />
          
          <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border-l-4 border-rose-600 hidden md:block animate-fade-in-up">
            <p className="text-gray-600 italic font-medium text-lg">"El amor no envejece, solo madura."</p>
          </div>
        </div>
        
        <div>
          <span className="text-rose-600 font-bold uppercase tracking-wider text-sm mb-2 block">Nuestra esencia</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">El legado de la <br/> Fundación Ana y José</h2>
          
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed text-justify mb-8">
            <p>
              La Fundación Ana y José nació el 2 de marzo de 2020, marcada por el dolor, la pérdida y la resistencia.
            </p>
            <p>
              Tras el fallecimiento de Ana Sobeida Orjuela, quien durante ocho años enfrentó el Alzheimer y el Parkinson, su hijo Gustavo Rodríguez quedó frente a un vacío profundo. Un dolor que se sumaba a heridas antiguas: en 2001, José Antonio Rodríguez había fallecido por un cáncer de garganta, después de una vida golpeada por la pobreza, el abandono del Estado y la violencia que obligó a muchas familias campesinas, como la suya, a desplazarse y empezar de nuevo.
            </p>
            <p>
              Ana y José fueron dos adultos mayores campesinos que, pese a la violencia, el desarraigo y las carencias, nunca se separaron. Resistieron juntos, defendiendo su hogar y luchando por sacar adelante a sus hijos cuando todo parecía estar en contra.
            </p>
            <p>
              De ese dolor nació la Fundación Ana y José: para transformar la pérdida en esperanza, para cuidar a los adultos mayores con dignidad y para que en Colombia ninguna familia vuelva a romperse por la violencia, el abandono o la soledad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
               <div className="flex items-center gap-2 mb-3">
                 <Target className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                 <h3 className="font-bold text-gray-800 text-lg">Misión</h3>
               </div>
               <p className="text-sm text-gray-600 leading-relaxed text-justify">
                 Promover un envejecimiento activo, digno y feliz, desde el acompañamiento y la corresponsabilidad familiar, fomentando la inclusión, la participación, el fortalecimiento de redes de apoyo social, el bienestar psicológico y emocional.
               </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
               <div className="flex items-center gap-2 mb-3">
                 <Lightbulb className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                 <h3 className="font-bold text-gray-800 text-lg">Visión 2030</h3>
               </div>
               <p className="text-sm text-gray-600 leading-relaxed text-justify">
                 La Fundación Ana y José para el 2030 se consolidará como un referente en Colombia, para la promoción del cuidado de personas mayores, fortaleciendo el núcleo familiar mediante acciones de apoyo al cuidador, previniendo el abandono y el maltrato.
               </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-8">
            <SmartCounter end={6} label="Años sirviendo" icon={Calendar} />
            <SmartCounter end={7500} label="Personas impactadas" icon={Users} />
            <SmartCounter end={3000} label="Raciones entregadas" icon={Utensils} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;