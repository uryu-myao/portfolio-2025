import { useState, useRef } from 'react';
import { useLike } from '@/hooks/useLike';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import '@/styles/components/sayhi.scss';
import SayHiIconSVG from '@/components/svg/SayHiIconSVG';

const SayHi = () => {
  const { likeCount, handleLike, hasReachedLimit, lastVisitor } = useLike();
  const [showPlusOne, setShowPlusOne] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  useMagneticHover(btnRef, 0.25); // 调整 strength 参数以匹配你的视觉喜好

  const handleClickLike = async () => {
    if (hasReachedLimit) return;

    await handleLike();
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 600);
  };

  return (
    <div className="sayhi">
      <button
        ref={btnRef}
        className="sayhi-btn"
        onClick={handleClickLike}
        disabled={hasReachedLimit}>
        <span className="sayhi-icon">
          <SayHiIconSVG />
        </span>
        <p className="text-theme sayhi-number">
          {likeCount === null ? '-' : likeCount}
        </p>
        {showPlusOne && <span className="plus-one text-theme">+1</span>}
      </button>

      <p className="text-en sayhi-location">
        {lastVisitor
          ? `Last visit from ${lastVisitor.city}, ${lastVisitor.country}`
          : 'Welcome!'}
      </p>
    </div>
  );
};

export default SayHi;
