import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Activate dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const Countdown = ({ targetTime, label, timezoneName = dayjs.tz.guess() }) => {
  const [timeLeft, setTimeLeft] = useState('--:--:--');

  useEffect(() => {
    const updateTimer = () => {
      if (!targetTime) return;

      // 1. Get 'now' in the target city's timezone
      const nowInTarget = dayjs().tz(timezoneName);
      
      // 2. Parse target time (HH:mm) into today's date in that timezone
      const [hours, minutes] = targetTime.split(':');
      let target = nowInTarget.hour(parseInt(hours)).minute(parseInt(minutes)).second(0);

      // 3. Logic: If Iftar has passed, show elapsed
      if (target.isBefore(nowInTarget)) {
        setTimeLeft("GO_FOR_IFTAR");
        return;
      }

      // 4. Calculate Difference
      const diff = target.diff(nowInTarget);
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      
      setTimeLeft(`${h}:${m}:${s}`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, [targetTime, timezoneName]);

  return (
    <div className="flex flex-col items-center my-8 py-6 border-y border-ramadan-border/30">
      <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2 italic">
        {label}
      </span>
      <div className="text-6xl md:text-7xl font-black text-hanafi-yellow yellow-glow tracking-tighter tabular-nums">
        {timeLeft}
      </div>
      <div className="mt-2 text-[8px] opacity-30 tracking-widest uppercase">
        T-Zone: {timezoneName}
      </div>
    </div>
  );
};

export default Countdown;