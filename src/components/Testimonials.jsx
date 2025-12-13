import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Doña Teresa",
      age: "78 años",
      text: "Antes pasaba días enteros sin hablar con nadie. Aquí encontré amigas, risas y una sopa caliente que me sabe a gloria. Dios bendiga esta casa.",
      image: "https://images.unsplash.com/photo-1574167389146-24e53e419b48?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Don Pedro",
      age: "82 años",
      text: "Pensé que a mi edad ya no servía para nada. En los talleres de la fundación aprendí a pintar y ahora me siento útil de nuevo.",
      image: "https://images.unsplash.com/photo-1547841381-8fb544eb4d0a?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      name: "María Fernanda",
      age: "Voluntaria",
      text: "Llegué para ayudar por unas horas y me quedé para siempre. El amor que se respira en Ana y José te cambia la vida.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
  ];

  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 right-10 w-64 h-64 bg-rose-600 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Voces de Esperanza</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Historias reales de quienes construyen esta familia día a día.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all hover:-translate-y-2">
              <Quote className="w-10 h-10 text-rose-500 mb-6 opacity-80" />
              
              <p className="text-lg text-gray-200 leading-relaxed mb-8 italic">
                "{item.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/30" />
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <span className="text-sm text-gray-400">{item.age}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;