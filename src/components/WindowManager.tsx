import type { WindowManagerProps } from '@/types';
import Window from '@/components/Window';

const WindowManager: React.FC<WindowManagerProps> = ({
  openWindows,
  onCloseWindow,
  zOrders,
  setZOrders,
}) => {
  const bringToFront = (id: string) => {
    setZOrders((prev) => [...prev.filter((w) => w !== id), id]);
  };

  return (
    <>
      {openWindows.map((win) => {
        const zIndex = 100 + zOrders.indexOf(win.id);
        return (
          <div
            className="window-container"
            key={win.id}
            style={{ position: 'absolute', zIndex }}
            onMouseDownCapture={() => bringToFront(win.id)}>
            <Window
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
