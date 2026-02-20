
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WeatherWidget from './components/WeatherWidget';
import Portfolio from './components/Portfolio';
import RSSSection from './components/RSSSection';
import AIChat from './components/AIChat';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Simulate a visitor counter since common public APIs are often rate-limited or down
    const storedCount = localStorage.getItem('mie_visitor_count');
    const newCount = storedCount ? parseInt(storedCount) + 1 : 1240;
    setVisitorCount(newCount);
    localStorage.setItem('mie_visitor_count', newCount.toString());
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#C29545] selection:text-[#0B0C10]">
      <Header />
      
      <main className="pt-20">
        <Hero />
        
        <WeatherWidget />
        
        <Portfolio />
        
        <RSSSection />
        
        <AIChat />
        
        <Contact visitorCount={visitorCount} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
