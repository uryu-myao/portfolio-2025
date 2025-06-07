import { useState } from 'react';
// components
import Time from '@/components/Time';
import WindowManager from '@/components/WindowManager';
import FolderIconList from '@/components/FolderIconList';
import InfoIcon from '@/components/InfoIcon';
import Footer from '@/components/Footer';
import CanvasGridBackground from '@/components/CanvasGridBackground';
// types
import type { IconItem } from '@/types';
// Desktop icons
import NuskinIcon from '@/assets/folder-icon-nuskin.svg';
import StoresIcon from '@/assets/folder-icon-nuskin.svg';
import PersonalIcon from '@/assets/folder-icon-nuskin.svg';
// windows
import NuskinWindow from '@/components/windows/NuskinWindowContent';
import StoresWindow from '@/components/windows/StoresWindowContent';
import PersonalWindow from '@/components/windows/PersonalWindowContent';

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

  const icons: IconItem[] = [
    {
      id: 'nuskin-1',
      icon: NuskinIcon,
      label: 'Nuskin\nWeb Guide',
      variant: 'nuskin',
      onOpen: () => handleOpenWindow('nuskin-1', 'Nuskin', <NuskinWindow />),
    },
    {
      id: 'stores-1',
      icon: StoresIcon,
      label: 'Stores.jp\nEC Design',
      variant: 'stores',
      onOpen: () => handleOpenWindow('stores-1', 'Stores.jp', <StoresWindow />),
    },
    {
      id: 'personal-1',
      icon: PersonalIcon,
      label: 'My\nExperiments',
      variant: 'personal',
      onOpen: () =>
        handleOpenWindow('personal-1', 'Personal', <PersonalWindow />),
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
