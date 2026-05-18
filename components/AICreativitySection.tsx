import React from 'react';
import { motion } from 'framer-motion';

const AICreativitySection: React.FC = () => {
  return (
    <section id="ai-creativity" className="py-24 px-6 relative overflow-hidden bg-midnight">
      {/* Abstract particle/glow effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-magic/10 via-midnight to-midnight -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-h3 mb-4"
          >
            Simbiosi Creativa
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-epic-magic text-4xl md:text-5xl lg:text-7xl mb-6"
          >
            La Nuova Tela
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="paragraph-text"
          >
            L'intelligenza artificiale non sostituisce l'emozione, ma le dona nuove forme. Un dialogo costante tra l'astrazione del pensiero autoriale e l'infinita tela dell'AI generativa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {[
            {
              title: "Prompt Emotivo",
              desc: "Cerco le parole giuste per parlare con le macchine. Traduco visioni e atmosfere in input linguistici per generare echi visivi in linea con ciò che provo.",
              delay: 0.1
            },
            {
              title: "Espansione Narrativa",
              desc: "Uso l'AI come cassa di risonanza. Un supporto tecnologico che mi aiuta a esplorare l'architettura dei miei mondi fantasy, rendendoli più vivi, ampi e coerenti.",
              delay: 0.3
            },
            {
              title: "Ispirazione Interattiva",
              desc: "Costruire storie non basta, voglio che siano abitabili. Unisco la narrativa all'interazione e al game design per tracciare nuovi sentieri di esplorazione.",
              delay: 0.5
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: item.delay }}
              className="glass-card p-10 rounded-none border border-gold/10 hover:border-gold/50 transition-all duration-700 group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-midnight transition-colors duration-500 relative z-10 shadow-[0_0_15px_rgba(200,166,110,0.2)]">
                <span className="font-display text-xl">{i + 1}</span>
              </div>
              <h3 className="heading-subtitle text-2xl mb-4 group-hover:text-goldpale transition-all relative z-10">{item.title}</h3>
              <p className="font-sans text-fog font-light text-sm leading-relaxed relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICreativitySection;
