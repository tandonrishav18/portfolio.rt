import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DecryptedText from './DecryptedText';
import Lanyard from './Lanyard/Lanyard';

interface WhatIBringSectionProps {
  onOpenBeyondCode: () => void;
}

export const WhatIBringSection: React.FC<WhatIBringSectionProps> = ({ onOpenBeyondCode }) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <section id="what-i-bring" className="pt-12 md:pt-16 pb-20 md:pb-28 px-4 sm:px-8 md:px-[40px] w-full border-t border-neutral-900/80 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Side: Big Bold Section Title with hanging 3D Lanyard */}
          <div className="lg:col-span-4 lg:sticky lg:top-14 sm:lg:top-16 self-start flex flex-col items-start w-full -mt-2 sm:-mt-4 lg:-mt-6 relative z-40">
            <div className="relative w-full">
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight font-inter uppercase leading-[1.06] relative z-20 select-none">
                WHAT
                <span className="inline-flex flex-col items-center relative ml-3 sm:ml-4 lg:ml-5">
                  <span className="relative z-30 inline-block font-bold select-none leading-none">I</span>
                  {/* 3D Physics Lanyard hanging directly from the bottom of letter I */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] lg:w-[380px] h-[480px] sm:h-[540px] lg:h-[580px] pointer-events-auto z-10 -mt-[9px] select-none">
                    <Lanyard
                      position={[0, 0, 18]}
                      gravity={[0, -40, 0]}
                      fov={20}
                      transparent={true}
                      frontImage="/lanyard-front.png?v=26"
                      backImage="/lanyard-back.png"
                      lanyardWidth={1.4}
                    />
                  </div>
                </span>
                <br />
                BRING
              </h2>
            </div>
          </div>

        {/* Right Side: 4 Clean Stacked Cards with visible gaps and Sticky Scroll-on Overlay Effect */}
        <div className="lg:col-span-8 flex flex-col space-y-[28px] sm:space-y-[32px] md:space-y-[36px] pb-[100vh] items-start w-full relative z-10">
          {/* Card 1: Intelligent Engineering */}
          <div className="sticky top-24 sm:top-28 z-10 w-full min-h-[300px] sm:min-h-[320px] md:min-h-[340px] bg-[#000000] p-6 sm:p-8 md:p-9 relative overflow-hidden flex flex-col justify-start">
            <div className="relative z-10 space-y-3.5 max-w-2xl">
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-[#b91c1c] uppercase font-inter tracking-tight leading-tight">
                INTELLIGENT ENGINEERING
              </h3>
              <p className="text-neutral-300 text-[15px] sm:text-[18px] md:text-[20px] leading-[1.5] font-inter">
                AI, ML, DL, and computer vision - building intelligent systems where data becomes insight, models become decisions, and technology creates impact.
              </p>
            </div>
          </div>

          {/* Card 2: The Stack */}
          <div className="sticky top-24 sm:top-28 z-12 w-full min-h-[300px] sm:min-h-[320px] md:min-h-[340px] bg-[#000000] p-6 sm:p-8 md:p-9 relative overflow-hidden flex flex-col justify-start">
            <div className="relative z-10 space-y-3.5 max-w-2xl">
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-[#b91c1c] uppercase font-inter tracking-tight leading-tight">
                THE STACK
              </h3>
              <p className="text-neutral-300 text-[15px] sm:text-[18px] md:text-[20px] leading-[1.5] font-inter">
                Design led development across the stack, creating thoughtful interfaces, building powerful backends, and connecting experiences through clean, reliable APIs.
              </p>
            </div>
          </div>

          {/* Card 3: Decode Data */}
          <div className="sticky top-24 sm:top-28 z-14 w-full min-h-[300px] sm:min-h-[320px] md:min-h-[340px] bg-[#000000] p-6 sm:p-8 md:p-9 relative overflow-hidden flex flex-col justify-start">
            <div className="relative z-10 space-y-3.5 max-w-2xl">
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-[#b91c1c] uppercase font-inter tracking-tight leading-tight">
                DECODE DATA
              </h3>
              <p className="text-neutral-300 text-[15px] sm:text-[18px] md:text-[20px] leading-[1.5] font-inter">
                Turning raw data into meaningful insights from preprocessing and exploratory analysis to visualization and machine learning, using data to uncover patterns, answer questions, and drive smarter decisions.
              </p>
            </div>
          </div>

          {/* Card 4: More About Me ? */}
          <div 
            id="more-about-me"
            className="sticky top-24 sm:top-28 z-16 w-full min-h-[300px] sm:min-h-[320px] md:min-h-[340px] bg-[#000000] p-6 sm:p-8 md:p-9 relative overflow-hidden flex flex-col justify-start"
          >
            <div className="relative z-10 space-y-5">
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] font-bold text-[#b91c1c] uppercase font-inter tracking-tight leading-tight">
                MORE ABOUT ME ?
              </h3>
              <div className="pt-1">
                <button
                  onClick={onOpenBeyondCode}
                  onMouseEnter={() => setIsBtnHovered(true)}
                  onMouseLeave={() => setIsBtnHovered(false)}
                  className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white font-mono-code font-semibold text-[16px] sm:text-[18px] rounded-[6px] shadow-sm transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2.5 select-none"
                >
                  <DecryptedText
                    text="Beyond the code!"
                    animateOn="inViewHover"
                    isHovered={isBtnHovered}
                    speed={50}
                    maxIterations={20}
                    sequential={true}
                    revealDirection="start"
                  />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};


