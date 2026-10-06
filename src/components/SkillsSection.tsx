import React from 'react';
import { motion } from 'motion/react';
import { SKILLS_LIST } from '../data';

export const SkillsSection: React.FC = () => {
  // Determine custom pill/circle dimensions tailored to skill name length for balanced layout across 1216px container
  const getPillDimensions = (skill: string) => {
    const len = skill.length;
    if (len <= 2) {
      // Near-circular / Circle for single & 2-letter skills like C, OS, CN
      return "w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] md:w-[104px] md:h-[104px] rounded-full aspect-square px-2";
    }
    if (len <= 4) {
      // Compact oval capsule
      return "h-[88px] sm:h-[96px] md:h-[104px] rounded-full px-7 sm:px-8 md:px-9 min-w-[128px] sm:min-w-[140px] md:min-w-[152px]";
    }
    if (len <= 7) {
      // Medium stadium capsule
      return "h-[88px] sm:h-[96px] md:h-[104px] rounded-full px-8 sm:px-9 md:px-11 min-w-[165px] sm:min-w-[185px] md:min-w-[200px]";
    }
    if (len <= 11) {
      // Elongated stadium capsule
      return "h-[88px] sm:h-[96px] md:h-[104px] rounded-full px-9 sm:px-11 md:px-13 min-w-[205px] sm:min-w-[230px] md:min-w-[250px]";
    }
    // Extra elongated capsule for multi-word skills (Web Development, Cloud Computing, Operating System)
    return "h-[88px] sm:h-[96px] md:h-[104px] rounded-full px-10 sm:px-12 md:px-15 min-w-[245px] sm:min-w-[280px] md:min-w-[315px]";
  };

  return (
    <section id="skills" className="pt-20 md:pt-28 pb-8 md:pb-12 px-4 sm:px-8 md:px-[40px] w-full border-t border-neutral-800/80 relative">
      <div className="w-full max-w-[1216px] mx-auto flex flex-col">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono-code text-[#c01e1e] text-[20px] font-medium tracking-wide lowercase block mb-2">
            skills
          </span>
          <h2 className="text-[40px] sm:text-[52px] md:text-[64px] font-bold tracking-tight text-white uppercase font-inter leading-none">
            SKILLS
          </h2>
        </div>

        {/* Outer Skills Box - 1216px Width matching Certificate Pegboard */}
        <div className="w-full max-w-[1216px] mx-auto flex flex-col items-center">
          {/* Hover Around label directly above the top border before curve */}
          <div className="w-full flex justify-end pr-8 sm:pr-12 md:pr-14 mb-1.5 sm:mb-2">
            <p className="text-neutral-400/90 text-xs sm:text-[13px] font-mono-code tracking-normal select-none leading-none">
              Hover Around
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '1216px' }}
            className="w-full min-h-[560px] md:min-h-[900px] bg-[#131313] border border-[#262626] rounded-3xl sm:rounded-[40px] md:rounded-[48px] px-6 sm:px-10 md:px-12 py-8 sm:py-12 md:py-14 relative flex items-center justify-center overflow-hidden"
          >
            {/* Dynamic Pill/Capsule Skills Grid & Flex Wrap */}
            <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mx-auto">
              {SKILLS_LIST.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  className={`group bg-[#131313] hover:bg-[#131313] border-[1.5px] border-transparent hover:border-[#c01e1e] transition-all duration-200 cursor-pointer select-none flex items-center justify-center ${getPillDimensions(skill)}`}
                >
                  <span className="text-[#131313] group-hover:text-white font-inter font-semibold text-[20px] md:text-[21px] whitespace-nowrap leading-none select-none tracking-tight text-center transition-colors duration-200">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



