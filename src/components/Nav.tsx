import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getIcons } from '@/data/icons';
import type { NavProps } from '@/types';
import '@/styles/components/nav.scss';
import GithubIconSVG from '@/components/svg/GithubIconSVG';
import LinkedinIconSVG from '@/components/svg/LinkedinIconSVG';
import MailIconSVG from '@/components/svg/MailIconSVG';
import ThemeIconSVG from '@/components/svg/ThemeIconSVG';
import Time from '@/components/Time';

const Nav: React.FC<NavProps> = ({
  onToggleTheme,
  onOpenWindow,
  onProtectedOpenWindow,
}) => {
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { i18n, t } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferred-lang', newLang);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isWorksOpen &&
        worksRef.current &&
        !worksRef.current.contains(event.target as Node)
      ) {
        setIsWorksOpen(false);
      }
      if (
        isContactOpen &&
        contactRef.current &&
        !contactRef.current.contains(event.target as Node)
      ) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWorksOpen, isContactOpen]);

  const icons = getIcons(onOpenWindow, onProtectedOpenWindow, t);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <button
            className="text-theme"
            onClick={() => onOpenWindow('welcome')}>
            <span className="__pc">uryu myao</span>
            <span className="__sp">u.m</span>
          </button>
        </div>

        <div className="nav-menus">
          <div className="nav-menu" ref={worksRef}>
            <button
              onClick={() => {
                setIsWorksOpen((prev) => !prev);
                setIsContactOpen(false);
              }}
              className="nav-menu-link text-en">
              Works
            </button>
            <section
              className={
                isWorksOpen ? 'nav-menu-pulldown' : 'nav-menu-pulldown hidden'
              }>
              <div className="nav-menu-pulldown-inner">
                <ul className="nav-menu-pulldown-list">
                  {icons.map((icon) => (
                    <li
                      key={icon.id}
                      className="nav-menu-pulldown-item"
                      onClick={() => {
                        icon.onOpen();
                        setIsWorksOpen(false);
                      }}>
                      <span
                        className={`folder-icon__tag folder-icon__tag--${icon.variant} text-theme`}>
                        {icon.tagLabel}
                      </span>{' '}
                      <span className="nav-menu-pulldown__title">
                        {icon.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="nav-menu" ref={contactRef}>
            <button
              onClick={() => {
                setIsContactOpen((prev) => !prev);
                setIsWorksOpen(false);
              }}
              className="nav-menu-link text-en">
              Contact
            </button>
            <section
              className={
                isContactOpen
                  ? 'nav-menu-pulldown'
                  : 'nav-menu-pulldown hidden'
              }>
              <div className="nav-menu-pulldown-inner">
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
                    href="https://www.linkedin.com/in/uryu-myao/"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="nav-menu-pulldown-item-icon">
                      <LinkedinIconSVG />
                    </span>
                    LinkedIn
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
            </section>
          </div>
        </div>

        <div className="nav-icons">
          <button onClick={toggleLanguage} className="nav-icon nav-icons-lang">
            {i18n.language === 'ja' ? 'EN' : 'JA'}
          </button>
          <button onClick={onToggleTheme} className="nav-icon nav-icons-theme">
            <ThemeIconSVG />
          </button>
        </div>
        <Time />
      </div>
    </nav>
  );
};

export default Nav;
