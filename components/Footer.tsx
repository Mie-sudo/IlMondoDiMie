
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#0B0C10] border-t border-[#C29545]/20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <p className="font-display text-lg tracking-widest text-[#C29545]">Il Mondo di Mie</p>
        <div className="text-[#C5C6C7]/60 text-sm space-y-1">
          <p>© {new Date().getFullYear()} Maria Elena Turcinovich | Tutti i diritti riservati</p>
          <p>Roma, Italia | Precisione Tecnica, Cuore Creativo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
