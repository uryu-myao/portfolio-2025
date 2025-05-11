import { useState } from 'react';

import Time from '@/components/Time';
import Footer from '@/components/Footer';
import WindowManager from '@/components/WindowManager';

// icons
import DesktopIconList from '@/components/DesktopIconList';
import DesktopIconImage from '@/assets/desktopIcon-nuskin.svg'; // 你自定义图标路径

type WindowData = {
  id: string;
  title: string;
  content: React.ReactNode;
  initialX: number;
  initialY: number;
};

const Home = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);

  const handleOpenWindow = (
    id: string,
    title: string,
    content: React.ReactNode
  ) => {
    setOpenWindows((prev) => {
      if (prev.some((w) => w.id === id)) return prev;

      const offset = 20;
      const baseX = 100;
      const baseY = 100;
      const newIndex = prev.length;

      return [
        ...prev,
        {
          id,
          title,
          content,
          initialX: baseX + newIndex * offset,
          initialY: baseY + newIndex * offset,
        },
      ];
    });
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const icons = [
    {
      id: 'nuskin-1',
      icon: DesktopIconImage,
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
      icon: DesktopIconImage,
      label: 'Nuskin\nWeb Guideline',
      onOpen: () =>
        handleOpenWindow(
          'nuskin-2',
          'Nuskin Project 2',
          <p>This is the window content for Nuskin Project 2.</p>
        ),
    },
  ];

  return (
    <main className="home">
      <Time />

      <div className="home-inner">
        <DesktopIconList icons={icons} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={handleCloseWindow}
        />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
