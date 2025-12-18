import React, { useState } from 'react';
import { AlertTriangle, Phone, Home, MapPin, Heart, UserPlus, X, Send } from 'lucide-react';

const OfficialServices = () => {
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    profesion: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚠️ URL DE GOOGLE APPS SCRIPT (LA MISMA QUE FUNCIONA EN DONACIONES)
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGfdW5Zw7Qx2aLfji0t5HihPg2RSTNt2X1-vc7HjZw-BGmUlthgCQbx76L2u-by1Ltkw/exec";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Preparamos los datos
    // Agregamos 'formType: voluntario' para ser explícitos, aunque el script lo asume por defecto
    const dataToSend = {
      ...formData,
      formType: 'voluntario' 
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Necesario para enviar a Google sin errores de seguridad
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(dataToSend)
      });

      // Éxito
      alert(`¡Bienvenido al equipo, ${formData.nombre}! Tus datos han sido registrados correctamente.`);
      setFormData({ nombre: '', cedula: '', telefono: '', profesion: '' }); // Limpiar formulario
      setShowVolunteerForm(false); // Cerrar modal

    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Hubo un error de conexión. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-stone-100">
      <div className="container mx-auto px-4">
        
        {/* TÍTULO DE SECCIÓN */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Información Oficial y Rutas de Atención</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Recursos verificados, canales de denuncia y postulaciones a nuestros programas sociales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* COLUMNA 1: RUTA DE EMERGENCIA + VOLUNTARIADO */}
          <div className="space-y-6">
            
            {/* RUTA DE EMERGENCIA */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="text-red-600 w-6 h-6" />
                <h3 className="text-xl font-bold text-red-700">Ruta de Atención Inmediata</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4 font-medium">
                "Abandonar a personas mayores es un delito, de acuerdo con la Ley 1850 de 2017".
              </p>
              
              <div className="space-y-3">
                <a href="tel:123" className="flex items-center justify-between bg-white p-3 rounded border border-red-100 hover:shadow-md transition group">
                  <span className="text-gray-700 font-semibold flex items-center gap-2 group-hover:text-blue-900 transition-colors">
                    <Phone size={16}/> Emergencias Generales
                  </span>
                  <span className="text-red-600 font-bold group-hover:scale-110 transition-transform">123</span>
                </a>
                <a href="tel:018000112137" className="flex items-center justify-between bg-white p-3 rounded border border-purple-100 hover:shadow-md transition group">
                  <span className="text-gray-700 font-semibold flex items-center gap-2 group-hover:text-purple-700 transition-colors">
                    <Heart size={16} className="text-purple-500"/> Línea Púrpura (Mujeres)
                  </span>
                  <span className="text-purple-600 font-bold group-hover:scale-110 transition-transform">018000112137</span>
                </a>
                <a href="tel:+576013808330" className="flex items-center justify-between bg-white p-3 rounded border border-blue-100 hover:shadow-md transition group">
                  <span className="text-gray-700 font-semibold flex items-center gap-2 group-hover:text-blue-900 transition-colors">
                    <MapPin size={16} className="text-blue-500"/> Comisarías de Familia
                  </span>
                  <span className="text-blue-900 font-bold group-hover:scale-110 transition-transform">(601) 3808330</span>
                </a>
              </div>
            </div>

            {/* SECCIÓN DE VOLUNTARIADO */}
            <div className="bg-stone-50 p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    <UserPlus size={20} className="text-yellow-500" /> Únete al Voluntariado
                  </h3>
                  {!showVolunteerForm && (
                    <p className="text-sm text-gray-600 mt-1">
                      Buscamos perfiles como Trabajo Social, Psicología y Salud.
                    </p>
                  )}
                </div>
                {showVolunteerForm && (
                  <button onClick={() => setShowVolunteerForm(false)} className="text-gray-400 hover:text-red-500 transition">
                    <X size={20} />
                  </button>
                )}
              </div>

              {!showVolunteerForm ? (
                <button 
                  onClick={() => setShowVolunteerForm(true)}
                  className="w-full bg-yellow-500 text-blue-900 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-md transform hover:-translate-y-1"
                >
                  Postularme como Voluntario
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-blue-900 mb-1">Nombre y Apellido *</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      required 
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                      placeholder="Ej. Laura Viviana Poveda"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-blue-900 mb-1">Cédula *</label>
                      <input 
                        type="text" 
                        name="cedula" 
                        required 
                        value={formData.cedula}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                        placeholder="Ej. 1.030..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-900 mb-1">Teléfono *</label>
                      <input 
                        type="tel" 
                        name="telefono" 
                        required 
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                        placeholder="Ej. 320..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-900 mb-1">Profesión / Habilidad *</label>
                    <input 
                      type="text" 
                      name="profesion" 
                      required 
                      value={formData.profesion}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 bg-white"
                      placeholder="Ej. Trabajadora Social"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-900 text-white py-2 rounded-full font-bold hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-2 mt-2 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Enviando...' : <><Send size={16} /> Enviar Datos</>}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Tus datos serán tratados según nuestra política de privacidad.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* COLUMNA 2: DETALLE DE SERVICIOS (Info estática de los PDFs) */}
          <div className="space-y-6">
            
            {/* HOGAR DE PASO */}
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                  <Home className="text-blue-900 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Centro Integral (Hogar de Paso)</h3>
              </div>
             
              <div className="mb-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">Criterios de Ingreso:</h4>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>Adultos mayores rescatados de calle.</li>
                  <li>Casos de desplazamiento forzado.</li>
                  <li>Apoyo a adultos mayores campesinos .</li>
                  <li>Hospitalización de un familiar cuidador.</li>
                </ul>
              </div>
            </div>

            {/* TURISMO SOCIAL */}
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                  <MapPin className="text-yellow-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Turismo Social y Recreación</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
               Realizamos salidas de integración para fortalecer el tejido social,<strong> visitas a museos, zoológicos, espacios culturales y plazas. También llevamos a cabo salidas pedagógicas a diferentes lugares turísticos del país, como Melgar, Girardot, Villeta, Choachí, la Costa Atlántica y la Costa Pacífica.  </strong>
               </p>
              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficialServices;