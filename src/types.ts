import type { ReactNode, Dispatch, SetStateAction } from 'react';

export interface IconItem {
  id: string;
  icon: string;
  label: string;
  variant?: 'nuskin' | 'stores' | 'personal';
  onOpen: () => void;
  requiresPassword?: boolean;
  isLocked?: boolean;
}

export interface WindowData {
  id: string;
  title: string;
  content: ReactNode;
  initialX: number;
  initialY: number;
}

export interface WindowManagerProps {
  openWindows: WindowData[];
  onCloseWindow: (id: string) => void;
  zOrders: string[];
  setZOrders: Dispatch<SetStateAction<string[]>>;
}

export interface FolderIconProps {
  icon: string;
  label: string;
  onOpen: () => void;
  variant?: 'nuskin' | 'stores' | 'personal';
  isLocked?: boolean;
}

export interface PasswordPopupProps {
  folderId: string;
  title: string;
  onSuccess: () => void;
  onClose: () => void;
}
