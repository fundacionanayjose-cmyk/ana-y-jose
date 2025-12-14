import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart, MessageCircle } from 'lucide-react';

// Icono personalizado de TikTok
const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

const Footer = ({ logoUrl }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Identidad */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6" aria-label="Ir al inicio">
              <img src={logoUrl} alt="" className="h-14 w-auto object-contain brightness-0 invert opacity-90" aria-hidden="true" />
              <span className="text-xl font-bold text-white tracking-tight">Fundación <br/> Ana y José</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Transformamos la soledad en compañía. Una familia extendida para quienes cuidaron de nosotros ayer y nos necesitan hoy.
            </p>
            <div className="text-xs text-gray-500 space-y-1 font-mono bg-gray-800 p-3 rounded-lg inline-block">
              <p>NIT: 901.372.375-0</p>
              <p>Entidad Sin Ánimo de Lucro</p>
              <p>Vigilada Alcaldía Mayor de Bogotá</p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" aria-hidden="true" /> Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group p-2 rounded-lg -ml-2">
                <MapPin className="w-5 h-5 text-rose-500 mt-1" aria-hidden="true"/> 
                <span className="text-sm">Calle 8 # 73-11 <br/> Barrio Castilla, Bogotá</span>
              </li>
              <li className="flex items-center gap-3 group p-2 rounded-lg -ml-2">
                <Phone className="w-5 h-5 text-green-500" aria-hidden="true"/> 
                <span className="text-sm">314 552 0393</span>
              </li>
              <li className="flex items-center gap-3 group p-2 rounded-lg -ml-2">
                <Mail className="w-5 h-5 text-blue-500" aria-hidden="true"/> 
                <span className="text-sm break-all">fundacionanayjose@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Síguenos</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Facebook, url: "https://www.facebook.com/fundacionanayjose/", color: "bg-[#1877F2]", label: "Facebook" },
                { Icon: Instagram, url: "https://www.instagram.com/fundacion_anayjose/", color: "bg-pink-600", label: "Instagram" },
                { Icon: TikTokIcon, url: "https://www.tiktok.com/tag/fundacionanayjose", color: "bg-black border border-gray-700", label: "TikTok" },
                { Icon: Youtube, url: "https://www.youtube.com/@fundacionanayjose1264", color: "bg-[#FF0000]", label: "YouTube" },
                { Icon: MessageCircle, url: "https://wa.me/573145520393", color: "bg-[#25D366]", label: "WhatsApp" },
              ].map(({ Icon, url, color, label }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" 
                   className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`} aria-label={`Visitar ${label}`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-lg mb-6">Nuestra Sede</h4>
            <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-rose-500 transition-colors duration-300 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.923456789!2d-74.123456!3d4.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNCjCsDM5JzE1LjYiTiA3NMKwMDcnMjQuNCJX!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" 
                title="Mapa de ubicación Fundación Ana y José"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fundación Ana y José. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
             <Link to="/politica-privacidad" className="hover:text-rose-500 transition-colors">Política de Datos</Link>
             <span className="hidden md:inline">|</span>
             <p className="flex items-center gap-1">Hecho con <Heart className="w-3 h-3 text-red-600 fill-current animate-pulse" aria-hidden="true" /> para nuestros abuelos</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;