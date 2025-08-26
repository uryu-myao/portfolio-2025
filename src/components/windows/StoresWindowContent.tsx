import CTAButton from '@/components/CTAButton';
import StoresLogo from '@/assets/logo-stores.svg';
import StoresVideoWg from '@/assets/video-stores-wg.mp4';
import StoresVideoRuby from '@/assets/video-stores-ruby.mp4';

const StoresWindowContent = () => {
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
            <h3 className="text-en window-content__ttl mb-medium">
              White Gallery Project
            </h3>
            <p className="text-en text-primary mb-medium">
              Hey, I‘m Uryu. I have a passion for helping build branding and
              design systems for companies. I integrate into company operations
              to advance digital transformation and enhance user engagement
              through forward-thinking digital experiences.
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
            <h3 className="text-en window-content__ttl mb-medium">
              Rubykaigi Landing Page
            </h3>
            <p className="text-en text-primary mb-medium">
              Hey, I‘m Uryu. I have a passion for helping build branding and
              design systems for companies. I integrate into company operations
              to advance digital transformation and enhance user engagement
              through forward-thinking digital experiences.
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
              label="Go to site"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresWindowContent;
