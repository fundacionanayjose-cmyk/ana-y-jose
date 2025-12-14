import React from 'react';

const EmergencyCard = () => {
  return (
    <section className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 font-sans my-6">
      
      {/* ENCABEZADO DE ALERTA */}
      <div className="bg-red-600 p-4 text-center">
        <h2 className="text-white text-xl font-bold uppercase tracking-wide">
          ⚠️ ¿Necesitas Ayuda Urgente?
        </h2>
        <p className="text-red-100 text-sm mt-1">
          No estás solo. El maltrato y abandono son delitos.
        </p>
      </div>

      {/* CUERPO DEL CONTENIDO */}
      <div className="p-5 space-y-6">

        {/* MENSAJE CLAVE (Ley 1850) */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
          <p className="text-sm text-gray-800 font-medium">
            "Abandonar a personas mayores es un delito, de acuerdo con la Ley 1850 de 2017".
          </p>
        </div>

        {/* BOTÓN PRINCIPAL: LÍNEA DE VIDA */}
        <div>
          <p className="text-gray-600 text-sm mb-2 font-semibold text-center">Llámanos a nuestra Línea de Vida:</p>
          <a href="tel:+576016808400" className="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center font-bold py-4 rounded-lg shadow-md transition transform active:scale-95 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (601) 680-8400
          </a>
          <p className="text-xs text-gray-500 text-center mt-1">Fundación Ana y José</p>
        </div>

        <hr className="border-gray-200" />

        {/* LISTA DE ENTIDADES (Botones secundarios) */}
        <div className="space-y-3">
          <h3 className="text-gray-800 font-bold text-lg text-center">Otras Entidades de Apoyo</h3>

          {/* Emergencias Generales */}
          <a href="tel:123" className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group">
            <div>
              <span className="block text-gray-900 font-bold">Emergencias Generales</span>
              <span className="text-xs text-gray-500">Policía y Ambulancias</span>
            </div>
            <span className="text-red-600 font-bold text-xl group-hover:underline">123</span>
          </a>

          {/* Comisarías */}
          <a href="tel:+576013808330" className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group">
            <div>
              <span className="block text-gray-900 font-bold">Comisarías de Familia</span>
              <span className="text-xs text-gray-500">Medidas de protección</span>
            </div>
            <span className="text-blue-600 font-bold group-hover:underline">Llamar</span>
          </a>

           {/* Línea Púrpura */}
           <a href="tel:018000112137" className="flex justify-between items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 group">
            <div>
              <span className="block text-purple-900 font-bold">Línea Púrpura</span>
              <span className="text-xs text-purple-600">Mujeres (24 horas)</span>
            </div>
            <span className="text-purple-700 font-bold group-hover:underline">Llamar</span>
          </a>

          {/* Salud Mental */}
          <a href="tel:106" className="flex justify-between items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 group">
            <div>
              <span className="block text-green-900 font-bold">Salud Mental</span>
              <span className="text-xs text-green-600">Apoyo psicológico (Línea 106)</span>
            </div>
            <span className="text-green-700 font-bold group-hover:underline">106</span>
          </a>
        </div>

        {/* DIRECCIÓN FÍSICA */}
        <div className="mt-4 text-center">
           <p className="text-sm text-gray-600">
             <strong>Atención presencial Fiscalía (CAPIV):</strong><br />
             Av. 19 # 27-09, Bogotá
           </p>
        </div>

      </div>
    </section>
  );
};

export default EmergencyCard;