import React, { useState, useEffect, useRef } from 'react';
import { 
  CreditCard, Download, CheckCircle, 
  User, AlertTriangle, Phone, Mail, Package, Heart, Globe 
} from 'lucide-react';
import Button from './Button';
// IMPORTANTE: Importamos la función generadora
import { generateCertificate } from '../utils/pdfGenerator';

const DONATION_OPTIONS = [
  { value: '50000', label: '$50.000' },
  { value: '100000', label: '$100.000' },
  { value: '200000', label: '$200.000' },
];

const Donation = () => {
  const [donationType, setDonationType] = useState('money'); 
  const [amount, setAmount] = useState('50000');
  const [customAmount, setCustomAmount] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [step, setStep] = useState(1); 
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [donorData, setDonorData] = useState({ 
    name: '', 
    id: '', 
    email: '', 
    phone: '', 
    itemDescription: '', 
    pickupAddress: ''      
  });
  
  const wompiRef = useRef(null);
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGfdW5Zw7Qx2aLfji0t5HihPg2RSTNt2X1-vc7HjZw-BGmUlthgCQbx76L2u-by1Ltkw/exec";
  const WOMPI_PUBLIC_KEY = "pub_test_Q5yDA9xoKdePzhSGeVe9HAez7CTS0223"; 

  const validateForm = () => {
    const newErrors = {};
    if (!acceptedTerms) newErrors.terms = "Debes aceptar la política de privacidad.";
    if (!donorData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!donorData.phone.trim()) newErrors.phone = "El teléfono es obligatorio.";
    
    if (donationType === 'money') {
      if (!donorData.email.trim() || !/\S+@\S+\.\S+/.test(donorData.email)) newErrors.email = "Email inválido.";
      if (!donorData.id.trim()) newErrors.id = "Cédula o NIT obligatorio.";
      if (!amount && !customAmount) newErrors.amount = "Selecciona un monto.";
    } else {
      if (!donorData.itemDescription.trim()) newErrors.itemDescription = "Describe tu donación.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveToDatabase = async () => {
    setIsSaving(true);
    try {
      const finalAmount = customAmount || amount;
      const descripcionDetallada = donationType === 'money' 
        ? `Donación Económica: $${finalAmount} COP. ID: ${donorData.id}` 
        : `Especie: ${donorData.itemDescription}`;

      const dataToSend = {
        formType: 'donante', 
        nombre: donorData.name,
        contacto: `${donorData.phone} | ${donorData.email}`,
        tipoDonacion: donationType === 'money' ? 'Dinero' : 'Especie',
        mensaje: descripcionDetallada
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });
      return true;
    } catch (err) {
      console.error("Error guardando donante:", err);
      return true; 
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        const saved = await saveToDatabase();
        if (saved) setStep(2);
    }
  };

  useEffect(() => {
    if (step === 2 && donationType === 'money' && wompiRef.current) {
      wompiRef.current.innerHTML = ''; 
      const finalAmount = customAmount || amount;
      
      if (!finalAmount || parseInt(finalAmount) < 1500) {
          wompiRef.current.innerHTML = '<p class="text-red-500 text-sm">El monto mínimo es $1.500</p>';
          return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.wompi.co/widget.js';
      script.setAttribute('data-render', 'button');
      script.setAttribute('data-public-key', WOMPI_PUBLIC_KEY); 
      script.setAttribute('data-currency', 'COP');
      script.setAttribute('data-amount-in-cents', finalAmount + '00'); 
      script.setAttribute('data-reference', `DON-${Date.now()}-${donorData.id}`);
      script.setAttribute('data-redirect-url', window.location.href); 
      wompiRef.current.appendChild(script);
    }
  }, [step, amount, customAmount, donorData.id, donationType]); 

  // --- NUEVA FUNCIÓN CONECTADA ---
  const handleDownloadCertificate = async () => {
    const finalAmount = customAmount || amount;
    await generateCertificate(donorData.name, donorData.id, finalAmount, donationType);
  };

  const handleInKindCoordination = () => {
      const message = `Hola Fundación Ana y José, soy ${donorData.name}. Deseo donar: ${donorData.itemDescription}.`;
      window.open(`https://wa.me/573145520393?text=${encodeURIComponent(message)}`, '_blank');
      setStep(3); 
  };

  return (
    <section id="donar" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-900/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-900/20 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tu Ayuda nos Mueve</h2>
          <p className="text-xl text-gray-300">Elige cómo quieres transformar vidas hoy.</p>
        </div>

        <div className="max-w-5xl mx-auto bg-white text-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          <div className="bg-gray-50 p-8 md:w-1/3 border-r border-gray-100 flex flex-col">
             <div className="mb-8 p-1 bg-gray-200 rounded-xl flex" role="group" aria-label="Tipo de donación">
                 <button onClick={() => { setDonationType('money'); setStep(1); }} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'money' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>Dinero</button>
                 <button onClick={() => { setDonationType('kind'); setStep(1); }} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'kind' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>En Especie</button>
             </div>

             <div className="space-y-6 flex-grow">
               {[1, 2, 3].map(num => (
                 <div key={num} className={`flex items-center gap-3 ${step >= num ? 'text-rose-600' : 'text-gray-400'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-rose-100' : 'bg-gray-200'}`}>{num}</div>
                   <span className="font-bold">{num === 1 ? 'Datos' : num === 2 ? (donationType === 'money' ? 'Pago' : 'Coordinar') : 'Certificado'}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="p-8 md:w-2/3 flex flex-col justify-center bg-white relative">
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-5 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {donationType === 'money' ? <CreditCard className="text-rose-600"/> : <Package className="text-rose-600"/>}
                    {donationType === 'money' ? 'Aporte Económico' : 'Donar Artículos'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 uppercase">Nombre *</label>
                    <div className="relative"><User className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="text" className={`w-full pl-9 p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors.name ? 'border-red-500 bg-red-50' : ''}`} value={donorData.name} onChange={(e) => setDonorData({...donorData, name: e.target.value})} /></div>
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 uppercase">Teléfono *</label>
                    <div className="relative"><Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="tel" className={`w-full pl-9 p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors.phone ? 'border-red-500 bg-red-50' : ''}`} value={donorData.phone} onChange={(e) => setDonorData({...donorData, phone: e.target.value})} /></div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone}</p>}
                  </div>
                </div>

                {donationType === 'money' && (
                    <>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700 uppercase">Email *</label>
                                <div className="relative"><Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4"/><input type="email" className={`w-full pl-9 p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors.email ? 'border-red-500 bg-red-50' : ''}`} value={donorData.email} onChange={(e) => setDonorData({...donorData, email: e.target.value})} /></div>
                                {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-700 uppercase">C.C./NIT *</label>
                                <input type="number" className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors.id ? 'border-red-500 bg-red-50' : ''}`} value={donorData.id} onChange={(e) => setDonorData({...donorData, id: e.target.value})} />
                                {errors.id && <p className="text-red-500 text-xs mt-1 font-bold">{errors.id}</p>}
                            </div>
                        </div>
                        
                        <div className="space-y-3 pt-2">
                           <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                             <Heart size={16} className="text-rose-600" /> Selecciona tu impacto:
                           </label>
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                             {DONATION_OPTIONS.map((opt) => (
                               <button type="button" key={opt.value} 
                                 className={`relative p-3 rounded-xl border-2 transition-all text-left ${amount === opt.value && !customAmount ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-gray-200 hover:border-rose-300 text-gray-600'}`} 
                                 onClick={() => { setAmount(opt.value); setCustomAmount(''); }}
                               >
                                 <div className="font-extrabold text-lg">{opt.label}</div>
                                 {amount === opt.value && !customAmount && <div className="absolute top-2 right-2 text-rose-600"><CheckCircle size={16} /></div>}
                               </button>
                             ))}
                           </div>
                           <div className="relative mt-2">
                             <span className="absolute left-4 top-3.5 text-gray-500 font-bold">$</span>
                             <input type="number" className="w-full pl-8 p-3 border-2 rounded-xl outline-none transition-colors font-bold text-gray-700 border-gray-200 focus:border-rose-400" placeholder="Otro valor (COP)" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
                           </div>
                        </div>
                    </>
                )}

                {donationType === 'kind' && (
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 uppercase">¿Qué deseas donar?</label>
                        <textarea className={`w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-rose-500 outline-none ${errors.itemDescription ? 'border-red-500 bg-red-50' : ''}`} value={donorData.itemDescription} onChange={(e) => setDonorData({...donorData, itemDescription: e.target.value})} placeholder="Ej: Ropa en buen estado, alimentos no perecederos..."></textarea>
                        {errors.itemDescription && <p className="text-red-500 text-xs mt-1 font-bold">{errors.itemDescription}</p>}
                    </div>
                )}

                <div className="flex items-start gap-3 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <input id="terms-donation" type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="w-5 h-5 mt-0.5 text-rose-600 rounded cursor-pointer" />
                  <div className="space-y-1">
                    <label htmlFor="terms-donation" className="text-xs text-gray-600 cursor-pointer block">
                        Acepto la <a href="/politica-privacidad" target="_blank" className="text-rose-600 font-bold hover:underline">Política de Privacidad</a> y el uso de datos.
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs font-bold">{errors.terms}</p>}
                  </div>
                </div>

                <Button variant="primary" className="w-full py-3 shadow-lg mt-2" disabled={isSaving}>
                  {isSaving ? 'Registrando...' : 'Continuar'}
                </Button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                {donationType === 'money' ? (
                    <>
                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Método de Pago</h3>
                            <p className="text-gray-500 text-sm">Donación: <span className="font-bold text-rose-600">${parseInt(customAmount || amount).toLocaleString()} COP</span></p>
                        </div>
                        
                        <div className="bg-white border rounded-xl p-4 text-center shadow-sm">
                            <p className="font-bold text-gray-700 mb-2 text-sm">Tarjetas / PSE / Nequi / Bancolombia</p>
                            <div className="min-h-[50px] flex items-center justify-center">
                                <form ref={wompiRef}></form>
                            </div>
                        </div>

                        <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className="block transform hover:scale-[1.02] transition-transform">
                            <div className="bg-[#003087] text-white rounded-xl p-4 text-center shadow-md flex items-center justify-center gap-2">
                                <Globe size={18} /> Donar con PayPal
                            </div>
                        </a>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-pulse"/>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu intención!</h3>
                        <p className="text-gray-600 mb-6 text-sm">Para coordinar la recogida o entrega de los artículos, por favor comunícate con nosotros vía WhatsApp. Allí te daremos la dirección exacta y horarios.</p>
                        
                        <button onClick={handleInKindCoordination} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-[#128c7e] transition-colors">
                            <Phone className="w-5 h-5" /> Abrir WhatsApp de Coordinación
                        </button>
                    </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="text-center animate-fade-in-up py-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                <h3 className="text-3xl font-extrabold text-gray-800 mb-2">¡Misión Cumplida!</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Tu generosidad transforma vidas.</p>
                
                {/* BOTÓN DESCARGAR CERTIFICADO CONECTADO */}
                {donationType === 'money' && (
                    <button onClick={handleDownloadCertificate} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                      <Download className="w-6 h-6" /> Descargar Certificado
                    </button>
                )}
                
                <button onClick={() => { setStep(1); setAcceptedTerms(false); setErrors({}); setDonorData({...donorData, itemDescription:''}); }} className="mt-8 text-rose-600 font-bold text-sm hover:underline block mx-auto">
                  Hacer otra donación
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;