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
  const nodeRef = useRef<HTMLDivElement>(null!); // ✅ 正确类型// 👈 创建 ref

  return (
    <Draggable
      handle=".window-title"
      disabled={isFullscreen}
      nodeRef={nodeRef}
      defaultPosition={{ x: initialX, y: initialY }} // ⬅️ 添加这行
    >
      <div
        ref={nodeRef} // 👈 将 ref 绑定到目标元素
        className={`window-wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
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
