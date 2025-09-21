import { useTranslation, Trans } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import HoverVideo from '@/components/HoverVideo';
import NuskinLogoWhite from '@/assets/logo-nuskin-white.svg';
import NuskinLogoBlack from '@/assets/logo-nuskin-black.svg';
import NuskinImageWeb01 from '@/assets/img-nuskin-gl01.png';
import NuskinImageWeb02 from '@/assets/img-nuskin-gl02.png';
import NuskinImageGlWeb01 from '@/assets/video-gl-web01.mp4';
import NuskinImageGlWeb02 from '@/assets/video-gl-web02.mp4';
import NuskinVideoGlOffice from '@/assets/video-gl-office.mp4';
import NuskinVideoAchieve01 from '@/assets/video-nuskin-achieve01.mp4';
import NuskinVideoAchieve02 from '@/assets/video-nuskin-achieve02.mp4';
import NuskinVideoAchieve03 from '@/assets/video-nuskin-achieve03.mp4';
import NuskinVideoAchieve04 from '@/assets/video-nuskin-achieve04.mp4';
import '@/styles/components/HoverVideo.scss';

const NuskinWebWindowContent = () => {
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
          <section className="window-content__single mb-medium">
            <h3 className="window-content__title mb-medium" data-num="1">
              {t('nuskin.web.title')}
            </h3>

            {/* 1 背景 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.web.bg-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.web.bg-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.web.bg-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            <div className="content-image mb-medium">
              <img src={NuskinImageWeb01} alt="Nuskin Guideline Sprint01" />
              <img src={NuskinImageWeb02} alt="Nuskin Guideline Sprint02" />
            </div>

            {/* 1 担当役割 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.web.position-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.web.position-text', {
                  returnObjects: true,
                }) as string[]
              ).map((line, i) => (
                <p key={i} className="text-primary content-list">
                  {line}
                </p>
              ))}
            </div>

            {/* 1 制作上の課題と問題解決 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.web.solution-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.web.solution-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.web.solution-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 1 主な成果 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.web.achievement-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.web.achievement-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.web.achievement-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
              <div className="mb-medium">
                <div className="content-video">
                  <video
                    src={NuskinImageGlWeb01}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"></video>
                </div>
                <p className="content-video-caption">
                  {t('nuskin.web.video-caption.0')}
                </p>
              </div>
              <div className="mb-medium">
                <div className="content-video">
                  <video
                    src={NuskinImageGlWeb02}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"></video>
                </div>
                <p className="content-video-caption">
                  {t('nuskin.web.video-caption.1')}
                </p>
              </div>
              <div className="mb-medium">
                <div className="content-video">
                  <video
                    src={NuskinVideoGlOffice}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"></video>
                </div>
                <p className="content-video-caption">
                  {t('nuskin.web.video-caption.2')}
                </p>
              </div>

              <div>
                <p className="text-primary t-center mb-small">
                  <strong>{t('nuskin.web.achievement-case-title')}</strong>
                </p>
                <ul className="hover-video">
                  <HoverVideo
                    href="https://www.nuskin.com/markets/ja_JP/company/about-nu-skin.html"
                    text={t('nuskin.web.achievement-case.0')}
                    tag={t('nuskin.web.achievement-tag')}
                    videoSrc={NuskinVideoAchieve01}
                  />
                  <HoverVideo
                    href="https://www.nuskin.com/markets/ja_JP/company/about-nu-skin.html"
                    text={t('nuskin.web.achievement-case.1')}
                    tag={t('nuskin.web.achievement-tag')}
                    videoSrc={NuskinVideoAchieve02}
                  />
                  <HoverVideo
                    href="https://www.nuskin.com/markets/ja_JP/company/about-nu-skin.html"
                    text={t('nuskin.web.achievement-case.2')}
                    tag={t('nuskin.web.achievement-tag')}
                    videoSrc={NuskinVideoAchieve03}
                  />
                  <HoverVideo
                    href="https://www.nuskin.com/markets/ja_JP/company/about-nu-skin.html"
                    text={t('nuskin.web.achievement-case.3')}
                    tag={t('nuskin.web.achievement-tag')}
                    videoSrc={NuskinVideoAchieve04}
                  />
                </ul>
              </div>
            </div>
          </section>

          <hr className="mb-large" />

          <section className="window-content__single mb-large">
            <h3 className="window-content__title mb-medium" data-num="2">
              {t('nuskin.tool.title')}
            </h3>

            {/* 2 背景 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.tool.bg-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.tool.bg-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.tool.bg-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 2 担当役割 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.tool.position-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.tool.position-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.tool.position-text.${i}`}
                    components={{
                      strong: <strong />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 2 制作上の課題と問題解決 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.tool.solution-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.tool.solution-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.tool.solution-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default NuskinWebWindowContent;
