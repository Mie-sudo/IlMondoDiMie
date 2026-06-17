
import React from 'react';
import { Facebook, Instagram, Linkedin, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050a15]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Moon className="w-5 h-5 text-gold" />
          <h1 className="heading-epic-gold uppercase text-xl md:text-2xl tracking-[0.3em] flex-shrink-0 whitespace-nowrap">
            Mie Noctis
          </h1>
        </motion.div>
        
        <motion.div 
          className="flex gap-4 md:gap-6 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a href="https://www.facebook.com/profile.php?id=61589640937426&sk=about" target="_blank" rel="noopener noreferrer" className="text-fog/70 hover:text-gold transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(200,166,110,0.8)]">
            <Facebook className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://www.instagram.com/mienoctis/" target="_blank" rel="noopener noreferrer" className="text-fog/70 hover:text-gold transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(200,166,110,0.8)]">
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://www.linkedin.com/in/maria-elena-turcinovich-46092671/" target="_blank" rel="noopener noreferrer" className="text-fog/70 hover:text-gold transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(200,166,110,0.8)]">
            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
