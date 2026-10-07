import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft,
  ArrowRight,
  ImageIcon
} from 'lucide-react';
import { GitRepoButton } from './GitRepoButton';
import { LiveDemoButton } from './LiveDemoButton';

interface ClimoraWebpageProps {
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

// Reusable Image Placeholder Box
interface ImagePlaceholderBoxProps {
  id?: string;
  src?: string;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  aspectRatioClass?: string;
  label?: string;
  customContent?: React.ReactNode;
}

const ImagePlaceholderBox: React.FC<ImagePlaceholderBoxProps> = ({
  id,
  src,
  fallbackSrc,
  alt = "Image Placeholder",
  className = "",
  imgClassName = "object-cover",
  aspectRatioClass = "aspect-[4/3]",
  label,
  customContent
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <div 
      id={id}
      className={`w-full ${aspectRatioClass} rounded-none overflow-hidden bg-[#0d0e11] relative flex items-center justify-center select-none border-0 shadow-none ${className}`}
    >
      {currentSrc ? (
        <img 
          src={currentSrc} 
          alt={alt} 
          referrerPolicy="no-referrer"
          onError={() => {
            if (fallbackSrc && currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            }
          }}
          className={`w-full h-full block rounded-none ${imgClassName} border-0 shadow-none`}
        />
      ) : customContent ? (
        customContent
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center text-neutral-500 gap-2 rounded-none">
          <ImageIcon className="w-8 h-8 text-neutral-600 stroke-[1.5]" />
          {label && (
            <span className="font-['Inter',sans-serif] text-xs font-medium text-neutral-400 tracking-wide uppercase">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const ClimoraWebpage: React.FC<ClimoraWebpageProps> = ({ 
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
          src="/climora-desc-mockup.png" 
          alt="" 
          loading="eager" 
          decoding="sync" 
        />
        <img 
          src="/impa.png" 
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
        
        {/* Top Hero Card with Climora Header & Screen Mockup */}
        <div 
          style={{ 
            background: 'linear-gradient(90deg, rgba(95, 52, 52, 0.54) 0%, rgba(46, 46, 46, 0.54) 100%)',
            minHeight: '240px',
          }}
          className="w-full relative rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 md:px-10 pt-6 pb-6 md:py-0 md:h-[240px] mb-12 overflow-hidden flex flex-col md:flex-row items-center justify-between border-0 select-none"
        >
          {/* Left Column: Heading & Interactive Action Buttons */}
          <div className="flex-1 flex flex-col justify-center z-10 w-full md:max-w-[55%] md:pt-3 md:pb-6 md:-translate-y-2">
            {/* CLIMORA in JERSEY 10 with 5% letter-spacing */}
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
              CLIMORA
            </h1>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Git Repo Vector Button */}
              <GitRepoButton 
                href="https://github.com/tandonrishav18/CLIMORA" 
                className="w-[165px] sm:w-[200px] md:w-[222px]" 
              />

              {/* Globe / Live Demo Squircle Button */}
              <LiveDemoButton 
                href="https://climora-two.vercel.app/" 
                className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] md:w-[60px] md:h-[60px]" 
              />
            </div>
          </div>

          {/* Right Column: Climora Monitor Screen Mockup (Identical top and right gap with zoom in effect) */}
          <div className="w-full md:w-auto md:absolute md:top-[22px] md:right-[22px] md:bottom-0 flex items-end justify-center md:justify-end mt-6 md:mt-0 z-10 pointer-events-auto">
            <div 
              onMouseEnter={() => setIsMockupHovered(true)}
              onMouseLeave={() => setIsMockupHovered(false)}
              className="relative inline-flex items-end cursor-pointer select-none group/mockup"
            >
              <img 
                src="/climora-desc-mockup.png" 
                alt="Climora Monitor Screen Mockup" 
                loading="eager"
                decoding="sync"
                className={`w-auto h-auto max-h-[190px] sm:max-h-[205px] md:h-[218px] md:max-h-[218px] object-contain object-bottom block shadow-none drop-shadow-none border-0 origin-bottom-right transition-transform duration-300 ease-out ${
                  isMockupHovered ? 'scale-105 md:scale-[1.06]' : 'scale-100'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Framework Subtitle Banner (Jersey 10, Font 50 Regular, 2-line layout, title-cased) */}
        <div className="w-full mb-16 text-center">
          <h2 
            style={{ 
              fontFamily: "'Jersey 10', 'Silkscreen', monospace", 
              fontWeight: 400, 
              fontSize: 'clamp(23px, 4vw, 50px)',
              lineHeight: 1.2,
              letterSpacing: '0.02em',
            }}
            className="text-[#c7ff8b] tracking-wide w-full text-center select-none"
          >
            <span className="block w-full">
              Spatio-Temporal Edge Intelligence Framework for Resilient
            </span>
            <span className="block w-full mt-1">
              Geospatial IoT–Based Climate Anomaly Detection
            </span>
          </h2>
        </div>

        {/* 1. Problem Section (Text Left, Image Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch mb-20">
          <div className="text-left flex flex-col justify-start">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              PROBLEM
            </h3>
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
                Environmental conditions can change unexpectedly, but traditional monitoring systems often depend on fixed thresholds to identify abnormal readings. This makes it difficult to recognize subtle changes, localized anomalies, or unusual patterns that develop across different locations and over time.
              </p>
              <p>
                With multiple IoT sensors generating continuous data, the challenge is not just collecting readings, it is understanding when a reading is truly abnormal while dealing with noise and fluctuations in sensor data.
              </p>
            </div>
          </div>

          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full pt-0 md:pt-[58px] flex flex-col"
          >
            <div className="w-full h-full min-h-[300px] flex-1">
              <ImagePlaceholderBox 
                id="problem-image"
                src="/climora-problem.jpg"
                alt="Climate Anomaly Environmental Problem Visualization"
                label="Environmental Monitoring Challenge"
                aspectRatioClass="h-full min-h-[320px] w-full"
                imgClassName="object-cover object-center"
                className="w-full h-full rounded-none border-0 shadow-none"
              />
            </div>
          </ScrollDownReveal>
        </div>

        {/* 2. Idea Section (Image Left, Text Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20">
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full order-2 md:order-1 pt-0 md:pt-[58px]"
          >
            <ImagePlaceholderBox 
              id="idea-image"
              src="/climora-idea.jpg"
              alt="Climate Monitoring & Real-time Spatio-Temporal Anomaly Detection"
              label="Climate Anomaly Architecture"
              aspectRatioClass="aspect-[4/3]"
              className="w-full"
              imgClassName="object-cover object-center"
            />
          </ScrollDownReveal>

          <div className="text-left order-1 md:order-2">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              IDEA
            </h3>
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
                Climora — <span className="text-[#c7ff8b]">C</span>limate <span className="text-[#c7ff8b]">M</span>onitoring & <span className="text-[#c7ff8b]">R</span>eal-time <span className="text-[#c7ff8b]">A</span>nalytics is a spatio-temporal edge intelligence framework that uses geospatial IoT sensor data to detect unusual environmental conditions. Instead of looking at a sensor reading in isolation, Climora analyzes how environmental conditions change over time and across nearby locations, detects climate anomalies in real time, and visualizes the results through interactive dashboards, trends, heatmaps, and alerts for easier monitoring and decision-making.
              </p>
              <p>
                Climora connects IoT sensors, spatial and temporal analysis, and intelligent anomaly detection to understand where and when environmental conditions become unusual.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Approach Section (Text Left, Image Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-20">
          <div className="text-left">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              APPROACH
            </h3>
            <p 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-neutral-300"
            >
              Climora combines IoT sensor data, machine learning, and spatio-temporal analysis to detect environmental anomalies. Sensor data such as temperature, humidity, AQI, and location is preprocessed and analyzed using temporal deviation, KNN-based spatial analysis, and rate of change detection. A hybrid anomaly score is then generated to identify unusual patterns, while Isolation Forest is used for ML based anomaly detection and comparison. The results are stored and visualized through real-time dashboards and geospatial heatmaps, enabling faster and more resilient monitoring across sensor locations.
            </p>
          </div>

          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full pt-0 md:pt-[58px]"
          >
            <ImagePlaceholderBox 
              id="approach-image"
              src="/2.png"
              fallbackSrc="/climora-approach-map.png"
              alt="Climora Approach IoT & Spatio-Temporal Anomaly Detection Architecture"
              label="Climora Approach Architecture"
              aspectRatioClass="aspect-[767/468]"
              imgClassName="object-contain"
            />
          </ScrollDownReveal>
        </div>

        {/* 4. Impact Section (Image Left, Text Right) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-stretch mb-20">
          {/* Left: Image aligned with explanation height */}
          <ScrollDownReveal 
            containerRef={scrollContainerRef}
            scrollDirRef={scrollDirRef}
            delay={0.2}
            className="w-full order-2 md:order-1 pt-0 md:pt-[58px] flex flex-col h-full"
          >
            <div className="w-full max-w-[488px] flex-1 min-h-[260px] md:min-h-0 relative overflow-hidden bg-[#0d0e11] rounded-none border-0 shadow-none">
              <img 
                id="impact-image"
                src="/impa.png"
                alt="Sustainable Climate Impact & UN SDGs"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== `${window.location.origin}/climora-impact.jpg`) {
                    target.src = '/climora-impact.jpg';
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover object-center block border-0 shadow-none select-none"
              />
            </div>
          </ScrollDownReveal>

          {/* Right: Text with Impact explanation */}
          <div className="text-left flex flex-col justify-start order-1 md:order-2">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              IMPACT
            </h3>
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
                Climora enables faster, location aware environmental anomaly detection by turning IoT sensor data into clear, actionable insights through real time dashboards and geospatial visualization. Its edge focused design supports resilient monitoring for smart cities, environmental systems, and early warning applications.
              </p>
              <p className="pt-1">
                It also contributes to the UN Sustainable Development Goals :
              </p>
              <ul className="space-y-2 list-none pl-1 text-neutral-200">
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c7ff8b] shrink-0" />
                  <span>SDG 11 – Sustainable Cities and Communities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c7ff8b] shrink-0" />
                  <span>SDG 13 – Climate Action</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Research & Publication Section (Text Left, pg.png Image Right Aligned with Text) */}
        <div className="w-full mb-20 text-left">
          <h3 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-5"
          >
            RESEARCH & PUBLICATION
          </h3>

          <div className="w-full flex flex-col md:flex-row items-start justify-between">
            {/* Left Column: Explanation Text */}
            <div 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="w-full md:w-[58%] text-neutral-300 space-y-5 shrink-0"
            >
              <p>
                Climora is a research oriented project developed as part of an investigation into resilient, spatio-temporal climate anomaly detection using geospatial IoT and edge intelligence. The work was formalized into a research paper titled “Spatio-Temporal Edge Intelligence Framework for Resilient Geospatial IoT-Based Climate Anomaly Detection,” documenting the methodology, experimental evaluation, model comparisons, and findings.
              </p>
              <p>
                The research introduces a hybrid engine combining temporal deviation, KNN spatial correlation, and rate-of-change analysis across multi-dimensional IoT streams. Validated against Isolation Forest baselines and real-world atmospheric benchmarks, the paper was accepted at IEEE ICIET 2026, showcasing Climora as both a resilient edge platform and a validated scientific contribution in IoT, machine learning, and environmental anomaly detection.
              </p>
            </div>

            {/* Right Column: pg.png centered in the entire space between text ending and right viewport edge */}
            <div 
              style={{
                marginRight: 'calc(-50vw + 50%)',
              }}
              className="w-full md:flex-1 flex justify-center items-start pt-8 md:pt-0 overflow-visible"
            >
              <img 
                src="/pg.png" 
                alt="Climora Research and Publication Document" 
                className="w-auto h-auto max-h-[460px] md:max-h-[480px] max-w-full object-contain block select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 6. Description Section (Full Width) */}
        <div className="w-full mb-20 text-left">
          <h3 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 500, 
              fontSize: '32px',
              lineHeight: 1.2,
            }}
            className="text-[#c7ff8b] uppercase tracking-normal mb-6"
          >
            DESCRIPTION
          </h3>
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
              Climora - Climate Monitoring & Real-time Analytics is a spatio-temporal edge intelligence framework for detecting anomalies across distributed environmental IoT data. The system moves beyond simple threshold based monitoring by considering what is happening, when it is happening, and where it is happening.
            </p>
            <p>
              The solution begins with a multi node IoT simulation environment containing 20 geographically distributed sensor nodes. Each node generates temperature, humidity, AQI, latitude, longitude, and timestamp data. Different environmental scenarios, including global heatwaves, localized disturbances, and sensor failures, were simulated to create realistic anomaly conditions. Real world environmental data, including the UCI Air Quality dataset, was also incorporated, resulting in a dataset of 800K+ samples. The collected data was passed through a preprocessing pipeline involving data cleaning, feature normalization, feature construction, controlled noise injection, and dataset balancing. This prepared the data for reliable anomaly analysis while introducing realistic sensor variability.
            </p>
            <p>
              At the core of Climora is a hybrid anomaly detection engine combining three perspectives: temporal deviation, spatial deviation using KNN, and rate of change detection. Temporal analysis identifies deviations from a sensor's historical behavior, spatial analysis compares readings with geographically nearby sensors, and rate of change analysis captures sudden fluctuations. These factors are combined into a weighted anomaly score, which determines whether a reading is classified as normal or anomalous. For machine learning based detection and benchmarking, Isolation Forest was implemented as an unsupervised ML baseline, alongside comparisons with Local Outlier Factor (LOF) and One Class SVM. The hybrid approach achieved the highest F1-score among the evaluated models, demonstrating the value of combining spatial, temporal, and rate-based information.
            </p>
            <p>
              The complete system is powered by a FastAPI backend, which receives sensor observations through HTTP requests, processes them through the anomaly detection engine, and stores the resulting readings and anomaly scores in a relational database. A Streamlit dashboard then transforms the processed data into real time sensor trends, anomaly distributions, and geospatial heatmaps, making it easier to understand the location, intensity, and evolution of environmental anomalies.
            </p>
            <p>
              The architecture also incorporates edge intelligence, enabling lightweight anomaly processing closer to the sensor level. This approach is designed to reduce latency and bandwidth requirements while supporting faster and more resilient decision-making, with the reported processing pipeline achieving approximately 16 ms per request.
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
          className="mb-24 overflow-hidden select-none flex items-center relative marquee-container cursor-default"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
        >
          <div 
            style={{
              animationPlayState: isMarqueePaused ? 'paused' : 'running',
              animationDuration: '144s',
            }}
            className="flex items-center shrink-0 w-max animate-marquee-right"
          >
            {/* Duplicated list so translation from -50% to 0% creates a seamless, uninterrupted loop flowing from left to right */}
            {(() => {
              const techItems = [
                'Python',
                'NumPy',
                'PCA',
                'KNN',
                'Isolation Forest',
                'One-Class SVM',
                'Spatio-Temporal Analysis',
                'Edge Computing',
                'IoT',
                'Geospatial Analysis',
                'FastAPI',
                'Node.js',
                'TypeScript',
                'HTML5',
                'CSS3',
                'React',
                'ReactDOM',
                'Data Visualization',
                'Interactive Dashboards',
                'Geospatial Heatmaps'
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

        {/* 7. Conclusion & Multi-Image Showcase Section (Left 3 Image Sticky Overlay Stack, Right Text) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-24 relative">
          {/* Left Column: Stacking Overlay of 3 Image Boxes - aligned with paragraph start */}
          <div className="relative w-full flex flex-col pt-0 md:pt-[58px]">
            {/* Card 1: USE1 */}
            <div className="sticky top-[154px] sm:top-[170px] z-10 w-full mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="conclusion-image-1"
                src="/USE1.png"
                alt="Climora Sensor Telemetry & Geographic Map"
                label="Sensor Telemetry & Geographic Map"
                aspectRatioClass="aspect-[1052/598]"
                imgClassName="object-contain"
                className="bg-[#0d0e11] border-0 shadow-none transition-all duration-300"
              />
            </div>

            {/* Card 2: USE3 */}
            <div className="sticky top-[154px] sm:top-[170px] z-20 w-full mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="conclusion-image-2"
                src="/USE3.png"
                alt="Climora Telemetry Live Dashboard"
                label="Climora Telemetry Live Dashboard"
                aspectRatioClass="aspect-[1060/598]"
                imgClassName="object-contain"
                className="bg-[#0d0e11] border-0 shadow-none transition-all duration-300"
              />
            </div>

            {/* Card 3: USE2 */}
            <div className="sticky top-[154px] sm:top-[170px] z-30 w-full mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="conclusion-image-3"
                src="/USE2.png"
                alt="Climora Edge Nodes Directory & System Analytics"
                label="Edge Nodes Directory & System Analytics"
                aspectRatioClass="aspect-[1062/598]"
                imgClassName="object-contain"
                className="bg-[#0d0e11] border-0 shadow-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Column: Conclusion Text (Sticky alongside images) */}
          <div className="text-left sticky top-24 sm:top-28">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              CONCLUSION
            </h3>
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
                Climora demonstrates how IoT, machine learning, spatio-temporal analysis, and edge intelligence can work together for real-time environmental anomaly detection. By analyzing environmental changes across time, location, and rate of change, the framework goes beyond conventional threshold-based monitoring to identify unusual patterns more contextually. Its edge-based processing also supports faster responses with reduced dependence on centralized cloud processing.
              </p>
              <p>
                The system combines anomaly scoring, ML-based detection, and geospatial visualization to turn continuous sensor data into clear, actionable insights. With applications across smart cities, environmental monitoring, industrial IoT, and early-warning systems, Climora provides a scalable and resilient foundation for intelligent climate monitoring. Ultimately, it transforms raw environmental data into timely insights that can help detect change before it becomes a larger problem.
              </p>
            </div>
          </div>
        </div>

        {/* 8. Results Section (Left Metrics & Split, Right 3 Image Sticky Overlay Stack) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start mb-24 relative">
          {/* Left Column: Results Heading, Paragraphs & Bullet Points (Sticky alongside images) */}
          <div className="text-left sticky top-24 sm:top-28">
            <h3 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500, 
                fontSize: '32px',
                lineHeight: 1.2,
              }}
              className="text-[#c7ff8b] uppercase tracking-normal mb-5"
            >
              RESULTS
            </h3>
            
            <div 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 400, 
                fontSize: '20px',
                lineHeight: 1.6,
                textAlign: 'justify',
              }}
              className="text-white space-y-5 mb-8"
            >
              <p>
                Climora was evaluated using environmental datasets to measure its ability to distinguish normal and anomalous conditions. The data was divided into 70% training and 30% testing, with evaluation based on accuracy, precision, recall, and F1-score. The model showed stable validation performance, with preprocessing helping reduce noise and improve detection quality.
              </p>
              <p>
                The proposed Edge + Spatio-Temporal model achieved 93.8% accuracy, outperforming the compared traditional and ML based approaches. The evaluation also reported a low false-positive rate and minimal false negatives, indicating effective identification of both normal conditions and anomalies.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c7ff8b] shrink-0 mt-2" />
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.4,
                  }}
                  className="text-white"
                >
                  Edge + Spatio-Temporal Model Accuracy - 93.8%
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c7ff8b] shrink-0 mt-2" />
                <span 
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: 1.4,
                  }}
                  className="text-white"
                >
                  Training / Testing Split - 70% / 30%
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Stacking Overlay of 3 Result Image Boxes (dim 465x349) - aligned with paragraph start */}
          <div className="relative w-full flex flex-col items-stretch md:items-end pt-0 md:pt-[58px]">
            {/* Card 1: Sensitivity Analysis (Sticky 1st) */}
            <div className="sticky top-[154px] sm:top-[170px] z-10 w-full max-w-[465px] mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="results-image-1"
                src="/climora-result-sensitivity.png"
                alt="Sensitivity Analysis - Alpha (Temporal) vs Beta (Spatial) F1 Score"
                label="Sensitivity Analysis"
                aspectRatioClass="aspect-[465/349]"
                imgClassName="object-contain object-center bg-white"
                className="w-full max-w-[465px] bg-white border-0 shadow-none rounded-none transition-all duration-300"
              />
            </div>

            {/* Card 2: ROC Curve (All Models) & Precision-Recall Curve (Slides over Card 1 & Sticks) */}
            <div className="sticky top-[154px] sm:top-[170px] z-20 w-full max-w-[465px] mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="results-image-2"
                src="/climora-result-roc-pr.png"
                alt="ROC Curve (All Models) and Precision-Recall Curve"
                label="ROC & Precision-Recall Analysis"
                aspectRatioClass="aspect-[465/349]"
                imgClassName="object-contain object-center bg-white"
                className="w-full max-w-[465px] bg-white border-0 shadow-none rounded-none transition-all duration-300"
              />
            </div>

            {/* Card 3: Feature Correlation Heatmap (Slides over Card 2 & Sticks) */}
            <div className="sticky top-[154px] sm:top-[170px] z-30 w-full max-w-[465px] mb-48 sm:mb-64 md:mb-72">
              <ImagePlaceholderBox 
                id="results-image-3"
                src="/climora-result-correlation.png"
                alt="Feature Correlation Heatmap"
                label="Feature Correlation Heatmap"
                aspectRatioClass="aspect-[465/349]"
                imgClassName="object-contain object-center bg-white"
                className="w-full max-w-[465px] bg-white border-0 shadow-none rounded-none transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Next Project Button */}
        <div className="w-full flex justify-center py-16">
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
