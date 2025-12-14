import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Briefcase, AlertCircle, User, Phone, Mail, MessageSquare } from 'lucide-react';
import Button from './Button';

// Eliminamos la importación de Supabase que rompía la página
// import { supabase } from '../supabaseClient'; 

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ⚠️ TU URL DE GOOGLE APPS SCRIPT
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGfdW5Zw7Qx2aLfji0t5HihPg2RSTNt2X1-vc7HjZw-BGmUlthgCQbx76L2u-by1Ltkw/exec";

  // Efecto para bloquear el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparamos los datos para Google Sheets
    // Usamos 'formType: contacto' para que puedas filtrarlo si quieres en el futuro
    // (Por ahora irá a la pestaña "Voluntarios" por defecto en tu script, lo cual está bien)
    const dataToSend = {
      ...formData,
      formType: 'voluntario' // O 'contacto_general' si prefieres
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      // Éxito
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un problema de conexión. Por favor escríbenos al WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay Oscuro */}
      <div 
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Contenido del Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Encabezado */}
        <div className="bg-blue-900 p-8 text-center text-white">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
          <h3 className="text-2xl font-bold">Contáctanos / Voluntariado</h3>
          <p className="text-blue-200 text-sm mt-1">
            Déjanos tus datos y nos pondremos en contacto contigo pronto.
          </p>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-8">
          {showSuccess ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">¡Mensaje Enviado!</h4>
              <p className="text-gray-500">Gracias por querer ser parte del cambio.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full pl-9 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input 
                      type="tel" 
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full pl-9 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      placeholder="300 123..."
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-9 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      placeholder="correo@..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase">Mensaje</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea 
                    name="mensaje"
                    rows="3"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full pl-9 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                    placeholder="¿En qué te gustaría colaborar?"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  variant="primary" 
                  className="w-full py-3 shadow-lg flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : <><Send size={18} /> Enviar Mensaje</>}
                </Button>
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                Tus datos están seguros con la Fundación Ana y José.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;