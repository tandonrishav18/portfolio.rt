import React from 'react';
import { Award, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

export type CertificateType = 'bluestock' | 'ibm_edunet' | 'sap' | 'gcp' | 'aws' | 'meta' | 'deeplearning' | 'nptel' | 'cisco' | 'oracle' | 'microsoft' | 'custom_image';

interface CertificateProps {
  type?: CertificateType;
  imageUrl?: string;
  isModal?: boolean;
  roundedNone?: boolean;
  className?: string;
}

export const CertificateGraphic: React.FC<CertificateProps> = ({ type = 'sap', imageUrl, isModal = false, roundedNone = true, className = '' }) => {
  const radiusClass = roundedNone ? 'rounded-none' : 'rounded-lg';
  const defaultHeight = isModal ? 'h-[440px] sm:h-[500px]' : 'h-full';
  const containerHeight = className ? className : defaultHeight;

  // Render Image directly if imageUrl is provided
  if (imageUrl) {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} flex items-center justify-center relative overflow-hidden select-none p-0`}>
        <img 
          src={imageUrl} 
          alt="Certificate"
          className="w-full h-full object-contain object-center bg-white block select-none"
          loading="eager"
        />
      </div>
    );
  }

  // 1. SAP Certified - Back-End Developer - ABAP Cloud (Exact Match to Video)
  if (type === 'sap') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-14 h-7 bg-[#0070d2] flex items-center justify-center font-black text-white text-base tracking-wider rounded-none font-inter">
              SAP
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              Verification ID
            </div>
            <div className="text-xs font-mono font-bold text-neutral-800">
              SAP-C_ABAPD_2309-881249
            </div>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="my-auto py-2 space-y-1 sm:space-y-2 text-left">
          <p className="text-xs sm:text-sm text-neutral-500 font-serif italic">
            SAP recognizes
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-neutral-950 font-serif tracking-tight border-b border-neutral-300 pb-1.5 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500 pt-0.5">
            is certified as
          </p>
          <h4 className="text-base sm:text-xl lg:text-[22px] font-bold text-neutral-900 font-inter tracking-tight leading-snug">
            SAP Certified - Back-End Developer - ABAP Cloud
          </h4>
          <p className="text-[10px] sm:text-[11px] text-neutral-600 leading-relaxed max-w-xl font-sans pt-1">
            This certificate proves that the recipient has the required knowledge to develop ABAP applications on SAP BTP and SAP S/4HANA Cloud with clean core principles.
          </p>
        </div>

        {/* Bottom Bar with SAP Credential Badge & Dates */}
        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] sm:text-[11px] text-neutral-700">
          {/* Official SAP Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-[#002e62] text-white px-3 py-1.5 rounded-none border border-[#001833] flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold font-inter text-[10px] text-[#008fd3]">SAP</span>
                <span className="text-[8px] font-mono tracking-wider text-neutral-200">CERTIFIED</span>
              </div>
              <span className="text-[9px] font-semibold text-white leading-tight">
                Back-End Developer - ABAP Cloud
              </span>
            </div>
          </div>

          {/* Dates & Verification */}
          <div className="text-right font-mono text-[10px] sm:text-[11px] text-neutral-600 space-y-0.5">
            <div>
              <span className="text-neutral-400">Issued on:</span> <span className="font-semibold text-neutral-800">Apr 19, 2024</span>
            </div>
            <div>
              <span className="text-neutral-400">Expires on:</span> <span className="font-semibold text-neutral-800">Apr 20, 2027</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Cisco Networking Basics (Exact Match to Video)
  if (type === 'cisco') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        {/* Top Header: Cisco Networking Academy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-3 bg-[#00bceb]" />
                <div className="w-1.5 h-4 bg-[#00bceb]" />
                <div className="w-1.5 h-2 bg-[#00bceb]" />
                <div className="w-1.5 h-5 bg-[#00bceb]" />
                <div className="w-1.5 h-3 bg-[#00bceb]" />
                <span className="font-bold text-[#005073] text-sm ml-1">CISCO</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0081a7] leading-none mt-0.5">
                Networking Academy
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
            Student Credential
          </div>
        </div>

        {/* Certificate Title */}
        <div className="mt-2 mb-1">
          <h3 className="text-lg sm:text-2xl font-bold text-[#002c3d] tracking-tight font-serif">
            Certificate of Course Completion
          </h3>
        </div>

        {/* Recipient & Completion text */}
        <div className="space-y-1.5 text-left py-1">
          <h4 className="text-xl sm:text-2xl font-bold text-[#0081a7] tracking-wide uppercase border-b-2 border-[#00bceb] pb-0.5 inline-block font-sans">
            RISHAV TANDON
          </h4>
          <p className="text-xs sm:text-[13px] text-neutral-700 font-medium">
            has successfully achieved student level credential for completing the <span className="font-bold text-neutral-950">Networking Basics</span> course.
          </p>

          <div className="pt-1.5">
            <p className="text-[11px] font-semibold text-neutral-800 mb-1">
              The student was able to proficiently:
            </p>
            <ul className="text-[9px] sm:text-[10px] text-neutral-600 space-y-0.5 list-disc pl-4 leading-tight font-sans">
              <li>Explain important concepts in network communication, network types, components, and connections.</li>
              <li>Explain the importance of standards and protocols in network communications.</li>
              <li>Explain how communication occurs on Ethernet networks and IP addressing.</li>
              <li>Explain how routers connect networks together and configure wireless routers securely.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Signature & Verification */}
        <div className="flex items-end justify-between pt-2 border-t border-neutral-200 text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-neutral-300 p-0.5 flex items-center justify-center bg-neutral-50">
              <QrCode className="w-8 h-8 text-neutral-800" />
            </div>
            <div className="text-[9px] font-mono text-neutral-500">
              <span>Scan to Verify</span>
              <span className="block text-neutral-700 font-semibold">Issued: Nov 22, 2024</span>
            </div>
          </div>

          <div className="text-right">
            <div className="font-serif italic font-bold text-neutral-800 text-sm border-b border-neutral-400 pb-0.5 inline-block">
              Lynn Bloomer
            </div>
            <div className="text-[9px] text-neutral-500 font-sans mt-0.5">
              VP, Cisco Networking Academy
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. IBM SkillsBuild & AICTE
  if (type === 'ibm_edunet') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 bg-[#052c65] text-white font-black text-xs tracking-wider rounded-none">
              IBM SkillsBuild
            </div>
            <div className="px-2.5 py-1 bg-[#d9381e] text-white font-black text-xs tracking-wider rounded-none">
              AICTE
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Edunet Foundation</span>
        </div>

        {/* Body */}
        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 font-serif italic">
            Certificate of Completion
          </p>
          <p className="text-[11px] text-neutral-500">This is to certify that</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 font-medium pt-1">
            has completed the 6-week specialization in <span className="font-bold text-[#052c65]">Artificial Intelligence & Machine Learning</span>
          </p>
          <p className="text-[10px] text-neutral-500 font-mono">
            In collaboration with AICTE & IBM SkillsBuild | Credential: IBM-EF-AIML-2024-5172
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] sm:text-[11px] text-neutral-700 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>AICTE-IBM Verified</span>
          </div>
          <div className="text-right">
            <span className="font-serif italic font-bold text-neutral-900 block">Program Director</span>
            <span className="text-[9px] text-neutral-500">Edunet Foundation</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Bluestock Fintech
  if (type === 'bluestock') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://bluestock.in/static/assets/logo/logo-android.webp" 
              alt="Bluestock Logo" 
              className="h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="px-2.5 py-0.5 bg-neutral-900 text-white font-mono text-[10px] uppercase tracking-wider rounded-none">
            Startup India Recognized
          </div>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 font-serif italic">
            Certificate of Internship & Data Intelligence
          </p>
          <p className="text-[11px] text-neutral-500">This is awarded to</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs sm:text-sm text-neutral-800 font-medium pt-1">
            for exemplary completion of <span className="font-bold text-neutral-950">Financial Intelligence & Data Analytics</span>
          </p>
          <p className="text-[10px] text-neutral-500 font-mono">
            Bluestock Fintech Analytics Unit • ID: BF-DA-2024-0892
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Credential</span>
          </div>
          <div className="text-right">
            <span className="font-serif italic font-bold text-neutral-900 block">Authorized Signatory</span>
            <span className="text-[9px] text-neutral-500">Bluestock Fintech Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Google Cloud
  if (type === 'gcp') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold text-base">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-neutral-800 ml-1 font-semibold">Cloud</span>
          </div>
          <span className="text-xs font-mono text-neutral-500">May 2024 – May 2027</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
            Certified Professional
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500">has achieved the certification of</p>
          <h4 className="text-base sm:text-xl font-bold text-[#1a73e8] font-inter">
            Associate Cloud Engineer
          </h4>
          <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
            Demonstrated proficiency in deploying applications, managing enterprise cloud resources, IAM security, and Kubernetes (GKE) clusters.
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#1a73e8] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ID: GCP-ACE-2024-91823</span>
          </div>
          <span className="text-neutral-500">Google Cloud Credential Registry</span>
        </div>
      </div>
    );
  }

  // 6. AWS Solutions Architect
  if (type === 'aws') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="px-2.5 py-1 bg-[#232f3e] text-[#ff9900] font-black text-xs tracking-wider rounded-none">
            AWS Training & Certification
          </div>
          <span className="text-xs font-mono text-neutral-500">Mar 2024 – Mar 2027</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
            AWS Certified
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500">has successfully earned the credential</p>
          <h4 className="text-base sm:text-xl font-bold text-[#ec7211] font-inter">
            AWS Certified Solutions Architect - Associate
          </h4>
          <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
            Validated design competence for scalable, cost-optimized, and resilient distributed architectures across AWS services.
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#ec7211] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ID: AWS-SAA-2024-74921</span>
          </div>
          <span className="text-neutral-500">Amazon Web Services</span>
        </div>
      </div>
    );
  }

  // 7. Meta Front-End Developer
  if (type === 'meta') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="px-2.5 py-1 bg-[#0064e0] text-white font-black text-xs tracking-wider rounded-none">
            Meta Professional
          </div>
          <span className="text-xs font-mono text-neutral-500">Jul 2024</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
            Professional Certificate
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500">is awarded the professional credential</p>
          <h4 className="text-base sm:text-xl font-bold text-[#0064e0] font-inter">
            Meta Front-End Developer Professional Certificate
          </h4>
          <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
            Certified proficiency in modern React architecture, user interface design systems, web performance, and state management.
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#0064e0] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ID: META-FED-2024-63820</span>
          </div>
          <span className="text-neutral-500">Meta Authorized Certificate</span>
        </div>
      </div>
    );
  }

  // 8. DeepLearning.AI
  if (type === 'deeplearning') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="px-2.5 py-1 bg-[#d9381e] text-white font-black text-xs tracking-wider rounded-none">
            DeepLearning.AI
          </div>
          <span className="text-xs font-mono text-neutral-500">Aug 2024</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
            Andrew Ng Specialization
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500">has successfully completed</p>
          <h4 className="text-base sm:text-xl font-bold text-[#d9381e] font-inter">
            Deep Learning Specialization
          </h4>
          <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
            Mastery of deep neural architectures, convolutional networks for computer vision, sequence models, and transformer pipelines.
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#d9381e] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ID: DLAI-DLS-2024-38291</span>
          </div>
          <div className="text-right">
            <span className="font-serif italic font-bold text-neutral-900 block">Andrew Ng</span>
            <span className="text-[9px] text-neutral-500">DeepLearning.AI</span>
          </div>
        </div>
      </div>
    );
  }

  // 9. NPTEL & IIT Kharagpur - Industry 4.0 & IIoT
  if (type === 'nptel') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-[#8c1d40] text-white font-black text-xs tracking-wider rounded-none font-inter">
              NPTEL
            </div>
            <div className="px-2 py-0.5 bg-neutral-900 text-white font-mono text-[10px] tracking-wider rounded-none">
              IIT KHARAGPUR
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Oct 2024</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 font-serif italic">
            Elite National Programme on Technology Enhanced Learning
          </p>
          <p className="text-[11px] text-neutral-500">This certificate is awarded to</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs sm:text-sm text-neutral-800 font-medium pt-1">
            for successfully completing the course on <span className="font-bold text-[#8c1d40]">Introduction to Industry 4.0 and Industrial Internet of Things</span>
          </p>
          <p className="text-[10px] text-neutral-500 font-mono">
            12-Week AICTE Faculty & Student Development Course | Roll No: NPTEL24CS91S3502019
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#8c1d40] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NPTEL Elite Verified</span>
          </div>
          <div className="text-right">
            <span className="font-serif italic font-bold text-neutral-900 block">Prof. Sudip Misra</span>
            <span className="text-[9px] text-neutral-500">Coordinator, IIT Kharagpur</span>
          </div>
        </div>
      </div>
    );
  }

  // 10. Oracle Cloud Infrastructure (OCI) / AI Certification
  if (type === 'oracle') {
    return (
      <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-[#c74634] text-white font-black text-xs tracking-wider rounded-none font-inter">
              ORACLE
            </div>
            <div className="px-2 py-0.5 bg-neutral-900 text-white font-mono text-[10px] tracking-wider rounded-none">
              UNIVERSITY
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Sep 2024 – Sep 2026</span>
        </div>

        <div className="my-auto py-2 space-y-1.5 text-left">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
            Oracle Certified Associate
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
            Rishav Tandon
          </h3>
          <p className="text-xs text-neutral-500">has successfully completed all requirements for</p>
          <h4 className="text-base sm:text-xl font-bold text-[#c74634] font-inter">
            Oracle Cloud Infrastructure 2024 Generative AI Certified Professional
          </h4>
          <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
            Validated expertise in Large Language Models (LLMs), prompt engineering, RAG pipelines, fine-tuning, and enterprise OCI AI service orchestration.
          </p>
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
          <div className="flex items-center gap-1 text-[#c74634] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ID: OCI-GENAI-2024-81920</span>
          </div>
          <div className="text-right">
            <span className="font-serif italic font-bold text-neutral-900 block">Damien Carey</span>
            <span className="text-[9px] text-neutral-500">SVP, Oracle University</span>
          </div>
        </div>
      </div>
    );
  }

  // 11. Microsoft Certified: Azure AI Engineer Associate (Default & Microsoft)
  return (
    <div className={`w-full ${containerHeight} bg-white text-neutral-900 ${radiusClass} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none font-sans`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Microsoft 4-square logo */}
          <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="bg-[#f25022] w-full h-full" />
            <div className="bg-[#7fba00] w-full h-full" />
            <div className="bg-[#00a4ef] w-full h-full" />
            <div className="bg-[#ffb900] w-full h-full" />
          </div>
          <span className="font-bold text-neutral-800 text-sm font-inter tracking-tight">Microsoft Certified</span>
        </div>
        <span className="text-xs font-mono text-neutral-500">Dec 2024 – Dec 2026</span>
      </div>

      <div className="my-auto py-2 space-y-1.5 text-left">
        <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono text-[10px]">
          Microsoft Certification
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 font-serif border-b border-neutral-300 pb-1 inline-block">
          Rishav Tandon
        </h3>
        <p className="text-xs text-neutral-500">has successfully achieved certification for</p>
        <h4 className="text-base sm:text-xl font-bold text-[#0078d4] font-inter">
          Azure AI Engineer Associate (AI-102)
        </h4>
        <p className="text-[10px] text-neutral-600 font-sans leading-relaxed max-w-xl">
          Demonstrates subject matter expertise building, managing, and deploying AI solutions leveraging Azure Cognitive Services, Azure OpenAI, and Semantic Kernel.
        </p>
      </div>

      <div className="flex items-end justify-between pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-600">
        <div className="flex items-center gap-1 text-[#0078d4] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>ID: MS-AI102-2024-91402</span>
        </div>
        <div className="text-right">
          <span className="font-serif italic font-bold text-neutral-900 block">Satya Nadella</span>
          <span className="text-[9px] text-neutral-500">CEO, Microsoft</span>
        </div>
      </div>
    </div>
  );
};
