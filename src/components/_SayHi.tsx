import { useEffect, useState } from 'react';
import '@/styles/components/sayhi.scss';
import SayHiIconSVG from '@/components/svg/SayHiIconSVG';

interface LocationInfo {
  city: string;
  country: string;
}

const MAX_LIKES_PER_USER = 5;

const SayHi = () => {
  const [lastVisitor, setLastVisitor] = useState<LocationInfo | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userLikes, setUserLikes] = useState<number>(0);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  // 获取位置信息 & 读取上一个访客
  useEffect(() => {
    const getLocation = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();

        if (data.success) {
          const currentVisitor: LocationInfo = {
            city: data.city,
            country: data.country,
          };

          // 获取上一个访客
          const prev = localStorage.getItem('lastVisitor');
          if (prev) {
            setLastVisitor(JSON.parse(prev));
          }

          localStorage.setItem('lastVisitor', JSON.stringify(currentVisitor));

          // 获取该用户点赞次数
          const likeKey = `likes-${data.ip}`;
          const storedLikes = parseInt(localStorage.getItem(likeKey) || '0');
          setUserLikes(storedLikes);

          // 总点赞数（可选：你也可以用服务器获取）
          const storedCount = parseInt(
            localStorage.getItem('likeCount') || '0'
          );
          setLikeCount(storedCount);
        }
      } catch (err) {
        console.error('Failed to fetch location or IP info', err);
      }
    };

    getLocation();
  }, []);

  const handleLike = () => {
    if (userLikes >= MAX_LIKES_PER_USER) return;

    const newLikes = userLikes + 1;
    const newCount = likeCount + 1;

    setUserLikes(newLikes);
    setLikeCount(newCount);
    setShowPlusOne(true); // 👈 开始显示动画
    setTimeout(() => setShowPlusOne(false), 600); // 👈 动画结束后移除

    localStorage.setItem('likeCount', newCount.toString());

    fetch('https://ipwho.is/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const likeKey = `likes-${data.ip}`;
          localStorage.setItem(likeKey, newLikes.toString());
        }
      });
    setAnimateIcon(true);
    setTimeout(() => setAnimateIcon(false), 500); // 重置回原状态
  };

  const clearLikes = async () => {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();

    if (data.success) {
      const likeKey = `likes-${data.ip}`;
      localStorage.removeItem(likeKey);
      localStorage.removeItem('likeCount');
      localStorage.removeItem('lastVisitor');
      window.location.reload(); // 刷新页面更新状态
    }
  };

  return (
    <div className="sayhi">
      <button
        className="sayhi-btn"
        onClick={handleLike}
        disabled={userLikes >= MAX_LIKES_PER_USER}
        title={
          userLikes >= MAX_LIKES_PER_USER
            ? 'You have reached the max likes (5)'
            : 'Give me a like!'
        }>
        <span className="sayhi-icon">
          <SayHiIconSVG triggerAnimate={animateIcon} />
        </span>
        <p className="text-theme sayhi-number">{likeCount}</p>

        {/* 👇 +1 动效元素 */}
        {showPlusOne && <span className="plus-one text-theme">+1</span>}
      </button>

      <p className="text-en sayhi-location">
        {lastVisitor
          ? `Last visit from ${lastVisitor.city}, ${lastVisitor.country}`
          : 'Welcome!'}
      </p>

      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={clearLikes}
          className="sayhi-clear-btn"
          style={{
            marginLeft: '1rem',
            fontSize: '1rem',
            opacity: 0.6,
            border: '1px dashed gray',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
          }}>
          Clear local like data (dev only)
        </button>
      )}
    </div>
  );
};

export default SayHi;
