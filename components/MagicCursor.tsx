import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const MagicCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isText, setIsText] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for core
  const coreX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.1 });
  const coreY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.1 });
  
  // Slower spring for aura and runes
  const auraX = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.6 });
  const auraY = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.6 });
  
  // Even slower spring for deep shadow trail
  const shadowX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 1.5 });
  const shadowY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 1.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      const isTextElement = 
        target.tagName.toLowerCase() === 'p' ||
        target.tagName.toLowerCase() === 'h1' ||
        target.tagName.toLowerCase() === 'h2' ||
        target.tagName.toLowerCase() === 'h3' ||
        target.tagName.toLowerCase() === 'h4' ||
        target.tagName.toLowerCase() === 'span' ||
        window.getComputedStyle(target).cursor === 'text';

      setIsHovered(isInteractable);
      setIsText(!isInteractable && isTextElement);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, .cursor-pointer, p, h1, h2, h3, h4, span {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* Deep Shadow Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: shadowX, y: shadowY }}
      >
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-black/60 blur-3xl opacity-70" />
        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[#06b6d4]/10 blur-2xl animate-pulse" />
      </motion.div>

      {/* Aura representing Lunar/Gold Magic */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: auraX, y: auraY }}
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 1.5 : 1,
          opacity: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-12 -left-12 flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-[#1e293b]/50 blur-2xl" />
          <div className={`absolute w-14 h-14 rounded-full blur-xl transition-colors duration-500 ${isHovered ? 'bg-[#c29545]/40' : 'bg-[#e2e8f0]/15'}`} />
        </div>
      </motion.div>

      {/* Runic / Ethereal Ring on Hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: auraX, y: auraY }}
        animate={{
          rotate: isHovered ? 180 : 0,
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        <svg width="64" height="64" viewBox="0 0 100 100" className="absolute -top-[32px] -left-[32px] animate-[spin_6s_linear_infinite]">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#c29545" strokeWidth="1" strokeDasharray="4 6 12 6" className="opacity-80" />
          <defs>
             <linearGradient id="runeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#c29545" />
               <stop offset="100%" stopColor="#06b6d4" />
             </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="38" fill="none" stroke="url(#runeGrad)" strokeWidth="0.5" strokeDasharray="20 10" className="opacity-50 animate-[spin_8s_linear_infinite_reverse]" />
          <path d="M50 5 L50 15 M50 95 L50 85 M5 50 L15 50 M95 50 L85 50" stroke="#e2e8f0" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Click Explosion Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: coreX, y: coreY }}
      >
        <AnimatePresence>
          {isClicking && (
             <motion.div
               initial={{ scale: 0, opacity: 1 }}
               animate={{ scale: 2.5, opacity: 0 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="absolute -top-8 -left-8 w-16 h-16 rounded-full border-2 border-[#c29545] shadow-[0_0_20px_rgba(194,149,69,0.8)] mix-blend-screen"
             />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Core Fantasy Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] drop-shadow-[0_0_10px_rgba(194,149,69,0.5)]"
        style={{ x: coreX, y: coreY }}
        animate={{
          rotate: isClicking ? -10 : 0,
          scale: isClicking ? 0.75 : 0.85,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        {isText ? (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            className="absolute -top-4 -left-[1px] w-[2px] h-8 bg-gradient-to-b from-[#e2e8f0] via-[#c29545] to-[#e2e8f0] shadow-[0_0_15px_#c29545]"
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#06b6d4] rounded-full blur-[2px]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#06b6d4] rounded-full blur-[2px]" />
          </motion.div>
        ) : (
          <div className="relative">
             <svg width="40" height="40" viewBox="0 0 40 40" className="absolute -top-[2px] -left-[2px] overflow-visible">
               <defs>
                 <linearGradient id="primaryArrow" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#e8c37d" stopOpacity="1" />
                   <stop offset="40%" stopColor="#c29545" stopOpacity="0.9" />
                   <stop offset="100%" stopColor="#050a15" stopOpacity="0.8" />
                 </linearGradient>
                 <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                   <stop offset="100%" stopColor="#c29545" stopOpacity="0" />
                 </linearGradient>
                 <filter id="fantasyGlow" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="1.5" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
               </defs>
               
               {/* Ambient back shadow */}
               <path d="M 2 2 L 12 34 L 17 19 L 32 14 Z" fill="rgba(0,0,0,0.6)" filter="blur(4px)" transform="translate(2, 4)" />
               
               {/* Main Arrow Body */}
               <path 
                 d="M 2 2 L 12 34 L 17 19 L 32 14 Z" 
                 fill="url(#primaryArrow)" 
                 stroke="#e2e8f0" 
                 strokeWidth="1"
                 strokeLinejoin="round"
                 filter="url(#fantasyGlow)"
               />
               
               {/* Runic Line */}
               <path d="M 5 6 L 15 17" stroke="url(#innerGlow)" strokeWidth="1.5" strokeLinecap="round" />
               <path d="M 15 17 L 18 25 M 15 17 L 25 18" stroke="#06b6d4" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
               
               {/* Core Energy Dot */}
               <circle cx="15" cy="17" r="2.5" fill="#ffffff" filter="url(#fantasyGlow)" />
               <circle cx="15" cy="17" r="1.5" fill="#06b6d4" />
               
               {/* Hover specific paths (energy expansion) */}
               <AnimatePresence>
                  {isHovered && (
                     <motion.path 
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: 1 }}
                       exit={{ pathLength: 0, opacity: 0 }}
                       d="M 2 2 L -4 10 M 2 2 L 10 -4" 
                       stroke="#c29545" strokeWidth="1" strokeLinecap="round"
                       className="origin-[2px_2px]"
                     />
                  )}
               </AnimatePresence>
             </svg>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default MagicCursor;

