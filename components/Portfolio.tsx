
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Di Ombre e Magia",
    desc: "Racconti e romanzi in cui esploro con empatia le sfaccettature più luminose e oscure dell'animo umano.",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    tag: "Narrativa"
  },
  {
    title: "Mondi Virtuali",
    desc: "Progettazione di ambientazioni immersive e spazi 3D, fondendo arte visiva ed emozione pura.",
    img: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/136057765/original/1b94f80e6a66a0e7ba6186ea84f2a631a65884f0/create-stunning-3d-environment-for-games.jpg",
    tag: "Creative Tech"
  },
  {
    title: "Visioni Generate",
    desc: "Sperimentazione visiva con l'Intelligenza Artificiale, traduco i sentimenti astratti in immagini palpabili.",
    img: "https://files.idyllic.app/files/static/2136877",
    tag: "AI Art"
  },
  {
    title: "Cura del Tempo",
    desc: "L'attenzione al dettaglio e l'empatia profonda verso le persone, valori appresi nel mondo dell'accoglienza.",
    img: "https://i0.wp.com/httclub.com/wp-content/uploads/2014/06/hotel-reception.jpg?fit=708%2C419&ssl=1",
    tag: "Human Touch"
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portafoglio" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div className="relative inline-block">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="heading-h3 mb-4"
          >
            Esplorazioni Visive
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-h2 text-4xl md:text-5xl lg:text-6xl mb-2"
          >
            I Miei Progetti
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="paragraph-text max-w-lg mt-4 border-l border-gold/30 pl-4"
        >
          Dalla pagina scritta agli scenari digitali: un percorso unito dalla volontà di trasformare i sogni in esperienze condivise.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((p, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative bg-night rounded-none overflow-hidden flex flex-col md:flex-row glass-card hover:border-gold/30 transition-all duration-500"
          >
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-midnight/30 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-night to-midnight/90 border border-gold/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] group-hover:bg-gold/20 transition-all duration-700"></div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 inline-block">{p.tag}</span>
              <h3 className="heading-subtitle text-2xl mb-4 group-hover:text-goldpale transition-all">{p.title}</h3>
              <p className="font-sans text-fog font-light text-sm leading-relaxed">{p.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-gold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-500">
                Esplora <span className="text-lg">→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
