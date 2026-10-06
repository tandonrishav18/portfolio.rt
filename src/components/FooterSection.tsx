import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import PixelTransition from './PixelTransition/PixelTransition';

const ROTATING_WORDS = ['WORK', 'DEVELOP', 'BUILD', 'CREATE'];

interface FooterSectionProps {
  onOpenResume: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenResume }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer 
      id="contact" 
      className="w-full min-h-screen min-h-[100dvh] bg-[#000000] text-white select-none px-6 sm:px-10 md:px-[40px] flex flex-col justify-between relative z-10 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-[22px] sm:pb-[30px] md:pb-[38px]"
    >
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between gap-10 sm:gap-12 relative font-inter">
        {/* Main Content Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10 md:gap-0">
          {/* Left Column: Heading -> Available Subtitle -> Check Resume Button -> Contact Info */}
          <div className="flex flex-col items-start max-w-xl mt-2 sm:mt-4 md:mt-[21px] lg:mt-[50.5px]">
            {/* Main Headline: LET'S in Inter, Rotating Words in Jersey 10 with 3px letter spacing */}
            <h2 className="text-[34px] sm:text-[44px] md:text-[48px] font-bold font-inter text-white uppercase leading-none inline-flex items-baseline gap-3.5 sm:gap-4.5 md:gap-5 whitespace-nowrap">
              <span className="tracking-[3px]" style={{ letterSpacing: '3px' }}>LET’S</span>
              <span className="inline-block overflow-hidden relative align-baseline h-[1.25em] text-[#c01e1e]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                    className="inline-block text-[#c01e1e] leading-none font-jersey font-normal text-[46px] sm:text-[58px] md:text-[66px] tracking-[3px]"
                    style={{ letterSpacing: '3px' }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            {/* Subtitle: INTER SIZE 20 REGULAR */}
            <p className="text-white text-[15px] sm:text-[18px] md:text-[20px] font-normal font-inter tracking-[0.06em] uppercase mt-3 sm:mt-3.5">
              AVAILABLE FOR WORK !
            </p>

            {/* Check Resume Button: 191x47 hug -> External Google Drive Link */}
            <div className="mt-11 sm:mt-14">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[191px] h-[47px] inline-flex items-center justify-center bg-white hover:bg-[#c01e1e] text-black hover:text-white font-semibold font-inter text-[16px] tracking-normal uppercase rounded-[6px] transition-all duration-200 active:scale-95 cursor-pointer shadow-sm select-none"
              >
                CHECK RESUME
              </a>
            </div>

            {/* Email & Phone Contact Info */}
            <div className="mt-11 sm:mt-14 space-y-1.5 text-xs sm:text-[14px] font-inter">
              <p>
                <span className="text-white font-semibold">Email :</span>{' '}
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="text-white font-semibold hover:text-[#c01e1e] transition-colors duration-200"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>
                <span className="text-white font-semibold">Phone :</span>{' '}
                <a 
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} 
                  className="text-white font-semibold hover:text-[#c01e1e] transition-colors duration-200"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: PixelTransition Card -> Connect With Me on -> Social Icons */}
          <div className="flex flex-col items-start md:items-end gap-5 sm:gap-6 self-start md:self-auto mt-16 sm:mt-20 md:mt-[110px] lg:mt-[150px]">
            {/* PixelTransition Card Effect (Exact 248x272 dimensions) */}
            <div className="w-[248px] h-[272px] relative">
              <PixelTransition
                firstContent={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#000000"
                    }}
                  >
                    <p 
                      className="font-jersey font-normal select-none antialiased text-[52px] sm:text-[52px]"
                      style={{ 
                        fontFamily: '"Jersey 10", "Silkscreen", monospace',
                        fontWeight: 400, 
                        color: "#ffffff",
                        letterSpacing: "0.02em",
                        lineHeight: "1"
                      }}
                    >
                      Bonjour!
                    </p>
                  </div>
                }
                secondContent={
                  <img
                    src="/namaste-photo.jpg"
                    alt="Photo"
                    referrerPolicy="no-referrer"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                }
                gridSize={9}
                pixelColor="#ffffff"
                animationStepDuration={0.6}
                aspectRatio=""
                style={{ width: '248px', height: '272px' }}
                className="w-[248px] h-[272px] cursor-pointer"
              />
            </div>

            <span className="text-[16px] text-neutral-300 font-mono-code font-medium tracking-normal uppercase text-left md:text-right">
              CONNECT WITH ME ON
            </span>

            <div className="flex items-center justify-start md:justify-end gap-6 sm:gap-7">
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2.5 text-white group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 40 40" fill="none">
                    <rect
                      width="40"
                      height="40"
                      rx="7"
                      className="fill-[#808080] group-hover:fill-[#3669c9] transition-colors duration-200"
                    />
                    {/* dot of i */}
                    <circle cx="12.4" cy="11.2" r="3.1" fill="white" />
                    {/* stem of i */}
                    <rect x="9.5" y="16.8" width="5.8" height="15" fill="white" />
                    {/* n */}
                    <path
                      d="M18.8 16.8h5.6v2.3h.1c.8-1.5 2.7-2.8 5.5-2.8 5.6 0 6.8 3.7 6.8 8.4V31.8h-5.8v-7.5c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4v7.6h-5.8V16.8z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-[14px] font-mono-code font-medium text-neutral-400 group-hover:text-white uppercase transition-colors duration-200">
                  LINKEDIN
                </span>
              </a>

              {/* Instagram */}
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2.5 text-white group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 40 40" fill="none">
                    <defs>
                      <linearGradient id="ig-grad-border" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ba3175" />
                        <stop offset="50%" stopColor="#c53965" />
                        <stop offset="100%" stopColor="#d67035" />
                      </linearGradient>
                    </defs>
                    {/* Outer rounded box border */}
                    <rect
                      x="3.2"
                      y="3.2"
                      width="33.6"
                      height="33.6"
                      rx="9.5"
                      className="stroke-[#8e8e8e] group-hover:stroke-[url(#ig-grad-border)] transition-all duration-200"
                      strokeWidth="3.6"
                    />
                    {/* Top right flash dot */}
                    <circle
                      cx="28.4"
                      cy="11.6"
                      r="2.5"
                      className="fill-[#8e8e8e] group-hover:fill-[#ba3175] transition-all duration-200"
                    />
                    {/* Center solid camera circle */}
                    <circle
                      cx="20"
                      cy="20"
                      r="7.8"
                      className="fill-[#8e8e8e] group-hover:fill-[#e028b0] transition-all duration-200"
                    />
                  </svg>
                </div>
                <span className="text-[14px] font-mono-code font-medium text-neutral-400 group-hover:text-white uppercase transition-colors duration-200">
                  INSTAGRAM
                </span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2.5 text-white group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 40 40">
                    {/* Background circle badge */}
                    <circle
                      cx="20"
                      cy="20"
                      r="19.5"
                      className="fill-[#9e9e9e] group-hover:fill-[#add963] transition-colors duration-200"
                    />
                    {/* White Octocat Silhouette */}
                    <path
                      fill="white"
                      d="M20 7.5c-6.9 0-12.5 5.6-12.5 12.5 0 5.5 3.6 10.2 8.5 11.8.6.1.8-.3.8-.6 0-.3 0-1.1 0-2.1-3.5.8-4.2-1.7-4.2-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.8-.3-5.7-1.4-5.7-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3 1-.3 2.1-.4 3.1-.4 1.1 0 2.1.1 3.1.4 2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.3 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.8-2.9 5.9-5.7 6.2.5.4.9 1.2.9 2.3 0 1.7 0 3 0 3.4 0 .3.2.7.8.6 5-1.7 8.5-6.3 8.5-11.8 0-6.9-5.6-12.5-12.5-12.5z"
                    />
                  </svg>
                </div>
                <span className="text-[14px] font-mono-code font-medium text-neutral-400 group-hover:text-white uppercase transition-colors duration-200">
                  GITHUB
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

