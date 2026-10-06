import React, { useState, useRef } from 'react';
import { X, Download, Printer, ExternalLink, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [viewMode, setViewMode] = useState<'both' | 'single'>('both');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      {/* Container */}
      <div 
        className="relative w-full max-w-[900px] bg-[#0e0e0e] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-800 bg-[#141414] text-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide font-sans">
                RISHAV TANDON - RESUME
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                2 Pages • PDF Document Preview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-black/60 rounded-lg p-0.5 border border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setViewMode('both')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewMode === 'both' ? 'bg-[#262626] text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Pages
              </button>
              <button
                onClick={() => setViewMode('single')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewMode === 'single' ? 'bg-[#262626] text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Single Page
              </button>
            </div>

            {/* Print / Save Button */}
            <button
              onClick={handlePrint}
              title="Print or Save as PDF"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-mono transition-colors border border-neutral-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Scrolling Canvas */}
        <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-70px)] bg-[#181818] flex flex-col items-center gap-6 print:p-0 print:bg-white select-text">
          {/* Page 1 */}
          {(viewMode === 'both' || currentPage === 1) && (
            <div 
              className="w-full max-w-[760px] bg-white text-black shadow-2xl p-7 sm:p-10 md:p-12 rounded-sm border border-neutral-300 font-sans leading-relaxed text-[13px] print:shadow-none print:border-none print:p-8"
              style={{ minHeight: '1020px' }}
            >
              {/* Header */}
              <div className="border-b border-neutral-300 pb-4 mb-5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 uppercase mb-1 font-sans">
                  RISHAV TANDON
                </h1>
                <div className="text-[12px] text-neutral-700 font-medium flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                  <span>6204578740</span>
                  <span>•</span>
                  <a href="mailto:tandonrishav18@gmail.com" className="text-blue-600 hover:underline">
                    tandonrishav18@gmail.com
                  </a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">
                    GitHub <ExternalLink className="w-2.5 h-2.5 inline" />
                  </a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">
                    LinkedIn <ExternalLink className="w-2.5 h-2.5 inline" />
                  </a>
                </div>
                <div className="text-[12px] text-neutral-600 flex justify-between">
                  <span>B.Tech, Computer Science and Engineering</span>
                  <span>Chennai, India</span>
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-5">
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Education
                </h2>
                <div className="space-y-2 text-[12.5px]">
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>SRM Institute of Science and Technology</span>
                      <span>2023 - 2027</span>
                    </div>
                    <div className="flex justify-between text-neutral-700 text-[12px]">
                      <span>B.Tech · Computer Science and Engineering</span>
                      <span className="font-semibold text-neutral-900">CGPA - 9.15/10</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Asian School</span>
                      <span>2023</span>
                    </div>
                    <div className="flex justify-between text-neutral-700 text-[12px]">
                      <span>Class XII - CBSE · PCM · Muzaffarpur Bihar</span>
                      <span>Percentage - 81.8%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Sunshine Prep High School</span>
                      <span>2021</span>
                    </div>
                    <div className="flex justify-between text-neutral-700 text-[12px]">
                      <span>Class X - CBSE · Science and Mathematics · Muzaffarpur Bihar</span>
                      <span>Percentage - 89%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="mb-5">
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Experience
                </h2>
                <div className="space-y-3.5 text-[12.5px]">
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Edunet Foundation - AICTE Internship</span>
                      <span>Jan 2026 - Feb 2026</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 text-[11.5px] italic mb-1">
                      <span>Artificial Intelligence &amp; Machine Learning · Intern · Internship</span>
                      <span>Remote</span>
                    </div>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Completed a 6-week internship in <strong>Artificial Intelligence and Machine Learning</strong> with Edunet Foundation in collaboration with <strong>AICTE and IBM SkillsBuild</strong>. Gained hands-on experience in <strong>machine learning algorithms, data preprocessing, and model evaluation</strong>. Worked on hands-on projects and gained practical knowledge in AI, machine learning, and real-world applications.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Bluestock Fintech</span>
                      <span>Apr 2026 - Jun 2026</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 text-[11.5px] italic mb-1">
                      <span>Data Analyst · Intern · Internship</span>
                      <span>Remote</span>
                    </div>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Worked as a <strong>Data Analyst Intern at Bluestock Fintech</strong>, performing <strong>data cleaning, preprocessing, exploratory data analysis (EDA), and visualization</strong> on financial datasets. Generated actionable insights through trend analysis and reporting to support business intelligence and data-driven decision-making.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>HCL Tech</span>
                      <span>Sep 2026 - Present</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 text-[11.5px] italic mb-1">
                      <span>Azure DevOps · Intern · Internship</span>
                      <span>Remote</span>
                    </div>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Working as a Technology Intern at <strong>HCLTech</strong>, gaining hands on experience with the <strong>Microsoft Azure</strong> platform and contributing to client-oriented technology initiatives under the guidance of a mentor. Developing practical exposure to cloud services, enterprise workflows, and Azure based solutions while working within professional security and confidentiality standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Projects
                </h2>
                <div className="space-y-3.5 text-[12.5px]">
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span className="text-neutral-900 font-bold">
                        Spatio-Temporal Edge Intelligence Framework for Resilient Geospatial IoT-Based Climate Anomaly Detection
                      </span>
                      <span className="shrink-0 ml-2">Feb 2026 - Apr 2026</span>
                    </div>
                    <p className="text-[11.5px] text-neutral-600 font-mono mb-1">
                      · Python, NumPy, KNN, Isolation Forest, SVM, Edge Computing, FastAPI, React, Data Visualization
                    </p>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Spatio-Temporal Edge Intelligence Framework for Resilient Geospatial IoT-Based Climate Anomaly Detection is a real-time climate anomaly detection framework using <strong>IoT sensors, edge computing, and machine learning</strong> to monitor temperature, humidity, rainfall, and air quality data. Leveraged spatio-temporal analytics by combining <strong>spatial relationships and temporal patterns</strong> to identify anomalies, while providing real-time insights, alerts, and dashboard-based visualization for intelligent environmental monitoring and decision support.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>CineSuggest</span>
                      <span>Sep 2025 - Nov 2025</span>
                    </div>
                    <p className="text-[11.5px] text-neutral-600 font-mono mb-1">
                      · Java, Spring Boot, HTML, CSS, JavaScript, MySQL, REST APIs
                    </p>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Developed a <strong>MOVIE REVIEW AND RECOMMENDATION SYSTEM</strong>, a full-stack web application using <strong>HTML, CSS, JavaScript, Spring Boot, and MySQL</strong> to manage movie reviews and ratings. Implemented <strong>REST APIs and CRUD operations</strong> for storing user data and generating personalized movie recommendations based on user preferences.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Leftover Food Management System</span>
                      <span>Sep 2024 - Nov 2024</span>
                    </div>
                    <p className="text-[11.5px] text-neutral-600 font-mono mb-1">
                      · Java, OOP, JDBC, MySQL, Java Swing, REST API, Spring Boot, React, HTML, CSS
                    </p>
                    <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                      Developed a <strong>Leftover Food Management System using Java OOP</strong> to help manage and redistribute surplus food efficiently. Implemented <strong>JDBC connectivity with MySQL</strong> and built a simple GUI-based interface to store, retrieve, and manage donation and request records, supporting better food distribution and reducing wastage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Page footer */}
              <div className="mt-6 pt-3 border-t border-neutral-200 text-right text-[10.5px] text-neutral-400 font-mono">
                1 / 2
              </div>
            </div>
          )}

          {/* Page 2 */}
          {(viewMode === 'both' || currentPage === 2) && (
            <div 
              className="w-full max-w-[760px] bg-white text-black shadow-2xl p-7 sm:p-10 md:p-12 rounded-sm border border-neutral-300 font-sans leading-relaxed text-[13px] print:shadow-none print:border-none print:p-8"
              style={{ minHeight: '1020px' }}
            >
              {/* Project Continued: Blood Group Detection */}
              <div className="mb-5">
                <div className="flex justify-between font-semibold text-neutral-900">
                  <span className="font-bold">Blood Group Detection Using Fingerprints</span>
                  <span>Aug 2025 - Nov 2025</span>
                </div>
                <p className="text-[11.5px] text-neutral-600 font-mono mb-1">
                  · Python, PyTorch, OpenCV, NumPy, Pandas, CNN, Image Processing, Flask, Scikit-learn, Matplotlib, React, HTML, CSS
                </p>
                <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                  Developed a non-invasive <strong>Blood Group Detection System using Convolutional Neural Networks</strong> to analyze fingerprint images, providing a fast, contactless alternative to traditional blood tests. Implemented the model using <strong>Python, PyTorch, OpenCV, NumPy, Pandas, and Scikit-learn</strong> for image preprocessing, feature extraction, and classification, achieving <strong>96.8% prediction accuracy</strong>.
                </p>
              </div>

              {/* Skills Section */}
              <div className="mb-5">
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Skills
                </h2>
                <div className="space-y-1.5 text-[12px] text-neutral-800">
                  <div>
                    <strong>Programming Languages:</strong> Python, C, C++, Java, JavaScript, HTML, CSS
                  </div>
                  <div>
                    <strong>Languages and Frameworks:</strong> React.js, Node.js, Spring Boot, FastAPI, Flask, Django, Flutter
                  </div>
                  <div>
                    <strong>Tools and Technologies:</strong> MySQL, OpenCV, PyTorch, Matplotlib, Git
                  </div>
                  <div>
                    <strong>Design and Simulation Tools:</strong> Figma, Framer, Canva
                  </div>
                  <div>
                    <strong>Domain Knowledge:</strong> Data Structures &amp; Algorithm, AI, ML, DL, NLP, Data Science, IOT, AIOT, Object Oriented Programming, DBMS, Operating System, Computer Networks, Cloud Computing, Web Development
                  </div>
                </div>
              </div>

              {/* Certificates & Certifications */}
              <div className="mb-5">
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Certificates &amp; Certifications
                </h2>
                <div className="space-y-2 text-[12px]">
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>SAP Certified - Back-End Developer - ABAP Cloud</span>
                      <span>Apr 2026 - Apr 2027</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">SAP</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Introduction to Machine Learning</span>
                      <span>Sep 2025</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">NPTEL · NPTEL25CS149S133200359</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Data Analytics Job Simulation</span>
                      <span>Jul 2025</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">DELOITTE · WtLwx5Ae7b7yTvKvM</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Artificial Intelligence Fundamentals</span>
                      <span>Feb 2026</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">IBM SkillsBuild</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Networking Basics</span>
                      <span>Nov 2025</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">CISCO</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>DBMS - Master the Fundamentals and Advanced Concepts</span>
                      <span>May 2025</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">SCALER</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>C Programming for Beginners - Master the C Language</span>
                      <span>Nov 2023</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">UDEMY · UC-3e814510-ddd3-4049-9c39-c39d489b0e2c</span>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Data Science Fundamentals</span>
                      <span>Mar 2026</span>
                    </div>
                    <span className="text-neutral-600 text-[11.5px]">ScriptArc · SRC-2026-000074</span>
                  </div>
                </div>
              </div>

              {/* Publications */}
              <div className="mb-5">
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Publications
                </h2>
                <div>
                  <div className="flex justify-between font-semibold text-neutral-900 text-[12.5px]">
                    <span className="font-bold">
                      Spatio - Temporal Edge Intelligence Framework for Resilient Geospatial IoT - Based Climate Anomaly Detection
                    </span>
                    <span className="shrink-0 ml-2">Jun 2026</span>
                  </div>
                  <p className="text-[11.5px] text-neutral-600 italic mb-1">
                    IEEE International Conference on Innovations in Engineering and Technology
                  </p>
                  <p className="text-neutral-700 text-[12px] leading-relaxed text-justify">
                    Co-authored an <strong>IEEE ICIET 2026 accepted research paper</strong> on climate anomaly detection using <strong>IoT, Edge Computing, Machine Learning, and Geospatial Analytics</strong>. Developed a spatio-temporal framework leveraging KNN-based spatial analysis and temporal anomaly detection on environmental data to enable real-time monitoring, alerts and data-driven decision support.
                  </p>
                </div>
              </div>

              {/* Position of Responsibility */}
              <div>
                <h2 className="text-[14px] font-bold text-neutral-900 uppercase border-b border-neutral-300 pb-1 mb-2.5 tracking-wide">
                  Position of Responsibility
                </h2>
                <div className="space-y-2 text-[12px]">
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Events Lead - CloudX SRM University</span>
                      <span>Feb 2025 - Feb 2026</span>
                    </div>
                    <p className="text-neutral-700 text-[12px]">
                      Organized and managed technical events, workshops, and competitions as Events Lead at CloudX SRM University.
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-neutral-900">
                      <span>Member - IEI (Institution of Engineers)</span>
                      <span>Aug 2023 - May 2027</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page footer */}
              <div className="mt-6 pt-3 border-t border-neutral-200 text-right text-[10.5px] text-neutral-400 font-mono">
                2 / 2
              </div>
            </div>
          )}

          {/* Single Page Navigation Control when in single page mode */}
          {viewMode === 'single' && (
            <div className="flex items-center gap-3 bg-[#1e1e1e] border border-neutral-800 rounded-lg px-4 py-2 text-xs font-mono text-neutral-300">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="p-1 disabled:opacity-40 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>Page {currentPage} of 2</span>
              <button
                disabled={currentPage === 2}
                onClick={() => setCurrentPage(2)}
                className="p-1 disabled:opacity-40 hover:text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
