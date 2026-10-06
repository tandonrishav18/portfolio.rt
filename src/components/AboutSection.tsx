import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface StatCardProps {
  label: string;
  value: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      className={`bg-[#181818] hover:bg-[#1f1f1f] border border-[#262626] transition-colors duration-200 cursor-pointer select-none flex items-center justify-center px-4 ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isHovered ? 'val' : 'lbl'}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15 }}
          className="font-mono-code text-[14px] tracking-[0.2em] text-[#e0e0e0] text-center font-normal uppercase"
        >
          {isHovered ? value : label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="py-20 md:py-28 px-4 sm:px-8 md:px-[40px] w-full bg-[#131313] border-t border-neutral-800/80"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-16">
        {/* Left Column: Title + Red Underline + Academic Cards */}
        <div className="w-full max-w-[482px] flex-shrink-0 flex flex-col justify-between">
          {/* Section Header */}
          <div className="mb-3 pt-[2px]">
            <span className="font-mono-code text-[#c01e1e] text-[20px] font-medium tracking-wide lowercase block mb-2">
              about
            </span>
            <h2 className="text-6xl sm:text-7xl font-bold tracking-tight text-white uppercase font-inter leading-none">
              ME.
            </h2>
          </div>

          {/* Red line underneath ME. */}
          <div className="h-[2px] bg-[#c01e1e] w-full mb-4" />

          {/* Cards Stack with refined gap spacing */}
          <div className="w-full max-w-[482px] flex-1 min-h-[348px] flex flex-col gap-[6px]">
            {/* Card 1: College */}
            <StatCard 
              label="COLLEGE" 
              value={PERSONAL_INFO.college} 
              className="flex-1"
            />

            {/* Card 2: CGPA */}
            <StatCard 
              label="CGPA" 
              value={PERSONAL_INFO.cgpa} 
              className="flex-1"
            />

            {/* Card 3: Graduating Year */}
            <StatCard 
              label="GRADUATING YEAR" 
              value={PERSONAL_INFO.graduatingYear} 
              className="flex-1"
            />

            {/* Card 4: Class X & Class XII split */}
            <div className="grid grid-cols-2 gap-[6px] w-full flex-1">
              <StatCard 
                label="CLASS X" 
                value={PERSONAL_INFO.classX} 
                className="h-full"
              />
              <StatCard 
                label="CLASS XII" 
                value={PERSONAL_INFO.classXII} 
                className="h-full"
              />
            </div>
          </div>

          {/* Bottom Red Line matching design image */}
          <div className="h-[1.5px] bg-[#c01e1e] w-full mt-4" />
        </div>

        {/* Right Column: Catchphrase in Pixel Typography + Bio */}
        <div className="flex-1 flex flex-col justify-between w-full self-stretch">
          {/* Slogan in exact Jersey 10 font, right aligned, size 44px */}
          <div className="font-jersey text-right select-none leading-[0.98] text-[32px] sm:text-[38px] md:text-[44px] tracking-wide flex flex-col items-end space-y-1">
            <div className="text-white">Just a</div>
            <div className="text-[#b91c1c]">DEVELOPER</div>
            <div className="text-white">curious enough</div>
            <div className="text-white">
              to <span className="text-[#b91c1c]">BUILD</span>
            </div>
            <div className="text-white">anything</div>
            <div className="text-[#b91c1c]">!!</div>
          </div>

          {/* Bio Description Paragraph aligned with left table bottom */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <p className="text-neutral-300 font-inter font-normal text-base sm:text-lg md:text-[20px] leading-relaxed text-justify">
              {PERSONAL_INFO.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
