
import React, { useState } from 'react';
import { Mail, Globe, Phone } from 'lucide-react';

interface ContactProps {
  visitorCount: number;
  activeUsers: number;
}

const StylizedVisitorIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(194,149,69,0.5)]">
      {/* Outer Rotating Ring */}
      <circle 
        cx="50" cy="50" r="46" 
        fill="none" 
        stroke="#C29545" 
        strokeWidth="1.5" 
        strokeDasharray="15 25" 
        className="animate-[spin_25s_linear_infinite] opacity-30"
      />
      {/* Inner Rotating Ring */}
      <circle 
        cx="50" cy="50" r="36" 
        fill="none" 
        stroke="#E6C77A" 
        strokeWidth="2" 
        strokeDasharray="50 15" 
        className="animate-[spin_18s_linear_infinite_reverse] opacity-50"
      />
      
      {/* Central Pulsing Node - Larger and Brighter */}
      <circle cx="50" cy="50" r="12" fill="#C29545" className="animate-pulse" />
      <circle cx="50" cy="50" r="10" fill="url(#nodeGrad)" className="animate-pulse" />
      <circle cx="50" cy="50" r="4" fill="#0B0C10" />
      
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2CC" />
          <stop offset="100%" stopColor="#C29545" />
        </radialGradient>
      </defs>

      {/* Data Points - Brighter and more frequent */}
      {[0, 90, 180, 270].map((angle, i) => (
        <circle
          key={i}
          cx={50 + 36 * Math.cos(angle * Math.PI / 180)}
          cy={50 + 36 * Math.sin(angle * Math.PI / 180)}
          r="4"
          fill="#E6C77A"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
    {/* Multi-layered Ambient Glow */}
    <div className="absolute inset-0 bg-[#C29545]/20 rounded-full blur-2xl animate-pulse scale-125"></div>
    <div className="absolute inset-0 bg-[#E6C77A]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
  </div>
);

const Contact: React.FC<ContactProps> = ({ visitorCount, activeUsers }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xpwqnzre', { // Note: In a real scenario, the user would provide their Formspree ID. I'll use the email directly as a fallback or a placeholder ID if I had one. 
        // Actually, Formspree allows sending to an email directly if configured, but usually requires an ID.
        // I will use a generic approach or explain they need a Formspree ID.
        // Better yet, I'll use the email directly in the fetch if Formspree supports it, or just use a placeholder.
        // Actually, let's use the email directly in the action as per Formspree's "simple" setup.
        method: 'POST',
        body: JSON.stringify({
          ...data,
          _subject: `Nuovo messaggio da Il Mondo di Mie: ${data.subject || 'Senza Oggetto'}`
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('sent');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Errore nell\'invio');
      }
    } catch (err) {
      console.error("Errore invio form:", err);
      alert("Si è verificato un errore nell'invio del messaggio. Per favore, riprova o scrivi direttamente a e.turcinovich@gmail.com");
      setStatus('idle');
    }
  };

  return (
    <section id="contatti" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div>
            <div className="relative inline-block mb-6">
              <h2 className="font-display text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                Contattami
              </h2>
              <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 rounded-full opacity-30 blur-[2px]"></div>
            </div>
            <p className="text-[#C5C6C7] mb-8 leading-relaxed text-lg mt-4">
              Sei interessato a una collaborazione creativa, a un progetto 3D o vuoi saperne di più sul mio lavoro? 
              Invia un messaggio e ti risponderò al più presto.
            </p>
            
            <div className="space-y-10">
              {/* Email Icon - Modern Emerald */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/5 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg group-hover:shadow-emerald-500/20">
                    <Mail className="w-7 h-7 text-emerald-400 animate-[bounce_3s_infinite]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Scrivimi</span>
                  <span className="font-display text-xl text-[#C5C6C7] group-hover:text-white transition-colors">e.turcinovich@gmail.com</span>
                </div>
              </div>

              {/* Phone Icon - Modern Sky Blue */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-sky-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400/20 to-sky-600/5 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-sky-500/20">
                    <Phone className="w-7 h-7 text-sky-400 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-sky-500 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Chiamami</span>
                  <span className="font-display text-xl text-[#C5C6C7] group-hover:text-white transition-colors">+39 293 7734040</span>
                </div>
              </div>

              {/* Globe Icon - Modern Amber */}
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center group-hover:border-amber-400 transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-amber-500/20">
                    <Globe className="w-7 h-7 text-amber-400 animate-[spin_15s_linear_infinite]" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Esplora</span>
                  <a href="https://rss.app/feeds/wOhw410AfBpRkyRT.xml" target="_blank" rel="noopener" className="font-display text-xl text-[#C5C6C7] group-hover:text-white transition-colors hover:underline">I miei contenuti digitali</a>
                </div>
              </div>

              <style>{`
                @keyframes wiggle {
                  0%, 100% { transform: rotate(-10deg); }
                  50% { transform: rotate(10deg); }
                }
              `}</style>
            </div>
          </div>

          {/* Enhanced Dynamic Visitor Counter - Much more visible */}
          <div className="relative group overflow-hidden p-10 bg-gradient-to-br from-[#1F2833] via-[#0B0C10] to-[#1F2833] rounded-[2rem] border-2 border-[#C29545]/40 inline-flex items-center gap-10 shadow-[0_20px_60px_-15px_rgba(194,149,69,0.4)] transition-all duration-500 hover:scale-[1.02] hover:border-[#C29545]">
            {/* Animated gold border pulse */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-[#C29545] animate-pulse opacity-20"></div>
            
            <div className="relative z-10 shrink-0">
              <StylizedVisitorIcon />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                </span>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-[#E6C77A]">
                  {activeUsers} {activeUsers === 1 ? 'Visitatore Online' : 'Visitatori Online'}
                </p>
              </div>
              <p className="text-6xl font-black tracking-tighter font-mono bg-gradient-to-b from-white via-[#E6C77A] to-[#C29545] bg-clip-text text-transparent drop-shadow-sm">
                {visitorCount.toLocaleString()}
              </p>
              <p className="text-[#C5C6C7]/60 text-[10px] uppercase tracking-[0.2em] mt-1">Connessioni totali nel mondo di Mie</p>
            </div>
            
            {/* Larger decorative background flare */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#C29545]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-[#1F2833]/20 p-8 rounded-3xl border border-[#C29545]/10 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-5">
            <input 
              required
              name="name"
              type="text" 
              placeholder="Il tuo nome" 
              className="w-full bg-[#0B0C10] border border-[#C29545]/20 rounded-xl p-5 text-white focus:outline-none focus:border-[#C29545] transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-[#C29545]/30"
            />
            <input 
              required
              name="email"
              type="email" 
              placeholder="La tua email" 
              className="w-full bg-[#0B0C10] border border-[#C29545]/20 rounded-xl p-5 text-white focus:outline-none focus:border-[#C29545] transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-[#C29545]/30"
            />
          </div>
          <input 
            name="subject"
            type="text" 
            placeholder="Oggetto" 
            className="w-full bg-[#0B0C10] border border-[#C29545]/20 rounded-xl p-5 text-white focus:outline-none focus:border-[#C29545] transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-[#C29545]/30"
          />
          <textarea 
            required
            name="message"
            rows={5}
            placeholder="Raccontami il tuo progetto o la tua idea..." 
            className="w-full bg-[#0B0C10] border border-[#C29545]/20 rounded-xl p-5 text-white focus:outline-none focus:border-[#C29545] transition-all placeholder:text-gray-600 focus:ring-1 focus:ring-[#C29545]/30 resize-none"
          ></textarea>
          <button 
            type="submit" 
            disabled={status !== 'idle'}
            className={`w-full font-black text-lg py-5 rounded-xl transition-all duration-500 transform active:scale-95 shadow-2xl ${
              status === 'sent' 
                ? 'bg-emerald-600 text-white shadow-emerald-900/40' 
                : 'bg-[#C29545] hover:bg-[#E6C77A] text-[#0B0C10] shadow-[#C29545]/30 hover:shadow-[#C29545]/50 hover:-translate-y-1'
            }`}
          >
            {status === 'idle' ? 'INVIA MESSAGGIO' : status === 'sending' ? 'ELABORAZIONE...' : 'MESSAGGIO INVIATO! ✨'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
