import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const TeamMember = ({ name, role, desc, image }) => (
  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-rose-200 transition-all duration-300 group text-center">
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-1"></div>
      <img 
        src={image} 
        alt={name} 
        className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md"
        onError={(e) => e.target.src = "https://i.pravatar.cc/300"} // Avatar por defecto si falla
      />
    </div>
    <h3 className="text-xl font-bold text-gray-900">{name}</h3>
    <p className="text-rose-600 font-medium text-sm mb-4 uppercase tracking-wider">{role}</p>
    <p className="text-gray-600 text-sm leading-relaxed mb-6">
      {desc}
    </p>
    
    <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
      <button className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin size={20}/></button>
      <button className="text-gray-400 hover:text-rose-600 transition-colors"><Mail size={20}/></button>
    </div>
  </div>
);

const Team = () => {
  const team = [
    {
      name: "Gustavo Rodriguez Orjuela ",
      role: "Director ",
      desc: "Con 20 años de experiencia en gerontología, Ana es el corazón de la fundación, velando por el bienestar integral de cada abuelo.",
      image: "/equipo/ana.jpg"
    },
    {
      name: "José Martínez",
      role: "Co-Fundador & Logística",
      desc: "Encargado de que nunca falte un plato de comida. José coordina las donaciones y el mantenimiento de la sede.",
      image: "/equipo/jose.jpg"
    },
    {
      name: "Laura Restrepo",
      role: "Psicóloga Social",
      desc: "Lidera los programas de salud mental y acompañamiento emocional, devolviendo la sonrisa a nuestros mayores.",
      image: "/equipo/laura.jpg"
    },
    {
      name: "Carlos Ruiz",
      role: "Coordinador de Voluntarios",
      desc: "El puente entre la comunidad y la fundación. Organiza eventos y gestiona las manos amigas que nos ayudan.",
      image: "/equipo/carlos.jpg"
    }
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quiénes Somos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Detrás de cada plato de comida y cada abrazo, hay un equipo humano comprometido con el amor y la dignidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <TeamMember key={idx} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;