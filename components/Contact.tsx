import React from 'react';
import { Mail, Globe, Phone, MessageCircle } from 'lucide-react';

interface ContactProps {
  visitorCount: number;
  activeUsers: number;
}

const StylizedVisitorIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
      <circle 
        cx="50" cy="50" r="46" 
        fill="none" 
        stroke="#06b6d4" 
        strokeWidth="1.5" 
        strokeDasharray="15 25" 
        className="animate-[spin_25s_linear_infinite] opacity-30"
      />
      <circle 
        cx="50" cy="50" r="36" 
        fill="none" 
        stroke="#e2e8f0" 
        strokeWidth="2" 
        strokeDasharray="50 15" 
        className="animate-[spin_18s_linear_infinite_reverse] opacity-50"
      />
      
      <circle cx="50" cy="50" r="12" fill="#06b6d4" className="animate-pulse" />
      <circle cx="50" cy="50" r="10" fill="url(#nodeGrad)" className="animate-pulse" />
      <circle cx="50" cy="50" r="4" fill="#050a15" />
      
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#06b6d4" />
        </radialGradient>
      </defs>

      {[0, 90, 180, 270].map((angle, i) => (
        <circle
          key={i}
          cx={50 + 36 * Math.cos(angle * Math.PI / 180)}
          cy={50 + 36 * Math.sin(angle * Math.PI / 180)}
          r="4"
          fill="#e2e8f0"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
    <div className="absolute inset-0 bg-magic/20 rounded-full blur-2xl animate-pulse scale-125"></div>
  </div>
);

const Contact: React.FC<ContactProps> = ({ visitorCount, activeUsers }) => {
  return (
    <section id="contatti" className="py-24 px-6 max-w-4xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row gap-16 items-start justify-center">
        <div className="space-y-12">
          <div>
            <div className="relative inline-block mb-6">
               <h2 className="heading-h2 text-5xl md:text-6xl mb-2">
                Connettiamoci
              </h2>
            </div>
            <p className="paragraph-text mb-8">
              Che sia per condividere un pensiero sui romanzi, per immaginare nuovi orizzonti visivi, o anche solo per esplorare insieme la bellezza nascosta nei dettagli. Scrivimi, sarò felice di ascoltare la tua storia.
            </p>
            
             <div className="space-y-10">
               <div className="flex flex-col gap-6 font-sans text-goldpale/90 mt-4">
                 <div className="flex items-center gap-5 group">
                   <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#0A0D18] border border-gold/20 shadow-[0_0_10px_rgba(200,166,110,0.05)] group-hover:border-gold/60 group-hover:shadow-[0_0_25px_rgba(200,166,110,0.3)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-6 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                     <Mail className="w-5 h-5 text-gold relative z-10 group-hover:text-warmwhite transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                   </div>
                   <a href="mailto:e.turcinovich@gmail.com" className="hover:text-gold transition-colors hover:underline tracking-wide">e.turcinovich@gmail.com</a>
                 </div>
                 <div className="flex items-center gap-5 group">
                   <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#0A0D18] border border-gold/20 shadow-[0_0_10px_rgba(200,166,110,0.05)] group-hover:border-gold/60 group-hover:shadow-[0_0_25px_rgba(200,166,110,0.3)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:-rotate-3 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                     <Phone className="w-5 h-5 text-gold relative z-10 group-hover:text-warmwhite transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                   </div>
                   <a href="tel:+393927734040" className="hover:text-gold transition-colors hover:underline tracking-wide">+39 392 7734040</a>
                 </div>
                 <div className="flex items-center gap-5 group">
                   <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#0A0D18] border border-gold/20 shadow-[0_0_10px_rgba(200,166,110,0.05)] group-hover:border-gold/60 group-hover:shadow-[0_0_25px_rgba(200,166,110,0.3)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-3 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                     <MessageCircle className="w-5 h-5 text-gold relative z-10 group-hover:text-warmwhite transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                   </div>
                   <a href="https://wa.me/393927734040" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors hover:underline tracking-wide">Chatta su WhatsApp</a>
                 </div>
                 <div className="flex items-center gap-5 group">
                   <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#0A0D18] border border-gold/20 shadow-[0_0_10px_rgba(200,166,110,0.05)] group-hover:border-gold/60 group-hover:shadow-[0_0_25px_rgba(200,166,110,0.3)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:-rotate-6 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                     <Globe className="w-5 h-5 text-gold relative z-10 group-hover:text-warmwhite transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                   </div>
                   <a href="https://amzn.eu/d/0gt0tl1e" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors hover:underline tracking-wide">
                     Scopri Figli dell'Equilibrio
                   </a>
                 </div>
               </div>
            </div>
          </div>

          <div className="relative group overflow-hidden p-10 bg-night rounded-[2rem] border border-magic/20 inline-flex items-center gap-10 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 hover:scale-[1.02] hover:border-magic/40">
            <div className="relative z-10 shrink-0">
              <StylizedVisitorIcon />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-magic opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-magic shadow-[0_0_10px_#06b6d4]"></span>
                </span>
                <p className="text-xs uppercase tracking-[0.4em] font-bold text-lunar">
                  {activeUsers} online
                </p>
              </div>
              <p className="text-6xl font-black tracking-tighter font-mono text-white drop-shadow-sm">
                {visitorCount.toLocaleString()}
              </p>
              <p className="text-lunar/60 text-[10px] uppercase tracking-[0.2em] mt-1 font-light">Connessioni totali nell'universo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
