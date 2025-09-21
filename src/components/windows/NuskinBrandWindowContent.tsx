import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import NuskinLogoWhite from '@/assets/logo-nuskin-white.svg';
import NuskinLogoBlack from '@/assets/logo-nuskin-black.svg';

const NuskinBrandWindowContent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="window-content nuskin-content">
      <div className="window-content-inner">
        {/* header */}
        <div className="window-content__header">
          <h2>
            <img
              src={theme === 'dark' ? NuskinLogoWhite : NuskinLogoBlack}
              alt="Nuskin logo"
            />
          </h2>
          <div className="window-content__header-info">
            <div>
              <span className="text-theme">date</span>
              <p className="text-primary">{t('nuskin.date')}</p>
            </div>
            <div>
              <span className="text-theme">position</span>
              <p className="text-primary">
                UI/UX Designer
                <br />
                Digital Contents Creater
              </p>
            </div>
          </div>
        </div>
        <hr className="mb-large" />
        {/* contents */}
        <article className="window-content__body">
          <section className="window-content__single mb-medium"></section>
        </article>
      </div>
    </div>
  );
};

export default NuskinBrandWindowContent;
