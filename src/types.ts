export type IconVariant = 'nuskin' | 'stores' | 'personal';

export interface IconItem {
  id: string;
  icon: string;
  label: string;
  variant?: IconVariant;
  onOpen: () => void;
}
