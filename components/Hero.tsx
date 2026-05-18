
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0D18]">
        {/* Cinematic Particles/Fog Simulation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-[#0A0D18]/80 to-[#050810] -z-10 animate-[pulse_10s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          {/* Soft floating stars/particles */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjRjJFOUM5IiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE1MCIgcj0iMSIgZmlsbD0iI0YyRTlDOSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIzNTAiIHI9IjEuNSIgZmlsbD0iI0YyRTlDOSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjAuNSIgZmlsbD0iI0YyRTlDOSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48L3N2Zz4=')] opacity-50 parallax-slow"></div>
          {/* Fog overlay */}
          <div className="absolute top-1/2 left-0 w-[200%] h-full bg-gradient-to-t from-[#0A0D18] via-[#0A0D18]/90 to-transparent transform -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="mb-6 relative"
          >
             {/* Subtle glow behind image */}
             <div className="absolute inset-0 rounded-full bg-gold opacity-15 blur-[40px] w-full h-full animate-[pulse_6s_ease-in-out_infinite]"></div>
             <img 
              src="https://i.imgur.com/JDvw3y0.jpeg" 
              alt="Mie Noctis" 
              className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border border-gold/30 shadow-[0_0_50px_rgba(200,166,110,0.2)] relative z-10"
             />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="heading-h1 text-6xl md:text-[8rem] mb-4 leading-none"
          >
            MIE NOCTIS
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="heading-subtitle mb-12 text-shadow-cinematic"
          >
            Scrittrice • Creatrice Digitale • AI Explorer
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
             <a href="#portafoglio" className="btn-epic w-full sm:w-auto flex-1 md:flex-none px-10">
               <span className="btn-epic-text">Entra nel mio mondo</span>
               <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
             </a>
             <a href="#libri" className="btn-epic w-full sm:w-auto flex-1 md:flex-none px-10 !border-lunar/20 !bg-transparent hover:!border-lunar/50">
               <span className="btn-epic-text !text-lunar/80 group-hover:!text-lunar">Scopri i romanzi</span>
               <div className="absolute inset-0 bg-lunar/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
             </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-lunar/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="py-24 px-6 bg-midnight relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-16 rounded-none relative overflow-hidden group border border-gold/10 hover:border-gold/30 transition-all duration-700"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/10 blur-[100px] rounded-full group-hover:bg-gold/20 transition-colors duration-1000"></div>
            
            <h2 className="heading-h2 text-4xl md:text-5xl lg:text-6xl mb-10 text-center">Dietro la Visione</h2>
            
            <div className="space-y-6 paragraph-text text-left md:text-center max-w-3xl mx-auto">
              <p>
                <b>Maria Elena “Mie” Turcinovich</b> unisce l'anima dell'oceano alla precisione del mondo reale. Con un background tecnico legato ai rilievi marini, ha imparato fin da subito a trovare la bellezza nelle profondità e a fonderla con l'innovazione digitale.
              </p>
              <p>
                L'esperienza nella gestione delle persone e nell'accoglienza le ha insegnato ad ascoltare, sviluppando un'empatia e una cura del dettaglio che oggi riversa in ogni sua creazione. Per lei, dietro ogni progetto c'è prima di tutto un'emozione umana.
              </p>
              <p>
                Così nasce l'identità creativa di Mie Noctis: un porto sicuro dove la scrittura fantasy, l'amore per la tecnologia, l'esplorazione dell'Intelligenza Artificiale e la progettazione visiva si fondono in modo autentico.
              </p>
              <p className="heading-subtitle text-center mt-12 py-4 text-goldpale border-l border-gold/30 pl-4 md:border-l-0 md:pl-0 font-medium">
                "Dietro ogni ombra c'è una storia. Dietro ogni luce, un'emozione che aspetta di essere raccontata."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
