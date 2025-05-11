// src/components/WindowManager.tsx
import { useState } from 'react';
import Window from './Window';

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  initialX: number;
  initialY: number;
}

interface WindowManagerProps {
  openWindows: WindowData[];
  onCloseWindow: (id: string) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  openWindows,
  onCloseWindow,
}) => {
  const [zOrders, setZOrders] = useState<string[]>([]); // 控制叠层顺序

  const bringToFront = (id: string) => {
    setZOrders((prev) => [...prev.filter((w) => w !== id), id]);
  };

  return (
    <>
      {openWindows.map((win) => {
        const zIndex = 100 + zOrders.indexOf(win.id); // zIndex 从 100 开始
        return (
          <div
            key={win.id}
            style={{ position: 'absolute', zIndex }}
            onMouseDown={() => bringToFront(win.id)}>
            <Window
              key={win.id}
              title={win.title}
              onClose={() => onCloseWindow(win.id)}
              initialX={win.initialX}
              initialY={win.initialY}>
              {win.content}
            </Window>
          </div>
        );
      })}
    </>
  );
};

export default WindowManager;
