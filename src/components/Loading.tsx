// src/components/LoadingScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '@/styles/main.scss';

interface LoadingScreenProps {
  onComplete: () => void;
}

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
    <div className="loading-wrapper">
      <div className="loading-window">
        <div className="loading-header">
          <span className="loading-date">
            &lt;date&gt; February–June, 2025 &lt;/date&gt;
          </span>
          <button className="close-btn">✕</button>
        </div>
        <div className="loading-content">
          <div className="loading-box">
            <div className="loading-icon">➡️</div>
            <span className="loading-text">INITIALIZING...</span>
            <span className="loading-percent">{progress}%</span>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
