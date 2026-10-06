import React, { useId } from 'react';

interface GitRepoButtonProps {
  href: string;
  className?: string;
}

export const GitRepoButton: React.FC<GitRepoButtonProps> = ({ href, className = '' }) => {
  const rawId = useId();
  const gradId = `gitRepoGreenGradient_${rawId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Git Repo"
      className={`group relative inline-flex items-center select-none cursor-pointer focus:outline-none transition-transform duration-200 ease-out hover:scale-105 active:scale-95 will-change-transform ${className}`}
    >
      <svg
        viewBox="0 0 350 99"
        className="w-full h-auto block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Default State: Lime to Sage Green Linear Gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BCEFA5" />
            <stop offset="25%" stopColor="#B0E999" />
            <stop offset="60%" stopColor="#8FB97F" />
            <stop offset="100%" stopColor="#75A666" />
          </linearGradient>
        </defs>

        {/* 1. Outer Black Capsule */}
        <rect
          x="0"
          y="0"
          width="350"
          height="99"
          rx="49.5"
          fill="#000000"
        />

        {/* 2. Left Gray Avatar Circle */}
        <circle
          cx="49.5"
          cy="49.5"
          r="32.5"
          fill="#C1C1C1"
        />

        {/* GitHub Silhouette Inside Gray Avatar */}
        <path
          fill="#000000"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.5 28C38.18 28 29 37.18 29 48.5c0 9.06 5.87 16.74 14.02 19.44 1.02.19 1.4-.44 1.4-.99v-3.46c-5.71 1.24-6.91-2.75-6.91-2.75-.93-2.37-2.28-3-2.28-3-1.86-1.27.14-1.25.14-1.25 2.06.14 3.14 2.12 3.14 2.12 1.83 3.14 4.8 2.23 5.97 1.71.19-1.33.72-2.23 1.3-2.74-4.55-.52-9.34-2.28-9.34-10.13 0-2.24.8-4.07 2.11-5.5-.21-.52-.91-2.6.2-5.42 0 0 1.72-.55 5.63 2.1a19.6 19.6 0 0 1 10.26 0c3.9-2.65 5.62-2.1 5.62-2.1 1.12 2.82.42 4.9.21 5.42 1.32 1.43 2.11 3.26 2.11 5.5 0 7.87-4.8 9.6-9.36 10.11.73.63 1.39 1.88 1.39 3.79v5.62c0 .55.37 1.19 1.41.99C64.14 65.23 70 57.55 70 48.5 70 37.18 60.82 28 49.5 28z"
        />

        {/* 3. Green Inner Capsule with Guaranteed Solid Fallback + Linear Gradient */}
        <rect
          x="101"
          y="9"
          width="233"
          height="81"
          rx="40.5"
          fill="#9EC88A"
        />
        <rect
          x="101"
          y="9"
          width="233"
          height="81"
          rx="40.5"
          fill={`url(#${gradId})`}
        />

        {/* 4. Text: GIT REPO (Crisp Vector Typography) */}
        <text
          x="187.5"
          y="58"
          fill="#000000"
          fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="800"
          fontSize="24.5"
          letterSpacing="0.2em"
          textAnchor="middle"
          className="select-none"
        >
          GIT REPO
        </text>

        {/* 5. Right Black Circle for Arrow */}
        <circle
          cx="301"
          cy="49.5"
          r="26.5"
          fill="#000000"
        />

        {/* 6. Clean White Vector Arrow ↗ (Changes to #BEE186 on hover) */}
        <path
          d="M291 60 L310 41 M293.5 39.5 L311.5 39.5 L311.5 57.5"
          className="stroke-white group-hover:stroke-[#BEE186] transition-colors duration-200"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </a>
  );
};

