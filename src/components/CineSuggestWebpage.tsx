import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ChevronLeft,
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  Globe,
  Code
} from 'lucide-react';
import { GitRepoButton } from './GitRepoButton';
import { LiveDemoButton } from './LiveDemoButton';

interface CineSuggestWebpageProps {
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
              // Below the screen: reset to hidden so it animates when scrolling DOWN into view
              setIsVisible(false);
              setShouldAnimate(false);
            } else if (elementRect.bottom <= containerRect.top + 40) {
              // Above the screen: keep visible so scrolling UP into view stays visible without re-animating
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

export const CineSuggestWebpage: React.FC<CineSuggestWebpageProps> = ({ 
  isOpen, 
  onClose,
  onOpenResume,
  onNextProject
}) => {
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const savedScrollPositionRef = useRef<number>(0);
  const isNavigatingToSectionRef = useRef<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const scrollDirRef = useRef<'down' | 'up'>('down');

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
      // Save the exact window scroll position where the user opened the project description
      savedScrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.overflow = 'hidden';
      
      // Always reset the description webpage scroll position to top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      });
      lastScrollTopRef.current = 0;
      scrollDirRef.current = 'down';
    } else {
      document.body.style.overflow = 'unset';
      if (isNavigatingToSectionRef.current) {
        isNavigatingToSectionRef.current = false;
      } else if (savedScrollPositionRef.current !== undefined) {
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

  const handleBackToProjects = () => {
    onClose();
  };

  if (!isOpen) {
    return (
      <div className="hidden" aria-hidden="true">
        <img src="/cinesuggest-phone-mockup.png" alt="" loading="eager" />
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="fixed inset-0 z-40 bg-[#131313] text-[#e0e0e0] flex flex-col overflow-y-auto overflow-x-hidden selection:bg-[#42dfca] selection:text-black"
    >
      {/* Back Arrow Button (Clean chevron arrow with green hover) */}
      <div className="fixed top-5 sm:top-6 left-2.5 sm:left-4 z-50">
        <button 
          onClick={handleBackToProjects}
          className="group flex items-center justify-center p-1.5 bg-transparent transition-colors duration-200 cursor-pointer select-none border-0 shadow-none outline-none"
          aria-label="Back to Projects"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#c7ff8b] stroke-[3] transition-colors duration-200" />
        </button>
      </div>

      {/* Main Page Content */}
      <main className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-0 flex flex-col items-center">
        
        {/* Top Hero Card with Cine-Suggest Header & Phone Mockup */}
        <div 
          style={{ 
            background: 'linear-gradient(90deg, rgba(95, 52, 52, 0.54) 0%, rgba(46, 46, 46, 0.54) 100%)',
            minHeight: '240px',
          }}
          className="w-full relative rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 md:px-10 pt-6 pb-6 md:py-0 md:h-[240px] mb-12 overflow-hidden flex flex-col md:flex-row items-center justify-between border-0 select-none"
        >
          {/* Left Column: Heading & Interactive Action Buttons */}
          <div className="flex-1 flex flex-col justify-center z-10 w-full md:max-w-[55%] md:pt-3 md:pb-6 md:-translate-y-2">
            {/* CINE SUGGEST in JERSEY 10 with 5% letter-spacing */}
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
              CINE SUGGEST
            </h1>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Git Repo Vector Button (Crisp SVG & CSS) */}
              <GitRepoButton 
                href="https://github.com/tandonrishav18/CineSuggest" 
                className="w-[165px] sm:w-[200px] md:w-[222px]" 
              />

              {/* Globe / Live Demo Squircle Button */}
              <LiveDemoButton 
                href="https://cine-suggest-murex.vercel.app/" 
                className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] md:w-[60px] md:h-[60px]" 
              />
            </div>
          </div>

          {/* Right Column: Phone Mockup (Flush with bottom, zoom in hover effect ONLY on phone device) */}
          <div className="w-full md:w-[48%] md:absolute md:-right-2 lg:-right-2 md:top-0 md:bottom-0 flex items-end justify-center md:justify-end mt-4 md:mt-0 z-10 pointer-events-none">
            <div className="relative inline-flex items-end h-full max-h-[240px] sm:max-h-[255px] md:max-h-[265px] lg:max-h-[275px]">
              {/* Interactive Hitbox specifically tracking hover only over the phone screen bounds */}
              <div 
                onMouseEnter={() => setIsPhoneHovered(true)}
                onMouseLeave={() => setIsPhoneHovered(false)}
                className="absolute left-[29.3%] right-[7.2%] top-[7.1%] bottom-0 cursor-pointer pointer-events-auto rounded-[32px] sm:rounded-[36px] z-20"
              />
              <img 
                src="/cinesuggest-phone-mockup.png" 
                alt="CineSuggest App Phone Mockup" 
                loading="eager"
                className={`w-auto h-full max-h-[240px] sm:max-h-[255px] md:max-h-[265px] lg:max-h-[275px] object-contain object-bottom select-none translate-y-1 origin-bottom-right transition-transform duration-300 ease-out pointer-events-none ${
                  isPhoneHovered ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section: Problem, Idea & Approach (Two-Column Layout matching design) */}
        <div className="w-full mb-16 text-left">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left Column: Problem & Idea */}
            <div className="flex flex-col text-left">
              {/* Problem */}
              <div className="mb-10 sm:mb-12">
                <h2 
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 500, 
                    fontSize: '32px',
                    lineHeight: 1.2,
                  }}
                  className="text-[#c7ff8b] uppercase tracking-normal mb-4"
                >
                  PROBLEM
                </h2>
                <p 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                  className="text-neutral-300 text-justify"
                >
                  Too many movies, too little clarity. With an ever growing library of movies, finding something that truly matches a user's taste can feel overwhelming. Most platforms rely heavily on generic trending lists and basic filters, while ratings, reviews, trailers, and personal preferences remain disconnected from the discovery experience. Users need a platform that not only helps them find movies, but understands what they like and why. CineSuggest addresses this gap by bringing together API driven movie data, genre based discovery, ratings, reviews, watchlist management, trending content, and personalized recommendations within a clean and intuitive interface.
                </p>
              </div>

              {/* Idea */}
              <div>
                <h2 
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 500, 
                    fontSize: '32px',
                    lineHeight: 1.2,
                  }}
                  className="text-[#c7ff8b] uppercase tracking-normal mb-4"
                >
                  IDEA
                </h2>
                <p 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.5,
                    textAlign: 'justify',
                  }}
                  className="text-neutral-300 text-justify"
                >
                  What if finding your next movie felt more personal than endless scrolling? CineSuggest brings movie discovery, ratings, reviews, genre based exploration, CineList, Trending Now, and intelligent recommendations into one experience, using what users watch and rate to gradually understand their taste and help them discover what they might enjoy next, making every recommendation feel more relevant, intentional, and personal. It turns everyday movie choices into meaningful preferences, creating a discovery experience that grows smarter with every interaction and helps users explore beyond the obvious choices.
                </p>
              </div>
            </div>

            {/* Right Column: Approach */}
            <div className="flex flex-col text-left">
              <h2 
                style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontWeight: 500, 
                  fontSize: '32px',
                  lineHeight: 1.2,
                }}
                className="text-[#c7ff8b] uppercase tracking-normal mb-4"
              >
                APPROACH
              </h2>
              <div 
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1.5,
                  textAlign: 'justify',
                }}
                className="text-neutral-300 text-justify space-y-6"
              >
                <p>
                  Built around how people actually discover movies. A clean, user focused UI/UX brings movie browsing, genre based exploration, ratings, reviews, trailers, Trending Now, and CineList into one seamless experience. The frontend uses HTML, CSS, and JavaScript, with reusable components that dynamically render movie cards from database driven data. Java Spring Boot powers the backend, while REST APIs connect the interface with MySQL, enabling movie information, user activity, ratings, reviews, and CineList data to flow dynamically across the platform.
                </p>
                <p>
                  The recommendation layer combines Content Based Filtering and Item Based Collaborative Filtering to understand both movie characteristics and user preferences. TF IDF converts movie descriptions and metadata into feature representations, while Cosine Similarity identifies movies with similar characteristics. User rating patterns further strengthen recommendations, with these signals combined through a Hybrid Recommendation System to generate personalized suggestions. Genre based filtering, Trending Now, and Cine Digest complement the recommendation engine by giving users both personalized discovery and a broader view of what is happening in cinema. Together, these features create a smarter, more engaging, and highly personalized movie discovery experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Description (Original style, orientation, and content preserved) */}
        <div className="w-full mb-14 text-left">
          <h2 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-4"
          >
            DESCRIPTION
          </h2>
          <div 
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: 1.5,
              textAlign: 'justify',
            }}
            className="text-neutral-300 text-justify space-y-6"
          >
            <p>
              CineSuggest is a full stack movie review and recommendation platform designed to make movie discovery more personalized and engaging. Users can browse a large collection of movies, filter them by genre, explore a Trending Now section, view posters, ratings, details and trailers, and once logged in, rate movies from 1–5 stars in 0.5 increments and write reviews. Users can also save movies to CineList, a personal watchlist or wishlist. The frontend is built with HTML, CSS and JavaScript, with a reusable movie card system that dynamically displays movies from the database instead of manually creating cards for every movie.
            </p>
            <p>
              Behind the interface, Java Spring Boot handles the backend and REST APIs, while MySQL stores users, movies, ratings, reviews and CineList data. The recommendation system uses content based filtering, TF IDF, cosine similarity and item based collaborative filtering to understand both movie characteristics and user rating behaviour. These approaches are combined into a hybrid recommendation system that suggests movies based on a user's interests and interactions. The platform also includes Cine Digest, a dedicated section for discovering what's trending and happening in the world of cinema. Overall, CineSuggest brings together UI/UX design, frontend development, backend engineering, APIs, database management and machine learning into one complete movie discovery experience.
            </p>
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
          className="mb-14 overflow-hidden select-none flex items-center relative marquee-container cursor-default"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          <div 
            style={{
              animationPlayState: isMarqueePaused ? 'paused' : 'running',
            }}
            className="flex items-center shrink-0 w-max animate-marquee-right"
          >
            {/* Duplicated list so translation from -50% to 0% creates a seamless, uninterrupted loop flowing from left to right */}
            {(() => {
              const techItems = [
                'HTML',
                'CSS',
                'JAVASCRIPT',
                'TYPESCRIPT',
                'JAVA',
                'SPRING BOOT',
                'REST APIS',
                'MYSQL',
                'TF-IDF',
                'COSINE SIMILARITY',
                'COLLABORATIVE FILTERING',
                'FIGMA'
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

        {/* Code Img / Demo Video Row with Left & Right Full-Bleed 540px-high Boxes */}
        <div 
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
          }}
          className="w-full mb-12 flex items-center justify-center gap-6 sm:gap-8 overflow-hidden px-0"
        >
          {/* Left Box (Height 540, covers all space to left screen edge) */}
          <div className="flex-1 min-w-0 h-[540px] bg-black relative overflow-hidden rounded-none flex items-center justify-end">
            <img 
              src="/cinesuggest-box-left.png" 
              alt="CineSuggest Code Left Showcase" 
              className="w-full h-full object-cover object-right block"
            />
          </div>

          {/* Center Demo Video Box (540x540) */}
          <div className="w-[540px] h-[540px] max-w-full aspect-square bg-black relative overflow-hidden rounded-2xl flex items-center justify-center shrink-0 select-none">
            <video 
              src="/cinesuggest-demo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              disablePictureInPicture
              disableRemotePlayback
              controls={false}
              className="w-full h-full object-cover block pointer-events-none select-none"
              tabIndex={-1}
              aria-hidden="true"
            />
            {/* Transparent overlay blocking any browser hover toolbar extensions */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-transparent" />
          </div>

          {/* Right Box (Height 540, covers all space to right screen edge) */}
          <div className="flex-1 min-w-0 h-[540px] bg-black relative overflow-hidden rounded-none flex items-center justify-end">
            <img 
              src="/cinesuggest-box-right.png" 
              alt="CineSuggest Code Right Showcase" 
              className="w-full h-full object-cover object-right block"
            />
          </div>
        </div>

        {/* Brand & Showcase Images Section */}
        <div className="w-full flex flex-col gap-8">
          {/* 1. First Showcase Image */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full rounded-2xl overflow-hidden bg-black"
          >
            <img 
              src="/cinesuggest-gdrive-1.png" 
              alt="Showcase Image 1" 
              className="w-full h-auto object-cover block"
            />
          </ScrollDownReveal>

          {/* 2 & 3. Side-by-side 2-column image layout for 2nd row with gap */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[68%_1fr] gap-6 sm:gap-8 items-stretch">
            {/* 2. Image 2 */}
            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center"
            >
              <img 
                src="/cinesuggest-gdrive-row2.png" 
                alt="CineSuggest Review UI" 
                className="w-full h-full object-cover object-left-top block"
              />
            </ScrollDownReveal>
            {/* 3. Image 3 */}
            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.4}
              className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center"
            >
              <img 
                src="/cinesuggest-gdrive-2right.png" 
                alt="Share Cinema Review UI" 
                className="w-full h-full object-cover object-center block"
              />
            </ScrollDownReveal>
          </div>

          {/* 4. CineSuggest Dashboard UI Showcase (Image 4) */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full rounded-2xl overflow-hidden bg-black"
          >
            <img 
              src="/cinesuggest-gdrive-3.png" 
              alt="CineSuggest Dashboard Showcase" 
              className="w-full h-auto object-cover block"
            />
          </ScrollDownReveal>

          {/* 5, 6. Showcase Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 5. Image 5 */}
            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center"
            >
              <img 
                src="/cinesuggest-grid-1.png" 
                alt="Showcase Asset 1" 
                className="w-full h-auto object-cover block"
              />
            </ScrollDownReveal>
            {/* 6. Image 6 */}
            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.4}
              className="w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center"
            >
              <img 
                src="/cinesuggest-img-6.png" 
                alt="CineSuggest Showcase Image 6" 
                className="w-full h-auto object-cover block"
              />
            </ScrollDownReveal>
          </div>

          {/* 9. Ninth Showcase Image */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full rounded-2xl overflow-hidden bg-black"
          >
            <img 
              src="/cinesuggest-img-9.png" 
              alt="CineSuggest Showcase Image 9" 
              className="w-full h-auto object-cover block"
            />
          </ScrollDownReveal>

          {/* 10. Tenth Showcase Image */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full rounded-2xl overflow-hidden bg-black"
          >
            <img 
              src="/cinesuggest-img-10.png" 
              alt="CineSuggest Showcase Image 10" 
              className="w-full h-auto object-cover block"
            />
          </ScrollDownReveal>
        </div>

        {/* Next Project Button */}
        <div className="w-full flex justify-center py-20">
          <button
            onClick={() => {
              if (onNextProject) {
                onNextProject();
              } else {
                onClose();
              }
            }}
            className="inline-flex items-center gap-2.5 text-white hover:text-[#BEE186] active:text-[#BEE186] font-['Inter',sans-serif] text-xl font-medium tracking-tight transition-colors duration-200 cursor-pointer group"
          >
            <span>Next project</span>
            <ArrowRight className="w-5 h-5 text-current stroke-[1.75] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

      </main>
    </div>
  );
};
