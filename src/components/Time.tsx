import { useEffect, useState } from 'react';
import '@/styles/components/time.scss';

const Time = () => {
  const [timeData, setTimeData] = useState({ time: '', ampm: '' });

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;

      const hourStr = String(hours).padStart(2, '0');
      const time = `${hourStr}:${minutes}:${seconds}`;

      setTimeData({ time, ampm });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time">
      <p className="time-text">
        {timeData.time} <span className="time-text__ampm">{timeData.ampm}</span>
      </p>
    </div>
  );
};

export default Time;
