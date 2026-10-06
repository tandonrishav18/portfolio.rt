import React, { useRef } from 'react';
import { motion } from 'motion/react';

// Pixilart style pixel-art heart SVG cursor
const PIXEL_HEART_SVG = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Cpath fill='%23B71C1C' d='M2 3h3v1H2zm9 0h3v1h-3zM1 4h5v1H1zm9 0h5v1h-5zM0 5h7v1H0zm9 0h7v1H9zM0 6h16v3H0zm1 3h14v1H1zm1 1h12v1H2zm1 1h10v1H3zm1 1h8v1H4zm1 1h6v1H5zm1 1h4v1H6zm1 1h2v1H7z'/%3E%3C/svg%3E`;
const PIXEL_HEART_GRAB_SVG = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Cpath fill='%23B71C1C' d='M2 3h3v1H2zm9 0h3v1h-3zM1 4h5v1H1zm9 0h5v1h-5zM0 5h7v1H0zm9 0h7v1H9zM0 6h16v3H0zm1 3h14v1H1zm1 1h12v1H2zm1 1h10v1H3zm1 1h8v1H4zm1 1h6v1H5zm1 1h4v1H6zm1 1h2v1H7z'/%3E%3C/svg%3E`;

const HEART_CURSOR = `url("data:image/svg+xml,${PIXEL_HEART_SVG}") 10 10, grab`;
const HEART_GRAB_CURSOR = `url("data:image/svg+xml,${PIXEL_HEART_GRAB_SVG}") 9 9, grabbing`;

// Realistic Classic Tilted Paper Clip Component with #BEE186 Color
const GreenPaperClip: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute -top-3.5 sm:-top-4 left-1 sm:left-1.5 z-30 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)] -rotate-[22deg] ${className}`}>
    <svg 
      width="24" 
      height="48" 
      viewBox="0 0 24 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-[18px] sm:w-[20px] h-auto select-none"
    >
      {/* 3D Depth Shadow/Dark Base */}
      <path
        d="M 20.5 14 L 20.5 37.5 A 8.25 8.25 0 0 1 4 37.5 L 4 11.5 A 5.5 5.5 0 0 1 15 11.5 L 15 32.5 A 2.75 2.75 0 0 1 9.5 32.5 L 9.5 16"
        stroke="#6e9c32"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Main #BEE186 paperclip wire */}
      <path
        d="M 20.5 14 L 20.5 37.5 A 8.25 8.25 0 0 1 4 37.5 L 4 11.5 A 5.5 5.5 0 0 1 15 11.5 L 15 32.5 A 2.75 2.75 0 0 1 9.5 32.5 L 9.5 16"
        stroke="#bee186"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Specular gloss highlight on top outer curve */}
      <path
        d="M 4.6 11.5 A 4.8 4.8 0 0 1 14.4 11.5"
        stroke="#ffffff"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  </div>
);

export const PegboardSection: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <section id="certifications" className="pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-8 md:px-[40px] w-full border-t border-neutral-800/80 relative">
      <div className="w-full max-w-[1216px] mx-auto flex flex-col">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 flex flex-col">
          <span className="font-mono-code text-[#c01e1e] text-[20px] font-medium tracking-wide lowercase block mb-2">
            certificates
          </span>
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold tracking-tight text-white uppercase font-inter leading-none">
            CERTIFICATION
          </h2>
        </div>

        {/* Black Pegboard Canvas Container - 1216px Width & 1100px Height */}
        <div className="w-full flex justify-center">
          <motion.div
            ref={boardRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '1216px' }}
            className="w-full h-[760px] sm:h-[840px] md:h-[1100px] rounded-3xl sm:rounded-[40px] md:rounded-[48px] bg-black relative border border-neutral-800/90 overflow-hidden select-none touch-none flex items-center justify-center"
          >
            {/* True Geometric Oval Pegboard Hole Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pegboard-holes-flat" width="40" height="50" patternUnits="userSpaceOnUse">
                    <ellipse
                      cx="20"
                      cy="25"
                      rx="4.5"
                      ry="11"
                      fill="#26262b"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pegboard-holes-flat)" />
              </svg>
            </div>

            {/* Certificate Card 1 - SAP ABAP Cloud */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% - 63px)',
                top: '150px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 10,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[317px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[317px] max-w-full h-[235px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-1.png"
                  alt="SAP Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 2 - Cisco Networking Basics */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% - 49px)',
                top: '155px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 11,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[316px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[316px] max-w-full h-[227px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-2.png"
                  alt="Cisco Networking Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 3 - IBM AI Fundamentals */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% - 35px)',
                top: '160px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 12,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[313px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[313px] max-w-full h-[234px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-3.png"
                  alt="IBM AI Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 4 - Udemy C Programming */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% - 21px)',
                top: '165px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 13,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[268px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[268px] max-w-full h-[207px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-4.png"
                  alt="Udemy C Programming Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 5 - DBMS Fundamentals */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% - 7px)',
                top: '170px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 14,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[302px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[302px] max-w-full h-[233px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-5.png"
                  alt="DBMS Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 6 - NPTEL Machine Learning */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% + 7px)',
                top: '175px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 15,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[283px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[283px] max-w-full h-[200px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-6.png"
                  alt="NPTEL Machine Learning Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 7 - AlgoUniversity Graph Theory */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% + 21px)',
                top: '180px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 16,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[272px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[272px] max-w-full h-[193px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-7.png"
                  alt="AlgoUniversity Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 8 - Deloitte Data Analytics */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% + 35px)',
                top: '185px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 17,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[310px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[310px] max-w-full h-[239px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-8.png"
                  alt="Deloitte Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 9 - GUVI HCL Full Stack */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% + 49px)',
                top: '190px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 18,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[285px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[285px] max-w-full h-[201px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-9.png"
                  alt="GUVI HCL Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Certificate Card 10 - ScriptArc Data Science */}
            <motion.div
              drag
              dragConstraints={boardRef}
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ rotate: 0 }}
              whileHover={{ scale: 1.02, zIndex: 50 }}
              whileTap={{ scale: 1.02, zIndex: 60, cursor: HEART_GRAB_CURSOR }}
              style={{
                position: 'absolute',
                left: 'calc(50% + 63px)',
                top: '195px',
                cursor: HEART_CURSOR,
                rotate: 0,
                zIndex: 19,
                transformOrigin: 'center center',
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex flex-col items-center select-none w-[290px] max-w-[85vw] -translate-x-1/2"
            >
              <GreenPaperClip />
              <div className="w-[290px] max-w-full h-[194px] bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0 border border-neutral-200">
                <img
                  src="/cert-card-10.png"
                  alt="ScriptArc Data Science Certificate"
                  className="w-full h-full object-contain object-center select-none block bg-white"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Caption below pegboard */}
        <p className="mt-6 sm:mt-8 text-neutral-400/90 text-xs sm:text-[13px] font-mono-code tracking-normal flex items-center justify-center gap-1.5 select-none leading-none">
          <span>Try Moving Things</span>
          <span className="inline-block translate-y-[0.5px]">:)</span>
        </p>
      </div>
    </section>
  );
};
