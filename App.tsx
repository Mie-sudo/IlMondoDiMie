
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
  const [visitorCount, setVisitorCount] = useState<number>(1240);
  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    
    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'VISITOR_UPDATE') {
            setVisitorCount(data.total);
            setActiveUsers(data.active);
          }
        } catch (err) {
          console.error("WS Message error:", err);
        }
      };

      socket.onclose = () => {
        reconnectTimeout = setTimeout(connect, 3000);
      };

      socket.onerror = (err) => {
        console.error("WS Error:", err);
        socket.close();
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      clearTimeout(reconnectTimeout);
    };
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
        
        <Contact visitorCount={visitorCount} activeUsers={activeUsers} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
