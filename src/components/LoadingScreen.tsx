// src/components/LoadingScreen.tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { LoadingScreenProps } from '@/types';
import '@/styles/components/loading.scss';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        const p = Math.round((tl.progress() || 0) * 100);
        setProgress(p > 100 ? 100 : p);
      },
      onComplete: () => {
        onComplete(); // ⬅️ 通知父组件加载完成
      },
    });

    barRefs.current = barRefs.current.slice(0, 15);
    barRefs.current.forEach((bar, i) => {
      tl.to(bar, { backgroundColor: '#4fc3f7', duration: 0.15 }, i * 0.08);
    });
  }, [onComplete]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <p className="loading-text text-en">initializing...</p>
        <div className="progress-bar">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="bar"
              ref={(el) => {
                if (el) barRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        <p className="loading-percent text-theme">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
