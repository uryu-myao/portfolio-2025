import { useState } from 'react';
// componets
import Time from '@/components/Time';
import Footer from '@/components/Footer';
import WindowManager from '@/components/WindowManager';
import DesktopIconList from '@/components/DesktopIconList';
// icons
import DesktopIconImage from '@/assets/desktopIcon-nuskin.svg';

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
      <div className="home-inner">
        <Time />
        <DesktopIconList icons={icons} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={handleCloseWindow}
        />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
