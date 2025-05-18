import { useState } from 'react';
// components
import Time from '@/components/Time';
import Footer from '@/components/Footer';
import WindowManager from '@/components/WindowManager';
import FolderIconList from '@/components/FolderIconList';
import InfoIcon from '@/components/InfoIcon';
import CanvasGridBackground from '@/components/CanvasGridBackground';
// icons
import FolderIconImage from '@/assets/folderIcon-nuskin.svg';

type WindowData = {
  id: string;
  title: string;
  content: React.ReactNode;
  initialX: number;
  initialY: number;
};

const Home = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([
    {
      id: 'welcome',
      title: 'Welcome',
      content: (
        <div>
          <h2>Welcome 👋</h2>
          <p>
            This portfolio simulates a desktop OS to showcase selected projects.
          </p>
          <p>Click icons to open windows. Enjoy exploring!</p>
        </div>
      ),
      initialX: 20,
      initialY: 20,
    },
  ]);

  const [zOrders, setZOrders] = useState<string[]>(['welcome']);

  const handleOpenWindow = (
    id: string,
    title: string,
    content: React.ReactNode,
    useFixedPosition = false
  ) => {
    setOpenWindows((prev) => {
      if (prev.some((w) => w.id === id)) return prev;

      const offset = 20;
      const baseX = 100;
      const baseY = 100;
      const newIndex = prev.length;

      const position = useFixedPosition
        ? { initialX: 20, initialY: 20 }
        : {
            initialX: baseX + newIndex * offset,
            initialY: baseY + newIndex * offset,
          };

      return [...prev, { id, title, content, ...position }];
    });

    // ➕ 保证新窗口 zIndex 在最顶层
    setZOrders((prev) => [...prev.filter((z) => z !== id), id]);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setZOrders((prev) => prev.filter((z) => z !== id));
  };

  const icons = [
    {
      id: 'nuskin-1',
      icon: FolderIconImage,
      label: 'Nuskin\nWeb Guideline',
      onOpen: () =>
        handleOpenWindow(
          'nuskin-1',
          'Nuskin Project',
          <p>This is the window content for Nuskin Project 1.</p>
        ),
    },
    {
      id: 'nuskin-2',
      icon: FolderIconImage,
      label: 'Nuskin\nWeb Guideline',
      onOpen: () =>
        handleOpenWindow(
          'nuskin-2',
          'Nuskin Project 2',
          <div>This is the window content for Nuskin Project 2.</div>
        ),
    },
  ];

  return (
    <main className="home">
      <div className="home-inner">
        <Time />
        <FolderIconList icons={icons} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={handleCloseWindow}
          zOrders={zOrders}
          setZOrders={setZOrders}
        />
        <Footer />
        <InfoIcon
          onOpen={() =>
            handleOpenWindow(
              'welcome',
              'Welcome',
              <div>
                <h2>Welcome 👋</h2>
                <p>
                  This portfolio simulates a desktop OS to showcase selected
                  projects.
                </p>
              </div>,
              true
            )
          }
        />
      </div>
      <CanvasGridBackground />
    </main>
  );
};

export default Home;
