import { useState } from 'react';
import { useLike } from '@/hooks/useLike';
// import { supabase } from '@/lib/supabase';
import '@/styles/components/sayhi.scss';
import SayHiIconSVG from '@/components/svg/SayHiIconSVG';

const SayHi = () => {
  const { likeCount, handleLike, hasReachedLimit } = useLike();
  const [showPlusOne, setShowPlusOne] = useState(false);

  const handleClickLike = async () => {
    if (hasReachedLimit) return;

    await handleLike(); // 调用 useLike hook 中的 handleLike
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 600);
  };

  return (
    <div className="sayhi">
      <button
        className="sayhi-btn"
        onClick={handleClickLike}
        disabled={hasReachedLimit}>
        <span className="sayhi-icon">
          <SayHiIconSVG />
        </span>
        <p className="text-theme sayhi-number">{likeCount}</p>
        {showPlusOne && <span className="plus-one text-theme">+1</span>}
      </button>
    </div>
  );
};

export default SayHi;
