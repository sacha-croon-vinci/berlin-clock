import React, {useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

import { BerlinClock } from './Berlin-clock';

const BerlinClockUI = () => {
  const [time, setTime] = useState(null);
  const clock = new BerlinClock();
  const [digitalTime, setDigitalTime] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const currentTime = clock.convertAll();
      setDigitalTime(clock.convertTimestamp);
      setTime(currentTime)
    };

    updateTime()
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderSeconds = (toggleLight) => {
    return (
      <div className="flex justify-center mb-4">
        <div 
          className={`w-16 h-16 rounded-full border-4 ${
           toggleLight ? 'bg-yellow-400' : 'bg-gray-300'
          }`}
        />
      </div>
    );
  }

  const renderHourBlock = (blocks5, blocks1) => {
      return (
        <>
          <div className="flex gap-2 mb-2">
            {Array.from({ length: clock.HOURS_TOP_ROW }).map((_, i) => (
              <div
                key={`hour5-${i}`}
                className={`w-24 h-8 rounded ${
                  i < blocks5 ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: clock.HOURS_BOTTOM_ROW }).map((_, i) => (
              <div
                key={`hour1-${i}`}
                className={`w-24 h-8 rounded ${
                  i < blocks1 ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      );
  };

  const renderMinutesBlock = (blocks5, blocks1) => {
    return (
      <>
        <div className="flex gap-2 mb-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={`min5-${i}`}
              className={`w-12 h-8 rounded ${
                i < blocks5
                  ? (i + 1) % 3 === 0
                    ? 'bg-red-600'
                    : 'bg-yellow-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`min1-${i}`}
              className={`w-24 h-8 rounded ${
                i < blocks1 ? 'bg-yellow-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </>
    );
  }
  
  if (!time) return <img src="../assets/loading.svg" alt="loading" />;

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg'>
        <div className='flex items-center justify-center mb-6'>
          <Clock className='w-8 h-8 mr-2 text-gray-600'/>
          <h1 className='text-2xl font-bold text-gray-800'>Berlin Clock</h1>
        </div>

        {renderSeconds(time.toggleLight)}
        {renderHourBlock(time.hoursBlock5, time.hoursBlock1)}
        {renderMinutesBlock(time.minutesBlock5, time.minutesBlock1)}
        <div className="mt-6 text-center text-xl font-mono">
          {digitalTime.hours} : {digitalTime.minutes} : {digitalTime.seconds}
        </div>
    </div>
  );
};

export default BerlinClockUI;
