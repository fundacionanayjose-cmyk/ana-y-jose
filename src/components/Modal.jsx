import React, { useState } from 'react';
import { X, Send, CheckCircle, Briefcase, Calendar } from 'lucide-react'; // Iconos nuevos
import Button from './Button';

const Modal = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Estado para controlar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    tipoAyuda: 'Quiero ser Padrino (Mensual)', // Valor por defecto
    profesion: '' // Campo extra para voluntarios
  });

  if (!isOpen) return null;

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Para debugging
    
    // Simulación de envío
    setTimeout(() => {
      setIsSuccess(true);
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    // Resetear formulario al cerrar
    setFormData({
      nombre: '',
      contacto: '',
      tipoAyuda: 'Quiero ser Padrino (Mensual)',
      profesion: ''
    });
    onClose();
  }

  // Detectamos si el usuario seleccionó "Ser Voluntario" para mostrar campos extra
  const isVolunteer = formData.tipoAyuda === "Ser Voluntario";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      ></div>

      {/* Contenido del Modal - Agregamos max-h y overflow para evitar que se corte en móviles */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Cabecera Estática */}
        <div className="bg-rose-600 p-6 flex justify-between items-center text-white shrink-0">
          <h3 className="text-2xl font-bold">
            {isSuccess ? '¡Mensaje Recibido!' : (isVolunteer ? 'Únete al Equipo' : 'Únete a la Familia')}
          </h3>
          <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cuerpo con Scroll si es necesario */}
        <div className="p-8 overflow-y-auto">
          {isSuccess ? (
            // VISTA DE ÉXITO
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu corazón!</h4>
              <p className="text-gray-600 mb-6">
                {isVolunteer 
                  ? "Nos emociona saber que quieres donar tu tiempo. Te contactaremos para coordinar una visita." 
                  : "Hemos recibido tus datos correctamente. Nuestro equipo te contactará muy pronto."}
              </p>
              <Button variant="primary" onClick={handleClose} className="w-full">
                Entendido, cerrar
              </Button>
            </div>
          ) : (
            // VISTA DE FORMULARIO
            <>
              <p className="text-gray-600 mb-6">
                {isVolunteer 
                  ? "Tu tiempo y talento son el regalo más valioso para nuestros abuelos."
                  : "Déjanos tus datos y te contaremos cómo puedes transformar una vida hoy."}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Selección del Tipo de Ayuda (Lo ponemos primero para definir el contexto) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">¿Cómo quieres ayudar?</label>
                  <select 
                    name="tipoAyuda"
                    value={formData.tipoAyuda}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none bg-white font-medium text-gray-700 cursor-pointer hover:border-rose-400 transition-colors"
                  >
                    <option value="Quiero ser Padrino (Mensual)">Quiero ser Padrino (Mensual)</option>
                    <option value="Donación Única">Donación Única</option>
                    <option value="Ser Voluntario">Ser Voluntario (Tiempo/Talento)</option>
                    <option value="Donar Especie">Donar Especie (Ropa/Comida)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
                    placeholder="Ej: Juan Pérez" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
                    placeholder="Ej: 300 123 4567" 
                  />
                </div>

                {/* CAMPO DINÁMICO: Solo aparece si selecciona "Ser Voluntario" */}
                {isVolunteer && (
                  <div className="animate-fade-in-up bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <label className="block text-sm font-bold text-rose-800 mb-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> ¿Cuál es tu profesión o talento?
                    </label>
                    <input 
                      type="text" 
                      name="profesion"
                      value={formData.profesion}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm" 
                      placeholder="Ej: Soy Odontólogo, Músico, Contador..." 
                    />
                    <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Coordinaremos horarios contigo luego.
                    </p>
                  </div>
                )}

                <Button variant="primary" className="w-full mt-6 shadow-xl shadow-rose-200">
                  {isVolunteer ? 'Enviar Postulación' : 'Enviar Solicitud'} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;