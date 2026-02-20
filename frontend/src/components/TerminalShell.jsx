import React from 'react';

const TerminalShell = ({ children, isDark = true }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      isDark ? 'bg-[#020806]' : 'bg-[#f4f4f4]'
    }`}>
      <div className={`relative w-full max-w-2xl border-2 rounded-sm overflow-hidden transition-all duration-500 ${
        isDark 
          ? 'bg-[#050c09] border-[#1a2e25] shadow-[0_0_50px_rgba(74,222,128,0.15)]' 
          : 'bg-white border-black/10 shadow-xl'
      }`}>
        
        {/* CRT Glass Overlay - Only visible in Dark Mode */}
        {isDark && (
          <div className="pointer-events-none absolute inset-0 z-50">
            {/* Static Scanline Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_3px,3px_100%]" />
            
            {/* Moving Scanline Bar */}
            <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-[#4ade80]/5 to-transparent h-20 w-full opacity-20" />
            
            {/* Screen Flicker Effect */}
            <div className="absolute inset-0 animate-flicker bg-[#4ade80]/5 mix-blend-screen pointer-events-none" />
          </div>
        )}

        {/* Terminal Header */}
        <div className={`border-b p-3 flex justify-between items-center relative z-[60] transition-colors ${
          isDark 
            ? 'bg-[#1a2e25]/40 border-[#1a2e25]' 
            : 'bg-gray-100 border-black/10'
        }`}>
          <div className="flex gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-red-900/60 shadow-[0_0_5px_red]' : 'bg-red-400'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-yellow-600/60 shadow-[0_0_5px_yellow]' : 'bg-yellow-400'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#4ade80]/60 shadow-[0_0_5px_#4ade80]' : 'bg-green-400'}`} />
          </div>
          <div className="flex items-center gap-3">
             <span className={`text-[9px] font-bold tracking-[0.3em] animate-pulse ${
               isDark ? 'text-[#4ade80]' : 'text-black/40'
             }`}>
              [ {isDark ? 'SYSTEM_STABLE' : 'UI_OPTIMIZED'} ]
            </span>
            <span className={`text-[9px] font-bold tracking-[0.2em] opacity-40 ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              V4.0.2_KTM
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 p-6 md:p-10 min-h-[400px]">
          {/* Subtly curved inner shadow for CRT look - Only in Dark Mode */}
          {isDark && (
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] pointer-events-none" />
          )}
          <div className="relative z-20">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.95; }
          10% { opacity: 0.9; }
          15% { opacity: 0.98; }
          20% { opacity: 0.94; }
          100% { opacity: 0.97; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  );
};

export default TerminalShell;