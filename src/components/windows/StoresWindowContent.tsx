import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/CTAButton';
import StoresLogo from '@/assets/logo-stores.svg';
import StoresVideoWg from '@/assets/video-stores-wg.mp4';
import StoresVideoRuby from '@/assets/video-stores-ruby.mp4';
import StoresImageRuby from '@/assets/img-stores-ruby.png';
import StoresImageWg from '@/assets/img-stores-wg.png';

const StoresWindowContent = () => {
  const { t } = useTranslation();

  return (
    <div className="window-content">
      <div className="window-content-inner">
        {/* header */}
        <div className="window-content__header">
          <h2>
            <img src={StoresLogo} alt="stores logo" />
          </h2>
          <div className="window-content__header-info">
            <div>
              <span className="text-theme">date</span>
              <p className="text-primary">{t('stores.date')}</p>
            </div>
            <div>
              <span className="text-theme">position</span>
              <p className="text-primary">UI/UX Designer</p>
            </div>
          </div>
        </div>
        <hr className="mb-large" />
        {/* contents */}
        <article className="window-content__body">
          <section className="window-content__single mb-large">
            <div className="mb-large">
              {(t('stores.intro', { returnObjects: true }) as string[]).map(
                (line, i) => (
                  <p key={i} className="text-primary mb-small">
                    {line}
                  </p>
                )
              )}
            </div>
            <div className="mb-small">
              <h3 className="window-content__title mb-medium">
                {t('stores.whiteGallery.title')}
              </h3>
              {(
                t('stores.whiteGallery.description', {
                  returnObjects: true,
                }) as string[]
              ).map((line, i) => (
                <p key={i} className="text-primary mb-small content-list">
                  {line}
                </p>
              ))}
            </div>
            <div className="content-image mb-medium">
              <img src={StoresImageWg} alt="WhiteGallery" />
            </div>
            <div className="content-video">
              <video
                src={StoresVideoWg}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"></video>
            </div>
          </section>
          <section className="window-content__single mb-large">
            <div className="mb-small">
              <h3 className="window-content__title mb-medium">
                {t('stores.rubykaigi.title')}
              </h3>
              {(
                t('stores.rubykaigi.description', {
                  returnObjects: true,
                }) as string[]
              ).map((line, i) => (
                <p key={i} className="text-primary mb-small content-list">
                  {line}
                </p>
              ))}
            </div>
            <div className="content-image mb-medium">
              <img src={StoresImageRuby} alt="RubyKaigi 2019" />
            </div>
            <div className="content-video mb-medium">
              <video
                src={StoresVideoRuby}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"></video>
            </div>
            <div className="m-center">
              <CTAButton
                href="https://heiseirb.github.io/kaigi01/"
                label={t('stores.cta')}
              />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default StoresWindowContent;
