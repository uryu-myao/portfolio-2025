// src/data/icons.ts
import NuskinIcon from '@/assets/folder-icon-nuskin.svg';
import StoresIcon from '@/assets/folder-icon-nuskin.svg';
import LegacyIcon from '@/assets/folder-icon-nuskin.svg';
// import PersonalIcon from '@/assets/folder-icon-nuskin.svg';

import NuskinWindow from '@/components/windows/NuskinWindowContent';
import StoresWindow from '@/components/windows/StoresWindowContent';
import WelcomeWindow from '@/components/windows/WelcomeWindowContent';
import Legacy2017Window from '@/components/windows/Legacy2017WindowContent';
import Legacy2019Window from '@/components/windows/Legacy2019WindowContent';

export const PASSWORD_PROTECTED_IDS = [
  'nuskin--guideline',
  'nuskin--branding',
  'nuskin--products',
];

export const iconMeta = {
  welcome: {
    title: 'Welcome',
    content: <WelcomeWindow />,
    icon: '',
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
    title: 'Main products communication',
    content: <NuskinWindow />,
    icon: NuskinIcon,
  },
  'stores-all': {
    title: 'Stores.jp',
    content: <StoresWindow />,
    icon: StoresIcon,
  },
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
} as const;
export type IconID = keyof typeof iconMeta;

export const getIcons = (
  handleOpen: (id: string) => void,
  handleProtectedOpen: (id: string) => void
) =>
  Object.entries(iconMeta)
    .filter(([id]) => id !== 'welcome')
    .map(([id, meta]) => ({
      id,
      icon: meta.icon,
      label: meta.title,
      variant: id.startsWith('nuskin')
        ? 'nuskin'
        : id.startsWith('stores')
        ? 'stores'
        : 'personal',
      isLocked: PASSWORD_PROTECTED_IDS.includes(id),
      onOpen: PASSWORD_PROTECTED_IDS.includes(id)
        ? () => handleProtectedOpen(id)
        : () => handleOpen(id),
    }));
