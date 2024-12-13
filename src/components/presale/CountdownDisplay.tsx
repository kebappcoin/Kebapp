import React, { useState, useEffect } from 'react';
import { usePresale } from '../../context/PresaleContext';
import { useNotifications } from '../../context/NotificationContext';

interface TimeUnit {
  value: number;
  label: string;
}

interface CountdownDisplayProps {
  endDate?: Date;
}

export function CountdownDisplay({ endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }: CountdownDisplayProps) {
  const { setPresaleEnded } = usePresale();
  const { addNotification } = useNotifications();
  
  const calculateTimeLeft = () => {
    const difference = +endDate - Date.now();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setPrevTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
      
      // Check if countdown has ended
      const isEnded = Object.values(newTimeLeft).every(value => value === 0);
      if (isEnded) {
        setPresaleEnded(true);
        addNotification('info', 'Presale has ended!');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, timeLeft, setPresaleEnded, addNotification]);

  const timeUnits = [
    { key: 'days', value: timeLeft.days, prevValue: prevTimeLeft.days, label: 'Days' },
    { key: 'hours', value: timeLeft.hours, prevValue: prevTimeLeft.hours, label: 'Hours' },
    { key: 'minutes', value: timeLeft.minutes, prevValue: prevTimeLeft.minutes, label: 'Minutes' },
    { key: 'seconds', value: timeLeft.seconds, prevValue: prevTimeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-center text-lg sm:text-xl bg-gradient-brand bg-clip-text text-transparent font-bold animate-slide-up">
        {Object.values(timeLeft).every(t => t === 0) ? 'Presale Ended' : 'Presale Ends In'}
      </h3>
      <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
        {timeUnits.map(({ key, value, prevValue, label }) => (
          <div key={key} className="text-center">
            <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24">
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-brand opacity-10 rounded-lg" />
              
              {/* Main card */}
              <div className="absolute inset-0 bg-[#1a1b1e]/80 backdrop-blur-sm rounded-lg border border-brand-blue/10 overflow-hidden">
                {/* Number container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Previous number (sliding up) */}
                  <div
                    className={`absolute w-full text-center transition-transform duration-500 ${
                      value !== prevValue ? 'animate-slide-up-out' : ''
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                      {String(prevValue).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Current number (sliding up) */}
                  <div
                    className={`absolute w-full text-center transition-transform duration-500 ${
                      value !== prevValue ? 'animate-slide-up-in' : ''
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-20" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-brand opacity-20" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-brand opacity-20" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-brand opacity-20" />
              </div>
            </div>

            {/* Label */}
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-400 tracking-wider uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}