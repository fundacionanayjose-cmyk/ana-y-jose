import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Briefcase, Calendar, AlertCircle, Heart, CreditCard, Lock, Globe, Package } from 'lucide-react';
import Button from './Button';
import { supabase } from '../supabase/client'; 

const Modal = ({ isOpen, onClose, preSelectedBeneficiary = null }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(50000); // Monto por defecto sugerido
  
  // Estado para controlar si el padrino quiere dar DINERO o ESPECIE
  const [donationType, setDonationType] = useState('dinero'); // 'dinero' | 'especie'

  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    email: '',
    contacto: '',
    tipoAyuda: 'Quiero ser Padrino (Mensual)',
    profesion: '',     // Usado para Voluntarios
    detalleEspecie: '' // NUEVO: Para describir qué ropa/comida va a donar
  });

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError(null);
      setIsLoading(false);
      setDonationType('dinero'); // Reset al abrir

      if (preSelectedBeneficiary) {
        setFormData(prev => ({
          ...prev,
          tipoAyuda: `Plan Padrino - Beneficiario: ${preSelectedBeneficiary}`,
          profesion: '',
          detalleEspecie: ''
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          tipoAyuda: 'Quiero ser Padrino (Mensual)'
        }));
      }
    }
  }, [isOpen, preSelectedBeneficiary]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Construimos el tipo de ayuda final para que sea claro en la base de datos
      let ayudaFinal = formData.tipoAyuda;
      
      // Si está apadrinando en especie, agregamos el detalle al registro
      if (preSelectedBeneficiary && donationType === 'especie') {
        ayudaFinal = `${formData.tipoAyuda} (EN ESPECIE: ${formData.detalleEspecie})`;
      } else if (preSelectedBeneficiary && donationType === 'dinero') {
        ayudaFinal = `${formData.tipoAyuda} (EN DINERO)`;
      }

      const { error } = await supabase
        .from('contactos')
        .insert([
          { 
            nombre: formData.nombre,
            documento: formData.documento,
            email: formData.email,
            telefono: formData.contacto, 
            tipo_ayuda: ayudaFinal, 
            profesion: formData.profesion,
            estado: 'nuevo'
          }
        ]);

      if (error) throw error;
      setIsSuccess(true);
      
    } catch (err) {
      console.error("Error:", err.message);
      setError("No pudimos guardar tus datos. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ nombre: '', documento: '', email: '', contacto: '', tipoAyuda: 'Quiero ser Padrino (Mensual)', profesion: '', detalleEspecie: '' });
    }, 300);
  }

  // --- PAGOS ---
  const handleWompiPayment = () => {
    const wompiPublicKey = "TU_LLAVE_PUBLICA_WOMPI"; // <--- REEMPLAZAR
    const currency = "COP";
    const amountInCents = amount * 100;
    const reference = `DON-${Date.now()}`;
    const redirectUrl = "https://fundacionanayjose.org"; 
    const checkoutUrl = `https://checkout.wompi.co/p/?public-key=${wompiPublicKey}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&redirect-url=${redirectUrl}`;
    window.open(checkoutUrl, '_blank');
  };

  const handlePayPalPayment = () => {
    // URL universal de PayPal para donaciones
    // Puedes usar tu link personalizado: paypal.me/fundacion...
    const paypalUrl = "https://www.paypal.com/donate/?hosted_button_id=TU_ID_PAYPAL"; // <--- REEMPLAZAR
    window.open(paypalUrl, '_blank');
  };

  const isVolunteer = formData.tipoAyuda.includes("Voluntario");
  const isSponsoring = formData.tipoAyuda.includes("Plan Padrino - Beneficiario");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <div className="bg-rose-600 p-6 flex justify-between items-center text-white shrink-0">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            {isSuccess 
              ? '¡Muchas Gracias!' 
              : (isSponsoring ? <><Heart className="fill-white" /> Apadrinamiento</> : 'Únete a la Familia')
            }
          </h3>
          <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {isSuccess ? (
            // --- PANTALLA DE CIERRE ---
            <div className="text-center py-4">
              
              {/* CASO 1: VOLUNTARIOS */}
              {isVolunteer && (
                <>
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu tiempo!</h4>
                  <p className="text-gray-600 mb-6">Hemos recibido tu postulación. Te contactaremos pronto.</p>
                  <Button variant="outline" onClick={handleClose} className="w-full">Cerrar</Button>
                </>
              )}

              {/* CASO 2: DONACIÓN EN ESPECIE (Ropa, comida) */}
              {!isVolunteer && donationType === 'especie' && (
                <>
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">¡Coordinemos la entrega!</h4>
                  <p className="text-gray-600 mb-6 text-sm">
                    Gracias por tu generosidad material. Hemos registrado tu intención de donar. 
                    <br/><br/>
                    <strong>Próximo paso:</strong> Nuestro equipo logístico te escribirá al WhatsApp para coordinar la recogida o recepción de los artículos.
                  </p>
                  <Button variant="primary" onClick={handleClose} className="w-full">Entendido</Button>
                </>
              )}

              {/* CASO 3: DONACIÓN EN DINERO (Pasarelas) */}
              {!isVolunteer && donationType === 'dinero' && (
                <>
                  <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Finaliza tu Aporte Seguro</h4>
                  <p className="text-gray-600 mb-6 text-sm">
                    Tus datos están guardados. Elige tu método de pago preferido:
                  </p>

                  {/* Selector de Monto (Solo visual para Wompi, PayPal gestiona el suyo usualmente) */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-left">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Monto a Donar (COP)</label>
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 font-bold">$</span>
                      <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-2 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none font-bold text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Botón WOMPI (Colombia) */}
                    <Button 
                      variant="primary" 
                      onClick={handleWompiPayment} 
                      className="w-full justify-center text-base shadow-lg"
                    >
                      <Lock className="w-4 h-4 mr-2" /> Pagar con Bancolombia / Wompi
                    </Button>

                    {/* Botón PAYPAL (Internacional) */}
                    <button 
                      onClick={handlePayPalPayment}
                      className="w-full py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 bg-[#0070BA] text-white hover:bg-[#003087]"
                    >
                      <Globe className="w-4 h-4" /> Donar Internacional (PayPal)
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // --- FORMULARIO DE DATOS ---
            <>
              {isSponsoring && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3 text-yellow-800">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <div>
                      Apadrinando a: <strong className="text-gray-900">{preSelectedBeneficiary}</strong>
                    </div>
                  </div>
                  
                  {/* SELECTOR: DINERO VS ESPECIE */}
                  <div className="bg-white p-1 rounded-lg border border-yellow-100 flex">
                    <button
                      type="button"
                      onClick={() => setDonationType('dinero')}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                        donationType === 'dinero' ? 'bg-yellow-100 text-yellow-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      💰 Dinero
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('especie')}
                      className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                        donationType === 'especie' ? 'bg-yellow-100 text-yellow-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      📦 Especie (Ropa/Comida)
                    </button>
                  </div>
                </div>
              )}
              
              {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm flex items-center gap-2"><AlertCircle size={16}/> {error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isSponsoring && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">¿Cómo quieres ayudar?</label>
                    <select name="tipoAyuda" value={formData.tipoAyuda} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none bg-white">
                      <option value="Quiero ser Padrino (Mensual)">Quiero ser Padrino (Mensual)</option>
                      <option value="Donación Única">Donación Única</option>
                      <option value="Ser Voluntario">Ser Voluntario</option>
                      <option value="Donar Especie">Donar Especie</option>
                    </select>
                  </div>
                )}

                {/* CAMPO ESPECIAL: Si elige ESPECIE, preguntamos qué es */}
                {isSponsoring && donationType === 'especie' && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué artículos deseas enviar?</label>
                    <textarea 
                      name="detalleEspecie" 
                      value={formData.detalleEspecie} 
                      onChange={handleChange} 
                      required 
                      rows="2"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none" 
                      placeholder="Ej: Una caja de pañales talla L y 2 abrigos de lana." 
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none" placeholder="Ej: Juan Pérez" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cédula / ID</label>
                    <input type="text" name="documento" value={formData.documento} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none" placeholder="12345..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Celular / WhatsApp</label>
                    <input type="tel" name="contacto" value={formData.contacto} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none" placeholder="+57 300..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none" placeholder="juan@ejemplo.com" />
                </div>

                {isVolunteer && (
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 animate-fade-in-up">
                    <label className="block text-sm font-bold text-rose-800 mb-1 flex items-center gap-2"><Briefcase className="w-4 h-4"/> ¿Cuál es tu profesión?</label>
                    <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-rose-200 outline-none" placeholder="Ej: Odontólogo..." />
                  </div>
                )}

                <Button variant="primary" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : (
                    isSponsoring 
                      ? (donationType === 'dinero' ? 'Continuar al Pago' : 'Confirmar Ayuda') 
                      : 'Enviar Solicitud'
                  )}
                </Button>
                
                <p className="text-center text-xs text-gray-400 mt-2">
                  Tus datos están protegidos por nuestra Política de Privacidad.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;