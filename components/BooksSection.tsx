import React from 'react';
import { motion } from 'framer-motion';

const BooksSection: React.FC = () => {
  return (
    <section id="libri" className="py-24 px-6 relative overflow-hidden">
      {/* Background with moonlight effect */}
      <div className="absolute inset-0 bg-night z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight to-night z-0"></div>
      <div className="absolute -left-[20%] top-1/4 w-[60%] h-[60%] bg-lunar/5 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* Book Cover mock/visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center perspective-1000"
        >
          <div className="relative w-64 md:w-80 aspect-[2/3] transform transition-transform duration-700 hover:rotate-y-12 hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-midnight to-lunar/20 rounded z-10 opacity-30 mix-blend-overlay"></div>
            {/* Using the original book cover image */}
            <img 
              src="https://m.media-amazon.com/images/I/71qMjEL90oL._SL1499_.jpg" 
              alt="Figli dell'Equilibrio" 
              className="w-full h-full object-cover rounded shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-magic/20 blur-xl -z-10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h4 className="heading-h3 mb-2">Romanzo d'Esordio</h4>
          <h2 className="heading-epic-gold text-4xl md:text-5xl lg:text-7xl leading-tight mb-4">
            Figli dell'Equilibrio
          </h2>
          <p className="paragraph-text">
            Dietro ogni luce, un'emozione. Un viaggio letterario nato dal desiderio di esplorare la dualità umana, dove magia e conflitti antichi diventano lo specchio delle nostre paure e speranze più profonde.
          </p>
          <p className="heading-subtitle border-l border-gold/30 pl-4 mt-6 font-medium">
            "Un universo in cui l'equilibrio non è assenza di caos, ma la forza di danzare insieme ad esso."
          </p>
          
          <div className="pt-8">
            <a 
              href="https://amzn.eu/d/0gt0tl1e" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-epic inline-block"
            >
              <span className="btn-epic-text">Acquista su Amazon</span>
              <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BooksSection;
