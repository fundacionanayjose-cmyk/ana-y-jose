import React, { useState } from 'react';
import { X, Linkedin, Twitter } from 'lucide-react';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // DATA DE EJEMPLO (Puedes editarla)
  const teamMembers = [
    {
      id: 1,
      name: "Ana García",
      role: "Fundadora & Directora",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      bio: "Con más de 30 años de servicio social, Ana fundó esta obra inspirada en el amor a sus padres. Su liderazgo ha transformado un pequeño comedor en un centro integral."
    },
    {
      id: 2,
      name: "José Martínez",
      role: "Cofundador & Logística",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      bio: "El motor operativo de la fundación. José se encarga de que cada donación llegue a su destino y que nunca falte un plato de comida en la mesa."
    },
    {
      id: 3,
      name: "Dra. Elena Rojas",
      role: "Psicóloga Gerontóloga",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      bio: "Especialista en salud mental para la tercera edad. Lidera nuestros talleres de memoria y terapia ocupacional."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Manos que trabajan, corazones que sirven.</p>
        </div>

        {/* GRID DE TARJETAS */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer text-center"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg aspect-[4/5]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Ver Perfil Completo</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-rose-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>

        {/* MODAL DETALLE */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedMember(null)}>
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
              
              {/* Imagen en Modal */}
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>

              {/* Info en Modal */}
              <div className="md:w-3/5 p-8 relative flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors"
                >
                  <X size={20} />
                </button>

                <h3 className="text-3xl font-bold text-gray-900 mb-1">{selectedMember.name}</h3>
                <p className="text-rose-600 font-bold text-lg mb-6">{selectedMember.role}</p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedMember.bio}
                </p>

                <div className="flex gap-4">
                   {/* Iconos sociales falsos para demo */}
                   <Linkedin className="text-gray-400 hover:text-blue-700 cursor-pointer" />
                   <Twitter className="text-gray-400 hover:text-blue-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Team;