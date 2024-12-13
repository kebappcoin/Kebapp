import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  days: number;
}

export default function CountdownTimer({ days }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    const difference = +endDate - +new Date();

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4">
      <p className="text-gray-400 text-xl font-medium mb-4">PRESALE ENDS IN</p>
      <div className="flex gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-[#1a1b1e] rounded-lg px-6 py-3 border border-yellow-500/20">
              <span className="text-3xl font-mono text-yellow-400">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm mt-2 text-gray-500 uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}