import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PUBLICATIONS } from '../data';
import { PublicationItem } from '../types';
import { PaperThumbnail } from './PaperThumbnail';
import SpecularButton from './SpecularButton';

interface PublicationsSectionProps {
  onSelectPublication: (item: PublicationItem) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ onSelectPublication }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Card 2 enters from bottom (100%) to top (0%) as user scrolls from 15% to 75%
  const card2Y = useTransform(scrollYProgress, [0.15, 0.75], ['100%', '0%']);
  const card1Scale = useTransform(scrollYProgress, [0.15, 0.75], [1, 0.98]);
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.75], [1, 0.4]);

  const pub1 = PUBLICATIONS[0];
  const pub2 = PUBLICATIONS[1];

  const renderCardContent = (pub: PublicationItem) => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[100px] items-center w-full h-full">
      {/* Left Side: Metadata & Description */}
      <div className="lg:col-span-7 flex flex-col justify-start">
        {/* Title */}
        <h3 className="font-inter font-bold text-[22px] sm:text-[24px] text-white uppercase tracking-tight leading-snug mb-6 sm:mb-7">
          {pub.title}
        </h3>

        {/* Abstract Description */}
        <p className="font-inter font-normal text-[17px] sm:text-[19px] md:text-[20px] text-justify text-[#b5b5b5] leading-[1.6] mb-6 sm:mb-7">
          {pub.abstract}
        </p>

        {/* Badges (Display Only) */}
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
            <span className="font-bold text-white mr-1.5">JOURNAL</span>
            <span className="text-white">- {pub.journal}</span>
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
            <span className="font-bold text-white mr-1.5">DATE</span>
            <span className="text-white">- {pub.date}</span>
          </SpecularButton>
        </div>
      </div>

      {/* Right Side: Paper Document Thumbnail */}
      <div className="lg:col-span-5 flex justify-start items-center w-full">
        {pub.pdfUrl ? (
          <a
            href={pub.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer outline-none focus:outline-none"
          >
            <PaperThumbnail
              id={pub.id}
            />
          </a>
        ) : (
          <PaperThumbnail
            id={pub.id}
            onClick={() => onSelectPublication(pub)}
          />
        )}
      </div>
    </div>
  );

  return (
    <section id="publications" className="pt-12 md:pt-16 pb-16 px-[40px] w-full border-t border-neutral-900/80 relative">
      {/* Section Header */}
      <div className="mb-[3px] sm:mb-[7px] max-w-7xl mx-auto">
        <div className="pt-[2px]">
          <span className="font-mono-code text-[#c01e1e] text-[20px] font-medium tracking-wide lowercase block mb-2">
            research
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase font-inter leading-none">
            PUBLICATIONS
          </h2>
        </div>
      </div>

      {/* Scroll Pinning Stage: Height gives ample room for scroll-based overlay */}
      <div ref={containerRef} className="relative h-[220vh] max-w-7xl mx-auto -mt-[5px]">
        {/* Sticky Viewport Container */}
        <div className="sticky top-[75px] sm:top-[91px] w-full h-[620px] sm:h-[560px] lg:h-[520px] overflow-hidden">
          
          {/* Card 1: Stays pinned in position */}
          {pub1 && (
            <motion.div
              style={{ scale: card1Scale, opacity: card1Opacity }}
              className="absolute inset-0 w-full h-full bg-[#131313] p-6 sm:p-8 lg:py-8 lg:px-10 flex items-center z-10"
            >
              {renderCardContent(pub1)}
            </motion.div>
          )}

          {/* Card 2: Scrolls up from bottom and overlays Card 1 completely */}
          {pub2 && (
            <motion.div
              style={{ y: card2Y }}
              className="absolute inset-0 w-full h-full bg-[#131313] p-6 sm:p-8 lg:py-8 lg:px-10 flex items-center z-20"
            >
              {renderCardContent(pub2)}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

