import React from 'react';
import { Link } from 'react-router-dom'; // IMPORTANTE: Agregar esto
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart, MessageCircle } from 'lucide-react';

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

const Footer = ({ logoUrl }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* --- COLUMNA 1: IDENTIDAD --- */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoUrl} 
                alt="Logo Fundación Ana y José" 
                className="h-14 w-auto object-contain brightness-0 invert opacity-90" 
              />
              <span className="text-xl font-bold text-white tracking-tight">
                Fundación <br/> Ana y José
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Transformamos la soledad en compañía. Una familia extendida para quienes cuidaron de nosotros ayer y nos necesitan hoy.
            </p>
            <div className="text-xs text-gray-500 space-y-1 font-mono bg-gray-800 p-3 rounded-lg inline-block">
              <p>NIT: 901.372.375-0</p>
              <p>Entidad Sin Ánimo de Lucro</p>
              <p>Vigilada Alcaldía Mayor de Bogotá</p>
            </div>
          </div>

          {/* --- COLUMNA 2: CONTACTO DIRECTO --- */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" /> Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors -ml-2">
                <div className="bg-gray-800 p-2 rounded-full group-hover:bg-rose-600 transition-colors">
                  <MapPin className="w-5 h-5 text-rose-500 group-hover:text-white"/> 
                </div>
                <span className="text-sm group-hover:text-white transition-colors">
                  Calle 8 # 73-11 <br/> Barrio Castilla, Bogotá
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors -ml-2">
                <div className="bg-gray-800 p-2 rounded-full group-hover:bg-green-500 transition-colors">
                  <Phone className="w-5 h-5 text-green-500 group-hover:text-white"/> 
                </div>
                <span className="text-sm group-hover:text-white transition-colors">314 552 0393</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors -ml-2">
                <div className="bg-gray-800 p-2 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-white"/> 
                </div>
                <span className="text-sm group-hover:text-white transition-colors break-all">fundacionanayjose@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* --- COLUMNA 3: REDES SOCIALES --- */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Síguenos</h4>
            <p className="text-sm text-gray-400 mb-6">Únete a nuestra comunidad digital y mira el impacto diario.</p>
            
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com/fundacionanayjose/" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              
              <a href="https://www.instagram.com/fundacion_anayjose/" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              
              <a href="https://www.tiktok.com/tag/fundacionanayjose" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-gray-700" aria-label="TikTok">
                <TikTokIcon className="w-5 h-5" />
              </a>

              <a href="https://www.youtube.com/@fundacionanayjose1264" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>

              <a href="https://wa.me/573145520393" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* --- COLUMNA 4: MAPA --- */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Nuestra Sede</h4>
            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-rose-500 transition-colors duration-300 relative group">
              <a 
                href="https://maps.app.goo.gl/MNpZHZf6d8sFGiZc6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <MapPin className="w-4 h-4 text-rose-600" /> Ver Ubicación
                </span>
              </a>

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.837376375054!2d-74.13735192417726!3d4.623067742316277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9c0634676571%3A0x6d62325c345377f!2sCl.%208%20%2373-11%2C%20Kennedy%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1710360000000!5m2!1ses!2sco" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Fundación Ana y José"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
            
            <a 
              href="https://maps.app.goo.gl/MNpZHZf6d8sFGiZc6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 w-full block text-center py-2 rounded-lg bg-gray-800 hover:bg-rose-600 text-gray-300 hover:text-white transition-colors text-sm font-bold"
            >
              Cómo llegar con Google Maps
            </a>
          </div>

        </div>

        {/* --- COPYRIGHT Y LEGAL --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fundación Ana y José. Todos los derechos reservados.</p>
          
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
             <Link to="/politica-privacidad" className="hover:text-rose-500 transition-colors">Política de Datos</Link>
             <span className="hidden md:inline">|</span>
             <p className="flex items-center gap-1">
                Hecho con <Heart className="w-3 h-3 text-red-600 fill-current animate-pulse" /> para nuestros abuelos
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;