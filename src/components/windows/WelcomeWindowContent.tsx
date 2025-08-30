import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '@/styles/components/welcomeWindow.scss';

const WelcomeWindowContent = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { t } = useTranslation();

  const description = t('welcome.description', {
    returnObjects: true,
  }) as string[];

  return (
    <div className="welcome-body-inner">
      <div className="welcome-portrait">
        <div className="welcome-portrait-inner"></div>
      </div>
      <div className="welcome-title">
        <h1 className="welcome-title__name">{t('welcome.name')}</h1>
        <p className="text-en text-primary">{t('welcome.role')}</p>
      </div>
      <article>
        {Array.isArray(description) ? (
          description.map((line, i) => (
            <p key={i} className="text-primary">
              {line}
            </p>
          ))
        ) : (
          <p className="text-primary">{description}</p>
        )}
      </article>
      <p className="welcome-sub text-en text-xs">
        © {year} Uryu Myao. All rights reserved.
        <br />
        Developed by {''}
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
