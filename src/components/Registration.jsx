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
    estrato: '',
    eps: '',
    tipo_sangre: '',
    tiene_discapacidad: false,
    es_pensionado: false, // NUEVO CAMPO
    observaciones_medicas: '',
    nombre_acudiente: '',
    telefono_acudiente: '',
    parentesco: '',
    programas_interes: [] 
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validación de números
    if ((name === 'numero_documento' || name === 'telefono_acudiente') && value !== '' && !/^\d+$/.test(value)) {
      return; 
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProgramToggle = (programId) => {
    setFormData(prev => {
      const current = prev.programas_interes;
      const updated = current.includes(programId)
        ? current.filter(id => id !== programId)
        : [...current, programId];
      return { ...prev, programas_interes: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones
    if (formData.numero_documento.length < 5) {
      setError("Por favor verifique el número de documento.");
      setLoading(false);
      return;
    }

    if (formData.programas_interes.length === 0) {
      setError("Por favor selecciona al menos un programa de interés.");
      setLoading(false);
      return;
    }

    try {
      // 1. Verificar duplicados para evitar error 500/409 feo
      const { data: existingUser, error: checkError } = await supabase
        .from('inscripciones')
        .select('id')
        .eq('numero_documento', formData.numero_documento)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        throw new Error(`El documento ${formData.numero_documento} ya está registrado.`);
      }

      // 2. Insertar
      const { error: supabaseError } = await supabase
        .from('inscripciones')
        .insert([{
          ...formData,
          nombres: formData.nombres.trim(),
          apellidos: formData.apellidos.trim(),
          estrato: formData.estrato,
          es_pensionado: formData.es_pensionado, // Enviamos el nuevo dato
          programas_interes: formData.programas_interes 
        }]);

      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error al enviar:', err);
      setError(err.message || 'Hubo un error al guardar la inscripción.');
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
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Inscripción Recibida!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Gracias por registrarte. Nuestro equipo de trabajo social revisará tus datos y te contactará al número <strong>{formData.telefono_acudiente}</strong>.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-rose-600 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" /> Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <Link 
          to="/" 
          className="absolute top-6 left-6 md:top-10 md:left-10 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-gray-600 hover:text-rose-600 hover:shadow-md transition-all font-bold text-sm border border-gray-200"
        >
          <ArrowLeft size={18} /> Regresar
      </Link>

      <div className="max-w-4xl mx-auto pt-10">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-bold uppercase tracking-widest text-sm">Admisiones</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4 tracking-tight">Inscripción de Adulto Mayor</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a nuestra familia. Por favor diligencia todos los campos con la información del adulto mayor.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
          <div className="bg-rose-600 p-4 text-center">
            <p className="text-white font-medium text-sm flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" /> Los datos suministrados son confidenciales y para uso exclusivo de la Fundación.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            
            {/* Sección 1: Datos Personales */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <User className="w-6 h-6" />
                </div>
                Información Básica
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombres *</label>
                  <input required name="nombres" value={formData.nombres} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Ej. Ana María" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Apellidos *</label>
                  <input required name="apellidos" value={formData.apellidos} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Ej. Pérez López" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Documento *</label>
                  <select name="tipo_documento" value={formData.tipo_documento} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white">
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PPT">PPT (Permiso Protección Temporal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Número de Documento *</label>
                  <input required type="tel" name="numero_documento" value={formData.numero_documento} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" placeholder="Sin puntos ni guiones" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fecha de Nacimiento *</label>
                  <input required type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all" />
                </div>
              </div>
            </section>

            {/* Sección 2: Ubicación y Salud */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                Ubicación y Salud
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Residencia *</label>
                  <input required name="direccion" value={formData.direccion} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Calle, Carrera, Número..." />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Barrio / Localidad *</label>
                  <input required name="barrio" value={formData.barrio} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estrato Socioeconómico *</label>
                  <select 
                    required 
                    name="estrato" 
                    value={formData.estrato} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="0">0 - Bajo-Bajo</option>
                    <option value="1">1 - Bajo</option>
                    <option value="2">2 - Bajo-Medio</option>
                    <option value="3">3 - Medio-Bajo</option>
                    <option value="4">4 - Medio</option>
                    <option value="5">5 - Medio-Alto</option>
                    <option value="6">6 - Alto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">EPS (Si tiene)</label>
                  <input name="eps" value={formData.eps} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Opcional" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Sangre</label>
                  <select name="tipo_sangre" value={formData.tipo_sangre} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                    <option value="">Seleccione...</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                
                {/* --- CHECKLISTS (Discapacidad + Pensionado) --- */}
                <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" name="tiene_discapacidad" checked={formData.tiene_discapacidad} onChange={handleInputChange} className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500" />
                    <span className="font-bold text-gray-700 text-sm">¿Tiene alguna discapacidad?</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" name="es_pensionado" checked={formData.es_pensionado} onChange={handleInputChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="font-bold text-gray-700 text-sm">¿Recibe pensión o subsidio?</span>
                  </label>
                </div>
                {/* --- FIN CHECKLISTS --- */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Observaciones Médicas / Medicamentos</label>
                  <textarea name="observaciones_medicas" value={formData.observaciones_medicas} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Describa brevemente si toma medicamentos o tiene condiciones especiales..." />
                </div>
              </div>
            </section>

            {/* Sección 3: Contacto de Emergencia */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Phone className="w-6 h-6" />
                </div>
                Acudiente / Contacto
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Acudiente *</label>
                  <input required name="nombre_acudiente" value={formData.nombre_acudiente} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de Contacto *</label>
                  <input required type="tel" name="telefono_acudiente" value={formData.telefono_acudiente} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" placeholder="Celular o Fijo" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Parentesco *</label>
                  <input required name="parentesco" value={formData.parentesco} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all" placeholder="Ej. Hijo, Vecino, Sobrino" />
                </div>
              </div>
            </section>

            {/* Sección 4: Programas */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Heart className="w-6 h-6" />
                </div>
                Programas de Interés
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {programsData.map(program => (
                  <label 
                    key={program.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
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
            </section>

            {/* Mensaje Error */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-shake">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

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
      </div>
    </div>
  );
};

export default Registration;