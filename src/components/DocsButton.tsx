import React from 'react';

interface DocsButtonProps {
  href: string;
  className?: string;
}

export const DocsButton: React.FC<DocsButtonProps> = ({
  href,
  className = '',
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Documentation"
      className={`group relative inline-flex items-center justify-center select-none cursor-pointer focus:outline-none shrink-0 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 will-change-transform ${className}`}
    >
      <svg
        viewBox="0 0 99 99"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle metallic bezel rim gradient matching the physical tactile feel */}
          <linearGradient id="docsBezel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#737373" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0.4" />
          </linearGradient>

          {/* Mask for the clipboard cutout lines and top hanging hole */}
          <mask id="clipboardCutouts">
            {/* Base white: allows the clipboard shape to render */}
            <rect width="99" height="99" fill="#ffffff" />

            {/* Cutout 1: Circular hanging hole in top tab */}
            <circle cx="49" cy="28.5" r="2.2" fill="#000000" />

            {/* Cutout 2: First horizontal text line */}
            <rect x="37" y="37.5" width="24" height="4.2" rx="0.5" fill="#000000" />

            {/* Cutout 3: Second horizontal text line */}
            <rect x="37" y="47" width="24" height="4.2" rx="0.5" fill="#000000" />

            {/* Cutout 4: Third horizontal text line (shorter) */}
            <rect x="37" y="56.5" width="16.5" height="4.2" rx="0.5" fill="#000000" />
          </mask>
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
          stroke="url(#docsBezel)"
          strokeWidth="1.2"
        />

        {/* 2. Vector Clipboard Icon with precise geometry and cutouts */}
        <g 
          mask="url(#clipboardCutouts)" 
          className="fill-white group-hover:fill-[#bee186] transition-colors duration-200"
        >
          {/* Main Clipboard Body (rounded rectangle) */}
          <rect x="27" y="28" width="44" height="43" rx="6" />

          {/* Top Clip Arch / Tab */}
          <path d="M 42 28.5 C 42 24.5, 45 22.5, 49 22.5 C 53 22.5, 56 24.5, 56 28.5 Z" />
        </g>
      </svg>
    </a>
  );
};
