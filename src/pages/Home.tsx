import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { WindowData } from '@/types';

import WindowManager from '@/components/WindowManager';
import FolderIconList from '@/components/FolderIconList';
import InfoIcon from '@/components/InfoIcon';
import Nav from '@/components/Nav';
import CanvasGridBackground from '@/components/CanvasGridBackground';

import NuskinIcon from '@/assets/folder-icon-nuskin.svg';
import StoresIcon from '@/assets/folder-icon-nuskin.svg';
// import PersonalIcon from '@/assets/folder-icon-nuskin.svg';

import NuskinWindow from '@/components/windows/NuskinWindowContent';
import StoresWindow from '@/components/windows/StoresWindowContent';
// import PersonalWindow from '@/components/windows/PersonalWindowContent';
import WelcomeWindow from '@/components/windows/WelcomeWindowContent';
import PasswordPopup from '@/components/windows/PasswordWindowContent';
import Legacy2017Window from '@/components/windows/Legacy2017WindowContent';
import Legacy2019Window from '@/components/windows/Legacy2019WindowContent';
import LegacyIcon from '@/assets/folder-icon-nuskin.svg';

const PASSWORD_PROTECTED_IDS = [
  'nuskin--guideline',
  'nuskin--branding',
  'nuskin--products',
];

const Home: React.FC = () => {
  const isMobile = window.innerWidth <= 768;

  const widthWelcome = 400;
  const heightWelcome = '75vh';

  const { toggleTheme } = useTheme();

  // Initial window data for the welcome window
  const welcomeMeta = {
    id: 'welcome',
    title: 'Welcome',
    content: <WelcomeWindow />,
    initialX: isMobile ? 20 : window.innerWidth - 400 - 50,
    initialY: isMobile ? 60 : 80,
    width: isMobile ? '90vw' : 400,
    height: isMobile ? '50vh' : '75vh',
  } satisfies WindowData;
  const [openWindows, setOpenWindows] = useState<WindowData[]>([welcomeMeta]);
  const [zOrders, setZOrders] = useState<string[]>(['welcome']);

  const [showPasswordFor, setShowPasswordFor] = useState<string | null>(null);

  const iconMeta = {
    welcome: {
      title: 'Welcome',
      content: <WelcomeWindow />,
      icon: '', // No icon for welcome
      initialX: window.innerWidth - widthWelcome - 50,
      initialY: 80,
      width: widthWelcome,
      height: heightWelcome,
    },
    'nuskin--guideline': {
      title: 'Web Guideline',
      content: <NuskinWindow />,
      icon: NuskinIcon,
    },
    'nuskin--branding': {
      title: 'Global Branding renewal optimization / New Design tool / CSR',
      content: <NuskinWindow />,
      icon: NuskinIcon,
    },
    'nuskin--products': {
      title: ' Main products comunication',
      content: <NuskinWindow />,
      icon: NuskinIcon,
    },
    'stores-all': {
      title: 'Stores.jp',
      content: <StoresWindow />,
      icon: StoresIcon,
    },
    // 'personal--app': {
    //   title: 'Personal',
    //   content: <PersonalWindow />,
    //   icon: PersonalIcon,
    // },
    'legacy--2019': {
      title: 'legacy 2017-2019',
      content: <Legacy2019Window />,
      icon: LegacyIcon,
      width: '80vw',
      height: '80vh',
    },
    'legacy--2017': {
      title: 'legacy 2013-2017',
      content: <Legacy2017Window />,
      icon: LegacyIcon,
      width: '80vw',
      height: '80vh',
    },
  } as Record<
    string,
    {
      title: string;
      content: React.ReactNode;
      icon: string;
      width?: number | string;
      height?: number | string;
      initialX?: number;
      initialY?: number;
    }
  >;
  const handleOpenWindow = (
    id: string,
    title?: string,
    content?: React.ReactNode,
    useFixedPosition = false
  ) => {
    const meta = iconMeta[id];
    if (!meta) return;

    setOpenWindows((prev) => {
      if (prev.some((w) => w.id === id)) return prev;

      const offset = 20;
      const baseX = 100;
      const baseY = 100;
      const newIndex = prev.length;

      const initialX =
        meta.initialX ?? (useFixedPosition ? 20 : baseX + newIndex * offset);
      const initialY =
        meta.initialY ?? (useFixedPosition ? 20 : baseY + newIndex * offset);

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

  const icons = Object.entries(iconMeta)
    .filter(([id]) => id !== 'welcome')
    .map(([id, meta]) => ({
      id,
      icon: meta.icon,
      label: `${meta.title}`,
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
    <main className="home container">
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
        <Nav onToggleTheme={toggleTheme} />
        <InfoIcon onOpen={() => handleOpenWindow('welcome')} />
      </div>
      <CanvasGridBackground />
    </main>
  );
};

export default Home;
