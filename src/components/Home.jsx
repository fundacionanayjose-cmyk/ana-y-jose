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
  const logoUrl = "https://fal.media/files/monkey/23v3o36F0R2n37hY5T2Yx_image_9adf5d.png";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="font-sans text-gray-800 bg-stone-50 overflow-x-hidden relative">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 group animate-bounce-slow"><Phone className="w-6 h-6 fill-current" /><span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">Let's talk!</span></a>
      
      <Navbar scrolled={scrolled} logoUrl={logoUrl} onOpenModal={openModal} />
      
      {/* MAIN CHANGE HERE:
          Before: <div onClick={(e) => ...}><Hero /></div>
          Now: We pass the function directly. Much safer.
      */}
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