import FolderIconSVG from '@/components/svg/FolderIconSVG';

import NuskinWindow from '@/components/windows/NuskinWindowContent';
import StoresWindow from '@/components/windows/StoresWindowContent';
import WelcomeWindow from '@/components/windows/WelcomeWindowContent';
import Legacy2017Window from '@/components/windows/Legacy2017WindowContent';
import Legacy2019Window from '@/components/windows/Legacy2019WindowContent';

import type { WindowData } from '@/types';

// 密码保护 ID
export const PASSWORD_PROTECTED_IDS = [
  'nuskin--guideline',
  'nuskin--branding',
  'nuskin--products',
];

// 所有窗口配置
export const iconMeta = {
  welcome: {
    title: 'Welcome',
    content: <WelcomeWindow />,
    icon: '', // welcome 无图标
    width: 400,
    height: '75vh',
    initialX: window.innerWidth - 400 - 50,
    initialY: 80,
  },
  'nuskin--guideline': {
    title: 'Web Guideline',
    content: <NuskinWindow />,
    icon: <FolderIconSVG />,
  },
  'nuskin--branding': {
    title: 'Global Branding renewal optimization / New Design tool / CSR',
    content: <NuskinWindow />,
    icon: <FolderIconSVG />,
  },
  'nuskin--products': {
    title: 'Main products communication',
    content: <NuskinWindow />,
    icon: <FolderIconSVG />,
  },
  'stores-all': {
    title: 'Stores.jp',
    content: <StoresWindow />,
    icon: <FolderIconSVG />,
  },
  'legacy--2019': {
    title: 'legacy 2017-2019',
    content: <Legacy2019Window />,
    icon: <FolderIconSVG />,
    width: '80vw',
    height: '80vh',
  },
  'legacy--2017': {
    title: 'legacy 2013-2017',
    content: <Legacy2017Window />,
    icon: <FolderIconSVG />,
    width: '80vw',
    height: '80vh',
  },
} as const;

export type IconID = keyof typeof iconMeta;

// 用于初始化桌面图标点击逻辑
export const getIcons = (
  handleOpen: (id: IconID) => void,
  handleProtectedOpen: (id: IconID) => void
) =>
  Object.entries(iconMeta)
    .filter(([id]) => id !== 'welcome')
    .map(([id, meta]) => {
      const variant = id.startsWith('nuskin')
        ? 'nuskin'
        : id.startsWith('stores')
        ? 'stores'
        : 'legacy';

      const tagLabel =
        variant === 'nuskin'
          ? 'NUSKIN'
          : variant === 'stores'
          ? 'STORES'
          : variant === 'legacy'
          ? 'LEGACY'
          : 'OTHER';

      return {
        id,
        icon: meta.icon,
        label: meta.title,
        variant,
        tagLabel,
        isLocked: PASSWORD_PROTECTED_IDS.includes(id as IconID),
        onOpen: PASSWORD_PROTECTED_IDS.includes(id as IconID)
          ? () => handleProtectedOpen(id as IconID)
          : () => handleOpen(id as IconID),
      };
    });

// welcome 初始窗口
export const getWelcomeMeta = (isMobile: boolean): WindowData => {
  const meta = iconMeta['welcome'];
  return {
    id: 'welcome',
    title: meta.title,
    content: meta.content,
    initialX: isMobile ? 20 : meta.initialX!,
    initialY: isMobile ? 60 : meta.initialY!,
    width: isMobile ? '90vw' : meta.width!,
    height: isMobile ? '50vh' : meta.height!,
  };
};
