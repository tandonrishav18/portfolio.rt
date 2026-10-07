import React from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

// 1. FLIT Lighter on Dark Titanium iPhone (User Image 1)
export const PhoneMockupFlit: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[170px] sm:max-w-[185px] md:max-w-[195px] aspect-[9/19.5] bg-[#0e0e14] rounded-[36px] p-[5.5px] border-[2.5px] border-[#22222e] flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-neutral-500 select-none mx-auto"
    >
      {/* Side physical buttons (Dark Titanium) */}
      <div className="absolute -left-[5px] top-16 w-[2.5px] h-6 bg-[#252538] rounded-l-sm" />
      <div className="absolute -left-[5px] top-24 w-[2.5px] h-10 bg-[#252538] rounded-l-sm" />
      <div className="absolute -left-[5px] top-36 w-[2.5px] h-10 bg-[#252538] rounded-l-sm" />
      <div className="absolute -right-[5px] top-20 w-[2.5px] h-12 bg-[#252538] rounded-r-sm" />

      {/* Screen Inner Glass (Cream/Off-White Background) */}
      <div className="relative w-full h-full bg-[#f4f0e8] rounded-[30px] overflow-hidden flex flex-col items-center justify-center">
        
        {/* Dynamic Island Pill at top center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 flex items-center justify-end px-1.5 border border-black">
          <div className="w-1 h-1 rounded-full bg-[#1e293b] border border-neutral-800" />
        </div>

        {/* Center Cricket Lighter Artwork */}
        <div className="relative flex flex-col items-center z-10 w-[58%] max-w-[110px] mt-4">
          
          {/* Lighter Top Mechanism (Metal Chrome Hood & Spark Wheel) */}
          <div className="relative w-[88%] h-8 sm:h-9 flex items-end justify-between z-20">
            {/* Chrome Spark Hood on Left */}
            <div className="relative w-[72%] h-full bg-gradient-to-r from-[#b5b8be] via-[#e5e7eb] to-[#9ca3af] rounded-t-[10px] rounded-bl-[2px] border border-slate-400/80 shadow-inner flex flex-col justify-between p-1 overflow-hidden">
              {/* Spark Wheel Cylinder at top */}
              <div className="absolute -top-1.5 right-1.5 w-4 h-4 rounded-full bg-gradient-to-b from-[#6b7280] to-[#374151] border border-slate-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full border border-dashed border-slate-300" />
              </div>
              {/* Embossed Cricket Text */}
              <div className="text-[5px] sm:text-[6px] font-sans font-medium text-slate-700 tracking-tighter pl-0.5 pt-0.5">
                Cricket
              </div>
              {/* Air Vent Eyelet */}
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-slate-600 to-slate-400 border border-slate-300 ml-auto mr-1 mb-0.5 shadow-xs" />
            </div>

            {/* Black Thumb Push Lever on Right */}
            <div className="w-[24%] h-[60%] bg-[#1c1d22] rounded-t-[4px] rounded-br-[2px] border-t border-r border-[#383a45] shadow-inner flex items-center justify-center">
              <div className="w-[70%] h-[2px] bg-[#3a3d4a] rounded-full" />
            </div>
          </div>

          {/* Lighter Main Plastic Rectangular Body */}
          <div className="relative w-[88%] aspect-[1/2.7] bg-gradient-to-r from-[#ffffff] via-[#fafafa] to-[#ededed] rounded-b-[4px] border-x border-b border-neutral-300/80 shadow-md p-1.5 sm:p-2 flex flex-col justify-between overflow-hidden">
            
            {/* Left Edge Gloss Reflection Highlight */}
            <div className="absolute top-0 left-0 w-[8%] h-full bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />

            {/* Elongated Typographic FLit Logo */}
            <div className="relative w-full h-[88%] mt-1 flex items-stretch justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 220" fill="currentColor">
                {/* Letter F with long left stem */}
                <path d="M 12 10 L 48 10 L 48 26 L 28 26 L 28 42 L 44 42 L 44 58 L 28 58 L 28 215 L 12 215 Z" fill="#111111" />
                
                {/* Letter L nested below F top arm */}
                <path d="M 30 70 L 44 70 L 44 198 L 74 198 L 74 215 L 30 215 Z" fill="#111111" />
                
                {/* Letter i with round dot and long descending stem */}
                <circle cx="58" cy="22" r="7" fill="#111111" />
                <path d="M 51 40 L 65 40 L 65 215 L 51 215 Z" fill="#111111" />
                
                {/* Letter t with crossbar and long stem */}
                <path d="M 76 25 L 90 25 L 90 40 L 98 40 L 98 54 L 90 54 L 90 215 L 76 215 L 76 54 L 70 54 L 70 40 L 76 40 Z" fill="#111111" />
              </svg>
            </div>

            {/* Sparkle Star on lighter base */}
            <div className="absolute bottom-2 right-2 pointer-events-none">
              <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" />
              </svg>
            </div>
          </div>

          {/* Soft Elliptical Ground Ambient Drop Shadow */}
          <div className="w-[110%] h-3 bg-neutral-900/25 rounded-full blur-[3px] mt-[-2px]" />

          {/* Sparkle Star on ground floor */}
          <div className="absolute -bottom-3 -right-4 pointer-events-none">
            <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white/90 drop-shadow-[0_0_2px_rgba(0,0,0,0.2)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" />
            </svg>
          </div>

        </div>

        {/* Home indicator bar */}
        <div className="w-12 h-0.5 bg-black/40 rounded-full mx-auto mb-1.5 z-30" />
      </div>
    </div>
  );
};

// 2. ADBMS Boarding Pass Ticket on Pink/Rose Titanium iPhone (User Image 2)
export const PhoneMockupAdbmsTicket: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[170px] sm:max-w-[185px] md:max-w-[195px] aspect-[9/19.5] bg-[#eec5cb] rounded-[36px] p-[5.5px] border-[2.5px] border-[#d89ea6] flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-neutral-400 select-none mx-auto"
    >
      {/* Side physical buttons (Rose Titanium) */}
      <div className="absolute -left-[5px] top-16 w-[2.5px] h-6 bg-[#d28a94] rounded-l-sm" />
      <div className="absolute -left-[5px] top-24 w-[2.5px] h-10 bg-[#d28a94] rounded-l-sm" />
      <div className="absolute -left-[5px] top-36 w-[2.5px] h-10 bg-[#d28a94] rounded-l-sm" />
      <div className="absolute -right-[5px] top-20 w-[2.5px] h-12 bg-[#d28a94] rounded-r-sm" />

      {/* Screen Inner Glass (Light Slate Grey Background) */}
      <div className="relative w-full h-full bg-[#e1e4ea] rounded-[30px] overflow-hidden flex flex-col items-center justify-center p-2.5">
        
        {/* Dynamic Island Pill at top center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 flex items-center justify-end px-1.5 border border-black">
          <div className="w-1 h-1 rounded-full bg-[#1e293b] border border-neutral-800" />
        </div>

        {/* Boarding Pass Ticket Card */}
        <div className="relative w-full h-[84%] bg-[#fcfcfc] rounded-[10px] sm:rounded-[12px] shadow-lg border border-neutral-300/80 overflow-hidden flex flex-col justify-between my-auto mt-5">
          
          {/* Top Barcode Header */}
          <div className="px-2 pt-1.5 pb-1 flex flex-col items-center border-b border-neutral-100">
            {/* SVG Barcode */}
            <div className="w-full h-3 sm:h-3.5 flex items-center justify-between overflow-hidden">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3].map((w, i) => (
                <div key={i} className="h-full bg-neutral-900" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          {/* Ticket Body: Left Pink Strip + Right Flight Metadata */}
          <div className="relative flex-1 flex">
            
            {/* Left Pink Accent Strip with Rotated Labels */}
            <div className="w-[18%] bg-[#f4b6be] flex flex-col justify-between items-center py-3 text-[4px] sm:text-[4.5px] font-bold text-neutral-800 tracking-wider">
              <span className="-rotate-90 origin-center whitespace-nowrap">DESTINATION</span>
              <span className="-rotate-90 origin-center whitespace-nowrap">FLIGHT</span>
              <span className="-rotate-90 origin-center whitespace-nowrap">SEAT</span>
            </div>

            {/* Right Flight Content Details */}
            <div className="flex-1 p-2 sm:p-2.5 flex flex-col justify-between text-left">
              
              {/* Header Row: Black ICN Pill + Airplane Icon */}
              <div className="flex items-center gap-2">
                <div className="bg-[#18181b] text-white rounded-[4px] px-2 py-0.5 font-bold text-[7px] sm:text-[8px] tracking-wide">
                  ICN
                </div>
                {/* Airplane glyph */}
                <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#18181b]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>

              {/* Main Bold Large Title: ADBMS */}
              <div className="my-auto py-1">
                <h3 className="text-[20px] sm:text-[24px] md:text-[26px] font-black text-black tracking-tighter leading-none font-sans">
                  ADBMS
                </h3>
              </div>

              {/* Flight Number & Board Time */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold text-neutral-800">0369</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[5px] sm:text-[6px] text-neutral-500 font-mono">Board time</span>
                  <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold text-neutral-900">11:11</span>
                </div>
              </div>

              {/* Seat & Class + Pink Airplane Silhouette Watermark */}
              <div className="flex items-end justify-between pt-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-[12px] sm:text-[14px] font-bold text-black font-mono">3A</span>
                  <span className="text-[5px] sm:text-[6px] font-mono text-neutral-600 leading-tight">Window<br/>First</span>
                </div>
                {/* Pink plane icon watermark */}
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-[#f4b6be]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>

            </div>

          </div>

          {/* Bottom Barcode Strip */}
          <div className="px-2 pt-1 pb-1.5 border-t border-neutral-100 flex flex-col items-center">
            <div className="w-full h-3 sm:h-3.5 flex items-center justify-between overflow-hidden">
              {[2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3].map((w, i) => (
                <div key={i} className="h-full bg-neutral-900" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

        </div>

        {/* Home indicator bar */}
        <div className="w-12 h-0.5 bg-black/40 rounded-full mx-auto mb-1.5 z-30" />
      </div>
    </div>
  );
};

// 3. Climora Lanyard ID Badge on Midnight Blue iPhone (User Image 3)
export const PhoneMockupClimoraBadge: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[170px] sm:max-w-[185px] md:max-w-[195px] aspect-[9/19.5] bg-[#0c1424] rounded-[36px] p-[5.5px] border-[2.5px] border-[#1e2e4a] flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-neutral-400 select-none mx-auto"
    >
      {/* Side physical buttons (Navy Titanium) */}
      <div className="absolute -left-[5px] top-16 w-[2.5px] h-6 bg-[#1e2e4a] rounded-l-sm" />
      <div className="absolute -left-[5px] top-24 w-[2.5px] h-10 bg-[#1e2e4a] rounded-l-sm" />
      <div className="absolute -left-[5px] top-36 w-[2.5px] h-10 bg-[#1e2e4a] rounded-l-sm" />
      <div className="absolute -right-[5px] top-20 w-[2.5px] h-12 bg-[#1e2e4a] rounded-r-sm" />

      {/* Screen Inner Glass (Pitch Black Background) */}
      <div className="relative w-full h-full bg-[#000000] rounded-[30px] overflow-hidden flex flex-col items-center justify-between">
        
        {/* Dynamic Island Pill at top center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 flex items-center justify-end px-1.5 border border-neutral-900">
          <div className="w-1 h-1 rounded-full bg-[#1e293b] border border-neutral-800" />
        </div>

        {/* Lanyard Top Ribbon + Swivel Clasp */}
        <div className="relative w-full flex flex-col items-center mt-3 z-20">
          {/* White Woven Fabric Strap */}
          <div className="w-10 sm:w-12 h-6 sm:h-8 bg-[#f3f4f6] shadow-md border-x border-[#e5e7eb] flex items-center justify-center">
            {/* Subtle woven texture lines */}
            <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#000,#000_1px,#fff_1px,#fff_3px)]" />
          </div>

          {/* Metal Ring Bracket */}
          <div className="w-9 sm:w-11 h-4 sm:h-5 rounded-b-full border-2 border-[#cbd5e1] bg-gradient-to-b from-[#94a3b8] to-[#cbd5e1] flex items-center justify-center -mt-0.5 shadow-sm">
            <div className="w-6 sm:w-8 h-2 bg-black rounded-b-full" />
          </div>

          {/* Metal Swivel Lobster Snap Hook */}
          <div className="w-3.5 sm:w-4 h-6 sm:h-7 flex flex-col items-center -mt-1 z-30">
            <div className="w-2.5 h-2 rounded-full border border-slate-300 bg-slate-200" />
            <div className="w-2 h-4 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 rounded-b-sm border border-slate-300 shadow-sm" />
          </div>
        </div>

        {/* Hanging Climora Acrylic Badge */}
        <div className="relative w-[78%] h-[64%] bg-[#f7faf5] rounded-[10px] sm:rounded-[12px] shadow-[0_10px_30px_rgba(255,255,255,0.08)] border border-neutral-300/80 p-3 sm:p-4 flex flex-col items-center justify-between -mt-3 mb-auto">
          
          {/* Badge Punch Slot Hole at Top */}
          <div className="w-8 sm:w-10 h-2 bg-black/80 rounded-full border border-neutral-400 flex items-center justify-center">
            {/* Hook clip through slot */}
            <div className="w-2 h-3 bg-slate-300 rounded-xs border border-slate-400 shadow-inner" />
          </div>

          {/* Center Brand Identity: Climora Leaf Swirl Monogram & Text */}
          <div className="flex flex-col items-center justify-center my-auto">
            {/* Leaf C Monogram Icon */}
            <div className="w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center mb-1">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                {/* Upper curved green arch of C */}
                <path 
                  d="M 50 14 C 74 14 90 32 90 54 C 90 58 87 60 83 60 C 79 60 76 57 76 54 C 76 39 65 28 50 28 C 35 28 24 39 24 54 C 24 69 35 80 50 80 C 62 80 72 73 75 64 C 76 60 80 58 84 60 C 88 62 89 66 87 71 C 81 83 67 94 50 94 C 27 94 10 76 10 54 C 10 32 27 14 50 14 Z" 
                  fill="#6cc229" 
                />
                {/* Horizontal central leaf blade */}
                <path 
                  d="M 28 58 C 45 42 75 48 88 64 C 72 78 42 72 28 58 Z" 
                  fill="#6cc229" 
                />
              </svg>
            </div>

            {/* Climora Wordmark Typography */}
            <span className="text-[14px] sm:text-[16px] md:text-[17px] font-bold text-[#111827] font-sans tracking-tight">
              Climora
            </span>
          </div>

          {/* Bottom subtle blank spacer */}
          <div className="h-1" />

        </div>

        {/* Home indicator bar */}
        <div className="w-12 h-0.5 bg-white/40 rounded-full mx-auto mb-1.5 z-30" />
      </div>
    </div>
  );
};

// 4. ADBMS Airport Directional Wayfinding Sign on Copper/Orange iPhone (User Image 4)
export const PhoneMockupAdbmsSign: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[170px] sm:max-w-[185px] md:max-w-[195px] aspect-[9/19.5] bg-[#df7d45] rounded-[36px] p-[5.5px] border-[2.5px] border-[#b85b24] flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-neutral-400 select-none mx-auto"
    >
      {/* Side physical buttons (Copper Titanium) */}
      <div className="absolute -left-[5px] top-16 w-[2.5px] h-6 bg-[#9c4618] rounded-l-sm" />
      <div className="absolute -left-[5px] top-24 w-[2.5px] h-10 bg-[#9c4618] rounded-l-sm" />
      <div className="absolute -left-[5px] top-36 w-[2.5px] h-10 bg-[#9c4618] rounded-l-sm" />
      <div className="absolute -right-[5px] top-20 w-[2.5px] h-12 bg-[#9c4618] rounded-r-sm" />

      {/* Screen Inner Glass (Clean Minimalist White Background) */}
      <div className="relative w-full h-full bg-[#ffffff] rounded-[30px] overflow-hidden flex flex-col items-center justify-between p-2.5">
        
        {/* Dynamic Island Pill at top center */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 flex items-center justify-end px-1.5 border border-black">
          <div className="w-1 h-1 rounded-full bg-[#1e293b] border border-neutral-800" />
        </div>

        {/* Central Airport Wayfinding Sign Pill */}
        <div className="relative my-auto flex items-center justify-center">
          <div className="bg-[#0b0c0e] rounded-[8px] sm:rounded-[10px] px-2.5 sm:px-3 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 shadow-xl border border-neutral-800">
            
            {/* Bold Yellow Arrow Pointing Up */}
            <div className="text-[#fbb400] flex items-center justify-center">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 stroke-[4.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>

            {/* Aviation Yellow Takeoff Airplane Icon in Rounded Box */}
            <div className="bg-[#fbb400] text-[#0b0c0e] rounded-[4px] p-1 flex items-center justify-center">
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                {/* Takeoff angle airplane glyph */}
                <path d="M2.5 19h19v2h-19v-2zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10 8.35 4.54 6.78 5.2l3.96 5.86-4.54 1.48-1.89-1.39-1.36.44 1.63 3.65 1.54-.5 4.54-1.48 5.31 3.52 1.57-.66-3.96-5.86 5.31-1.72c.8-.22 1.28-1.05 1.06-1.85z" />
              </svg>
            </div>

            {/* Bold Aviation Yellow ADBMS Typography */}
            <span className="text-[13px] sm:text-[15px] md:text-[16px] font-black text-[#fbb400] font-sans tracking-tight">
              ADBMS
            </span>

          </div>
        </div>

        {/* Home indicator bar */}
        <div className="w-12 h-0.5 bg-black/40 rounded-full mx-auto mb-1.5 z-30" />
      </div>
    </div>
  );
};

// Cine Suggest Desktop Display Mockup matching the exact Cine Suggest movie discovery web app mockup
export const CineSuggestDesktopMockup: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] mx-auto"
    >
      {/* Outer Monitor Frame (Apple Studio Display / iMac with thin, uniform dark bezel) */}
      <div className="w-full bg-[#0a0a0c] rounded-[7px] sm:rounded-[10px] p-[4px] sm:p-[6px] md:p-[7px] border border-neutral-800">
        
        {/* Screen Canvas (Dark Grid Background matching Cine Suggest UI) */}
        <div className="relative w-full aspect-[16/10] bg-[#060911] text-white rounded-[4px] sm:rounded-[6px] p-2.5 sm:p-3.5 md:p-4 flex flex-col justify-between overflow-hidden border border-neutral-900/60">
          
          {/* Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
              backgroundSize: '22px 22px'
            }}
          />

          {/* Top Navbar */}
          <div className="relative flex items-center justify-between z-20 mb-1 sm:mb-2">
            {/* Cine Suggest Brand Logo */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] sm:text-[13px] md:text-[15px] font-extrabold tracking-tight text-[#42dfca] font-sans">
                Cine <span className="font-bold">Suggest</span>
              </span>
            </div>

            {/* Right: Search Pill & Login Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Search input pill */}
              <div className="flex items-center gap-1 bg-[#0d1424] border border-[#1e2c45] rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#64748b] text-[6px] sm:text-[8px] md:text-[9px]">
                <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-[#64748b]/80">Search...</span>
              </div>

              {/* Login Button Pill */}
              <div className="bg-[#42dfca] text-[#061019] rounded-full px-2 sm:px-3 py-0.5 sm:py-1 font-semibold text-[6px] sm:text-[8px] md:text-[9px] shadow-xs">
                Login
              </div>
            </div>
          </div>

          {/* Main Workspace: Left Sidebar + Hero Copy & Right Movie Bento Cards */}
          <div className="relative flex-1 flex items-center justify-between gap-2 sm:gap-3 z-10 overflow-hidden">
            
            {/* Left Column: Floating Vertical Pill Sidebar + Hero Headline Copy */}
            <div className="flex items-center gap-2 sm:gap-3.5 h-full max-w-[48%]">
              
              {/* Floating Vertical Pill Sidebar */}
              <div className="relative bg-[#0a1120]/90 border border-[#1e293b] rounded-full py-2 sm:py-3 px-1 sm:px-1.5 flex flex-col items-center justify-center gap-2 sm:gap-3 shadow-lg shrink-0">
                {/* Active Home Item with neon green indicator dot */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute -left-[5px] sm:-left-[7px] w-1 sm:w-1.5 h-2 sm:h-3 bg-[#4ade80] rounded-full" />
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-md sm:rounded-lg border border-[#42dfca]/50 bg-[#42dfca]/15 flex items-center justify-center text-[#42dfca]">
                    <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>

                {/* Grid Icon */}
                <div className="text-neutral-500 hover:text-neutral-300">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>

                {/* Video Play Icon */}
                <div className="text-neutral-500 hover:text-neutral-300">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>

                {/* Broadcast / Signal Icon */}
                <div className="text-neutral-500 hover:text-neutral-300">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.828a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M12 12h.01" />
                  </svg>
                </div>

                {/* Heart Icon */}
                <div className="text-neutral-500 hover:text-neutral-300">
                  <svg className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>

              {/* Hero Headline Copy */}
              <div className="flex flex-col items-start text-left justify-center pr-1">
                <h3 className="text-[11px] sm:text-[14px] md:text-[16.5px] lg:text-[18px] font-bold text-white tracking-tight leading-[1.12] mb-1 sm:mb-2">
                  Your next<br />favourite<br />film is waiting.
                </h3>
                <p className="text-[5.5px] sm:text-[7.5px] md:text-[8.5px] text-[#8ea0b8] leading-[1.3] mb-2 sm:mb-3">
                  Discover movies by mood, taste, and real people — not boring algorithms.
                </p>
                <div className="bg-[#42dfca] hover:bg-[#32ceb9] transition-colors text-[#061019] rounded-full px-2 sm:px-3 py-0.5 sm:py-1 font-semibold text-[6px] sm:text-[8px] md:text-[9px] flex items-center gap-1 shadow-md">
                  <span>Start Exploring</span>
                  <span>→</span>
                </div>
              </div>

            </div>

            {/* Right Column: 3-Column Staggered Bento Movie Poster Showcase */}
            <div className="flex-1 h-full flex items-center justify-end gap-1 sm:gap-1.5 max-w-[54%]">
              
              {/* Poster Column 1 (Left of group: Avengers + The Odyssey) */}
              <div className="flex flex-col gap-1 sm:gap-1.5 w-[28%] h-[92%] justify-center">
                {/* Poster: AVENGERS */}
                <div className="relative flex-1 rounded-[4px] sm:rounded-[6px] overflow-hidden bg-gradient-to-b from-[#0e2a22] via-[#051410] to-[#020806] border border-emerald-900/40 p-1 flex flex-col justify-between shadow-md">
                  <div className="flex justify-start">
                    <span className="text-[3.5px] sm:text-[4.5px] font-bold text-emerald-400/80 tracking-wider">TRENDING</span>
                  </div>
                  {/* Silhouette Artwork */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-70">
                    <div className="w-6 sm:w-8 h-8 sm:h-10 bg-emerald-950/60 rounded-t-full blur-[1px] [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]" />
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="text-[4.5px] sm:text-[6px] font-black tracking-widest text-emerald-200 uppercase font-mono drop-shadow">AVENGERS</span>
                  </div>
                </div>

                {/* Poster: THE ODYSSEY */}
                <div className="relative flex-1 rounded-[4px] sm:rounded-[6px] overflow-hidden bg-gradient-to-b from-[#3a1d12] via-[#1f0f08] to-[#0c0503] border border-amber-900/40 p-1 flex flex-col justify-between shadow-md">
                  <div className="flex justify-start">
                    <span className="text-[3.5px] sm:text-[4.5px] font-bold text-amber-400/80 tracking-wider">TRENDING</span>
                  </div>
                  {/* Warrior Silhouette in twilight */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 sm:w-6 h-6 sm:h-8 bg-gradient-to-t from-black via-red-950 to-orange-600/40 rounded-t-md" />
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="text-[4px] sm:text-[5.5px] font-bold tracking-wider text-amber-100 uppercase">THE ODYSSEY</span>
                  </div>
                </div>
              </div>

              {/* Poster Column 2 (Center Spotlight: Facing El Chapo + Obsession + Spider-Man) */}
              <div className="flex flex-col gap-1 sm:gap-1.5 w-[38%] h-full justify-center">
                {/* Main Large Card: FACING EL CHAPO */}
                <div className="relative h-[62%] rounded-[5px] sm:rounded-[7px] overflow-hidden bg-gradient-to-b from-[#2b2b36] via-[#1a1c24] to-[#090b10] border border-slate-700/50 p-1 sm:p-1.5 flex flex-col justify-between shadow-lg">
                  <div className="flex justify-center z-10">
                    <span className="text-[3.5px] sm:text-[5px] font-bold text-teal-400 tracking-wider">TRENDING</span>
                  </div>
                  {/* Two Tactical Officers Artwork with glass crack effect */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-slate-900/60 to-black flex items-center justify-around px-1">
                      <div className="w-5 sm:w-7 h-10 sm:h-14 bg-gradient-to-b from-amber-800/40 to-slate-900 rounded-t-sm" />
                      <div className="w-5 sm:w-7 h-11 sm:h-15 bg-gradient-to-b from-amber-700/40 to-slate-900 rounded-t-sm" />
                    </div>
                    {/* Bullet Hole graphic */}
                    <div className="absolute top-1/2 right-3 w-3 h-3 rounded-full border border-white/60 bg-white/20 blur-[0.5px]" />
                  </div>
                  <div className="relative z-10 text-center">
                    <span className="text-[3.5px] sm:text-[4.5px] font-extrabold text-neutral-400 tracking-widest block leading-none">FACING</span>
                    <span className="text-[6.5px] sm:text-[9px] font-black text-white tracking-tight leading-none block font-sans">EL CHAPO</span>
                  </div>
                </div>

                {/* Sub-row: OBSESSION & SPIDER-MAN side-by-side */}
                <div className="grid grid-cols-2 gap-1 h-[34%]">
                  {/* Poster: OBSESSION */}
                  <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#181a2e] to-[#080912] border border-indigo-900/40 p-0.5 flex flex-col justify-between shadow-xs">
                    <div className="text-[3px] sm:text-[4px] font-bold text-indigo-400">TRENDING</div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                      <div className="w-3 h-4 bg-cyan-400/30 blur-[2px] rounded-full" />
                    </div>
                    <div className="relative z-10 text-[3.5px] sm:text-[4.5px] font-black text-rose-400 text-center tracking-tighter">OBSESSION</div>
                  </div>

                  {/* Poster: SPIDER-MAN */}
                  <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#7f1d1d] via-[#450a0a] to-[#180303] border border-red-800/40 p-0.5 flex flex-col justify-between shadow-xs">
                    <div className="text-[3px] sm:text-[4px] font-bold text-red-300">TRENDING</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-6 rounded-full bg-red-600/50 border border-white/40 [clip-path:polygon(30%_0%,70%_0%,100%_100%,0%_100%)]" />
                    </div>
                    <div className="relative z-10 text-center leading-none">
                      <span className="text-[3px] sm:text-[4px] font-black text-white block">SPIDER-MAN</span>
                      <span className="text-[2.5px] sm:text-[3px] text-red-300 block">BRAND NEW DAY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poster Column 3 (Right 2x2 Grid: Disclosure Day, Camp Rock 3, Project Hail Mary, End of Oak Street) */}
              <div className="grid grid-cols-2 gap-1 w-[34%] h-[92%]">
                {/* 1. DISCLOSURE DAY */}
                <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] border border-slate-700/40 p-0.5 flex flex-col justify-between shadow-xs">
                  <div className="text-[3px] sm:text-[3.5px] font-bold text-slate-400">TRENDING</div>
                  {/* Eye graphic */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-80">
                    <div className="w-4 h-2.5 rounded-full bg-cyan-500/40 border border-cyan-300/80 flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="relative z-10 text-[3px] sm:text-[4px] font-extrabold text-white text-center tracking-tight">DISCLOSURE DAY</div>
                </div>

                {/* 2. CAMP ROCK 3 */}
                <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#7c2d12] via-[#431407] to-[#1c0702] border border-orange-700/40 p-0.5 flex flex-col justify-between shadow-xs">
                  <div className="text-[2.5px] sm:text-[3.5px] text-amber-200">Disney TRENDING</div>
                  <div className="relative z-10 text-center my-auto">
                    <div className="text-[4px] sm:text-[5.5px] font-black text-amber-300 tracking-tighter leading-none">CAMP</div>
                    <div className="text-[4px] sm:text-[5.5px] font-black text-orange-400 tracking-tighter leading-none">ROCK 3</div>
                  </div>
                  <div className="text-[2.5px] sm:text-[3px] text-amber-300/80 text-center">NOW STREAMING</div>
                </div>

                {/* 3. PROJECT HAIL MARY */}
                <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#020617] to-black border border-cyan-900/40 p-0.5 flex flex-col justify-between shadow-xs">
                  <div className="text-[3px] sm:text-[3.5px] font-bold text-cyan-400">TRENDING</div>
                  {/* Astronaut Helmet Visor */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-5 rounded-t-full bg-gradient-to-b from-amber-400/30 to-slate-900 border border-white/20" />
                  </div>
                  <div className="relative z-10 text-center leading-none">
                    <span className="text-[2px] sm:text-[3px] text-slate-300 block">PROJECT</span>
                    <span className="text-[3.5px] sm:text-[4.5px] font-black text-cyan-200 block">HAIL MARY</span>
                  </div>
                </div>

                {/* 4. THE END OF OAK STREET */}
                <div className="relative rounded-[3.5px] sm:rounded-[5px] overflow-hidden bg-gradient-to-b from-[#134e4a] via-[#042f2e] to-[#021312] border border-teal-900/40 p-0.5 flex flex-col justify-between shadow-xs">
                  <div className="text-[3px] sm:text-[3.5px] font-bold text-teal-400">TRENDING</div>
                  <div className="relative z-10 text-center my-auto">
                    <span className="text-[2.5px] sm:text-[3.5px] text-teal-200 block leading-none">THE</span>
                    <span className="text-[4px] sm:text-[5.5px] font-black text-white block leading-none tracking-tight">END</span>
                    <span className="text-[2.5px] sm:text-[3.5px] text-teal-300 block leading-none">OF OAK STREET</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Apple Studio Display / iMac Aluminum Stand Column */}
      <div className="w-16 sm:w-20 md:w-24 h-8 sm:h-11 md:h-13 bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] border-x border-[#c4c9d2]" />
      
      {/* Aluminum Stand Flat Horizontal Foot Base Plate */}
      <div className="w-26 sm:w-32 md:w-38 h-1.5 sm:h-2 bg-gradient-to-r from-[#cbd0d8] via-[#f3f4f6] to-[#cbd0d8] rounded-[2px] border-t border-white/70" />
    </div>
  );
};

// Be+ Creative Brand & Typography Desktop Display Mockup matching exact paper-tear artwork in user's image
export const BePlusDesktopMockup: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] mx-auto"
    >
      {/* Outer Monitor Frame (Apple Studio Display / iMac with thin, uniform dark bezel) */}
      <div className="w-full bg-[#0a0a0c] rounded-[7px] sm:rounded-[10px] p-[4px] sm:p-[6px] md:p-[7px] border border-neutral-800">
        
        {/* Screen Canvas (Deep Burgundy Textured Paper 16:10 aspect ratio) */}
        <div 
          className="relative w-full aspect-[16/10] text-white rounded-[4px] sm:rounded-[6px] flex items-center justify-center overflow-hidden border border-neutral-900/80"
          style={{
            background: 'radial-gradient(ellipse at 52% 48%, #52161b 0%, #461217 55%, #380d11 100%)'
          }}
        >
          {/* Subtle Paper Grain Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
              backgroundSize: '4px 4px'
            }}
          />

          {/* Central Realistic Paper Tear Composition */}
          <div className="relative w-[62%] sm:w-[58%] md:w-[54%] h-[30%] sm:h-[32%] md:h-[34%] flex items-center justify-center">
            
            {/* Cast Shadow of the paper tear aperture onto the interior */}
            <div className="absolute inset-0 bg-black/40 rounded-full blur-[4px] scale-[1.03]" />

            {/* Revealed Pure White Crisp Paper Card behind the tear */}
            <div className="relative w-full h-full bg-[#ffffff] rounded-r-[4px] overflow-hidden flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.22)]">
              
              {/* Top & Bottom fibrous tear deckle edges inside the white cavity */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-b from-[#e5dec9]/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-t from-[#e5dec9]/60 to-transparent pointer-events-none" />

              {/* Bold Maroon "Be+" Wordmark typography */}
              <div className="relative z-10 pl-6 sm:pl-8 md:pl-10 flex items-center justify-center">
                <span className="text-[28px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-black text-[#481216] font-sans tracking-tight leading-none select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center">
                  Be<span className="font-extrabold ml-[1px] sm:ml-[2px] text-[26px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-none -translate-y-[1px]">+</span>
                </span>
              </div>
            </div>

            {/* Jagged / Deckled Paper Tear Border Along the Top & Bottom Aperture */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
              viewBox="0 0 240 80" 
              preserveAspectRatio="none"
            >
              {/* Top Torn Paper Edge with rough deckled fibrous texture */}
              <path 
                d="M 38,40 Q 42,8 55,7 Q 75,5 95,8 Q 115,5 140,7 Q 165,9 190,6 Q 210,8 225,18 Q 238,28 238,40 Q 238,52 225,62 Q 210,72 190,74 Q 165,71 140,73 Q 115,75 95,72 Q 75,75 55,73 Q 42,72 38,40 Z" 
                fill="none" 
                stroke="#fbf8f3" 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
              />
              {/* Secondary fine shredded fiber layer */}
              <path 
                d="M 40,40 Q 45,9 60,8 Q 80,6 100,9 Q 125,6 150,8 Q 175,10 200,7 Q 220,10 234,22 Q 240,32 236,44 Q 230,56 215,66 Q 195,73 170,72 Q 145,74 120,73 Q 95,76 70,73 Q 50,71 40,40 Z" 
                fill="none" 
                stroke="#eae3d5" 
                strokeWidth="1.2"
                strokeDasharray="2 1"
                opacity="0.9"
              />
            </svg>

            {/* Curled Paper Roll on the Left (3D Paper Scroll Effect) */}
            <div className="absolute -left-3 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 w-8 sm:w-11 md:w-13 h-[115%] z-30 flex items-center">
              
              {/* Realistic 3D Cast Shadow from the roll onto the burgundy canvas */}
              <div 
                className="absolute inset-0 bg-black/75 blur-[5px] sm:blur-[7px] rounded-l-full -translate-x-2 translate-y-1 scale-y-110"
              />

              {/* Cylindrical Rolled Paper Body with 3D Light Gradient */}
              <div 
                className="relative w-full h-full rounded-l-[12px] sm:rounded-l-[16px] rounded-r-[2px] overflow-hidden shadow-2xl flex items-center justify-between"
                style={{
                  background: 'linear-gradient(110deg, #d3ccc5 0%, #f4f0ec 22%, #ffffff 42%, #e5ded7 68%, #bfb4a8 88%, #6a5e55 100%)',
                  boxShadow: '-4px 6px 14px rgba(0,0,0,0.5), inset 2px 0 4px rgba(255,255,255,0.8)'
                }}
              >
                {/* Inner rolled hollow shadow / curl depth */}
                <div 
                  className="w-[30%] h-full bg-gradient-to-r from-black/50 via-black/20 to-transparent"
                />

                {/* Subtle paper grain on the curl */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 pointer-events-none" />

                {/* Rolled flap edge highlight */}
                <div className="w-[12%] h-full bg-gradient-to-l from-[#ffffff] to-[#ded6cd]" />
              </div>
            </div>

          </div>

          {/* Elegant 4-Point Diamond Sparkle Star in Bottom Right Area */}
          <div className="absolute bottom-[16%] right-[14%] sm:right-[15%] md:right-[16%] pointer-events-none z-10">
            <svg 
              className="w-3 sm:w-4 md:w-4.5 h-3 sm:h-4 md:h-4.5 text-[#8f3a40] opacity-80 transition-opacity group-hover:opacity-100" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" />
            </svg>
          </div>

        </div>
      </div>

      {/* Apple Studio Display / iMac Aluminum Stand Column */}
      <div className="w-16 sm:w-20 md:w-24 h-8 sm:h-11 md:h-13 bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] border-x border-[#c4c9d2]" />
      
      {/* Aluminum Stand Flat Horizontal Foot Base Plate */}
      <div className="w-26 sm:w-32 md:w-38 h-1.5 sm:h-2 bg-gradient-to-r from-[#cbd0d8] via-[#f3f4f6] to-[#cbd0d8] rounded-[2px] border-t border-white/70" />
    </div>
  );
};

// Desktop Display Mockup matching the exact Apple Studio Display / iMac modernist website layout in user's image
export const DesktopMockup: React.FC<{
  headline?: string;
  subtext?: string;
  onClick?: () => void;
}> = ({
  headline = "We are a power trio of\ndesign & technology.",
  subtext = "We build and share things that\nare ready for production.",
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="group relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] mx-auto"
    >
      {/* Outer Monitor Frame (Exact Apple Studio Display with thin, uniform dark bezel) */}
      <div className="w-full bg-black rounded-[6px] sm:rounded-[9px] p-[4px] sm:p-[6px] md:p-[7px] border border-neutral-900">
        
        {/* Screen Canvas (Seamless Pure White 16:10 aspect ratio) */}
        <div className="relative w-full aspect-[16/10] bg-white text-black rounded-[3px] sm:rounded-[4px] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between overflow-hidden">
          
          {/* Top Navbar */}
          <div className="flex items-center justify-between z-10">
            {/* Trio Brand Mark & Subtitle */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Trio Glyphs: Solid Square, Solid Circle, Ring/Circle */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-black" />
                <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-black rounded-full" />
                <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 border-[1.5px] sm:border-2 border-black rounded-full" />
              </div>
              <div className="flex flex-col ml-0.5 sm:ml-1 leading-[0.85] text-[6.5px] sm:text-[8px] md:text-[9px] font-sans text-neutral-800 font-medium tracking-tight">
                <span>Studio for</span>
                <span>Production</span>
              </div>
            </div>

            {/* Minimal Nav Links */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-[8.5px] sm:text-[10px] md:text-[11px] text-neutral-500 font-sans font-normal tracking-normal">
              <span className="hover:text-black transition-colors">Projects</span>
              <span className="hover:text-black transition-colors">Blog</span>
              <span className="hover:text-black transition-colors">Contact</span>
            </div>
          </div>

          {/* Main Body Content */}
          <div className="relative w-full flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 z-10">
            {/* Top-Left Headline */}
            <div className="max-w-[62%]">
              <p className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-medium text-black font-inter leading-[1.2] whitespace-pre-line tracking-tight">
                {headline}
              </p>
            </div>

            {/* Middle/Right-aligned Subtext positioned right above the geometric shapes */}
            <div className="self-end text-right max-w-[56%] pb-1 sm:pb-2">
              <p className="text-[9px] sm:text-[11px] md:text-[12.5px] font-normal text-neutral-800 font-sans leading-[1.35] whitespace-pre-line">
                {subtext}
              </p>
            </div>
          </div>

          {/* Bottom Architectural Solid Geometric Shapes (Left: Rectangle, Center: Trapezoid, Right: Dome) */}
          <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-5 md:px-6 flex items-end justify-between gap-2 sm:gap-3.5 z-0 pointer-events-none">
            {/* Left Solid Black Rectangle */}
            <div className="w-[30%] h-12 sm:h-16 md:h-20 lg:h-22 bg-black" />

            {/* Center Solid Black Trapezoid */}
            <div className="w-[32%] h-12 sm:h-16 md:h-20 lg:h-22 bg-black [clip-path:polygon(18%_0%,82%_0%,100%_100%,0%_100%)]" />

            {/* Right Solid Black Semicircle Dome */}
            <div className="w-[30%] h-12 sm:h-16 md:h-20 lg:h-22 bg-black rounded-t-full" />
          </div>
        </div>
      </div>

      {/* Apple Studio Display Aluminum Stand Column */}
      <div className="w-16 sm:w-20 md:w-24 h-8 sm:h-11 md:h-13 bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] border-x border-[#c4c9d2]" />
      
      {/* Aluminum Stand Flat Horizontal Foot Base Plate */}
      <div className="w-26 sm:w-32 md:w-38 h-1.5 sm:h-2 bg-gradient-to-r from-[#cbd0d8] via-[#f3f4f6] to-[#cbd0d8] rounded-[2px] border-t border-white/70" />
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  // Map projects cleanly to the 4 exhibition mockups
  const pCine = PROJECTS.find(p => p.id === 'cine-suggest') || PROJECTS[0];         // Cine Suggest AI Movie Discovery (Top Center iMac)
  const pBePlus = PROJECTS.find(p => p.id === 'be-plus') || PROJECTS[1];           // Be+ Digital Identity & Experience (Top Right Phone)
  const pNivala = PROJECTS.find(p => p.id === 'nivala') || PROJECTS[3];             // NIVALA Leftover Food System (Top Left Phone)
  const pClimora = PROJECTS.find(p => p.id === 'climora-iot') || PROJECTS[4];       // Climora IoT Climate Platform (Bottom Center iMac)

  return (
    <section 
      id="projects" 
      className="pt-20 md:pt-28 pb-10 sm:pb-14 md:pb-16 px-6 sm:px-10 lg:px-16 w-full bg-[#111111] border-t border-neutral-800/80 overflow-x-clip"
    >
      <div className="w-full max-w-[1360px] mx-auto flex flex-col overflow-x-clip">
        {/* Section Header matching exact typography from reference image */}
        <div className="mb-14 sm:mb-18 lg:mb-20">
          <span className="font-mono text-[#e51919] text-lg sm:text-xl font-medium tracking-wide lowercase block mb-1.5">
            portfolio
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase font-inter leading-none">
            PROJECTS
          </h2>
        </div>

        {/* Exhibition Mockups with Sticky Scroll-on Overlay for Climora over Cine Suggest */}
        <div className="w-full relative flex flex-col items-center pb-[8vh] sm:pb-[10vh] overflow-x-clip">
          {/* Layer 1: Nivala (Left), Cine Suggest (Center), Be+ (Right) */}
          <div className="sticky top-20 sm:top-24 md:top-28 z-10 w-full flex items-center justify-center pointer-events-none">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-20 lg:gap-28 xl:gap-32 h-auto md:h-[340px] lg:h-[385px]">
              
              {/* Left Phone (NIVALA Phone Mockup: 186px × 385px) */}
              <div 
                onClick={() => onSelectProject(pNivala)}
                className="h-[340px] sm:h-[400px] md:h-full lg:w-[186px] lg:h-[385px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02] select-none flex items-center justify-center shrink-0 pointer-events-auto shadow-none"
              >
                <img
                  src="/m.png?v=2"
                  alt="Nivala Phone Mockup"
                  className="h-full w-auto object-contain block select-none shadow-none drop-shadow-none filter-none"
                />
              </div>

              {/* Center Desktop / iMac (Cine Suggest Desktop Mockup: 519px × 385px) */}
              <div 
                onClick={() => onSelectProject(pCine)}
                className="h-[340px] sm:h-[400px] md:h-full lg:w-[519px] lg:h-[385px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02] select-none flex items-center justify-center shrink-0 pointer-events-auto shadow-none"
              >
                <img
                  src="/mockup-cine-suggest.png?v=2"
                  alt="Cine Suggest Desktop Mockup"
                  className="h-full w-auto object-contain block select-none shadow-none drop-shadow-none filter-none"
                />
              </div>

              {/* Right Phone (Be+ Phone Mockup: 187px × 385px) */}
              <div 
                onClick={() => onSelectProject(pBePlus)}
                className="h-[340px] sm:h-[400px] md:h-full lg:w-[187px] lg:h-[385px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02] select-none flex items-center justify-center shrink-0 pointer-events-auto shadow-none"
              >
                <img
                  src="/moc.png?v=2"
                  alt="Be+ Experience Mockup"
                  className="h-full w-auto object-contain block select-none shadow-none drop-shadow-none filter-none"
                />
              </div>

            </div>
          </div>

          {/* Layer 2: Climora Mac Mockup ONLY - slow deliberate scroll-on overlay on Cine Suggest Mac mockup: 519px × 385px */}
          <div className="sticky top-20 sm:top-24 md:top-28 z-20 w-full flex items-center justify-center pointer-events-none mt-[150vh] sm:mt-[180vh] md:mt-[210vh]">
            <div className="h-[340px] sm:h-[400px] md:h-[340px] lg:h-[385px] flex items-center justify-center">
              <div 
                onClick={() => onSelectProject(pClimora)}
                className="h-full lg:w-[519px] lg:h-[385px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02] select-none flex items-center justify-center pointer-events-auto shadow-none"
              >
                <img
                  src="/mockup-climera.png?v=2"
                  alt="Climora Climate Anomaly Desktop Mockup"
                  className="h-full w-auto object-contain block select-none shadow-none drop-shadow-none filter-none bg-[#111111]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
