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
  zOrders: string[];
  setZOrders: React.Dispatch<React.SetStateAction<string[]>>;
}

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
            key={win.id}
            style={{ position: 'absolute', zIndex }}
            onMouseDown={() => bringToFront(win.id)}>
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
