import React, { useState } from 'react';
import { X, Send, CheckCircle, Briefcase, AlertCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabaseClient'; 

const Modal = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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

    // Validaciones
    if (!formData.nombre.trim() || !formData.contacto.trim()) {
        setErrorMsg('Por favor completa el nombre y contacto.');
        setIsLoading(false);
        return;
    }

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
            nombre: formData.nombre.trim(),
            telefono: formData.contacto.trim(),
            tipo_ayuda: formData.tipoAyuda,
            profesion: formData.profesion.trim(),
            created_at: new Date().toISOString()
          },
        ]);

      if (error) throw error;
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Error enviando datos:', error);
      setErrorMsg('Error de conexión. Intenta contactarnos por WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    setAcceptedTerms(false);
    setFormData({ nombre: '', contacto: '', tipoAyuda: 'Quiero ser Padrino (Mensual)', profesion: '' });
    onClose();
  }

  const isVolunteer = formData.tipoAyuda === "Ser Voluntario";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up" onClick={e => e.stopPropagation()}>
        
        <div className="bg-rose-600 p-6 flex justify-between items-center text-white shrink-0 rounded-t-3xl">
          <h3 className="text-2xl font-bold">
            {isSuccess ? '¡Mensaje Recibido!' : (isVolunteer ? 'Únete al Equipo' : 'Únete a la Familia')}
          </h3>
          <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Cerrar modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">¡Datos Guardados!</h4>
              <p className="text-gray-600 mb-6">Tu información está segura. Te contactaremos pronto.</p>
              <Button variant="primary" onClick={handleClose} className="w-full">Cerrar</Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                {isVolunteer 
                  ? "Tu tiempo y talento son el regalo más valioso para nuestros abuelos."
                  : "Déjanos tus datos y te contaremos cómo puedes transformar una vida hoy."}
              </p>
              
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2" role="alert">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">¿Cómo quieres ayudar?</label>
                  <select name="tipoAyuda" value={formData.tipoAyuda} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none bg-white font-medium text-gray-700">
                    <option value="Quiero ser Padrino (Mensual)">Quiero ser Padrino (Mensual)</option>
                    <option value="Donación Única">Donación Única</option>
                    <option value="Ser Voluntario">Ser Voluntario (Tiempo/Talento)</option>
                    <option value="Donar Especie">Donar Especie (Ropa/Comida)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Ej: Juan Pérez" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
                  <input type="tel" name="contacto" value={formData.contacto} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Ej: 300 123 4567" />
                </div>

                {isVolunteer && (
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <label className="block text-sm font-bold text-rose-800 mb-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> ¿Cuál es tu profesión o talento?
                    </label>
                    <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm" placeholder="Ej: Soy Odontólogo, Músico, Contador..." />
                  </div>
                )}

                <div className="flex items-start gap-3 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <input id="terms-modal" type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="w-5 h-5 mt-0.5 text-rose-600 rounded cursor-pointer" />
                  <label htmlFor="terms-modal" className="text-xs text-gray-600 cursor-pointer">
                    He leído y acepto la <a href="/politica-privacidad" target="_blank" className="text-rose-600 font-bold hover:underline">Política de Privacidad</a> y autorizo el tratamiento de mis datos.
                  </label>
                </div>

                <Button variant="primary" className="w-full mt-2 shadow-xl shadow-rose-200" disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Solicitud'} <Send className="w-4 h-4 ml-2" />
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