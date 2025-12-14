import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; // Importamos Helmet para SEO
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Team from './Team';
import Programs from './Programs';
import ImpactMap from './ImpactMap'; // <--- NUEVA IMPORTACIÓN DEL MAPA
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Partners from './Partners';
import Transparency from './Transparency';
import Donation from './Donation';
import Footer from './Footer';
import Modal from './Modal';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const logoUrl = "/galeria/LOGO.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      {/* --- SECCIÓN SEO PROFESIONAL --- */}
      <Helmet>
        <title>Fundación Ana y José | Apoyo al Adulto Mayor en Bogotá</title>
        <meta name="description" content="Fundación sin ánimo de lucro dedicada al cuidado, alimentación y bienestar del adulto mayor vulnerable en Bogotá. ¡Dona o sé voluntario!" />
        <meta name="keywords" content="fundación, adulto mayor, abuelos, donaciones, bogotá, voluntariado, caridad, ayuda social" />
        
        {/* Open Graph (Cómo se ve en Facebook/WhatsApp) */}
        <meta property="og:title" content="Fundación Ana y José | Recuperando Sonrisas" />
        <meta property="og:description" content="Ayudamos a abuelos en situación de abandono. Tu ayuda transforma vidas." />
        <meta property="og:image" content="https://fundacionanayjose.org/galeria/20211120_111629_HDR.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fundacionanayjose.org/" />
      </Helmet>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/573145520393" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow">
        <Phone className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">¡Hablemos!</span>
      </a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openModal} />
      
      <Hero onPrimaryAction={openModal} />
      
      <About />
      
      <Team />
      
      <Programs />
      
      {/* --- SECCIÓN NUEVA: MAPA INTERACTIVO --- */}
      <ImpactMap />
      
      <Gallery />
      
      <Testimonials />
      
      <Partners />
      
      <Transparency />
      
      <Donation />
      
      <Footer logoUrl={logoUrl} />
    </div>
  );
};

export default Home;