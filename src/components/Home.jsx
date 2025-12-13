import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Team from './Team';
import Programs from './Programs';
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
  
  // CAMBIO: Usamos la ruta local de tu logo
  const logoUrl = "/galeria/LOGO.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/573145520393" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow"><Phone className="w-6 h-6 fill-current" /><span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">¡Hablemos!</span></a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openModal} />
      
      <Hero onPrimaryAction={openModal} />
      
      <About />
      <Team />
      <Programs />
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