import React from 'react';
import { CERTIFICATIONS } from '../data';
import { CertificationItem } from '../types';
import { CertificateGraphic } from './CertificateViews';

interface CertificationsSectionProps {
  onSelectCertification: (cert: CertificationItem) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ onSelectCertification }) => {
  return (
    <section id="certifications" className="py-20 md:py-28 px-[40px] w-full border-t border-neutral-800/80 relative bg-[#131313]">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="mb-12 sm:mb-20">
          <span className="font-mono-code text-[#c01e1e] text-[20px] font-medium tracking-wide lowercase block mb-2">
            certificates
          </span>
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold tracking-tight text-white uppercase font-inter leading-none">
            CERTIFICATION
          </h2>
        </div>

        {/* Stacked Sticky Card Scroll Deck Animation */}
        <div className="w-full flex flex-col items-center relative">
          {CERTIFICATIONS.map((cert, index) => {
            const isLast = index === CERTIFICATIONS.length - 1;
            const isCard4 = index === 3; // Card 4 (index 3)
            const maxWidthClass = cert.width ? '' : (isCard4 ? 'max-w-[682px]' : 'max-w-[624px]');
            const imageHeightClass = cert.height ? '' : (isCard4 ? 'h-[507px]' : 'h-[544px]');

            const cardOuterStyle: React.CSSProperties = {
              top: '80px',
              zIndex: index + 10,
              ...(cert.width ? { width: cert.width, maxWidth: cert.width } : {}),
            };

            const innerTiltStyle: React.CSSProperties = {
              transform: cert.tilt ? `rotate(${cert.tilt}deg)` : 'none',
              transformOrigin: '50% 50%',
              transition: 'transform 0.3s ease',
            };

            const imageContainerStyle: React.CSSProperties = cert.height ? { height: cert.height } : {};

            return (
              <div
                key={cert.id}
                id={`cert-card-${index + 1}`}
                style={cardOuterStyle}
                className={`sticky w-full ${maxWidthClass} flex flex-col rounded-none ${
                  isLast ? 'mb-0' : 'mb-[640px]'
                }`}
              >
                {/* Inner tilted wrapper that preserves sticky positioning and makes tilt 100% visible */}
                <div 
                  style={innerTiltStyle}
                  className="w-full flex flex-col will-change-transform drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                >
                  {/* Top Header Label directly on background */}
                  <div className="w-full h-12 flex items-center justify-between bg-[#131313] flex-shrink-0 select-none z-20 gap-4 px-0.5">
                    <span className="font-mono-code font-medium text-white text-[16px] tracking-normal truncate max-w-[70%]">
                      {cert.title} &nbsp;—&nbsp; {cert.issuer}
                    </span>
                    <span className="font-mono-code font-medium text-neutral-300 text-[16px] tracking-normal flex-shrink-0">
                      {cert.expiryDate || cert.issueDate}
                    </span>
                  </div>

                  {/* Certificate Image Box Directly on Background */}
                  <div
                    onClick={() => onSelectCertification(cert)}
                    style={imageContainerStyle}
                    className={`w-full ${imageHeightClass} bg-white cursor-pointer select-none rounded-none overflow-hidden relative shadow-2xl`}
                  >
                    <CertificateGraphic
                      type={cert.certificateType}
                      imageUrl={cert.imageUrl}
                      roundedNone={true}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
