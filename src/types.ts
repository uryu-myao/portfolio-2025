import type { Dispatch, SetStateAction, ReactNode } from 'react';

export interface IconItem {
  id: string;
  icon: string;
  label: string;
  variant?: 'nuskin' | 'stores' | 'personal' | 'legacy';
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
  width?: number | string;
  height?: number | string;
}

export interface WindowProps {
  id: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
  initialX: number;
  initialY: number;
  width?: number | string;
  height?: number | string;
  isFocused?: boolean;
}

export interface WindowManagerProps {
  openWindows: WindowData[];
  onCloseWindow: (id: string) => void;
  zOrders: string[];
  setZOrders: Dispatch<SetStateAction<string[]>>;
}

export interface FolderIconProps {
  id: string;
  icon: string;
  label: string;
  onOpen: () => void;
  variant?: 'nuskin' | 'stores' | 'personal' | 'legacy';
  isLocked?: boolean;
}

export interface PasswordPopupProps {
  folderId: string;
  title: string;
  onSuccess: () => void;
  onClose: () => void;
}

export interface NavProps {
  onToggleTheme: () => void;
  onOpenWindow: (id: string) => void;
  onProtectedOpenWindow: (id: string) => void;
}

export interface LoadingScreenProps {
  onComplete: () => void;
}
