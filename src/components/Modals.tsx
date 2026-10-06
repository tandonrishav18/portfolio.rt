import React from 'react';
import { X, ExternalLink, Github, Download, CheckCircle, Award, BookOpen, Layers, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { ExperienceItem, PublicationItem, CertificationItem, Project } from '../types';
import { CertificateGraphic } from './CertificateViews';
import { PaperThumbnail } from './PaperThumbnail';
import { PERSONAL_INFO } from '../data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0c0c0c] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0f0f0f]">
          <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-heading">
            {title || 'Details'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-neutral-300 text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ExperienceModal: React.FC<{ item: ExperienceItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  const isAicte = item.id === 'aicte-ibm';
  const isBluestock = item.id === 'bluestock';
  const imageWidth = isAicte ? 348 : (isBluestock ? 686 : 600);
  const imageHeight = isAicte ? 330 : (isBluestock ? 485 : 420);
  const imgSrc = item.imageUrl || (isAicte ? '/work-exp-aicte.png' : (isBluestock ? '/work-exp-bluestock.png' : undefined));

  return (
    <BaseModal isOpen={!!item} onClose={onClose} title={item.company}>
      <div className="space-y-6">
        {imgSrc ? (
          <div className="w-full bg-[#131313] rounded-lg border border-neutral-800/60 overflow-hidden flex items-center justify-center p-2">
            <img 
              src={imgSrc}
              alt={item.company}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto max-h-[480px] object-contain rounded"
              style={{
                aspectRatio: `${imageWidth} / ${imageHeight}`,
              }}
            />
          </div>
        ) : (
          <CertificateGraphic type={item.certificateType} isModal={true} />
        )}

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="text-red-500 font-bold">{item.role}</span>
            <span>{item.period} • {item.location}</span>
          </div>

          <p className="text-neutral-300 leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2">
            <span className="text-xs font-mono text-neutral-400 block mb-2 uppercase tracking-wider">
              Key Competencies Acquired:
            </span>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {item.certificatePdf && (
            <div className="pt-3">
              <a
                href={item.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-xs tracking-wider uppercase rounded-none transition-colors duration-200 inline-flex items-center justify-center gap-2 select-none"
              >
                <span>{item.certificatePdf.endsWith('.pdf') ? 'OPEN OFFICIAL CERTIFICATE (PDF)' : 'OPEN OFFICIAL CERTIFICATE'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export const CertificationModal: React.FC<{ item: CertificationItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <BaseModal isOpen={!!item} onClose={onClose} title={item.title}>
      <div className="space-y-6">
        <CertificateGraphic type={item.certificateType || 'sap'} imageUrl={item.imageUrl} isModal={true} />

        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono">
            <div>
              <span className="text-neutral-500 block">CREDENTIAL ID</span>
              <span className="text-white font-medium">{item.credentialId}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">ISSUE DATE</span>
              <span className="text-white font-medium">{item.issueDate}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">VALID UNTIL</span>
              <span className="text-white font-medium">{item.expiryDate}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-neutral-400 block mb-2 uppercase tracking-wider">
              Verified Knowledge Domains:
            </span>
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-mono rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {item.certificatePdf && (
            <div className="pt-2">
              <a
                href={item.certificatePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-xs tracking-wider uppercase rounded-none transition-colors duration-200 inline-flex items-center justify-center gap-2 select-none"
              >
                <span>OPEN OFFICIAL CERTIFICATE (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export const PublicationModal: React.FC<{ item: PublicationItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <BaseModal isOpen={!!item} onClose={onClose} title="Research Publication">
      <div className="space-y-6">
        <div className="flex justify-center bg-black/40 p-4 border border-neutral-900 rounded-lg">
          {item.pdfUrl ? (
            <a 
              href={item.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block cursor-pointer hover:opacity-95 transition-opacity"
            >
              <PaperThumbnail id={item.id} />
            </a>
          ) : (
            <PaperThumbnail id={item.id} />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="border border-[#262626] bg-[#0c0c0c] px-3 py-1 rounded-[3px] tracking-wider inline-flex items-center uppercase">
              <span className="text-[#ef4444] font-semibold mr-1.5">JOURNAL</span>
              <span className="text-neutral-300">- {item.journal}</span>
            </div>
            <div className="border border-[#262626] bg-[#0c0c0c] px-3 py-1 rounded-[3px] tracking-wider inline-flex items-center uppercase">
              <span className="text-[#ef4444] font-semibold mr-1.5">DATE</span>
              <span className="text-neutral-300">- {item.date}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white uppercase leading-snug font-sans">
            {item.title}
          </h3>
          <p className="text-xs font-mono text-neutral-400">
            Authors: {item.authors.join(', ')}
          </p>
        </div>

        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block">
            Abstract
          </span>
          <p className="text-neutral-300 text-sm leading-relaxed text-justify">
            {item.abstract}
          </p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-3">
            Key Technical Innovations:
          </span>
          <ul className="space-y-2 text-sm text-neutral-300">
            {item.keyContributions.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {item.pdfUrl && (
          <div className="pt-2">
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white hover:bg-[#b91c1c] text-black hover:text-white border-2 border-black font-mono-code font-bold text-xs tracking-wider uppercase rounded-none transition-colors duration-200 inline-flex items-center justify-center gap-2 select-none"
            >
              <span>OPEN FULL RESEARCH PAPER (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export const ProjectModal: React.FC<{ 
  item: Project | null; 
  onClose: () => void;
  onNextProject?: () => void;
}> = ({ item, onClose, onNextProject }) => {
  if (!item) return null;

  return (
    <BaseModal isOpen={!!item} onClose={onClose} title={item.title}>
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-1">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-white uppercase">
            {item.title}
          </h3>
          <p className="mt-3 text-neutral-300 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
            Technology Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2">
            Architecture Highlights:
          </span>
          <ul className="space-y-2 text-sm text-neutral-300">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold rounded flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Live Deployment
              </a>
            )}
          </div>

          {onNextProject && (
            <button
              onClick={onNextProject}
              className="inline-flex items-center gap-2 text-white hover:text-[#c01e1e] font-sans text-sm font-medium transition-colors cursor-pointer group ml-auto"
            >
              <span>Next project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export { ResumeModal } from './ResumeModal';
export { BeyondCodeWebpage as BeyondCodeModal } from './BeyondCodeWebpage';

