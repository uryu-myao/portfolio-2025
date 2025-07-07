import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { NavProps } from '@/types';
import Time from '@/components/Time';
import '@/styles/components/nav.scss';

// import NavIconHome from '@/assets/nav-icon-home.svg';
// import NavIconPhoto from '@/assets/nav-icon-photo.svg';
import NavIconGithub from '@/assets/nav-icon-github.svg';
import NavIconMail from '@/assets/nav-icon-mail.svg';
import NavIconTheme from '@/assets/nav-icon-theme.svg';

const Nav: React.FC<NavProps> = () => {
  const { toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenEnabled) {
      console.warn('Fullscreen mode is not supported by this browser.');
      return;
    }
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      doc.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <a className="text-theme" href="/">
            uryu myao
          </a>
        </div>
        <div className="nav-menu">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="nav-menu-link text-en">
            menu
          </button>
          <section
            className={
              isMenuOpen ? 'nav-menu-pulldown' : 'nav-menu-pulldown hidden'
            }>
            <div className="nav-menu-pulldown-inner">
              <div className="text-en">
                <h3 className="nav-menu-pulldown-ttl text-en">project log</h3>
                <ul className="nav-menu-pulldown-list"></ul>
              </div>
              <div>
                <h3 className="nav-menu-pulldown-ttl text-en">contact</h3>
                <div className="nav-menu-pulldown-list">
                  <a
                    className="nav-menu-pulldown-item text-en"
                    href="https://github.com/uryu-myao"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={NavIconGithub} alt="" />
                    github
                  </a>
                  <a
                    className="nav-menu-pulldown-item text-en"
                    href="mailto:myao.jpn@gmail.com?subject=Hi%2C%20I%27m%20interested%20in%20your%20portfolio"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={NavIconMail} alt="" />
                    e-mail
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="nav-icons">
          <button onClick={toggleTheme}>
            <img
              className="nav-icons-theme"
              src={NavIconTheme}
              alt="Toggle Theme"
            />
          </button>
          <button onClick={toggleFullscreen}>
            <svg
              className="nav-icons-fullscreen"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none">
              <path d="M5.66667 1H1V5.66667" stroke="black" stroke-width="2" />
              <path
                d="M15 5.66667L15 1L10.3333 1"
                stroke="black"
                stroke-width="2"
              />
              <path
                d="M10.3333 15L15 15L15 10.3333"
                stroke="black"
                stroke-width="2"
              />
              <path
                d="M5.66667 15L1 15L1 10.3333"
                stroke="black"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
        <Time />
      </div>
    </nav>
  );
};

export default Nav;
