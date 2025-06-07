import { useState, useRef } from 'react';
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
  const nodeRef = useRef<HTMLDivElement>(null!);

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
        className={`window-wrapper ${isFullscreen ? 'fullscreen' : ''}`}
        style={isFullscreen ? { position: 'fixed' } : {}}>
        <header className="window-header">
          <h4 className="window-header__ttl">{title}</h4>
          <div className="window-header__buttons">
            <button className="window-header__close" onClick={onClose}>
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
