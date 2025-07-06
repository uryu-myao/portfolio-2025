import { useMemo } from 'react';
import ScrambleText from '@/components/ScrambleText';
import '@/styles/components/welcomeWindow.scss';

const WelcomeWindowContent = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="welcome-body-inner">
      <div className="welcome-portrait">
        <div className="welcome-portrait-inner"></div>
      </div>
      <div className="welcome-title">
        <h1 className="text-en">Uryu Myao</h1>
        <p className="text-en text-primary">UI/UX Designer</p>
      </div>
      <article>
        <p className="text-en text-primary">
          I create interactive websites, digital visuals, and brand experiences.
          I help growing teams bring ideas to life through thoughtful, modern
          design.
        </p>
        <p className="text-en text-primary">
          This interactive desktop is my portfolio. Click the icons to explore
          my work and interests.
        </p>
        <p className="text-en text-primary">
          Curious. Detail-driven. Always building.
        </p>
      </article>
      <p className="welcome-sub text-en text-xs">
        © {year} Uryu Myao. All rights reserved.
        <br />
        Developed by
        <a
          href="https://github.com/uryu-myao/portfolio-2025"
          target="_blank"
          rel="noreferrer">
          Uryu Myao
        </a>
      </p>
    </div>
  );
};

export default WelcomeWindowContent;
