import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PegboardSection } from './components/PegboardSection';
import { SkillsSection } from './components/SkillsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { WhatIBringSection } from './components/WhatIBringSection';
import { FooterSection } from './components/FooterSection';
import { 
  ExperienceModal, 
  CertificationModal, 
  PublicationModal, 
  ProjectModal, 
  ResumeModal, 
  BeyondCodeModal 
} from './components/Modals';
import { CineSuggestWebpage } from './components/CineSuggestWebpage';
import { ClimoraWebpage } from './components/ClimoraWebpage';
import { BePlusWebpage } from './components/BePlusWebpage';
import { NivalaWebpage } from './components/NivalaWebpage';
import { ExperienceItem, PublicationItem, CertificationItem, Project } from './types';
import { PROJECTS, PERSONAL_INFO } from './data';

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<CertificationItem | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<PublicationItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNivalaWebpageOpen, setIsNivalaWebpageOpen] = useState(false);
  const [isCineSuggestWebpageOpen, setIsCineSuggestWebpageOpen] = useState(false);
  const [isClimoraWebpageOpen, setIsClimoraWebpageOpen] = useState(false);
  const [isBePlusWebpageOpen, setIsBePlusWebpageOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isBeyondCodeOpen, setIsBeyondCodeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [certificateViewerImage, setCertificateViewerImage] = useState<string | null>(null);

  useEffect(() => {
    if (certificateViewerImage) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setCertificateViewerImage(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [certificateViewerImage]);

  const handleOpenResume = () => {
    window.open(PERSONAL_INFO.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  const openProjectById = (projId: string) => {
    setIsNivalaWebpageOpen(false);
    setIsCineSuggestWebpageOpen(false);
    setIsClimoraWebpageOpen(false);
    setIsBePlusWebpageOpen(false);
    setSelectedProject(null);

    // Sequence chain: NIVALA -> CS -> BE+ -> CLIMORA -> ELIT -> ADBMS
    if (projId === 'nivala') {
      setIsNivalaWebpageOpen(true);
    } else if (projId === 'cine-suggest') {
      setIsCineSuggestWebpageOpen(true);
    } else if (projId === 'be-plus') {
      setIsBePlusWebpageOpen(true);
    } else if (projId === 'climora-iot') {
      setIsClimoraWebpageOpen(true);
    } else {
      const targetProj = PROJECTS.find(p => p.id === projId) || PROJECTS[0];
      setSelectedProject(targetProj);
    }
  };

  const handleNextProjectFromCurrent = (currentId: string) => {
    switch (currentId) {
      case 'nivala':
        openProjectById('cine-suggest'); // NIVALA -> CS
        break;
      case 'cine-suggest':
        openProjectById('be-plus'); // CS -> BE+
        break;
      case 'be-plus':
        openProjectById('climora-iot'); // BE+ -> CLIMORA
        break;
      case 'climora-iot':
        openProjectById('nivala'); // CLIMORA -> NIVALA
        break;
      default:
        openProjectById('cine-suggest');
        break;
    }
  };

  const handleSelectProject = (proj: Project) => {
    openProjectById(proj.id);
  };

  const handleGlobalNavClick = (href: string) => {
    setIsNivalaWebpageOpen(false);
    setIsCineSuggestWebpageOpen(false);
    setIsClimoraWebpageOpen(false);
    setIsBePlusWebpageOpen(false);
    setSelectedProject(null);
    setSelectedExperience(null);
    setSelectedCertification(null);
    setSelectedPublication(null);
    setIsResumeOpen(false);
    setIsBeyondCodeOpen(false);
    setTimeout(() => {
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
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e0e0e0] font-sans selection:bg-red-600 selection:text-white relative w-full overflow-x-clip">
      {/* Navigation Header */}
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onOpenResume={handleOpenResume} 
        onNavClick={handleGlobalNavClick}
      />

      {/* Main Content Sections */}
      <main className="relative w-full overflow-x-clip">
        {/* 1. Hero / Header (Sticky pinned at top of viewport) */}
        <Hero isMenuOpen={isMenuOpen} />

        {/* Subsequent Sections (relative z-10, slides cleanly over top of the sticky Hero) */}
        <div className="relative z-10 bg-[#131313] w-full overflow-x-clip">
          {/* 2. About Me Section */}
          <AboutSection />

          {/* 3. Experience Section */}
          <ExperienceSection 
            onSelectExperience={(exp) => setSelectedExperience(exp)} 
            onOpenCertificateImage={(img) => setCertificateViewerImage(img)}
          />

          {/* 4. Projects Section */}
          <ProjectsSection onSelectProject={handleSelectProject} />

          {/* 5. Certifications (Pegboard) Section */}
          <PegboardSection />

          {/* 6. Skills Section */}
          <SkillsSection />

          {/* 7. Publications Section */}
          <PublicationsSection onSelectPublication={(pub) => setSelectedPublication(pub)} />

          {/* 8. What I Bring Section */}
          <WhatIBringSection onOpenBeyondCode={() => setIsBeyondCodeOpen(true)} />
        </div>
      </main>

      {/* 9. Footer & Let's Work CTA */}
      <FooterSection onOpenResume={handleOpenResume} />

      {/* Nivala Dedicated Web App Page (Full Experience) */}
      <NivalaWebpage 
        isOpen={isNivalaWebpageOpen} 
        onClose={() => setIsNivalaWebpageOpen(false)}
        onOpenResume={handleOpenResume}
        onNextProject={() => handleNextProjectFromCurrent('nivala')}
      />

      {/* CineSuggest Dedicated Web App Page (Full Experience) */}
      <CineSuggestWebpage 
        isOpen={isCineSuggestWebpageOpen} 
        onClose={() => setIsCineSuggestWebpageOpen(false)}
        onOpenResume={handleOpenResume}
        onNextProject={() => handleNextProjectFromCurrent('cine-suggest')}
      />

      {/* Climora Dedicated Web App Page (Full Experience) */}
      <ClimoraWebpage 
        isOpen={isClimoraWebpageOpen} 
        onClose={() => setIsClimoraWebpageOpen(false)}
        onOpenResume={handleOpenResume}
        onNextProject={() => handleNextProjectFromCurrent('climora-iot')}
      />

      {/* BE+ Dedicated Web App Page (Full Experience) */}
      <BePlusWebpage 
        isOpen={isBePlusWebpageOpen} 
        onClose={() => setIsBePlusWebpageOpen(false)}
        onOpenResume={handleOpenResume}
        onNextProject={() => handleNextProjectFromCurrent('be-plus')}
      />

      {/* Modals & Dialog Viewers */}
      <ExperienceModal 
        item={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
      <CertificationModal 
        item={selectedCertification} 
        onClose={() => setSelectedCertification(null)} 
      />
      <PublicationModal 
        item={selectedPublication} 
        onClose={() => setSelectedPublication(null)} 
      />
      <ProjectModal 
        item={selectedProject} 
        onClose={() => setSelectedProject(null)}
        onNextProject={() => selectedProject && handleNextProjectFromCurrent(selectedProject.id)}
      />
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
      <BeyondCodeModal 
        isOpen={isBeyondCodeOpen} 
        onClose={() => setIsBeyondCodeOpen(false)} 
      />

      {/* Fullscreen In-App Certificate Image Viewer (opens right here with back button at top left) */}
      {certificateViewerImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#131313]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn select-none"
          onClick={() => setCertificateViewerImage(null)}
        >
          {/* Back Arrow Button at Top Left (identical styling to ClimoraWebpage) */}
          <div className="fixed top-5 sm:top-6 left-2.5 sm:left-4 z-50">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCertificateViewerImage(null);
              }}
              className="group flex items-center justify-center p-1.5 bg-transparent transition-colors duration-200 cursor-pointer select-none border-0 shadow-none outline-none"
              aria-label="Back"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:text-[#c7ff8b] stroke-[3] transition-colors duration-200" />
            </button>
          </div>

          {/* Certificate Image Display */}
          <div 
            className="relative max-w-5xl max-h-[86vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={certificateViewerImage} 
              alt="Official Certificate" 
              className="w-auto h-auto max-w-full max-h-[86vh] object-contain rounded-lg shadow-2xl block"
            />
          </div>
        </div>
      )}
    </div>
  );
}
