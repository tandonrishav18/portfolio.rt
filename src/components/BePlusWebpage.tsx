import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { GitRepoButton } from './GitRepoButton';
import { LiveDemoButton } from './LiveDemoButton';

interface BePlusWebpageProps {
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

export const BePlusWebpage: React.FC<BePlusWebpageProps> = ({ 
  isOpen, 
  onClose,
  onOpenResume,
  onNextProject
}) => {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isMockupHovered, setIsMockupHovered] = useState(false);
  const savedScrollPositionRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const scrollDirRef = useRef<'down' | 'up'>('down');
  const stickySectionRef = useRef<HTMLDivElement>(null);
  const overlayCardRef = useRef<HTMLDivElement>(null);

  const updateOverlayProgress = useCallback(() => {
    const container = scrollContainerRef.current;
    const section = stickySectionRef.current;
    const card = overlayCardRef.current;
    if (!container || !section || !card) return;

    const sectionRect = section.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const relativeTop = sectionRect.top - containerRect.top;

    // Sticky top offset matching CSS top-6 sm:top-8 md:top-12
    const stickyTop = window.innerWidth >= 768 ? 48 : window.innerWidth >= 640 ? 32 : 24;
    
    // Card height based on exact 1313x738 aspect ratio
    const cardHeight = card.offsetHeight || (sectionRect.width * (738 / 1313));
    const totalScrollDistance = section.offsetHeight - cardHeight - stickyTop;

    if (totalScrollDistance > 0) {
      const scrolledIntoSticky = stickyTop - relativeTop;
      // Second image slides up smoothly as user scrolls through the sticky section
      const activeRange = totalScrollDistance;
      const progress = Math.min(Math.max(scrolledIntoSticky / activeRange, 0), 1);
      
      const translateYPercent = (1 - progress) * 100;
      card.style.transform = `translate3d(0, ${translateYPercent.toFixed(2)}%, 0)`;
    } else {
      card.style.transform = 'translate3d(0, 100%, 0)';
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const st = e.currentTarget.scrollTop;
    if (st > lastScrollTopRef.current) {
      scrollDirRef.current = 'down';
    } else if (st < lastScrollTopRef.current) {
      scrollDirRef.current = 'up';
    }
    lastScrollTopRef.current = st;
    updateOverlayProgress();
  };

  useEffect(() => {
    if (isOpen) {
      updateOverlayProgress();
      const onResize = () => updateOverlayProgress();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [isOpen, updateOverlayProgress]);

  useEffect(() => {
    if (isOpen) {
      savedScrollPositionRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.overflow = 'hidden';
      
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

  if (!isOpen) {
    return (
      <div className="hidden" aria-hidden="true">
        <img 
          src="/943shots_so.png" 
          alt="" 
          loading="eager" 
          decoding="sync" 
        />
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="fixed inset-0 z-40 bg-[#131313] text-[#e0e0e0] flex flex-col overflow-y-auto overflow-x-hidden selection:bg-[#42dfca] selection:text-black"
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
        
        {/* Top Hero Card with BE+ Header & Screen Mockup */}
        <div 
          style={{ 
            background: 'linear-gradient(90deg, rgba(95, 52, 52, 0.54) 0%, rgba(46, 46, 46, 0.54) 100%)',
            minHeight: '240px',
          }}
          className="w-full relative rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 md:px-10 pt-6 pb-6 md:py-0 md:h-[240px] mb-20 sm:mb-24 overflow-hidden flex flex-col md:flex-row items-center justify-between border-0 select-none"
        >
          {/* Left Column: Heading & Interactive Action Buttons */}
          <div className="flex-1 flex flex-col justify-center z-10 w-full md:max-w-[calc(100%-250px)] lg:max-w-[calc(100%-280px)] md:pt-3 md:pb-6 md:-translate-y-2">
            {/* BLOOD GROUP DETECTION USING FINGERPRINTS in JERSEY 10 - 50px */}
            <h1 
              style={{ 
                fontFamily: "'Jersey 10', 'Silkscreen', monospace", 
                fontWeight: 400, 
                fontStyle: 'normal',
                letterSpacing: '0.04em',
                fontSize: '50px',
                lineHeight: 1,
              }} 
              className="font-jersey text-white uppercase leading-none select-none mb-5 sm:mb-6 md:mb-6 whitespace-nowrap text-[50px]"
            >
              BLOOD GROUP DETECTION USING FINGERPRINTS
            </h1>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Git Repo Vector Button */}
              <GitRepoButton 
                href="https://github.com/tandonrishav18/Be-" 
                className="w-[165px] sm:w-[200px] md:w-[222px]" 
              />

              {/* Globe / Live Demo Squircle Button */}
              <LiveDemoButton 
                href="https://be-plus-frontend.vercel.app/" 
                className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] md:w-[60px] md:h-[60px]" 
              />
            </div>
          </div>

          {/* Right Column: Phone Mockup (Flush with bottom, zoom in hover effect ONLY on phone device) */}
          <div className="w-full md:w-[48%] md:absolute md:-right-2 lg:-right-2 md:top-0 md:bottom-0 flex items-end justify-center md:justify-end mt-4 md:mt-0 z-10 pointer-events-none">
            <div className="relative inline-flex items-end h-full max-h-[240px] sm:max-h-[255px] md:max-h-[265px] lg:max-h-[275px]">
              {/* Interactive Hitbox specifically tracking hover only over the phone screen bounds */}
              <div 
                onMouseEnter={() => setIsMockupHovered(true)}
                onMouseLeave={() => setIsMockupHovered(false)}
                className="absolute left-[29.3%] right-[7.2%] top-[7.1%] bottom-0 cursor-pointer pointer-events-auto rounded-[32px] sm:rounded-[36px] z-20"
              />
              <img 
                src="/943shots_so.png" 
                alt="BE+ App Phone Mockup" 
                loading="eager"
                decoding="sync"
                className={`w-auto h-full max-h-[240px] sm:max-h-[255px] md:max-h-[265px] lg:max-h-[275px] object-contain object-bottom select-none translate-y-1 origin-bottom-right transition-transform duration-300 ease-out pointer-events-none ${
                  isMockupHovered ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          </div>
        </div>

        {/* 1. Problem Section (Heading Top, Text Left, Image Right aligned to start and end of text) */}
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
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
                “Knowing your blood group shouldn't always have to start with a needle.” Traditional blood group identification requires a blood sample, laboratory procedures, reagents, and trained personnel, making the process invasive and dependent on suitable testing facilities. For some individuals, particularly those with trypanophobia (fear of needles), even a routine blood draw can be uncomfortable or anxiety inducing.
              </p>
              <p>
                This creates an opportunity to explore a simpler, non-invasive approach using biometric information. Be+ addresses this research gap by investigating whether fingerprint images can be analyzed using deep learning to predict blood-group categories, offering a research-oriented alternative to conventional blood-based identification.
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full h-full flex justify-center items-stretch"
            >
              <div className="relative w-full h-full min-h-[260px] md:min-h-0 rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl">
                <img 
                  src="/5.png" 
                  alt="Problem - Fear of Needles & Blood Group Identification" 
                  className="w-full h-full md:absolute md:inset-0 object-cover object-top block select-none rounded-none"
                />
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 2. Idea Section (Image Left, Text Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center mb-20 sm:mb-24">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full order-2 md:order-1 flex justify-center items-center"
          >
            <div className="w-[604px] max-w-full flex items-center justify-center">
              <img 
                src="/PP.png" 
                alt="Trypanophobia? Know your type without the needle" 
                className="w-full h-auto object-contain block select-none"
              />
            </div>
          </ScrollDownReveal>

          <div className="text-left order-1 md:order-2">
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
                Blood Group Detection Using Fingerprints explores a non-invasive approach to blood group prediction by using fingerprint images as the input instead of a blood sample. The idea is to use deep learning to learn visual patterns and ridge characteristics from labeled fingerprint images and classify them into the eight ABO/Rh blood groups: A+, A-, B+, B-, AB+, AB-, O+, and O-.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Approach Section (Heading Top, Text Left, Image Right aligned to start and end of text) */}
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
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
                The process begins with collecting fingerprint images and preparing them for deep learning analysis. The images undergo preprocessing steps such as resizing, normalization, and augmentation to bring them into a consistent and suitable format. Each fingerprint is then assigned to one of the eight blood-group classes: A+, A-, B+, B-, AB+, AB-, O+, and O-, allowing the model to learn the relationship between fingerprint patterns and their corresponding classes.
              </p>
              <p>
                Different CNN architectures: AlexNet, LeNet, ResNet, and VGG were explored to extract meaningful features from the fingerprint images and perform classification. The models are evaluated using accuracy, precision, recall, F1-score, confusion matrices, and AUC to understand their classification performance across the different blood group categories. The final testing workflow allows a new fingerprint image to be given as input and produces a predicted blood group category along with its confidence.
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full h-full flex justify-center items-stretch"
            >
              <div className="relative w-full h-full min-h-[260px] md:min-h-0 rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl">
                <img 
                  src="/aprh.png" 
                  alt="Approach - Deep Learning CNN Architecture Workflow" 
                  className="w-full h-full md:absolute md:inset-0 object-cover object-top block select-none rounded-none"
                />
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 4. Impact Section (Image Left, Text Right with Heading above Text) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch mb-20 sm:mb-24">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full h-full flex flex-col justify-between items-stretch order-2 md:order-1"
          >
            {/* Invisible heading spacer to match the height of 'IMPACT' heading so the image starts exactly at 'Be+ explores...' */}
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

            <div className="relative w-full flex-1 min-h-[260px] md:min-h-0 rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-xl">
              <img 
                src="/8.jpg" 
                alt="Impact - UN SDG 3 & SDG 9 Biometric Healthcare Impact" 
                className="w-full h-full md:absolute md:inset-0 object-cover object-top block select-none rounded-none"
              />
            </div>
          </ScrollDownReveal>

          <div className="text-left order-1 md:order-2">
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
                Be+ explores how technology can make blood group prediction more accessible and less invasive. By combining AI, deep learning, image processing, and biometric analysis, the project demonstrates how a simple fingerprint image can be analyzed to predict a blood group category without directly collecting a blood sample. This creates a foundation for future automated, screening-oriented applications and highlights the potential of computer vision in healthcare and biomedical research.
              </p>
              <p>
                The project also connects with UN Sustainable Development Goal 3 - Good Health and Well-being and SDG 9 - Industry, Innovation and Infrastructure by exploring an innovative, technology-driven approach to healthcare. At the same time, the system remains a research-oriented concept, with further work needed in larger and more diverse datasets, broader real-world testing, and validation before it can be considered for clinical applications.
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
              Be+ is a research oriented fingerprint-based blood group prediction system that explores a non-invasive alternative to conventional blood group identification. The idea is to use a fingerprint image as the input and apply deep learning to predict one of the eight blood-group categories: A+, A-, B+, B-, AB+, AB-, O+, and O-. The project combines biometric image analysis, computer vision, and deep learning to investigate whether meaningful patterns in fingerprint images can be used for automated blood group prediction. The process begins with the fingerprint dataset, where images are organized according to their respective blood group classes. The images undergo resizing, normalization, segmentation/noise handling, and data augmentation, followed by label encoding and division into training, validation, and testing sets.
            </p>
            <p>
              For the machine learning stage, multiple CNN architectures: AlexNet, LeNet, ResNet, and VGG were explored to learn visual features from fingerprint images and perform classification. The CNNs use deep feature extraction with a Softmax based output to determine the predicted blood group category. The models were implemented using Python and PyTorch, with OpenCV, NumPy, Pandas, Scikit-learn, and Matplotlib supporting image processing, data handling, evaluation, and visualization. The models were evaluated using accuracy, precision, recall, F1-score, confusion matrices, MSE, and AUC. The proposed CNN approach achieved 96.8% training accuracy, 95.2% precision, 94.6% recall, 94.9% F1-score, 0.97 AUC, and 94.5% validation accuracy. The evaluation also showed some confusion between visually similar classes such as A+/A- and O+/O-, while AB- and B- presented additional challenges.
            </p>
            <p>
              Beyond the machine learning model, the project was developed into a user-facing Be+ mobile application interface using React, HTML, CSS, and JavaScript, with dedicated Home, Fingerprint Test/Upload, Results/Report, and Profile screens. The overall workflow connects the frontend interface &gt; backend &gt; trained deep learning model &gt; prediction &gt; result display, allowing a fingerprint image to be processed and its predicted blood group and confidence to be presented to the user. The project is positioned as a proof of concept and research exploration, with future scope including larger and more diverse datasets, stronger CNN architectures, broader real-world validation, improved robustness, and web/mobile deployment.
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
          className="mb-20 sm:mb-24 overflow-hidden select-none flex items-center relative marquee-container cursor-default"
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
                'Python',
                'PyTorch',
                'OpenCV',
                'NumPy',
                'Pandas',
                'CNN',
                'Image Processing',
                'Scikit-learn',
                'Matplotlib',
                'AlexNet',
                'LeNet',
                'ResNet',
                'React',
                'HTML5',
                'CSS3',
                'JavaScript'
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

        {/* 6. Result Section (Heading Top, Text Left, 2 Phone Mockups Right aligned 1st line to last line) */}
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
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
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
                The Be+ model successfully performs fingerprint based classification across eight blood group categories: A+, A–, B+, B–, AB+, AB–, O+, and O–. After preprocessing the fingerprint images and training different CNN architectures including AlexNet, LeNet, ResNet, and VGG, the proposed CNN approach achieved 96.8% training accuracy and 94.5% validation accuracy, along with 95.2% precision, 94.6% recall, 94.9% F1 score, and 0.97 AUC. The evaluation showed that the model was able to learn meaningful fingerprint features for classification, although some confusion was observed between visually similar classes such as A+ and A–, and O+ and O–. The comparatively less represented AB– and B– classes also presented additional classification challenges. These results demonstrate the feasibility of the proposed approach while highlighting areas where further dataset expansion and model improvement can enhance classification consistency and reliability.
              </p>
            </div>

            <ScrollDownReveal 
              containerRef={scrollContainerRef}
              scrollDirRef={scrollDirRef}
              delay={0.2}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-full flex items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 py-1">
                <div className="flex items-center justify-center">
                  <img 
                    src="/B1_trimmed.png" 
                    alt="Be+ Blood Group Detection Mobile App - Home Screen" 
                    className="max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px] w-auto object-contain block select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="/B3_trimmed.png" 
                    alt="Be+ Blood Group Detection Mobile App - Upload Fingerprint Screen" 
                    className="max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px] w-auto object-contain block select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </ScrollDownReveal>
          </div>
        </div>

        {/* 7. Conclusion Section (2 Phone Mockups BE4 & BE5 Left, Heading + Text Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20 sm:mb-24">
          {/* Left: 2 Phone Mockups BE4 & BE5 */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full h-full flex items-center justify-center order-2 md:order-1 pt-0 md:pt-2"
          >
            <div className="w-full flex items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 py-1">
              <div className="flex items-center justify-center">
                <img 
                  src="/BE4_trimmed.png" 
                  alt="Be+ Blood Group Detection Mobile App - Report Screen (BE4)" 
                  className="max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px] w-auto object-contain block select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/BE5_trimmed.png" 
                  alt="Be+ Blood Group Detection Mobile App - Profile Screen (BE5)" 
                  className="max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px] w-auto object-contain block select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </ScrollDownReveal>

          {/* Right: Heading + Text */}
          <div className="text-left order-1 md:order-2">
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
                Be+ demonstrates the potential of using fingerprint images and deep learning to explore blood group prediction across eight blood group categories: A+, A-, B+, B-, AB+, AB-, O+, and O-. The project combines image preprocessing, CNN based classification, biometric analysis, and a user focused application to create an end to end prediction system. The results show promising performance while also highlighting the need for larger datasets, improved model robustness, and broader real world validation. Overall, Be+ serves as a research oriented proof of concept for exploring non invasive biometric approaches to blood group prediction, while creating opportunities for further development in AI driven healthcare applications and biometric based medical research, with potential for future innovation, improved accessibility, and broader exploration of intelligent healthcare solutions.
              </p>
            </div>
          </div>
        </div>

        {/* 8. Antigravity IDE Showcase: Sticky Stacking Overlay (B11 & B12) - Dimensions 1313x738 */}
        <div 
          ref={stickySectionRef}
          className="relative w-full max-w-[1313px] h-[135vh] sm:h-[145vh] md:h-[150vh] mb-0 select-none"
        >
          {/* Sticky Pin Frame */}
          <div className="sticky top-6 sm:top-8 md:top-12 w-full flex justify-center z-10">
            <div 
              className="relative w-[1313px] max-w-full aspect-[1313/738] rounded-none overflow-hidden border border-neutral-800/80 bg-[#0d0e11] shadow-2xl"
              style={{ width: '1313px', maxWidth: '100%', aspectRatio: '1313 / 738' }}
            >
              {/* Base Image: B11 (Project Structure, Explorer and Workspace) - Sticks firmly in place */}
              <img 
                src="/B11.png" 
                alt="Be+ Project Structure, Explorer and Workspace (B11)" 
                className="absolute inset-0 w-full h-full object-cover block select-none rounded-none z-10"
              />

              {/* Overlay Image: B12 (Streamlit Application Interface and Code Execution) - Overlays cleanly from bottom */}
              <div 
                ref={overlayCardRef}
                className="absolute inset-0 w-full h-full rounded-none z-20 will-change-transform shadow-[0_-16px_40px_rgba(0,0,0,0.95)] border-t border-neutral-700/60 bg-[#0d0e11]"
                style={{ transform: 'translate3d(0, 100%, 0)' }}
              >
                <img 
                  src="/B12.png" 
                  alt="Be+ Streamlit Application Interface and Code Execution (B12)" 
                  className="w-full h-full object-cover block select-none rounded-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next Project Button - Equal top and bottom padding */}
        <div className="w-full flex justify-center py-16 sm:py-20">
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
