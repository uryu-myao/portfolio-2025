import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import CloseIcon from '@/assets/icon-close.svg';
import FullscreenIcon from '@/assets/icon-zoom.svg';

import '@/styles/components/window.scss';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialX: number;
  initialY: number;
}

const Window: React.FC<WindowProps> = ({
  title,
  onClose,
  children,
  initialX,
  initialY,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [animateOut, setAnimateOut] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const node = nodeRef.current;
    const timer = setTimeout(() => node.classList.remove('animate-in'), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => onClose(), 200); // 动画结束再真正关闭
  };

  return (
    <Draggable
      handle=".window-header"
      nodeRef={nodeRef}
      disabled={isFullscreen}
      position={isFullscreen ? undefined : position}
      onStop={(_, data) => {
        if (!isFullscreen) {
          setPosition({ x: data.x, y: data.y });
        }
      }}>
      <div
        ref={nodeRef}
        className={`window-inner ${isFullscreen ? 'fullscreen' : ''} ${
          animateOut ? 'animate-out' : ''
        }`}
        style={isFullscreen ? { position: 'fixed' } : {}}>
        <header className="window-header">
          <h4 className="window-header__ttl">{title}</h4>
          <div className="window-header__buttons">
            <button className="window-header__close" onClick={handleClose}>
              <img src={CloseIcon} alt="Close" />
            </button>
            <button
              className="window-header__full"
              onClick={() => setIsFullscreen(!isFullscreen)}>
              <img src={FullscreenIcon} alt="Toggle Fullscreen" />
            </button>
          </div>
        </header>
        <div className="window-body">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
