import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft,
  ArrowRight,
  Play
} from 'lucide-react';
import { GitRepoButton } from './GitRepoButton';
import { LiveDemoButton } from './LiveDemoButton';

interface NivalaWebpageProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
  onNextProject?: () => void;
}

interface ScrollDownRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollDirRef: React.RefObject<'down' | 'up'>;
}

const ScrollDownReveal: React.FC<ScrollDownRevealProps> = ({
  children,
  className = '',
  delay = 0.2,
  containerRef,
  scrollDirRef,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const container = containerRef.current;
    if (!element || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const containerRect = container.getBoundingClientRect();
          const elementRect = entry.boundingClientRect;

          if (entry.isIntersecting) {
            const isScrollingDown = scrollDirRef.current === 'down';
            if (isScrollingDown) {
              setShouldAnimate(true);
              setIsVisible(true);
            } else {
              setShouldAnimate(false);
              setIsVisible(true);
            }
          } else {
            if (elementRect.top >= containerRect.bottom - 40) {
              setIsVisible(false);
              setShouldAnimate(false);
            } else if (elementRect.bottom <= containerRect.top + 40) {
              setIsVisible(true);
              setShouldAnimate(false);
            }
          }
        });
      },
      {
        root: container,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [containerRef, scrollDirRef]);

  let style: React.CSSProperties = {};
  if (!isVisible) {
    style = {
      opacity: 0,
      transform: 'translateY(80px)',
      transition: 'none',
      willChange: 'transform, opacity',
    };
  } else if (shouldAnimate) {
    style = {
      opacity: 1,
      transform: 'translateY(0px)',
      transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      willChange: 'transform, opacity',
    };
  } else {
    style = {
      opacity: 1,
      transform: 'translateY(0px)',
      transition: 'none',
      willChange: 'transform, opacity',
    };
  }

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};

export const NivalaWebpage: React.FC<NivalaWebpageProps> = ({ 
  isOpen, 
  onClose,
  onOpenResume,
  onNextProject
}) => {
  const [isMockupHovered, setIsMockupHovered] = useState(false);
  const [problemTextHeight, setProblemTextHeight] = useState<number | null>(null);
  const problemTextRef = useRef<HTMLDivElement>(null);
  const [approachTextHeight, setApproachTextHeight] = useState<number | null>(null);
  const approachTextRef = useRef<HTMLDivElement>(null);
  const [resultTextHeight, setResultTextHeight] = useState<number | null>(null);
  const resultTextRef = useRef<HTMLDivElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayedRef = useRef(false);
  const savedScrollPositionRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const scrollDirRef = useRef<'down' | 'up'>('down');
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const updateHeights = () => {
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop && problemTextRef.current) {
        setProblemTextHeight(problemTextRef.current.offsetHeight);
      } else {
        setProblemTextHeight(null);
      }

      if (isDesktop && approachTextRef.current) {
        setApproachTextHeight(approachTextRef.current.offsetHeight);
      } else {
        setApproachTextHeight(null);
      }

      if (isDesktop && resultTextRef.current) {
        setResultTextHeight(resultTextRef.current.offsetHeight);
      } else {
        setResultTextHeight(null);
      }
    };

    updateHeights();
    const ro = new ResizeObserver(() => updateHeights());
    if (problemTextRef.current) ro.observe(problemTextRef.current);
    if (approachTextRef.current) ro.observe(approachTextRef.current);
    if (resultTextRef.current) ro.observe(resultTextRef.current);
    window.addEventListener('resize', updateHeights);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeights);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      hasAutoPlayedRef.current = false;
      setIsVideoEnded(false);
      setIsVideoPlaying(false);
      setHasStarted(false);
      return;
    }

    const container = scrollContainerRef.current;
    const videoTarget = videoContainerRef.current;
    if (!container || !videoTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoEl = videoRef.current;
          if (!videoEl) return;

          if (entry.isIntersecting) {
            if (!hasAutoPlayedRef.current && !videoEl.ended) {
              const playPromise = videoEl.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsVideoPlaying(true);
                    setHasStarted(true);
                    setIsVideoEnded(false);
                  })
                  .catch(() => {});
              }
            }
          } else {
            if (!videoEl.ended && !videoEl.paused) {
              videoEl.pause();
              setIsVideoPlaying(false);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.35,
      }
    );

    observer.observe(videoTarget);

    return () => observer.disconnect();
  }, [isOpen]);

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
    setIsVideoPlaying(false);
    hasAutoPlayedRef.current = true;
  };

  const handleTogglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        setIsVideoEnded(false);
      }
      video.play()
        .then(() => {
          setIsVideoPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const st = e.currentTarget.scrollTop;
    if (st > lastScrollTopRef.current) {
      scrollDirRef.current = 'down';
    } else if (st < lastScrollTopRef.current) {
      scrollDirRef.current = 'up';
    }
    lastScrollTopRef.current = st;
  };

  useEffect(() => {
    if (isOpen) {
      savedScrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.overflow = 'hidden';
      
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollTop = 0;
      }

      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      });
      lastScrollTopRef.current = 0;
      scrollDirRef.current = 'down';
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      document.body.style.overflow = 'unset';
      if (savedScrollPositionRef.current !== undefined) {
        window.scrollTo({
          top: savedScrollPositionRef.current,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{
        display: isOpen ? 'flex' : 'none',
      }}
      className="fixed inset-0 z-40 bg-[#131313] text-[#e0e0e0] flex flex-col overflow-y-auto overflow-x-hidden selection:bg-[#c7ff8b] selection:text-black"
    >
      {/* Back Arrow Button */}
      <div className="fixed top-5 sm:top-6 left-2.5 sm:left-4 z-50">
        <button 
          onClick={onClose}
          className="group flex items-center justify-center p-1.5 bg-transparent transition-colors duration-200 cursor-pointer select-none border-0 shadow-none outline-none"
          aria-label="Back to Projects"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#c7ff8b] stroke-[3] transition-colors duration-200" />
        </button>
      </div>

      {/* Main Page Content */}
      <main className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-0 flex flex-col items-center">
        
        {/* Top Hero Card with NIVALA Header & Screen Mockup */}
        <div 
          style={{ 
            background: 'linear-gradient(90deg, rgba(95, 52, 52, 0.54) 0%, rgba(46, 46, 46, 0.54) 100%)',
            minHeight: '240px',
          }}
          className="w-full relative rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 md:px-10 pt-6 pb-6 md:py-0 md:h-[240px] mb-20 sm:mb-24 overflow-hidden flex flex-col md:flex-row items-center justify-between border-0 select-none shadow-2xl"
        >
          {/* Left Column: Heading & Interactive Action Buttons */}
          <div className="flex-1 flex flex-col justify-center z-10 w-full md:max-w-[55%] md:pt-3 md:pb-6 md:-translate-y-2">
            {/* NIVALA in JERSEY 10 (Matching CineSuggest) */}
            <h1 
              style={{ 
                fontFamily: "'Jersey 10', 'Silkscreen', monospace", 
                fontWeight: 400, 
                fontStyle: 'normal',
                letterSpacing: '0.05em',
                fontSize: 'clamp(2.6rem, 7.5vw, 96px)',
                lineHeight: 1,
              }} 
              className="font-jersey text-white uppercase leading-none select-none mb-3 sm:mb-4 whitespace-nowrap"
            >
              NIVALA
            </h1>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Git Repo Vector Button */}
              <GitRepoButton 
                href="https://github.com/tandonrishav18" 
                className="w-[165px] sm:w-[200px] md:w-[222px]" 
              />

              {/* Globe / Live Demo Squircle Button */}
              <LiveDemoButton 
                href="https://github.com/tandonrishav18" 
                className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] md:w-[60px] md:h-[60px]" 
              />
            </div>
          </div>

          {/* Right Column: Hero Mockup (Flush with bottom, equal top and right gaps matching CineSuggest) */}
          <div className="w-full flex items-end justify-center mt-4 h-[200px] sm:h-[220px] md:w-auto md:h-auto md:absolute md:top-5 md:right-5 lg:top-6 lg:right-6 md:bottom-0 md:mt-0 md:justify-end z-10 pointer-events-none">
            <div className="relative inline-flex items-end h-full">
              {/* Interactive Hitbox specifically tracking hover only over the phone device bounds */}
              <div 
                onMouseEnter={() => setIsMockupHovered(true)}
                onMouseLeave={() => setIsMockupHovered(false)}
                className="absolute inset-0 cursor-pointer pointer-events-auto rounded-[32px] sm:rounded-[36px] z-20"
              />
              <img 
                src="/fn.png" 
                alt="Nivala Mobile Application Phone Mockup" 
                loading="eager"
                decoding="sync"
                className={`w-auto h-full object-contain object-bottom select-none origin-bottom-right pointer-events-none ${
                  isMockupHovered ? 'scale-105 transition-transform duration-300 ease-out' : 'scale-100'
                }`}
              />
            </div>
          </div>
        </div>

        {/* 1. Problem Section (Heading Top, Text Left, Image Right starting where 1st line of explanation starts - Dim 615*415) */}
        <div className="w-full mb-20 sm:mb-24 text-left">
          <h2 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
          >
            PROBLEM
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div 
              ref={problemTextRef}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-7"
            >
              <p>
                India faces the dual challenges of hunger and food waste. According to the 2025 Global Hunger Index, approximately 12% of India's population is undernourished, while households generate an estimated 78.2 million tonnes of food waste annually, averaging 55 kg per person. Edible surplus from restaurants and households goes unused, while millions struggle to access nutritious meals.
              </p>
              <p>
                The problem lies in the disconnect between surplus food sources and communities in need. Without coordinated redistribution, food goes to waste instead of reaching hungry individuals. This raises an important question: What if surplus food could become a resource for someone in need rather than going to waste?
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full flex justify-center items-start"
            >
              <div 
                style={{ 
                  width: '615px', 
                  maxWidth: '100%', 
                  height: problemTextHeight ? `${problemTextHeight}px` : undefined,
                  aspectRatio: problemTextHeight ? undefined : '615 / 415' 
                }}
                className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl flex items-center justify-center"
              >
                <img 
                  src="/M1.png" 
                  alt="Nivala Problem Analysis" 
                  className="w-full h-full object-cover object-top block select-none rounded-none"
                />
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 2. Idea Section (Image Left starting where 1st line of text starts, Heading + Text Right - Dim 605*637) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full flex flex-col justify-start items-center order-2 md:order-1"
          >
            {/* Invisible heading spacer to match the height of 'IDEA' heading so image starts at 1st line of text */}
            <div 
              aria-hidden="true"
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="invisible select-none pointer-events-none mb-4 uppercase tracking-normal hidden md:block"
            >
              IDEA
            </div>

            <div 
              style={{ width: '605px', maxWidth: '100%', aspectRatio: '605 / 637' }}
              className="w-[605px] max-w-full flex items-center justify-center rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl"
            >
              <img 
                src="/m2.png" 
                alt="Nivala Idea (605x637)" 
                className="w-full h-full object-cover block select-none rounded-none"
              />
            </div>
          </ScrollDownReveal>

          <div className="text-left order-1 md:order-2 flex flex-col justify-start">
            <h2 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
            >
              IDEA
            </h2>
            <div 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-5"
            >
              <p>
                What if surplus food could become a resource for someone in need rather than going to waste? NIVALA aims to connect restaurants, caterers, and individuals with NGOs supporting underserved communities. By bringing donors, recipients, and volunteers together, it simplifies listing, discovering, and collecting surplus food, creating a coordinated ecosystem where excess meals support lives.
              </p>
              <p>
                The concept focuses on accessible, transparent, and organized food redistribution. Donors share food, NGOs identify donations, and volunteers assist with collection and delivery. By reducing communication barriers, NIVALA makes food sharing practical. Beyond addressing food waste, it promotes empathy, responsible consumption, and collective action, envisioning a future where edible food is shared and every meal brings hope, dignity, and nourishment to communities in need.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Approach Section (Heading Top, Text Left, Image Right starting where 1st line of text starts - Dim 615*781) */}
        <div className="w-full mb-20 sm:mb-24 text-left">
          <h2 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
          >
            APPROACH
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div 
              ref={approachTextRef}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-5"
            >
              <p>
                The approach behind NIVALA was to design a user centric food redistribution experience that makes donating, discovering, and receiving surplus food simple. Rather than treating food donation as an isolated activity, the platform connects three participants: restaurants and individuals as donors, NGOs as recipients, and volunteers as delivery partners.
              </p>
              <p>
                The process focuses on understanding user needs and creating clear, role based journeys. Donors can list surplus food with details such as quantity, category, and availability, while NGOs can explore listings and access donations based on their requirements. To address last mile delivery challenges, volunteers can collect and transport food when pickup is not feasible. From intuitive navigation and streamlined forms to organized food discovery and coordinated collection, every interaction aims to reduce friction and improve clarity.
              </p>
              <p>
                The design emphasizes accessibility, consistency, and ease of use across user roles. Each journey helps users understand their next steps without complexity. Clear information hierarchy and straightforward interactions support smoother navigation. Ultimately, the approach aims to make food redistribution organized, reliable, and convenient for everyone involved.
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full flex justify-center items-start"
            >
              <div 
                style={{ 
                  width: '615px', 
                  maxWidth: '100%', 
                  height: approachTextHeight ? `${approachTextHeight}px` : undefined,
                  aspectRatio: approachTextHeight ? undefined : '615 / 781'
                }}
                className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl flex items-center justify-center"
              >
                <img 
                  src="/m3.png" 
                  alt="Nivala Approach" 
                  className="w-full h-full object-cover object-top block select-none rounded-none"
                />
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 4. Impact Section (Image Left with Invisible Heading Spacer, Text Right with Heading - Dim 605*653) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full flex flex-col justify-start items-center order-2 md:order-1"
          >
            {/* Invisible heading spacer to match the height of 'IMPACT' heading so image starts at 1st line of text */}
            <div 
              aria-hidden="true"
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="invisible select-none pointer-events-none mb-4 uppercase tracking-normal hidden md:block"
            >
              IMPACT
            </div>

            <div 
              style={{ width: '605px', maxWidth: '100%', aspectRatio: '605 / 653' }}
              className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl"
            >
              <img 
                src="/m4.png" 
                alt="Nivala Impact (605x653)" 
                className="w-full h-full object-cover object-top block select-none rounded-none"
              />
            </div>
          </ScrollDownReveal>

          <div className="text-left order-1 md:order-2 flex flex-col justify-start">
            <h2 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
            >
              IMPACT
            </h2>
            <div 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-5"
            >
              <p>
                NIVALA aims to reduce food waste while helping surplus meals reach communities facing hunger. By connecting restaurants and individuals with NGOs, it supports food distribution, enables volunteer participation, and promotes responsible food practices.
              </p>
              <p>
                Aligned with the United Nations Sustainable Development Goals, specifically SDG 2: Zero Hunger, SDG 12: Responsible Consumption and Production, and SDG 17: Partnerships for the Goals, NIVALA encourages responsible food sharing, strengthens collaboration, and promotes sustainability. By making donations accessible and coordinated, the platform helps NGOs extend their reach and utilize available resources effectively.
              </p>
              <p>
                Beyond food redistribution, NIVALA fosters a culture of sharing and collective responsibility. It highlights how small contributions can create meaningful social impact while supporting a sustainable future.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Description Section (Full Width) */}
        <div className="w-full mb-20 sm:mb-24 text-left">
          <h2 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
          >
            DESCRIPTION
          </h2>
          <div 
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: 1.6,
              textAlign: 'justify',
            }}
            className="text-neutral-300 space-y-6"
          >
            <p>
              NIVALA - Share Surplus. Serve Humanity. is a community driven food redistribution platform conceptualized to bridge the gap between surplus food and people facing food insecurity. The project focuses on connecting restaurants, individual donors, NGOs, and community volunteers through a unified digital ecosystem that makes food donation, discovery, and collection more accessible and organized. The project began with identifying a fundamental problem: while restaurants and households often have excess edible food, NGOs and underserved communities struggle to access it efficiently. To address this disconnect, the platform was designed around three primary user roles: Donors, NGOs, and Volunteers, each with a dedicated user journey and role specific functionality.
            </p>
            <p>
              The development process started with understanding the problem, defining user requirements, mapping user journeys, and structuring the application's information architecture. Wireframes and UI screens were designed in Figma, focusing on intuitive navigation, clear visual hierarchy, accessible interactions, and a consistent interface. The frontend was conceptualized using React, HTML5, and CSS3, with a backend architecture planned around Node.js and Express.js, supported by MySQL for managing users, food listings, donation records, and collection details. The workflow begins when a restaurant or individual registers as a donor and publishes a food listing containing details such as food category, quantity, availability, and pickup location. Once published, the listing becomes discoverable to registered NGOs through the available food section.
            </p>
            <p>
              NGOs can browse donations, review food details, and initiate a request to receive the food. A unique OTP based verification mechanism is incorporated into the proposed collection flow to help validate handovers and improve coordination. When direct collection is not feasible, an individual can participate as a volunteer delivery partner. The volunteer can accept an available pickup request, collect the donated food from the donor, and transport it to the requesting NGO. The NGO then confirms receipt, completing the donation cycle. This creates a structured flow from Food Listing → Discovery → Request → Pickup → Delivery → Confirmation. The platform also includes dedicated dashboards, donation history, profile management, and food discovery interfaces to help users navigate their activities.
            </p>
          </div>
        </div>

        {/* 6. Result Section (Heading Top, Text Left, Graphic Right starting where 1st line of text starts - Dim 615*665) */}
        <div className="w-full mb-20 sm:mb-24 text-left">
          <h2 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
          >
            RESULT
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div 
              ref={resultTextRef}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-5"
            >
              <p>
                NIVALA - Share Surplus. Serve Humanity. is a community-driven food redistribution platform designed to bridge the gap between surplus food and people facing food insecurity. It connects restaurants, individual donors, NGOs, and volunteers through a unified digital ecosystem. The project focuses on three primary user roles: Donors, NGOs, and Volunteers, with dedicated user journeys and role-specific functionality. Wireframes and UI screens were designed in Figma, focusing on intuitive navigation, accessibility, and consistency. The frontend was conceptualized using React, HTML5, and CSS3, with a backend architecture planned around Node.js, Express.js, and MySQL.
              </p>
              <p>
                Donors can publish food listings with details such as category, quantity, availability, and pickup location, allowing NGOs to discover and request donations. An OTP-based verification mechanism helps validate handovers, while volunteers can collect and deliver food when direct pickup is not feasible. With dashboards, donation history, and food discovery interfaces, NIVALA aims to reduce food waste, support NGO distribution efforts, encourage community participation, and promote sustainable consumption.
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full flex justify-center items-start"
            >
              <div 
                style={{ 
                  width: '615px', 
                  maxWidth: '100%', 
                  height: resultTextHeight ? `${resultTextHeight}px` : undefined,
                  aspectRatio: resultTextHeight ? undefined : '615 / 665' 
                }}
                className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl"
              >
                <img 
                  src="/m5.png" 
                  alt="Nivala Result" 
                  className="w-full h-full object-cover object-top block select-none rounded-none"
                />
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 7. Conclusion Section (Graphic Left with Invisible Heading Spacer, Heading + Text Right - Dim 605*658) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full flex flex-col justify-start items-center order-2 md:order-1"
          >
            {/* Invisible heading spacer to match the height of 'CONCLUSION' heading so image starts at 1st line of text */}
            <div 
              aria-hidden="true"
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="invisible select-none pointer-events-none mb-4 uppercase tracking-normal hidden md:block"
            >
              CONCLUSION
            </div>

            <div 
              style={{ width: '605px', maxWidth: '100%', aspectRatio: '605 / 658' }}
              className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl"
            >
              <img 
                src="/m6.png" 
                alt="Nivala Conclusion (605x658)" 
                className="w-full h-full object-cover object-top block select-none rounded-none"
              />
            </div>
          </ScrollDownReveal>

          {/* Right: Heading + Text */}
          <div className="text-left order-1 md:order-2 flex flex-col justify-start">
            <h2 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-4 font-['Inter',sans-serif] text-[32px] font-medium leading-[1.2] select-none"
            >
              CONCLUSION
            </h2>
            <div 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300 space-y-5"
            >
              <p>
                NIVALA demonstrates how technology can address food waste and insecurity by connecting donors, NGOs, and volunteers through a coordinated, community-first system. It focuses on making surplus food accessible, improving donation coordination, and encouraging participation. Through intuitive interfaces and structured workflows, NIVALA envisions an organized approach to food sharing.
              </p>
              <p>
                The platform highlights collaboration between individuals, organizations, and communities. By simplifying donations and promoting responsible food practices, it aims to create social value and support sustainability. Food is more than a necessity; it is a resource we should never take for granted. While food goes to waste, many struggle for their next meal. NIVALA envisions a world where surplus is shared, donations create opportunities, and technology unites people for a common cause.
              </p>
              <p className="font-bold text-white">
                &ldquo;Don&apos;t let good food go to waste. Share it, save it, and serve humanity.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee Strip (Full bleed continuous left-to-right flow with pause on hover) */}
        <div 
          style={{
            height: '70px',
            borderTop: '1px solid #c7ff8b',
            borderBottom: '1px solid #c7ff8b',
            backgroundColor: '#000000',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
          }}
          className="mb-20 sm:mb-24 overflow-hidden select-none flex items-center relative marquee-container cursor-default"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          <div 
            style={{
              animationPlayState: isMarqueePaused ? 'paused' : 'running',
              animationDuration: '96s',
            }}
            className="flex items-center shrink-0 w-max animate-marquee-right"
          >
            {/* Duplicated list so translation from -50% to 0% creates a seamless, uninterrupted loop flowing from left to right */}
            {(() => {
              const techItems = [
                'React.js',
                'HTML5',
                'CSS3',
                'JavaScript',
                'Tailwind CSS',
                'Node.js',
                'Express.js',
                'MySQL',
                'REST APIs',
                'JWT Authentication',
                'Postman',
                'Figma',
                'UI Design',
                'Wireframing',
                'Google AI Studio'
              ];
              // Repeat 4 times to ensure full width seamless loop
              const fullList = [...techItems, ...techItems, ...techItems, ...techItems];
              return fullList.map((tech, idx) => (
                <span 
                  key={idx} 
                  style={{
                    fontFamily: "'Jersey 10', sans-serif",
                    fontSize: '34px',
                    lineHeight: '1',
                    letterSpacing: '0.12em',
                  }}
                  onMouseEnter={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  className="text-[#c7ff8b] uppercase tracking-wider shrink-0 select-none whitespace-nowrap font-normal px-8 sm:px-12 transition-colors duration-150 hover:text-white cursor-pointer"
                >
                  {tech}
                </span>
              ));
            })()}
          </div>
        </div>

        {/* 8. App Mockups (What I Bring style Sticky Scroll-on Overlay) */}
        <div className="w-full relative flex flex-col items-center pb-[18vh] sm:pb-[24vh]">
          {/* Layer 1: Mockup 1 (o.png) Left & Mockup 2 (p.png) Right */}
          <div className="sticky top-20 sm:top-24 z-10 w-full flex items-center justify-between pointer-events-none">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start pointer-events-auto">
                <img 
                  src="/o.png" 
                  alt="Nivala Available Food Listing Screen Mockup" 
                  className="max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[520px] w-auto object-contain block select-none bg-[#131313]"
                />
              </div>
              <div className="flex items-center justify-end pointer-events-auto">
                <img 
                  src="/p.png" 
                  alt="Nivala Donate Screen Mockup" 
                  className="max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[520px] w-auto object-contain block select-none bg-[#131313]"
                />
              </div>
            </div>
          </div>

          {/* Layer 2: Mockup 3 (n.png) Left & Mockup 4 (k.png) Right - Slow deliberate scroll-on overlay on 1 & 2 */}
          <div className="sticky top-20 sm:top-24 z-20 w-full flex items-center justify-between pointer-events-none mt-[150vh] sm:mt-[180vh] md:mt-[210vh]">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start pointer-events-auto">
                <img 
                  src="/n.png" 
                  alt="Nivala Receive Food Detail Screen Mockup" 
                  className="max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[520px] w-auto object-contain block select-none bg-[#131313]"
                />
              </div>
              <div className="flex items-center justify-end pointer-events-auto">
                <img 
                  src="/k.png" 
                  alt="Nivala Home Screen Mockup" 
                  className="max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[520px] w-auto object-contain block select-none bg-[#131313]"
                />
              </div>
            </div>
          </div>

          {/* Layer 3: Mockup 5 (m.png) Center - Slow deliberate scroll-on alignment between 3 & 4 */}
          <div className="sticky top-20 sm:top-24 z-30 w-full flex items-center justify-center pointer-events-none mt-[150vh] sm:mt-[180vh] md:mt-[210vh]">
            <div className="w-full flex items-center justify-center">
              <div className="flex items-center justify-center pointer-events-auto">
                <img 
                  src="/m.png" 
                  alt="Nivala Splash Welcome Screen Mockup" 
                  className="max-h-[360px] sm:max-h-[440px] md:max-h-[480px] lg:max-h-[520px] w-auto object-contain block select-none bg-[#131313]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 9. Dimension 1320 * 720 Box (No Shadow) */}
        <div className="w-full flex justify-center mb-10 sm:mb-14">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.15}
            className="w-full flex justify-center"
          >
            <div 
              ref={videoContainerRef}
              onClick={handleTogglePlayPause}
              style={{ width: '1320px', maxWidth: '100%', aspectRatio: '1320 / 720' }}
              className="relative w-full rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-none flex items-center justify-center group cursor-pointer"
            >
              <video
                ref={videoRef}
                src="/nivala-video.mp4"
                muted
                playsInline
                onEnded={handleVideoEnded}
                onPlay={() => {
                  setIsVideoPlaying(true);
                  setHasStarted(true);
                  setIsVideoEnded(false);
                }}
                onPause={() => setIsVideoPlaying(false)}
                className="w-full h-full object-cover rounded-none block bg-black select-none pointer-events-none"
              />

              {!isVideoPlaying && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePlayPause();
                  }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer z-20 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePlayPause();
                    }}
                    className="group/btn relative flex items-center justify-center cursor-pointer p-0 bg-transparent border-0 outline-none transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
                    aria-label="Play / Resume video"
                  >
                    <svg 
                      viewBox="0 0 100 100" 
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#c7ff8b] transition-colors duration-200 group-hover/btn:text-[#d8ffaa]"
                    >
                      {/* Rounded Triangular Play Button in website green (No circle) */}
                      <path 
                        d="M26 20 C26 16.5 30.0 14.3 33.1 16.1 L83.5 45.1 C86.6 46.9 86.6 52.1 83.5 53.9 L33.1 82.9 C30.0 84.7 26 82.5 26 79 Z" 
                        fill="currentColor"
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeLinejoin="round" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </ScrollDownReveal>
        </div>

        {/* Next Project Button */}
        <div className="w-full flex justify-center pt-8 sm:pt-10 pb-16 sm:pb-20">
          <button
            onClick={() => {
              if (onNextProject) {
                onNextProject();
              } else {
                onClose();
              }
            }}
            className="inline-flex items-center gap-2.5 text-white hover:text-[#c7ff8b] active:text-[#c7ff8b] font-['Inter',sans-serif] text-xl font-medium tracking-tight transition-colors duration-200 cursor-pointer group"
          >
            <span>Next project</span>
            <ArrowRight className="w-5 h-5 text-current stroke-[1.75] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </main>
    </div>
  );
};
