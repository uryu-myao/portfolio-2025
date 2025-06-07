export interface IconItem {
  id: string;
  icon: string;
  label: string;
  variant?: 'nuskin' | 'stores' | 'personal';
  onOpen: () => void;
  requiresPassword?: boolean;
}

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  initialX: number;
  initialY: number;
}
