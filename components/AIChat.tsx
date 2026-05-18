import React, { useState, useRef, useEffect } from 'react';
import { Send, Moon, User, X, Sparkles, MessageCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'ai', 
      text: 'Benvenuto nell’universo di Mie Noctis ✨\nIo sono la presenza che ti accompagnerà durante il viaggio.\nPosso raccontarti qualcosa su Mie, sui suoi mondi, sui progetti creativi… oppure semplicemente fare due chiacchiere con te.', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Artificial delay to feel more "human"
    setTimeout(() => {
      setIsTyping(true);
    }, 600);

    try {
      const aiResponseText = await getGeminiResponse(input);
      
      // Minimum typing time for natural feel
      const typingDuration = Math.min(Math.max(aiResponseText.length * 20, 1500), 4000);
      
      setTimeout(() => {
        const aiMsg: ChatMessage = { role: 'ai', text: aiResponseText, timestamp: new Date() };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, typingDuration);
      
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  const initialSuggestions = [
    "Chi è Mie Noctis?",
    "Parlami del romanzo 'Figli dell'Equilibrio'",
    "Cosa sono i progetti interattivi di Mie?"
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-midnight border border-magic/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center z-50 group hover:border-magic transition-colors"
          >
            <div className="absolute inset-0 rounded-full bg-magic/20 blur-md animate-pulse"></div>
            <Moon className="w-8 h-8 text-lunar group-hover:text-magic transition-colors relative z-10" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-magic rounded-full shadow-[0_0_10px_#06b6d4]"></div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] z-50 rounded-none overflow-hidden glass-card shadow-2xl flex flex-col bg-night/95 border border-gold/10"
          >
            {/* Header */}
            <div className="p-4 bg-midnight/80 border-b border-gold/10 flex justify-between items-center relative overflow-hidden shrink-0">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] rounded-full"></div>
               <div className="flex items-center gap-3 relative z-10">
                 <div className="relative">
                   <div className="absolute -inset-1 bg-gold/30 rounded-full blur-sm animate-pulse"></div>
                   <div className="w-10 h-10 rounded-full bg-midnight border border-gold/30 flex items-center justify-center relative shadow-[0_0_15px_rgba(200,166,110,0.2)]">
                     <Moon className="w-5 h-5 text-gold" />
                   </div>
                 </div>
                 <div>
                   <h3 className="heading-subtitle text-lg tracking-wider mb-1 text-goldpale">Guida dell'Universo</h3>
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-fog/60">Online</span>
                   </div>
                 </div>
               </div>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="text-fog/50 hover:text-gold transition-colors p-2 rounded-full hover:bg-gold/5 relative z-10"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-6 scroll-smooth">
               {messages.map((m, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                   <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 border ${m.role === 'user' ? 'bg-midnight border-fog/20' : 'bg-gold/10 border-gold/30 shadow-[0_0_10px_rgba(200,166,110,0.2)]'}`}>
                       {m.role === 'user' ? <User className="w-4 h-4 text-fog/70" /> : <Moon className="w-4 h-4 text-gold" />}
                     </div>
                     <div className={`p-4 text-sm leading-relaxed whitespace-pre-wrap font-sans ${m.role === 'user' ? 'bg-fog/10 text-white rounded-xl rounded-tr-none border border-fog/5' : 'bg-midnight/60 text-fog/90 border border-gold/10 rounded-xl rounded-tl-none font-light shadow-inner'}`}>
                       {m.text}
                     </div>
                   </div>
                 </motion.div>
               ))}
               
               {isTyping && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="flex justify-start"
                 >
                   <div className="flex gap-3 max-w-[85%]">
                     <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(200,166,110,0.2)]">
                       <Moon className="w-4 h-4 text-gold" />
                     </div>
                     <div className="p-4 bg-midnight/60 border border-gold/10 rounded-xl rounded-tl-none shadow-inner">
                       <div className="flex gap-1.5 items-center h-4">
                         <div className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce"></div>
                         <div className="w-1.5 h-1.5 bg-gold/80 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                         <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]"></div>
                       </div>
                     </div>
                   </div>
                 </motion.div>
               )}
            </div>

            {/* Suggestions (only if few messages) */}
            {messages.length === 1 && !isTyping && (
              <div className="px-5 pb-2 flex flex-wrap gap-2 shrink-0">
                {initialSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInput(suggestion); }}
                    className="text-xs text-gold border border-gold/30 bg-gold/5 hover:bg-gold/20 rounded-full px-3 py-1.5 transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-midnight/80 border-t border-gold/10 shrink-0">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Scrivi un messaggio..."
                  className="w-full bg-night border border-gold/20 rounded-none pl-5 pr-12 py-3 text-white focus:outline-none focus:border-gold transition-colors font-sans font-light text-sm placeholder:text-fog/40"
                />
                <button 
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="absolute right-2 p-2 bg-gold/10 text-gold hover:bg-gold hover:text-midnight border border-transparent hover:border-gold transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gold disabled:hover:border-transparent rounded-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
