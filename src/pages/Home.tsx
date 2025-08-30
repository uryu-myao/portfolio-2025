import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import type { WindowData } from '@/types';

import Nav from '@/components/Nav';
import WindowManager from '@/components/WindowManager';
import FolderIconList from '@/components/FolderIconList';
import SayHi from '@/components/SayHi';
import CanvasGridBackground from '@/components/CanvasGridBackground';
import PasswordPopup from '@/components/windows/PasswordWindowContent';

import { iconMeta, getIcons, getWelcomeMeta, IconID } from '@/data/icons';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = window.innerWidth <= 768;
  const { toggleTheme } = useTheme();

  const [openWindows, setOpenWindows] = useState<WindowData[]>([
    getWelcomeMeta(isMobile),
  ]);
  const [zOrders, setZOrders] = useState<string[]>(['welcome']);
  const [showPasswordFor, setShowPasswordFor] = useState<string | null>(null);

  const handleOpenWindow = (id: IconID) => {
    const meta = iconMeta[id];
    if (!meta) return;

    setOpenWindows((prev) => {
      if (prev.some((w) => w.id === id)) return prev;

      const offset = 20;
      const baseX = 100;
      const baseY = 100;
      const newIndex = prev.length;

      const initialX = meta.initialX ?? baseX + newIndex * offset;
      const initialY = meta.initialY ?? baseY + newIndex * offset;

      return [
        ...prev,
        {
          id,
          title: meta.title,
          content: meta.content,
          initialX,
          initialY,
          width: meta.width,
          height: meta.height,
        },
      ];
    });

    setZOrders((prev) => [...prev.filter((z) => z !== id), id]);
  };

  const handleProtectedOpenWindow = (id: IconID) => {
    const unlocked = localStorage.getItem(`unlocked:${id}`) === 'true';
    const meta = iconMeta[id];
    if (!meta) return;

    if (unlocked) {
      handleOpenWindow(id);
    } else {
      setShowPasswordFor(id);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setZOrders((prev) => prev.filter((z) => z !== id));
  };

  const icons = getIcons(handleOpenWindow, handleProtectedOpenWindow, t as any);

  // 用于 Nav props
  const safeHandleOpenWindow = (id: string) => {
    if (id in iconMeta) handleOpenWindow(id as IconID);
  };
  const safeHandleProtectedOpenWindow = (id: string) => {
    if (id in iconMeta) handleProtectedOpenWindow(id as IconID);
  };

  return (
    <main className="home container">
      <div className="home-inner">
        <button
          className="temp-btn"
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={() => {
            Object.keys(localStorage)
              .filter((key) => key.startsWith('unlocked:'))
              .forEach((key) => localStorage.removeItem(key));
            alert('所有密码验证缓存已清除');
          }}>
          重置所有密码验证
        </button>

        <FolderIconList icons={icons} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={handleCloseWindow}
          zOrders={zOrders}
          setZOrders={setZOrders}
        />

        {showPasswordFor && (
          <PasswordPopup
            folderId={showPasswordFor}
            title={iconMeta[showPasswordFor as IconID].title}
            onSuccess={() => {
              handleOpenWindow(showPasswordFor as IconID);
              setShowPasswordFor(null);
            }}
            onClose={() => setShowPasswordFor(null)}
          />
        )}

        <Nav
          onToggleTheme={toggleTheme}
          onOpenWindow={safeHandleOpenWindow}
          onProtectedOpenWindow={safeHandleProtectedOpenWindow}
        />

        <SayHi />
      </div>

      <CanvasGridBackground />
    </main>
  );
};

export default Home;
