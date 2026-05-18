
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-midnight border-t border-lunar/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <p className="font-display text-xl tracking-[0.3em] text-gold uppercase drop-shadow-[0_0_10px_rgba(200,166,110,0.5)]">Mie Noctis</p>
        <div className="text-fog/50 text-sm space-y-1 font-sans font-light">
          <p>© {new Date().getFullYear()} Maria Elena Turcinovich | Tutti i diritti riservati</p>
          <p className="italic pt-2">Oltre l'orizzonte, dove l'immaginazione incontra la tecnica.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
