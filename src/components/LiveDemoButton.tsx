import React from 'react';

interface LiveDemoButtonProps {
  href: string;
  className?: string;
}

export const LiveDemoButton: React.FC<LiveDemoButtonProps> = ({ href, className = '' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Live Demo"
      className={`group relative inline-flex items-center justify-center select-none cursor-pointer focus:outline-none shrink-0 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 will-change-transform ${className}`}
    >
      <svg
        viewBox="0 0 99 99"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle outer bezel rim gradient matching the reference button */}
          <linearGradient id="liveDemoBezel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#737373" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Deep Black Squircle Body with subtle bezel outline */}
        <rect
          x="0.75"
          y="0.75"
          width="97.5"
          height="97.5"
          rx="27"
          ry="27"
          fill="#000000"
          stroke="url(#liveDemoBezel)"
          strokeWidth="1.2"
        />

        {/* 2. Vector Globe & Cursor Icon (White by default, #bee186 on hover) */}
        <g 
          className="stroke-white group-hover:stroke-[#bee186] transition-colors duration-200" 
          strokeWidth="4.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none"
        >
          {/* Globe Outer Arc (Circle from right equator down to bottom-left with cutout for cursor) */}
          <path d="M 71 54 A 21.5 21.5 0 1 0 49.5 70.5" />
          <path d="M 71 43.5 A 21.5 21.5 0 0 0 49.5 27.5 A 21.5 21.5 0 0 0 28 49 A 21.5 21.5 0 0 0 49.5 70.5" />

          {/* Equator Line across entire Globe */}
          <path d="M 28 43 H 71" strokeLinecap="butt" />

          {/* Lower Latitude Line (Left Half) */}
          <path d="M 30.5 56 H 52" strokeLinecap="butt" />

          {/* Left Meridian Arc */}
          <path d="M 49.5 27.5 A 9.5 21.5 0 0 0 49.5 70.5" strokeLinecap="butt" />

          {/* Right Meridian Arc (Top portion up to cutout) */}
          <path d="M 49.5 27.5 A 9.5 21.5 0 0 1 58.5 54" strokeLinecap="butt" />

          {/* Mouse Cursor Pointer Arrow in lower-right quadrant */}
          <path
            d="M 58 58.5 H 70.5 V 62 H 65.2 L 71.8 68.6 L 68.6 71.8 L 62 65.2 V 70.5 H 58.5 Z"
            className="fill-white group-hover:fill-[#bee186] transition-colors duration-200"
            stroke="none"
          />
        </g>
      </svg>
    </a>
  );
};
