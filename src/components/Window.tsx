import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
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
      handle=".window-title"
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
        <div className="window-title">
          <span className="window-title__text">{title}</span>
          <div className="window-title__buttons">
            <button onClick={onClose}>✕</button>
            <button onClick={() => setIsFullscreen(!isFullscreen)}>⛶</button>
          </div>
        </div>
        <div className="window-body">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
