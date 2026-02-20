import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import TerminalShell from './components/TerminalShell';
import SetupWizard from './components/SetupWizard';
import Countdown from './components/CountDown';
import ramadanCover from './assets/ramadan.png';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ramadan_timings() {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(dayjs());

  // Handle Clock Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial Load
  useEffect(() => {
    const saved = localStorage.getItem('ramadan_prefs');
    const savedTheme = localStorage.getItem('theme_mode');
    if (saved) setConfig(JSON.parse(saved));
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  // Fetch Data
  useEffect(() => {
    if (config) {
      fetch(`http://127.0.0.1:8000/api/config/status/?user=${config.username}&city=${config.city}&country=${config.country}`)
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error("API Link Failed", err));
    }
  }, [config]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme_mode', newMode ? 'dark' : 'light');
  };

  // Fixed container class to prevent size jumping
  const containerStyle = "max-w-[420px] mx-auto w-full transition-all duration-500 ease-in-out";

  // --- 1. SETUP VIEW ---
  if (!config) {
    return (
      <TerminalShell isDark={isDarkMode}>
        <div className={`${containerStyle} py-8 px-4 flex flex-col items-center`}>
          <div className="mb-6 text-center">
            <h1 className={`text-2xl font-black tracking-[0.2em] uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
              RAMADAN<span className="text-emerald-500">_CORE</span>
            </h1>
            <button 
              onClick={toggleTheme}
              className={`mt-4 text-[8px] font-bold px-3 py-1 border rounded-sm tracking-widest transition-all ${
                isDarkMode ? 'border-white/20 text-white/50 hover:text-white' : 'border-black/20 text-black/50 hover:text-black'
              }`}
            >
              MODE: {isDarkMode ? 'DARK' : 'LIGHT'}
            </button>
          </div>

          <div className={`w-full rounded border mb-8 overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
            <img src={ramadanCover} alt="Ramadan" className="w-full grayscale opacity-60" />
          </div>

          <SetupWizard onComplete={setConfig} />
        </div>
      </TerminalShell>
    );
  }

  // --- 2. LOADING VIEW ---
  if (!data) return (
    <TerminalShell isDark={isDarkMode}>
      <div className={`${containerStyle} h-[450px] flex items-center justify-center`}>
        <div className={`text-[10px] tracking-[0.5em] animate-pulse ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>
          LINKING_STATION...
        </div>
      </div>
    </TerminalShell>
  );

  // --- 3. MAIN DASHBOARD VIEW ---
  return (
    <TerminalShell isDark={isDarkMode}>
      <div className={`${containerStyle} py-6 px-4 space-y-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        
        {/* HEADER */}
        <div className={`flex justify-between items-center border-b pb-5 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="leading-tight">
             <p className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">Authorized_User</p>
             <h2 className="text-lg font-black tracking-tight uppercase">
               {config.username} <span className="opacity-20">/</span> {config.city}
             </h2>
          </div>
          <div className="flex flex-col items-end gap-1.5">
             <button 
                onClick={toggleTheme}
                className={`text-[9px] font-black px-2.5 py-1 rounded-sm transition-all ${
                  isDarkMode 
                  ? 'bg-white text-black hover:bg-emerald-400' 
                  : 'bg-black text-white hover:bg-emerald-600'
                }`}
             >
                {isDarkMode ? 'UI_LIGHT' : 'UI_DARK'}
             </button>
             <p className="text-lg font-bold font-mono tracking-tighter">
                {currentTime.format('HH:mm:ss')}
             </p>
          </div>
        </div>

        {/* DATA SECTION */}
        <div className="space-y-8">
          <div className={`text-center py-4 rounded-xl border transition-all ${isDarkMode ? 'bg-white/[0.01] border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <p className="text-[9px] uppercase tracking-[0.6em] opacity-30 font-black mb-1">Current_Roza</p>
            <span className="text-8xl font-black leading-none tracking-tighter inline-block">
              {data.roza}
            </span>
          </div>

          <div className={`border-y py-4 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
            <Countdown 
                targetTime={data.timings.iftar} 
                label="T-MINUS_IFTAR" 
                timezoneName={data.timezone} 
                isDark={isDarkMode}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-lg border transition-all ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-gray-50'}`}>
              <p className="text-[8px] uppercase tracking-wider opacity-40 font-bold mb-2">Sehar_End</p>
              <p className="text-3xl font-black tabular-nums tracking-tight">{data.timings.sehar}</p>
            </div>
            <div className={`p-6 rounded-lg border transition-all ${isDarkMode ? 'border-emerald-500/10 bg-emerald-500/[0.03]' : 'border-emerald-500/20 bg-emerald-50'}`}>
              <p className={`text-[8px] uppercase tracking-wider font-bold mb-2 ${isDarkMode ? 'text-emerald-500/60' : 'text-emerald-600'}`}>Iftar_Start</p>
              <p className="text-3xl font-black tabular-nums tracking-tight">{data.timings.iftar}</p>
            </div>
          </div>
        </div>
        <div className="pt-6 flex justify-between items-center opacity-30">
          <p className="text-[7px] font-mono tracking-widest uppercase">Node_{config.city.toLowerCase()}_v4.0.26</p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className={`text-[8px] font-black tracking-widest border-b pb-0.5 transition-all ${isDarkMode ? 'border-white/20 hover:text-red-500 hover:border-red-500' : 'border-black/20 hover:text-red-600 hover:border-red-600'}`}
          >
            TERMINATE_SESSION
          </button>
        </div>
      </div>
    </TerminalShell>
  );
}