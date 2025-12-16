import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { programsData } from '../data/programs'; 
import { User, Phone, MapPin, Activity, Heart, FileText, CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react'; 
import { Link } from 'react-router-dom';

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipo_documento: 'CC',
    numero_documento: '',
    fecha_nacimiento: '',
    direccion: '',
    barrio: '',
    eps: '',
    tipo_sangre: '',
    tiene_discapacidad: false,
    observaciones_medicas: '',
    nombre_acudiente: '',
    telefono_acudiente: '',
    parentesco: '',
    programas_interes: [] 
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProgramToggle = (programId) => {
    setFormData(prev => {
      const exists = prev.programas_interes.includes(programId);
      return {
        ...prev,
        programas_interes: exists
          ? prev.programas_interes.filter(id => id !== programId)
          : [...prev.programas_interes, programId]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Validar que haya programas seleccionados
      if (formData.programas_interes.length === 0) {
        throw new Error("Por favor selecciona al menos un programa de interés.");
      }

      // 2. VERIFICACIÓN PREVIA (Evita el error 409 en consola)
      const { data: existingUser, error: checkError } = await supabase
        .from('inscripciones')
        .select('id')
        .eq('numero_documento', formData.numero_documento)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        throw new Error(`El documento ${formData.numero_documento} ya está registrado en el sistema. Por favor verifique o contacte a soporte.`);
      }

      // 3. Si no existe, procedemos a INSERTAR
      const { error: insertError } = await supabase
        .from('inscripciones')
        .insert([formData]);

      if (insertError) throw insertError;

      // 4. Éxito
      setSubmitted(true);
      window.scrollTo(0, 0);

    } catch (err) {
      console.error("Error en inscripción:", err);
      setError(err.message || "Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-rose-600 font-bold transition-colors">
            <ArrowLeft size={20} /> Volver al Inicio
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Inscripción Recibida!</h2>
          <p className="text-gray-600 mb-8">
            Hemos registrado los datos de <strong>{formData.nombres} {formData.apellidos}</strong> correctamente. 
            Nuestro equipo revisará la solicitud y contactará al número <strong>{formData.telefono_acudiente}</strong>.
          </p>
          <Link 
            to="/"
            className="bg-rose-600 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-700 transition shadow-lg inline-block"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-stone-50 min-h-screen relative">
      
      {/* Botón flotante para regresar */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-gray-600 hover:text-rose-600 hover:shadow-md transition-all font-bold text-sm border border-gray-200"
        >
          <ArrowLeft size={18} /> Regresar
        </Link>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12 pt-8">
          <span className="text-rose-600 font-bold uppercase tracking-widest text-sm">Admisiones</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">Inscripción de Adulto Mayor</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Diligencia este formulario para postular a tu familiar. Toda la información es tratada bajo nuestra política de privacidad.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm flex items-center gap-3 animate-pulse">
            <AlertCircle className="text-red-500 flex-shrink-0" />
            <p className="text-red-700 font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECCIÓN 1: DATOS */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="text-blue-500" /> Datos del Beneficiario
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombres *</label>
                <input required type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition" placeholder="Ej. José Antonio" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Apellidos *</label>
                <input required type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition" placeholder="Ej. Rodríguez" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo *</label>
                  <select name="tipo_documento" value={formData.tipo_documento} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50">
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="PPT">PPT</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Número Documento *</label>
                  <input required type="text" name="numero_documento" value={formData.numero_documento} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="Ej. 12345678" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Nacimiento *</label>
                <input required type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: UBICACIÓN Y SALUD */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="text-rose-500" /> Salud y Ubicación
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Residencia *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input required type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 bg-gray-50" placeholder="Ej. Calle 8 # 73-11" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Barrio *</label>
                <input required type="text" name="barrio" value={formData.barrio} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 bg-gray-50" placeholder="Ej. Castilla" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">EPS *</label>
                  <input required type="text" name="eps" value={formData.eps} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 bg-gray-50" placeholder="Ej. Sanitas" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">RH</label>
                  <input type="text" name="tipo_sangre" value={formData.tipo_sangre} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 bg-gray-50" placeholder="Ej. O+" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                <input 
                  type="checkbox" 
                  name="tiene_discapacidad" 
                  checked={formData.tiene_discapacidad} 
                  onChange={handleInputChange}
                  className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500" 
                />
                <span className="text-gray-700 font-medium">¿Tiene alguna discapacidad diagnosticada?</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Observaciones Médicas / Medicamentos</label>
              <textarea 
                name="observaciones_medicas" 
                value={formData.observaciones_medicas} 
                onChange={handleInputChange} 
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 bg-gray-50 h-24" 
                placeholder="Describa brevemente si toma medicamentos o tiene condiciones especiales..."
              ></textarea>
            </div>
          </div>

          {/* SECCIÓN 3: ACUDIENTE */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Phone className="text-yellow-500" /> Datos del Acudiente
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo *</label>
                <input required type="text" name="nombre_acudiente" value={formData.nombre_acudiente} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de Contacto *</label>
                <input required type="tel" name="telefono_acudiente" value={formData.telefono_acudiente} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 bg-gray-50" placeholder="300..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Parentesco *</label>
                <input required type="text" name="parentesco" value={formData.parentesco} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-400 bg-gray-50" placeholder="Ej. Hijo, Nieto" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: SELECCIÓN DE PROGRAMAS */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Heart className="text-purple-600" /> Intereses y Actividades
            </h3>
            <p className="text-gray-500 mb-6 text-sm">Selecciona las actividades en las que le gustaría participar:</p>

            <div className="grid md:grid-cols-2 gap-4">
              {programsData.map((program) => (
                <label 
                  key={program.id} 
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.programas_interes.includes(program.id) 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="mt-1">
                    <input 
                      type="checkbox" 
                      checked={formData.programas_interes.includes(program.id)}
                      onChange={() => handleProgramToggle(program.id)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{program.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{program.shortDesc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-gray-900 text-white text-lg font-bold py-4 px-12 rounded-full shadow-xl hover:bg-rose-600 transition-all transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader className="animate-spin" /> : <FileText />}
              {loading ? 'Procesando...' : 'Enviar Inscripción'}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default Registration;