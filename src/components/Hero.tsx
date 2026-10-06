import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface HeroProps {
  isMenuOpen?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isMenuOpen = false }) => {
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 900);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track window scroll
  const { scrollY } = useScroll();

  // As the user scrolls and the About Me section rises from bottom to top (0 to 100vh),
  // RISHAV TANDON and CS ENGINEER progressively scale down until completely shrunk to 0 at top of viewport
  const nameScale = useTransform(scrollY, [0, vh * 0.35, vh * 0.98], [1, 0.7, 0]);
  const nameOpacity = useTransform(scrollY, [0, vh * 0.35, vh * 0.95], [1, 0.75, 0]);
  const nameY = useTransform(scrollY, [0, vh], [0, -40]);
  const nameFilter = useTransform(scrollY, [0, vh * 0.5, vh * 0.95], ['blur(0px)', 'blur(1px)', 'blur(6px)']);

  // CS ENGINEER slides and shrinks gracefully along with the name
  const csY = useTransform(scrollY, [0, vh * 0.5], [0, -45]);
  const csScale = useTransform(scrollY, [0, vh * 0.35, vh * 0.98], [1, 0.65, 0]);
  const csOpacity = useTransform(scrollY, [0, vh * 0.3, vh * 0.9], [1, 0.6, 0]);

  return (
    <section 
      id="hero"
      className="sticky top-0 h-[100dvh] w-full z-0 flex flex-col items-center justify-center text-center px-4 bg-[#131313] transition-all duration-300 overflow-hidden"
    >
      <motion.div 
        animate={{ y: isMenuOpen ? 140 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1232px] mx-auto flex flex-col items-center justify-center select-none"
      >
        {/* Main Name in Jersey 10 Typography - shrinks down to 0 on scroll */}
        <motion.div 
          style={{ 
            opacity: nameOpacity, 
            scale: nameScale, 
            y: nameY,
            filter: nameFilter 
          }}
          className="relative z-20 w-full flex items-center justify-center will-change-transform origin-center"
        >
          <motion.h1 
            id="hero-name"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="w-full font-jersey font-normal text-[52px] sm:text-[84px] md:text-[108px] lg:text-[128px] text-white uppercase leading-none tracking-[8px] sm:tracking-[16px] lg:tracking-[26px] flex items-center justify-center text-center pl-[8px] sm:pl-[16px] lg:pl-[26px]"
          >
            {PERSONAL_INFO.name}
          </motion.h1>
        </motion.div>

        {/* Subtitle "CS ENGINEER" Container with synchronized shrink */}
        <div className="relative z-10 w-full flex items-center justify-center overflow-hidden pt-3 sm:pt-4">
          <motion.div
            style={{ 
              y: csY, 
              opacity: csOpacity, 
              scale: csScale 
            }}
            className="origin-center flex items-center justify-center will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 2.4, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 1.2 
              }}
              className="origin-center overflow-hidden flex items-center justify-center"
            >
              <motion.h2 
                id="hero-subtitle"
                initial={{ letterSpacing: '0px' }}
                animate={{ letterSpacing: '12.8px' }}
                transition={{ 
                  duration: 2.4, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 1.2 
                }}
                className="font-mono-code font-bold text-[#b91c1c] text-[20px] sm:text-[26px] md:text-[30px] lg:text-[36px] leading-tight uppercase select-none pl-[4px] sm:pl-[8px] lg:pl-[12.8px] text-center whitespace-nowrap"
              >
                CS ENGINEER
              </motion.h2>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};


