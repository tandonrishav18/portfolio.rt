import React from 'react';

interface PaperThumbnailProps {
  id: string;
  onClick?: () => void;
}

export const PaperThumbnail: React.FC<PaperThumbnailProps> = ({ id, onClick }) => {
  const isClimate = id === 'pub-climate-iot';
  const imgSrc = isClimate ? '/nm-cropped.jpeg' : '/zx-cropped.jpeg';
  const title = isClimate 
    ? 'Spatio-Temporal Edge Intelligence Framework for Resilient Geospatial IoT-Based Climate Anomaly Detection'
    : 'Dental Disease Detection from Photographic Images Using Deep Learning';

  return (
    <div
      onClick={onClick}
      className="w-[340px] h-[390px] max-w-full bg-[#ffffff] rounded-[2px] shadow-2xl overflow-hidden select-none border border-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:border-neutral-500 cursor-pointer relative shrink-0 group"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-full object-cover object-center block transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
        loading="lazy"
      />
    </div>
  );
};
