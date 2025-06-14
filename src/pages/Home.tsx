import { useState } from 'react';
import type { WindowData } from '@/types';

import Time from '@/components/Time';
import WindowManager from '@/components/WindowManager';
import FolderIconList from '@/components/FolderIconList';
import InfoIcon from '@/components/InfoIcon';
import Nav from '@/components/Nav';
import CanvasGridBackground from '@/components/CanvasGridBackground';

import NuskinIcon from '@/assets/folder-icon-nuskin.svg';
import StoresIcon from '@/assets/folder-icon-nuskin.svg';
import PersonalIcon from '@/assets/folder-icon-nuskin.svg';

import NuskinWindow from '@/components/windows/NuskinWindowContent';
import StoresWindow from '@/components/windows/StoresWindowContent';
import PersonalWindow from '@/components/windows/PersonalWindowContent';
import WelcomeWindow from '@/components/windows/WelcomeWindowContent';
import PasswordPopup from '@/components/windows/PasswordWindowContent';

const PASSWORD_PROTECTED_IDS = ['nuskin-1'];

const Home = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([
    {
      id: 'welcome',
      title: 'Welcome',
      content: <WelcomeWindow />,
      initialX: 20,
      initialY: 20,
    },
  ]);
  const [zOrders, setZOrders] = useState<string[]>(['welcome']);
  const [showPasswordFor, setShowPasswordFor] = useState<string | null>(null);

  const iconMeta = {
    'nuskin-1': {
      title: 'Nuskin',
      content: <NuskinWindow />,
      icon: NuskinIcon,
    },
    'stores-1': {
      title: 'Stores.jp',
      content: <StoresWindow />,
      icon: StoresIcon,
    },
    'personal-1': {
      title: 'Personal',
      content: <PersonalWindow />,
      icon: PersonalIcon,
    },
  } as Record<
    string,
    { title: string; content: React.ReactNode; icon: string }
  >;

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

    setZOrders((prev) => [...prev.filter((z) => z !== id), id]);
  };

  const handleProtectedOpenWindow = (id: string) => {
    const unlocked = localStorage.getItem(`unlocked:${id}`) === 'true';
    const meta = iconMeta[id];
    if (!meta) return;

    if (unlocked) {
      handleOpenWindow(id, meta.title, meta.content);
    } else {
      setShowPasswordFor(id);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setZOrders((prev) => prev.filter((z) => z !== id));
  };

  const icons = Object.entries(iconMeta).map(([id, meta]) => ({
    id,
    icon: meta.icon,
    label: `${meta.title}\nProject Project`,
    variant: id.startsWith('nuskin')
      ? 'nuskin'
      : id.startsWith('stores')
      ? 'stores'
      : 'personal',
    isLocked: PASSWORD_PROTECTED_IDS.includes(id),
    onOpen: () =>
      PASSWORD_PROTECTED_IDS.includes(id)
        ? handleProtectedOpenWindow(id)
        : handleOpenWindow(id, meta.title, meta.content),
  }));

  return (
    <main className="home">
      <div className="home-inner">
        {/* remove password cache */}
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
            title={iconMeta[showPasswordFor].title}
            onSuccess={() => {
              handleOpenWindow(
                showPasswordFor,
                iconMeta[showPasswordFor].title,
                iconMeta[showPasswordFor].content
              );
              setShowPasswordFor(null);
            }}
            onClose={() => setShowPasswordFor(null)}
          />
        )}
        <Time />
        <Nav />
        <InfoIcon
          onOpen={() =>
            handleOpenWindow('welcome', 'Welcome', <WelcomeWindow />, true)
          }
        />
      </div>
      <CanvasGridBackground />
    </main>
  );
};

export default Home;
