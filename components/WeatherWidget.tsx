
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
  const [locationName, setLocationName] = useState<string>("Localizzazione in corso...");
  const [weatherData, setWeatherData] = useState<{ temp: string; desc: string; condition: WeatherCondition; isDay: boolean } | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // Fetch city name
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=it`);
        const geoData = await geoRes.json();
        const city = geoData.city || geoData.locality || geoData.principalSubdivision || "La tua posizione";
        setLocationName(city);

        // Fetch weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherJson = await weatherRes.json();
        const current = weatherJson.current_weather;
        
        let condition: WeatherCondition = 'sunny';
        let desc = 'Soleggiato';
        
        const isDay = current.is_day === 1;
        const code = current.weathercode;
        
        if (code === 0 || code === 1) {
          condition = isDay ? 'sunny' : 'clear-night';
          desc = isDay ? 'Soleggiato' : 'Notte Stellata';
        } else if (code === 2 || code === 3 || code === 45 || code === 48) {
          condition = 'cloudy';
          desc = 'Nuvoloso';
        } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) {
          condition = 'rainy';
          desc = 'Pioggia';
        } else if (code >= 71 && code <= 86) {
          condition = 'cloudy';
          desc = 'Neve / Coperto';
        }

        setWeatherData({
          temp: `${Math.round(current.temperature)}°C`,
          desc,
          condition,
          isDay
        });
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        // Fallback
        setLocationName("Roma");
        setWeatherData({ temp: '22°C', desc: 'Soleggiato', condition: 'sunny', isDay: true });
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to Rome if permission denied or error
          fetchWeather(41.9028, 12.4964);
        }
      );
    } else {
      // Fallback to Rome if geolocation not supported
      fetchWeather(41.9028, 12.4964);
    }
  }, []);

  const isDay = weatherData ? weatherData.isDay : (currentTime.getHours() >= 6 && currentTime.getHours() < 20);
  const bgGradient = isDay 
    ? 'from-[#0B0C10] via-[#1A3A5F] to-[#0B0C10]' 
    : 'from-[#0B0C10] via-[#0D1B2A] to-[#0B0C10]';

  return (
    <section id="meteo" className={`py-16 bg-gradient-to-b ${bgGradient} border-y border-[#C29545]/20 transition-colors duration-1000 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="heading-h2 text-3xl md:text-5xl mb-8">METEO</h2>
        
        <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-[#0B1020]/80 backdrop-blur-xl border border-gold/30 p-10 rounded-none shadow-[0_0_50px_rgba(200,166,110,0.1)] relative overflow-hidden group min-h-[200px] min-w-[300px] justify-center glass-card">
          {weatherData ? (
            <>
              {/* Decorative ambient glow */}
              <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] transition-colors duration-1000 ${isDay ? 'bg-gold/20' : 'bg-shadow/40'}`}></div>
              
              <div className="relative z-10">
                <StylizedIcon condition={weatherData.condition} />
              </div>
              
              <div className="text-center md:text-left relative z-10 flex flex-col justify-center">
                <span className="text-goldpale/70 uppercase tracking-widest text-xs font-bold mb-2">
                  {locationName}
                </span>
                <p className="font-display text-6xl text-goldpale tracking-wider mb-1 drop-shadow-[0_0_15px_rgba(242,233,201,0.5)]">
                  {weatherData.temp}
                </p>
                <div className="flex flex-col">
                  <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold">
                    {weatherData.desc}
                  </span>
                  <span className="text-fog/50 text-xs mt-2 font-mono uppercase">
                    Aggiornato alle {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gold animate-pulse font-display tracking-widest">Analisi atmosferica in corso...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
