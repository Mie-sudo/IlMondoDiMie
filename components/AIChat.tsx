
import React, { useState, useRef, useEffect } from 'react';
import { Send, Stars, User, Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'ai', 
      text: 'Ciao! Sono Mie.AI, l\'anima digitale di Maria Elena. ✨ Sono qui per raccontarti la nostra storia, tra mare, numeri e intelligenza artificiale. Come posso rendere speciale la tua giornata?', 
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
  }, [messages, isTyping]);

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

  return (
    <section id="ai-chat" className="py-24 px-6 bg-gradient-to-b from-[#0B0C10] to-[#142640] border-y border-[#C29545]/10 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            {/* Background glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C29545] via-[#BF7B90] to-[#C29545] rounded-full blur-xl opacity-40 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C29545] to-[#BF7B90] rounded-full animate-spin [animation-duration:8s]"></div>
            
            {/* Main Icon Container */}
            <div className="relative bg-[#0B0C10] p-6 rounded-full border border-emerald-400/30 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
              <Stars className="w-12 h-12 text-emerald-400 animate-[pulse_3s_infinite]" />
              
              {/* Extra floating particles/sparkles */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-sky-400 rounded-full blur-sm animate-ping"></div>
              <div className="absolute bottom-2 left-1 w-2 h-2 bg-amber-400 rounded-full blur-sm animate-ping [animation-delay:1s]"></div>
            </div>
          </div>
          <div className="relative inline-block mb-4">
            <h2 className="font-display text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
              Chat con Mie.AI
            </h2>
            <div className="absolute -bottom-2 right-0 w-2/3 h-1.5 bg-gradient-to-l from-amber-400 to-transparent rounded-full opacity-60"></div>
          </div>
          <p className="text-[#C5C6C7] mt-4">Chiedimi delle mie competenze, dei miei progetti o di una collaborazione.</p>
        </div>

        <div className="bg-[#1F2833]/80 border border-[#C29545]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]' : 'bg-gradient-to-tr from-emerald-400 to-amber-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Stars className="w-4 h-4 text-[#0B0C10]" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#BF7B90] text-white rounded-tr-none' : 'bg-[#0B0C10] text-[#C5C6C7] border border-[#C29545]/20 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 items-center bg-[#0B0C10] border border-[#C29545]/20 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#C29545] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#C29545] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-[#C29545] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#0B0C10]/50 border-t border-[#C29545]/30 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Scrivi un messaggio a Mie.AI..."
              className="flex-1 bg-[#1F2833] border border-[#C29545]/20 rounded-lg px-4 py-2 text-[#C5C6C7] focus:outline-none focus:border-[#C29545] transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="bg-[#C29545] hover:bg-[#E6C77A] text-[#0B0C10] p-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
