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

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <a className="text-theme" href="/">
            uryu myao
          </a>
        </div>

        <div className="nav-menu">
          <button className="nav-menu-link text-en">menu</button>
          <section className="nav-menu-pulldown">
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
          <button>{/* <img src={} alt="Toggle Fullscreen" /> */}</button>
        </div>

        <Time />
      </div>
    </nav>
  );
};

export default Nav;
