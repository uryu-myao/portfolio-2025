import { useTheme } from '@/hooks/useTheme';
import type { NavProps } from '@/types';

import '@/styles/components/nav.scss';

import NavIconHome from '@/assets/nav-icon-home.svg';
import NavIconPhoto from '@/assets/nav-icon-photo.svg';
import NavIconGithub from '@/assets/nav-icon-github.svg';
import NavIconMail from '@/assets/nav-icon-mail.svg';
import NavIconTheme from '@/assets/nav-icon-theme.svg';

const Nav: React.FC<NavProps> = () => {
  const { toggleTheme } = useTheme();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-list">
          <div className="nav-item">
            <a href="/">
              <img src={NavIconHome} alt="Home" />
            </a>
          </div>
          <div className="nav-item">
            <a href="">
              <img src={NavIconPhoto} alt="Photo" />
            </a>
          </div>
          <hr />
          <div className="nav-item">
            <a
              href="https://github.com/uryu-myao"
              target="_blank"
              rel="noopener noreferrer">
              <img src={NavIconGithub} alt="Github" />
            </a>
          </div>
          <div className="nav-item">
            <a
              href="mailto:myao.jpn@gmail.com?subject=Hi%2C%20I%27m%20interested%20in%20your%20portfolio"
              target="_blank"
              rel="noopener noreferrer">
              <img src={NavIconMail} alt="Mail" />
            </a>
          </div>
          <hr />
          <div className="nav-item">
            <button onClick={toggleTheme}>
              <img src={NavIconTheme} alt="Toggle Theme" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
