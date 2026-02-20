
import React, { useState, useEffect, useMemo } from 'react';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'clear-night';

const StylizedIcon: React.FC<{ condition: WeatherCondition }> = ({ condition }) => {
  const iconSize = "w-32 h-32";
  
  switch (condition) {
    case 'sunny':
      return (
        <div className="relative group">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[#C29545] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <svg viewBox="0 0 100 100" className={`${iconSize} relative z-10 drop-shadow-[0_0_15px_rgba(230,199,122,0.5)]`}>
            <defs>
              <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF4D6" />
                <stop offset="40%" stopColor="#E6C77A" />
                <stop offset="100%" stopColor="#C29545" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Sun Rays */}
            <g className="animate-[spin_12s_linear_infinite] origin-center">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <rect
                  key={angle}
                  x="47"
                  y="10"
                  width="6"
                  height="18"
                  rx="3"
                  fill="#C29545"
                  transform={`rotate(${angle} 50 50)`}
                  className="opacity-40"
                />
              ))}
            </g>
            
            {/* Outer Glow Ring */}
            <circle cx="50" cy="50" r="24" fill="none" stroke="#C29545" strokeWidth="0.5" className="animate-pulse opacity-30" />
            
            {/* Sun Core */}
            <circle cx="50" cy="50" r="20" fill="url(#sunGrad)" filter="url(#glow)" className="animate-pulse" />
          </svg>
        </div>
      );
    case 'clear-night':
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-[#BF7B90] rounded-full blur-2xl opacity-10 animate-pulse"></div>
          <svg viewBox="0 0 100 100" className={`${iconSize} relative z-10`}>
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5E6CC" />
                <stop offset="100%" stopColor="#BF7B90" />
              </linearGradient>
            </defs>
            <path
              d="M65,35 A25,25 0 1,1 35,65 A35,35 0 0,0 65,35"
              fill="url(#moonGrad)"
              className="drop-shadow-[0_0_10px_rgba(191,123,144,0.4)]"
            />
            {[ {x:25, y:25, d:0}, {x:75, y:45, d:1}, {x:40, y:80, d:2}, {x:80, y:20, d:1.5}, {x:15, y:60, d:0.5} ].map((star, i) => (
              <circle
                key={i}
                cx={star.x}
                cy={star.y}
                r={i % 2 === 0 ? "1.5" : "1"}
                fill="#E6C77A"
                className="animate-pulse"
                style={{ animationDelay: `${star.d}s`, animationDuration: '2s' }}
              />
            ))}
          </svg>
        </div>
      );
    case 'cloudy':
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl opacity-20"></div>
          <svg viewBox="0 0 100 100" className={`${iconSize} relative z-10`}>
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E6C77A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C29545" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g className="animate-[bounce_5s_ease-in-out_infinite]">
              <path
                d="M30,65 Q20,65 20,55 Q20,45 30,45 Q30,35 40,35 Q50,35 50,45 Q60,45 60,55 Q60,65 50,65 Z"
                fill="#C29545"
                className="opacity-30"
                transform="translate(10, -5)"
              />
              <path
                d="M40,75 Q30,75 30,65 Q30,55 40,55 Q40,45 50,45 Q60,45 60,55 Q70,55 70,65 Q70,75 60,75 Z"
                fill="url(#cloudGrad)"
                className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
              />
            </g>
          </svg>
        </div>
      );
    case 'rainy':
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-2xl opacity-20"></div>
          <svg viewBox="0 0 100 100" className={`${iconSize} relative z-10`}>
            <path
              d="M35,55 Q25,55 25,45 Q25,35 35,35 Q35,25 45,25 Q55,25 55,35 Q65,35 65,45 Q65,55 55,55 Z"
              fill="#C29545"
              className="opacity-40"
            />
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={30 + i * 12}
                y1="60"
                x2={25 + i * 12}
                y2="75"
                stroke="#E6C77A"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-[dash_1.2s_linear_infinite]"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            <style>{`
              @keyframes dash {
                0% { stroke-dasharray: 0, 20; stroke-dashoffset: 0; opacity: 0; }
                50% { stroke-dasharray: 12, 8; stroke-dashoffset: -4; opacity: 0.8; }
                100% { stroke-dasharray: 0, 20; stroke-dashoffset: -16; opacity: 0; }
              }
            `}</style>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const WeatherWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();
  const isDay = hour >= 6 && hour < 20;
  
  // Logic for dynamic conditions
  const weatherData = useMemo(() => {
    if (isDay) {
      if (hour < 10) return { temp: '18°C', desc: 'Alba Dorata', condition: 'sunny' as WeatherCondition };
      if (hour < 17) return { temp: '24°C', desc: 'Soleggiato', condition: 'sunny' as WeatherCondition };
      return { temp: '21°C', desc: 'Tramonto Sereno', condition: 'cloudy' as WeatherCondition };
    } else {
      return { temp: '16°C', desc: 'Notte Stellata', condition: 'clear-night' as WeatherCondition };
    }
  }, [hour, isDay]);

  const bgGradient = isDay 
    ? 'from-[#0B0C10] via-[#1A3A5F] to-[#0B0C10]' 
    : 'from-[#0B0C10] via-[#0D1B2A] to-[#0B0C10]';

  return (
    <section id="meteo" className={`py-16 bg-gradient-to-b ${bgGradient} border-y border-[#C29545]/20 transition-colors duration-1000 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl mb-8 text-white">Orizzonte Roma</h2>
        
        <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-[#1F2833]/40 backdrop-blur-xl border border-[#C29545]/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(194,149,69,0.15)] relative overflow-hidden group">
          {/* Decorative ambient glow */}
          <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] transition-colors duration-1000 ${isDay ? 'bg-[#C29545]/20' : 'bg-[#BF7B90]/10'}`}></div>
          
          <div className="relative z-10">
            <StylizedIcon condition={weatherData.condition} />
          </div>
          
          <div className="text-center md:text-left relative z-10">
            <p className="text-6xl font-bold text-white tracking-tighter mb-1 drop-shadow-md">
              {weatherData.temp}
            </p>
            <div className="flex flex-col">
              <span className="text-[#C29545] uppercase tracking-[0.3em] text-sm font-bold">
                {weatherData.desc}
              </span>
              <span className="text-[#C5C6C7]/40 text-xs mt-2 font-mono uppercase">
                Aggiornato alle {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
