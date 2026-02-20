
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="chi-sono" className="py-24 px-6 max-w-4xl mx-auto text-center scroll-mt-20">
      <div className="space-y-8">
        <div className="relative inline-block">
          {/* Decorative rings around profile picture */}
          <div className="absolute -inset-6 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 rounded-full animate-spin [animation-duration:15s] opacity-40"></div>
          
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-4 border-[#0B0C10] overflow-hidden shadow-2xl">
            <img 
              src="https://i.imgur.com/JDvw3y0.jpeg" 
              alt="Maria Elena Turcinovich" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-5xl md:text-7xl text-white leading-tight">
            Maria Elena <span className="text-[#C29545]">“Mie”</span> Turcinovich
          </h2>
          <h3 className="text-2xl font-light italic text-[#C29545]/80 tracking-wide">Ragioniera & Tecnico in Rilevamenti Marini</h3>
        </div>
        
        <div className="space-y-8 text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
          <p className="text-xl">
            Ciao, sono <span className="text-white font-bold">Maria Elena Turcinovich</span>, ma tutti fin da piccola mi chiamano <span className="text-[#C29545] font-black drop-shadow-[0_0_8px_rgba(194,149,69,0.3)]">Mie</span>.
          </p>
          <p>
            Fin dall'infanzia ho coltivato la curiosità e l’amore per lo studio. Sono una <span className="text-[#C29545] font-semibold">Ragioniera diplomata</span> e <span className="text-[#C29545] font-semibold">Tecnico Specializzato in Rilevamenti Marini e Costieri</span>.
          </p>
          <p>
            Ho consolidato la mia esperienza nel settore alberghiero come <span className="italic text-emerald-400/90">Responsabile</span>, dove la cura del dettaglio e la gestione delle persone sono fondamentali.
          </p>
          <p>
            Parallelamente, coltivo la mia passione per il mondo digitale, creando <span className="text-sky-400">oggetti e ambientazioni 3D</span> e dedicandomi allo studio dell’<span className="text-amber-400">intelligenza artificiale</span> applicata alla scrittura creativa.
          </p>
          <p className="border-l-2 border-[#C29545]/30 pl-6 py-2 italic bg-white/5 rounded-r-lg">
            Sono una mente tecnica con un cuore creativo, dove la precisione della contabilità incontra la vastità dell'oceano e dell'innovazione dell'AI.
          </p>
          <p className="font-light tracking-wide">
            Progetto esperienze immersive, contenuti che emozionano e soluzioni tridimensionali per il futuro del web.
          </p>
          <div className="relative inline-block pt-4">
            <p className="font-display text-3xl md:text-4xl font-black bg-gradient-to-r from-[#C29545] via-white to-[#C29545] bg-clip-text text-transparent animate-pulse">
              Benvenuti nel mio spazio digitale!
            </p>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C29545] to-transparent opacity-50"></div>
          </div>
          <div className="pt-8 flex gap-6 justify-center">
            <a 
              href="#portafoglio"
              className="bg-[#C29545] hover:bg-[#E6C77A] text-[#0B0C10] font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#C29545]/20 transform hover:-translate-y-1 inline-block"
            >
              Scopri i miei lavori
            </a>
            <a 
              href="#contatti"
              className="border-2 border-[#C29545] hover:bg-[#C29545]/10 text-[#C29545] font-bold px-10 py-4 rounded-full transition-all duration-300 inline-block"
            >
              Contattami
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
