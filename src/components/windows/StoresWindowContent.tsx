import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/CTAButton';
import StoresLogo from '@/assets/logo-stores.svg';
import StoresVideoWg from '@/assets/video-stores-wg.mp4';
import StoresVideoRuby from '@/assets/video-stores-ruby.mp4';

const StoresWindowContent = () => {
  const { t } = useTranslation();

  return (
    <div className="window-content">
      <div className="window-content-inner">
        <div className="window-content__header">
          <h2>
            <img src={StoresLogo} alt="stores logo" />
          </h2>
          <p className="text-en text-date">2019.02 - 2019.12</p>
        </div>
        <hr className="mb-large" />
        <div className="window-content__single mb-large">
          <div>
            <h3 className="window-content__title mb-medium">
              {t('stores.whiteGallery.title')}
            </h3>
            <p className="text-primary mb-medium">
              {t('stores.whiteGallery.description')}
            </p>
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
        </div>
        <div className="window-content__single mb-large">
          <div>
            <h3 className="window-content__title mb-medium">
              {t('stores.rubykaigi.title')}
            </h3>
            <p className="text-primary mb-medium">
              {t('stores.rubykaigi.description')}
            </p>
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
              href="https://github.com/?locale=ja"
              label={t('stores.cta')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresWindowContent;
