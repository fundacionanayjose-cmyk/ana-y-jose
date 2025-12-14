import React, { useState } from 'react';
import { X, Send, CheckCircle, Briefcase, AlertCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabaseClient'; 

const Modal = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // NUEVO: Estado para el checkbox
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    tipoAyuda: 'Quiero ser Padrino (Mensual)',
    profesion: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // VALIDACIÓN DEL CHECKBOX
    if (!acceptedTerms) {
      setErrorMsg('Debes aceptar la política de privacidad para continuar.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('contactos')
        .insert([
          { 
            nombre: formData.nombre,
            telefono: formData.contacto,
            tipo_ayuda: formData.tipoAyuda,
            profesion: formData.profesion,
            created_at: new Date().toISOString()
          },
        ]);

      if (error) throw error;

      setIsSuccess(true);
      
    } catch (error) {
      console.error('Error enviando datos:', error);
      if (!import.meta.env.VITE_SUPABASE_URL) {
         alert("Nota técnica: Faltan las credenciales en el archivo .env");
      }
      setErrorMsg('Hubo un error de conexión. Por favor intenta contactarnos por WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setAcceptedTerms(false); // Resetear checkbox
    setFormData({
      nombre: '',
      contacto: '',
      tipoAyuda: 'Quiero ser Padrino (Mensual)',
      profesion: ''
    });
    onClose();
  }

  const isVolunteer = formData.tipoAyuda === "Ser Voluntario";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <div className="bg-rose-600 p-6 flex justify-between items-center text-white shrink-0">
          <h3 className="text-2xl font-bold">
            {isSuccess ? '¡Mensaje Recibido!' : (isVolunteer ? 'Únete al Equipo' : 'Únete a la Familia')}
          </h3>
          <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">¡Datos Guardados!</h4>
              <p className="text-gray-600 mb-6">
                Tu información está segura en nuestra base de datos. Te contactaremos pronto.
              </p>
              <Button variant="primary" onClick={handleClose} className="w-full">
                Cerrar
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {isVolunteer 
                  ? "Tu tiempo y talento son el regalo más valioso para nuestros abuelos."
                  : "Déjanos tus datos y te contaremos cómo puedes transformar una vida hoy."}
              </p>
              
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">¿Cómo quieres ayudar?</label>
                  <select 
                    name="tipoAyuda"
                    value={formData.tipoAyuda}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none bg-white font-medium text-gray-700 cursor-pointer"
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
                    type="text" name="nombre" value={formData.nombre} onChange={handleChange} required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
                    placeholder="Ej: Juan Pérez" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" name="contacto" value={formData.contacto} onChange={handleChange} required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all" 
                    placeholder="Ej: 300 123 4567" 
                  />
                </div>

                {isVolunteer && (
                  <div className="animate-fade-in-up bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <label className="block text-sm font-bold text-rose-800 mb-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> ¿Cuál es tu profesión o talento?
                    </label>
                    <input 
                      type="text" name="profesion" value={formData.profesion} onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm" 
                      placeholder="Ej: Soy Odontólogo, Músico, Contador..." 
                    />
                  </div>
                )}

                {/* --- CHECKBOX DE TÉRMINOS --- */}
                <div className="flex items-start gap-3 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer select-none">
                    He leído y acepto la <a href="/politica-privacidad" target="_blank" className="text-rose-600 font-bold hover:underline">Política de Privacidad</a> y autorizo el tratamiento de mis datos personales.
                  </label>
                </div>

                <Button variant="primary" className="w-full mt-2 shadow-xl shadow-rose-200" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : (isVolunteer ? 'Enviar Postulación' : 'Enviar Solicitud')} <Send className="w-4 h-4 ml-2" />
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