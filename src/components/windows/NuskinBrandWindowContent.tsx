import { useTheme } from '@/hooks/useTheme';
import useIsMobile from '@/hooks/useIsMobile';
import { useTranslation, Trans } from 'react-i18next';
import CTAButton from '@/components/CTAButton';
import NuskinLogoWhite from '@/assets/logo-nuskin-white.svg';
import NuskinLogoBlack from '@/assets/logo-nuskin-black.svg';
import NuskinBrandPDF from '@/assets/pdf-nuskn-brand.pdf';
import NuskinImageBrandBefore from '@/assets/img-nuskin-brand-before.png';
import NuskinImageBrandBeforeSP from '@/assets/img-nuskin-brand-before-sp.png';
import NuskinImageBrandAfter from '@/assets/img-nuskin-brand-after.png';
import NuskinImageBrandAfterSP from '@/assets/img-nuskin-brand-after-sp.png';
import NuskinImageCSR from '@/assets/img-nuskin-csr.jpg';

const NuskinBrandWindowContent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

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
                Digital Contents Creator
              </p>
            </div>
          </div>
        </div>
        <hr className="mb-large" />
        {/* contents */}
        <article className="window-content__body">
          <section className="window-content__single mb-medium">
            <h3 className="window-content__title mb-medium" data-num="1">
              {t('nuskin.brand.title')}
            </h3>
            {/* 1 背景 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.brand.bg-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.brand.bg-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary">
                  <Trans
                    i18nKey={`nuskin.brand.bg-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            <div className="mb-small">
              {(
                t('nuskin.brand.bg-list', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list">
                  <Trans
                    i18nKey={`nuskin.brand.bg-list.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            {isMobile ? (
              <div className="content-image mb-small nuskin-brand__img __before">
                <img src={NuskinImageBrandBeforeSP} alt="Nuskin Brand Before" />
              </div>
            ) : (
              <div className="content-image mb-small nuskin-brand__img __before">
                <img src={NuskinImageBrandBefore} alt="Nuskin Brand Before" />
              </div>
            )}
            ;
            {isMobile ? (
              <div className="content-image mb-medium nuskin-brand__img __after">
                <img src={NuskinImageBrandAfterSP} alt="Nuskin Brand After" />
              </div>
            ) : (
              <div className="content-image mb-medium nuskin-brand__img __after">
                <img src={NuskinImageBrandAfter} alt="Nuskin Brand After" />
              </div>
            )}
            ;{/* 1 担当役割 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.brand.position-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.brand.position-text', {
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
                {t('nuskin.brand.solution-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.brand.solution-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.brand.solution-text.${i}`}
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
                {t('nuskin.brand.achievement-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.brand.achievement-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.brand.achievement-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            {isMobile ? (
              <div className="m-center">
                <CTAButton
                  href="/assets/pdf-nuskn-brand.pdf"
                  label={t('nuskin.brand.cta')}
                />
              </div>
            ) : (
              <div className="mb-large iframe-pdf__container">
                <iframe
                  src={NuskinBrandPDF}
                  width="100%"
                  height="380px"
                  style={{ border: 'none' }}></iframe>
              </div>
            )}
            ;
          </section>

          <hr className="mb-large" />

          <section className="window-content__single mb-large">
            <h3 className="window-content__title mb-medium" data-num="2">
              {t('nuskin.csr.title')}
            </h3>
            {/* 2 背景 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.csr.bg-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.csr.bg-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary">
                  <Trans
                    i18nKey={`nuskin.csr.bg-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            <div className="content-image mb-medium">
              <img src={NuskinImageCSR} alt="Nuskin CSR" />
            </div>

            {/* 2 担当役割 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.csr.position-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.csr.position-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list">
                  <Trans
                    i18nKey={`nuskin.csr.position-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 2 制作上の課題と問題解決 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.csr.solution-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.csr.solution-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.csr.solution-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 2 主な成果 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.csr.achievement-title')}
              </h4>
            </div>
            <div className="mb-small">
              {(
                t('nuskin.csr.achievement-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.csr.achievement-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>
            <div className="m-center">
              <CTAButton
                href="https://www.nuskincsr.jp/"
                label={t('nuskin.csr.cta')}
              />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default NuskinBrandWindowContent;
