// src/components/MainContent.tsx
import FolderIconList from '@/components/FolderIconList';
import WindowManager from '@/components/WindowManager';
import PasswordPopup from '@/components/windows/PasswordWindowContent';
import Time from '@/components/Time';
import InfoIcon from '@/components/InfoIcon';
import CanvasGridBackground from '@/components/CanvasGridBackground';
import Nav from '@/components/Nav';
import WelcomeWindow from '@/components/windows/WelcomeWindowContent';
import type { MainContentProps } from '@/types';

const MainContent: React.FC<MainContentProps> = ({
  icons,
  openWindows,
  zOrders,
  showPasswordFor,
  iconMeta,
  handleOpenWindow,
  handleCloseWindow,
  // handleProtectedOpenWindow,
  setShowPasswordFor,
  toggleTheme,
}) => {
  return (
    <main className="home container">
      <div className="home-inner">
        <FolderIconList icons={icons} />
        <WindowManager
          openWindows={openWindows}
          onCloseWindow={handleCloseWindow}
          zOrders={zOrders}
          setZOrders={(z) => z}
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
        <Nav onToggleTheme={toggleTheme} />
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

export default MainContent;
