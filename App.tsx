
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BooksSection from './components/BooksSection';
import AICreativitySection from './components/AICreativitySection';
import WeatherWidget from './components/WeatherWidget';
import Portfolio from './components/Portfolio';
import AIChat from './components/AIChat';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MagicCursor from './components/MagicCursor';

// Firebase custom hook for real-time visitors
import { useVisitors } from './hooks/useVisitors';

const App: React.FC = () => {
  // Use custom Firebase hook with initial visitor count set to 1242
  const { visitorCount, activeUsers } = useVisitors(1242);

  return (
    <div className="min-h-screen selection:bg-magic selection:text-midnight">
      <MagicCursor />
      <Header />
      
      <main className="pt-20">
        <Hero />
        
        <BooksSection />
        
        <AICreativitySection />
        
        <Portfolio />
        
        {/* Keeping existing functional widgets but they might need styling tweaks in the future */}
        <WeatherWidget />
        
        <AIChat />
        
        <Contact visitorCount={visitorCount} activeUsers={activeUsers} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
