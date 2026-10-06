import React, { useState } from 'react';
import { motion } from 'motion/react';

export const ClimoraResearchFolder: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Files come out on hover or click/tap; clicking toggles open state
  const showFiles = isOpen || isHovered;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Climora Research Folder. Click or hover to open files."
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-[570/425] w-[210px] sm:w-[235px] md:w-[255px] cursor-pointer select-none -translate-y-[10px] group focus:outline-none"
    >
      {/* 1. Folder Back (Back plate & center-top tab) */}
      <img
        src="/climora-back-570.png"
        alt="Climora folder back"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
      />

      {/* 2. Three Files Fanning Out (Clean flat white, no shadow, no shiny effect) */}
      <motion.div
        initial={false}
        animate={
          showFiles
            ? {
                y: 0,
                scale: 1,
                opacity: 1,
              }
            : {
                y: '42%',
                scale: 0.92,
                opacity: 0,
              }
        }
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          mass: 0.8,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 origin-bottom"
      >
        <img
          src="/climora-cards-570.png"
          alt="Climora research files"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* 3. Folder Front Pocket (Front cover with signature white slash) */}
      <img
        src="/climora-front-570.png"
        alt="Climora folder front"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30"
      />
    </div>
  );
};
