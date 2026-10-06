import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { EXPERIENCES } from '../data';
import { CertificateGraphic } from './CertificateViews';
import { ExperienceItem } from '../types';
import SpecularButton from './SpecularButton';

interface ExperienceSectionProps {
  onSelectExperience: (item: ExperienceItem) => void;
  onOpenCertificateImage?: (imageSrc: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  onSelectExperience,
  onOpenCertificateImage 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Gentle, smooth spring physics for slow and fluid glide between cards
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 26,
    damping: 34,
    mass: 1.4,
    restDelta: 0.0001
  });

  // Slow horizontal scroll progression:
  // Card 1 Stay (0.00 -> 0.08): Brief start so Card 1 initiates transition promptly
  // Slow Smooth Slide (0.08 -> 0.78): Wide track window so sliding between Card 1 and Card 2 is slow, gradual, and smooth
  // Card 2 Stay (0.78 -> 1.00): Comfortable resting plateau for Card 2
  const card1X = useTransform(smoothProgress, [0.0, 0.08, 0.78, 1.0], ['0%', '0%', '-100%', '-100%']);
  const card2X = useTransform(smoothProgress, [0.0, 0.08, 0.78, 1.0], ['100%', '100%', '0%', '0%']);

  const exp1 = EXPERIENCES[0]; // Bluestock Fintech
  const exp2 = EXPERIENCES[1]; // AICTE-IBM SkillsBuild

  const renderCardContent = (exp: ExperienceItem, isReversed: boolean = false) => {
    const textContent = (
      <div className="lg:col-span-7 flex flex-col justify-start">
        {/* Role & Company Heading */}
        <div className="mb-5 sm:mb-6">
          <span className="font-mono-code text-[#c01e1e] text-[16px] font-medium tracking-wide uppercase block mb-3 sm:mb-4">
            {exp.role}
          </span>
          <h3 className="font-inter font-bold text-[28px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-white uppercase tracking-tight leading-[1.05]">
            {exp.company}
          </h3>
        </div>

        {/* Detailed Experience Description */}
        <p className="font-inter font-normal text-[16px] sm:text-[18px] md:text-[19px] text-justify text-[#b5b5b5] leading-[1.6] mb-6 sm:mb-7">
          {exp.description}
        </p>

        {/* Specular Metadata Badges (Display Only) & Certificate Action */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] sm:text-[12px]">
          <SpecularButton
            size="md"
            radius={0}
            tint="#000000"
            tintOpacity={1}
            blur={0}
            textColor="#ffffff"
            lineColor="#B71C1C"
            baseColor="#262626"
            intensity={1.2}
            shineSize={10}
            shineFade={40}
            thickness={1.5}
            speed={1}
            followMouse={false}
            proximity={250}
            autoAnimate={false}
            className="font-mono tracking-wider uppercase text-[11px] sm:text-[12px] cursor-default select-none pointer-events-none"
          >
            <span className="text-white font-medium">{exp.location}</span>
          </SpecularButton>

          <SpecularButton
            size="md"
            radius={0}
            tint="#000000"
            tintOpacity={1}
            blur={0}
            textColor="#ffffff"
            lineColor="#B71C1C"
            baseColor="#262626"
            intensity={1.2}
            shineSize={10}
            shineFade={40}
            thickness={1.5}
            speed={1}
            followMouse={false}
            proximity={250}
            autoAnimate={false}
            className="font-mono tracking-wider uppercase text-[11px] sm:text-[12px] cursor-default select-none pointer-events-none"
          >
            <span className="text-white font-medium">{exp.period}</span>
          </SpecularButton>

          {exp.id === 'bluestock' || (exp.certificatePdf && (exp.certificatePdf.endsWith('.png') || exp.certificatePdf.endsWith('.jpeg') || exp.certificatePdf.endsWith('.jpg'))) ? (
            <button
              onClick={() => onOpenCertificateImage?.(exp.certificatePdf || '/po.png')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-[13px] sm:text-[14px] tracking-[0.12em] uppercase rounded-none transition-colors duration-200 cursor-pointer select-none active:scale-[0.98] inline-flex items-center justify-center shadow-sm"
            >
              VIEW CERTIFICATE
            </button>
          ) : exp.certificatePdf ? (
            <a
              href={exp.certificatePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-[13px] sm:text-[14px] tracking-[0.12em] uppercase rounded-none transition-colors duration-200 cursor-pointer select-none active:scale-[0.98] inline-flex items-center justify-center shadow-sm"
            >
              VIEW CERTIFICATE
            </a>
          ) : (
            <button
              onClick={() => onSelectExperience(exp)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-[13px] sm:text-[14px] tracking-[0.12em] uppercase rounded-none transition-colors duration-200 cursor-pointer select-none active:scale-[0.98] inline-flex items-center justify-center shadow-sm"
            >
              VIEW CERTIFICATE
            </button>
          )}
        </div>
      </div>
    );

    const isAicte = exp.id === 'aicte-ibm';
    const isBluestock = exp.id === 'bluestock';
    const imageWidth = isAicte ? 348 : (isBluestock ? 686 : 600);
    const imageHeight = isAicte ? 330 : (isBluestock ? 485 : 420);
    const imgSrc = exp.imageUrl || (isAicte ? '/work-exp-aicte.png' : '/work-exp-bluestock.png');

    const imageContent = (
      <div 
        className={`lg:col-span-5 flex ${isReversed ? 'justify-start' : 'justify-start lg:justify-end'} w-full`}
      >
        <div className="w-full max-w-[480px] rounded-xl overflow-hidden bg-[#131313] flex items-center justify-center group cursor-default transition-shadow duration-500 hover:shadow-2xl">
          <img 
            src={imgSrc}
            alt={`${exp.company} Work Experience`}
            width={imageWidth}
            height={imageHeight}
            className="w-full h-auto object-contain block select-none rounded-xl transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
            style={{
              aspectRatio: `${imageWidth} / ${imageHeight}`,
              maxWidth: `${imageWidth}px`,
            }}
          />
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full h-full">
        {isReversed ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    );
  };

  return (
    <section id="experience" className="pt-20 md:pt-28 pb-16 px-[40px] w-full border-t border-neutral-800/80 bg-[#131313] relative z-20">
      {/* Section Header */}
      <div className="mb-2 sm:mb-3 max-w-7xl mx-auto">
        <div className="pt-1">
          <span className="font-mono-code text-[#c01e1e] text-[18px] sm:text-[20px] font-medium tracking-wide lowercase block mb-2">
            work
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase font-inter leading-none">
            EXPERIENCE
          </h2>
        </div>
      </div>

      {/* Scroll Pinning Stage for Experiential Cards */}
      <div ref={containerRef} className="relative h-[600vh] max-w-7xl mx-auto mt-1 sm:mt-2">
        {/* Sticky Viewport Container */}
        <div className="sticky top-[60px] sm:top-[72px] w-full h-[600px] sm:h-[550px] lg:h-[500px] overflow-hidden">
          {/* Card 1: Bluestock Fintech (Slides left out of frame from 0% to -100%) */}
          {exp1 && (
            <motion.div
              style={{ x: card1X }}
              className="absolute inset-0 w-full h-full bg-[#131313] px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 flex items-start sm:items-center z-10"
            >
              {renderCardContent(exp1)}
            </motion.div>
          )}

          {/* Card 2: AICTE-IBM SkillsBuild (Slides in from the right from 100% to 0%) */}
          {exp2 && (
            <motion.div
              style={{ x: card2X }}
              className="absolute inset-0 w-full h-full bg-[#131313] px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 flex items-start sm:items-center z-20"
            >
              {renderCardContent(exp2, true)}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

