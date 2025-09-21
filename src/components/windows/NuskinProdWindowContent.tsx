import { useTranslation, Trans } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import CTAButton from '@/components/CTAButton';
import NuskinImageProductsTrme from '@/assets/img-nuskin-products-trme.png';
import NuskinImageProductsWellspa from '@/assets/img-nuskin-products-wellspa.png';
import NuskinLogoWhite from '@/assets/logo-nuskin-white.svg';
import NuskinLogoBlack from '@/assets/logo-nuskin-black.svg';

const NuskinProdWindowContent = () => {
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
            {/* 背景と目的 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.products.bg-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.products.bg-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.products.bg-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 担当役割 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.products.position-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.products.position-text', {
                  returnObjects: true,
                }) as string[]
              ).map((line, i) => (
                <p key={i} className="text-primary content-list">
                  {line}
                </p>
              ))}
            </div>

            {/* 制作上の課題と問題解決 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.products.solution-title')}
              </h4>
            </div>
            <div className="mb-medium">
              {(
                t('nuskin.products.solution-text', {
                  returnObjects: true,
                }) as string[]
              ).map((_, i) => (
                <p key={i} className="text-primary content-list mb-small">
                  <Trans
                    i18nKey={`nuskin.products.solution-text.${i}`}
                    components={{
                      strong: <strong />,
                      mark: <mark />,
                    }}
                  />
                </p>
              ))}
            </div>

            {/* 主な成果 */}
            <div className="m-center mb-small">
              <h4 className="window-content__subtitle">
                {t('nuskin.products.achievement-title')}
              </h4>
            </div>
            <div className="content-image mb-small">
              <img src={NuskinImageProductsTrme} alt="Nuskin TRME" />
            </div>
            <div className="mb-small">
              <p className="text-primary content-list mb-small">
                <Trans
                  i18nKey={'nuskin.products.achievement-text.0'}
                  components={{
                    strong: <strong />,
                    mark: <mark />,
                  }}
                />
              </p>
            </div>
            <div className="m-center mb-large">
              <CTAButton
                href="https://www.nuskin.com/content/markets/ja_JP/home/updates_info/product_info_top/trme.html"
                label={t('nuskin.products.cta')}
              />
            </div>
            <div className="content-image mb-small">
              <img src={NuskinImageProductsWellspa} alt="Nuskin Wellspa iO" />
            </div>
            <div className="mb-small">
              <p className="text-primary content-list mb-small">
                <Trans
                  i18nKey={'nuskin.products.achievement-text.1'}
                  components={{
                    strong: <strong />,
                    mark: <mark />,
                  }}
                />
              </p>
            </div>
            <div className="m-center mb-medium">
              <CTAButton
                href="https://www.nuskin.com/markets/ja_JP/home/updates_info/product_info_top/ageloc-wellspa-io.html"
                label={t('nuskin.products.cta')}
              />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default NuskinProdWindowContent;
