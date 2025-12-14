import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import History from './History';
import Team from './Team';
import Programs from './Programs';

// 1. IMPORTAMOS EL NUEVO COMPONENTE AQUÍ
import OfficialServices from './OfficialServices'; // <--- NUEVO: Asegúrate de que la ruta sea correcta

import ImpactMap from './ImpactMap';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Partners from './Partners';
import Transparency from './Transparency';
import Donation from './Donation';
import Footer from './Footer';
import Modal from './Modal';
import ParallaxBanner from './ParallaxBanner';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  
  const logoUrl = "/galeria/LOGO.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- EFECTO DE SCROLL AUTOMÁTICO AL LLEGAR DE OTRA PÁGINA ---
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  }, [location]);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      <Helmet>
        <title>Fundación Ana y José | Apoyo al Adulto Mayor en Bogotá</title>
        <meta name="description" content="Fundación sin ánimo de lucro dedicada al cuidado, alimentación y bienestar del adulto mayor vulnerable en Bogotá. ¡Dona o sé voluntario!" />
        <meta property="og:title" content="Fundación Ana y José | Recuperando Sonrisas" />
        <meta property="og:image" content="https://fundacionanayjose.org/galeria/20211120_111629_HDR.jpg" />
      </Helmet>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Botón WhatsApp */}
      <a href="https://wa.me/573145520393" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow">
        <Phone className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">¡Hablemos!</span>
      </a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openModal} />
      
      <Hero onPrimaryAction={openModal} />
      
      <About />

      <History /> 

      <ParallaxBanner 
        image="/galeria/20211120_111629_HDR.jpg" 
        quote="Donde hay amor, no existe la soledad. Juntos somos una gran familia."
      />
      
      <Team />
      
      <Programs />

      {/* 2. INSERTAMOS EL NUEVO COMPONENTE AQUÍ */}
      {/* Esta sección contiene la Info Oficial de los PDFs sin tocar Programs */}
      <OfficialServices /> {/* <--- NUEVO: Aquí se mostrará la info de ruta de atención y servicios detallados */}
      
      <ImpactMap />

      <ParallaxBanner 
        image="/galeria/20210503_205438.jpg" 
        quote="Manos que dan, nunca estarán vacías. Cada plato servido es una esperanza renovada."
      />
      
      <Gallery />
      
      <Testimonials />
      
      <Partners />
      
      <ParallaxBanner 
        image="/galeria/20211121_132212_HDR.jpg" 
        quote="Escuchar a nuestros abuelos es aprender de la historia y honrar nuestro futuro."
      />

      <Transparency />
      
      <Donation />
      
      <Footer logoUrl={logoUrl} />
    </div>
  );
};

export default Home;