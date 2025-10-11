import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLike, MAX_LIKES } from '@/hooks/useLike';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import '@/styles/components/sayhi.scss';
import SayHiIconSVG from '@/components/svg/SayHiIconSVG';
import confetti from 'canvas-confetti';

const SayHi = () => {
  const { likeCount, userLikes, handleLike, hasReachedLimit, lastVisitor } =
    useLike();
  const [showPlusOne, setShowPlusOne] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  useMagneticHover(btnRef, 0.25);

  const handleClickLike = async () => {
    if (hasReachedLimit || likeCount === null || userLikes === null) return;

    const isFinalLike = userLikes + 1 === MAX_LIKES;

    await handleLike();
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 600);

    if (isFinalLike) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const { t } = useTranslation();

  return (
    <div className="sayhi">
      <button ref={btnRef} className="sayhi-btn" onClick={handleClickLike}>
        <span className="sayhi-icon">
          <SayHiIconSVG
            triggerAnimate={showPlusOne}
            isMaxed={hasReachedLimit}
          />
        </span>
        <p className="text-theme sayhi-number">
          {likeCount === null ? '-' : likeCount}
        </p>
        {showPlusOne && <span className="plus-one text-theme">+1</span>}
      </button>

      <p className="text-primary sayhi-location">
        {lastVisitor
          ? t('sayhi.lastVisit', {
              city: lastVisitor.city,
              country: lastVisitor.country,
            })
          : t('sayhi.welcome')}
      </p>
    </div>
  );
};

export default SayHi;
