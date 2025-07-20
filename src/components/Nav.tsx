import { useEffect, useRef, useState } from 'react';
import { getIcons } from '@/data/icons';
import type { NavProps } from '@/types';
import '@/styles/components/nav.scss';

import ThemeIconSVG from '@/components/svg/ThemeIconSVG';
import FullscreenIconSVG from '@/components/svg/FullscreenIconSVG';
import GithubIconSVG from '@/components/svg/GithubIconSVG';
import MailIconSVG from '@/components/svg/MailIconSVG';
import Time from '@/components/Time';

const Nav: React.FC<NavProps> = ({
  onToggleTheme,
  onOpenWindow,
  onProtectedOpenWindow,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenEnabled) return;
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
      doc.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // ✅ 监听 fullscreen 状态变化
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  // ✅ 点击非 menu 区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const icons = getIcons(onOpenWindow, onProtectedOpenWindow);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <a className="text-theme" href="/">
            uryu myao
          </a>
        </div>

        <div className="nav-menu" ref={menuRef}>
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
              <div>
                <h3 className="nav-menu-pulldown-ttl text-en">project log</h3>
                <ul className="nav-menu-pulldown-list">
                  {icons.map((icon) => (
                    <li
                      key={icon.id}
                      className="nav-menu-pulldown-item"
                      onClick={icon.onOpen}>
                      <span
                        className={`folder-icon__tag folder-icon__tag--${icon.variant} text-theme`}>
                        {icon.tagLabel}
                      </span>{' '}
                      <span className="text-en">{icon.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div>
                <h3 className="nav-menu-pulldown-ttl text-en">contact</h3>
                <div className="nav-menu-pulldown-list">
                  <a
                    className="nav-menu-pulldown-item text-en"
                    href="https://github.com/uryu-myao"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="nav-menu-pulldown-item-icon">
                      <GithubIconSVG />
                    </span>
                    github
                  </a>
                  <a
                    className="nav-menu-pulldown-item text-en"
                    href="mailto:myao.jpn@gmail.com?subject=Hi%2C%20I%27m%20interested%20in%20your%20portfolio"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="nav-menu-pulldown-item-icon">
                      <MailIconSVG />
                    </span>
                    e-mail
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="nav-icons">
          <button onClick={onToggleTheme}>
            <ThemeIconSVG className="nav-icons-theme" />
          </button>
          <button onClick={toggleFullscreen}>
            <FullscreenIconSVG
              className="nav-icons-fullscreen"
              isFullscreen={isFullscreen}
            />
          </button>
        </div>
        <Time />
      </div>
    </nav>
  );
};

export default Nav;
