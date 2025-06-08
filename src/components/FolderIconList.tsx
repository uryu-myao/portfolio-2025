import FolderIcon from '@/components/FolderIcon';
import '@/styles/components/folder.scss';

interface IconItem {
  id: string;
  icon: string;
  label: string;
  onOpen: () => void;
  variant?: 'nuskin' | 'stores' | 'personal';
}

import type { IconItem } from '@/types';
interface IconListProps {
  icons: IconItem[];
}

const IconList: React.FC<IconListProps> = ({ icons }) => {
  return (
    <div className="folder-icon-list">
      {icons.map((icon) => (
        <FolderIcon
          key={icon.id}
          icon={icon.icon}
          label={icon.label}
          onOpen={icon.onOpen}
          variant={icon.variant}
        />
      ))}
    </div>
  );
};

export default IconList;
