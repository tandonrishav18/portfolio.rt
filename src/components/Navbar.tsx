import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenResume?: () => void;
  isMenuOpen?: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>> | ((val: boolean | ((prev: boolean) => boolean)) => void);
  onNavClick?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMenuOpen: controlledIsMenuOpen,
  setIsMenuOpen: controlledSetIsMenuOpen,
  onNavClick,
}) => {
  // State: starts as compact closed capsule, then expands open on load
  const [isExpanded, setIsExpanded] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [isInContactSection, setIsInContactSection] = useState(false);

  const isMenuOpen = controlledIsMenuOpen !== undefined ? controlledIsMenuOpen : internalMenuOpen;
  const setIsMenuOpen = controlledSetIsMenuOpen || setInternalMenuOpen;

  // Dynamic Island load animation: holds compact pill for 1.5s, then smoothly opens up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Detect when Contact section is in the viewport to switch navbar color
  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (!contactEl) return;
      const rect = contactEl.getBoundingClientRect();
      // If contact section is at or near the top/visible zone
      if (rect.top <= 120 && rect.bottom >= 0) {
        setIsInContactSection(true);
      } else {
        setIsInContactSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Work', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'More?', href: '#more-about-me' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (onNavClick) {
      onNavClick(href);
    } else {
      if (href === '#' || href === '#top' || href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '#more-about-me') {
        const target = document.getElementById('more-about-me');
        if (target) {
          const rect = target.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 110;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleNavbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If the click is directly on the blank black space (not on an <a> or <button>)
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    // Toggle between shrunk (232px compact) and elongated (400px full)
    setIsExpanded((prev) => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-5 sm:top-7 left-0 right-0 z-50 flex flex-col items-center justify-center px-4 pointer-events-none">
      <div className="w-full max-w-[400px] flex flex-col items-center pointer-events-none">
        {/* Dynamic Island Capsule - Expands / Shrinks on blank click */}
        <motion.div
          layout
          onClick={handleNavbarClick}
          initial={{ width: 232, height: 51, opacity: 0, scale: 0.95 }}
          animate={{
            width: !isExpanded ? 232 : 'min(92vw, 400px)',
            height: 51,
            opacity: 1,
            scale: 1,
            backgroundColor: isInContactSection ? '#b91c1c' : '#000000',
          }}
          transition={{
            width: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.5, ease: 'easeOut' },
            scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            backgroundColor: { duration: 0.4, ease: 'easeInOut' },
          }}
          className={`pointer-events-auto text-white rounded-[26px] overflow-hidden shadow-none cursor-pointer ${
            isInContactSection ? 'bg-[#b91c1c]' : 'bg-[#000000]'
          }`}
          title="Click space to toggle size"
        >
          {/* Dynamic Island Main Bar */}
          <div 
            className={`h-[51px] px-5 sm:px-6 flex items-center justify-between w-full select-none relative transition-colors duration-400 ${
              isInContactSection ? 'bg-[#b91c1c]' : 'bg-[#000000]'
            }`}
          >
            {/* Left Brand: .rt in exact Jersey 10 pixel font */}
            <AnimatePresence>
              {isExpanded && (
                <motion.a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#hero');
                  }}
                  initial={{ opacity: 0, x: -12, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className={`font-jersey text-[28px] sm:text-[30px] font-normal text-white transition-colors tracking-normal leading-none flex items-center select-none cursor-pointer ${
                    isInContactSection ? 'hover:text-black' : 'hover:text-[#b91c1c]'
                  }`}
                >
                  .rt
                </motion.a>
              )}
            </AnimatePresence>

            {/* Right Controls: CONTACT and MENU ||| */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 12, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="flex items-center space-x-5 sm:space-x-6 text-[12px] sm:text-[13px] font-mono-code font-semibold tracking-[0.16em] text-white uppercase"
                >
                  {/* CONTACT Link */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#contact');
                    }}
                    className={`text-white transition-colors cursor-pointer ${
                      isInContactSection ? 'hover:text-black' : 'hover:text-[#b91c1c]'
                    }`}
                  >
                    CONTACT
                  </a>

                  {/* MENU button with animated icon */}
                  <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer focus:outline-none select-none text-white"
                    aria-label="Toggle navigation menu"
                  >
                    <span className="tracking-[0.16em] text-white">MENU</span>
                    <motion.div
                      animate={{ rotate: isMenuOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[14px] h-[13px] flex flex-col justify-between items-center py-[0.5px] relative origin-center"
                    >
                      <motion.span
                        animate={{ 
                          backgroundColor: isMenuOpen 
                            ? (isInContactSection ? '#000000' : '#b91c1c') 
                            : '#ffffff' 
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-[1.8px] rounded-[0.5px] block"
                      />
                      <motion.span
                        animate={{ 
                          backgroundColor: isMenuOpen 
                            ? (isInContactSection ? '#000000' : '#b91c1c') 
                            : '#ffffff' 
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-[1.8px] rounded-[0.5px] block"
                      />
                      <motion.span
                        animate={{ 
                          backgroundColor: isMenuOpen 
                            ? (isInContactSection ? '#000000' : '#b91c1c') 
                            : '#ffffff' 
                        }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-[1.8px] rounded-[0.5px] block"
                      />
                    </motion.div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating Menu Dropdown Card matching image.png (aligned right) */}
        <div className="w-full flex justify-end pointer-events-none">
          <AnimatePresence>
            {isMenuOpen && isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  filter: 'blur(0px)',
                  backgroundColor: isInContactSection ? '#b91c1c' : '#000000',
                }}
                exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto mt-3 text-white rounded-[32px] sm:rounded-[36px] w-[270px] sm:w-[290px] shadow-none py-8 px-8 select-none flex flex-col items-end space-y-6 transition-colors duration-400 ${
                  isInContactSection ? 'bg-[#b91c1c]' : 'bg-[#000000]'
                }`}
              >
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.25 }}
                    className={`font-mono-code text-[20px] font-medium text-white transition-colors text-right cursor-pointer block tracking-wider leading-none ${
                      isInContactSection ? 'hover:text-black' : 'hover:text-red-500'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
